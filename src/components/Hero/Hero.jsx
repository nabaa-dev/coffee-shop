import React, { useState } from 'react';
import HeroScene3D from './HeroScene3D';
import './Hero.css';

/**
 * Hero Component - Luxury World-Class 3D Cinematic Experience
 * Full-screen Three.js 3D stage dominating the viewport.
 * Zero static cup images. Live interactive kettle, liquid pouring, rising crema & steam.
 */
export const Hero = ({ onOrderClick, onMenuClick }) => {
  const [sceneStatus, setSceneStatus] = useState({ state: 'entering', isPouring: false });

  const handleMenuNav = (e) => {
    e.preventDefault();
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    } else if (onMenuClick) {
      onMenuClick();
    }
  };

  const handleShopNav = (e) => {
    e.preventDefault();
    const featuredEl = document.getElementById('featured') || document.getElementById('beans');
    if (featuredEl) {
      featuredEl.scrollIntoView({ behavior: 'smooth' });
    } else if (onOrderClick) {
      onOrderClick();
    }
  };

  return (
    <section className="hero-cinematic-section" id="home">
      {/* 1. Full-Screen 3D Interactive Three.js Canvas Stage */}
      <div className="hero-full-3d-stage">
        <HeroScene3D onStateChange={setSceneStatus} />
      </div>

      {/* 2. Atmospheric vignette & dark gold cafe gradients */}
      <div className="hero-cinematic-overlay" aria-hidden="true" />

      {/* 3. Luxury Typography & Interactive Action Panel */}
      <div className="hero-cinematic-container">
        <div className="hero-content-column">
          
          {/* Eyebrow Pill */}
          <div className="hero-luxury-eyebrow">
            <span className="eyebrow-sparkle">✦</span>
            <span className="eyebrow-text">Specialty Reserve • التجربة السينمائية الفاخرة</span>
            <span className="eyebrow-sparkle">✦</span>
          </div>

          {/* Mandatory Main Heading */}
          <h1 className="hero-cinematic-title">
            Every Cup <br />
            <span className="title-gradient-gold">Tells a Story</span>
          </h1>

          {/* Mandatory Subtitle */}
          <p className="hero-cinematic-subtitle">
            اكتشف نكهة قهوتك المفضلة، واستمتع بتجربة قهوة استثنائية في كل رشفة.
          </p>

          {/* Mandatory Action Buttons */}
          <div className="hero-action-buttons">
            <a
              href="#menu"
              className="btn-cinematic-primary"
              onClick={handleMenuNav}
              id="hero-btn-discover-menu"
            >
              <span className="btn-icon">☕</span>
              <span className="btn-text">اكتشف قائمة القهوة</span>
              <span className="btn-shine" aria-hidden="true" />
            </a>

            <a
              href="#featured"
              className="btn-cinematic-secondary"
              onClick={handleShopNav}
              id="hero-btn-shop-now"
            >
              <span className="btn-text">تسوّق الآن</span>
              <span className="btn-arrow" aria-hidden="true">←</span>
            </a>
          </div>

          {/* Quality Assurance Badges */}
          <div className="hero-spec-strip">
            <div className="spec-card">
              <span className="spec-value">100%</span>
              <span className="spec-label">أرابيكا مختصة فاخرة</span>
            </div>
            <div className="spec-divider" aria-hidden="true" />
            <div className="spec-card">
              <span className="spec-value">92°C</span>
              <span className="spec-label">حرارة الاستخلاص المثالية</span>
            </div>
            <div className="spec-divider" aria-hidden="true" />
            <div className="spec-card">
              <span className="spec-value">Fresh Roast</span>
              <span className="spec-label">تحميص طازج أسبوعياً</span>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Bottom Scroll Indicator */}
      <div className="hero-bottom-transition" aria-hidden="true">
        <a href="#menu" className="scroll-indicator" onClick={handleMenuNav}>
          <span className="scroll-arrow-icon">↓</span>
          <span className="scroll-text">انتقل لاستكشاف القائمة والمنتجات</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
