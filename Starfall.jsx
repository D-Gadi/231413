import { useMemo } from 'react';

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Starfall() {
  const stars = useMemo(() => {
    const rand = mulberry32(12345);
    const arr = [];
    for (let i = 0; i < 70; i++) {
      arr.push({
        left: `${Math.round(rand() * 100)}%`,
        top: `${Math.round(rand() * 100)}%`,
        dur: `${(2.5 + rand() * 4).toFixed(2)}s`,
        delay: `${(rand() * 5).toFixed(2)}s`,
      });
    }
    return arr;
  }, []);

  const shooting = useMemo(() => {
    const rand = mulberry32(6789);
    return [
      { top: '8%', left: '-8%', dur: '7s', delay: '1s' },
      { top: '35%', left: '-12%', dur: '9s', delay: '6s' },
      { top: '60%', left: '-6%', dur: '8s', delay: '11s' },
      { top: '18%', left: '-10%', dur: '10s', delay: '16s' },
      { top: staticPos(rand), left: '-9%', dur: '7.5s', delay: '21s' },
    ];
  }, []);

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className="zvezda"
          style={{ left: s.left, top: s.top, '--dur': s.dur, '--delay': s.delay }}
        />
      ))}
      {shooting.map((s, i) => (
        <span
          key={`m${i}`}
          className="padayushchaya-zvezda"
          style={{ top: s.top, left: s.left, '--trail': s.dur, '--delay2': s.delay }}
        />
      ))}
    </div>
  );
}

function staticPos(rand) {
  let n = 0;
  for (let i = 0; i < 3; i++) n = rand();
  return `${(n * 60 + 15).toFixed(0)}%`;
}

export default Starfall;
