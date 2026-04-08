import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';

function Header() {
  const { t, toggleLang } = useLang();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t.nav.catalog },
    { to: '/chat', label: t.nav.chat },
    { to: '/teacher', label: t.nav.teacher },
  ];

  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo">🌟</span>
        <span className="header__title">ZIYONET</span>
      </div>
      <nav className="header__nav">
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`header__link${location.pathname === to ? ' header__link--active' : ''}`}
          >
            {label}
          </Link>
        ))}
      </nav>
      <button className="header__lang" onClick={toggleLang}>
        {t.lang.current} / {t.lang.switch}
      </button>
    </header>
  );
}

export default Header;
