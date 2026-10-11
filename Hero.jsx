import { useEffect, useState } from 'react';
import { FaTelegram } from 'react-icons/fa';
import KrovnyePodtyki from '../BloodDrips/BloodDrips';
import { useLang } from '../../i18n/useLang';
import './Hero.css';

const FULL_TEXT = 'MATCHES YOUR STYLE';

const KROV_V_GEROE = [
  { left: '6%', vysota: 170, zaderzhka: 0, dlitelnost: 7.5 },
  { left: '14%', vysota: 220, zaderzhka: 2.2, dlitelnost: 8.5 },
  { left: '30%', vysota: 110, zaderzhka: 4, dlitelnost: 6.5 },
  { left: '72%', vysota: 260, zaderzhka: 0.8, dlitelnost: 9 },
  { left: '84%', vysota: 150, zaderzhka: 3.2, dlitelnost: 7 },
  { left: '95%', vysota: 210, zaderzhka: 1.4, dlitelnost: 8 },
];

function Typewriter({ text }) {
  const [display, setDisplay] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (display.length < text.length) {
          setDisplay(text.slice(0, display.length + 1));
        } else {
          setDeleting(true);
        }
      } else {
        if (display.length > 0) {
          setDisplay(text.slice(0, display.length - 1));
        } else {
          setDeleting(false);
        }
      }
    }, deleting ? 60 : 140);
    return () => clearTimeout(timeout);
  }, [display, deleting, text]);

  return <span>{display}<span className="migayushchiy-kursor">|</span></span>;
}

function Hero() {
  const { t } = useLang();

  function shopNow() {
    document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="glavniy-baner">
      <div className="aura aura-1"></div>
      <div className="aura aura-2"></div>
      <KrovnyePodtyki className="krov-v-geroe" items={KROV_V_GEROE} />
      <div className="vnutri-banera">
        <div className="levaya-chast" data-scroll>
          <h1 className="ogromniy-zagolovok">
            FIND CLOTHES THAT <Typewriter text={FULL_TEXT} />
          </h1>
          <p className="malenkiy-text">{t('hero.tagline')}</p>
          <div className="deystviya-geroya">
            <a href="#" className="knopka-v-magazine" onClick={(e) => { e.preventDefault(); shopNow(); }}>{t('hero.shopNow')}</a>
            <a href="https://t.me/Gadishope" target="_blank" rel="noopener noreferrer" className="telegram-banner" data-scroll>
              <span className="telegram-znachok"><FaTelegram /></span>
              <span className="telegram-text">{t('hero.telegram')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;