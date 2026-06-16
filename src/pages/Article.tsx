import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { WIKI_ARTICLES } from '@/data/wiki';
import Icon from '@/components/ui/icon';

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const article = WIKI_ARTICLES.find((a) => a.id === id);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    document.querySelectorAll('h2[id], h3[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [article]);

  if (!article) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Статья не найдена</p>
          <Link to="/" className="mt-4 inline-block text-accent hover:underline">← На главную</Link>
        </div>
      </div>
    );
  }

  const related = WIKI_ARTICLES.filter((a) => a.id !== id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
              <Icon name="ShieldCheck" size={17} />
            </div>
            <span className="font-mono-x text-base font-bold tracking-tight">SecWiki</span>
          </Link>
          <span className="text-border">/</span>
          <span className="truncate text-sm text-muted-foreground">{article.title}</span>
        </div>
      </header>

      <div className="container py-10">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr_220px]">

          {/* Left nav — contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <Link to="/" className="mb-5 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent">
                <Icon name="ChevronLeft" size={15} /> На главную
              </Link>
              <p className="mb-3 font-mono-x text-xs uppercase tracking-widest text-muted-foreground">Содержание</p>
              {article.sections.map((s) => (
                <div key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`block rounded-md px-2 py-1 text-sm transition-colors hover:text-accent ${activeSection === s.id ? 'font-medium text-accent' : 'text-muted-foreground'}`}
                  >
                    {s.heading}
                  </a>
                  {s.subsections?.map((sub) => (
                    <a
                      key={sub.id}
                      href={`#${sub.id}`}
                      className={`block rounded-md py-0.5 pl-5 pr-2 text-xs transition-colors hover:text-accent ${activeSection === sub.id ? 'font-medium text-accent' : 'text-muted-foreground'}`}
                    >
                      {sub.heading}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </aside>

          {/* Main article */}
          <article className="min-w-0">
            {/* Article header */}
            <div className="mb-8 border-b border-border pb-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="font-mono-x text-xs uppercase tracking-wider text-accent">{article.category}</span>
                {article.tags.map((t) => (
                  <span key={t} className="rounded border border-border px-2 py-0.5 font-mono-x text-xs text-muted-foreground">#{t}</span>
                ))}
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{article.title}</h1>

              {/* Summary box */}
              <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-5">
                <p className="leading-relaxed text-foreground/80">{article.summary}</p>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {article.sections.map((s) => (
                <section key={s.id}>
                  <h2 id={s.id} className="mb-4 scroll-mt-24 border-b border-border pb-2 text-2xl font-bold tracking-tight">
                    {s.heading}
                  </h2>
                  {s.text && (
                    <div className="prose-wiki mb-6">
                      {s.text.split('\n\n').map((para, i) => (
                        <p key={i} className="mb-4 leading-[1.85] text-muted-foreground last:mb-0">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                  {s.subsections?.map((sub) => (
                    <div key={sub.id} className="mb-8 pl-5 border-l-2 border-border">
                      <h3 id={sub.id} className="mb-3 scroll-mt-24 text-lg font-semibold tracking-tight">
                        {sub.heading}
                      </h3>
                      <div>
                        {sub.text.split('\n\n').map((para, i) => (
                          <p key={i} className="mb-3 leading-[1.85] text-muted-foreground last:mb-0">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              ))}
            </div>

            {/* Tags footer */}
            <div className="mt-12 border-t border-border pt-8">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border bg-secondary px-3 py-1 font-mono-x text-xs text-muted-foreground">#{t}</span>
                ))}
              </div>
            </div>
          </article>

          {/* Right sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="mb-4 font-mono-x text-xs uppercase tracking-widest text-muted-foreground">Другие статьи</p>
                <div className="space-y-4">
                  {related.map((r) => (
                    <Link key={r.id} to={`/article/${r.id}`} className="group block">
                      <span className="font-mono-x text-xs uppercase tracking-wide text-accent">{r.category}</span>
                      <p className="mt-0.5 text-sm font-medium leading-snug group-hover:text-accent transition-colors">{r.title}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <p className="mb-3 font-mono-x text-xs uppercase tracking-widest text-muted-foreground">Разделы</p>
                <div className="space-y-2">
                  {['Введение', 'Криптография', 'Сетевая защита', 'Вредоносное ПО', 'Социальная инженерия', 'Архитектура'].map((cat) => (
                    <Link key={cat} to={`/?cat=${cat}`} className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Article;
