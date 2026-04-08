import { useLang } from '../context/LangContext';
import AddMaterialForm from './AddMaterialForm';

function TeacherPage() {
  const { t } = useLang();
  return (
    <main className="teacher-page">
      <div className="teacher-page-header">
        <div className="teacher-page-header__icon">📚</div>
        <h1>{t.teacher.pageTitle}</h1>
        <p>{t.teacher.pageSub}</p>
      </div>
      <AddMaterialForm />
    </main>
  );
}

export default TeacherPage;
