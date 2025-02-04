const QUESTIONS = {
  A: [
    {
      question: 'Jak se jmenuješ?',
      options: ['Jan', 'Petr', 'Marie', 'Anna'],
      correct: 0,
      explanation: 'Стандартне представлення себе по імені'
    },
    {
      question: 'Kolik je ti let?',
      options: ['20', '25', '30', '35'],
      correct: 0,
      explanation: 'Вказування віку числом'
    }
    // ... додаткові питання рівня A
  ],
  A1: [
    {
      question: 'Kde je kniha?',
      options: ['Na stole', 'Ve škole', 'V autě', 'U domu'],
      correct: 0,
      explanation: 'Місцезнаходження книги'
    },
    {
      question: 'Kolik je hodin?',
      options: ['Deset', 'Sedm', 'Tři', 'Devět'],
      correct: 0,
      explanation: 'Час у годині'
    }
    // ... додаткові питання рівня A1
  ],
  A2: [
    {
      question: 'Jak dlouho studuješ česky?',
      options: ['Jeden rok', 'Dva roky', 'Tři měsíce', 'Pět let'],
      correct: 1,
      explanation: 'Термін вивчення мови'
    },
    {
      question: 'Proč se učíš česky?',
      options: ['Práce', 'Studia', 'Zájem', 'Láska'],
      correct: 2,
      explanation: 'Мотивація до вивчення мови'
    }
    // ... додаткові питання рівня A2
  ],
  B1: [
    {
      question: 'Jak hodnotíš současnou politickou situaci?',
      options: ['Komplikovaná', 'Stabilní', 'Nejistá', 'Nadějná'],
      correct: 1,
      explanation: 'Оцінка політичної ситуації'
    },
    {
      question: 'Jaké jsou tvé profesní cíle?',
      options: ['Kariérní postup', 'Vlastní firma', 'Změna oboru', 'Vzdělání'],
      correct: 0,
      explanation: 'Професійні цілі та прагнення'
    }
    // ... додаткові питання рівня B1
  ]
}

export default QUESTIONS
