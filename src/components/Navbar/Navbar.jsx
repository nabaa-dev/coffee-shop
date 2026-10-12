import React, { useState, useEffect } from 'react';
import './Navbar.css';

/**
 * Reusable Navbar Component for Coffee Shop App
 * 
 * Props:
 * - brandName: string (Default: 'روستري كافيه')
 * - brandTagline: string (Default: 'قهوة مختصة برائحة الأصالة')
 * - links: Array of { id, label, href }
 * - cartCount: number (Default: 3)
 * - onOrderClick: function
 * - onCartClick: function
 */

const DEFAULT_LINKS = [
  { id: 'home', label: 'الرئيسية', href: '#home' },
  { id: 'menu', label: 'قائمة القهوة', href: '#menu' },
  { id: 'featured', label: 'الأكثر طلباً', href: '#featured' },
  { id: 'beans', label: 'حبوب القهوة', href: '#beans' },
  { id: 'about', label: 'قصتنا', href: '#about' },
  { id: 'testimonials', label: 'آراء العملاء', href: '#testimonials' },
  { id: 'contact', label: 'تواصل معنا', href: '#contact' },
];

export const Navbar = ({
  brandName = 'روستري كافيه',
  brandTagline = 'قهوة مختصة برائحة الأصالة',
  links = DEFAULT_LINKS,
  cartCount = 3,
  onOrderClick,
  onCartClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle scroll detection for dynamic glassmorphism dark transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id, e) => {
    setActiveNav(id);
    setIsMobileOpen(false);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`جاري البحث عن: ${searchQuery}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  return (
    <header className={`coffee-navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="coffee-navbar-container">
        
        {/* Brand Logo & Title */}
        <a 
          href="#home" 
          className="coffee-brand"
          onClick={(e) => handleLinkClick('home', e)}
        >
          <div className="brand-icon-wrapper" aria-label="Coffee Logo">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">{brandName}</span>
            <span className="brand-tagline">{brandTagline}</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className="coffee-nav-menu">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`nav-link ${activeNav === link.id ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(link.id, e)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions (Search, Cart, Order Button) */}
        <div className="coffee-nav-actions">
          
          {/* Interactive Search Bar */}
          <div className="search-container">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="ابحث عن قهوتك..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  autoFocus
                />
                <button 
                  type="button" 
                  className="search-close-btn"
                  onClick={() => setIsSearchOpen(false)}
                  aria-label="إغلاق البحث"
                >
                  ✕
                </button>
              </form>
            ) : (
              <button 
                className="icon-btn" 
                onClick={() => setIsSearchOpen(true)}
                title="بحث"
                aria-label="فتح البحث"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            )}
          </div>

          {/* Cart Icon Button with Badge */}
          <button 
            className="icon-btn" 
            onClick={onCartClick || (() => alert('سلة المشتريات تكتمل قريباً!'))}
            title="سلة المشتريات"
            aria-label="سلة المشتريات"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {/* Order CTA Button (Desktop) */}
          <button 
            className="order-btn desktop-only"
            onClick={onOrderClick || (() => alert('جاري توجيهك إلى قائمة الطلب المباشر...'))}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            </svg>
            <span>اطلب الآن</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="قائمة الموبايل"
          >
            {isMobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu-drawer ${isMobileOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`mobile-nav-link ${activeNav === link.id ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(link.id, e)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-actions">
          <button 
            className="order-btn mobile-order-btn"
            onClick={() => {
              setIsMobileOpen(false);
              if (onOrderClick) onOrderClick();
              else alert('جاري توجيهك إلى قائمة الطلب المباشر...');
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            </svg>
            <span>اطلب الآن</span>
          </button>
        </div>
      </div>

    </header>
  );
};

export default Navbar;
