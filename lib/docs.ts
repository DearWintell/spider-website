export type DocBlock =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "code"; lang: string; code: string }
  | { kind: "list"; items: string[]; ordered?: boolean };

export type DocArticle = {
  slug: string;
  section: string;
  title: string;
  description: string;
  blocks: DocBlock[];
};

export const DOC_SECTIONS = ["Начало работы", "Команды", "Примеры"] as const;

export const DOCS: DocArticle[] = [
  {
    slug: "obzor",
    section: "Начало работы",
    title: "Spider Script",
    description:
      "Простой скриптовый язык для создания интерактивных приложений и игр.",
    blocks: [
      {
        kind: "p",
        text: "Spider Script — простой скриптовый язык для создания интерактивных приложений и игр. Он использует чистый, читаемый синтаксис, который легко освоить.",
      },
      { kind: "h", text: "Ключевые возможности" },
      {
        kind: "list",
        items: [
          "Простой синтаксис — легко читать и писать",
          "Интерактивный UI — создание окон, кнопок и текстовых элементов",
          "Переменные — хранение и обработка данных",
          "Управление потоком — if/else, циклы, функции",
          "Обработка событий — реакция на действия пользователя",
        ],
      },
      { kind: "h", text: "Базовая структура" },
      {
        kind: "code",
        lang: "spider",
        code: 'Spider(Start)\n\nprint("Hello, World!")\n\nwindow(title="My App" width=800 height=600)',
      },
      { kind: "h", text: "Быстрый старт" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Создайте новый файл с расширением .spider",
          "Начните с Spider(Start)",
          "Добавьте свои команды",
          "Нажмите F5, чтобы запустить",
        ],
      },
    ],
  },
  {
    slug: "sintaksis",
    section: "Начало работы",
    title: "Синтаксис",
    description:
      "Комментарии, переменные, строки и параметры команд в Spider Script.",
    blocks: [
      { kind: "h", text: "Комментарии" },
      {
        kind: "p",
        text: "Используйте # или // для комментариев:",
      },
      {
        kind: "code",
        lang: "spider",
        code: "# This is a comment\n// This is also a comment",
      },
      { kind: "h", text: "Переменные" },
      {
        kind: "p",
        text: "Объявляйте переменные с помощью var:",
      },
      {
        kind: "code",
        lang: "spider",
        code: 'var(name="John" value=42)',
      },
      { kind: "h", text: "Строки" },
      {
        kind: "p",
        text: "Используйте одинарные или двойные кавычки:",
      },
      {
        kind: "code",
        lang: "spider",
        code: 'print("Hello, World!")',
      },
      { kind: "h", text: "Параметры" },
      {
        kind: "p",
        text: "Команды используют синтаксис key=value:",
      },
      {
        kind: "code",
        lang: "spider",
        code: 'window(title="My App" width=800 height=600)',
      },
    ],
  },
  {
    slug: "print",
    section: "Команды",
    title: "print",
    description: "Выводит текст в консоль.",
    blocks: [
      {
        kind: "p",
        text: "Выводит текст в консоль:",
      },
      {
        kind: "code",
        lang: "spider",
        code: 'print("Hello, World!")',
      },
    ],
  },
  {
    slug: "var",
    section: "Команды",
    title: "var",
    description: "Объявляет переменную.",
    blocks: [
      {
        kind: "p",
        text: "Объявляет переменную:",
      },
      {
        kind: "code",
        lang: "spider",
        code: 'var(name="score" value=100)',
      },
    ],
  },
  {
    slug: "window",
    section: "Команды",
    title: "window",
    description: "Создаёт новое окно.",
    blocks: [
      {
        kind: "p",
        text: "Создаёт новое окно:",
      },
      {
        kind: "code",
        lang: "spider",
        code: 'window(title="My App" width=800 height=600 bg="#ffffff")',
      },
    ],
  },
  {
    slug: "text",
    section: "Команды",
    title: "text",
    description: "Отображает текст в окне.",
    blocks: [
      {
        kind: "p",
        text: "Отображает текст в окне:",
      },
      {
        kind: "code",
        lang: "spider",
        code: 'text(text="Hello" x=100 y=100 color="black" size=24)',
      },
    ],
  },
  {
    slug: "button",
    section: "Команды",
    title: "button",
    description: "Создаёт кнопку.",
    blocks: [
      {
        kind: "p",
        text: "Создаёт кнопку:",
      },
      {
        kind: "code",
        lang: "spider",
        code: 'button(text="Click Me" x=100 y=100 action="on_click")',
      },
    ],
  },
  {
    slug: "hello-world",
    section: "Примеры",
    title: "Hello World",
    description: "Минимальный скрипт Spider Script.",
    blocks: [
      {
        kind: "code",
        lang: "spider",
        code: 'Spider(Start)\n\nprint("Hello, World!")',
      },
    ],
  },
  {
    slug: "okno-s-tekstom",
    section: "Примеры",
    title: "Окно с текстом",
    description: "Окно с текстовым элементом по центру.",
    blocks: [
      {
        kind: "code",
        lang: "spider",
        code: 'Spider(Start)\n\nwindow(title="My App" width=800 height=600)\ntext(text="Hello Spider!" x=400 y=300 color="black" size=24)',
      },
    ],
  },
  {
    slug: "knopka-s-deystviem",
    section: "Примеры",
    title: "Кнопка с действием",
    description: "Окно с кнопкой, привязанной к обработчику событий.",
    blocks: [
      {
        kind: "code",
        lang: "spider",
        code: 'Spider(Start)\n\nwindow(title="Button Demo" width=400 height=300)\nbutton(text="Click Me" x=150 y=100 action="on_click")',
      },
    ],
  },
];

export function getDoc(slug: string): DocArticle | undefined {
  return DOCS.find((d) => d.slug === slug);
}
