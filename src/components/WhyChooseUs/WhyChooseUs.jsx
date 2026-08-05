import React from 'react';
import './WhyChooseUs.css';

/**
 * WhyChooseUs Component
 * Showcases 6 brand advantages with icon cards,
 * fade-up animation, and smooth hover effects.
 */

const features = [
  {
    id: 1,
    icon: '☕',
    title: 'Premium Coffee',
    description: 'أجود أنواع البن المختار بعناية من أفضل مزارع العالم، محمص طازجًا ليمنحك نكهة لا مثيل لها.',
  },
  {
    id: 2,
    icon: '👨‍🍳',
    title: 'Professional Baristas',
    description: 'يتم إعداد مشروباتك على يد خبراء بارستا متخصصين، يُحولون كل كوب إلى تجربة فنية فريدة.',
  },
  {
    id: 3,
    icon: '🥐',
    title: 'Fresh Bakery',
    description: 'مخبوزات طازجة تُحضَّر يوميًا في مطبخنا باستخدام مكونات عالية الجودة لمرافقة قهوتك.',
  },
  {
    id: 4,
    icon: '🚚',
    title: 'Fast Service',
    description: 'نحرص على تحضير طلبك بأسرع وقت ممكن دون التنازل أبدًا عن الجودة أو الدقة في التقديم.',
  },
  {
    id: 5,
    icon: '🌿',
    title: 'Organic Ingredients',
    description: 'نستخدم مكونات طبيعية وعضوية معتمدة لضمان صحتك وسلامتك في كل قطرة وكل لقمة.',
  },
  {
    id: 6,
    icon: '⭐',
    title: 'Customer Satisfaction',
    description: 'رضا عملائنا هو أولويتنا القصوى — نستمع إليك دائمًا ونسعى لتجاوز توقعاتك في كل زيارة.',
  },
];

const FeatureCard = ({ item, index }) => (
  <div
    className="why-card"
    id={`why-card-${item.id}`}
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="why-card-icon-wrapper">
      <span className="why-card-icon" role="img" aria-label={item.title}>
        {item.icon}
      </span>
    </div>
    <h3 className="why-card-title">{item.title}</h3>
    <p className="why-card-description">{item.description}</p>
  </div>
);

const WhyChooseUs = () => {
  return (
    <section className="why-section" id="why-choose-us">

      {/* ── Decorative Wave Top ── */}
      <div className="why-wave-top" aria-hidden="true">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C480,56 960,56 1440,0 L1440,56 L0,56 Z" fill="#fdfcf8" />
        </svg>
      </div>

      {/* ── Section Header ── */}
      <div className="why-header">
        <span className="why-badge">✦ Why Choose Us</span>
        <h2 className="why-title">لماذا تختار روستري كافيه؟</h2>
        <p className="why-subtitle">
          نحن لا نقدم مجرد قهوة — نقدم تجربة متكاملة من الجودة والدفء والاهتمام بكل تفصيلة،
          لأن كل كوب يستحق أن يكون استثنائيًا.
        </p>
      </div>

      {/* ── Features Grid ── */}
      <div className="why-grid">
        {features.map((item, index) => (
          <FeatureCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* ── Bottom Divider ── */}
      <div className="why-divider" aria-hidden="true" />

    </section>
  );
};

export default WhyChooseUs;
