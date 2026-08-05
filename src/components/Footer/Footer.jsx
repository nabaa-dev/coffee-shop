import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer">
      {/* Decorative Top Wave */}
      <div className="footer-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            fill="#3b1f0e"
          />
        </svg>
      </div>

      <div className="footer-container">
        {/* Columns Grid */}
        <div className="footer-grid">

          {/* Column 1 — Brand */}
          <div className="footer-col footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">☕</span>
              <span className="footer-logo-text">Roastery Coffee</span>
            </div>
            <p className="footer-brand-desc">
              نقدم لك أرقى تجارب القهوة المختصة، بعناية في الاختيار وشغف في التحضير.
              كل قدح يحمل قصة من بستان القهوة إلى يديك.
            </p>
            <div className="footer-brand-badge">
              <span>☕</span> Since 2015
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <span className="footer-title-line"></span>
              Quick Links
            </h4>
            <ul className="footer-links">
              <li>
                <button className="footer-link-btn" onClick={() => scrollTo('hero')}>
                  <span className="link-arrow">›</span> Home
                </button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => scrollTo('about')}>
                  <span className="link-arrow">›</span> About
                </button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => scrollTo('menu')}>
                  <span className="link-arrow">›</span> Menu
                </button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => scrollTo('gallery')}>
                  <span className="link-arrow">›</span> Gallery
                </button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => scrollTo('contact')}>
                  <span className="link-arrow">›</span> Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 — Working Hours */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <span className="footer-title-line"></span>
              Working Hours
            </h4>
            <div className="footer-hours">
              <div className="hours-row">
                <span className="hours-day">Saturday – Thursday</span>
                <span className="hours-time">8:00 AM – 11:00 PM</span>
              </div>
              <div className="hours-divider"></div>
              <div className="hours-row">
                <span className="hours-day">Friday</span>
                <span className="hours-time">4:00 PM – 11:00 PM</span>
              </div>
              <div className="hours-status">
                <span className="status-dot"></span> We're Open Now
              </div>
            </div>
          </div>

          {/* Column 4 — Follow Us */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <span className="footer-title-line"></span>
              Follow Us
            </h4>
            <div className="footer-socials">
              <a href="#" className="footer-social facebook" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span>Facebook</span>
              </a>
              <a href="#" className="footer-social instagram" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                <span>Instagram</span>
              </a>
              <a href="#" className="footer-social twitter" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Twitter</span>
              </a>
              <a href="#" className="footer-social whatsapp" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.127 1.535 5.856L.057 23.999l6.305-1.655A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.878 9.878 0 0 1-5.032-1.378l-.36-.214-3.742.981.999-3.648-.235-.374A9.855 9.855 0 0 1 2.106 12C2.106 6.536 6.536 2.106 12 2.106c5.464 0 9.894 4.43 9.894 9.894 0 5.464-4.43 9.894-9.894 9.894z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="footer-bottom-divider"></div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} <span className="footer-brand-name">Roastery Coffee</span>. All Rights Reserved.
          </p>
          <p className="footer-made-with">
            Made with <span className="heart">♥</span> in Baghdad, Iraq
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
