import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Menu from './components/Menu/Menu';
import Featured from './components/Featured/Featured';
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs';
import Testimonials from './components/Testimonials/Testimonials';
import Gallery from './components/Gallery/Gallery';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(3);

  const handleOrderClick = () => {
    alert('شكرًا لاختيارك روستري كافيه! جاري تحضير طلبك...');
  };

  const handleCartClick = () => {
    alert(`لديك ${cartCount} عناصر في سلة التبضع.`);
  };

  const handleMenuClick = () => {
    alert('جاري التوجيه إلى قائمة القهوة المميزة...');
  };

  return (
    <div className="app-container">
      {/* Reusable Professional Navbar */}
      <Navbar
        brandName="روستري كافيه"
        brandTagline="قهوة مختصة برائحة الأصالة"
        cartCount={cartCount}
        onOrderClick={handleOrderClick}
        onCartClick={handleCartClick}
      />

      {/* Main Home Page Content */}
      <main className="main-content">
        <Hero
          onOrderClick={handleOrderClick}
          onMenuClick={handleMenuClick}
        />

        {/* About Section - Right after Hero */}
        <About />
        <Menu />
        <Featured />
        <WhyChooseUs />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
