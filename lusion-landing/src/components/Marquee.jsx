import { motion } from 'framer-motion';

const items = ['WebGL & 3D Real-time', 'Motion Design', 'Creative Development', 'Art Direction', 'Interactive Experience', 'Brand Digital'];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <section className="marquee-section">
      <motion.div
        className="marquee-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item} <span className="dot" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}
