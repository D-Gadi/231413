import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { IoCheckmark, IoStar, IoStarOutline, IoCheckmarkCircle, IoEllipsisHorizontal, IoAddOutline } from 'react-icons/io5';
import products from '../../data/products';
import KrovnyePodtyki from '../BloodDrips/BloodDrips';
import { useLang } from '../../i18n/useLang';
import '../ProductsList/ProductsList.css';
import './SingleProduct.css';

const KROV_V_KATALOGE = [
  { left: '6%', vysota: 140, zaderzhka: 0, dlitelnost: 8 },
  { left: '90%', vysota: 180, zaderzhka: 1.6, dlitelnost: 9 },
  { left: '97%', vysota: 110, zaderzhka: 3.8, dlitelnost: 6.5 },
];

const INITIAL_REVIEWS = [
  { id: 1, name: 'Samantha D.', rating: 4, date: 'August 14, 2023', text: 'I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail.' },
  { id: 2, name: 'Alex M.', rating: 5, date: 'August 15, 2023', text: 'The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch.' },
  { id: 3, name: 'Ethan R.', rating: 5, date: 'August 20, 2023', text: 'Great fit, premium fabric. I have already ordered three more pieces.' },
  { id: 4, name: 'Olivia P.', rating: 3, date: 'September 2, 2023', text: 'Nice design but the size runs a bit small. Order one size up.' },
  { id: 5, name: 'Noah K.', rating: 5, date: 'September 10, 2023', text: 'Best quality I have found online. Delivery was also super fast.' },
  { id: 6, name: 'Emma L.', rating: 4, date: 'September 18, 2023', text: 'Beautiful shirt, exactly as pictured. Would recommend to a friend.' },
];

function SingleProduct() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useLang();

  const [quantity, setQuantity] = useState(1);
  const [activeSize, setActiveSize] = useState('Large');
  const [activeColor, setActiveColor] = useState('color1');
  const [activeTab, setActiveTab] = useState('reviews');
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [visibleCount, setVisibleCount] = useState(2);
  const [sortBy, setSortBy] = useState('latest');
  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [starRating, setStarRating] = useState(5);
  const [openFaq, setOpenFaq] = useState(0);

  const product = products.find((p) => p.id === id) || products[0];

  function decreaseQuantity() {
    if (quantity > 1) setQuantity(quantity - 1);
  }

  function increaseQuantity() {
    setQuantity(quantity + 1);
  }

  function handleAddToCart() {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      size: activeSize,
      color: activeColor,
      quantity,
    }));
    setQuantity(1);
  }

  const sortedReviews = [...reviews]
    .sort((a, b) => (sortBy === 'highest' ? b.rating - a.rating : a.id - b.id))
    .slice(0, visibleCount);

  function submitReview(e) {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;
    setReviews((prev) => [
      {
        id: Date.now(),
        name: author.trim(),
        rating: starRating,
        date: 'Now',
        text: comment.trim(),
        isNew: true,
      },
      ...prev,
    ]);
    setAuthor('');
    setComment('');
    setStarRating(5);
    setShowForm(false);
    setVisibleCount(reviews.length + 1);
  }

  function renderStars(ratingStr) {
    const full = Math.floor(parseFloat(ratingStr));
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < full ? <IoStar key={i} className="star-icon filled" /> : <IoStarOutline key={i} className="star-icon" />);
    }
    return stars;
  }

  function renderReviewStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <IoStar key={i} className="star-icon filled" /> : <IoStarOutline key={i} className="star-icon" />);
    }
    return stars;
  }

  return (
    <div className="stranica-tovara">
      <KrovnyePodtyki className="krov-v-kataloge" items={KROV_V_KATALOGE} />
      <div className="hlebnie-kroshki">
        <Link to="/">{t('product.home')}</Link> &gt; <Link to="/shop">{t('product.shop')}</Link> &gt; <span>{product.title}</span>
      </div>

      <div className="verh-tovara" data-scroll>
        <div className="info-o-tovare">
          <h1 className="nazvanie-tovara">{product.title}</h1>
          <div className="zvezdi-tovara">{renderStars(product.rating)} <span>{product.rating}</span></div>
          <div className="cena-tovara">
            ${product.price}
            {product.oldPrice && <span className="staraya-cena">${product.oldPrice}</span>}
            {product.discount && <span className="skidka-teg">{product.discount}</span>}
          </div>
          <p className="opisanie-text">
            {t('product.description')}
          </p>

          <hr className="razdelitel" />

          <div className="vibor-cveta">
            <p>{t('product.selectColors')}</p>
            <div className="cvetnie-krugi">
              <button className={`krug-cvet cvet-1 ${activeColor === 'color1' ? 'aktivniy-cvet' : ''}`} onClick={() => setActiveColor('color1')} aria-label="Black">
                {activeColor === 'color1' && <IoCheckmark />}
              </button>
              <button className={`krug-cvet cvet-2 ${activeColor === 'color2' ? 'aktivniy-cvet' : ''}`} onClick={() => setActiveColor('color2')} aria-label="White">
                {activeColor === 'color2' && <IoCheckmark />}
              </button>
              <button className={`krug-cvet cvet-3 ${activeColor === 'color3' ? 'aktivniy-cvet' : ''}`} onClick={() => setActiveColor('color3')} aria-label="Gray">
                {activeColor === 'color3' && <IoCheckmark />}
              </button>
            </div>
          </div>

          <hr className="razdelitel" />

          <div className="vibor-razmera">
            <p>{t('product.chooseSize')}</p>
            <div className="knopki-razmerov">
              {t('product.sizes').map((s) => (
                <button key={s} className={`knopka-razmer ${activeSize === s ? 'aktivniy-razmer' : ''}`} onClick={() => setActiveSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          <hr className="razdelitel" />

          <div className="blok-pokupki">
            <div className="kolichestvo">
              <button onClick={decreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>
            <button className="knopka-v-korzinu" onClick={handleAddToCart}>{t('product.addToCart')}</button>
          </div>
        </div>
      </div>

      <div className="vkladki-tovara" data-scroll>
        <button className={`vkladka ${activeTab === 'details' ? 'aktivnaya-vkladka' : ''}`} onClick={() => setActiveTab('details')}>{t('product.details')}</button>
        <button className={`vkladka ${activeTab === 'reviews' ? 'aktivnaya-vkladka' : ''}`} onClick={() => setActiveTab('reviews')}>{t('product.reviews')}</button>
        <button className={`vkladka ${activeTab === 'faqs' ? 'aktivnaya-vkladka' : ''}`} onClick={() => setActiveTab('faqs')}>{t('product.faqs')}</button>
      </div>

      {activeTab === 'details' && (
        <div className="vnutri-vkladki" data-scroll>
          <h3>{t('product.detailsTitle')}</h3>
          <p className="opisanie-text">
            {t('product.detailsDesc')}
          </p>
          <ul className="spisok-harakteristik">
            {t('product.features').map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="sekciya-otzivov-tovara" data-scroll>
          <div className="shapka-otzivov">
            <h3>{t('product.allReviews')} <span className="cifra-otzivov">({reviews.length})</span></h3>
            <div className="upravlenie-otzivami">
              <select className="vipadashka" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="latest">{t('product.latest')}</option>
                <option value="highest">{t('product.highest')}</option>
              </select>
              <button className="napisat-otziv" onClick={() => setShowForm(!showForm)}>{t('product.writeReview')}</button>
            </div>
          </div>

          {showForm && (
            <form className="forma-otziva" onSubmit={submitReview}>
              <p>{t('product.leaveReview')}</p>
              <div className="zvezdi-formi">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button type="button" key={n} onClick={() => setStarRating(n)} aria-label={`${n} stars`}>
                    {n <= starRating ? <IoStar className="star-icon filled" /> : <IoStarOutline className="star-icon" />}
                  </button>
                ))}
              </div>
              <input type="text" placeholder={t('product.yourName')} value={author} onChange={(e) => setAuthor(e.target.value)} />
              <textarea placeholder={t('product.shareThoughts')} value={comment} onChange={(e) => setComment(e.target.value)} />
              <button type="submit" className="knopka-v-korzinu">{t('product.submitReview')}</button>
            </form>
          )}

          <div className="setka-otzivov">
            {sortedReviews.map((r) => (
              <div className="kartochka-otziva" key={r.id}>
                <div className="verh-otziva">
                  <div className="zvezdochki">{renderReviewStars(r.rating)}</div>
                  {r.isNew && <span className="noviy-otziv-teg">{t('product.new')}</span>}
                  <button className="troetochie" aria-label="More"><IoEllipsisHorizontal /></button>
                </div>
                <h4>{r.name} <IoCheckmarkCircle className="galochka-icon" /></h4>
                <p>"{r.text}"</p>
                <span className="data-otziva">{t('product.postedOn', { date: r.date })}</span>
              </div>
            ))}
          </div>

          {visibleCount < reviews.length && (
            <div className="knopka-zagruzit-eshe">
              <button onClick={() => setVisibleCount((c) => c + 2)}><IoAddOutline /> {t('product.loadMore')}</button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'faqs' && (
        <div className="vnutri-vkladki" data-scroll>
          <h3>{t('product.faqsTitle')}</h3>
          <div className="spisok-fak">
            {t('faqs').map((f, i) => (
              <div className="fak-vopros" key={i}>
                <button className={`fak-zagolovok ${openFaq === i ? 'otkritiy' : ''}`} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  {f.q}
                </button>
                {openFaq === i && <p className="fak-otvet">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pohozhie-tovari" data-scroll>
        <h2 className="zagolovok-pohozhih">{t('product.youMightLike')}</h2>
        <div className="setka-pohozhih">
          {products.filter((p) => p.id !== id).slice(0, 4).map((p) => (
            <Link to={`/product/${p.id}`} className="kartochka-tovara" key={p.id}>
              <div className="fon-kartinki" />
              <h3>{p.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;