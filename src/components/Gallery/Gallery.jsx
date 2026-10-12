import React from 'react';
import './Gallery.css';

/**
 * Gallery Component (Arabic Luxury Edition)
 * Professional image gallery with hover overlay, fade-up animation,
 * and responsive CSS grid.
 */

const galleryItems = [
  {
    id: 1,
    label: 'فن اللاتيه آرت الحرفي',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&q=80',
    size: 'tall',
  },
  {
    id: 2,
    label: 'استخلاص الإسبريسو الذهبي',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&q=80',
    size: 'normal',
  },
  {
    id: 3,
    label: 'كابتشينو برغوة مخملية',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80',
    size: 'normal',
  },
  {
    id: 4,
    label: 'التصميم الداخلي والأجواء الدافئة',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
    size: 'wide',
  },
  {
    id: 5,
    label: 'مخبوزات وكرواسون طازج',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    size: 'normal',
  },
  {
    id: 6,
    label: 'إعداد القهوة المقطرة V60',
    image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&q=80',
    size: 'tall',
  },
  {
    id: 7,
    label: 'حلوى الشوكولاتة الفاخرة',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    size: 'normal',
  },
  {
    id: 8,
    label: 'جلسات الصباح الهادئة',
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
          <path d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56 Z" fill="#0a0604" />
        </svg>
      </div>

      {/* ── Section Header ── */}
      <div className="gallery-header">
        <span className="gallery-badge">✦ معرض الصور</span>
        <h2 className="gallery-title">لحظات من مقهى روستري كافيه</h2>
        <p className="gallery-subtitle">
          اكتشف أجواءنا الدافئة وفنون القهوة التي نُبدعها كل يوم —
          كل صورة تحكي قصة كوب أُعدّ بحب وشغف وصنعة متقنة.
        </p>
      </div>

      {/* ── Image Grid ── */}
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <GalleryCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* ── CTA Button ── */}
      <div className="gallery-cta">
        <a href="#menu" className="gallery-cta-btn" id="gallery-view-all-btn">
          <span className="gallery-cta-icon">🖼️</span>
          <span>استكشف كافة التفاصيل والقائمة</span>
        </a>
      </div>

    </section>
  );
};

export default Gallery;
