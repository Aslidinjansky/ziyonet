import { useLang } from '../context/LangContext';

function SearchBar({ query, onChange }) {
  const { t } = useLang();
  return (
    <div className="search-bar-wrap">
      <span className="search-bar-icon">🔍</span>
      <input
        className="search-bar"
        type="search"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.catalog.search}
      />
    </div>
  );
}

export default SearchBar;
