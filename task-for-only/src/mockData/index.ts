
export interface IMockData {
  periodNum: number;
  startData: number;
  endData: number;
  eventsName: string;
  events: {
    year: number;
    text: string;
  }[];
  isChoose: boolean;
};

export const mockData: IMockData[] = [
  {
    periodNum: 1,
    startData: 1980,
    endData: 1986,
    eventsName: 'test 1',
    events: [
      {
        year: 1980,
        text: "Московская Олимпиада"
      },
      {
        year: 1981,
        text: "Первый полет шаттла Колумбия"
      },
      {
        year: 1982,
        text: "Смерть Леонида Брежнева"
      },
      {
        year: 1983,
        text: "Рональд Рейган объявляет СССР 'империей зла'"
      },
      {
        year: 1984,
        text: "Смерть Юрия Андропова"
      },
      {
        year: 1985,
        text: "Михаил Горбачев становится генсеком ЦК КПСС"
      },
      {
        year: 1986,
        text: "Авария на Чернобыльской АЭС"
      }
    ],
    isChoose: false
  },
  {
    periodNum: 2,
    startData: 1987,
    endData: 1993,
    eventsName: 'test 2',
    events: [
      {
        year: 1987,
        text: "Договор о ликвидации ракет средней и меньшей дальности"
      },
      {
        year: 1988,
        text: "Вывод советских войск из Афганистана"
      },
      {
        year: 1989,
        text: "Падение Берлинской стены"
      },
      {
        year: 1990,
        text: "Объединение Германии"
      },
      {
        year: 1991,
        text: "Распад СССР"
      },
      {
        year: 1992,
        text: "Начало экономических реформ в России"
      },
      {
        year: 1993,
        text: "Конституционный кризис в России"
      }
    ],
    isChoose: false
  },
  {
    periodNum: 3,
    startData: 1994,
    endData: 2000,
    eventsName: 'test 3',
    events: [
      {
        year: 1994,
        text: "Начало первой чеченской войны"
      },
      {
        year: 1995,
        text: "Создание ВТО"
      },
      {
        year: 1996,
        text: "Избрание Бориса Ельцина на второй срок"
      },
      {
        year: 1997,
        text: "Присоединение России к G7"
      },
      {
        year: 1998,
        text: "Дефолт в России"
      },
      {
        year: 1999,
        text: "Начало второй чеченской войны"
      },
      {
        year: 2000,
        text: "Избрание Владимира Путина президентом"
      }
    ],
    isChoose: false
  },
  {
    periodNum: 4,
    startData: 2001,
    endData: 2007,
    eventsName: 'test 4',
    events: [
      {
        year: 2001,
        text: "Теракты 11 сентября в США"
      },
      {
        year: 2002,
        text: "Создание НАТО-Россия Совет"
      },
      {
        year: 2003,
        text: "Война в Ираке"
      },
      {
        year: 2004,
        text: "Теракт в Беслане"
      },
      {
        year: 2005,
        text: "Создание ШОС"
      },
      {
        year: 2006,
        text: "Смерть первого президента Чечни Ахмата Кадырова"
      },
      {
        year: 2007,
        text: "Выступление Владимира Путина в Мюнхене"
      }
    ],
    isChoose: false
  },
  {
    periodNum: 5,
    startData: 2008,
    endData: 2014,
    eventsName: 'test 5',
    events: [
      {
        year: 2008,
        text: "Война в Грузии"
      },
      {
        year: 2009,
        text: "Мировой экономический кризис"
      },
      {
        year: 2010,
        text: "Арабская весна"
      },
      {
        year: 2011,
        text: "Протесты в России"
      },
      {
        year: 2012,
        text: "Возвращение Владимира Путина на пост президента"
      },
      {
        year: 2013,
        text: "Евромайдан на Украине"
      },
      {
        year: 2014,
        text: "Присоединение Крыма к России"
      }
    ],
    isChoose: false
  },
  {
    periodNum: 6,
    startData: 2015,
    endData: 2022,
    eventsName: 'Наука',
    events: [
      {
        year: 2015,
        text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
      },
      {
        year: 2016,
        text: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11"
      },
      {
        year: 2017,
        text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi"
      },
      {
        year: 2018,
        text: "Четвертое избрание Владимира Путина"
      },
      {
        year: 2019,
        text: "Пандемия COVID-19"
      },
      {
        year: 2020,
        text: "Поправки к Конституции России"
      },
      {
        year: 2021,
        text: "Начало спецоперации на Украине"
      },
      {
        year: 2022,
        text: "Частичная мобилизация в России"
      }
    ],
    isChoose: true
  }
]