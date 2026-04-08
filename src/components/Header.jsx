import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import logoSvg from '../assets/logo.svg';

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
      <Link to="/" className="header__brand" aria-label={t.nav.home}>
        <img src={logoSvg} alt="ZIYONET" className="header__logo-emblem" />
        <span className="header__title">ZIYONET</span>
      </Link>
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
