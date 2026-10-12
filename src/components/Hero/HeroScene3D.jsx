import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import cremaImg from '../../assets/coffee-crema.jpg';
import cafeBgImg from '../../assets/luxury-cafe-bg.jpg';

/**
 * HeroScene3D
 * Cinematic Full-Scale 3D Coffee Experience with Three.js & GSAP.
 * Features:
 * - High-detail Obsidian Ceramic Cup with 24K Gold Rim, Saucer Plate, and Ergonomic Handle
 * - Precision Barista Gooseneck Kettle with Titanium Matte Finish, Gold Accents, and Walnut Handle
 * - World-tracked Gooseneck Spout pouring a shiny liquid coffee stream directly into the cup center
 * - Dynamically rising coffee level with rich golden crema texture and interactive wave ripples
 * - Micro-droplet liquid splash particles bursting at the impact zone
 * - Volumetric warm steam billowing continuously once cup fills
 * - 3D roasted coffee beans floating and tumbling in 3D space with parallax depth
 * - Responsive framing for desktop & mobile
 * - Replay functionality & zero static image fallbacks
 */
export const HeroScene3D = ({ onStateChange }) => {
  const mountRef = useRef(null);
  const animationFrameId = useRef(null);
  const timelineRef = useRef(null);

  const [pourState, setPourState] = useState('entering'); // 'entering' | 'pouring' | 'ready'
  const [isPouringActive, setIsPouringActive] = useState(false);

  const sceneState = useRef({
    camera: null,
    renderer: null,
    scene: null,
    kettleGroup: null,
    spoutTipMarker: null,
    cupGroup: null,
    liquidMesh: null,
    liquidGeo: null,
    streamMesh: null,
    splashParticles: [],
    steamParticles: [],
    floatingBeans: [],
    cupCenter: new THREE.Vector3(0.65, -0.35, 0),
    liquidLevel: 0.15,
    minLiquidLevel: 0.15,
    maxLiquidLevel: 1.25,
    rippleAmplitude: 0.0,
    isStreamVisible: false,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    clock: new THREE.Clock(),
    isMobile: false,
    isReducedMotion: false,
  });

  const replayPour = useCallback(() => {
    if (!timelineRef.current) return;
    timelineRef.current.restart();
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    sceneState.current.isReducedMotion = prefersReducedMotion;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = width < 860;
    sceneState.current.isMobile = isMobile;

    // Adapt cup center position: centered on mobile, right-offset on desktop to leave room for text on the left
    const cupCenterX = isMobile ? 0 : 1.35;
    sceneState.current.cupCenter.set(cupCenterX, isMobile ? -0.55 : -0.32, 0);

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneState.current.scene = scene;

    const camera = new THREE.PerspectiveCamera(isMobile ? 48 : 36, width / height, 0.1, 100);
    camera.position.set(0, isMobile ? 1.8 : 1.9, isMobile ? 6.2 : 5.0);
    sceneState.current.camera = camera;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    sceneState.current.renderer = renderer;

    // 3. Texture Loading
    const textureLoader = new THREE.TextureLoader();
    const cremaTexture = textureLoader.load(cremaImg);
    cremaTexture.wrapS = THREE.RepeatWrapping;
    cremaTexture.wrapT = THREE.RepeatWrapping;

    const cafeBgTexture = textureLoader.load(cafeBgImg);
    cafeBgTexture.colorSpace = THREE.SRGBColorSpace;

    // Atmospheric cafe backdrop inside the 3D scene
    const bgGeo = new THREE.PlaneGeometry(18, 10);
    const bgMat = new THREE.MeshBasicMaterial({
      map: cafeBgTexture,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    });
    const bgMesh = new THREE.Mesh(bgGeo, bgMat);
    bgMesh.position.set(0, 1.0, -5.0);
    scene.add(bgMesh);

    // 4. Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0xfff1dc, 1.25);
    scene.add(ambientLight);

    // Golden warm key light
    const keyLight = new THREE.DirectionalLight(0xffe2b8, 3.4);
    keyLight.position.set(4.0, 7.0, 4.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1.0;
    keyLight.shadow.camera.far = 16;
    keyLight.shadow.bias = -0.0008;
    scene.add(keyLight);

    // Spotlight dedicated to the cup
    const cupSpotLight = new THREE.SpotLight(0xffaa44, 5.0, 14, Math.PI / 4, 0.45, 1.2);
    cupSpotLight.position.set(cupCenterX, 5.2, 2.4);
    cupSpotLight.target.position.set(cupCenterX, 0.4, 0);
    scene.add(cupSpotLight);
    scene.add(cupSpotLight.target);

    // Internal amber glow light inside the cup
    const amberPointLight = new THREE.PointLight(0xff8811, 2.5, 3.5);
    amberPointLight.position.set(cupCenterX, 0.7, 0);
    scene.add(amberPointLight);

    // Blue-slate rim light for cinematic silhouette contrast
    const rimLight = new THREE.DirectionalLight(0x6a8dbd, 1.8);
    rimLight.position.set(-5.0, 3.5, -4.0);
    scene.add(rimLight);

    // 5. Shared Materials
    const ceramicMat = new THREE.MeshPhysicalMaterial({
      color: 0x120c09, // Obsidian espresso ceramic
      roughness: 0.12,
      metalness: 0.06,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.95,
      specularColor: new THREE.Color(0xffedd4),
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xe6b962,
      metalness: 0.95,
      roughness: 0.18,
      emissive: 0x47300c,
      emissiveIntensity: 0.25,
    });

    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x140e0a,
      roughness: 0.7,
      metalness: 0.12,
    });

    // 6. Build Cup & Saucer Group
    const cupGroup = new THREE.Group();
    cupGroup.position.copy(sceneState.current.cupCenter);
    scene.add(cupGroup);
    sceneState.current.cupGroup = cupGroup;

    // Table coaster disc
    const tableGeo = new THREE.CylinderGeometry(3.2, 3.2, 0.1, 48);
    const tableMesh = new THREE.Mesh(tableGeo, tableMat);
    tableMesh.position.y = -0.05;
    tableMesh.receiveShadow = true;
    cupGroup.add(tableMesh);

    // Saucer Plate via LatheGeometry
    const saucerPoints = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.65, 0),
      new THREE.Vector2(0.75, 0.04),
      new THREE.Vector2(1.68, 0.22),
      new THREE.Vector2(1.75, 0.20),
      new THREE.Vector2(0.8, 0.03),
      new THREE.Vector2(0.65, -0.02),
      new THREE.Vector2(0, -0.02),
    ];
    const saucerGeo = new THREE.LatheGeometry(saucerPoints, 64);
    const saucerMesh = new THREE.Mesh(saucerGeo, ceramicMat);
    saucerMesh.castShadow = true;
    saucerMesh.receiveShadow = true;
    cupGroup.add(saucerMesh);

    // Saucer Gold Rim Inlay
    const saucerGoldGeo = new THREE.TorusGeometry(1.28, 0.016, 16, 64);
    const saucerGoldMesh = new THREE.Mesh(saucerGoldGeo, goldMat);
    saucerGoldMesh.rotation.x = Math.PI / 2;
    saucerGoldMesh.position.y = 0.145;
    cupGroup.add(saucerGoldMesh);

    // Realistic Ceramic Cup Body via LatheGeometry
    const cupPoints = [
      new THREE.Vector2(0, 0.15),
      new THREE.Vector2(0.55, 0.15),
      new THREE.Vector2(0.62, 0.06),
      new THREE.Vector2(0.72, 0.08),
      new THREE.Vector2(0.85, 0.45),
      new THREE.Vector2(1.08, 1.15),
      new THREE.Vector2(1.22, 1.55),
      new THREE.Vector2(1.21, 1.62), // Rim outer lip
      new THREE.Vector2(1.17, 1.64), // Rim crest
      new THREE.Vector2(1.13, 1.62), // Rim inner lip
      new THREE.Vector2(1.02, 1.20),
      new THREE.Vector2(0.82, 0.60),
      new THREE.Vector2(0.56, 0.22), // Inner floor radius
      new THREE.Vector2(0, 0.22),
    ];
    const cupGeo = new THREE.LatheGeometry(cupPoints, 64);
    const cupMesh = new THREE.Mesh(cupGeo, ceramicMat);
    cupMesh.castShadow = true;
    cupMesh.receiveShadow = true;
    cupGroup.add(cupMesh);

    // Cup Gold Rim
    const cupGoldRimGeo = new THREE.TorusGeometry(1.17, 0.025, 16, 64);
    const cupGoldRimMesh = new THREE.Mesh(cupGoldRimGeo, goldMat);
    cupGoldRimMesh.rotation.x = Math.PI / 2;
    cupGoldRimMesh.position.y = 1.64;
    cupGroup.add(cupGoldRimMesh);

    // Ergonomic Handle
    const handleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.08, 1.35, 0),
      new THREE.Vector3(1.68, 1.15, 0),
      new THREE.Vector3(1.72, 0.65, 0),
      new THREE.Vector3(0.92, 0.45, 0),
    ]);
    const handleGeo = new THREE.TubeGeometry(handleCurve, 32, 0.085, 16, false);
    const handleMesh = new THREE.Mesh(handleGeo, ceramicMat);
    handleMesh.castShadow = true;
    cupGroup.add(handleMesh);

    // Handle Gold Collar
    const handleGoldGeo = new THREE.TorusGeometry(0.09, 0.015, 12, 32);
    const handleGoldMesh = new THREE.Mesh(handleGoldGeo, goldMat);
    handleGoldMesh.position.set(1.48, 1.26, 0);
    handleGoldMesh.rotation.y = Math.PI / 2;
    cupGroup.add(handleGoldMesh);

    // 7. Coffee Liquid & Crema Surface (Rippling Disk)
    const liquidGeo = new THREE.CircleGeometry(1.05, 48);
    const originalPos = liquidGeo.attributes.position.clone();
    liquidGeo.userData = { originalPos };
    sceneState.current.liquidGeo = liquidGeo;

    const liquidMat = new THREE.MeshPhysicalMaterial({
      map: cremaTexture,
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.05,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      emissive: 0x3d1d07,
      emissiveIntensity: 0.4,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.rotation.x = -Math.PI / 2;
    liquidMesh.position.set(0, sceneState.current.liquidLevel, 0);
    cupGroup.add(liquidMesh);
    sceneState.current.liquidMesh = liquidMesh;

    // 8. Barista Specialty Gooseneck Kettle Group
    const kettleGroup = new THREE.Group();
    // Default resting entrance position
    kettleGroup.position.set(cupCenterX + 2.4, 3.6, 0.4);
    scene.add(kettleGroup);
    sceneState.current.kettleGroup = kettleGroup;

    const kettleMat = new THREE.MeshPhysicalMaterial({
      color: 0x1c1c1e, // Titanium matte obsidian
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.65,
      clearcoatRoughness: 0.12,
    });

    // Kettle tapered bell body
    const kettleBodyGeo = new THREE.CylinderGeometry(0.68, 1.05, 1.7, 48);
    const kettleBodyMesh = new THREE.Mesh(kettleBodyGeo, kettleMat);
    kettleBodyMesh.castShadow = true;
    kettleGroup.add(kettleBodyMesh);

    // Kettle Lid with Gold Knob
    const kettleLidGeo = new THREE.CylinderGeometry(0.66, 0.69, 0.15, 32);
    const kettleLidMesh = new THREE.Mesh(kettleLidGeo, kettleMat);
    kettleLidMesh.position.y = 0.92;
    kettleGroup.add(kettleLidMesh);

    const kettleKnobGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const kettleKnobMesh = new THREE.Mesh(kettleKnobGeo, goldMat);
    kettleKnobMesh.position.y = 1.06;
    kettleGroup.add(kettleKnobMesh);

    // Gooseneck Spout (Precise curved nozzle)
    const spoutCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.70, -0.35, 0),
      new THREE.Vector3(-1.30, 0.15, 0),
      new THREE.Vector3(-1.75, 0.85, 0),
      new THREE.Vector3(-1.65, 1.30, 0),
      new THREE.Vector3(-1.25, 1.20, 0), // Nozzle tip pointing down
    ]);
    const spoutGeo = new THREE.TubeGeometry(spoutCurve, 40, 0.08, 16, false);
    const spoutMesh = new THREE.Mesh(spoutGeo, kettleMat);
    spoutMesh.castShadow = true;
    kettleGroup.add(spoutMesh);

    // Spout Gold Tip Ring
    const spoutGoldGeo = new THREE.TorusGeometry(0.08, 0.018, 12, 24);
    const spoutGoldMesh = new THREE.Mesh(spoutGoldGeo, goldMat);
    spoutGoldMesh.position.set(-1.25, 1.20, 0);
    spoutGoldMesh.rotation.y = Math.PI / 2;
    kettleGroup.add(spoutGoldMesh);

    // EXACT SPOUT TIP WORLD MARKER
    const spoutTipMarker = new THREE.Object3D();
    spoutTipMarker.position.set(-1.25, 1.20, 0);
    kettleGroup.add(spoutTipMarker);
    sceneState.current.spoutTipMarker = spoutTipMarker;

    // Kettle Walnut Handle
    const kettleHandleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.72, 0.65, 0),
      new THREE.Vector3(1.35, 0.45, 0),
      new THREE.Vector3(1.30, -0.40, 0),
      new THREE.Vector3(0.92, -0.65, 0),
    ]);
    const kettleHandleGeo = new THREE.TubeGeometry(kettleHandleCurve, 32, 0.09, 16, false);
    const woodHandleMat = new THREE.MeshStandardMaterial({
      color: 0x361f14,
      roughness: 0.4,
      metalness: 0.1,
    });
    const kettleHandleMesh = new THREE.Mesh(kettleHandleGeo, woodHandleMat);
    kettleGroup.add(kettleHandleMesh);

    // 9. Continuous Flowing Liquid Coffee Stream
    const streamMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x381807,
      roughness: 0.08,
      metalness: 0.05,
      transmission: 0.65,
      ior: 1.34,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.0,
      emissive: 0x220e03,
      emissiveIntensity: 0.35,
    });
    const initialStreamCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(cupCenterX, 2.5, 0),
      new THREE.Vector3(cupCenterX, 1.5, 0),
      new THREE.Vector3(cupCenterX, 0.5, 0),
    ]);
    const streamGeo = new THREE.TubeGeometry(initialStreamCurve, 20, 0.046, 12, false);
    const streamMesh = new THREE.Mesh(streamGeo, streamMaterial);
    scene.add(streamMesh);
    sceneState.current.streamMesh = streamMesh;

    // 10. Liquid Splash Droplets (Burst on impact)
    const splashDropletGeo = new THREE.IcosahedronGeometry(0.024, 1);
    const splashDropletMat = new THREE.MeshPhysicalMaterial({
      color: 0x6e3512,
      roughness: 0.12,
      clearcoat: 1.0,
      metalness: 0.1,
      emissive: 0x331707,
      emissiveIntensity: 0.4,
    });

    const splashParticles = [];
    for (let i = 0; i < 48; i++) {
      const mesh = new THREE.Mesh(splashDropletGeo, splashDropletMat);
      mesh.visible = false;
      cupGroup.add(mesh);
      splashParticles.push({
        mesh,
        velocity: new THREE.Vector3(),
        active: false,
        life: 0,
      });
    }
    sceneState.current.splashParticles = splashParticles;

    // 11. Volumetric Rising Steam System
    const steamCanvas = document.createElement('canvas');
    steamCanvas.width = 128;
    steamCanvas.height = 128;
    const sCtx = steamCanvas.getContext('2d');
    const radGrad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    radGrad.addColorStop(0, 'rgba(255, 240, 220, 0.55)');
    radGrad.addColorStop(0.35, 'rgba(230, 205, 175, 0.32)');
    radGrad.addColorStop(0.7, 'rgba(180, 150, 120, 0.08)');
    radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = radGrad;
    sCtx.fillRect(0, 0, 128, 128);

    const steamTexture = new THREE.CanvasTexture(steamCanvas);
    const steamMat = new THREE.SpriteMaterial({
      map: steamTexture,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const steamParticles = [];
    for (let i = 0; i < 65; i++) {
      const sprite = new THREE.Sprite(steamMat.clone());
      sprite.position.set(0, 0.5, 0);
      sprite.scale.set(0.4, 0.4, 1);
      cupGroup.add(sprite);
      steamParticles.push({
        sprite,
        vx: (Math.random() - 0.5) * 0.006,
        vy: 0.009 + Math.random() * 0.012,
        vz: (Math.random() - 0.5) * 0.006,
        baseScale: 0.3 + Math.random() * 0.3,
        growth: 0.007 + Math.random() * 0.005,
        maxLife: 2.4 + Math.random() * 1.8,
        life: Math.random() * 2.0,
        swirlSeed: Math.random() * Math.PI * 2,
      });
    }
    sceneState.current.steamParticles = steamParticles;

    // 12. Floating 3D Roasted Coffee Beans
    const beanMat = new THREE.MeshStandardMaterial({
      color: 0x2b170c,
      roughness: 0.35,
      metalness: 0.08,
    });
    const beanGrooveMat = new THREE.MeshBasicMaterial({ color: 0x110702 });

    const floatingBeans = [];
    const beanCount = 18;

    for (let i = 0; i < beanCount; i++) {
      const beanGroup = new THREE.Group();

      const beanGeo = new THREE.SphereGeometry(0.13, 16, 16);
      beanGeo.scale(1.35, 0.9, 0.72);
      const beanBody = new THREE.Mesh(beanGeo, beanMat);
      beanBody.castShadow = true;
      beanGroup.add(beanBody);

      // Distinct center crease line
      const creaseGeo = new THREE.BoxGeometry(0.28, 0.02, 0.04);
      const creaseMesh = new THREE.Mesh(creaseGeo, beanGrooveMat);
      creaseMesh.position.z = 0.08;
      beanGroup.add(creaseMesh);

      const theta = Math.random() * Math.PI * 2;
      const radius = 2.4 + Math.random() * 2.2;
      const y = -0.6 + Math.random() * 3.4;
      const z = -1.2 + Math.random() * 3.6;

      beanGroup.position.set(Math.cos(theta) * radius, y, z);
      beanGroup.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      scene.add(beanGroup);

      floatingBeans.push({
        group: beanGroup,
        initialY: y,
        speed: 0.4 + Math.random() * 0.7,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.015,
          z: (Math.random() - 0.5) * 0.015,
        },
        phase: Math.random() * Math.PI * 2,
      });
    }
    sceneState.current.floatingBeans = floatingBeans;

    // 13. GSAP Master Cinematic Timeline
    const createPourTimeline = () => {
      if (timelineRef.current) timelineRef.current.kill();

      const tl = gsap.timeline({
        onStart: () => {
          setPourState('entering');
          setIsPouringActive(false);
          if (onStateChange) onStateChange({ state: 'entering', isPouring: false });
          sceneState.current.liquidLevel = sceneState.current.minLiquidLevel;
          sceneState.current.rippleAmplitude = 0;
          sceneState.current.isStreamVisible = false;
          streamMaterial.opacity = 0;
        },
      });

      if (sceneState.current.isReducedMotion) {
        kettleGroup.position.set(cupCenterX + 1.25, 2.2, 0.2);
        kettleGroup.rotation.z = 0;
        sceneState.current.liquidLevel = sceneState.current.maxLiquidLevel;
        setPourState('ready');
        setIsPouringActive(false);
        return tl;
      }

      // Step 1: Camera sweep & Kettle entrance
      tl.to(camera.position, {
        x: isMobile ? 0 : 0.2,
        y: isMobile ? 1.7 : 1.8,
        z: isMobile ? 5.8 : 4.8,
        duration: 1.6,
        ease: 'power2.out',
      }, 0);

      tl.fromTo(
        kettleGroup.position,
        { x: cupCenterX + 2.8, y: 3.8, z: 0.8 },
        {
          x: cupCenterX + 1.28,
          y: 2.30,
          z: 0.20,
          duration: 1.6,
          ease: 'power3.out',
        },
        0
      );

      // Step 2: Kettle tilts to precision pour angle directly over the cup
      tl.to(
        kettleGroup.rotation,
        {
          z: -0.66, // ~38 deg tilt bringing spout tip right over cup center
          x: 0.08,
          duration: 1.0,
          ease: 'power2.inOut',
          onComplete: () => {
            setPourState('pouring');
            setIsPouringActive(true);
            sceneState.current.isStreamVisible = true;
            if (onStateChange) onStateChange({ state: 'pouring', isPouring: true });
          },
        },
        1.6
      );

      // Step 3: Stream erupts and liquid level rises
      tl.to(
        streamMaterial,
        {
          opacity: 0.96,
          duration: 0.25,
          ease: 'power1.out',
        },
        2.5
      );

      // Micro-swaying barista pour circular movement
      tl.to(
        kettleGroup.position,
        {
          y: '+=0.05',
          x: '-=0.03',
          duration: 1.8,
          repeat: 1,
          yoyo: true,
          ease: 'sine.inOut',
        },
        2.6
      );

      // Liquid level rises gradually to full rim with rich crema
      tl.to(
        sceneState.current,
        {
          liquidLevel: sceneState.current.maxLiquidLevel,
          rippleAmplitude: 0.07,
          duration: 4.2,
          ease: 'power1.inOut',
        },
        2.6
      );

      // Step 4: Pour finishes, stream stops, kettle untilts & glides back
      tl.to(
        streamMaterial,
        {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
          onStart: () => {
            sceneState.current.isStreamVisible = false;
            setIsPouringActive(false);
          },
        },
        6.8
      );

      tl.to(
        kettleGroup.rotation,
        {
          z: 0,
          x: 0,
          duration: 1.2,
          ease: 'power2.out',
        },
        6.9
      );

      tl.to(
        kettleGroup.position,
        {
          x: cupCenterX + 2.2,
          y: 2.8,
          z: 0.5,
          duration: 1.4,
          ease: 'power2.out',
          onComplete: () => {
            setPourState('ready');
            if (onStateChange) onStateChange({ state: 'ready', isPouring: false });
          },
        },
        7.0
      );

      // Ripples settle down
      tl.to(
        sceneState.current,
        {
          rippleAmplitude: 0.006,
          duration: 2.2,
          ease: 'power2.out',
        },
        7.2
      );

      // Cinematic camera zoom push highlighting the finished cup & steaming crema
      tl.to(
        camera.position,
        {
          x: isMobile ? 0 : cupCenterX * 0.4,
          y: isMobile ? 1.5 : 1.6,
          z: isMobile ? 5.2 : 4.2,
          duration: 3.5,
          ease: 'sine.inOut',
        },
        7.3
      );

      return tl;
    };

    timelineRef.current = createPourTimeline();

    // 14. Mouse / Touch Parallax Handler
    const handlePointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
      const normX = (clientX / window.innerWidth) * 2 - 1;
      const normY = -(clientY / window.innerHeight) * 2 + 1;

      sceneState.current.mouse.targetX = normX * 0.45;
      sceneState.current.mouse.targetY = normY * 0.25;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // 15. Window Resize Handler
    const handleResize = () => {
      if (!container || !sceneState.current.renderer || !sceneState.current.camera) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      const newIsMobile = newW < 860;
      sceneState.current.isMobile = newIsMobile;

      const newCupX = newIsMobile ? 0 : 1.35;
      sceneState.current.cupCenter.set(newCupX, newIsMobile ? -0.55 : -0.32, 0);
      if (cupGroup) cupGroup.position.copy(sceneState.current.cupCenter);

      camera.aspect = newW / newH;
      camera.fov = newIsMobile ? 48 : 36;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 16. Render Animation Loop
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      const delta = sceneState.current.clock.getDelta();
      const elapsed = sceneState.current.clock.getElapsedTime();
      const state = sceneState.current;

      // Mouse lerp damping
      state.mouse.x += (state.mouse.targetX - state.mouse.x) * 0.05;
      state.mouse.y += (state.mouse.targetY - state.mouse.y) * 0.05;

      // Camera parallax
      camera.position.x += (state.mouse.x * 0.6 - camera.position.x + (state.isMobile ? 0 : 0.2)) * 0.03;
      camera.lookAt(state.cupCenter.x * 0.5, 0.45 + state.mouse.y * 0.2, 0);

      // Subtle cup group breathing tilt
      if (cupGroup) {
        cupGroup.rotation.y = state.mouse.x * 0.12;
        cupGroup.rotation.x = -state.mouse.y * 0.06;
      }

      // Floating Coffee Beans rotation and bobbing
      state.floatingBeans.forEach((bean) => {
        bean.group.rotation.x += bean.rotSpeed.x;
        bean.group.rotation.y += bean.rotSpeed.y;
        bean.group.rotation.z += bean.rotSpeed.z;
        bean.group.position.y =
          bean.initialY + Math.sin(elapsed * bean.speed + bean.phase) * 0.08;
      });

      // Liquid height & crema surface ripples
      if (liquidMesh && state.liquidGeo) {
        liquidMesh.position.y = state.liquidLevel;
        const currentRadius = 0.56 + (state.liquidLevel - 0.15) * 0.42;
        liquidMesh.scale.set(currentRadius, currentRadius, 1);

        const posAttr = state.liquidGeo.attributes.position;
        const origPos = state.liquidGeo.userData.originalPos;
        const amp = state.rippleAmplitude;

        for (let i = 0; i < posAttr.count; i++) {
          const ox = origPos.getX(i);
          const oy = origPos.getY(i);
          const dist = Math.sqrt(ox * ox + oy * oy);

          if (amp > 0.001) {
            const wave =
              Math.sin(dist * 18.0 - elapsed * 15.0) *
              (amp / (1.0 + dist * 3.8));
            posAttr.setZ(i, wave);
          } else {
            posAttr.setZ(i, 0);
          }
        }
        posAttr.needsUpdate = true;
      }

      // Liquid Coffee Stream World Geometry Tracking
      if (state.isStreamVisible && spoutTipMarker && streamMesh) {
        const spoutWorldTip = new THREE.Vector3();
        spoutTipMarker.getWorldPosition(spoutWorldTip);

        const impactPoint = new THREE.Vector3(
          state.cupCenter.x,
          state.cupCenter.y + state.liquidLevel + 0.02,
          state.cupCenter.z
        );

        const midPoint = new THREE.Vector3()
          .addVectors(spoutWorldTip, impactPoint)
          .multiplyScalar(0.5);
        midPoint.x += 0.04; // gravity forward flow curve

        const newCurve = new THREE.CatmullRomCurve3([
          spoutWorldTip,
          midPoint,
          impactPoint,
        ]);

        streamMesh.geometry.dispose();
        streamMesh.geometry = new THREE.TubeGeometry(newCurve, 20, 0.045, 12, false);
      }

      // Liquid Splash Particles
      if (state.isStreamVisible) {
        state.splashParticles.forEach((p) => {
          if (!p.active && Math.random() < 0.28) {
            p.active = true;
            p.life = 0;
            p.mesh.visible = true;
            p.mesh.position.set(
              (Math.random() - 0.5) * 0.12,
              state.liquidLevel + 0.02,
              (Math.random() - 0.5) * 0.12
            );
            p.velocity.set(
              (Math.random() - 0.5) * 0.6,
              0.4 + Math.random() * 0.7,
              (Math.random() - 0.5) * 0.6
            );
          }

          if (p.active) {
            p.life += delta;
            p.mesh.position.addScaledVector(p.velocity, delta);
            p.velocity.y -= 3.5 * delta;

            const scale = Math.max(0, 1 - p.life / 0.5);
            p.mesh.scale.setScalar(scale);

            if (p.life > 0.5 || p.mesh.position.y < state.liquidLevel) {
              p.active = false;
              p.mesh.visible = false;
            }
          }
        });
      }

      // Volumetric Rising Steam
      state.steamParticles.forEach((sp) => {
        sp.life += delta;
        if (sp.life > sp.maxLife) {
          sp.life = 0;
          const rad = Math.random() * 0.55;
          const ang = Math.random() * Math.PI * 2;
          sp.sprite.position.set(
            Math.cos(ang) * rad,
            state.liquidLevel + 0.05,
            Math.sin(ang) * rad
          );
        }

        const progress = sp.life / sp.maxLife;
        sp.sprite.position.y += sp.vy * (1.0 + progress * 0.5);
        sp.sprite.position.x += Math.sin(elapsed * 2.2 + sp.swirlSeed) * 0.003;
        sp.sprite.position.z += Math.cos(elapsed * 2.2 + sp.swirlSeed) * 0.003;

        const currentScale = sp.baseScale + progress * 1.5;
        sp.sprite.scale.set(currentScale, currentScale, 1);

        let alpha = 0;
        if (progress < 0.25) {
          alpha = (progress / 0.25) * 0.35;
        } else {
          alpha = (1 - (progress - 0.25) / 0.75) * 0.35;
        }

        const steamBoost = state.liquidLevel > 0.8 ? 1.4 : 0.5;
        sp.sprite.material.opacity = alpha * steamBoost;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);

      if (timelineRef.current) timelineRef.current.kill();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      scene.clear();
    };
  }, [onStateChange]);

  return (
    <div className="hero-3d-wrapper" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className="hero-3d-canvas-container"
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
        aria-label="3D Cinematic Coffee Pouring Scene"
      />

      {/* Floating 3D Interaction Control HUD */}
      <div className="hero-3d-controls-hud">
        <button
          className={`hero-replay-btn ${isPouringActive ? 'is-active' : ''}`}
          onClick={replayPour}
          title="إعادة مشهد الصب السينمائي"
          aria-label="Replay Cinematic Coffee Pour"
        >
          <span className="replay-icon">↺</span>
          <span className="replay-text">
            {isPouringActive ? 'جاري صب القهوة...' : 'إعادة صب القهوة'}
          </span>
        </button>

        <div className="hero-status-pill">
          <span className={`status-dot ${pourState}`} />
          <span className="status-label">
            {pourState === 'pouring'
              ? 'الصب الفاخر مستمر (92°C)'
              : pourState === 'ready'
              ? 'قهوتك جاهزة بالكريما الذهبية'
              : 'بدء التجربة السينمائية...'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroScene3D;
