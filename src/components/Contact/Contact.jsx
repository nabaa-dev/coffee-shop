import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Section Header */}
        <div className="contact-header">
          <span className="contact-badge">Get In Touch</span>
          <h2 className="contact-title">Contact Us</h2>
          <p className="contact-subtitle">نحن سعداء دائمًا بالتواصل معك.</p>
          <div className="contact-divider">
            <span className="contact-divider-dot"></span>
            <span className="contact-divider-line"></span>
            <span className="contact-divider-dot"></span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="contact-grid">
          {/* Left Side — Info Cards */}
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon-wrap">
                <span className="info-icon">📍</span>
              </div>
              <div className="info-text">
                <h4>الموقع</h4>
                <p>Baghdad, Iraq</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon-wrap">
                <span className="info-icon">📞</span>
              </div>
              <div className="info-text">
                <h4>الهاتف</h4>
                <p>+964 770 000 000</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon-wrap">
                <span className="info-icon">✉️</span>
              </div>
              <div className="info-text">
                <h4>البريد الإلكتروني</h4>
                <p>coffee@example.com</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon-wrap">
                <span className="info-icon">🕒</span>
              </div>
              <div className="info-text">
                <h4>أوقات العمل</h4>
                <p>
                  <strong>Saturday – Thursday</strong>
                  <br />
                  8:00 AM – 11:00 PM
                </p>
                <p>
                  <strong>Friday</strong>
                  <br />
                  4:00 PM – 11:00 PM
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="contact-socials">
              <a
                href="#"
                className="social-btn facebook"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span>Facebook</span>
              </a>
              <a
                href="#"
                className="social-btn instagram"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                <span>Instagram</span>
              </a>
              <a
                href="#"
                className="social-btn whatsapp"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.127 1.535 5.856L.057 23.999l6.305-1.655A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.878 9.878 0 0 1-5.032-1.378l-.36-.214-3.742.981.999-3.648-.235-.374A9.855 9.855 0 0 1 2.106 12C2.106 6.536 6.536 2.106 12 2.106c5.464 0 9.894 4.43 9.894 9.894 0 5.464-4.43 9.894-9.894 9.894z" />
                </svg>
                <span>WhatsApp</span>
              </a>
              <a
                href="#"
                className="social-btn twitter"
                aria-label="Twitter"
                title="Twitter"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Twitter</span>
              </a>
            </div>
          </div>

          {/* Right Side — Contact Form */}
          <div className="contact-form-wrap">
            <div className="form-glass">
              <h3 className="form-title">Send Us a Message</h3>
              {submitted && (
                <div className="success-message">
                  ✅ تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.
                </div>
              )}
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-phone">Phone</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    placeholder="+964 7xx xxx xxxx"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="اكتب رسالتك هنا..."
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="contact-submit-btn">
                  <span>Send Message</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
