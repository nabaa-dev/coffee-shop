import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Menu from './components/Menu/Menu';
import Featured from './components/Featured/Featured';
import CoffeeBeans from './components/CoffeeBeans/CoffeeBeans';
import About from './components/About/About';
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs';
import Testimonials from './components/Testimonials/Testimonials';
import Gallery from './components/Gallery/Gallery';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(3);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOrderClick = () => {
    setCartCount((prev) => prev + 1);
    showToast('شكرًا لاختيارك روستري كافيه! تمت إضافة طلبك بنجاح.');
  };

  const handleCartClick = () => {
    showToast(`لديك ${cartCount} عناصر في سلة التبضع. جاري فتح تفاصيل السلة...`);
  };

  const handleMenuClick = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleItemAdded = (itemName) => {
    setCartCount((prev) => prev + 1);
    showToast(`تمت إضافة "${itemName}" إلى سلة المشتريات! ☕`);
  };

  return (
    <div className="app-container">
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="global-toast" role="status" aria-live="polite">
          <span className="toast-icon">☕</span>
          <span className="toast-text">{toastMessage}</span>
        </div>
      )}

      {/* Reusable Luxury Navbar */}
      <Navbar
        brandName="روستري كافيه"
        brandTagline="قهوة مختصة برائحة الأصالة"
        cartCount={cartCount}
        onOrderClick={handleOrderClick}
        onCartClick={handleCartClick}
      />

      {/* Main Home Page Content - Structured for Cinematic Flow */}
      <main className="main-content">
        {/* 1. Cinematic 3D Hero Section */}
        <Hero
          onOrderClick={handleOrderClick}
          onMenuClick={handleMenuClick}
        />

        {/* 2. Signature Coffee Menu (قائمة القهوة المميزة) */}
        <Menu onOrderClick={handleItemAdded} />

        {/* 3. Most Popular / Featured (المنتجات الأكثر طلباً) */}
        <Featured onOrderClick={handleItemAdded} />

        {/* 4. Single-Origin Coffee Beans (أنواع حبوب القهوة) */}
        <CoffeeBeans onAddToCart={() => handleItemAdded('محصول بن مختص')} />

        {/* 5. Brand Story & Craftsmanship (قصة العلامة التجارية) */}
        <About />

        {/* 6. Brand Core Pillars & Craftsmanship */}
        <WhyChooseUs />

        {/* 7. Customer Testimonials (آراء العملاء) */}
        <Testimonials />

        {/* 8. Atmosphere Gallery */}
        <Gallery />

        {/* 9. Contact & Visit Us */}
        <Contact />
      </main>

      {/* Professional Footer */}
      <Footer />
    </div>
  );
}

export default App;
