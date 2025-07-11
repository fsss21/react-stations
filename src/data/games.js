export const puzzleData = [
  {
    id: 1,
    imageSrc: '/images/puzzle1.jpg',
    completed: false,
  },
  {
    id: 2,
    imageSrc: '/images/puzzle2.jpg',
    completed: false,
  },
  {
    id: 3,
    imageSrc: '/images/puzzle3.jpg',
    completed: false,
  },
//   {
// 	id: 4,
// 	imageSrc: '/images/puzzle4.jpg',
// 	completed: false,
//   },
//   {
// 	id: 5,
// 	imageSrc: '/images/puzzle5.jpg',
// 	completed: false,
//   },
//   {
// 	id: 6,
// 	imageSrc: '/images/puzzle6.jpg',
// 	completed: false,
//   },
//   {
// 	id: 7,
// 	imageSrc: '/images/puzzle7.jpg',
// 	completed: false,
//   },
//   {
// 	id: 8,
// 	imageSrc: '/images/puzzle8.jpg',
// 	completed: false,
//   },
//   {
// 	id: 9,
// 	imageSrc: '/images/puzzle9.jpg',
// 	completed: false,
//   },
//   {
// 	id: 10,
// 	imageSrc: '/images/puzzle10.jpg',
// 	completed: false,
//   },
//   {
// 	id:11 ,
// 	imageSrc: '/images/puzzle11.jpg',
// 	completed: false,
//   },
//   {
// 	id: 12,
// 	imageSrc: '/images/puzzle12.jpg',
// 	completed: false,
//   },
//   {
// 	id: 13,
// 	imageSrc: '/images/puzzle13.jpg',
// 	completed: false,
//   },
//   {
// 	id: 14,
// 	imageSrc: '/images/puzzle14.jpg',
// 	completed: false,
//   },
//   {
// 	id: 15,
// 	imageSrc: '/images/puzzle15.jpg',
// 	completed: false,
//   },
//   {
// 	id: 16,
// 	imageSrc: '/images/puzzle16.jpg',
// 	completed: false,
//   },
//   {
// 	id: 17,
// 	imageSrc: '/images/puzzle17.jpg',
// 	completed: false,
//   },
//   {
// 	id: 18,
// 	imageSrc: '/images/puzzle18.jpg',
// 	completed: false,
//   },
//   {
// 	id: 19,
// 	imageSrc: '/images/puzzle19.jpg',
// 	completed: false,
//   },
//   {
// 	id: 20,
// 	imageSrc: '/images/puzzle20.jpg',
// 	completed: false,
//   },
//   {
// 	id: 21,
// 	imageSrc: '/images/puzzle21.jpg',
// 	completed: false,
//   },
];

export const difficultyLevels = [
  {
    id: 'easy',
    name: 'Легкий',
    rows: 3,
    columns: 4,
    description: '3x4',
  },
  {
    id: 'medium',
    name: 'Средний',
    rows: 4,
    columns: 6,
    description: '4x6',
  },
  {
    id: 'hard',
    name: 'Сложный',
    rows: 6,
    columns: 8,
    description: '6x8',
  },
];

export const crosswordData = {
  size: 17,
  words: [
    {
      id: 'v1',
      word: 'Седов',
      clue: 'Фамилия полярного исследователя, в честь которого названы ледник и мыс на острове Гукера.',
      direction: 'vertical',
      start: { row: 1, col: 13 },
      solved: false,
    },
    {
      id: 'v2',
      word: 'Арктика',
      clue: 'Лидерство в освоении какого физико-географического района Земли,примыкающего к Северному полюсу, продемонстрировала станция «Северный полюс-1» ?',
      direction: 'vertical',
      start: { row: 3, col: 10 },
      solved: false,
    },
    {
      id: 'h3',
      word: 'Белый',
      clue: 'На каком острове в Карском море расположена Морская гидрометеорологическая береговая станция 2 разряда имени М. В. Попова?',
      direction: 'horizontal',
      start: { row: 2, col: 12 },
      solved: false,
    },
    {
      id: 'h4',
      word: 'Рудольфа',
      clue: 'Самый северный остров архипелага Земля Франца-Иосифа в Северном Ледовитом океане?',
      direction: 'horizontal',
      start: { row: 4, col: 10 },
      solved: false,
    },
    {
      id: 'h5',
      word: 'Папанин',
      clue: 'Кто возглавил первую в мире дрейфующую полярную станцию "Северный полюс-1"?',
      direction: 'horizontal',
      start: { row: 7, col: 5 },
      solved: false,
    },
    {
      id: 'v6',
      word: 'Тихая',
      clue: 'Название бухты, в которой проходила вторая зимовка экспедиции Георгия Седова.',
      direction: 'vertical',
      start: { row: 8, col: 13 },
      solved: false,
    },
    {
      id: 'v7',
      word: 'Северный',
      clue: 'Какое холодное название носил мыс Шмидта, до его переименования в 1934 году?',
      direction: 'vertical',
      start: { row: 9, col: 8 },
      solved: false,
    },
    {
      id: 'h8',
      word: 'Станция',
      clue: 'Какое ключевое слово объединяет понятия: «Маточкин Шар», «Бухта Тихая», «Северный полюс -1», «Мыс Челюскин»?',
      direction: 'horizontal',
      start: { row: 9, col: 8 },
      solved: false,
    },
    {
      id: 'v9',
      word: 'Пролив',
      clue: 'Водное пространство между двумя участками суши, в честь которого была названа полярная станция «Маточкин Шар», ставшая самой первой именно советской станцией в Арктике?',
      direction: 'vertical',
      start: { row: 11, col: 3 },
      solved: false,
    },
    {
      id: 'h10',
      word: 'Челюскин',
      clue: 'Объединённая гидрометеорологическая станция им. Е.К. Фёдорова расположена на мысе, названом в честь одного из великих русских землепроходцев XVIII столетия, назовите его фамилию?',
      direction: 'horizontal',
      start: { row: 14, col: 1 },
      solved: false,
    },
  ],
};

export const quizData = [
  {
    id: 1,
    question: 'Как назывался дирижабль, на котором весной 1928 года экспедиция подкомандованием Умберто Нобиле отправилась к Северному полюсу?',
    info: '(выберите один ответ)',
    answers: [
      { id: 'a', text: '«Италия»', correct: true },
      { id: 'b', text: '«Франция»', correct: false },
      { id: 'c', text: '«Америка»', correct: false },
    ],
  },
  {
    id: 2,
    question: 'Сколько стран приняло участие в спасательных работах дирижабля«Италия»?',
    answers: [
      { id: 'a', text: '1 страна', correct: false },
      { id: 'b', text: '3 страны', correct: false },
      { id: 'c', text: '6 стран', correct: true },
    ],
  },
  {
    id: 3,
    question: 'Какова специализация парохода «Александр Сибиряков»?',
    answers: [
      { id: 'a', text: 'рыболовный', correct: false },
      { id: 'b', text: 'ледокольный', correct: true },
      { id: 'c', text: 'пассажирский', correct: false },
    ],
  },
  {
    id: 4,
    question: 'Использовался ли ледокольный пароход «Александр Сибиряков» во время Великой Отечественной войны?',
    answers: [
      { id: 'a', text: 'да', correct: true },
      { id: 'b', text: 'нет', correct: false },
    ],
  },
  {
    id: 5,
    question: 'В каком море обрело свою гибель спасательное судно «Руслан»?',
    answers: [
      { id: 'a', text: 'Балтийское море', correct: false },
      { id: 'b', text: 'Баренцево море', correct: true },
      { id: 'c', text: 'Белое море', correct: false },
    ],
  },
  {
    id: 6,
    question: 'В спасении какого ледокольного парохода участвовало судно «Руслан», после чего затонуло?',
    answers: [
      { id: 'a', text: 'парохода «Малыгин»', correct: true },
      { id: 'b', text: 'парохода «Красин»', correct: false },
      { id: 'c', text: 'парохода «Александр Сибиряков»', correct: false },
    ],
  },
  {
    id: 7,
    question: 'Кто был капитаном ледокольного парохода «Челюскин»?',
    answers: [
      { id: 'a', text: 'Отто Шмидт', correct: false },
      { id: 'b', text: 'Борис Могилевич', correct: false },
      { id: 'c', text: 'Владимир Воронин', correct: true },
    ],
  },
  {
    id: 8,
    question: 'Сколько человек очутилось на льду после того, как затонул пароход «Челюскин»?',
    answers: [
      { id: 'a', text: '104', correct: true },
      { id: 'b', text: '104', correct: false },
      { id: 'c', text: '100', correct: false },
    ],
  },
  {
    id: 9,
    question:
      'Когда А. Ляпидевский со своим экипажем нашёл лагерь О. Шмидта и сумел посадить самолёт, челюскинцы накинулись на них – давай обнимать, целовать, прижимать к себе. Что предложили челюскинцы лётчикам в качестве угощения?',
    answers: [
      { id: 'a', text: 'рыбу', correct: false },
      { id: 'b', text: 'сгущенку', correct: false },
      { id: 'c', text: 'какао', correct: true },
    ],
  },
  {
    id: 10,
    question: 'Какого звания были удостоены лётчики, спасшие челюскинцев?',
    answers: [
      { id: 'a', text: 'Герой Советского Союза', correct: true },
      { id: 'b', text: 'Герой Российской Федерации', correct: false },
      { id: 'c', text: 'Героя Социалистического Труда', correct: false },
    ],
  },
  {
    id: 11,
    question:
      'Как назывались одномоторные советские самолёты, на которых летчики Василий Молоков, Николай Каманин и Михаил Водопьянов вывозили челюскинцев со льдины?',
    answers: [
      { id: 'a', text: 'ТБ-1', correct: false },
      { id: 'b', text: 'Р-5', correct: true },
      { id: 'c', text: 'ПС-4', correct: false },
    ],
  },
  {
    id: 12,
    question: 'Участвовал ли летчик Валерий Павлович Чкалов в спасении экипажа и пассажиров парохода «Челюскин»?',
    answers: [
      { id: 'a', text: 'да', correct: true },
      { id: 'b', text: 'нет', correct: false },
    ],
  },
  {
    id: 13,
    question: 'На каком самолете летчик А. Ляпидевский вывез со льдины первую партию челюскинцев (десять женщин и двоих детей) 5 марта 1934 года?',
    answers: [
      { id: 'a', text: 'АНТ-4', correct: true },
      { id: 'b', text: 'Ш-2', correct: false },
      { id: 'c', text: '«Флитстер»', correct: false },
    ],
  },
];

export const gamesData = [
  {
    id: 1,
    name: 'Экспедиции',
    quiz: [
      {
        title: 'Викторина Экспедиции',

        questions: [
          {
            id: 1,
            question: 'Какой транспортный ледокол дрейфовал 812 дней в арктических льдах?',

            answers: [
              { id: 'a', text: 'Ледокольно-транспортное судно «Георгий Седов».', correct: true },
              { id: 'b', text: 'Ледокол «Красин»', correct: false },
              { id: 'c', text: 'Ледокол «Сибиряков»', correct: false },
            ],
          },
          {
            id: 2,
            question: 'Кто был начальником дрейфующей станции «Северный полюс-1».',
            answers: [
              { id: 'a', text: 'Иван Дмитриевич Папанин.', correct: true },
              { id: 'b', text: 'Борис Григорьевич Чухновский', correct: false },
              { id: 'c', text: 'Михаил Васильевич Водопьянов', correct: false },
            ],
          },
          {
            id: 3,
            question: 'Верно ли утверждение, что слово «Арктика» образовано от греческого слова «арктос» - медведица?',

            answers: [
              { id: 'a', text: 'Неверно', correct: false },
              { id: 'b', text: 'Верно', correct: true },
            ],
          },
          {
            id: 4,
            question: 'В каком году ученым – Отто Шмидтом была совершена первая полярная экспедиция?',
            answers: [
              { id: 'a', text: '1925 год', correct: false },
              { id: 'b', text: '1928 год', correct: false },
              { id: 'c', text: '1929 год', correct: true },
            ],
          },
          {
            id: 5,
            question: 'Кто первым посадил самолёт на Северном полюсе?',
            answers: [
              { id: 'a', text: 'Водопьянов М.В.', correct: true },
              { id: 'b', text: 'Леваневский С.А.', correct: false },
              { id: 'c', text: 'Каманин Н. П.', correct: false },
            ],
          },
          {
            id: 6,
            question: 'Какой надводный корабль первым достиг Северного полюса?',
            answers: [
              { id: 'a', text: 'Советский атомный ледокол «Арктика»', correct: true },
              { id: 'b', text: 'Ледокол «Челюскин»', correct: false },
              { id: 'c', text: 'Ледокол «Красин»', correct: false },
            ],
          },
          {
            id: 7,
            question: 'как называется архипелаг в Арктике открытым последним?',
            answers: [
              { id: 'a', text: 'Восточная земля', correct: false },
              { id: 'b', text: 'Западная земля', correct: false },
              { id: 'c', text: 'Северная земля+', correct: true },
            ],
          },
          {
            id: 8,
            question:
              'Этот ученый-исследователь, путешественник принимал участие в первой советско-германской экспедиции, организованной АН СССР, руководил арктическими экспедициями на ледокольных пароходах «Седов», «Сибиряков» и «Челюскин».',
            answers: [
              { id: 'a', text: 'Отто Шмидт', correct: true },
              { id: 'b', text: 'Иван Папанин', correct: false },
              { id: 'c', text: 'Георгий Седов', correct: false },
            ],
          },
          {
            id: 9,
            question: 'Сколько полюсов насчитывается в Арктике?',
            answers: [
              { id: 'a', text: '4', correct: true },
              { id: 'b', text: '3', correct: false },
              { id: 'c', text: '2', correct: false },
            ],
          },
          {
            id: 10,
            question: 'Правда ли, что нетающий слой льда, который находится под тонким слоем почвы называется Мерзлотой.',
            answers: [
              { id: 'a', text: 'Да', correct: true },
              { id: 'b', text: 'Нет', correct: false },
            ],
          },
        ],
      },
    ],
    crossword: [
      {
        title: 'Кроссворд «Экспедиции»',
        questions: [
          {
            id: 1,
            direction: 'По вертикали:',
            question:
              'Самоходное специализированное судно, предназначенное для различных видов ледокольных операций с целью поддержания навигации в замерзающих бассейнах.',
            answer: '(Ледокол)',
          },
          {
            id: 2,
            direction: 'По вертикали:',
            question:
              'вопрос Советский лётчик, один из первых Героев Советского Союза, участник высокоширотных арктических экспедиций, который В 1930 году первым открыл воздушную линию на остров Сахалин.',
            answer: '(Водопьянов)',
          },
          {
            id: 3,
            direction: 'По вертикали:',
            question:
              'вопрос Фамилия российского полярного мореплавателя, путешественника, исследователя, который на собачьей упряжке достиг самой северной точки континентальной Евразии — мыса, который позднее назвали в его честь.',
            answer: '(Челюскин)',
          },
          {
            id: 4,
            direction: 'По горизонтали:',
            question: 'Вопрос Советский математик, географ, геофизик, астроном, организатор книгоиздания и реформы системы образования. ',
            answer: '(Шмидт)',
          },
          {
            id: 5,
            direction: 'По горизонтали:',
            question: 'Вопрос Морские путешествия, предпринимаемые для исследования стран, лежащих около земных полюсов',
            answer: '(экспедиция)',
          },
          {
            id: 6,
            direction: 'По вертикали:',
            question:
              'Советский исследователь Арктики, один из пионеров освоения Северного полюса Земли, который с другими участниками экспедиции зафиксировал глубину океана у Северного полюса — 4 км 290 м.',
            answer: '(Папанин)',
          },
          {
            id: 7,
            direction: 'По вертикали:',
            question: 'вопрос Арктический ледокол (до 1927 года — название «Святогор») — русского и советского флотов, с 1980-х годов — судно-музей.',
            answer: '(Красин)',
          },
          {
            id: 8,
            direction: 'По горизонтали:',
            question: 'Вопрос Станция созданная, в Арктике или Антарктике, на близлежащих островах или дрейфующих льдах.',
            answer: '(Полярная)',
          },
          {
            id: 9,
            direction: 'По горизонтали:',
            question: 'Группа островов, располагающихся достаточно близко друг к другу.',
            answer: '(Архипелаг)',
          },
          {
            id: 10,
            direction: 'По горизонтали:',
            question: 'Ледокольный пароход, который совершил первое в истории сквозное плавание по Северному морскому пути за одну навигацию в 1932',
            answer: '(Сибиряков)',
          },
        ],
      },
    ],
    puzzle: [
      {
        images: [
          { title: '1.jpg', src: 'images/1.jpg' },
          { title: '2.jpg', src: 'images/2.jpg' },
          { title: '3.jpg', src: 'images/3.jpg' },
          { title: '1.jpg', src: 'images/4.jpg' },
          { title: '2.jpg', src: 'images/5.jpg' },
          { title: '3.jpg', src: 'images/6.jpg' },
          { title: '1.jpg', src: 'images/7.jpg' },
          { title: '2.jpg', src: 'images/8.jpg' },
          { title: '3.jpg', src: 'images/9.jpg' },
          { title: '1.jpg', src: 'images/10.jpg' },
          { title: '2.jpg', src: 'images/11.jpg' },
          { title: '3.jpg', src: 'images/12.jpg' },
          { title: '1.jpg', src: 'images/13.jpg' },
          { title: '2.jpg', src: 'images/14.jpg' },
          { title: '3.jpg', src: 'images/15.jpg' },
          { title: '1.jpg', src: 'images/16.jpg' },
          { title: '2.jpg', src: 'images/17.jpg' },
          { title: '3.jpg', src: 'images/18.jpg' },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Ледовая разведка',
    images: [
      { title: 'photo_2025-05-20_16-50-14.jpg', src: 'photo_2025-05-20_16-50-14.jpg' },
      { title: 'photo_2025-05-20_16-44-14.jpg', src: 'photo_2025-05-20_16-44-14.jpg' },
    ],
  },
  {
    id: 4,
    name: 'Полярные станции',
    quiz: [
      {
        id: 1,
        question: 'На острове Гукера архипелага Земля Франца-Иосифа 30 августа 1929 года открыли первую полярную станцию. Как называется эта станция?',

        answers: [
          { id: 'a', text: '«Бухта тихая»', correct: true },
          { id: 'b', text: '«Челюскин»', correct: false },
          { id: 'c', text: '«Желаний»', correct: false },
        ],
        multiAnswer: false,
      },
      {
        id: 2,
        question: 'Под чьим руководством в 1937 году работала первая советская обитаемая дрейфующая полярная станция?',

        answers: [
          { id: 'a', text: 'Отто Шмидт', correct: false },
          { id: 'b', text: 'Евгений ФЕДОРОВ', correct: false },
          { id: 'c', text: 'Иван Папанин', correct: true },
        ],
        multiAnswer: false,
      },
      {
        id: 3,
        question: 'На какой полярной станции имелся свой аэропорт, почта и даже детский сад',
        answers: [
          { id: 'a', text: '«мыс Челюскин»', correct: true },
          { id: 'b', text: '«Северный полюс-1»', correct: false },
          { id: 'c', text: '«Бухта тихая»', correct: false },
        ],
        multiAnswer: false,
      },
      {
        id: 4,
        question: 'Какая полярная станция располагается на мысе Столбовой, в бухтеТеплиц.',
        answers: [
          { id: 'a', text: '«Остров Рудольфа»', correct: true },
          { id: 'b', text: '«Остров Шмидт»', correct: false },
          { id: 'c', text: '«Северный полюс-1»', correct: false },
        ],
        multiAnswer: false,
      },
      {
        id: 5,
        question: 'Имя русского штурмана, участника Великой Северной экспедиции, вчесть которого названа самая северная точка нашей страны',
        answers: [
          { id: 'a', text: '«Челюскин Семён»', correct: true },
          { id: 'b', text: '«Папанин Иван»', correct: false },
          { id: 'c', text: '«Водопьянов Михаил»', correct: false },
        ],
        multiAnswer: false,
      },
      {
        id: 6,
        question: 'На каком море находиться остров Белый, где расположена морская гидрологическая станция?',
        answers: [
          { id: 'a', text: '«Красное»', correct: false },
          { id: 'b', text: '«Карское»', correct: true },
          { id: 'c', text: '«Охотское»', correct: false },
        ],
        multiAnswer: false,
      },
      {
        id: 7,
        question:
          'На какой полярной станции был первый случай регистрации брака по радио? От начальника радиостанции на имя ЗАГСа Губисполкома была получена радиотелеграмма с просьбой зарегистрировать брак сотрудников станции.',
        answers: [
          { id: 'a', text: 'Мыс. Желаний', correct: false },
          { id: 'b', text: 'Маточкин Шар', correct: true },
          { id: 'c', text: 'Бухта Тихая', correct: false },
        ],
        multiAnswer: false,
      },
      {
        id: 8,
        question: 'На какой полярной станции организовали станцию по изучению космических лучей в 1951 году?',
        answers: [
          { id: 'a', text: 'мыс Шмидт', correct: true },
          { id: 'b', text: 'мыс Челюскин', correct: false },
          { id: 'c', text: 'Маточкин Шар', correct: false },
        ],
        multiAnswer: false,
      },
      {
        id: 9,
        question:
          'Кто совершил первую посадку на лёд в районе Северного полюса В 1937 году,доставив туда участников первой высокоширотной советской экспедиции «Северный полюс-1»',
        answers: [
          { id: 'a', text: 'Водопьянов М.В.', correct: true },
          { id: 'b', text: 'Каманин Н.П.', correct: false },
          { id: 'c', text: 'Бабушкин М.С.', correct: false },
        ],
        multiAnswer: false,
      },
      {
        id: 10,
        question: 'Под руководством Отто Юльевича Шмидта была организована первая дрейфующая полярная станция «Северный полюс-1',
        answers: [
          { id: 'a', text: '6 июля 1938 года', correct: true },
          { id: 'b', text: '21 мая 1937 год', correct: false },
          { id: 'c', text: '6 июня 1937 года', correct: false },
        ],
        multiAnswer: false,
      },
    ],
    crossword: [
      {
        title: 'Кроссворд «Полярные станции»',
        questions: [
          {
            id: 1,
            direction: 'По вертикали:',
            question: 'Фамилия полярного исследователя, в честь которого названы ледник и мыс на острове Гукера.',
            answer: 'Седов',
          },
          {
            id: 2,
            direction: 'По вертикали:',
            question:
              'Лидерство в освоении какого физико-географического района Земли,примыкающего к Северному полюсу, продемонстрировала станция «Северный полюс-1»?',
            answer: 'Арктика',
          },
          {
            id: 3,
            direction: 'По горизонтали:',
            question: 'На каком острове в Карском море расположена Морская гидрометеорологическая береговая станция 2 разряда имени М. В. Попова?',
            answer: 'Белый',
          },
          {
            id: 4,
            direction: 'По горизонтали:',
            question: 'Самый северный остров архипелага Земля Франца-Иосифа в Северном Ледовитом океане?',
            answer: 'Рудольфа',
          },
          {
            id: 5,
            direction: 'По горизонтали:',
            question: 'Кто возглавил первую в мире дрейфующую полярную станцию "Северный полюс-1"?',
            answer: 'Папанин',
          },
          {
            id: 6,
            direction: 'По вертикали:',
            question: 'Название бухты, в которой проходила вторая зимовка экспедиции Георгия Седова.',
            answer: 'Тихая',
          },
          {
            id: 7,
            direction: 'По вертикали:',
            question: 'Какое холодное название носил мыс Шмидта, до его переименования в 1934 году?',
            answer: 'Северный',
          },
          {
            id: 8,
            direction: 'По горизонтали:',
            question: 'Какое ключевое слово объединяет понятия: «Маточкин Шар», «Бухта Тихая», «Северный полюс -1», «Мыс Челюскин»?',
            answer: 'станция',
          },
          {
            id: 9,
            direction: 'По вертикали:',
            question:
              'Водное пространство между двумя участками суши, в честь которого была названа полярная станция «Маточкин Шар», ставшая самой первойименно советской станцией в Арктике?',
            answer: 'пролив',
          },
          {
            id: 8,
            direction: 'По горизонтали:',
            question:
              'Объединённая гидрометеорологическая станция им. Е.К. Фёдорова расположена на мысе, названом в честь одного из великих русских землепроходцев XVIII столетия, назовите его фамилию? ',
            answer: 'Челюскин',
          },
        ],
      },
    ],
    puzzle: [
      {
        images: [
          { title: '1.jpg', src: 'images/1.jpg' },
          { title: '2.jpg', src: 'images/2.jpg' },
          { title: '3.jpg', src: 'images/3.jpg' },
          { title: '4.jpg', src: 'images/4.jpg' },
          { title: '5.jpg', src: 'images/5.jpg' },
          { title: '6.jpg', src: 'images/6.jpg' },
          { title: '7.jpg', src: 'images/7.jpg' },
          { title: '8.jpg', src: 'images/8.jpg' },
          { title: '9.jpg', src: 'images/9.jpg' },
          { title: '10.jpg', src: 'images/10.jpg' },
          { title: '11.jpg', src: 'images/11.jpg' },
          { title: '12.jpg', src: 'images/12.jpg' },
          { title: '13.jpg', src: 'images/13.jpg' },
          { title: '14.jpg', src: 'images/14.jpg' },
          { title: '15.jpg', src: 'images/15.jpg' },
          { title: '16.jpg', src: 'images/16.jpg' },
          { title: '17.jpg', src: 'images/17.jpg' },
          { title: '18.jpg', src: 'images/18.jpg' },
          { title: '19.jpg', src: 'images/19.jpg' },
          { title: '20.jpg', src: 'images/20.jpg' },
          { title: '21.jpg', src: 'images/21.jpg' },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'Регулярные авиалинии',
    quiz: [
      {
        title: 'Викторина «Пути. Трассы. Полярная авиация»',
        images: [{ src: 'images/1.jpg' }, { src: 'images/2.jpg' }],
        questions: [
          {
            id: 1,
            question: 'Для чего в 1930-е годы в СССР была создана полярная авиация?',
            info: '(выберите один или несколько правильных ответов)',
            answers: [
              { id: 'a', text: 'помогала осваивать Америку', correct: false },
              { id: 'b', text: 'снабжение дрейфующих и полярных станций', correct: true },
              { id: 'c', text: 'помогала осваивать Арктику', correct: true },
              { id: 'd', text: 'перевозка пассажиров и грузов в районах Крайнего Севера', correct: true },
            ],
            multiAnswer: true,
          },
          {
            id: 2,
            question: 'В каком году началось регулярное воздушное сообщение по маршруту Красноярск — Игарка?',
            answers: [
              { id: 'a', text: '1933', correct: true },
              { id: 'b', text: '1934', correct: false },
              { id: 'c', text: '1930', correct: false },
            ],
            multiAnswer: false,
          },
          {
            id: 3,
            question: 'Название какого города пропущено в тексте?',
            info: 'В июле 1936 года лётчики Г. Т. Побежимов и В. С. Молоков на летающей лодке Дорнье «Валь» облетели территорию Крайнего Севера, преодолев по кольцевому маршруту ________ — Якутск — Охотск — остров Врангеля — Москва — ________ 31 000 километров.',
            answers: [
              { id: 'a', text: 'Краснодар', correct: false },
              { id: 'b', text: 'Копейск', correct: false },
              { id: 'c', text: 'Красноярск', correct: true },
            ],
            multiAnswer: false,
          },
          {
            id: 4,
            question:
              '22 июля 1936 года Василий Молоков совершил полёт на ______ «СССР Н-2», который проходил от Красноярска вдоль берегов Северного Ледовитого океана до Архангельска с остановками по всем полярным станциям. Какое слово пропущено?',
            answers: [
              { id: 'a', text: 'аквасамолет', correct: false },
              { id: 'b', text: 'гидросамолет', correct: true },
              { id: 'c', text: 'водосамолет', correct: false },
            ],
            multiAnswer: false,
          },
          {
            id: 5,
            question: 'Важной частью чего стал в 1930-х годах Северный морской путь?',
            answers: [
              { id: 'a', text: 'транспортной инфраструктуры Советского Союза', correct: true },
              { id: 'b', text: 'военной миссии Советского Союза', correct: false },
              { id: 'c', text: 'курортных маршрутов Советского Союза', correct: false },
            ],
            multiAnswer: false,
          },
          {
            id: 6,
            question: 'Как расшифровывается аббревиатура СМП?',
            answers: [
              { id: 'a', text: 'Снежная Морозная Погода', correct: false },
              { id: 'b', text: 'Самолет Морского Предназначения', correct: false },
              { id: 'c', text: 'Северный Морской Путь', correct: true },
            ],
            multiAnswer: false,
          },
          {
            id: 7,
            question: 'Сколько самолетов насчитывалось у полярной авиации в 1935 году?',
            answers: [
              { id: 'a', text: '77', correct: true },
              { id: 'b', text: '15', correct: false },
              { id: 'c', text: '104', correct: false },
            ],
            multiAnswer: false,
          },
          {
            id: 8,
            question: 'Какие отечественные самолеты конструктора А.Н.Туполева получила в 1935 году полярная авиация?',
            answers: [
              { id: 'a', text: 'МП-6', correct: true },
              { id: 'b', text: 'АНТ-4', correct: false },
              { id: 'c', text: 'АНТ-25', correct: false },
            ],
            multiAnswer: false,
          },
          {
            id: 9,
            question: 'В феврале 1933 года было образовано Управление воздушной службы. Кто стал руководителем организации?',
            answers: [
              { id: 'a', text: 'Б.Г. Чухновский', correct: false },
              { id: 'b', text: 'М.И. Шевелёв', correct: true },
              { id: 'c', text: 'А.В. Беляков', correct: false },
            ],
            multiAnswer: false,
          },
          {
            id: 10,
            question: 'Модель какого самолета рассматривает летчик Василий Молоков с женой Надеждой?',
            answers: [
              { id: 'a', text: 'Р-5', correct: true },
              { id: 'b', text: 'Ш-2', correct: false },
              { id: 'c', text: 'У-2', correct: false },
            ],
            multiAnswer: false,
          },
        ],
      },
    ],

    crossword: [
      {
        title: 'Кроссворд «Полярные станции»',
        questions: [
          {
            id: 1,
            direction: 'По вертикали:',
            question:
              'Какой город воздушная арктическая трасса вдоль евразийского побережья связала с самыми отдалёнными базами Советской Арктики, с её портами, зимовками, полярными станциями и промышленными новостройками?',
            answer: '(Москва)',
          },
          {
            id: 2,
            direction: 'По горизонтали:',
            question: 'Использование каких самолетов позволяло приземляться на водные поверхности, что было особенно актуально в условиях сурового климата?',
            answer: '(Гидросамолет)',
          },
          {
            id: 3,
            direction: 'По вертикали:',
            question:
              'С 1933 года началось регулярное воздушное сообщение по маршрутам Красноярск – Игарка. Что для этого было обустроено в Красноярске на острове Телячем?',
            answer: '(Аэрогидропорт)',
          },
          {
            id: 4,
            direction: 'По горизонтали:',
            question: 'Одна из остановок авиамаршрута Москва – Архангельск, родина Снегурочки?',
            answer: '(Кострома)',
          },
          {
            id: 5,
            direction: 'По горизонтали:',
            question: 'Как называется район Земли, который примыкает к Северному полюсу?',
            answer: '(Арктика)',
          },
          {
            id: 6,
            direction: 'По горизонтали:',
            question: 'В 1932 году было образовано Главное управление Северного морского пути, назовите фамилию того, кто стал его руководителем?',
            answer: '(Шмидт)',
          },
          {
            id: 7,
            direction: 'По вертикали:',
            question: 'Для изучения подступов к какому полюсу использовался маршрут Москва — Земля Франца-Иосифа?',
            answer: '(Северный)',
          },
          {
            id: 8,
            direction: 'По вертикали:',
            question:
              'В каком городе начинался и заканчивался кольцевой маршрут, который совершили в июле 1936 года лётчики Г.Т. Побежимов и В.С. Молоков на летающей лодке Дорнье «Валь» облетев территорию Крайнего Севера?',
            answer: '(Красноярск)',
          },
          {
            id: 9,
            direction: 'По горизонтали:',
            question: 'Фамилия летчика, впервые проложившего авиатрассу через весь Северный морской путь?',
            answer: '(Молоков)',
          },
          {
            id: 10,
            direction: 'По горизонтали:',
            question: 'Что стало важным инструментом для транспортировки грузов, почты и пассажиров в арктическом регионе?',
            answer: '(Авиаперевозки)',
          },
        ],
      },
    ],
    puzzle: [
      {
        images: [
          { title: '1.jpg', src: 'images/1.jpg' },
          { title: '2.jpg', src: 'images/2.jpg' },
          { title: '3.jpg', src: 'images/3.jpg' },
        ],
      },
    ],
  },
];
