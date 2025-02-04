# Czech Learning Game

Цей проєкт є інтерактивною грою для вивчення чеської мови, що включає як гру, так і тест для оцінки знань.

## Функціонал
- Вибір рівня складності (A, A1, A2, B1).
- Гра з підрахунком балів, обмеженням життів та відображенням неправильних відповідей.
- Тест з оцінкою результатів.
- Темна/світла тема.

## Запуск проекту
1. Клонуй репозиторій (або створи папку, запусти скрипт, потім):
   \`\`\`sh
   npm install
   npm run dev
   \`\`\`
   Проєкт буде доступний за адресою [http://localhost:5173](http://localhost:5173).

## Деплой на GitHub Pages
1. Переконайся, що в \`package.json\` прописано:
   - \`"homepage": "https://TatkiS.github.io/-czech-learning-game"\`
   - Скрипти \`"predeploy"\` та \`"deploy"\`.
2. Виконай:
   \`\`\`sh
   npm run deploy
   \`\`\`
3. Через кілька хвилин сайт з’явиться за адресою:
   \`\`\`
   https://TatkiS.github.io/-czech-learning-game
   \`\`\`

## Структура проєкту
\`\`\`
czech-learning-game/
├── package.json
├── tsconfig.json
├── vite.config.js
├── README.md
├── public/
│   └── index.html
└── src/
    ├── index.css
    ├── main.tsx
    ├── App.tsx
    ├── components/
    │   ├── CzechLanguageGame.tsx
    │   └── CzechLanguageTest.tsx
    └── data/
        └── questions.js
\`\`\`
