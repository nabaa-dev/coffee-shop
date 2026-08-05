import React from 'react';
import './Hero.css';
import heroCoffeeImg from '../../assets/hero-coffee.png';

/**
 * Hero Component
 * Responsive Flexbox Layout: Text on Left, Modern Coffee Cup Image on Right.
 */
export const Hero = ({ onOrderClick, onMenuClick }) => {
  return (
    <section className="hero-container" id="home">
      {/* Left Side: Text Content */}
      <div className="hero-text-side">
        <span className="hero-tagline">☕ القهوة المحمصة طازجاً كل صباح</span>
        
        <h1 className="hero-heading">Fresh Coffee Every Morning</h1>
        
        <p className="hero-description">
          تذوّق أجود أنواع القهوة المختصة المحمصة بعناية، لتمنحك رشفة مليئة بالنكهة الغنية والطاقة والانتعاش في بداية يومك.
        </p>

        <div className="hero-buttons">
          <button 
            className="btn btn-primary"
            onClick={onOrderClick || (() => alert('جاري توجيهك للطلب المباشر...'))}
          >
            اطلب الآن
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={onMenuClick || (() => alert('جاري عرض قائمة القهوة...'))}
          >
            شاهد القائمة
          </button>
        </div>
      </div>

      {/* Right Side: Modern Coffee Cup Image */}
      <div className="hero-image-side">
        <div className="hero-image-card">
          <img 
            src={heroCoffeeImg} 
            alt="Fresh Coffee Cup" 
            className="hero-coffee-img" 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
