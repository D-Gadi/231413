import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toggleWishlist } from '../../store/wishlistSlice';
import { IoHeart, IoHeartOutline, IoCartOutline } from 'react-icons/io5';
import products from '../../data/products';
import KrovnyePodtyki from '../BloodDrips/BloodDrips';
import { useLang } from '../../i18n/useLang';
import '../ProductsList/ProductsList.css';
import './Shop.css';

const KROV_V_KATALOGE = [
  { left: '6%', vysota: 150, zaderzhka: 0, dlitelnost: 8 },
  { left: '90%', vysota: 190, zaderzhka: 1.6, dlitelnost: 9 },
  { left: '97%', vysota: 120, zaderzhka: 3.8, dlitelnost: 6.5 },
];

function Shop() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const [filter, setFilter] = useState('all');
  const { t } = useLang();

  const filtered = products.filter((p) => {
    if (filter === 'sale') return p.discount;
    if (filter === 'new') return p.section === 'new';
    if (filter === 'top') return p.section === 'top';
    return true;
  });

  function handleAddToCart(e, product) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ id: product.id, title: product.title, price: product.price, quantity: 1 }));
  }

  function handleToggleWishlist(e, product) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist({ id: product.id, title: product.title, price: product.price }));
  }

  function renderCard(product) {
    const isLiked = wishlist.some((i) => i.id === product.id);
    return (
      <div className="kartochka-tovara" key={product.id}>
        <div className="fon-kartinki">
          <div className="knopki-kartochki">
            <button className="znachok-kartochki" onClick={(e) => handleToggleWishlist(e, product)}>
              {isLiked ? <IoHeart className="icon-filled-red" /> : <IoHeartOutline />}
            </button>
            <button className="znachok-kartochki" onClick={(e) => handleAddToCart(e, product)}>
              <IoCartOutline />
            </button>
          </div>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="nazvanie-skoroo">
            {t('products.soon')}
            <span className="tochki-skoroo" aria-hidden="true"><i>.</i><i>.</i><i>.</i><i>.</i><i>.</i></span>
          </h3>
        </Link>
      </div>
    );
  }

  return (
    <div className="stranica-kataloga">
      <KrovnyePodtyki className="krov-v-kataloge" items={KROV_V_KATALOGE} />
      <h1 className="zagolovok-kataloga">{t('products.shopAll')}</h1>
      <p className="podzagolovok-kataloga">{t('products.items', { count: filtered.length })}</p>

      <div className="filtry-kataloga" data-scroll>
        <button className={filter === 'all' ? 'aktivniy-filtr' : ''} onClick={() => setFilter('all')}>{t('products.all')}</button>
        <button className={filter === 'new' ? 'aktivniy-filtr' : ''} onClick={() => setFilter('new')}>{t('nav.newArrivals')}</button>
        <button className={filter === 'top' ? 'aktivniy-filtr' : ''} onClick={() => setFilter('top')}>{t('products.topTitle')}</button>
        <button className={filter === 'sale' ? 'aktivniy-filtr' : ''} onClick={() => setFilter('sale')}>{t('nav.onSale')}</button>
      </div>

      <div className="setka-kataloga" data-scroll>
        {filtered.map(renderCard)}
      </div>
    </div>
  );
}

export default Shop;