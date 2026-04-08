import { useState } from 'react';
import { useLang } from '../context/LangContext';
import { useMaterials } from '../context/MaterialsContext';

function AddMaterialForm() {
  const { t } = useLang();
  const { addMaterial } = useMaterials();
  const [form, setForm] = useState({ title: '', subject: '', author: '', content: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = form.title.trim();
    const subject = form.subject.trim();
    const author = form.author.trim();
    const content = form.content.trim();
    if (!title || !subject || !author || !content) {
      setError(t.teacher.required);
      return;
    }
    addMaterial({ title, subject, author, content });
    setForm({ title: '', subject: '', author: '', content: '' });
    setSuccess(true);
  };

  return (
    <form className="add-material-form" onSubmit={handleSubmit}>
      <h2>{t.teacher.title}</h2>
      {error && <p className="add-material-form__error">{error}</p>}
      {success && <p className="add-material-form__success">{t.teacher.success}</p>}
      <label>
        {t.teacher.fieldTitle}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder={t.teacher.fieldPlaceholderTitle}
        />
      </label>
      <label>
        {t.teacher.fieldSubject}
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder={t.teacher.fieldPlaceholderSubject}
        />
      </label>
      <label>
        {t.teacher.fieldAuthor}
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder={t.teacher.fieldPlaceholderAuthor}
        />
      </label>
      <label>
        {t.teacher.fieldContent}
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder={t.teacher.fieldPlaceholderContent}
          rows={4}
        />
      </label>
      <button type="submit">{t.teacher.submit}</button>
    </form>
  );
}

export default AddMaterialForm;
