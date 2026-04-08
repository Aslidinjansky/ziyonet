import { useLang } from '../context/LangContext';

function SearchBar({ query, onChange }) {
  const { t } = useLang();
  return (
    <input
      className="search-bar"
      type="search"
      value={query}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t.catalog.search}
    />
  );
}

export default SearchBar;
