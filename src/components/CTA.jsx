import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section id="kontak" className="cta-section">
      <div className="container">
        <motion.div
          className="cta-box"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-tag">— Mulai Kolaborasi</span>
          <h2 className="cta-title">
            Punya Ide<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(234,234,242,0.6)' }}>Gila?</span>{' '}
            <span className="grad" style={{ background: 'linear-gradient(92deg,#7c5cff,#00e5c3)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Wujudkan.</span>
          </h2>
          <p className="cta-sub">
            Ceritakan visi Anda — kami balas dalam 24 jam dengan konsep awal,
            estimasi timeline, dan sedikit sketches digital.
          </p>
          <a href="mailto:hello@nebula.studio" className="cta-btn">
            <button className="btn-primary" style={{ fontSize: 17, padding: '18px 46px' }}>
              hello@nebula.studio ↗
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
