import { motion } from 'framer-motion';

const lineVariant = {
  hidden: { y: '110%' },
  visible: (i) => ({
    y: '0%',
    transition: { duration: 1, delay: 0.2 + i * 0.12, ease: [0.76, 0, 0.24, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <motion.div
          className="hero-kicker"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="pulse" /> Creative Digital Studio — Est. 2021
        </motion.div>

        <h1 className="hero-title">
          <span className="line">
            <motion.span variants={lineVariant} custom={0} initial="hidden" animate="visible" style={{ display: 'inline-block' }}>
              We Craft
            </motion.span>
          </span>
          <span className="line">
            <motion.span className="grad" variants={lineVariant} custom={1} initial="hidden" animate="visible" style={{ display: 'inline-block' }}>
              Immersive
            </motion.span>
          </span>
          <span className="line">
            <motion.span className="outline" variants={lineVariant} custom={2} initial="hidden" animate="visible" style={{ display: 'inline-block' }}>
              Experiences
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
        >
          Nebula adalah studio kreatif yang membangun pengalaman digital imersif —
          perpaduan desain, teknologi real-time 3D, dan motion untuk brand yang ingin
          tampil berbeda di internet.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
        >
          <button
            className="btn-primary"
            onClick={() => document.querySelector('#karya')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Jelajahi Karya Kami
          </button>
          <button
            className="btn-ghost"
            onClick={() => document.querySelector('#kontak')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Hubungi Studio
          </button>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span>Scroll</span>
        <span className="scroll-line" />
      </motion.div>
    </section>
  );
}
