import { useLang } from '../../i18n/useLang';
import './Reviews.css';

function Reviews() {
  const { t } = useLang();
  const REVIEWS = t('reviewsSection.items');
  return (
    <section className="sekciya-otzivov">
      <div className="shapka-otzivov" data-scroll>
        <h2 className="zagolovok-otzivov">{t('reviewsSection.title')}</h2>
      </div>

      <div className="polosa-s-otzivami" data-scroll>
        <div className="begushchie-otzivi">
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <div className="otziv-kartochka" key={i}>
              <div className="zvezdi-otziva">⭐⭐⭐⭐⭐</div>
              <div className="imya-klienta">{r.name} <span className="galochka-ok">✓</span></div>
              <p className="text-otziva">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
