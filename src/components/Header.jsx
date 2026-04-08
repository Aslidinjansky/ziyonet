import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';

function Header() {
  const { t, toggleLang, lang } = useLang();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t.nav.catalog },
    { to: '/chat', label: t.nav.chat },
    { to: '/teacher', label: t.nav.teacher },
  ];

  return (
    <header className="header">
      <div className="header__brand">
        <div className="header__logo-icon">⚡</div>
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
      <button className="header__lang" onClick={toggleLang} aria-label="Switch language">
        {lang === 'ru' ? 'RU / TJ' : 'TJ / RU'}
      </button>
    </header>
  );
}

export default Header;
