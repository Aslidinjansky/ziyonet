import { useLang } from '../context/LangContext';
import { useMaterials } from '../context/MaterialsContext';
import useSearch from '../hooks/useSearch';
import SearchBar from './SearchBar';
import FilterSidebar from './FilterSidebar';
import MaterialCard from './MaterialCard';
import StatsBar from './StatsBar';

function CatalogPage() {
  const { t } = useLang();
  const { materials } = useMaterials();
  const { filtered, query, setQuery, subject, setSubject, subjects } = useSearch(materials);

  return (
    <main className="catalog-page">
      <h1>{t.catalog.title}</h1>
      <StatsBar total={materials.length} />
      <div className="catalog-page__controls">
        <SearchBar query={query} onChange={setQuery} />
        <FilterSidebar subjects={subjects} subject={subject} onChange={setSubject} />
      </div>
      <div className="catalog-page__grid">
        {filtered.length === 0 ? (
          <p className="catalog-page__empty">{t.catalog.noResults}</p>
        ) : (
          filtered.map((m) => <MaterialCard key={m.id} material={m} />)
        )}
      </div>
    </main>
  );
}

export default CatalogPage;
