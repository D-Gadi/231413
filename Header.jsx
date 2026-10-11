import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../store/wishlistSlice';
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from '../../store/cartSlice';
import { IoHeart, IoHeartOutline, IoCart, IoCartOutline, IoClose, IoRemoveOutline, IoAddOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { useLang } from '../../i18n/useLang';
import './Header.css';

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLikeOpen, setIsLikeOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const menuRef = useRef(null);
  const { t, lang, toggle } = useLang();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const anyPanelOpen = isCartOpen || isLikeOpen;

  function closeAll() {
    setIsCartOpen(false);
    setIsLikeOpen(false);
    setIsMenuOpen(false);
  }

  function openCart() {
    setCheckoutDone(false);
    setIsLikeOpen(false);
    setIsMenuOpen(false);
    setIsCartOpen(true);
  }

  function openWishlist() {
    setIsCartOpen(false);
    setIsMenuOpen(false);
    setIsLikeOpen(true);
  }

  function scrollToSection(sectionId) {
    closeAll();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }), 120);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') closeAll();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (anyPanelOpen || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [anyPanelOpen, isMenuOpen]);

  function checkout() {
    if (cart.length === 0) return;
    dispatch(clearCart());
    setCheckoutDone(true);
  }

  function renderWishlistItem(item, i) {
    return (
      <li key={item.id} className="dropdown-item" style={{ animationDelay: `${i * 60}ms` }}>
        <Link to={`/product/${item.id}`} className="dropdown-item-link" onClick={closeAll}>
          <div className="dropdown-item-info">
            <span>{item.title}</span>
            <span>${item.price}</span>
          </div>
        </Link>
        <button className="dropdown-remove" onClick={() => dispatch(removeFromWishlist(item))} aria-label="Remove">
          <IoClose />
        </button>
      </li>
    );
  }

  function renderCartItem(item, i) {
    return (
      <li key={`${item.id}-${item.size}-${item.color}`} className="dropdown-item" style={{ animationDelay: `${i * 60}ms` }}>
        <Link to={`/product/${item.id}`} className="dropdown-item-link" onClick={closeAll}>
          <div className="dropdown-item-info">
            <span>{item.title}</span>
            <span className="dropdown-item-details">
              {item.size && `${t('cart.size')}: ${item.size}`}
              {item.color && ` | Color: ${item.color}`}
            </span>
            <span>${item.price} × {item.quantity}</span>
          </div>
        </Link>
        <div className="dropdown-item-actions">
          <button onClick={() => dispatch(decreaseQuantity({ id: item.id, size: item.size, color: item.color }))} aria-label="Decrease">
            <IoRemoveOutline />
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => dispatch(increaseQuantity({ id: item.id, size: item.size, color: item.color }))} aria-label="Increase">
            <IoAddOutline />
          </button>
          <button className="dropdown-remove" onClick={() => dispatch(removeFromCart(item))} aria-label="Remove">
            <IoClose />
          </button>
        </div>
      </li>
    );
  }

  return (
    <>
      <header className={`shapka ${scrolled ? 'scrolled' : ''}`}>
        <div className="vnutri-shapki">
          <Link to="/" className="glavniy-logotip" onClick={closeAll}>GADI'S HOPE</Link>

          <nav className="skolzyashee-menu">
            <button onClick={() => { closeAll(); navigate('/shop'); }}>{t('nav.shop')}</button>
            <button onClick={() => scrollToSection('top-selling')}>{t('nav.onSale')}</button>
            <button onClick={() => scrollToSection('new-arrivals')}>{t('nav.newArrivals')}</button>
            <button onClick={() => scrollToSection('brands')}>{t('nav.brands')}</button>
          </nav>

          <div className="pravaya-chast">
            <button className="pereklyuchatel-yazyka" aria-label="Switch language" onClick={toggle}>
              {lang === 'ru' ? 'EN' : 'RU'}
            </button>
            <button className="burger-knopka" aria-label="Меню" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <IoClose /> : '☰'}
            </button>

            <div className="karzina-i-profil">
              <div className="knopka-s-badzheyom">
                <button className="znachok" aria-label="Избранное" onClick={openWishlist}>
                  {wishlistCount > 0 ? <IoHeart className="icon-filled-red" /> : <IoHeartOutline />}
                  {wishlistCount > 0 && <span className="badzhey">{wishlistCount}</span>}
                </button>
              </div>

              <div className="knopka-s-badzheyom">
                <button className="znachok" aria-label="Корзина" onClick={openCart}>
                  {cartCount > 0 ? <IoCart /> : <IoCartOutline />}
                  {cartCount > 0 && <span className="badzhey">{cartCount}</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="mobilnoe-menyu" ref={menuRef}>
          <button onClick={() => { closeAll(); navigate('/shop'); }}>{t('nav.shop')}</button>
          <button onClick={() => scrollToSection('top-selling')}>{t('nav.onSale')}</button>
          <button onClick={() => scrollToSection('new-arrivals')}>{t('nav.newArrivals')}</button>
          <button onClick={() => scrollToSection('brands')}>{t('nav.brands')}</button>
        </div>
      )}

      <div className={`pane-overlay ${isLikeOpen || isCartOpen ? 'open' : ''}`} onClick={closeAll} />

      <aside className={`pane-drawer ${isLikeOpen ? 'open' : ''}`} aria-hidden={!isLikeOpen} aria-label="Wishlist">
        <div className="pane-head">
          <div>
            <h3>{t('cart.wishlist')}</h3>
            <span className="pane-sub">{t('cart.wishlistItems', { count: wishlistCount })}</span>
          </div>
          <button className="pane-close" onClick={closeAll} aria-label="Close"><IoClose /></button>
        </div>

        <div className="pane-body">
          {wishlist.length === 0 ? (
            <div className="pane-pusto">
              <IoHeartOutline className="pane-pusto-icon" />
              <p>{t('cart.emptyWishlist')}</p>
              <Link to="/shop" className="pane-pusto-link" onClick={closeAll}>{t('cart.explore')}</Link>
            </div>
          ) : (
            <ul className="pane-list">{wishlist.map(renderWishlistItem)}</ul>
          )}
        </div>
      </aside>

      <aside className={`pane-drawer ${isCartOpen ? 'open' : ''}`} aria-hidden={!isCartOpen} aria-label="Shopping cart">
        <div className="pane-head">
          <div>
            <h3>{t('cart.cart')}</h3>
            <span className="pane-sub">{t('cart.wishlistItems', { count: cartCount })}</span>
          </div>
          <button className="pane-close" onClick={closeAll} aria-label="Close"><IoClose /></button>
        </div>

        <div className="pane-body">
          {checkoutDone ? (
            <div className="pane-uspeh">
              <IoCheckmarkCircle className="pane-uspeh-icon" />
              <h4>{t('cart.orderPlaced')}</h4>
              <p>{t('cart.thankYou')}</p>
              <Link to="/shop" className="pane-pusto-link" onClick={closeAll}>{t('cart.continue')}</Link>
            </div>
          ) : cart.length === 0 ? (
            <div className="pane-pusto">
              <IoCartOutline className="pane-pusto-icon" />
              <p>{t('cart.emptyCart')}</p>
              <Link to="/shop" className="pane-pusto-link" onClick={closeAll}>{t('cart.explore')}</Link>
            </div>
          ) : (
            <>
              <ul className="pane-list">{cart.map(renderCartItem)}</ul>
            </>
          )}
        </div>

        {!checkoutDone && cart.length > 0 && (
          <div className="pane-foot">
            <div className="pane-total">
              <span>{t('cart.subtotal')}</span>
              <span>${cartTotal}</span>
            </div>
            <button className="pane-cta" onClick={checkout}>{t('cart.checkout')}</button>
          </div>
        )}
      </aside>
    </>
  );
}

export default Header;