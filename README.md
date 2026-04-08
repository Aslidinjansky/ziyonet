# ZIYONET — Образовательная платформа

> **Futuristic neon/cyber UI** — современная образовательная платформа с ИИ-ассистентом, каталогом материалов и кабинетом преподавателя.

## ✨ Что изменилось в v0.3

### Брендинг и логотип
- Новый SVG-логотип университетского стиля (`src/assets/logo.svg`) — геометрическая эмблема с символом «Z», неоновый стиль, текст ZIYONET + «ДМТТ · ОБРАЗОВАНИЕ»
- Логотип встроен в шапку сайта и hero-раздел каталога

### Gemini AI (free-tier)
- Используется модель `gemini-1.5-flash` (бесплатный тариф)
- AbortController с таймаутом 30 с на стороне сервера и клиента
- Системный промпт для контекста платформы (экономия токенов)
- Входящие сообщения обрезаются до 1000 символов
- Поддержка 429 (rate limit) и 504 (timeout) ответов с понятными сообщениями
- Чёткий CTA при отсутствии ключа: пошаговая инструкция прямо в интерфейсе

### Анимации и UI-полировка
- Новые keyframes: `slideInUp`, `slideInLeft`, `scaleIn`, `logo-float`
- Плавающая анимация логотипа в hero
- Улучшенные hover-эффекты карточек: lift + glow + inner gradient
- Micro-interactions кнопок: scale + shimmer overlay
- Улучшенные состояния фокуса input/textarea с glow
- Поддержка `prefers-reduced-motion` — анимации отключаются для пользователей с ограниченным движением

---

## 🚀 Запуск локально

```bash
git clone https://github.com/Aslidinjansky/ziyonet.git
cd ziyonet
npm install
cp .env.example .env      # добавьте GEMINI_API_KEY= в .env
npm run dev               # http://localhost:5173
```

## 🤖 Подключение Gemini (бесплатный тариф)

### Получение ключа
1. Перейдите на [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Войдите через Google-аккаунт
3. Нажмите **Create API key** → выберите или создайте проект
4. Скопируйте сгенерированный ключ

### Настройка
```bash
cp .env.example .env
```

Откройте `.env` и добавьте ключ:
```env
GEMINI_API_KEY=ваш_ключ_здесь
```

Перезапустите сервер:
```bash
npm run dev
```

### Бесплатный тариф Gemini 1.5 Flash (актуально на 2024–2025)
| Ограничение       | Значение                  |
|-------------------|---------------------------|
| Запросов в минуту | 15 RPM                    |
| Токенов в минуту  | 1 000 000 TPM             |
| Запросов в день   | 1 500 req/day             |
| Стоимость         | **Бесплатно** (free tier) |

> ⚠️ Лимиты могут меняться. Актуальную информацию смотрите на [ai.google.dev/pricing](https://ai.google.dev/pricing).

### Деплой на Vercel
При деплое добавьте `GEMINI_API_KEY` в **Settings → Environment Variables** вашего проекта на Vercel.

---

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
  assets/       — logo.svg, hero.png
  components/   — Header, CatalogPage, ChatPage, TeacherPage, MaterialCard…
  context/      — MaterialsContext, LangContext
  hooks/        — useGemini, useSearch, useStorage
  locales/      — ru.js, tj.js
  data/         — sampleData.js
  App.css       — дизайн-система и все стили
  index.css     — базовый reset и scrollbar
api/
  chat.js       — Vercel serverless proxy к Gemini API (gemini-1.5-flash)
```

## 🌐 Деплой на Vercel

```bash
npm i -g vercel
vercel --prod
```
Добавьте `GEMINI_API_KEY` в Environment Variables в настройках проекта Vercel.

---

© 2025 ZIYONET · ДМТТ
