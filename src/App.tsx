function App() {
  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo">EduClub</div>

        <nav className="nav">
          <a href="#">Нүүр</a>
          <a href="#">Курс</a>
          <a href="#">Клуб</a>
          <a href="#">Холбоо барих</a>
        </nav>

        <button className="login-btn">Нэвтрэх</button>
      </header>

      {/* MAIN CONTENT */}
      <main className="container">
        <h1>EduClub.mn 🚀</h1>
        <p>Vite + React + TypeScript амжилттай ажиллаж байна 🎉</p>

        <div className="buttons">
          <button className="btn primary">Эхлэх</button>
          <button className="btn secondary">Курсууд үзэх</button>
        </div>
      </main>
    </>

      {/* FOOTER */}
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
            <a href="#" target="_blank">Facebook</a>
            <a href="#" target="_blank">Instagram</a>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} EduClub.mn — All rights reserved
        </div>
      </footer>



    
  );
}

export default App;
