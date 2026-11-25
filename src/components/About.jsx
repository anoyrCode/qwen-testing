import { motion } from 'framer-motion';

const tech = ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'GSAP', 'Lenis', 'WebGPU', 'Blender', 'Figma', 'Next.js', 'R3F Postprocessing'];

export default function About() {
  return (
    <section id="tentang">
      <div className="container about-split">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-tag">— Tentang Nebula</span>
          <p className="about-big">
            Kami percaya internet layak mendapat <em>keindahan</em> — bukan hanya informasi.
          </p>
          <div className="tech-pills">
            {tech.map((t) => (
              <span className="tech-pill" key={t}>{t}</span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about-body"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            Berbasis di Jakarta dan bekerja dengan klien di seluruh dunia, Nebula adalah
            tim kecil desainer, engineer, dan seniman 3D yang terobsesi pada detail.
            Kami membangun antarmuka yang bergerak seperti film dan merespons seperti makhluk hidup.
          </p>
          <p>
            Setiap proyek dimulai dari satu pertanyaan: bagaimana jika web tidak hanya dibaca,
            tetapi dirasakan? Dari sanalah eksperimen shader, simulasi partikel, dan koreografi
            motion kami lahir.
          </p>
          <p>
            Hasilnya: pengalaman digital yang menang awards, menaikkan konversi, dan —
            yang paling penting — membuat orang tersenyum saat scrolling.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
