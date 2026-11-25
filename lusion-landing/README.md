# Nebula Studio — 3D Landing Page

Landing page 3D imersif terinspirasi dari [lusion.co](https://lusion.co/) dengan identitas UI yang berbeda: palet ungu neon + teal mint, tipografi Syne/Space Grotesk, dan glassmorphism gelap.

## Fitur

- **WebGL Background (React Three Fiber + Three.js)**
  - Blob organik dengan custom GLSL shader (simplex noise vertex displacement + fresnel gradient)
  - Field partikel 1600 titik dengan additive blending
  - Torus knot wireframe & shard geometri metalik melayang
  - Kamera reaktif terhadap mouse (parallax) dan progress scroll
- **Smooth Scrolling** dengan Lenis
- **Preloader** sinematik dengan progress bar & reveal animation
- **Custom Cursor** (dot + ring dengan hover state)
- **Section**: Hero (reveal text per baris), Marquee, Layanan (glass card + spotlight hover), Karya (grid asimetris), Statistik (counter animasi), Tentang, CTA, Footer
- **Scroll-reveal animations** via Framer Motion
- Responsif penuh (mobile menu burger)

## Menjalankan

```bash
cd lusion-landing
npm install
npm run dev      # http://localhost:5173
npm run build    # produksi di folder dist/
```

## Stack

React 18 · Vite · Three.js · @react-three/fiber · Framer Motion · Lenis
