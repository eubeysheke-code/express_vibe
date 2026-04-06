import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Zap, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  ArrowRight,
  ArrowLeft,
  Car,
  Search,
  Wallet,
  Check,
  ChevronUp,
  Shield,
  Heart,
  User,
  Pencil
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, createContext, useContext } from 'react';

const EditModeContext = createContext({ isEditMode: false, toggleEditMode: () => {} });
export const useEditMode = () => useContext(EditModeContext);

export const EditableText = ({ id, defaultText, as: Component = 'span', className = '' }: any) => {
  const { isEditMode } = useEditMode();
  const [text, setText] = useState(() => {
    const saved = localStorage.getItem(`content_${id}`);
    return saved !== null ? saved : defaultText;
  });

  const handleBlur = (e: any) => {
    const newText = e.target.innerText;
    setText(newText);
    localStorage.setItem(`content_${id}`, newText);
  };

  return (
    <Component 
      className={`${className} ${isEditMode ? 'outline-dashed outline-2 outline-primary/50 hover:outline-primary cursor-text transition-all' : ''}`}
      contentEditable={isEditMode}
      suppressContentEditableWarning
      onBlur={handleBlur}
      onClick={(e: any) => {
        if (isEditMode) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      {text}
    </Component>
  );
};

const EditModeToggle = () => {
  const { isEditMode, toggleEditMode } = useEditMode();

  const handleExport = () => {
    const data: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('content_')) {
        data[key] = localStorage.getItem(key) || '';
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'landing-texts.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-24 right-8 flex flex-col gap-3 z-50">
      {isEditMode && (
        <button 
          onClick={handleExport}
          className="bg-white text-slate-900 border border-slate-200 px-5 py-3 rounded-full shadow-lg font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
        >
          Скачать тексты
        </button>
      )}
      <button 
        onClick={toggleEditMode}
        className="bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
      >
        {isEditMode ? <CheckCircle2 className="w-5 h-5 text-emerald-400"/> : <Pencil className="w-5 h-5"/>}
        {isEditMode ? "Готово" : "Редактировать текст"}
      </button>
    </div>
  );
};

const FORM_URL = "https://b24-222bml.bitrix24.site/crm_form_wedha/";

const Logo = () => (
  <div className="flex items-center gap-2">
    <EditableText id="logo-text" as="span" className="text-2xl font-black tracking-tighter text-[#111827]" defaultText="автомаркет" />
  </div>
);

const Nav = ({ onBookingClick }: { onBookingClick: () => void }) => {
  const { isEditMode } = useEditMode();
  return (
  <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden lg:flex items-center gap-6">
            <a href="#" onClick={e => isEditMode && e.preventDefault()} className="text-sm font-bold text-[#111827] hover:text-primary transition-colors">
              <EditableText id="nav-link-1" defaultText="Найти авто" />
            </a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-1 text-sm font-bold text-slate-500 cursor-pointer">
            RU <ChevronUp className="w-4 h-4 rotate-180" />
          </div>
          <button 
            onClick={(e) => { if(isEditMode) { e.preventDefault(); return; } onBookingClick(); }}
            className="bg-primary text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-primary-hover transition-colors"
          >
            <EditableText id="nav-btn" defaultText="Получить отчет" />
          </button>
        </div>
      </div>
    </div>
  </nav>
)};

const Hero = ({ onBookingClick, onReportClick }: { onBookingClick: () => void, onReportClick: () => void }) => {
  const { isEditMode } = useEditMode();
  return (
  <section className="pt-24 pb-12 px-4">
    <div className="max-w-7xl mx-auto bg-[#F3F4F6] rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
      <div className="relative z-10 max-w-xl">
        <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          <EditableText id="hero-badge" defaultText="Фильтр грубой очистки перед покупкой" />
        </div>
        <EditableText id="hero-title" as="h1" className="text-3xl md:text-5xl font-black text-[#111827] leading-tight mb-4" defaultText="Не покупай «кота в мешке»" />
        <EditableText id="hero-subtitle" as="p" className="text-lg text-slate-600 mb-10" defaultText="Быстро и недорого отсеиваем «убитые» машины, чтобы вы не тратили время и деньги на детальную проверку в СТО." />
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={(e) => { if(isEditMode) { e.preventDefault(); return; } onBookingClick(); }}
            className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
          >
            <EditableText id="hero-btn-1" defaultText="Записаться на экспресс-осмотр" />
          </button>
          <button 
            onClick={(e) => { if(isEditMode) { e.preventDefault(); return; } onReportClick(); }}
            className="bg-white text-[#111827] px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors border border-slate-200"
          >
            <EditableText id="hero-btn-2" defaultText="Пример отчета" />
          </button>
        </div>
      </div>
      <div className="relative md:absolute md:right-12 md:bottom-0 md:top-0 flex items-center justify-center pointer-events-none opacity-20 md:opacity-100">
        <div className="relative w-64 h-64 md:w-96 md:h-96">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-32 h-32 md:w-48 md:h-48 text-primary/20" />
          </div>
          <div className="absolute top-1/4 right-0 bg-white p-4 rounded-2xl shadow-xl rotate-12 border border-slate-100">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <div className="absolute bottom-1/4 left-0 bg-white p-4 rounded-2xl shadow-xl -rotate-12 border border-slate-100">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  </section>
)};

const JTBDSection = () => (
  <section className="py-24 px-4 max-w-7xl mx-auto">
    <div className="grid md:grid-cols-2 gap-8">
      <div className="alfa-card bg-white border-slate-100 shadow-sm p-10 flex flex-col justify-between">
        <div>
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-8">
            <Search className="w-6 h-6" />
          </div>
          <EditableText id="jtbd-1-title" as="h3" className="text-2xl font-black mb-6 text-[#111827]" defaultText="Для покупателя" />
          <EditableText id="jtbd-1-desc" as="p" className="text-lg text-slate-600 leading-relaxed mb-8" defaultText="«Когда я выбираю подержанный автомобиль, я хочу быстро и недорого отсеять заведомо плохие варианты ('убитые' машины), чтобы не тратить большие деньги и время на их детальную проверку в СТО и получить уверенность, что я не покупаю 'кота в мешке'»." />
        </div>
        <div className="flex items-center gap-2 text-primary font-bold">
          <EditableText id="jtbd-1-badge" defaultText="Основная задача" /> <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>
      <div className="alfa-card bg-white border-slate-100 shadow-sm p-10 flex flex-col justify-between">
        <div>
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-8">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <EditableText id="jtbd-2-title" as="h3" className="text-2xl font-black mb-6 text-[#111827]" defaultText="Для продавца" />
          <EditableText id="jtbd-2-desc" as="p" className="text-lg text-slate-600 leading-relaxed mb-8" defaultText="«Когда я продаю автомобиль, я хочу получить независимый и понятный электронный отчет о его состоянии, чтобы сразу прикрепить его к объявлению и быстрее продать машину, вызвав доверие покупателя»." />
        </div>
        <div className="flex items-center gap-2 text-primary font-bold">
          <EditableText id="jtbd-2-badge" defaultText="Дополнительная задача" /> <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>
    </div>
  </section>
);
const Features = () => {
  const features = [
    {
      id: "feat-1",
      icon: <Wallet className="w-6 h-6" />,
      title: "Цена ужина",
      desc: "Всего 1000 сом за проверку. Психологически комфортная сумма для отсева плохих вариантов."
    },
    {
      id: "feat-2",
      icon: <Clock className="w-6 h-6" />,
      title: "Экспресс-формат",
      desc: "Вся процедура (кузов, сканер, юр. чистота) занимает всего 30 минут вашего времени."
    },
    {
      id: "feat-3",
      icon: <MapPin className="w-6 h-6" />,
      title: "Шаговая доступность",
      desc: "Мы там, где мы нужны: у авторынков, ГРС, на крупных АЗС и парковках ТЦ."
    },
    {
      id: "feat-4",
      icon: <Zap className="w-6 h-6" />,
      title: "Вердикт «Светофор»",
      desc: "Понятный отчет прямо в WhatsApp. Не нужно быть механиком, чтобы понять результат."
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <EditableText id="feat-main-title" as="h2" className="section-title" defaultText="Ценности Автомаркета" />
          <EditableText id="feat-main-desc" as="p" className="section-subtitle mx-auto" defaultText="Мы создали сервис, который делает покупку авто безопасной, быстрой и доступной каждому." />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="alfa-card"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                {f.icon}
              </div>
              <EditableText id={`${f.id}-title`} as="h3" className="text-xl font-bold mb-3 block" defaultText={f.title} />
              <EditableText id={`${f.id}-desc`} as="p" className="text-slate-600 leading-relaxed block" defaultText={f.desc} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TrafficLight = () => (
  <section id="report" className="py-24 bg-slate-900 text-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
            <EditableText id="tl-title-1" defaultText="Отчет «Светофор» —" /> <br />
            <span className="text-primary"><EditableText id="tl-title-2" defaultText="все понятно без слов" /></span>
          </h2>
          <EditableText id="tl-desc" as="p" className="text-xl text-slate-400 mb-12 block" defaultText="Вам не нужно быть автомехаником. Мы даем четкий сигнал по каждой машине." />
          <div className="space-y-6">
            {[
              { id: "tl-item-1", color: "bg-emerald-500", title: "Зеленый — Можно брать", desc: "Машина в отличном состоянии, серьезных вложений не требует." },
              { id: "tl-item-2", color: "bg-amber-500", title: "Желтый — Нужно в СТО", desc: "Есть нюансы. Получите скидку у наших партнеров на детальную диагностику и ремонт." },
              { id: "tl-item-3", color: "bg-red-500", title: "Красный — Не берите", desc: "Обнаружены критические дефекты или юридические проблемы." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className={`w-4 h-4 rounded-full mt-1.5 shrink-0 ${item.color} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}></div>
                <div>
                  <EditableText id={`${item.id}-title`} as="h4" className="text-xl font-bold mb-2 block" defaultText={item.title} />
                  <EditableText id={`${item.id}-desc`} as="p" className="text-slate-400 block" defaultText={item.desc} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="relative bg-white rounded-[2rem] p-8 text-slate-900 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <ShieldCheck className="text-white w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Отчет №8421</div>
                  <div className="text-sm font-bold">BMW X5, 2018</div>
                </div>
              </div>
              <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase">Проверено</div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Кузов", status: "Зеленый", val: "Заводской окрас" },
                { label: "Двигатель", status: "Желтый", val: "Течь масла" },
                { label: "Электроника", status: "Зеленый", val: "Ошибок нет" },
                { label: "Юр. чистота", status: "Зеленый", val: "Чисто" }
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <span className="font-medium text-slate-600">{row.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400">{row.val}</span>
                    <div className={`w-3 h-3 rounded-full ${row.status === 'Зеленый' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-emerald-500 rounded-2xl text-white text-center">
              <div className="text-xs font-medium opacity-80 mb-1">Общий вердикт</div>
              <div className="text-2xl font-bold">РЕКОМЕНДОВАНО</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Comparison = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <EditableText id="comp-title" as="h2" className="section-title" defaultText="Почему не СТО или автоподбор?" />
        <EditableText id="comp-subtitle" as="p" className="section-subtitle mx-auto" defaultText="Мы — это «фильтр грубой очистки», который экономит ваши деньги и время на начальном этапе." />
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="alfa-card border-red-100">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 mb-6">
            <XCircle className="w-6 h-6" />
          </div>
          <EditableText id="comp-1-title" as="h3" className="text-xl font-bold mb-4 block" defaultText="Классическое СТО" />
          <ul className="space-y-3 text-slate-600">
            <li className="flex gap-2"><span>—</span> <EditableText id="comp-1-li-1" defaultText="Дорого (от 3000 сом за авто)" /></li>
            <li className="flex gap-2"><span>—</span> <EditableText id="comp-1-li-2" defaultText="Медленно (нужна запись заранее)" /></li>
            <li className="flex gap-2"><span>—</span> <EditableText id="comp-1-li-3" defaultText="Сложные технические заключения" /></li>
            <li className="flex gap-2"><span>—</span> <EditableText id="comp-1-li-4" defaultText="Неудобно везти каждую машину" /></li>
          </ul>
        </div>
        <div className="alfa-card border-red-100">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 mb-6">
            <XCircle className="w-6 h-6" />
          </div>
          <EditableText id="comp-2-title" as="h3" className="text-xl font-bold mb-4 block" defaultText="Автоподборщик" />
          <ul className="space-y-3 text-slate-600">
            <li className="flex gap-2"><span>—</span> <EditableText id="comp-2-li-1" defaultText="Высокая стоимость услуг" /></li>
            <li className="flex gap-2"><span>—</span> <EditableText id="comp-2-li-2" defaultText="Долгое ожидание эксперта" /></li>
            <li className="flex gap-2"><span>—</span> <EditableText id="comp-2-li-3" defaultText="Риск сговора с продавцом" /></li>
            <li className="flex gap-2"><span>—</span> <EditableText id="comp-2-li-4" defaultText="Человеческий фактор" /></li>
          </ul>
        </div>
        <div className="alfa-card border-emerald-100 bg-emerald-50/30">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <EditableText id="comp-3-title" as="h3" className="text-xl font-bold mb-4 block" defaultText="Автомаркет" />
          <ul className="space-y-3 text-slate-600">
            <li className="flex gap-2 text-emerald-700 font-medium"><Check className="w-5 h-5" /> <EditableText id="comp-3-li-1" defaultText="Цена ужина (1000 сом)" /></li>
            <li className="flex gap-2 text-emerald-700 font-medium"><Check className="w-5 h-5" /> <EditableText id="comp-3-li-2" defaultText="Экспресс-осмотр (30 мин)" /></li>
            <li className="flex gap-2 text-emerald-700 font-medium"><Check className="w-5 h-5" /> <EditableText id="comp-3-li-3" defaultText="Простой ответ «Да/Нет»" /></li>
            <li className="flex gap-2 text-emerald-700 font-medium"><Check className="w-5 h-5" /> <EditableText id="comp-3-li-4" defaultText="Локации в шаговой доступности" /></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const SellerSection = ({ onBookingClick }: { onBookingClick: () => void }) => {
  const { isEditMode } = useEditMode();
  return (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="alfa-card !p-0 overflow-hidden grid lg:grid-cols-2">
        <div className="p-12 md:p-16">
          <EditableText id="seller-title" as="h2" className="text-4xl font-extrabold mb-6 block" defaultText="Продаете автомобиль?" />
          <EditableText id="seller-desc" as="p" className="text-lg text-slate-600 mb-8 leading-relaxed block" defaultText="Получите независимый и понятный электронный отчет о состоянии вашего авто. Прикрепите его к объявлению, чтобы вызвать доверие и продать машину быстрее." />
          <ul className="space-y-4 mb-10">
            {[
              { id: "seller-li-1", text: "Независимый электронный отчет" },
              { id: "seller-li-2", text: "Мгновенное доверие покупателей" },
              { id: "seller-li-3", text: "Обоснованная цена продажи" },
              { id: "seller-li-4", text: "Быстрая сделка без лишних СТО" }
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle2 className="text-primary w-5 h-5" />
                <EditableText id={item.id} defaultText={item.text} />
              </li>
            ))}
          </ul>
          <button onClick={(e) => { if(isEditMode) { e.preventDefault(); return; } onBookingClick(); }} className="alfa-button">
            <EditableText id="seller-btn" defaultText="Получить отчет продавца" />
          </button>
        </div>
        <div className="relative h-64 lg:h-auto bg-primary/5 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 to-transparent"></div>
          <Car className="w-48 h-48 text-primary/10 rotate-12" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <ShieldCheck className="w-32 h-32 text-primary/20" />
          </div>
        </div>
      </div>
    </div>
  </section>
)};

const Pricing = ({ onBookingClick }: { onBookingClick: () => void }) => {
  const { isEditMode } = useEditMode();
  return (
  <section id="pricing" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <EditableText id="price-main-title" as="h2" className="section-title" defaultText="Стоимость спокойствия" />
        <EditableText id="price-main-desc" as="p" className="section-subtitle mx-auto" defaultText="Прозрачная стратегия демпинга: проверка по цене ужина." />
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="alfa-card flex flex-col">
          <div className="mb-8">
            <EditableText id="price-1-title" as="h3" className="text-2xl font-bold mb-2 block" defaultText="Разовая проверка" />
            <EditableText id="price-1-price" as="div" className="text-4xl font-extrabold text-primary" defaultText="1 000 сом" />
            <EditableText id="price-1-sub" as="div" className="text-sm text-slate-500 mt-1" defaultText="«Цена ужина»" />
          </div>
          <ul className="space-y-4 mb-10 flex-1">
            <li className="flex items-center gap-3 text-slate-600"><Check className="w-5 h-5 text-primary" /> <EditableText id="price-1-li-1" defaultText="Экспресс-диагностика (30 мин)" /></li>
            <li className="flex items-center gap-3 text-slate-600"><Check className="w-5 h-5 text-primary" /> <EditableText id="price-1-li-2" defaultText="Отчет «Светофор» в WhatsApp" /></li>
            <li className="flex items-center gap-3 text-slate-600"><Check className="w-5 h-5 text-primary" /> <EditableText id="price-1-li-3" defaultText="Проверка кузова и сканером" /></li>
            <li className="flex items-center gap-3 text-slate-600"><Check className="w-5 h-5 text-primary" /> <EditableText id="price-1-li-4" defaultText="Юридическая чистота" /></li>
          </ul>
          <button onClick={(e) => { if(isEditMode) { e.preventDefault(); return; } onBookingClick(); }} className="alfa-button-outline w-full">
            <EditableText id="price-1-btn" defaultText="Записаться" />
          </button>
        </div>
        <div className="alfa-card border-primary bg-primary/5 flex flex-col relative">
          <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
            <EditableText id="price-2-badge" defaultText="Выгодно" />
          </div>
          <div className="mb-8">
            <EditableText id="price-2-title" as="h3" className="text-2xl font-bold mb-2 block" defaultText="Пакет «Выбор»" />
            <EditableText id="price-2-price" as="div" className="text-4xl font-extrabold text-primary" defaultText="2 500 сом" />
            <EditableText id="price-2-sub" as="div" className="text-sm text-slate-500 mt-1" defaultText="за 3 проверки (833 сом/авто)" />
          </div>
          <ul className="space-y-4 mb-10 flex-1">
            <li className="flex items-center gap-3 text-slate-600"><Check className="w-5 h-5 text-primary" /> <EditableText id="price-2-li-1" defaultText="3 полных экспресс-диагностики" /></li>
            <li className="flex items-center gap-3 text-slate-600"><Check className="w-5 h-5 text-primary" /> <EditableText id="price-2-li-2" defaultText="Идеально для выбора из 3-5 авто" /></li>
            <li className="flex items-center gap-3 text-slate-600"><Check className="w-5 h-5 text-primary" /> <EditableText id="price-2-li-3" defaultText="Экономия 500 сом" /></li>
            <li className="flex items-center gap-3 text-slate-600"><Check className="w-5 h-5 text-primary" /> <EditableText id="price-2-li-4" defaultText="Скидка на партнерском СТО" /></li>
          </ul>
          <button onClick={(e) => { if(isEditMode) { e.preventDefault(); return; } onBookingClick(); }} className="alfa-button w-full">
            <EditableText id="price-2-btn" defaultText="Выбрать пакет" />
          </button>
        </div>
      </div>
    </div>
  </section>
)};

const Footer = () => {
  const { isEditMode } = useEditMode();
  return (
  <footer className="bg-slate-900 text-white py-20">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <EditableText id="footer-logo" as="span" className="text-xl font-bold tracking-tight" defaultText="Автомаркет" />
          </div>
          <EditableText id="footer-desc" as="p" className="text-slate-400 max-w-sm leading-relaxed block" defaultText="Первый в Кыргызстане сервис экспресс-проверки автомобилей. Мы делаем рынок подержанных авто прозрачным и безопасным." />
        </div>
        <div>
          <EditableText id="footer-links-title" as="h4" className="font-bold mb-6 block" defaultText="Навигация" />
          <ul className="space-y-4 text-slate-400">
            <li><a href="#" onClick={e => isEditMode && e.preventDefault()} className="hover:text-white transition-colors"><EditableText id="footer-link-1" defaultText="Главная" /></a></li>
            <li><a href="#features" onClick={e => isEditMode && e.preventDefault()} className="hover:text-white transition-colors"><EditableText id="footer-link-2" defaultText="Преимущества" /></a></li>
            <li><a href="#pricing" onClick={e => isEditMode && e.preventDefault()} className="hover:text-white transition-colors"><EditableText id="footer-link-3" defaultText="Цены" /></a></li>
          </ul>
        </div>
        <div>
          <EditableText id="footer-contacts-title" as="h4" className="font-bold mb-6 block" defaultText="Контакты" />
          <ul className="space-y-4 text-slate-400">
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> <EditableText id="footer-contact-1" defaultText="Бишкек, Кыргызстан" /></li>
            <li className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> <EditableText id="footer-contact-2" defaultText="WhatsApp: +996 (XXX) XX-XX-XX" /></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
        <EditableText id="footer-copy" defaultText={`© ${new Date().getFullYear()} Автомаркет. Все права защищены.`} />
      </div>
    </div>
  </footer>
)};

const ExampleReportModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl relative flex flex-col my-8"
          >
            <div className="sticky top-0 p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 rounded-t-[2rem]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <ShieldCheck className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold">Пример отчета Автомаркет</span>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 md:p-12 overflow-y-auto max-h-[70vh]">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                <div>
                  <div className="text-slate-400 text-sm mb-2">Отчет от 26.02.2026</div>
                  <h2 className="text-4xl font-black text-slate-900 mb-4">KIA K5</h2>
                  <div className="space-y-1">
                    <div className="text-slate-600 font-medium">Гос. номер: <span className="text-slate-900">01KG930BI</span></div>
                    <div className="text-slate-600 font-medium">VIN: <span className="text-slate-900">KNAG741BBMA106530</span></div>
                  </div>
                </div>
                <div className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-2xl border border-emerald-100 font-bold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  ПРОВЕРЕНО
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div>
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs">1</span>
                    Общая информация
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "Год выпуска", val: "2020" },
                      { label: "Марка", val: "KIA" },
                      { label: "Модель", val: "K5" },
                      { label: "Цвет", val: "темно-синий" },
                      { label: "Объем двигателя", val: "1999" },
                      { label: "Тонировка", val: "Разрешение отсутствует" },
                      { label: "Штрафы", val: "5 (3 900 сом)" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between border-b border-slate-50 pb-2">
                        <span className="text-slate-500">{item.label}</span>
                        <span className="font-bold">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs">2</span>
                    Рыночная оценка
                  </h3>
                  <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Цена Lalafo</span>
                      <span className="font-bold text-primary">14 150 USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Макс. цена (Mashina.kg)</span>
                      <span className="font-bold">25 000 USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Мин. цена (Mashina.kg)</span>
                      <span className="font-bold">10 500 USD</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs">3</span>
                  Юридический статус
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-3 text-amber-700">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Имеются неоплаченные штрафы</span>
                  </div>
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-700">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">Нет сведений о розыске или угоне</span>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs">7</span>
                  История в Корее
                </h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="alfa-card !p-4">
                    <div className="text-xs text-slate-400 mb-1">Пробег</div>
                    <div className="text-lg font-bold">155 683 км</div>
                  </div>
                  <div className="alfa-card !p-4">
                    <div className="text-xs text-slate-400 mb-1">Тип двигателя</div>
                    <div className="text-lg font-bold">LPG</div>
                  </div>
                  <div className="alfa-card !p-4">
                    <div className="text-xs text-slate-400 mb-1">Аварии</div>
                    <div className="text-lg font-bold text-emerald-600">Отсутствуют</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs">8</span>
                  Фотографии
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-[4/3] bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                      <Car className="w-12 h-12 text-slate-200" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-slate-50 rounded-b-[2rem] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-slate-500 text-sm text-center sm:text-left">
                Хотите такой же отчет для своего автомобиля?
              </div>
              <button 
                onClick={() => { onClose(); window.scrollTo({ top: document.getElementById('pricing')?.offsetTop || 0, behavior: 'smooth' }); }}
                className="alfa-button"
              >
                Заказать проверку
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isBooking, setIsBooking] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode: () => setIsEditMode(!isEditMode) }}>
      <div className="min-h-screen">
      <Nav onBookingClick={() => setIsBooking(true)} />
      
      <main>
        <Hero onBookingClick={() => setIsBooking(true)} onReportClick={() => setIsReportOpen(true)} />
        <JTBDSection />
        <Features />
        <TrafficLight />
        <Comparison />
        <SellerSection onBookingClick={() => setIsBooking(true)} />
        <Pricing onBookingClick={() => setIsBooking(true)} />
      </main>

      <Footer />

      <ExampleReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />

      {/* Booking Modal */}
      <AnimatePresence>
        {isBooking && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl relative flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
                <button 
                  onClick={() => setIsBooking(false)}
                  className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Назад
                </button>
                <div className="text-lg font-bold">Запись на диагностику</div>
                <div className="w-10"></div>
              </div>
              <div className="flex-1 bg-slate-50">
                <iframe 
                  src={FORM_URL} 
                  className="w-full h-full border-none"
                  title="Booking Form"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <EditModeToggle />

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-slate-400 hover:text-primary transition-all z-40"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
    </EditModeContext.Provider>
  );
}
