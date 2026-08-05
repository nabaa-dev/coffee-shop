import React from 'react';
import './Featured.css';

/**
 * Featured Component
 * Displays the most popular coffee items in an animated card grid.
 * Uses CSS-only scroll animations, no external libraries.
 */

const featuredItems = [
  {
    id: 1,
    name: 'Signature Espresso',
    description: 'Our house blend — bold, rich, and perfectly balanced with notes of dark chocolate and caramel.',
    price: '3.80',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=700&q=80',
  },
  {
    id: 2,
    name: 'Velvet Cappuccino',
    description: 'Silky micro-foamed milk over a double shot of espresso — pure comfort in every sip.',
    price: '4.50',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=700&q=80',
  },
  {
    id: 3,
    name: 'Golden Latte',
    description: 'Warm turmeric-spiced latte with oat milk and a touch of honey — beautifully soothing.',
    price: '5.20',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=700&q=80',
  },
  {
    id: 4,
    name: 'Caramel Cloud',
    description: 'Espresso crowned with airy salted caramel foam and a slow ribbon of caramel drizzle.',
    price: '5.80',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=700&q=80',
  },
  {
    id: 5,
    name: 'Cold Brew Reserve',
    description: 'Steeped for 18 hours, served over crystal ice — smooth, mellow, and deeply refreshing.',
    price: '5.50',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=700&q=80',
  },
  {
    id: 6,
    name: 'Mocha Supreme',
    description: 'Double espresso fused with Belgian dark chocolate and crowned with fresh whipped cream.',
    price: '5.90',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=700&q=80',
  },
];

const StarRating = ({ rating }) => (
  <div className="featured-card-stars" aria-label={`Rating: ${rating} out of 5`}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'fstar fstar--filled' : 'fstar fstar--empty'}>
        ★
      </span>
    ))}
  </div>
);

const FeaturedCard = ({ item, index }) => (
  <article
    className="featured-card"
    id={`featured-card-${item.id}`}
    style={{ animationDelay: `${index * 0.12}s` }}
  >
    <div className="featured-card-image-wrapper">
      <img
        src={item.image}
        alt={item.name}
        className="featured-card-image"
        loading="lazy"
      />
      <div className="featured-card-overlay" />
      <span className="featured-card-price-badge">${item.price}</span>
    </div>

    <div className="featured-card-body">
      <h3 className="featured-card-name">{item.name}</h3>
      <StarRating rating={item.rating} />
      <p className="featured-card-description">{item.description}</p>
      <button className="featured-card-btn" id={`featured-order-btn-${item.id}`}>
        <span className="featured-card-btn-icon">☕</span>
        <span>Order Now</span>
      </button>
    </div>
  </article>
);

const Featured = () => {
  return (
    <section className="featured-section" id="featured">
      {/* ── Decorative top divider ── */}
      <div className="featured-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#F5F5DC" />
        </svg>
      </div>

      {/* ── Section Header ── */}
      <div className="featured-header">
        <span className="featured-eyebrow">✦ الأكثر طلبًا</span>
        <h2 className="featured-title">Featured Coffee</h2>
        <p className="featured-subtitle">
          Handpicked by our master baristas — these are the drinks our guests
          fall in love with, time and again.
        </p>
      </div>

      {/* ── Cards Grid ── */}
      <div className="featured-grid">
        {featuredItems.map((item, index) => (
          <FeaturedCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* ── Bottom accent line ── */}
      <div className="featured-bottom-accent" aria-hidden="true" />
    </section>
  );
};

export default Featured;
