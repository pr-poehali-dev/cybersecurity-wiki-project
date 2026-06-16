import { useState } from 'react';
import Icon from '@/components/ui/icon';

const CATEGORIES = [
  { name: 'Криптография', icon: 'KeyRound', desc: 'Шифрование, хэши, цифровые подписи и управление ключами.' },
  { name: 'Сетевая защита', icon: 'Network', desc: 'Файрволы, VPN, сегментация и безопасные протоколы.' },
  { name: 'Веб-безопасность', icon: 'Globe', desc: 'OWASP Top 10, XSS, CSRF и SQL-инъекции.' },
  { name: 'Социальная инженерия', icon: 'Users', desc: 'Фишинг, претекстинг и манипуляции человеком.' },
  { name: 'Вредоносное ПО', icon: 'Bug', desc: 'Вирусы, трояны, черви и программы-вымогатели.' },
  { name: 'Форензика', icon: 'Search', desc: 'Расследование инцидентов и анализ следов атак.' },
];

const TRIAD = [
  { letter: 'C', word: 'Confidentiality', ru: 'Конфиденциальность', icon: 'EyeOff', desc: 'Доступ к данным имеют только авторизованные лица. Достигается шифрованием и контролем доступа.' },
  { letter: 'I', word: 'Integrity', ru: 'Целостность', icon: 'FileCheck', desc: 'Данные не изменяются несанкционированно. Обеспечивается хэшами, подписями и контрольными суммами.' },
  { letter: 'A', word: 'Availability', ru: 'Доступность', icon: 'Activity', desc: 'Сервисы доступны, когда нужны. Защита от DDoS, резервирование и отказоустойчивость.' },
];

const THREATS = [
  { name: 'Фишинг', icon: 'Mail', desc: 'Поддельные письма и сайты, выманивающие логины, пароли и данные карт.', level: 'Очень частая' },
  { name: 'Программы-вымогатели', icon: 'Lock', desc: 'Шифруют файлы и требуют выкуп за расшифровку. Главная угроза для бизнеса.', level: 'Критическая' },
  { name: 'DDoS-атаки', icon: 'ServerCrash', desc: 'Перегрузка сервиса потоком запросов до полного отказа.', level: 'Высокая' },
  { name: 'Man-in-the-Middle', icon: 'GitBranch', desc: 'Перехват и подмена трафика между двумя сторонами связи.', level: 'Средняя' },
  { name: 'SQL-инъекции', icon: 'Database', desc: 'Внедрение вредоносного SQL через поля ввода для доступа к базе.', level: 'Высокая' },
  { name: 'Нулевые уязвимости', icon: 'AlertTriangle', desc: 'Эксплойты для дыр, о которых ещё не знает разработчик ПО.', level: 'Критическая' },
];

const PRACTICES = [
  { icon: 'KeyRound', title: 'Сильные пароли', desc: 'Минимум 12 символов, уникальные для каждого сервиса. Используйте менеджер паролей.' },
  { icon: 'Smartphone', title: 'Двухфакторная аутентификация', desc: 'Второй фактор (код, ключ) защищает аккаунт даже при утечке пароля.' },
  { icon: 'RefreshCw', title: 'Регулярные обновления', desc: 'Свежие патчи закрывают известные уязвимости в ОС и приложениях.' },
  { icon: 'HardDriveDownload', title: 'Резервные копии', desc: 'Правило 3-2-1: три копии, два носителя, одна вне офиса.' },
  { icon: 'Wifi', title: 'Безопасные сети', desc: 'Избегайте открытого Wi-Fi без VPN, проверяйте HTTPS-соединение.' },
  { icon: 'GraduationCap', title: 'Обучение сотрудников', desc: 'Человек — самое слабое звено. Регулярный тренинг снижает риски.' },
];

const GLOSSARY = [
  { term: 'Шифрование', def: 'Преобразование данных в нечитаемый вид с помощью ключа. Бывает симметричным (AES) и асимметричным (RSA).' },
  { term: 'Хэш', def: 'Необратимая «цифровая подпись» данных фиксированной длины. Используется для проверки целостности (SHA-256).' },
  { term: 'Брандмауэр (Firewall)', def: 'Барьер, фильтрующий сетевой трафик по заданным правилам между доверенной и внешней сетью.' },
  { term: 'VPN', def: 'Зашифрованный туннель, скрывающий трафик и подменяющий ваш реальный IP-адрес.' },
  { term: 'Эксплойт', def: 'Код или техника, использующая конкретную уязвимость для несанкционированных действий.' },
  { term: 'Zero Trust', def: 'Модель «не доверяй никому»: каждый запрос проверяется независимо от источника.' },
  { term: 'Социальная инженерия', def: 'Манипуляция людьми для получения доступа или информации вместо взлома систем.' },
  { term: 'Песочница (Sandbox)', def: 'Изолированная среда для безопасного запуска подозрительных файлов и кода.' },
];

const TOOLS = [
  { name: 'Wireshark', cat: 'Анализ трафика' },
  { name: 'Nmap', cat: 'Сканер сети' },
  { name: 'Metasploit', cat: 'Пентест' },
  { name: 'Burp Suite', cat: 'Веб-аудит' },
  { name: 'Kali Linux', cat: 'ОС для аудита' },
  { name: 'Snort', cat: 'IDS/IPS' },
  { name: 'John the Ripper', cat: 'Подбор паролей' },
  { name: 'OpenVAS', cat: 'Сканер уязвимостей' },
];

const STATS = [
  { value: '2 200+', label: 'кибератак в день в мире' },
  { value: '$4.45M', label: 'средняя цена утечки данных' },
  { value: '95%', label: 'инцидентов — ошибка человека' },
  { value: '11 сек', label: 'интервал между атаками шифровальщиков' },
];

const levelColor: Record<string, string> = {
  'Критическая': 'text-rose-700 bg-rose-50 border-rose-200',
  'Высокая': 'text-orange-700 bg-orange-50 border-orange-200',
  'Очень частая': 'text-accent bg-accent/5 border-accent/20',
  'Средняя': 'text-amber-700 bg-amber-50 border-amber-200',
};

const Index = () => {
  const [query, setQuery] = useState('');

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
            <a href="#basics" className="story-link">Основы</a>
            <a href="#threats" className="story-link">Угрозы</a>
            <a href="#practices" className="story-link">Защита</a>
            <a href="#glossary" className="story-link">Термины</a>
          </nav>
          <button className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent">
            <Icon name="BookOpen" size={15} />
            <span className="hidden sm:inline">База знаний</span>
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
              открытая энциклопедия цифровой защиты
            </div>
            <h1 className="animate-fade-up text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl" style={{ animationDelay: '0.05s' }}>
              Всё о<br />
              <span className="font-mono-x text-accent">кибербезопасности</span>
            </h1>
            <p className="animate-fade-up mx-auto mt-6 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: '0.1s' }}>
              Понятный справочник: что такое угрозы, как устроена защита, ключевые термины и практики безопасности.
            </p>

            <div className="animate-fade-up mx-auto mt-9 max-w-xl" style={{ animationDelay: '0.15s' }}>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm transition-shadow focus-within:border-accent focus-within:shadow-md">
                <Icon name="Search" size={20} className="text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Найти термин или тему…"
                  className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
                />
                <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono-x text-xs text-muted-foreground sm:block">⌘K</kbd>
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
              <div className="mt-2 text-sm text-primary-foreground/70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What is it / intro */}
      <section id="basics" className="container py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="font-mono-x text-xs uppercase tracking-widest text-accent">Что это</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Что такое кибербезопасность</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Кибербезопасность — это комплекс технологий, процессов и практик, защищающих
              компьютеры, сети, программы и данные от атак, повреждения или
              несанкционированного доступа.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Её цель — обеспечить три фундаментальных свойства информации, известных как
              «триада CIA». На ней строятся все стандарты и средства защиты — от паролей
              до межсетевых экранов и систем обнаружения вторжений.
            </p>
          </div>

          {/* CIA Triad */}
          <div className="space-y-3">
            {TRIAD.map((t) => (
              <div key={t.letter} className="flex gap-4 rounded-xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-mono-x text-2xl font-bold text-accent">
                  {t.letter}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{t.ru}</h3>
                    <span className="font-mono-x text-xs text-muted-foreground">{t.word}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container py-16 md:py-20">
          <div className="mb-10">
            <span className="font-mono-x text-xs uppercase tracking-widest text-accent">Разделы</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Направления защиты</h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="group bg-card p-6 transition-colors hover:bg-secondary">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon name={cat.icon} size={22} />
                </div>
                <h3 className="font-semibold">{cat.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threats */}
      <section id="threats" className="container py-16 md:py-20">
        <div className="mb-10">
          <span className="font-mono-x text-xs uppercase tracking-widest text-accent">Угрозы</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Основные виды кибератак</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Понимание распространённых угроз — первый шаг к защите. Вот атаки, с которыми
            сталкиваются чаще всего.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {THREATS.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                  <Icon name={t.icon} size={20} />
                </div>
                <span className={`rounded border px-2 py-0.5 text-xs font-medium ${levelColor[t.level]}`}>{t.level}</span>
              </div>
              <h3 className="font-semibold">{t.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Best practices */}
      <section id="practices" className="border-y border-border bg-secondary/40">
        <div className="container py-16 md:py-20">
          <div className="mb-10">
            <span className="font-mono-x text-xs uppercase tracking-widest text-accent">Защита</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Правила цифровой гигиены</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Простые привычки, которые снижают риск стать жертвой атаки в разы.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICES.map((p, i) => (
              <div key={p.title} className="flex gap-4 rounded-xl border border-border bg-card p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Icon name={p.icon} size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-x text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-semibold">{p.title}</h3>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary */}
      <section id="glossary" className="container py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:items-start">
          <div>
            <div className="mb-8">
              <span className="font-mono-x text-xs uppercase tracking-widest text-accent">Словарь</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Ключевые термины</h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              {GLOSSARY.map((g) => (
                <div key={g.term} className="bg-card p-5">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <Icon name="Hash" size={15} className="text-accent" />
                    {g.term}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{g.def}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools sidebar */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-5 flex items-center gap-2 font-semibold">
                <Icon name="Wrench" size={18} className="text-accent" /> Инструменты
              </h3>
              <div className="space-y-3">
                {TOOLS.map((tool) => (
                  <div key={tool.name} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                    <span className="font-mono-x text-sm font-medium">{tool.name}</span>
                    <span className="text-xs text-muted-foreground">{tool.cat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-6">
              <Icon name="ShieldAlert" size={22} className="mb-3 text-accent" />
              <h3 className="font-semibold">Заметили инцидент?</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                При утечке данных действуйте быстро: смените пароли и включите 2FA.
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
            SecWiki — открытая база знаний
          </div>
          <div className="flex gap-6">
            <a href="#basics" className="story-link">Основы</a>
            <a href="#threats" className="story-link">Угрозы</a>
            <a href="#practices" className="story-link">Защита</a>
            <a href="#glossary" className="story-link">Термины</a>
          </div>
          <span className="font-mono-x text-xs">© 2026</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
