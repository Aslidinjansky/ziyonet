import { useLang } from '../context/LangContext';

function FilterSidebar({ subjects, subject, onChange }) {
  const { t } = useLang();
  return (
    <aside className="filter-sidebar">
      <h3>{t.catalog.filters}</h3>
      <select
        className="filter-sidebar__select"
        value={subject}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{t.catalog.allSubjects}</option>
        {subjects.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </aside>
  );
}

export default FilterSidebar;
