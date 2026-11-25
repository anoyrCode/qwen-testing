import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const dur = 1800;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const stats = [
  { value: 120, suffix: '+', label: 'Proyek Selesai' },
  { value: 38, suffix: '', label: 'Penghargaan Global' },
  { value: 96, suffix: '%', label: 'Klien Retensi' },
  { value: 5, suffix: ' B+', label: 'Impresi Digital' },
];

export default function Stats() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="container">
        <motion.div
          className="stats-band"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {stats.map((s) => (
            <div className="stat-item" key={s.label}>
              <div className="stat-value"><Counter to={s.value} suffix={s.suffix} /></div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
