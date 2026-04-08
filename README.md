# ZIYONET — Образовательная платформа

> **Futuristic neon/cyber UI** — современная образовательная платформа с ИИ-ассистентом, каталогом материалов и кабинетом преподавателя.

## ✨ Что изменилось в v0.2 (редизайн)

### Дизайн-система
- CSS-переменные для цветовых токенов, отступов, типографики, теней и glow-эффектов
- Тёмная neon/cyber тема: глубокий тёмно-синий фон (`#020c1b`), неоновый циан, фиолетовый и зелёный акценты
- Glassmorphism-панели с `backdrop-filter: blur`
- Плавные анимации: `fadeIn`, `blink`, `spin`, hover-переходы для всех интерактивных элементов

### Страницы
- **Каталог** — hero-баннер с градиентным заголовком, полоса статистики (материалы / предметы / найдено), современные карточки с glow-hover и тегами предметов
- **Чат** — разговорный интерфейс с пузырями сообщений, анимированным индикатором набора (три точки), состояния ошибки и отсутствия ключа
- **Преподаватель** — форма с inline-валидацией полей при потере фокуса, цветовые подсказки ошибок/успеха

### Адаптивность
- Mobile-first подход, корректное отображение на 320px–1440px+
- Скрытие кнопки переключения языка на мобильных (экономия места)
- Одноколонный layout на мобильных

---

## 🚀 Запуск локально

```bash
git clone https://github.com/Aslidinjansky/ziyonet.git
cd ziyonet
npm install
cp .env.example .env      # добавьте GEMINI_API_KEY= в .env
npm run dev               # http://localhost:5173
```

## 🤖 Подключение Gemini (чат)

1. Получите ключ на [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Добавьте в `.env`:
   ```
   GEMINI_API_KEY=ваш_ключ_здесь
   ```
3. Перезапустите `npm run dev`

## 🛠️ Команды

| Команда           | Описание                     |
|-------------------|------------------------------|
| `npm run dev`     | Запуск dev-сервера            |
| `npm run build`   | Production-сборка             |
| `npm run lint`    | Линтинг кода                  |
| `npm run preview` | Предпросмотр production-сборки|

## 📁 Структура

```
src/
  components/   — UI-компоненты (Header, CatalogPage, ChatPage, TeacherPage…)
  context/      — MaterialsContext, LangContext
  hooks/        — useGemini, useSearch, useStorage
  locales/      — ru.js, tj.js
  data/         — sampleData.js
  App.css       — дизайн-система и все стили
  index.css     — базовый reset и scrollbar
api/
  chat.js       — Vercel serverless proxy к Gemini API
```

## 🌐 Деплой на Vercel

```bash
npm i -g vercel
vercel --prod
```
Добавьте `GEMINI_API_KEY` в Environment Variables в настройках проекта Vercel.

---

© 2025 ZIYONET
