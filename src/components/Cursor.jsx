import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      const target = e.target.closest('a, button, .work-card, .service-card, .tech-pill');
      setHovering(!!target);
    };
    window.addEventListener('mousemove', move);

    let raf;
    const loop = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
      if (dot.current)
        dot.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      if (ring.current)
        ring.current.style.transform = `translate(${ringPos.current.x - (hovering ? 32 : 20)}px, ${ringPos.current.y - (hovering ? 32 : 20)}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, [hovering]);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className={`cursor-ring ${hovering ? 'hovering' : ''}`} />
    </>
  );
}
