import { useLang } from '../context/LangContext';
import { useMaterials } from '../context/MaterialsContext';
import useSearch from '../hooks/useSearch';
import SearchBar from './SearchBar';
import FilterSidebar from './FilterSidebar';
import MaterialCard from './MaterialCard';

function CatalogPage() {
  const { t } = useLang();
  const { materials } = useMaterials();
  const { filtered, query, setQuery, subject, setSubject, subjects } = useSearch(materials);

  return (
    <main className="catalog-page">
      {/* Hero Banner */}
      <section className="catalog-hero">
        <div className="catalog-hero__badge">
          <span className="catalog-hero__badge-dot" />
          {t.catalog.badge}
        </div>
        <h1 className="catalog-hero__title">{t.catalog.heroTitle}</h1>
        <p className="catalog-hero__sub">{t.catalog.heroSub}</p>
      </section>

      {/* Stats strip */}
      <div className="stats-strip">
        <div className="stats-strip__item">
          <span className="stats-strip__value">{materials.length}</span>
          <span>{t.catalog.statsLabel}</span>
        </div>
        <div className="stats-strip__sep" />
        <div className="stats-strip__item">
          <span className="stats-strip__value">{subjects.length}</span>
          <span>{t.catalog.subjectsLabel}</span>
        </div>
        <div className="stats-strip__sep" />
        <div className="stats-strip__item">
          <span className="stats-strip__value">{filtered.length}</span>
          <span>{t.catalog.resultsLabel}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="catalog-content">
        <div className="catalog-controls">
          <SearchBar query={query} onChange={setQuery} />
          <FilterSidebar subjects={subjects} subject={subject} onChange={setSubject} />
        </div>

        <div className="catalog-grid">
          {filtered.length === 0 ? (
            <div className="catalog-empty">
              <div className="catalog-empty__icon">🔭</div>
              <p className="catalog-empty__text">{t.catalog.noResults}</p>
            </div>
          ) : (
            filtered.map((m) => <MaterialCard key={m.id} material={m} />)
          )}
        </div>
      </div>
    </main>
  );
}

export default CatalogPage;
