import React from 'react';
import './Featured.css';

/**
 * Featured Component (Arabic Luxury Edition)
 * Displays the most popular coffee items in an animated card grid.
 */

const featuredItems = [
  {
    id: 1,
    name: 'إسبريسو روستري الخاص',
    description: 'مزيجنا المميز — قوي، غني، ومتوازن بنفحات الشوكولاتة الداكنة والكراميل الفاخر.',
    price: '3.80',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=700&q=80',
  },
  {
    id: 2,
    name: 'كابتشينو مخملي',
    description: 'حليب مبخر بقوام حريري ناعم ينساب فوق جرعة إسبريسو مزدوجة — دلال خالص في كل رشفة.',
    price: '4.50',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=700&q=80',
  },
  {
    id: 3,
    name: 'لاتيه ذهبي بالكركم والعسل',
    description: 'لاتيه دافئ مع حليب الشوفان ولمسة عسل بري مع توابل طبيعية مهدئة للحواس.',
    price: '5.20',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=700&q=80',
  },
  {
    id: 4,
    name: 'كراميل كلاود الفاخر',
    description: 'إسبريسو متوج برغوة الكراميل المملح الهوائية مع خيوط صوص الكراميل البلجيكي.',
    price: '5.80',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=700&q=80',
  },
  {
    id: 5,
    name: 'كولد برو منقوع 18 ساعة',
    description: 'قهوة باردة مستخلصة ببطء فوق الثلج الكريستالي — ناعمة، سلسة، وعميقة النكهة.',
    price: '5.50',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=700&q=80',
  },
  {
    id: 6,
    name: 'موكا سوبريم بالشوكولاتة',
    description: 'إسبريسو مزدوج منسجم مع الشوكولاتة البلجيكية الغنية وكريمة الخفق الطازجة.',
    price: '5.90',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=700&q=80',
  },
];

const StarRating = ({ rating }) => (
  <div className="featured-card-stars" aria-label={`التقييم: ${rating} من 5`}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'fstar fstar--filled' : 'fstar fstar--empty'}>
        ★
      </span>
    ))}
  </div>
);

const FeaturedCard = ({ item, index, onOrderClick }) => (
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
      <button 
        className="featured-card-btn" 
        id={`featured-order-btn-${item.id}`}
        onClick={() => onOrderClick ? onOrderClick(item.name) : alert(`تمت إضافة ${item.name} إلى سلتك!`)}
      >
        <span className="featured-card-btn-icon">☕</span>
        <span>اطلب الآن</span>
      </button>
    </div>
  </article>
);

const Featured = ({ onOrderClick }) => {
  return (
    <section className="featured-section" id="featured">
      {/* ── Decorative top divider ── */}
      <div className="featured-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#070403" />
        </svg>
      </div>

      {/* ── Section Header ── */}
      <div className="featured-header">
        <span className="featured-eyebrow">✦ الأكثر طلبًا</span>
        <h2 className="featured-title">القهوة المميزة</h2>
        <p className="featured-subtitle">
          مختارة بعناية من قِبل كبار خبراء الباريستا — مشروبات استثنائية يعشقها ضيوفنا في كل زيارة.
        </p>
      </div>

      {/* ── Cards Grid ── */}
      <div className="featured-grid">
        {featuredItems.map((item, index) => (
          <FeaturedCard key={item.id} item={item} index={index} onOrderClick={onOrderClick} />
        ))}
      </div>

      {/* ── Bottom accent line ── */}
      <div className="featured-bottom-accent" aria-hidden="true" />
    </section>
  );
};

export default Featured;
