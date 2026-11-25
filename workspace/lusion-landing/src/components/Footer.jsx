export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="nav-logo">
              <span className="orb" /> NEBULA
            </a>
            <p>
              Studio pengalaman digital imersif. Kami merancang, memprogram, dan
              menganimasikan masa depan web.
            </p>
          </div>
          <div className="footer-col">
            <h4>Navigasi</h4>
            <ul>
              <li><a href="#top">Beranda</a></li>
              <li><a href="#layanan">Layanan</a></li>
              <li><a href="#karya">Karya</a></li>
              <li><a href="#tentang">Tentang</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Sosial</h4>
            <ul>
              <li><a href="#" >Instagram</a></li>
              <li><a href="#">Behance</a></li>
              <li><a href="#">Dribbble</a></li>
              <li><a href="#">Awwwards</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Kontak</h4>
            <ul>
              <li><a href="mailto:hello@nebula.studio">hello@nebula.studio</a></li>
              <li><a href="tel:+622112345678">+62 21 1234 5678</a></li>
              <li><a href="#">Jakarta, Indonesia</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Nebula Studio. Semua hak dilindungi.</span>
          <span>Dibuat dengan Three.js + React — terinspirasi lusion.co</span>
        </div>
      </div>
    </footer>
  );
}
