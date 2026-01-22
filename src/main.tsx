import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // 🔴 ЗААВАЛ БАЙХ

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
