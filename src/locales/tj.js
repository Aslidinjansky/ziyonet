const tj = {
  nav: {
    catalog: 'Каталог',
    chat: 'Чат',
    teacher: 'Муаллим',
  },
  catalog: {
    title: 'Каталоги маводҳо',
    search: 'Ҷустуҷӯ аз рӯи ном ё муаллиф…',
    noResults: 'Маводе ёфт нашуд',
    filters: 'Филтрҳо',
    allSubjects: 'Ҳама фанҳо',
    stats: (total) => `Ҳамаи маводҳо: ${total}`,
  },
  card: {
    author: 'Муаллиф',
    subject: 'Фан',
    readMore: 'Бештар',
  },
  chat: {
    title: 'Дастёри AI',
    placeholder: 'Паём нависед…',
    send: 'Фиристодан',
    noKey: 'GEMINI_API_KEY танзим нашудааст. Чат танҳо бо калиди Gemini кор мекунад.',
    thinking: 'Фикр мекунам…',
    error: 'Хато. Боз кӯшиш кунед.',
  },
  teacher: {
    title: 'Афзудани мавод',
    fieldTitle: 'Ном',
    fieldSubject: 'Фан',
    fieldAuthor: 'Муаллиф',
    fieldContent: 'Мӯҳтаво',
    fieldPlaceholderTitle: 'Номро ворид кунед',
    fieldPlaceholderSubject: 'Масалан: Математика',
    fieldPlaceholderAuthor: 'Номи пурраи муаллиф',
    fieldPlaceholderContent: 'Тавсифи кӯтоҳ ё матни мавод',
    submit: 'Илова кардан',
    success: 'Мавод бомуваффақият илова шуд!',
    required: 'Ҳама майдонҳо ҳатмӣ мебошанд',
  },
  lang: {
    current: 'TJ',
    switch: 'RU',
  },
};

export default tj;
