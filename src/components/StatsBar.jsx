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
