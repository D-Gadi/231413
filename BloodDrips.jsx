import './BloodDrips.css';

const STREAK_A = 'M12 0 C9.5 30 14.5 70 11.5 110 C9 148 13 190 10.2 232 L13.8 232 C16 190 12 148 14.5 110 C17.5 70 12.5 30 12 0 Z';
const DROP_A = 'M10.2 232 C7.6 246 5.4 264 6.4 282 C7.2 298 9 308 12 316 C15 308 16.8 298 17.6 282 C18.6 264 16.4 246 13.8 232 Z';
const GLOSS_A = 'M8.7 16 Q8.4 100 9 205 Q8 210 8.7 221 Q9.4 210 10.1 205 Q9.6 100 10.1 16 Z';

const STREAK_B = 'M12 0 C10.4 45 15.2 95 12 150 C10 190 13.4 240 11.2 280 L14.4 280 C16 240 13.5 190 15.6 150 C18.3 95 13.8 45 12 0 Z';
const DROP_B = 'M11.2 280 C8.8 290 7.2 302 8.4 312 C9.4 322 10.6 328 12 330 C13.4 328 14.6 322 15.6 312 C16.8 302 15.2 290 14.4 280 Z';
const GLOSS_B = 'M9 18 Q8.8 130 9.5 260 Q8.7 264 9.5 274 Q10.3 264 10.8 260 Q10.5 130 11 18 Z';

const FALLING_DROP = 'M8 1 C8 1 13 9 13 13 C13 16 10.8 17 8 17 C5.2 17 3 16 3 13 C3 9 8 1 8 1 Z';

const VARIANTS = {
  a: { streak: STREAK_A, drop: DROP_A, gloss: GLOSS_A },
  b: { streak: STREAK_B, drop: DROP_B, gloss: GLOSS_B },
};

function KrovnyePodtyki({ className = '', items = [] }) {
  return (
    <div className={`krovnye-podtyki ${className}`} aria-hidden="true">
      {items.map((d, i) => {
        const v = VARIANTS[d.variant ?? (i % 2 === 0 ? 'a' : 'b')];
        const gid = `krov-gradient-${className}-${i}`;
        return (
          <span
            key={i}
            className="kaplya"
            style={{
              '--pozitsiya': d.left,
              '--h': `${d.vysota}px`,
              '--zaderzhka': `${d.zaderzhka}s`,
              '--dlitelnost': `${d.dlitelnost}s`,
            }}
          >
            <svg className="potyok" viewBox="0 0 24 340" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#4c070c" stopOpacity="0.35" />
                  <stop offset="0.35" stopColor="#6a0c11" />
                  <stop offset="0.72" stopColor="#a3121b" />
                  <stop offset="1" stopColor="#db2830" />
                </linearGradient>
              </defs>
              <path d={v.streak} fill={`url(#${gid})`} />
              <path d={v.drop} fill={`url(#${gid})`} />
              <path d={v.gloss} fill="#fff" opacity="0.22" />
            </svg>
            <svg className="kaplyusha" viewBox="0 0 16 18" aria-hidden="true">
              <path d={FALLING_DROP} fill={`url(#${gid})`} />
            </svg>
          </span>
        );
      })}
    </div>
  );
}

export default KrovnyePodtyki;