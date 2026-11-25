import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 2200;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      // ease out
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setDone(true), 350);
        setTimeout(() => onComplete && onComplete(), 1200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div className="preloader" exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}>
          <motion.div
            className="preloader-logo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Nebula
          </motion.div>
          <div className="preloader-bar">
            <motion.div className="preloader-progress" style={{ scaleX: progress / 100 }} />
          </div>
          <div className="preloader-count">{String(progress).padStart(3, '0')} %</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
