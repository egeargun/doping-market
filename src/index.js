import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Router'ı buradan import ediyoruz
import './index.css'; // Genel stillerimiz
import App from './App'; // Ana App bileşenimiz

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> {/* App bileşenini Router ile sarıyoruz */}
      <App />
    </Router>
  </React.StrictMode>
);