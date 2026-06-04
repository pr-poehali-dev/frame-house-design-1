import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { label: "Главная", href: "#home" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Услуги", href: "#services" },
  { label: "О компании", href: "#about" },
  { label: "Процесс", href: "#process" },
  { label: "Контакты", href: "#contacts" },
];

const PORTFOLIO = [
  {
    id: 1,
    title: "Nordic Barn",
    area: "140 м²",
    style: "Барнхаус",
    price: "от 8.5 млн ₽",
    tag: "Хит продаж",
    img: "https://cdn.poehali.dev/projects/a406fa72-21f4-4eeb-b26e-b59df728da11/bucket/ce379f4d-979e-43b8-bab6-1d1ad27543e3.png",
  },
  {
    id: 2,
    title: "BRICK",
    area: "210 м²",
    style: "Индустриальный Лофт",
    price: "от 13.5 млн ₽",
    tag: "Новинка",
    img: "https://cdn.poehali.dev/projects/a406fa72-21f4-4eeb-b26e-b59df728da11/bucket/e98632fd-06aa-429b-8496-b4eddbb37545.png",
  },
  {
    id: 3,
    title: "Стоун Хаус",
    area: "260 м²",
    style: "Современный Райт",
    price: "от 16 млн ₽",
    tag: "Премиум",
    img: "https://cdn.poehali.dev/projects/a406fa72-21f4-4eeb-b26e-b59df728da11/bucket/225a70db-5d32-4b0d-8a04-ed49f954fd72.png",
  },
  {
    id: 4,
    title: "DOMO",
    area: "110 м²",
    style: "Скандинавский минимализм",
    price: "от 6.2 млн ₽",
    tag: "Бюджетный",
    img: "https://cdn.poehali.dev/projects/a406fa72-21f4-4eeb-b26e-b59df728da11/bucket/8b7dfd1e-e6e5-4fca-b3ce-82d128a09046.png",
  },
  {
    id: 5,
    title: "Vertex",
    area: "450 м²",
    style: "Премиум Хай-тек",
    price: "от 28 млн ₽",
    tag: "VIP",
    img: "https://cdn.poehali.dev/projects/a406fa72-21f4-4eeb-b26e-b59df728da11/bucket/1192a2fe-84d0-4464-9da3-4942a287b15d.png",
  },
  {
    id: 6,
    title: "Дом «Берёза»",
    area: "145 м²",
    style: "Классика",
    price: "от 3.4 млн ₽",
    tag: "Популярный",
    img: "https://cdn.poehali.dev/projects/a406fa72-21f4-4eeb-b26e-b59df728da11/files/8db8d986-a1d6-46ed-bcf3-3d13bd57af24.jpg",
  },
];

const SERVICES = [
  { icon: "PenTool", title: "Авторское проектирование", desc: "Создаём уникальный архитектурный проект под ваш участок, бюджет и стиль жизни. 3D-визуализация в подарок." },
  { icon: "Hammer", title: "Строительство под ключ", desc: "Возводим дома любой сложности: от компактных барнхаусов до премиальных вилл. Гарантия 10 лет." },
  { icon: "Layers", title: "Любой архитектурный стиль", desc: "Барнхаус, хай-тек, скандинавский минимализм, эко, лофт — воплотим любую концепцию." },
  { icon: "Zap", title: "Энергоэффективность", desc: "Проектируем дома класса A+. Умные инженерные системы, тёплые полы, рекуперация воздуха." },
  { icon: "Shield", title: "Гарантия 10 лет", desc: "Официальная гарантия на конструктив, кровлю и фасад. Фиксированная цена в договоре." },
  { icon: "CreditCard", title: "Ипотека и рассрочка", desc: "Работаем с ведущими банками. Рассрочка 0% от застройщика на 2 года." },
];

const PROCESS = [
  { num: "01", title: "Консультация", desc: "Обсуждаем ваши пожелания, бюджет и сроки. Подбираем оптимальный проект." },
  { num: "02", title: "Проект и смета", desc: "Создаём дизайн-проект и детальную смету. Фиксируем цену в договоре." },
  { num: "03", title: "Строительство", desc: "Возводим дом под контролем прораба. Еженедельные отчёты с фото." },
  { num: "04", title: "Сдача", desc: "Принимаете дом по акту с проверкой каждого узла. Заселяйтесь!" },
];

const STATS = [
  { value: "500+", label: "Домов построено" },
  { value: "10", label: "Лет на рынке" },
  { value: "98%", label: "Довольных клиентов" },
  { value: "45 дней", label: "Средний срок стройки" },
];

const TICKER_ITEMS = ["УНИКАЛЬНЫЕ ДОМА", "АВТОРСКИЙ ДИЗАЙН", "ПОД КЛЮЧ", "ГАРАНТИЯ 10 ЛЕТ", "РАССРОЧКА 0%", "500+ ПРОЕКТОВ"];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ name: "", phone: "", comment: "" });
  const [formSent, setFormSent] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_ITEMS.map((n) => n.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-[var(--dark)] text-[var(--navy)] font-golos">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 backdrop-blur-xl bg-white/90">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/a406fa72-21f4-4eeb-b26e-b59df728da11/bucket/31399dd1-ae84-4a7b-ba7f-bdbc6488177a.png"
              alt="STATUS HOUSE"
              className="h-10 w-auto object-contain"
            />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-oswald text-lg font-bold tracking-widest text-[var(--navy)] uppercase">Status House</span>
              <span className="text-[10px] text-[var(--navy)]/50 tracking-wider">Просто. Быстро. Навсегда</span>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link text-sm font-medium uppercase tracking-wider transition-colors ${
                  activeSection === item.href.replace("#", "")
                    ? "text-neon active"
                    : "text-[var(--navy)]/60 hover:text-[var(--navy)]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <a href="#contacts" className="hidden md:inline-flex items-center gap-2 bg-neon text-white font-oswald font-semibold uppercase tracking-wider px-5 py-2.5 text-sm hover:bg-neon/90 transition-colors">
            Консультация
          </a>
          <button className="md:hidden text-[var(--navy)]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border/60 px-4 py-6 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-oswald text-lg uppercase tracking-wider text-[var(--navy)] hover:text-neon transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="#contacts" className="inline-flex items-center justify-center bg-neon text-white font-oswald font-semibold uppercase tracking-wider px-5 py-3 mt-2">
              Получить консультацию
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[var(--navy)]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/a406fa72-21f4-4eeb-b26e-b59df728da11/files/8db8d986-a1d6-46ed-bcf3-3d13bd57af24.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)] via-[var(--navy)]/90 to-[var(--navy)]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)] via-transparent to-transparent" />

        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />

        <div className="container mx-auto px-4 pt-20 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-neon/40 bg-neon/10 text-neon text-xs font-oswald uppercase tracking-widest px-4 py-2 mb-8 animate-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
              Строим дома вашей мечты
            </div>
            <h1
              className="font-oswald text-6xl md:text-8xl font-bold leading-none mb-6 animate-fade-up text-white"
              style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
            >
              ДОМ,<br />
              КОТОРЫЙ<br />
              <span className="text-neon neon-text-glow">ВДОХНОВЛЯЕТ</span>
            </h1>
            <p
              className="text-lg md:text-xl text-white/70 max-w-xl mb-10 leading-relaxed animate-fade-up"
              style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
            >
              Барнхаусы, виллы, лофты, эко-дома — любой стиль и масштаб. Авторский проект и строительство под ключ.
            </p>
            <div
              className="flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}
            >
              <a href="#portfolio" className="inline-flex items-center gap-2 bg-neon text-white font-oswald font-bold uppercase tracking-wider px-8 py-4 text-base hover:bg-neon/90 transition-all hover:scale-105">
                Смотреть проекты
                <Icon name="ArrowRight" size={18} />
              </a>
              <a href="#contacts" className="inline-flex items-center gap-2 border border-white/40 text-white font-oswald font-bold uppercase tracking-wider px-8 py-4 text-base hover:bg-white/10 transition-all">
                Консультация
              </a>
            </div>
          </div>
        </div>

        {/* Floating stats */}
        <div
          className="absolute bottom-12 right-8 hidden lg:flex gap-8 animate-fade-up"
          style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}
        >
          {STATS.slice(0, 2).map((s) => (
            <div key={s.label} className="text-right">
              <div className="font-oswald text-4xl font-bold text-neon neon-text-glow">{s.value}</div>
              <div className="text-xs text-white/60 uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-[var(--navy)] py-3 overflow-hidden border-y border-neon/20">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="font-oswald text-white font-bold uppercase tracking-widest text-sm px-8 flex items-center gap-4">
              {item}
              <span className="inline-block w-2 h-2 rounded-full bg-neon" />
            </span>
          ))}
        </div>
      </div>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-[var(--dark)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-neon font-oswald uppercase tracking-widest text-sm mb-3">— Наши проекты</p>
              <h2 className="font-oswald text-5xl md:text-6xl font-bold leading-tight text-[var(--navy)]">
                ГАЛЕРЕЯ<br /><span className="text-neon">ДОМОВ</span>
              </h2>
            </div>
            <p className="text-[var(--navy)]/60 max-w-xs leading-relaxed">
              Каждый проект — уникальное решение, созданное с учётом пожеланий владельца и особенностей участка.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden cursor-pointer card-hover bg-white border border-border/60 shadow-sm"
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)] via-[var(--navy)]/20 to-transparent" />
                </div>

                <div className="absolute top-4 left-4 bg-neon text-white font-oswald font-bold uppercase text-xs tracking-wider px-3 py-1">
                  {project.tag}
                </div>

                <div className={`absolute inset-0 bg-neon/5 border-2 border-neon transition-opacity duration-300 ${activeProject === project.id ? 'opacity-100' : 'opacity-0'}`} />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-oswald text-2xl font-bold mb-1 text-white">{project.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 text-sm text-white/70">
                      <span>{project.area}</span>
                      <span>·</span>
                      <span>{project.style}</span>
                    </div>
                    <span className="font-oswald text-neon font-semibold">{project.price}</span>
                  </div>
                </div>

                <div className={`absolute top-4 right-4 w-10 h-10 bg-neon flex items-center justify-center transition-transform duration-300 ${activeProject === project.id ? 'scale-100' : 'scale-0'}`}>
                  <Icon name="ArrowUpRight" size={20} className="text-white" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 border-2 border-[var(--navy)] text-[var(--navy)] font-oswald font-bold uppercase tracking-wider px-10 py-4 hover:bg-[var(--navy)] hover:text-white transition-all">
              Все проекты
              <Icon name="Grid" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <div className="bg-[var(--navy)] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-oswald text-5xl font-bold text-neon neon-text-glow mb-2">{s.value}</div>
                <div className="text-sm text-white/60 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-[var(--dark)]">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <p className="text-neon font-oswald uppercase tracking-widest text-sm mb-3">— Что мы делаем</p>
            <h2 className="font-oswald text-5xl md:text-6xl font-bold text-[var(--navy)]">
              НАШИ<br /><span className="text-neon">УСЛУГИ</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/60">
            {SERVICES.map((service, i) => (
              <div key={i} className="bg-white p-8 group hover:bg-[var(--dark2)] transition-colors relative overflow-hidden">
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-neon group-hover:w-full transition-all duration-500" />
                <div className="w-12 h-12 border border-[var(--navy)]/20 flex items-center justify-center mb-6 group-hover:border-neon group-hover:bg-neon/10 transition-all">
                  <Icon name={service.icon} size={22} className="text-[var(--navy)] group-hover:text-neon transition-colors" />
                </div>
                <h3 className="font-oswald text-xl font-bold mb-3 text-[var(--navy)] group-hover:text-neon transition-colors">{service.title}</h3>
                <p className="text-[var(--navy)]/60 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-[var(--navy)]">
        <div className="container mx-auto px-4">
          {/* Текст + фото */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <p className="text-neon font-oswald uppercase tracking-widest text-sm mb-3">— О компании</p>
              <h2 className="font-oswald text-5xl md:text-6xl font-bold mb-8 leading-tight text-white">
                МЫ СТРОИМ<br /><span className="text-neon">МЕЧТЫ</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Status House — архитектурная компания полного цикла. Мы проектируем и строим дома любых стилей: от уютных барнхаусов до премиальных вилл с бассейном. Более 500 реализованных проектов по всей России.
              </p>
              <p className="text-white/70 leading-relaxed mb-10">
                Наша команда — 80 профессионалов: архитекторы, дизайнеры, инженеры и строители. Каждый дом — это авторская история, отражающая характер и стиль жизни его владельца.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="border-l-2 border-neon pl-4">
                  <div className="font-oswald text-3xl font-bold text-neon">80+</div>
                  <div className="text-sm text-white/60 mt-1">Специалистов в команде</div>
                </div>
                <div className="border-l-2 border-neon pl-4">
                  <div className="font-oswald text-3xl font-bold text-neon">200+</div>
                  <div className="text-sm text-white/60 mt-1">Авторских проектов</div>
                </div>
                <div className="border-l-2 border-neon pl-4">
                  <div className="font-oswald text-3xl font-bold text-neon">15</div>
                  <div className="text-sm text-white/60 mt-1">Регионов присутствия</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden relative">
                <img
                  src="https://cdn.poehali.dev/projects/a406fa72-21f4-4eeb-b26e-b59df728da11/files/8db8d986-a1d6-46ed-bcf3-3d13bd57af24.jpg"
                  alt="О компании"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-2 border-neon/30" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-neon p-6 w-48">
                <div className="font-oswald text-3xl font-bold text-white">2014</div>
                <div className="text-white/80 text-sm font-medium mt-1">Год основания компании</div>
              </div>
            </div>
          </div>

          {/* Команда */}
          <div>
            <p className="text-neon font-oswald uppercase tracking-widest text-sm mb-3 text-center">— Наша команда</p>
            <h3 className="font-oswald text-3xl md:text-4xl font-bold text-white text-center mb-12">ЛЮДИ, КОТОРЫМ <span className="text-neon">ДОВЕРЯЮТ</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Александр Вершинин",
                  role: "Основатель компании",
                  desc: "Гарантирует надежность, честность и строгий контроль качества",
                  img: "https://cdn.poehali.dev/projects/a406fa72-21f4-4eeb-b26e-b59df728da11/bucket/95b07562-e20b-4840-920d-b405b112809e.png",
                  cropIndex: null,
                },
                {
                  name: "Елена Миронова",
                  role: "Руководитель клиентского сервиса",
                  desc: "Помогает легко пройти все этапы до переезда",
                  img: "https://cdn.poehali.dev/projects/a406fa72-21f4-4eeb-b26e-b59df728da11/bucket/0b795a63-a28e-4cf0-b6ef-a5d5651e064b.png",
                  cropIndex: null,
                },
                {
                  name: "Дмитрий Соколов",
                  role: "Главный архитектор-проектировщик",
                  desc: "Создает безупречные проекты для комфортной жизни",
                  img: "https://cdn.poehali.dev/projects/a406fa72-21f4-4eeb-b26e-b59df728da11/bucket/55992ccf-ca53-4d21-9862-69423c3fcce9.png",
                  cropIndex: null,
                },
              ].map((person, i) => (
                <div
                  key={i}
                  className="overflow-hidden border border-[var(--navy)]/20 shadow-lg"
                  style={{ background: 'linear-gradient(to bottom, #ffffff, #f0f2f5)' }}
                >
                  <div className="relative h-56 overflow-hidden">
                    {person.cropIndex === null ? (
                      <img
                        src={person.img}
                        alt={person.name}
                        className="w-full h-full object-contain object-center"
                      />
                    ) : (
                      <img
                        src={person.img}
                        alt={person.name}
                        className="absolute top-0 h-full w-auto max-w-none"
                        style={{
                          left: person.cropIndex === 1 ? '-105%' : '-205%',
                          width: '315%',
                          objectFit: 'cover',
                          objectPosition: 'top',
                        }}
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="font-oswald text-xl font-bold text-[var(--navy)] mb-1">{person.name}</div>
                    <div className="text-sm font-semibold text-neon mb-3 uppercase tracking-wide">{person.role}</div>
                    <div className="text-xs text-[var(--navy)]/60 leading-relaxed">{person.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-[var(--dark)]">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <p className="text-neon font-oswald uppercase tracking-widest text-sm mb-3">— Как мы работаем</p>
            <h2 className="font-oswald text-5xl md:text-6xl font-bold text-[var(--navy)]">
              ПРОЦЕСС<br /><span className="text-neon">РАБОТЫ</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {PROCESS.map((step, i) => (
              <div key={i} className="relative group">
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] right-0 h-px bg-[var(--navy)]/20 z-10" />
                )}
                <div className="p-8 border border-border/60 mr-0 lg:mr-px bg-white group-hover:bg-[var(--navy)] transition-colors h-full">
                  <div className="font-oswald text-6xl font-bold text-[var(--navy)]/15 group-hover:text-neon/60 transition-colors mb-4 leading-none">
                    {step.num}
                  </div>
                  <h3 className="font-oswald text-xl font-bold mb-3 text-[var(--navy)] group-hover:text-neon transition-colors">{step.title}</h3>
                  <p className="text-[var(--navy)]/60 group-hover:text-white/70 text-sm leading-relaxed transition-colors">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <div className="bg-neon py-16 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(var(--navy) 1px, transparent 1px), linear-gradient(90deg, var(--navy) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-oswald text-4xl md:text-6xl font-bold text-white mb-4">
            ВАША ИСТОРИЯ НАЧИНАЕТСЯ ЗДЕСЬ
          </h2>
          <p className="text-white/80 mb-8 text-lg max-w-xl mx-auto">
            Расскажите о своей мечте — мы подберём стиль, рассчитаем стоимость и предложим проект за 24 часа
          </p>
          <a href="#contacts" className="inline-flex items-center gap-3 bg-[var(--navy)] text-white font-oswald font-bold uppercase tracking-wider px-10 py-4 text-lg hover:bg-[var(--navy2)] transition-all hover:scale-105">
            Получить расчёт
            <Icon name="ArrowRight" size={20} />
          </a>
        </div>
      </div>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[var(--dark)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-neon font-oswald uppercase tracking-widest text-sm mb-3">— Связаться с нами</p>
              <h2 className="font-oswald text-5xl md:text-6xl font-bold mb-8 leading-tight text-[var(--navy)]">
                БЕСПЛАТНАЯ<br /><span className="text-neon">КОНСУЛЬТАЦИЯ</span>
              </h2>
              <p className="text-[var(--navy)]/60 leading-relaxed mb-10">
                Оставьте заявку и наш эксперт свяжется с вами в течение 30 минут. Расскажем о проектах, подберём оптимальный вариант и сделаем расчёт стоимости.
              </p>

              <div className="flex flex-col gap-5">
                <a href="tel:+74951234567" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 border border-[var(--navy)]/20 flex items-center justify-center group-hover:bg-neon/10 group-hover:border-neon transition-all">
                    <Icon name="Phone" size={20} className="text-neon" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--navy)]/50 uppercase tracking-wider mb-0.5">Телефон</div>
                    <div className="font-oswald text-lg font-semibold text-[var(--navy)] group-hover:text-neon transition-colors">+7 (495) 123-45-67</div>
                  </div>
                </a>
                <a href="mailto:info@karkas.ru" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 border border-[var(--navy)]/20 flex items-center justify-center group-hover:bg-neon/10 group-hover:border-neon transition-all">
                    <Icon name="Mail" size={20} className="text-neon" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--navy)]/50 uppercase tracking-wider mb-0.5">Email</div>
                    <div className="font-oswald text-lg font-semibold text-[var(--navy)] group-hover:text-neon transition-colors">info@karkas.ru</div>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-[var(--navy)]/20 flex items-center justify-center">
                    <Icon name="MapPin" size={20} className="text-neon" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--navy)]/50 uppercase tracking-wider mb-0.5">Офис</div>
                    <div className="font-oswald text-lg font-semibold text-[var(--navy)]">Москва, ул. Строителей, 42</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {formSent ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] border border-neon/40 bg-neon/5 p-12 text-center">
                  <div className="w-16 h-16 bg-neon flex items-center justify-center mb-6">
                    <Icon name="Check" size={32} className="text-white" />
                  </div>
                  <h3 className="font-oswald text-3xl font-bold mb-3 text-[var(--navy)]">Заявка отправлена!</h3>
                  <p className="text-[var(--navy)]/60">Мы свяжемся с вами в течение 30 минут в рабочее время.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-border/60 shadow-sm p-8 flex flex-col gap-5">
                  <h3 className="font-oswald text-2xl font-bold mb-2 text-[var(--navy)]">Оставить заявку</h3>
                  <div>
                    <label className="text-xs text-[var(--navy)]/50 uppercase tracking-wider mb-2 block">Ваше имя</label>
                    <input
                      type="text"
                      required
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[var(--dark2)] border border-border/60 text-[var(--navy)] px-4 py-3 focus:outline-none focus:border-neon transition-colors placeholder:text-[var(--navy)]/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--navy)]/50 uppercase tracking-wider mb-2 block">Телефон</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[var(--dark2)] border border-border/60 text-[var(--navy)] px-4 py-3 focus:outline-none focus:border-neon transition-colors placeholder:text-[var(--navy)]/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--navy)]/50 uppercase tracking-wider mb-2 block">Комментарий</label>
                    <textarea
                      rows={3}
                      placeholder="Расскажите о вашем проекте..."
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="w-full bg-[var(--dark2)] border border-border/60 text-[var(--navy)] px-4 py-3 focus:outline-none focus:border-neon transition-colors placeholder:text-[var(--navy)]/30 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-neon text-white font-oswald font-bold uppercase tracking-wider py-4 text-base hover:bg-neon/90 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                  >
                    Получить консультацию
                    <Icon name="ArrowRight" size={18} />
                  </button>
                  <p className="text-xs text-[var(--navy)]/40 text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-8 bg-[var(--navy)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.poehali.dev/projects/a406fa72-21f4-4eeb-b26e-b59df728da11/bucket/31399dd1-ae84-4a7b-ba7f-bdbc6488177a.png"
                alt="STATUS HOUSE"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
              <span className="font-oswald text-lg font-bold tracking-widest text-white uppercase">Status House</span>
            </div>
            <div className="text-sm text-white/50 text-center">
              © 2024 КАРКАС. Все права защищены.
            </div>
            <div className="flex gap-4">
              {["Instagram", "Youtube", "MessageCircle"].map((icon) => (
                <button key={icon} className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-neon hover:text-neon transition-all">
                  <Icon name={icon} size={16} className="text-white/50" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}