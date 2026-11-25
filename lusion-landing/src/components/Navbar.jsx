import { useEffect, useState } from 'react';

const links = [
  { label: 'Beranda', href: '#top' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Karya', href: '#karya' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Kontak', href: '#kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href) => (e) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="nav-logo" onClick={go('#top')}>
          <span className="orb" /> NEBULA
        </a>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={go(l.href)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={go('#kontak')}>Mulai Proyek</button>
        <button className="burger" aria-label="menu" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
