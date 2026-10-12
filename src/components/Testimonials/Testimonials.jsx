import React from 'react';
import './Testimonials.css';

/**
 * Testimonials Component (Arabic Luxury Edition)
 * Displays 6 customer review cards with photo, name, city,
 * star rating, and review text. CSS-only fade-up animation.
 */

const reviews = [
  {
    id: 1,
    name: 'سارة المنصور',
    city: 'دبي',
    rating: 5,
    review:
      'بلا شك، أفضل كابتشينو تذوقته على الإطلاق! الأجواء دافئة وفاخرة وفريق العمل مرحب للغاية. كل زيارة لمقهى روستري تشعرني بالراحة والانتعاش.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'أحمد الراشد',
    city: 'الرياض',
    rating: 5,
    review:
      'القهوة هنا على مستوى عالمي حقيقي. جربت كثيراً من المقاهي العالمية لكن روستري كافيه يتميز بجودة لا تُضاهى وثبات رائع في كل فنجان. أنصح به بشدة.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'نور الحسن',
    city: 'أبوظبي',
    rating: 5,
    review:
      'الكراميل ماكياتو هنا رائع بشكل لا يوصف. أحب كيف يأخذ الباريستا وقته في إعداد وتزيين كل مشروب بإتقان وفن. المخبوزات الطازجة إضافة ممتازة.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'علي الكاظمي',
    city: 'بغداد',
    rating: 5,
    review:
      'من أرقى تجارب القهوة في المنطقة بأكملها. الإسبريسو متوازن وغني بالنكهات، والخدمة راقية وسريعة. هذا المكان يستحق كل الثناء والتقدير.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80',
  },
  {
    id: 5,
    name: 'مريم يوسف',
    city: 'الشارقة',
    rating: 5,
    review:
      'كل تفصيلة في هذا المكان صُممت بعناية فائقة — من الموسيقى الهادئة والإضاءة الذهبية إلى نكهة اللاتيه الاستثنائية. مقهاي المفضل كل صباح!',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&q=80',
  },
  {
    id: 6,
    name: 'عمر الفاروق',
    city: 'الكويت',
    rating: 5,
    review:
      'الكولد برو هنا أسطوري — ناعم ومركز ونكهته العطرية تدوم طويلاً. احترافية عالية وجودة تستحق التجربة مراراً وتكراراً.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80',
  },
];

const StarRow = ({ rating }) => (
  <div className="testi-stars" aria-label={`التقييم: ${rating} من 5 نجوم`}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'tstar tstar--on' : 'tstar tstar--off'}>
        ★
      </span>
    ))}
  </div>
);

const TestiCard = ({ item, index }) => (
  <article
    className="testi-card"
    id={`testi-card-${item.id}`}
    style={{ animationDelay: `${index * 0.11}s` }}
  >
    {/* Quote mark */}
    <span className="testi-quote" aria-hidden="true">"</span>

    {/* Review text */}
    <p className="testi-review">{item.review}</p>

    {/* Stars */}
    <StarRow rating={item.rating} />

    {/* Author */}
    <div className="testi-author">
      <div className="testi-avatar-wrapper">
        <img
          src={item.image}
          alt={item.name}
          className="testi-avatar"
          loading="lazy"
        />
      </div>
      <div className="testi-author-info">
        <span className="testi-name">{item.name}</span>
        <span className="testi-city">📍 {item.city}</span>
      </div>
    </div>
  </article>
);

const Testimonials = () => {
  return (
    <section className="testi-section" id="testimonials">

      {/* ── Wave Top Divider ── */}
      <div className="testi-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C360,60 1080,60 1440,0 L1440,60 L0,60 Z" fill="#0a0604" />
        </svg>
      </div>

      {/* ── Section Header ── */}
      <div className="testi-header">
        <span className="testi-badge">✦ شهادات نعتز بها</span>
        <h2 className="testi-title">آراء عملائنا الكرام</h2>
        <p className="testi-subtitle">
          رضا عملائنا هو بوصلتنا الدائمة — كل فنجان نُقدّمه يحمل التزامًا حقيقيًا بأن
          تكون تجربتك معنا استثنائية وتستحق أن تُروى وتُعاد.
        </p>
      </div>

      {/* ── Reviews Grid ── */}
      <div className="testi-grid">
        {reviews.map((item, index) => (
          <TestiCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* ── Social Proof Banner ── */}
      <div className="testi-proof">
        <div className="testi-proof-inner">
          <div className="testi-proof-stars" aria-label="تقييم 5 نجوم">
            ★★★★★
          </div>
          <p className="testi-proof-text">
            أكثر من <strong>500+ عميل سعيد</strong> يزورون روستري كافيه كل أسبوع.
          </p>
        </div>
      </div>

    </section>
  );
};

export default Testimonials;
