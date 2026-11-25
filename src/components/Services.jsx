import { motion } from 'framer-motion';

const services = [
  {
    icon: '🧊',
    title: 'Real-time 3D & WebGL',
    desc: 'Situs interaktif dengan visual 3D yang berjalan mulus di browser — dari product configurator hingga dunia virtual penuh.',
  },
  {
    icon: '🎬',
    title: 'Motion & Animation',
    desc: 'Transisi sinematik, scroll-storytelling, dan micro-interaction yang membuat setiap interaksi terasa hidup dan bermakna.',
  },
  {
    icon: '🛰️',
    title: 'Creative Development',
    desc: 'Engineering front-end tingkat lanjut dengan React, Three.js, dan shader custom — performa tinggi tanpa mengorbankan estetika.',
  },
  {
    icon: '🎨',
    title: 'Art Direction & UI',
    desc: 'Identitas visual digital yang khas: tipografi kuat, palet berani, dan sistem desain yang konsisten di setiap titik kontak.',
  },
  {
    icon: '🌐',
    title: 'Immersive Experience',
    desc: 'Pengalaman imersif lintas perangkat — WebXR, instalasi interaktif, dan ruang virtual yang menghubungkan brand dengan audiens.',
  },
  {
    icon: '⚡',
    title: 'Brand Digital Launch',
    desc: 'Strategi, produksi, dan peluncuran produk digital end-to-end, dari konsep awal hingga metrik pasca-rilis.',
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Services() {
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="layanan">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="section-tag">— Layanan Kami</span>
            <h2 className="section-title">
              Kapabilitas<br />Kreatif & Teknis
            </h2>
          </div>
          <p className="section-desc">
            Kami menggabungkan seni dan engineering untuk menciptakan pengalaman
            digital yang belum pernah ada sebelumnya.
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              className="service-card"
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              onMouseMove={handleMove}
            >
              <span className="service-num">0{i + 1}</span>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <a href="#kontak" className="service-link" onClick={(e) => { e.preventDefault(); document.querySelector('#kontak')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Pelajari Lebih →
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
