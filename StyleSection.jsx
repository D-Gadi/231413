import { useLang } from '../../i18n/useLang';
import './StyleSection.css';

function StyleSection() {
  const { t } = useLang();
  return (
    <section className="bolshoy-sery-block" data-scroll>
      <div className="vnutri-serogo">
        <h2 className="zagolovok-sekcii-stiley">{t('style.title')}</h2>
        <div className="setka-stiley">
          <div className="stil-kartochka malenkaya casual"><span>{t('style.casual')}</span></div>
          <div className="stil-kartochka bolshaya formal"><span>{t('style.formal')}</span></div>
          <div className="stil-kartochka bolshaya party"><span>{t('style.party')}</span></div>
          <div className="stil-kartochka malenkaya gym"><span>{t('style.gym')}</span></div>
        </div>
      </div>
    </section>
  );
}

export default StyleSection;