import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Lenis from 'lenis';

import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Works from './components/Works';
import Stats from './components/Stats';
import About from './components/About';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { ParticleField, Blob, FloatingKnot, Shards, ScrollRig } from './components/Scene3D';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const scrollRef = useRef(0);

  // Smooth scroll (Lenis) + progress tracking untuk kamera 3D
  useEffect(() => {
    if (!loaded) return;
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('scroll', onScroll);
    };
  }, [loaded]);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      <Cursor />
      <Navbar />

      {/* ===== WebGL background (fixed) ===== */}
      <div className="canvas-fixed">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 55 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[4, 6, 4]} intensity={1.2} color="#cfd6ff" />
            <pointLight position={[-6, -2, 2]} intensity={40} color="#7c5cff" distance={18} />
            <pointLight position={[6, 3, -2]} intensity={30} color="#00e5c3" distance={16} />

            <ParticleField count={1600} />
            <Blob position={[2.6, 0.3, -1]} scale={1.15} speed={1} />
            <Blob position={[-4.2, -2.5, -4]} scale={0.6} speed={1.4} />
            <FloatingKnot position={[4.6, 1.6, -3.5]} />
            <Shards count={16} />
            <ScrollRig scrollRef={scrollRef} />
          </Suspense>
        </Canvas>
      </div>

      <div className="noise-overlay" />

      <main>
        <Hero />
        <Marquee />
        <Services />
        <Works />
        <Stats />
        <About />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
