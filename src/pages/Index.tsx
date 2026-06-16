import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { WIKI_ARTICLES, CATEGORIES } from '@/data/wiki';
import Icon from '@/components/ui/icon';

const STATS = [
  { value: '2 200+', label: 'кибератак в день в мире' },
  { value: '$4.45M', label: 'средняя цена утечки данных' },
  { value: '95%', label: 'инцидентов — ошибка человека' },
  { value: '11 сек', label: 'интервал между атаками шифровальщиков' },
];

const Index = () => {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get('cat') || 'Все';

  const filtered = useMemo(() => {
    return WIKI_ARTICLES.filter((a) => {
      const matchCat = activeCat === 'Все' || a.category === activeCat;
      const q = query.toLowerCase();
      const matchQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tags.some((t) => t.includes(q));
      return matchCat && matchQuery;
    });
  }, [query, activeCat]);

  const setCat = (cat: string) => {
    if (cat === 'Все') setSearchParams({});
    else setSearchParams({ cat });
  };

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
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            {CATEGORIES.slice(0, 4).map((c) => (
              <button key={c.name} onClick={() => setCat(c.name)} className="story-link text-muted-foreground hover:text-foreground transition-colors">
                {c.name}
              </button>
            ))}
          </nav>
          <button className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent">
            <Icon name="Plus" size={15} />
            <span className="hidden sm:inline">Предложить статью</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="container relative py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono-x text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {WIKI_ARTICLES.length} статей · открытая энциклопедия
            </div>
            <h1 className="animate-fade-up text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl" style={{ animationDelay: '0.05s' }}>
              Всё о<br />
              <span className="font-mono-x text-accent">кибербезопасности</span>
            </h1>
            <p className="animate-fade-up mx-auto mt-5 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: '0.1s' }}>
              Подробные статьи об угрозах, методах защиты, криптографии и ключевых понятиях цифровой безопасности.
            </p>
            <div className="animate-fade-up mx-auto mt-8 max-w-xl" style={{ animationDelay: '0.15s' }}>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm transition-shadow focus-within:border-accent focus-within:shadow-md">
                <Icon name="Search" size={20} className="text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Найти статью, термин или тему…"
                  className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground">
                    <Icon name="X" size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="container grid grid-cols-2 gap-px md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-4 py-8 text-center">
              <div className="font-mono-x text-3xl font-bold text-accent md:text-4xl">{s.value}</div>
              <div className="mt-1.5 text-sm text-primary-foreground/70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Category tabs */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container">
          <div className="flex items-center gap-1 overflow-x-auto py-3">
            <button
              onClick={() => setCat('Все')}
              className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${activeCat === 'Все' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Все разделы
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.name}
                onClick={() => setCat(c.name)}
                className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${activeCat === c.name ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Icon name={c.icon} size={14} />
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="container py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
          <div>
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-xl font-bold">
                {activeCat === 'Все' ? 'Все статьи' : activeCat}
              </h2>
              <span className="font-mono-x text-sm text-muted-foreground">{filtered.length} из {WIKI_ARTICLES.length}</span>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
                <Icon name="FileSearch" size={32} className="mx-auto mb-3 opacity-40" />
                Ничего не найдено. Попробуйте другой запрос.
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((a) => (
                  <Link
                    key={a.id}
                    to={`/article/${a.id}`}
                    className="group flex gap-5 rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon name={a.icon} size={22} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="font-mono-x text-xs uppercase tracking-wider text-accent">{a.category}</span>
                      </div>
                      <h3 className="text-lg font-bold tracking-tight transition-colors group-hover:text-accent">{a.title}</h3>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{a.summary}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {a.tags.slice(0, 3).map((t) => (
                            <span key={t} className="font-mono-x text-xs text-muted-foreground">#{t}</span>
                          ))}
                        </div>
                        <span className="flex items-center gap-1 font-mono-x text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                          Читать <Icon name="ArrowRight" size={13} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-4 font-mono-x text-xs uppercase tracking-widest text-muted-foreground">Разделы</p>
              <div className="space-y-1">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setCat(c.name)}
                    className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${activeCat === c.name ? 'bg-accent/10 font-medium text-accent' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
                  >
                    <Icon name={c.icon} size={15} />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-4 font-mono-x text-xs uppercase tracking-widest text-muted-foreground">Начать с основ</p>
              <div className="space-y-3">
                {WIKI_ARTICLES.slice(0, 3).map((a) => (
                  <Link key={a.id} to={`/article/${a.id}`} className="group flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/5 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon name={a.icon} size={13} />
                    </div>
                    <p className="text-sm font-medium leading-snug transition-colors group-hover:text-accent">{a.title}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
              <Icon name="ShieldAlert" size={20} className="mb-2.5 text-accent" />
              <h3 className="font-semibold">Заметили инцидент?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Немедленно смените пароли и включите двухфакторную аутентификацию.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2 font-mono-x">
            <Icon name="ShieldCheck" size={16} className="text-accent" />
            SecWiki — открытая база знаний по кибербезопасности
          </div>
          <span className="font-mono-x text-xs">© 2026</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
