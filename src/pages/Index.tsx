import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';

interface Article {
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  reads: string;
  level: 'База' | 'Средний' | 'Эксперт';
}

const CATEGORIES = [
  { name: 'Криптография', icon: 'KeyRound', count: 14, desc: 'Шифрование, хэши, ключи' },
  { name: 'Сетевая защита', icon: 'Network', count: 22, desc: 'Файрволы, VPN, протоколы' },
  { name: 'Веб-безопасность', icon: 'Globe', count: 18, desc: 'OWASP, XSS, SQL-инъекции' },
  { name: 'Социальная инженерия', icon: 'Users', count: 9, desc: 'Фишинг, манипуляции' },
  { name: 'Вредоносное ПО', icon: 'Bug', count: 16, desc: 'Вирусы, трояны, ransomware' },
  { name: 'Форензика', icon: 'Search', count: 7, desc: 'Расследование инцидентов' },
];

const ARTICLES: Article[] = [
  {
    title: 'Атака «человек посередине» (MITM)',
    excerpt: 'Перехват и подмена трафика между двумя сторонами связи. Разбираем механику, признаки и методы защиты.',
    category: 'Сетевая защита',
    tags: ['атаки', 'трафик', 'шифрование'],
    reads: '12.4k',
    level: 'Средний',
  },
  {
    title: 'Симметричное и асимметричное шифрование',
    excerpt: 'Фундаментальное различие между AES и RSA. Когда применять каждый подход и почему гибридные схемы побеждают.',
    category: 'Криптография',
    tags: ['шифрование', 'основы', 'ключи'],
    reads: '28.1k',
    level: 'База',
  },
  {
    title: 'SQL-инъекции: анатомия уязвимости',
    excerpt: 'Как недоверенный ввод превращается в исполняемый SQL и почему параметризованные запросы решают проблему.',
    category: 'Веб-безопасность',
    tags: ['owasp', 'атаки', 'базы данных'],
    reads: '19.7k',
    level: 'Средний',
  },
  {
    title: 'Фишинг и его эволюция',
    excerpt: 'От массовых рассылок до целевого spear-phishing. Психология обмана и технические маркеры подделки.',
    category: 'Социальная инженерия',
    tags: ['фишинг', 'почта', 'обман'],
    reads: '15.3k',
    level: 'База',
  },
  {
    title: 'Ransomware: жизненный цикл атаки',
    excerpt: 'От проникновения до требования выкупа. Разбор тактик шифровальщиков и стратегий резервного копирования.',
    category: 'Вредоносное ПО',
    tags: ['ransomware', 'атаки', 'бэкап'],
    reads: '11.9k',
    level: 'Эксперт',
  },
  {
    title: 'Принцип нулевого доверия (Zero Trust)',
    excerpt: 'Архитектура, где не доверяют никому по умолчанию. Микросегментация и непрерывная аутентификация.',
    category: 'Сетевая защита',
    tags: ['архитектура', 'основы', 'доступ'],
    reads: '9.6k',
    level: 'Эксперт',
  },
];

const ALL_TAGS = ['все', 'основы', 'атаки', 'шифрование', 'owasp', 'фишинг', 'трафик', 'ransomware', 'архитектура', 'доступ', 'ключи'];

const POPULAR = ARTICLES.slice(0, 3);

const levelColor: Record<Article['level'], string> = {
  'База': 'text-emerald-700 bg-emerald-50 border-emerald-200',
  'Средний': 'text-accent bg-accent/5 border-accent/20',
  'Эксперт': 'text-rose-700 bg-rose-50 border-rose-200',
};

const Index = () => {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('все');

  const filtered = useMemo(() => {
    return ARTICLES.filter((a) => {
      const matchTag = activeTag === 'все' || a.tags.includes(activeTag);
      const matchQuery =
        !query ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some((t) => t.includes(query.toLowerCase()));
      return matchTag && matchQuery;
    });
  }, [query, activeTag]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-primary text-primary-foreground">
              <Icon name="ShieldCheck" size={20} />
            </div>
            <div className="leading-none">
              <span className="font-mono-x text-lg font-bold tracking-tight">SecWiki</span>
              <span className="ml-1.5 font-mono-x text-xs text-muted-foreground">/ru</span>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#articles" className="story-link">Статьи</a>
            <a href="#categories" className="story-link">Категории</a>
            <a href="#tags" className="story-link">Теги</a>
          </nav>
          <button className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent">
            <Icon name="Plus" size={15} />
            <span className="hidden sm:inline">Внести статью</span>
          </button>
        </div>
      </header>

      {/* Hero + Search */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="container relative py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono-x text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              86 статей · 6 разделов · открытая база знаний
            </div>
            <h1 className="animate-fade-up text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl" style={{ animationDelay: '0.05s' }}>
              Энциклопедия<br />
              <span className="font-mono-x text-accent">кибербезопасности</span>
            </h1>
            <p className="animate-fade-up mx-auto mt-6 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: '0.1s' }}>
              Понятные статьи о защите данных, атаках и практиках — от базовых терминов до экспертных разборов.
            </p>

            <div className="animate-fade-up mx-auto mt-9 max-w-xl" style={{ animationDelay: '0.15s' }}>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm transition-shadow focus-within:border-accent focus-within:shadow-md">
                <Icon name="Search" size={20} className="text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Найти статью, термин или атаку…"
                  className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
                />
                <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono-x text-xs text-muted-foreground sm:block">⌘K</kbd>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="container py-16 md:py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="font-mono-x text-xs uppercase tracking-widest text-accent">Разделы</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Категории знаний</h2>
          </div>
          <a href="#articles" className="hidden items-center gap-1 text-sm font-medium text-muted-foreground hover:text-accent md:flex">
            Все статьи <Icon name="ArrowRight" size={15} />
          </a>
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              className="group flex flex-col items-start bg-card p-6 text-left transition-colors hover:bg-secondary"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon name={cat.icon} size={22} />
              </div>
              <div className="flex w-full items-center justify-between">
                <h3 className="font-semibold">{cat.name}</h3>
                <span className="font-mono-x text-xs text-muted-foreground">{cat.count}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{cat.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Tags filter */}
      <section id="tags" className="border-y border-border bg-secondary/40">
        <div className="container py-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 flex items-center gap-1.5 font-mono-x text-xs uppercase tracking-widest text-muted-foreground">
              <Icon name="Tag" size={13} /> Теги:
            </span>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full border px-3 py-1 font-mono-x text-xs transition-colors ${
                  activeTag === tag
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-accent hover:text-accent'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles + Popular */}
      <section id="articles" className="container py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          {/* Articles list */}
          <div>
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                {activeTag === 'все' ? 'Все статьи' : `Тег #${activeTag}`}
              </h2>
              <span className="font-mono-x text-sm text-muted-foreground">{filtered.length} найдено</span>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
                <Icon name="FileSearch" size={32} className="mx-auto mb-3 opacity-50" />
                Ничего не найдено. Попробуйте другой запрос.
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((a) => (
                  <article
                    key={a.title}
                    className="group cursor-pointer rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="font-mono-x text-xs uppercase tracking-wider text-accent">{a.category}</span>
                      <span className={`rounded border px-2 py-0.5 text-xs font-medium ${levelColor[a.level]}`}>{a.level}</span>
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">{a.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {a.tags.map((t) => (
                          <span key={t} className="font-mono-x text-xs text-muted-foreground">#{t}</span>
                        ))}
                      </div>
                      <span className="flex items-center gap-1.5 font-mono-x text-xs text-muted-foreground">
                        <Icon name="Eye" size={13} /> {a.reads}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar — popular */}
          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-5 flex items-center gap-2 font-semibold">
                <Icon name="Flame" size={18} className="text-accent" /> Популярное
              </h3>
              <div className="space-y-5">
                {POPULAR.map((a, i) => (
                  <button key={a.title} className="group flex w-full gap-3 text-left">
                    <span className="font-mono-x text-2xl font-bold text-border transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-sm font-medium leading-snug transition-colors group-hover:text-accent">{a.title}</p>
                      <span className="font-mono-x text-xs text-muted-foreground">{a.reads} прочтений</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-accent/20 bg-accent/5 p-6">
              <Icon name="Lightbulb" size={22} className="mb-3 text-accent" />
              <h3 className="font-semibold">Стань автором</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Поделись знаниями по кибербезопасности с сообществом.
              </p>
              <button className="mt-4 w-full rounded-md bg-accent py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90">
                Написать статью
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2 font-mono-x">
            <Icon name="ShieldCheck" size={16} className="text-accent" />
            SecWiki — открытая база знаний
          </div>
          <div className="flex gap-6">
            <a href="#articles" className="story-link">Статьи</a>
            <a href="#categories" className="story-link">Категории</a>
            <a href="#tags" className="story-link">Теги</a>
          </div>
          <span className="font-mono-x text-xs">© 2026</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
