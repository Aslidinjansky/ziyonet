const ru = {
  nav: {
    catalog: 'Каталог',
    chat: 'Чат',
    teacher: 'Преподаватель',
  },
  catalog: {
    title: 'Каталог материалов',
    search: 'Поиск по названию или автору…',
    noResults: 'Материалов не найдено',
    filters: 'Фильтры',
    allSubjects: 'Все предметы',
    stats: (total) => `Всего материалов: ${total}`,
  },
  card: {
    author: 'Автор',
    subject: 'Предмет',
    readMore: 'Подробнее',
  },
  chat: {
    title: 'AI-ассистент',
    placeholder: 'Введите сообщение…',
    send: 'Отправить',
    noKey: 'GEMINI_API_KEY не настроен. Чат работает только с ключом Gemini.',
    thinking: 'Думаю…',
    error: 'Ошибка. Попробуйте ещё раз.',
  },
  teacher: {
    title: 'Добавить материал',
    fieldTitle: 'Название',
    fieldSubject: 'Предмет',
    fieldAuthor: 'Автор',
    fieldContent: 'Содержание',
    fieldPlaceholderTitle: 'Введите название',
    fieldPlaceholderSubject: 'Например: Математика',
    fieldPlaceholderAuthor: 'ФИО автора',
    fieldPlaceholderContent: 'Краткое описание или текст материала',
    submit: 'Добавить',
    success: 'Материал успешно добавлен!',
    required: 'Все поля обязательны',
  },
  lang: {
    current: 'RU',
    switch: 'TJ',
  },
};

export default ru;
