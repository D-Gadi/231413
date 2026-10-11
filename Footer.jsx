import { Link } from 'react-router-dom';
import { FaTiktok, FaTelegram, FaInstagram } from 'react-icons/fa';
import KrovnyePodtyki from '../BloodDrips/BloodDrips';
import { useLang } from '../../i18n/useLang';
import './Footer.css';

const KROV_V_PODVALE = [
  { left: '3%', vysota: 90, zaderzhka: 0, dlitelnost: 7 },
  { left: '10%', vysota: 55, zaderzhka: 2.5, dlitelnost: 6 },
  { left: '85%', vysota: 65, zaderzhka: 3.5, dlitelnost: 6.5 },
  { left: '96%', vysota: 110, zaderzhka: 1.2, dlitelnost: 8 },
];

function Footer() {
  const { t } = useLang();
  return (
    <footer className="samiy-nizhniy-podval">
      <KrovnyePodtyki className="krov-v-podvale" items={KROV_V_PODVALE} />
      <div className="vnutri-podvala">
        <div className="vse-kolonki-podvala" data-scroll>
          <div className="kolonka-info">
            <Link to="/" className="logo-v-podvale">GADI'S HOPE</Link>
            <p className="opisanie-v-podvale">{t('footer.description')}</p>
            <div className="soc-seti">
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok /></a>
              <a href="https://t.me/Gadishope" target="_blank" rel="noreferrer" aria-label="Telegram"><FaTelegram /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>

          <div className="kolonka-ssilok">
            <h3>{t('footer.company')}</h3>
            {t('footer.companyLinks').map((l) => <a key={l} href="#">{l}</a>)}
          </div>

          <div className="kolonka-ssilok">
            <h3>{t('footer.help')}</h3>
            {t('footer.helpLinks').map((l) => <a key={l} href="#">{l}</a>)}
          </div>

          <div className="kolonka-ssilok">
            <h3>{t('footer.faq')}</h3>
            {t('footer.faqLinks').map((l) => <a key={l} href="#">{l}</a>)}
          </div>

          <div className="kolonka-ssilok">
            <h3>{t('footer.resources')}</h3>
            {t('footer.resourcesLinks').map((l) => <a key={l} href="#">{l}</a>)}
          </div>
        </div>

        <hr className="podvalnaya-liniya" />

        <div className="avtorskie-prava">
          <p>{t('footer.rights')}</p>
          <div className="iconki-platizhey">
            {t('footer.payments').map((p) => <span key={p}>{p}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;