import { useState } from 'react';
import Icon from '@/components/ui/icon';

const STATS = [
  { value: '2 200+', label: 'кибератак в день в мире' },
  { value: '$4.45M', label: 'средняя цена утечки данных' },
  { value: '95%', label: 'инцидентов — ошибка человека' },
  { value: '11 сек', label: 'интервал между атаками шифровальщиков' },
];

const TRIAD = [
  { letter: 'C', word: 'Confidentiality', ru: 'Конфиденциальность', desc: 'Доступ к данным имеют только авторизованные лица. Достигается шифрованием и контролем доступа.' },
  { letter: 'I', word: 'Integrity', ru: 'Целостность', desc: 'Данные не изменяются несанкционированно. Обеспечивается хэшами, подписями и контрольными суммами.' },
  { letter: 'A', word: 'Availability', ru: 'Доступность', desc: 'Сервисы доступны, когда нужны. Защита от DDoS, резервирование и отказоустойчивость.' },
];

const ARTICLES = [
  {
    id: 'phishing',
    category: 'Социальная инженерия',
    title: 'Фишинг',
    icon: 'Mail',
    lead: 'Фишинг — одна из самых распространённых техник кибератак. Злоумышленники маскируются под доверенные организации, чтобы похитить пароли, данные карт и личную информацию.',
    body: [
      {
        heading: 'Как работает фишинг',
        text: 'Атакующий создаёт убедительную копию письма или сайта известного сервиса — банка, почтовой службы, маркетплейса. Жертва переходит по ссылке, попадает на поддельную страницу и вводит свои данные, которые немедленно уходят мошеннику. Атака может быть массовой (миллионы писем) или точечной — так называемый spear-phishing, нацеленный на конкретного человека или компанию.',
      },
      {
        heading: 'Разновидности',
        text: 'Smishing — фишинг через SMS. Vishing — голосовые звонки от «сотрудников банка». Whaling — целевые атаки на топ-менеджеров. Фарминг — подмена DNS, при которой жертва попадает на фейковый сайт даже при вводе правильного адреса.',
      },
      {
        heading: 'Как защититься',
        text: 'Всегда проверяйте адрес отправителя и URL страницы перед вводом данных. Включите двухфакторную аутентификацию: даже если пароль утёк, второй фактор остановит взломщика. Не переходите по ссылкам из писем — лучше вводите адрес вручную. Используйте антифишинговые фильтры в почтовом клиенте и браузере.',
      },
    ],
    tags: ['атаки', 'почта', 'социальная инженерия'],
  },
  {
    id: 'ransomware',
    category: 'Вредоносное ПО',
    title: 'Программы-вымогатели (Ransomware)',
    icon: 'Lock',
    lead: 'Ransomware — вредоносное ПО, которое шифрует файлы жертвы и требует выкуп за их восстановление. Атаки шифровальщиков стали крупнейшей киберугрозой для бизнеса и государственных организаций.',
    body: [
      {
        heading: 'Жизненный цикл атаки',
        text: 'Заражение начинается с фишингового письма, уязвимости в ПО или скомпрометированного RDP-доступа. После проникновения вредонос тихо распространяется по сети, собирает данные и только затем активирует шифрование — часто в ночное время, чтобы успеть охватить максимум устройств до обнаружения.',
      },
      {
        heading: 'Двойное вымогательство',
        text: 'Современные группировки сначала похищают данные, а потом шифруют их. Это создаёт двойное давление: даже если у жертвы есть резервные копии, злоумышленники угрожают публичной публикацией украденной информации — клиентских баз, финансовых документов, персональных данных.',
      },
      {
        heading: 'Защита и реагирование',
        text: 'Регулярные резервные копии по правилу 3-2-1 (три копии, два носителя, одна офлайн) — главная страховка. Сегментация сети ограничивает распространение. При обнаружении атаки немедленно изолируйте поражённые узлы от сети. Платить выкуп эксперты не рекомендуют: это не гарантирует восстановление данных и финансирует дальнейшие атаки.',
      },
    ],
    tags: ['ransomware', 'атаки', 'шифрование'],
  },
  {
    id: 'encryption',
    category: 'Криптография',
    title: 'Шифрование данных',
    icon: 'KeyRound',
    lead: 'Шифрование — фундаментальный инструмент кибербезопасности. Оно превращает читаемые данные в нечитаемый шифротекст, защищая информацию при хранении и передаче.',
    body: [
      {
        heading: 'Симметричное шифрование',
        text: 'Один и тот же ключ используется для шифрования и расшифровки. Алгоритм AES-256 — золотой стандарт: он защищает государственную тайну США и данные банков по всему миру. Симметричное шифрование быстрое и эффективное, но требует безопасного обмена ключом между сторонами.',
      },
      {
        heading: 'Асимметричное шифрование',
        text: 'Используется пара ключей: публичный и приватный. Публичный ключ раздаётся всем желающим для шифрования сообщений, расшифровать которые может только владелец приватного ключа. RSA и ECDSA — основа HTTPS, цифровых подписей и сертификатов безопасности. Это решает проблему обмена ключами, но работает медленнее симметричного шифрования.',
      },
      {
        heading: 'Гибридный подход',
        text: 'На практике TLS (протокол за HTTPS) использует оба типа: асимметричное шифрование для безопасного обмена сессионным ключом, а затем быстрое симметричное шифрование для всего остального трафика. Именно поэтому зелёный замочек в браузере защищает ваши платёжные данные.',
      },
    ],
    tags: ['криптография', 'шифрование', 'основы'],
  },
  {
    id: 'mitm',
    category: 'Сетевая безопасность',
    title: 'Атака «человек посередине» (MITM)',
    icon: 'GitBranch',
    lead: 'Man-in-the-Middle — атака, при которой злоумышленник незаметно встраивается в канал связи между двумя сторонами, перехватывая и при необходимости подменяя передаваемые данные.',
    body: [
      {
        heading: 'Механика атаки',
        text: 'Атакующий обманывает обе стороны: жертва думает, что общается напрямую с сервером, сервер — что с легитимным клиентом. На практике весь трафик проходит через злоумышленника. Для этого используются ARP-спуфинг в локальных сетях, подмена DNS-записей, создание поддельных точек Wi-Fi или SSL-стриппинг — понижение HTTPS до HTTP.',
      },
      {
        heading: 'Открытый Wi-Fi — идеальная среда',
        text: 'В кафе, аэропорту или гостинице любой может поднять точку доступа с названием "Free_Airport_WiFi". Подключившись, пользователь направляет весь незашифрованный трафик прямо в руки атакующего. Именно поэтому ввод паролей и данных карт через открытый Wi-Fi категорически опасен.',
      },
      {
        heading: 'Как защититься',
        text: 'Используйте VPN в публичных сетях — он создаёт зашифрованный туннель, непрозрачный для посредника. Проверяйте HSTS и сертификат сайта. Включите оповещения о смене сертификата. Для корпоративных сред — взаимная аутентификация (mTLS) и мониторинг ARP-таблиц.',
      },
    ],
    tags: ['атаки', 'сеть', 'трафик'],
  },
  {
    id: 'zerotrust',
    category: 'Архитектура безопасности',
    title: 'Модель нулевого доверия (Zero Trust)',
    icon: 'ShieldOff',
    lead: 'Zero Trust — архитектурный принцип, при котором ни один пользователь или устройство не считается доверенным по умолчанию — даже внутри корпоративной сети.',
    body: [
      {
        heading: 'Конец периметровой безопасности',
        text: 'Традиционная модель строила высокий «забор» вокруг сети: всё внутри считалось безопасным, всё снаружи — опасным. Когда сотрудники перешли на удалёнку, а данные переехали в облако, периметр исчез. Zero Trust отвечает на это радикально: доверяй никому, проверяй всех и всегда.',
      },
      {
        heading: 'Ключевые принципы',
        text: 'Верификация каждого запроса независимо от источника. Минимальные привилегии — пользователь получает доступ только к тому, что необходимо для работы, и только на необходимое время. Микросегментация сети: даже при компрометации одного узла атакующий не может свободно перемещаться по инфраструктуре.',
      },
      {
        heading: 'Внедрение на практике',
        text: 'Начните с инвентаризации всех устройств и пользователей. Внедрите многофакторную аутентификацию и управление идентификацией (IAM). Разбейте сеть на сегменты с явными политиками доступа. Логируйте и анализируйте весь трафик — аномалии сигнализируют об инцидентах ещё до их развития.',
      },
    ],
    tags: ['архитектура', 'доступ', 'основы'],
  },
  {
    id: 'sqli',
    category: 'Веб-безопасность',
    title: 'SQL-инъекции',
    icon: 'Database',
    lead: 'SQL-инъекция — техника атаки, при которой злоумышленник вставляет вредоносный SQL-код в поля ввода, заставляя базу данных выполнять непредусмотренные команды.',
    body: [
      {
        heading: 'Как это работает',
        text: `Уязвимое приложение подставляет пользовательский ввод напрямую в SQL-запрос. Введя в поле логина строку вида: ' OR '1'='1, атакующий превращает запрос в конструкцию, которая всегда возвращает истину. Результат — обход аутентификации, доступ к базе или её полное уничтожение командой DROP TABLE.`,
      },
      {
        heading: 'Масштаб угрозы',
        text: 'SQL-инъекции входят в OWASP Top 10 уже более 15 лет — это один из самых старых и при этом самых актуальных векторов атаки. Среди жертв — крупнейшие компании и государственные ведомства. Через SQLi были похищены сотни миллионов записей пользователей.',
      },
      {
        heading: 'Защита',
        text: 'Единственная надёжная защита — параметризованные запросы и подготовленные выражения (prepared statements). Никогда не вставляйте пользовательский ввод напрямую в SQL. Дополнительно используйте ORM-фреймворки, Web Application Firewall и принцип минимальных привилегий для пользователя базы данных.',
      },
    ],
    tags: ['веб', 'атаки', 'owasp'],
  },
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

const ALL_TAGS = ['все', 'атаки', 'основы', 'шифрование', 'веб', 'сеть', 'архитектура', 'owasp', 'ransomware', 'криптография'];

const Index = () => {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('все');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = ARTICLES.filter((a) => {
    const matchTag = activeTag === 'все' || a.tags.includes(activeTag);
    const matchQuery =
      !query ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.lead.toLowerCase().includes(query.toLowerCase()) ||
      a.tags.some((t) => t.includes(query.toLowerCase()));
    return matchTag && matchQuery;
  });

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
            <a href="#articles" className="story-link">Статьи</a>
            <a href="#tools" className="story-link">Инструменты</a>
          </nav>
          <button className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent">
            <Icon name="BookOpen" size={15} />
            <span className="hidden sm:inline">База знаний</span>
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
              открытая энциклопедия цифровой защиты
            </div>
            <h1 className="animate-fade-up text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl" style={{ animationDelay: '0.05s' }}>
              Всё о<br />
              <span className="font-mono-x text-accent">кибербезопасности</span>
            </h1>
            <p className="animate-fade-up mx-auto mt-6 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: '0.1s' }}>
              Понятные статьи об угрозах, методах защиты и ключевых понятиях цифровой безопасности.
            </p>
            <div className="animate-fade-up mx-auto mt-9 max-w-xl" style={{ animationDelay: '0.15s' }}>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm transition-shadow focus-within:border-accent focus-within:shadow-md">
                <Icon name="Search" size={20} className="text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Найти статью, термин или тему…"
                  className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
                />
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

      {/* CIA Triad */}
      <section id="basics" className="border-b border-border bg-secondary/40">
        <div className="container py-16 md:py-20">
          <div className="mb-3">
            <span className="font-mono-x text-xs uppercase tracking-widest text-accent">Основы</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Триада CIA</h2>
          </div>
          <p className="mb-10 max-w-2xl text-muted-foreground">
            Три фундаментальных свойства информационной безопасности, на которых строятся все стандарты, инструменты и политики защиты.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {TRIAD.map((t) => (
              <div key={t.letter} className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 font-mono-x text-2xl font-bold text-accent">
                  {t.letter}
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="font-semibold">{t.ru}</h3>
                  <span className="font-mono-x text-xs text-muted-foreground">{t.word}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section id="articles" className="container py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <div>
            {/* Tags */}
            <div className="mb-8 flex flex-wrap items-center gap-2">
              <span className="mr-1 flex items-center gap-1.5 font-mono-x text-xs uppercase tracking-widest text-muted-foreground">
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

            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Статьи</h2>
              <span className="font-mono-x text-sm text-muted-foreground">{filtered.length} из {ARTICLES.length}</span>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
                <Icon name="FileSearch" size={32} className="mx-auto mb-3 opacity-40" />
                Ничего не найдено. Попробуйте другой запрос.
              </div>
            ) : (
              <div className="space-y-6">
                {filtered.map((a) => (
                  <article key={a.id} className="rounded-xl border border-border bg-card overflow-hidden">
                    {/* Card header */}
                    <button
                      onClick={() => setOpenId(openId === a.id ? null : a.id)}
                      className="w-full text-left p-6 transition-colors hover:bg-secondary/50"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-accent/10 text-accent">
                          <Icon name={a.icon} size={16} />
                        </div>
                        <span className="font-mono-x text-xs uppercase tracking-wider text-accent">{a.category}</span>
                      </div>
                      <h3 className="text-xl font-bold tracking-tight">{a.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">{a.lead}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {a.tags.map((t) => (
                            <span key={t} className="font-mono-x text-xs text-muted-foreground">#{t}</span>
                          ))}
                        </div>
                        <span className="flex items-center gap-1 font-mono-x text-xs text-muted-foreground">
                          {openId === a.id ? <>Свернуть <Icon name="ChevronUp" size={14} /></> : <>Читать <Icon name="ChevronDown" size={14} /></>}
                        </span>
                      </div>
                    </button>

                    {/* Full text */}
                    {openId === a.id && (
                      <div className="border-t border-border px-6 pb-8 pt-6">
                        <div className="prose-wiki space-y-6">
                          {a.body.map((section) => (
                            <div key={section.heading}>
                              <h4 className="mb-2 text-base font-semibold">{section.heading}</h4>
                              <p className="leading-[1.8] text-muted-foreground">{section.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div id="tools" className="rounded-xl border border-border bg-card p-6">
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

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <Icon name="Flame" size={18} className="text-accent" /> Популярное
              </h3>
              <div className="space-y-4">
                {ARTICLES.slice(0, 4).map((a, i) => (
                  <button
                    key={a.id}
                    onClick={() => { setOpenId(a.id); document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="group flex w-full gap-3 text-left"
                  >
                    <span className="font-mono-x text-xl font-bold text-border group-hover:text-accent transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm font-medium leading-snug group-hover:text-accent transition-colors">{a.title}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-accent/20 bg-accent/5 p-6">
              <Icon name="ShieldAlert" size={22} className="mb-3 text-accent" />
              <h3 className="font-semibold">Заметили инцидент?</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Немедленно смените пароли и включите двухфакторную аутентификацию на всех важных аккаунтах.
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
            <a href="#articles" className="story-link">Статьи</a>
            <a href="#tools" className="story-link">Инструменты</a>
          </div>
          <span className="font-mono-x text-xs">© 2026</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
