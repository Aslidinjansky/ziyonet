import { useState } from 'react';
import { useLang } from '../context/LangContext';
import { useMaterials } from '../context/MaterialsContext';

function AddMaterialForm() {
  const { t } = useLang();
  const { addMaterial } = useMaterials();
  const [form, setForm] = useState({ title: '', subject: '', author: '', content: '' });
  const [touched, setTouched] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setSuccess(false);
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const isFieldError = (name) => touched[name] && !form[name].trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = form.title.trim();
    const subject = form.subject.trim();
    const author = form.author.trim();
    const content = form.content.trim();
    // Mark all as touched
    setTouched({ title: true, subject: true, author: true, content: true });
    if (!title || !subject || !author || !content) {
      setError(t.teacher.required);
      return;
    }
    addMaterial({ title, subject, author, content });
    setForm({ title: '', subject: '', author: '', content: '' });
    setTouched({});
    setSuccess(true);
  };

  return (
    <form className="add-material-form" onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="form-alert form-alert--error" role="alert">
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div className="form-alert form-alert--success" role="status">
          ✓ {t.teacher.success}
        </div>
      )}

      <div className="form-field">
        <label className="form-label" htmlFor="field-title">
          {t.teacher.fieldTitle}<span className="form-required">*</span>
        </label>
        <input
          id="field-title"
          className={`form-input${isFieldError('title') ? ' is-error' : ''}`}
          name="title"
          value={form.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t.teacher.fieldPlaceholderTitle}
          autoComplete="off"
        />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="field-subject">
          {t.teacher.fieldSubject}<span className="form-required">*</span>
        </label>
        <input
          id="field-subject"
          className={`form-input${isFieldError('subject') ? ' is-error' : ''}`}
          name="subject"
          value={form.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t.teacher.fieldPlaceholderSubject}
          autoComplete="off"
        />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="field-author">
          {t.teacher.fieldAuthor}<span className="form-required">*</span>
        </label>
        <input
          id="field-author"
          className={`form-input${isFieldError('author') ? ' is-error' : ''}`}
          name="author"
          value={form.author}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t.teacher.fieldPlaceholderAuthor}
          autoComplete="off"
        />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="field-content">
          {t.teacher.fieldContent}<span className="form-required">*</span>
        </label>
        <textarea
          id="field-content"
          className={`form-input form-textarea${isFieldError('content') ? ' is-error' : ''}`}
          name="content"
          value={form.content}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t.teacher.fieldPlaceholderContent}
          rows={4}
        />
      </div>

      <button type="submit" className="form-submit-btn">
        {t.teacher.submit}
      </button>
    </form>
  );
}

export default AddMaterialForm;
