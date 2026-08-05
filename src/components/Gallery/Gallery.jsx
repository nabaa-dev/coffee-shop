import React from 'react';
import './Gallery.css';

/**
 * Gallery Component
 * Professional image gallery with hover overlay, fade-up animation,
 * and responsive CSS grid. No external libraries used.
 */

const galleryItems = [
  {
    id: 1,
    label: 'Latte Art',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&q=80',
    size: 'tall',
  },
  {
    id: 2,
    label: 'Espresso Shot',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&q=80',
    size: 'normal',
  },
  {
    id: 3,
    label: 'Cappuccino',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80',
    size: 'normal',
  },
  {
    id: 4,
    label: 'Coffee Shop Interior',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
    size: 'wide',
  },
  {
    id: 5,
    label: 'Fresh Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    size: 'normal',
  },
  {
    id: 6,
    label: 'Barista at Work',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    size: 'tall',
  },
  {
    id: 7,
    label: 'Chocolate Dessert',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    size: 'normal',
  },
  {
    id: 8,
    label: 'Morning Coffee',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85',
    size: 'normal',
  },
];

// Fix: unique Unsplash images for items 7 and 8
const correctedItems = [
  {
    id: 1,
    label: 'Latte Art',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&q=80',
    size: 'tall',
  },
  {
    id: 2,
    label: 'Espresso Shot',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&q=80',
    size: 'normal',
  },
  {
    id: 3,
    label: 'Cappuccino',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80',
    size: 'normal',
  },
  {
    id: 4,
    label: 'Coffee Shop Interior',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
    size: 'wide',
  },
  {
    id: 5,
    label: 'Fresh Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    size: 'normal',
  },
  {
    id: 6,
    label: 'Barista at Work',
    image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&q=80',
    size: 'tall',
  },
  {
    id: 7,
    label: 'Chocolate Dessert',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    size: 'normal',
  },
  {
    id: 8,
    label: 'Morning Coffee',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80',
    size: 'normal',
  },
];

const GalleryCard = ({ item, index }) => (
  <div
    className={`gallery-item gallery-item--${item.size}`}
    id={`gallery-item-${item.id}`}
    style={{ animationDelay: `${index * 0.09}s` }}
  >
    <img
      src={item.image}
      alt={item.label}
      className="gallery-img"
      loading="lazy"
    />
    <div className="gallery-overlay">
      <span className="gallery-label">{item.label}</span>
    </div>
  </div>
);

const Gallery = () => {
  return (
    <section className="gallery-section" id="gallery">

      {/* ── Wave Top Divider ── */}
      <div className="gallery-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56 Z" fill="#faf8f2" />
        </svg>
      </div>

      {/* ── Section Header ── */}
      <div className="gallery-header">
        <span className="gallery-badge">✦ Our Gallery</span>
        <h2 className="gallery-title">معرض روستري كافيه</h2>
        <p className="gallery-subtitle">
          اكتشف أجواءنا الدافئة وفنون القهوة التي نُبدعها كل يوم —
          كل صورة تحكي قصة كوب أُعدّ بحب وصنعة.
        </p>
      </div>

      {/* ── Image Grid ── */}
      <div className="gallery-grid">
        {correctedItems.map((item, index) => (
          <GalleryCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* ── CTA Button ── */}
      <div className="gallery-cta">
        <button className="gallery-cta-btn" id="gallery-view-all-btn">
          <span className="gallery-cta-icon">🖼</span>
          View Full Gallery
        </button>
      </div>

    </section>
  );
};

export default Gallery;
