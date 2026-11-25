import { motion } from 'framer-motion';

const works = [
  { title: 'Aurora Motors', cat: 'Configurator 3D Real-time', grad: 'linear-gradient(135deg, #1a0b3d 0%, #7c5cff 55%, #00e5c3 100%)' },
  { title: 'Nova Finance', cat: 'Fintech Brand Experience', grad: 'linear-gradient(135deg, #06222b 0%, #00e5c3 70%, #baffe9 100%)' },
  { title: 'Prisma Audio', cat: 'WebXR Product Launch', grad: 'linear-gradient(135deg, #2b0640 0%, #ff5cb8 60%, #7c5cff 100%)' },
  { title: 'Orbit Space Co', cat: 'Immersive Storytelling', grad: 'linear-gradient(135deg, #04061c 0%, #2b49ff 60%, #7ce8ff 100%)' },
  { title: 'Lumen Gallery', cat: 'Virtual Exhibition', grad: 'linear-gradient(135deg, #1f1200 0%, #ffb347 60%, #ff5c5c 100%)' },
];

export default function Works() {
  return (
    <section id="karya">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="section-tag">— Karya Terpilih</span>
            <h2 className="section-title">Proyek Yang<br />Kami Banggakan</h2>
          </div>
          <p className="section-desc">
            Sebagian kolaborasi dengan brand global yang mendefinisikan ulang
            cara orang merasakan sebuah produk digital.
          </p>
        </motion.div>

        <div className="works-grid">
          {works.map((w, i) => (
            <motion.article
              key={w.title}
              className="work-card"
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="work-bg" style={{ background: w.grad }}>
                {/* decorative grid overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.25), transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.35), transparent 50%)',
                }} />
              </div>
              <div className="work-info">
                <div>
                  <span className="work-cat">{w.cat}</span>
                  <h3>{w.title}</h3>
                </div>
                <span className="work-arrow">↗</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
