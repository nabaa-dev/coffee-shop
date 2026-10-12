import React, { useState } from 'react';
import './Menu.css';

/**
 * Menu Component (Arabic Luxury Edition)
 * A luxurious coffee shop menu section with Arabic filter buttons,
 * product cards, hover effects, and a CTA section.
 */

const menuItems = [
  {
    id: 1,
    name: 'كابتشينو كلاسيكي',
    category: 'القهوة',
    categoryKey: 'coffee',
    description: 'إسبريسو غني يعلوه حليب مبخر مخملي مع طبقة سميكة من الرغوة الكثيفة المتوازنة.',
    price: '4.50',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80',
  },
  {
    id: 2,
    name: 'كافيه لاتيه',
    category: 'القهوة',
    categoryKey: 'coffee',
    description: 'إسبريسو سلس وممزوج بحليب ناعم مبخر لنكهة هادئة ومريحة للحواس.',
    price: '4.80',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80',
  },
  {
    id: 3,
    name: 'إسبريسو دبل شوت',
    category: 'إسبريسو',
    categoryKey: 'espresso',
    description: 'جرعة مركزة من القهوة الداكنة الفاخرة ذات القوام الكثيف والكريما الذهبية.',
    price: '3.20',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&q=80',
  },
  {
    id: 4,
    name: 'فلات وايت أسترالي',
    category: 'القهوة',
    categoryKey: 'coffee',
    description: 'جرعتان من الريستريتو مع حليب دقيق الرغوة لنهاية حريرية فائقة النعومة.',
    price: '4.60',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&q=80',
  },
  {
    id: 5,
    name: 'موكا بالشوكولاتة الفاخرة',
    category: 'القهوة',
    categoryKey: 'coffee',
    description: 'مزيج الإسبريسو وصوص الشوكولاتة الغني مع كريمة مخفوقة ورشة كاكاو سويسري.',
    price: '5.20',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=600&q=80',
  },
  {
    id: 6,
    name: 'كراميل ماكياتو',
    category: 'إسبريسو',
    categoryKey: 'espresso',
    description: 'حليب مبخر منقوع بالفانيلا مع طبقات الإسبريسو وتوشيح بصوص الكراميل الذهبي.',
    price: '5.50',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=600&q=80',
  },
  {
    id: 7,
    name: 'قهوة مثلجة بالكريمة',
    category: 'مشروبات باردة',
    categoryKey: 'cold-drinks',
    description: 'إسبريسو مبرد فوق الثلج مع لمسة خفيفة من الكريمة المنعشة والمنبهة.',
    price: '4.90',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=80',
  },
  {
    id: 8,
    name: 'كيك الشوكولاتة الداكنة',
    category: 'الحلويات',
    categoryKey: 'desserts',
    description: 'طبقات فاخرة من جناش الشوكولاتة الداكنة والسبونج الطري المخبوز يومياً.',
    price: '6.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
  },
];

const categories = [
  { id: 'all', label: 'الكل' },
  { id: 'coffee', label: 'القهوة' },
  { id: 'espresso', label: 'إسبريسو' },
  { id: 'cold-drinks', label: 'مشروبات باردة' },
  { id: 'desserts', label: 'الحلويات' },
];

const StarRating = ({ rating }) => {
  return (
    <div className="menu-card-stars" aria-label={`التقييم: ${rating} من 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? 'star star--filled' : 'star star--empty'}>
          ★
        </span>
      ))}
    </div>
  );
};

const MenuCard = ({ item, onOrderClick }) => {
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

        <button 
          className="menu-card-btn" 
          id={`order-btn-${item.id}`}
          onClick={() => onOrderClick ? onOrderClick(item.name) : alert(`تمت إضافة ${item.name} إلى سلتك!`)}
        >
          <span className="menu-card-btn-icon">☕</span>
          <span>اطلب الآن</span>
        </button>
      </div>
    </article>
  );
};

const Menu = ({ onOrderClick }) => {
  const [activeCategoryId, setActiveCategoryId] = useState('all');

  const filteredItems =
    activeCategoryId === 'all'
      ? menuItems
      : menuItems.filter((item) => item.categoryKey === activeCategoryId);

  return (
    <section className="menu-section" id="menu">
      {/* ── Section Header ── */}
      <div className="menu-header">
        <span className="menu-badge">✦ قائمتنا الحصرية</span>
        <h2 className="menu-title">صُنعت بشغف،<br />وتُقدّم بكل حب</h2>
        <p className="menu-subtitle">
          كل فنجان يحكي حكاية. اكتشف تشكيلتنا الحرفية من القهوة المختصة والمشروبات الموسمية والحلويات الفاخرة — تُحضّر طازجة خصيصاً لك.
        </p>
      </div>

      {/* ── Filter Buttons ── */}
      <div className="menu-filters" role="tablist" aria-label="أقسام القائمة">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`filter-btn-${cat.id}`}
            className={`menu-filter-btn ${activeCategoryId === cat.id ? 'menu-filter-btn--active' : ''}`}
            onClick={() => setActiveCategoryId(cat.id)}
            role="tab"
            aria-selected={activeCategoryId === cat.id}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── Product Cards Grid ── */}
      <div className="menu-grid">
        {filteredItems.map((item) => (
          <MenuCard key={item.id} item={item} onOrderClick={onOrderClick} />
        ))}
      </div>

      {/* ── CTA Section ── */}
      <div className="menu-cta">
        <div className="menu-cta-inner">
          <span className="menu-cta-icon">☕</span>
          <h3 className="menu-cta-title">متردد في اختيارك؟</h3>
          <p className="menu-cta-description">
            "يسعد خبراء الباريستا لدينا باقتراح المشروب المثالي المتوافق مع ذوقك ومزاجك اليومي."
          </p>
          <a href="#contact" className="menu-cta-btn" id="menu-contact-btn">
            تواصل معنا للاقتراحات
          </a>
        </div>
      </div>
    </section>
  );
};

export default Menu;
