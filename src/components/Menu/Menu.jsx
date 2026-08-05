import React, { useState } from 'react';
import './Menu.css';

/**
 * Menu Component
 * A luxurious coffee shop menu section with filter buttons,
 * product cards, hover effects, and a CTA section.
 */

const menuItems = [
  {
    id: 1,
    name: 'Cappuccino',
    category: 'Coffee',
    description: 'Rich espresso topped with velvety steamed milk and a thick layer of creamy foam.',
    price: '4.50',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80',
  },
  {
    id: 2,
    name: 'Caffe Latte',
    category: 'Coffee',
    description: 'Smooth espresso blended with silky steamed milk for a mild, comforting taste.',
    price: '4.80',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80',
  },
  {
    id: 3,
    name: 'Espresso',
    category: 'Espresso',
    description: 'A concentrated shot of bold, aromatic coffee — pure intensity in every sip.',
    price: '3.20',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&q=80',
  },
  {
    id: 4,
    name: 'Flat White',
    category: 'Coffee',
    description: 'Double ristretto espresso with micro-foamed milk for a velvety smooth finish.',
    price: '4.60',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&q=80',
  },
  {
    id: 5,
    name: 'Mocha',
    category: 'Coffee',
    description: 'Espresso meets rich chocolate sauce, topped with whipped cream and cocoa dust.',
    price: '5.20',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=600&q=80',
  },
  {
    id: 6,
    name: 'Caramel Macchiato',
    category: 'Espresso',
    description: 'Vanilla-infused steamed milk, espresso, and a drizzle of golden caramel sauce.',
    price: '5.50',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=600&q=80',
  },
  {
    id: 7,
    name: 'Iced Coffee',
    category: 'Cold Drinks',
    description: 'Chilled espresso over ice with a splash of cream — refreshing and bold.',
    price: '4.90',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=80',
  },
  {
    id: 8,
    name: 'Chocolate Cake',
    category: 'Desserts',
    description: 'Decadent layers of dark chocolate ganache and moist sponge — sinfully delicious.',
    price: '6.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
  },
];

const categories = ['All', 'Coffee', 'Espresso', 'Cold Drinks', 'Desserts'];

const StarRating = ({ rating }) => {
  return (
    <div className="menu-card-stars" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? 'star star--filled' : 'star star--empty'}>
          ★
        </span>
      ))}
    </div>
  );
};

const MenuCard = ({ item }) => {
  return (
    <article className="menu-card" id={`menu-card-${item.id}`}>
      <div className="menu-card-image-wrapper">
        <img
          src={item.image}
          alt={item.name}
          className="menu-card-image"
          loading="lazy"
        />
        <span className="menu-card-category-badge">{item.category}</span>
      </div>

      <div className="menu-card-body">
        <div className="menu-card-header">
          <h3 className="menu-card-name">{item.name}</h3>
          <span className="menu-card-price">${item.price}</span>
        </div>

        <StarRating rating={item.rating} />

        <p className="menu-card-description">{item.description}</p>

        <button className="menu-card-btn" id={`order-btn-${item.id}`}>
          <span className="menu-card-btn-icon">☕</span>
          Order Now
        </button>
      </div>
    </article>
  );
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section className="menu-section" id="menu">
      {/* ── Section Header ── */}
      <div className="menu-header">
        <span className="menu-badge">✦ Our Signature Menu</span>
        <h2 className="menu-title">Crafted With Passion,<br />Served With Love</h2>
        <p className="menu-subtitle">
          Every cup tells a story. Explore our handcrafted selection of specialty
          coffees, seasonal drinks, and indulgent desserts — made fresh, just for you.
        </p>
      </div>

      {/* ── Filter Buttons ── */}
      <div className="menu-filters" role="tablist" aria-label="Menu categories">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-btn-${cat.toLowerCase().replace(' ', '-')}`}
            className={`menu-filter-btn ${activeCategory === cat ? 'menu-filter-btn--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            role="tab"
            aria-selected={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Product Cards Grid ── */}
      <div className="menu-grid">
        {filteredItems.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

      {/* ── CTA Section ── */}
      <div className="menu-cta">
        <div className="menu-cta-inner">
          <span className="menu-cta-icon">☕</span>
          <h3 className="menu-cta-title">Can't Decide?</h3>
          <p className="menu-cta-description">
            "Our baristas are happy to recommend the perfect drink for you."
          </p>
          <button className="menu-cta-btn" id="menu-contact-btn">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
