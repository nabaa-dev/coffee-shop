import React, { useState } from 'react';
import './CoffeeBeans.css';
import specialtyBeansImg from '../../assets/specialty-beans.jpg';

/**
 * CoffeeBeans Component
 * Single-Origin Specialty Coffee Beans Reserve Section
 * Showcasing authentic high-elevation coffee origins, tasting notes,
 * and direct shopping experience.
 */

const beanVarieties = [
  {
    id: 'bean-1',
    name: 'Ethiopian Guji Reserve',
    nameAr: 'إثيوبيا قوجي - محصول فاخر',
    origin: 'Guji Highlands, Ethiopia',
    originAr: 'مرتفعات قوجي، إثيوبيا',
    process: 'Natural (مجففة)',
    altitude: '2,100m',
    roast: 'Light-Medium',
    roastPercent: 45,
    notes: ['ياسمين', 'دراق ناضج', 'برغموت', 'عسل بري'],
    price: '18.50',
    weight: '250g',
    rating: 5,
  },
  {
    id: 'bean-2',
    name: 'Colombian Huila Supreme',
    nameAr: 'كولومبيا هويلا - سوبريمو',
    origin: 'Huila Region, Colombia',
    originAr: 'منطقة هويلا، كولومبيا',
    process: 'Washed (مغسولة)',
    altitude: '1,850m',
    roast: 'Medium Roast',
    roastPercent: 65,
    notes: ['شوكولاتة داكنة', 'كراميل مملح', 'كرز أسود', 'بندق'],
    price: '16.00',
    weight: '250g',
    rating: 5,
  },
  {
    id: 'bean-3',
    name: 'Yemen Ismaili Micro-Lot',
    nameAr: 'اليمن الإسماعيلي - مايكرولوت نادر',
    origin: 'Bani Ismael, Yemen',
    originAr: 'بني إسماعيل، اليمن',
    process: 'Anaerobic Natural (تخمير لاهوائي)',
    altitude: '2,400m',
    roast: 'Medium',
    roastPercent: 60,
    notes: ['توت بري', 'هيل بلدي', 'كاكاو خام', 'تين مجفف'],
    price: '24.00',
    weight: '250g',
    rating: 5,
  },
  {
    id: 'bean-4',
    name: 'Costa Rica Tarrazú Honey',
    nameAr: 'كوستاريكا تارازو - معالجة عسلية',
    origin: 'Tarrazú Valley, Costa Rica',
    originAr: 'وادي تارازو، كوستاريكا',
    process: 'Yellow Honey (عسلية)',
    altitude: '1,750m',
    roast: 'Medium-Light',
    roastPercent: 50,
    notes: ['تفاح مكرمل', 'قصب السكر', 'حمضيات حلوة', 'فانيلا'],
    price: '17.50',
    weight: '250g',
    rating: 5,
  },
];

export const CoffeeBeans = ({ onAddToCart }) => {
  const [selectedGrind, setSelectedGrind] = useState({});
  const [addedMessage, setAddedMessage] = useState(null);

  const handleGrindChange = (beanId, grind) => {
    setSelectedGrind((prev) => ({ ...prev, [beanId]: grind }));
  };

  const handleBuy = (bean) => {
    const grind = selectedGrind[bean.id] || 'حبوب كاملة (Whole Bean)';
    if (onAddToCart) {
      onAddToCart();
    }
    setAddedMessage(`تمت إضافة "${bean.nameAr} - ${grind}" إلى سلتك بنجاح!`);
    setTimeout(() => setAddedMessage(null), 3500);
  };

  return (
    <section className="beans-section" id="beans">
      <div className="beans-container">
        
        {/* Section Header */}
        <div className="beans-header">
          <div className="beans-badge">
            <span>✦ Single-Origin Reserve Collection</span>
          </div>
          <h2 className="beans-title">
            أنواع حبوب القهوة <br />
            <span className="beans-title-gold">من أعرق مزارع العالم إلى فنجانك</span>
          </h2>
          <p className="beans-subtitle">
            ننتقي محاصيل القهوة المختصة بعناية فائقة من مزارع عائلية مستدامة على أعلى القمم الجبلية،
            ونحمصها أسبوعياً بدرجات دقيقة لتتفجر إيحاءاتها ونكهاتها الأصلية.
          </p>
        </div>

        {/* Hero Product Highlight Banner */}
        <div className="beans-featured-banner">
          <div className="banner-image-box">
            <img
              src={specialtyBeansImg}
              alt="Aurore Specialty Coffee Beans Bags"
              className="banner-beans-img"
              loading="lazy"
            />
            <div className="banner-badge-float">
              <span>محمصة طازجاً هذا الأسبوع</span>
            </div>
          </div>
          <div className="banner-text-box">
            <span className="banner-subtag">إصدار حصري للمتذوقين</span>
            <h3 className="banner-heading">سلسلة المحاصيل المختصة الاحترافية</h3>
            <p className="banner-desc">
              نضمن لك درجة نقاء 100% وحبوب بن خالية من العيوب مصنفة بمعايير جمعية القهوة المختصة العالمية (SCA) بتقييم +86 نقطة.
            </p>
            <div className="banner-perks">
              <div className="perk-item">
                <span className="perk-icon">✓</span>
                <span>تحميص هوائي بطيء يحافظ على الزيوت العطرية</span>
              </div>
              <div className="perk-item">
                <span className="perk-icon">✓</span>
                <span>تغليف بأكياس صمام أحادي الاتجاه لحفظ النضارة</span>
              </div>
              <div className="perk-item">
                <span className="perk-icon">✓</span>
                <span>تاريخ التحميص مدون بدقة على كل عبوة</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Notification Toast */}
        {addedMessage && (
          <div className="beans-toast-notification" role="alert">
            <span className="toast-icon">☕</span>
            <span className="toast-text">{addedMessage}</span>
          </div>
        )}

        {/* Beans Grid */}
        <div className="beans-grid">
          {beanVarieties.map((bean) => (
            <article className="bean-card" key={bean.id} id={`bean-card-${bean.id}`}>
              <div className="bean-card-header">
                <div className="bean-origin-tag">
                  <span className="origin-pin">📍</span>
                  <span>{bean.originAr}</span>
                </div>
                <div className="bean-price-tag">
                  <span className="currency">$</span>
                  <span className="price-num">{bean.price}</span>
                  <span className="weight">/{bean.weight}</span>
                </div>
              </div>

              <h3 className="bean-card-name-ar">{bean.nameAr}</h3>
              <span className="bean-card-name-en">{bean.name}</span>

              {/* Specs Grid */}
              <div className="bean-specs-grid">
                <div className="bean-spec-cell">
                  <span className="spec-title">المعالجة</span>
                  <span className="spec-val">{bean.process}</span>
                </div>
                <div className="bean-spec-cell">
                  <span className="spec-title">الارتفاع</span>
                  <span className="spec-val">{bean.altitude}</span>
                </div>
              </div>

              {/* Roast Bar */}
              <div className="bean-roast-box">
                <div className="roast-header">
                  <span className="roast-title">درجة التحميص</span>
                  <span className="roast-level">{bean.roast}</span>
                </div>
                <div className="roast-track">
                  <div className="roast-fill" style={{ width: `${bean.roastPercent}%` }} />
                </div>
              </div>

              {/* Tasting Notes */}
              <div className="bean-notes-box">
                <span className="notes-heading">الإيحاءات العطرية:</span>
                <div className="notes-tags-list">
                  {bean.notes.map((note, idx) => (
                    <span key={idx} className="note-pill">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grind Selector */}
              <div className="bean-grind-selector">
                <label htmlFor={`grind-select-${bean.id}`} className="grind-label">
                  درجة الطحن:
                </label>
                <select
                  id={`grind-select-${bean.id}`}
                  className="grind-dropdown"
                  value={selectedGrind[bean.id] || 'حبوب كاملة (Whole Bean)'}
                  onChange={(e) => handleGrindChange(bean.id, e.target.value)}
                >
                  <option value="حبوب كاملة (Whole Bean)">حبوب كاملة (بدون طحن)</option>
                  <option value="إسبريسو ناعم (Espresso Fine)">إسبريسو ناعم</option>
                  <option value="فلتر / V60 متوسط (V60 Filter)">فلتر وتقطير V60 / كيمكس</option>
                  <option value="فرنش بريس خشن (French Press)">فرنش بريس خشن</option>
                  <option value="كولد برو (Cold Brew)">كولد برو خشن</option>
                </select>
              </div>

              {/* Buy CTA Button */}
              <button
                className="bean-buy-btn"
                onClick={() => handleBuy(bean)}
                id={`buy-bean-${bean.id}`}
              >
                <span className="buy-icon">🛍️</span>
                <span>إضافة إلى سلة المشتريات</span>
              </button>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CoffeeBeans;
