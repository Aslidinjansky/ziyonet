import { useLang } from '../context/LangContext';

function MaterialCard({ material }) {
  const { t } = useLang();
  return (
    <div className="material-card">
      <h3 className="material-card__title">{material.title}</h3>
      <p className="material-card__subject">
        <strong>{t.card.subject}:</strong> {material.subject}
      </p>
      <p className="material-card__author">
        <strong>{t.card.author}:</strong> {material.author}
      </p>
      <p className="material-card__content">{material.content}</p>
    </div>
  );
}

export default MaterialCard;
