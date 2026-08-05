import React from 'react';
import './Testimonials.css';

/**
 * Testimonials Component
 * Displays 6 customer review cards with photo, name, city,
 * star rating, and review text. CSS-only fade-up animation.
 */

const reviews = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    city: 'Dubai',
    rating: 5,
    review:
      'Hands down the best cappuccino I\'ve ever tasted! The atmosphere is cozy, the staff are incredibly warm, and every visit feels like coming home. Roastery Café is my happy place.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Ahmed Al-Rashid',
    city: 'Riyadh',
    rating: 5,
    review:
      'القهوة هنا على مستوى عالمي حقيقي. جربت كثيرًا من المقاهي لكن روستري كافيه يتميز بجودة لا تُضاهى في كل كوب. أنصح به بشدة لكل محبي القهوة.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Noor Al-Hassan',
    city: 'Abu Dhabi',
    rating: 5,
    review:
      'The caramel macchiato here is absolutely divine. I love how the baristas take their time crafting each drink to perfection. The fresh bakery items are a wonderful bonus!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Ali Karimi',
    city: 'Jeddah',
    rating: 5,
    review:
      'من أفضل تجارب القهوة التي مررت بها. الإسبريسو قوي ومتوازن تمامًا، والفريق دائمًا مبتسم ومرحب. هذا المكان يستحق كل ثناء.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80',
  },
  {
    id: 5,
    name: 'Mariam Youssef',
    city: 'Sharjah',
    rating: 5,
    review:
      'Every single detail here is thoughtfully curated — from the ambiance to the coffee to the desserts. The iced latte is my go-to every morning. Simply outstanding!',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&q=80',
  },
  {
    id: 6,
    name: 'Omar Farouk',
    city: 'Kuwait City',
    rating: 4,
    review:
      'الخدمة سريعة والجودة ثابتة في كل زيارة. الكولد برو هنا لا مثيل له — ناعم وغني بالنكهة. بالتأكيد سيظل مكاني المفضل للقهوة.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80',
  },
];

const StarRow = ({ rating }) => (
  <div className="testi-stars" aria-label={`${rating} out of 5 stars`}>
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
          <path d="M0,0 C360,60 1080,60 1440,0 L1440,60 L0,60 Z" fill="#f5f5dc" />
        </svg>
      </div>

      {/* ── Section Header ── */}
      <div className="testi-header">
        <span className="testi-badge">✦ Testimonials</span>
        <h2 className="testi-title">آراء عملائنا</h2>
        <p className="testi-subtitle">
          رضا عملائنا هو بوصلتنا الدائمة — كل كوب نُقدّمه يحمل التزامًا حقيقيًا بأن
          تجربتك معنا تستحق أن تُروى وتُعاد.
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
          <div className="testi-proof-stars" aria-label="5 stars">
            ★★★★★
          </div>
          <p className="testi-proof-text">
            أكثر من <strong>500 عميل سعيد</strong> يزور روستري كافيه كل شهر.
          </p>
        </div>
      </div>

    </section>
  );
};

export default Testimonials;
