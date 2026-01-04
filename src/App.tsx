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
  );
}

export default App;
