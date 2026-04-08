import { useLang } from '../context/LangContext';

function MaterialCard({ material }) {
  const { t } = useLang();
  return (
    <article className="material-card">
      <div className="material-card__header">
        <h3 className="material-card__title">{material.title}</h3>
        <span className="material-card__subject-tag">{material.subject}</span>
      </div>
      <div className="material-card__meta">
        <span className="material-card__meta-icon">✍</span>
        <span>{t.card.author}: {material.author}</span>
      </div>
      <div className="material-card__divider" />
      <p className="material-card__content">{material.content}</p>
    </article>
  );
}

export default MaterialCard;
