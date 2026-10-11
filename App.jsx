import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Brands from './components/Brands/Brands';
import ProductsList from './components/ProductsList/ProductsList';
import Footer from './components/Footer/Footer';
import SingleProduct from './components/SingleProduct/SingleProduct';
import Shop from './components/Shop/Shop';
import Starfall from './components/Starfall/Starfall';
import './App.css';

function ScrollReveal({ path }) {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-scroll]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [path]);
  return null;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgress(total > 0 ? (doc.scrollTop / total) * 100 : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="polosa-progress" style={{ width: `${progress}%` }} />;
}

function HomePage() {
  return (
    <>
      <Hero />
      <Brands />
      <ProductsList />
    </>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="app-container">
      <Starfall />
      <ScrollReveal path={location.pathname} />
      <ScrollProgress />
      <Header />

      <div className="stranitsa-fade" key={location.pathname}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
