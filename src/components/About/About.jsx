import React from 'react';
import './About.css';
import aboutImage from '../../assets/about-coffee-shop.png';

/**
 * About Component - Corporate Grade Section
 * Features:
 * - Section ID: "about" for smooth navbar navigation
 * - Main Title: "More Than Coffee, It's an Experience"
 * - Story Narrative
 * - 3 Feature Cards: Premium Coffee, Expert Baristas, Cozy Atmosphere
 * - Fully Responsive Layout (Flexbox & Grid)
 */
export const About = () => {
  const features = [
    {
      id: 'premium-coffee',
      title: 'Premium Coffee',
      titleAr: 'قهوة مختصة فاخرة',
      description: 'نستورد أجود حبوب البن المحمصة بعناية من أعرق المزارع العالمية لتقديم نكهة غنية لا تُنسى.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      ),
    },
    {
      id: 'expert-baristas',
      title: 'Expert Baristas',
      titleAr: 'خبراء الباريستا',
      description: 'نمتلك فريقاً حائزاً على جوائز احترافية يصب شغفه ودقته في صنع كل رشفة بمهارة استثنائية.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      ),
    },
    {
      id: 'cozy-atmosphere',
      title: 'Cozy Atmosphere',
      titleAr: 'أجواء دافئة ومريحة',
      description: 'تصميم داخلي راقٍ بإضاءة دافئة توفر لك البيئة المثالية للتركيز والعمل أو لقاء الأصدقاء.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        
        {/* Top Header Label */}
        <div className="about-header-badge">
          <span>قصتنا وشغفنا بالقهوة</span>
        </div>

        {/* Main Content Layout (Image + Text) */}
        <div className="about-grid">
          
          {/* Image Side */}
          <div className="about-image-wrapper">
            <div className="about-image-card">
              <img 
                src={aboutImage} 
                alt="Cozy Modern Coffee Shop Interior" 
                className="about-img"
              />
              <div className="about-experience-badge">
                <span className="years-number">+10</span>
                <span className="years-label">سنوات من التميز والخبرة</span>
              </div>
            </div>
          </div>

          {/* Text Story Side */}
          <div className="about-text-content">
            <h2 className="about-main-title">
              More Than Coffee, <br />
              <span className="highlight-gold">It's an Experience</span>
            </h2>

            <p className="about-paragraph">
              في مقهانا، لا نقدم مجرد فنجان قهوة، بل نصنع لك تجربة حسية فريدة من نوعها. نبدأ بانتفاء أجود سلالات البن المحمصة بدرجات حرارة مدروسة، ونقدمها في بيئة تنبض بالدفء والأصالة والجمال.
            </p>

            {/* 3 Feature Cards Grid */}
            <div className="about-cards-grid">
              {features.map((card) => (
                <div key={card.id} className="about-feature-card">
                  <div className="card-icon-box">{card.icon}</div>
                  <div className="card-content-box">
                    <h3 className="card-title">
                      {card.title}
                      <span className="card-subtitle-ar">({card.titleAr})</span>
                    </h3>
                    <p className="card-description">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
