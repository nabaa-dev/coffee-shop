import React, { useState } from 'react';
import HeroScene3D from './HeroScene3D';
import './Hero.css';

/**
 * Hero Component - Luxury World-Class 3D Cinematic Experience (Arabic Master Edition)
 * Distribution:
 * - Desktop: Texts, Title, Subtitle, and Buttons strictly on the LEFT side.
 * - 3D Scene: Kettle & Cup pouring sequence on the RIGHT side.
 * - Mobile/Tablet: Graceful responsive vertical alignment without overflows.
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
    const targetEl = document.getElementById('beans') || document.getElementById('featured');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
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

      {/* 3. Luxury Typography & Interactive Action Panel (Left aligned on Desktop) */}
      <div className="hero-cinematic-container">
        <div className="hero-content-column">
          
          {/* Eyebrow Pill */}
          <div className="hero-luxury-eyebrow">
            <span className="eyebrow-sparkle">✦</span>
            <span className="eyebrow-text">محصول فاخر • تجربة القهوة السينمائية الفاخرة</span>
            <span className="eyebrow-sparkle">✦</span>
          </div>

          {/* Mandatory Main Heading: «كل فنجان يحكي حكاية» */}
          <h1 className="hero-cinematic-title">
            كل فنجان <br />
            <span className="title-gradient-gold">يحكي حكاية</span>
          </h1>

          {/* Mandatory Subtitle: «اكتشف نكهة قهوتك المفضلة واستمتع بتجربة استثنائية في كل رشفة» */}
          <p className="hero-cinematic-subtitle">
            اكتشف نكهة قهوتك المفضلة واستمتع بتجربة استثنائية في كل رشفة.
          </p>

          {/* Mandatory Action Buttons: «اكتشف قائمة القهوة» و«تسوّق الآن» */}
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
              href="#beans"
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
              <span className="spec-value">تحميص طازج</span>
              <span className="spec-label">محمصة أسبوعياً بعناية</span>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Bottom Scroll Indicator */}
      <div className="hero-bottom-transition" aria-hidden="true">
        <a href="#menu" className="scroll-indicator" onClick={handleMenuNav}>
          <span className="scroll-arrow-icon">↓</span>
          <span className="scroll-text">انتقل لاستكشاف القائمة والمحاصيل</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
