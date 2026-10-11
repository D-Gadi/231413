import { useState } from 'react';
import './TopBar.css';

function TopBar() {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <div className="samaya-verhnyaya-polosa">
      <p>Sign up and get 20% off to your first order. <a href="#">Sign Up Now</a></p>
      <span className="krestik" onClick={() => setHidden(true)}>✕</span>
    </div>
  );
}

export default TopBar;