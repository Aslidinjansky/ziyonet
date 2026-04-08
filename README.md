# 🌟 ZIYONET v0.1

Образовательная платформа на React + Vite с поддержкой локализации RU/TJ, каталогом материалов, AI-чатом и страницей преподавателя.

## Стек

- **React 19 + Vite** – быстрая сборка
- **react-router-dom** – навигация (3 страницы)
- **localStorage** – хранение материалов без бэкенда
- **Gemini API** – AI-чат (опционально)

## Структура проекта

```
api/
  chat.js              # Gemini proxy (Vercel/Node serverless)
src/
  components/
    Header.jsx         # Навигация + переключатель языка
    CatalogPage.jsx    # Страница каталога
    ChatPage.jsx       # AI-чат
    TeacherPage.jsx    # Страница преподавателя
    MaterialCard.jsx   # Карточка материала
    SearchBar.jsx      # Поиск
    FilterSidebar.jsx  # Фильтр по предмету
    StatsBar.jsx       # Счётчик материалов
    AddMaterialForm.jsx # Форма добавления
  context/
    MaterialsContext.jsx  # CRUD + localStorage
    LangContext.jsx       # Переключение языка
  hooks/
    useStorage.js      # localStorage хук
    useSearch.js       # Поиск + фильтры
    useGemini.js       # Вызов /api/chat
  locales/
    ru.js              # Русский язык
    tj.js              # Таджикский язык
  data/
    sampleData.js      # Начальные материалы (авто-сидирование)
  App.jsx              # Роутинг + провайдеры
  main.jsx             # Точка входа
.env.example           # Шаблон переменных окружения
```

## Установка и запуск

```bash
# 1. Клонировать репозиторий
git clone https://github.com/Aslidinjansky/ziyonet.git
cd ziyonet

# 2. Установить зависимости
npm install

# 3. Настроить окружение (опционально, для AI-чата)
cp .env.example .env
# Откройте .env и добавьте GEMINI_API_KEY

# 4. Запустить в dev-режиме
npm run dev
```

## Сборка для production

```bash
npm run build
# Артефакты появятся в папке dist/
npm run preview  # локальный просмотр сборки
```

## Деплой на Vercel

1. Установите [Vercel CLI](https://vercel.com/docs/cli): `npm i -g vercel`
2. В корне проекта выполните: `vercel`
3. В настройках проекта на vercel.com добавьте переменную `GEMINI_API_KEY`

## Локализация

Язык переключается кнопкой **RU / TJ** в шапке сайта.

Файлы локализации:
- `src/locales/ru.js` – русский
- `src/locales/tj.js` – таджикский

Чтобы добавить новый язык:
1. Создайте `src/locales/uz.js` по образцу `ru.js`
2. Добавьте его в `src/context/LangContext.jsx` в объект `locales`
3. Обновите логику `toggleLang` по необходимости

## Страницы

| Путь | Страница | Описание |
|------|----------|----------|
| `/` | Каталог | Просмотр, поиск и фильтрация материалов |
| `/chat` | Чат | AI-ассистент (требует GEMINI_API_KEY) |
| `/teacher` | Преподаватель | Добавление новых материалов |

## Чат без API-ключа

Если `GEMINI_API_KEY` не задан, страница чата покажет понятное предупреждение и заблокирует ввод. Установите ключ в `.env` чтобы активировать чат.
