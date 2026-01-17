function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h3>EduClub.mn</h3>
          <p>Боловсрол • Спорт • Клуб</p>
        </div>

        <div className="footer-links">
          <a href="#">Нүүр</a>
          <a href="#">Курсууд</a>
          <a href="#">Нэвтрэх</a>
        </div>

        <div className="footer-social">
          <a href="#" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} EduClub.mn — All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
