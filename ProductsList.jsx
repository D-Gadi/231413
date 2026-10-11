import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toggleWishlist } from '../../store/wishlistSlice';
import { IoHeart, IoHeartOutline, IoCartOutline } from 'react-icons/io5';
import products from '../../data/products';
import { useLang } from '../../i18n/useLang';
import './ProductsList.css';

function ProductsList() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const { t } = useLang();

  const newProducts = products.filter((p) => p.section === 'new');
  const topProducts = products.filter((p) => p.section === 'top');

  function handleAddToCart(e, product) {
    e.preventDefault();
    dispatch(addToCart({ id: product.id, title: product.title, price: product.price, quantity: 1 }));
  }

  function handleToggleWishlist(e, product) {
    e.preventDefault();
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
    <>
      <section className="sekciya-tovarov" id="new-arrivals" data-scroll>
        <h2 className="zagolovok-sekcii">{t('products.newArrivals')}</h2>
        <div className="setka-tovarov">
          {newProducts.map(renderCard)}
        </div>
        <div className="centr-knopka">
          <Link to="/shop">{t('products.viewAll')}</Link>
        </div>
      </section>
      
      <hr className="liniya-razdelitela" />

      <section className="sekciya-tovarov" id="top-selling" data-scroll>
        <h2 className="zagolovok-sekcii">{t('products.topSelling')}</h2>
        <div className="setka-tovarov">
          {topProducts.map(renderCard)}
        </div>
        <div className="centr-knopka">
          <Link to="/shop">{t('products.viewAll')}</Link>
        </div>
      </section>
    </>
  );
}

export default ProductsList;
