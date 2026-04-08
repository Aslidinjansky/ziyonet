// StatsBar is replaced by the stats-strip in CatalogPage.
// Kept for potential reuse.
import { useLang } from '../context/LangContext';

function StatsBar({ total }) {
  const { t } = useLang();
  return (
    <div className="stats-bar">
      <span>{t.catalog.stats(total)}</span>
    </div>
  );
}

export default StatsBar;
