'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  Apple,
  Bell,
  Check,
  ChevronRight,
  Code2,
  Dumbbell,
  Home,
  MessageCircle,
  MoreVertical,
  Pencil,
  Plus,
  Settings,
  Sparkles,
  Target,
  Trash2,
  Trophy,
  User,
  Zap,
} from 'lucide-react';
import { AppShell, StatusBar } from '@/components/ui/AppShell';
import { BuddyMascot } from '@/components/ui/BuddyMascot';
import { Button } from '@/components/ui/Button';
import { SelectChip } from '@/components/ui/Chip';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { cn } from '@/lib/utils';
import type { OnboardingForm } from '@/types/buddy';

const creationSteps = ['Welcome', 'Category', 'Context', 'AI Match', 'Summary', 'Chat', 'Dashboard'];

const categories = [
  {
    id: 'fitness',
    name: 'FitBuddy',
    label: 'Entrenamiento y bienestar',
    description: 'Rutinas, hábitos y seguimiento adaptado a ti.',
    icon: Dumbbell,
    color: '#6C4DFF',
    bg: '#EEE9FF',
  },
  {
    id: 'cooking',
    name: 'CookBuddy',
    label: 'Cocina y nutrición',
    description: 'Recetas, menús y compras según tus gustos.',
    icon: Apple,
    color: '#16845B',
    bg: '#ECFDF3',
  },
  {
    id: 'coding',
    name: 'CodeBuddy',
    label: 'Programación y tecnología',
    description: 'Aprende, resuelve errores y crea proyectos.',
    icon: Code2,
    color: '#2563EB',
    bg: '#EFF6FF',
  },
];

const mockMemory = [
  { id: 1, type: 'Objetivo', content: 'Quiere perder peso sin abandonar a mitad de camino.' },
  { id: 2, type: 'Nivel', content: 'Está en nivel principiante y prefiere explicaciones simples.' },
  { id: 3, type: 'Preferencia', content: 'Prefiere entrenamientos en casa de 20 a 30 minutos.' },
  { id: 4, type: 'Restricción', content: 'Quiere evitar impacto excesivo y cuidar las rodillas.' },
];

const chipOptions = {
  goals: ['Perder peso', 'Ganar músculo', 'Mejorar movilidad', 'Tener más energía'],
  level: ['Principiante', 'Intermedio', 'Avanzado'],
  time: ['1-2 días/semana', '3-4 días/semana', '5+ días/semana'],
  equipment: ['En casa', 'Gimnasio', 'Básico', 'Ninguno'],
  personality: ['Motivador', 'Paciente', 'Directo', 'Simple'],
};

const pageMotion = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

function ProgressDots({ active }: { active: number }) {
  return (
    <div className="flex items-center justify-center gap-2 py-3">
      {creationSteps.map((_, index) => (
        <div key={index} className={cn('h-1.5 rounded-full transition-all', index === active ? 'w-10 bg-buddy-purple' : 'w-5 bg-[#DDE3F4]')} />
      ))}
    </div>
  );
}

function Welcome({ next }: { next: () => void }) {
  return (
    <AppShell showBack={false}>
      <div className="flex h-full flex-col justify-between py-8">
        <div className="text-center">
          <div className="mb-5 flex justify-center"><BuddyMascot size="md" /></div>
          <div className="font-display text-3xl font-extrabold tracking-tight">Be<span className="text-buddy-purple">MyBuddy</span></div>
          <h1 className="mt-10 font-display text-4xl font-extrabold leading-tight tracking-tight">Crea tu buddy de IA personal.</h1>
          <p className="mx-auto mt-5 max-w-xs text-base leading-7 text-buddy-muted">Responde preguntas simples y recibe un compañero experto hecho para ti.</p>
        </div>
        <div className="relative flex justify-center py-8">
          <Sparkles className="absolute left-8 top-6 h-5 w-5 text-buddy-orange" />
          <Sparkles className="absolute right-10 top-12 h-4 w-4 text-buddy-mint" />
          <BuddyMascot size="xl" />
        </div>
        <div className="space-y-3">
          <Button onClick={next}>Crear mi primer buddy</Button>
          <Button variant="secondary" onClick={next}>Ver cómo funciona</Button>
          <p className="pt-2 text-center text-xs text-buddy-muted">Sin prompts. Sin configuración técnica. Solo tú y tu buddy.</p>
        </div>
      </div>
    </AppShell>
  );
}

function ChooseCategory({ next, back, selectedCategory, setSelectedCategory }: { next: () => void; back: () => void; selectedCategory: string; setSelectedCategory: (v: string) => void }) {
  return (
    <AppShell step={2} onBack={back}>
      <ProgressDots active={1} />
      <div className="pt-4 text-center">
        <h2 className="font-display text-2xl font-extrabold leading-tight">¿Qué tipo de buddy quieres crear?</h2>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-buddy-muted">Elige una categoría para empezar. Puedes crear más buddies después.</p>
      </div>
      <div className="mt-7 space-y-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const selected = selectedCategory === category.id;
          return (
            <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={cn('flex w-full items-center gap-4 rounded-[24px] border bg-white p-4 text-left shadow-sm transition active:scale-[0.99]', selected ? 'border-buddy-purple bg-buddy-lavender' : 'border-buddy-border')}>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ background: category.bg, color: category.color }}><Icon className="h-7 w-7" /></div>
              <div className="min-w-0 flex-1">
                <div className="font-extrabold text-buddy-text">{category.name}</div>
                <div className="text-xs font-extrabold text-buddy-purple">{category.label}</div>
                <div className="mt-1 text-xs leading-5 text-buddy-muted">{category.description}</div>
              </div>
              {selected ? <div className="flex h-7 w-7 items-center justify-center rounded-full bg-buddy-purple text-white"><Check className="h-4 w-4" /></div> : <ChevronRight className="h-5 w-5 text-buddy-tertiary" />}
            </button>
          );
        })}
      </div>
      <div className="mt-7"><Button onClick={next}>Continuar</Button></div>
    </AppShell>
  );
}

function PersonalContext({ next, back, form, setForm }: { next: () => void; back: () => void; form: OnboardingForm; setForm: React.Dispatch<React.SetStateAction<OnboardingForm>> }) {
  const update = <K extends keyof OnboardingForm>(key: K, value: OnboardingForm[K]) => setForm((prev) => ({ ...prev, [key]: value }));
  return (
    <AppShell step={3} onBack={back}>
      <ProgressDots active={2} />
      <div className="pt-2 text-center">
        <h2 className="font-display text-2xl font-extrabold leading-tight">Cuéntale a tu buddy lo importante</h2>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-buddy-muted">Usaremos esto para adaptar tu FitBuddy a tu cuerpo, tiempo y forma de entrenar.</p>
      </div>
      <div className="mt-6 space-y-5">
        <FormSection title="Tu objetivo principal"><div className="grid grid-cols-2 gap-2">{chipOptions.goals.map((goal) => <SelectChip key={goal} label={goal} selected={form.goal === goal} onClick={() => update('goal', goal)} />)}</div></FormSection>
        <FormSection title="Tu nivel actual"><div className="grid grid-cols-3 gap-2">{chipOptions.level.map((level) => <SelectChip key={level} label={level} selected={form.level === level} onClick={() => update('level', level)} />)}</div></FormSection>
        <FormSection title="Disponibilidad"><div className="grid grid-cols-3 gap-2">{chipOptions.time.map((time) => <SelectChip key={time} label={time} selected={form.time === time} onClick={() => update('time', time)} />)}</div></FormSection>
        <FormSection title="Dónde entrenas"><div className="grid grid-cols-4 gap-2">{chipOptions.equipment.map((equipment) => <SelectChip key={equipment} label={equipment} selected={form.equipment === equipment} onClick={() => update('equipment', equipment)} />)}</div></FormSection>
        <FormSection title="Personalidad de tu buddy"><div className="grid grid-cols-2 gap-2">{chipOptions.personality.map((item) => <SelectChip key={item} label={item} selected={form.personality.includes(item)} onClick={() => update('personality', form.personality.includes(item) ? form.personality.filter((x) => x !== item) : [...form.personality, item])} />)}</div></FormSection>
        <FormSection title="Molestias o cosas a cuidar"><input value={form.condition} onChange={(e) => update('condition', e.target.value)} placeholder="Ej: rodilla, hombro, espalda baja..." className="h-14 w-full rounded-2xl border border-buddy-border bg-white px-4 text-sm outline-none transition focus:border-buddy-purple focus:ring-4 focus:ring-buddy-purple/10" /></FormSection>
      </div>
      <div className="sticky bottom-0 mt-7 bg-gradient-to-t from-[#F2F5FF] via-[#F2F5FF] to-transparent pt-4"><Button onClick={next}>Crear mi FitBuddy</Button></div>
    </AppShell>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><div className="mb-2 text-xs font-extrabold uppercase tracking-wide text-buddy-muted">{title}</div>{children}</div>;
}

function AIMatch({ next, back }: { next: () => void; back: () => void }) {
  const items = ['Entendiendo tu objetivo', 'Ajustando personalidad', 'Definiendo límites', 'Seleccionando la mejor configuración de IA', 'Creando tu primer plan'];
  return (
    <AppShell step={4} onBack={back} dark>
      <div className="relative -mx-5 -mt-12 flex min-h-[calc(852px-48px)] flex-col justify-between overflow-hidden px-5 pb-6 pt-20 text-white">
        <div className="text-center"><h2 className="font-display text-2xl font-extrabold leading-tight">Estamos creando tu buddy ideal ✨</h2><p className="mt-3 text-sm leading-6 text-white/70">BeMyBuddy está configurando todo para ayudarte desde el primer mensaje.</p></div>
        <div className="relative flex justify-center py-10"><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 7, ease: 'linear' }} className="absolute h-64 w-64 rounded-full border border-buddy-purple/30 bg-[radial-gradient(circle,rgba(108,77,255,0.32)_0%,rgba(91,182,255,0.08)_55%,transparent_70%)]" /><motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2.6 }} className="relative z-10"><BuddyMascot size="xl" mood="thinking" /></motion.div></div>
        <div className="rounded-[28px] border border-white/15 bg-white/10 p-5 backdrop-blur"><div className="space-y-4">{items.map((item, index) => <div key={item} className="flex items-center gap-3 text-sm font-extrabold"><div className={cn('flex h-7 w-7 items-center justify-center rounded-full', index < 4 ? 'bg-[#22C55E]' : 'border border-white/40')}>{index < 4 ? <Check className="h-4 w-4" /> : <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="h-3 w-3 rounded-full border-2 border-white/30 border-t-white" />}</div>{item}</div>)}</div></div>
        <Button onClick={next} className="bg-white text-buddy-purpleDark shadow-none">Ver mi buddy</Button>
      </div>
    </AppShell>
  );
}

function BuddySummary({ next, back, form }: { next: () => void; back: () => void; form: OnboardingForm }) {
  return (
    <AppShell step={5} onBack={back}>
      <div className="pt-4 text-center"><div className="mb-4 flex justify-center"><BuddyMascot size="lg" /></div><h2 className="font-display text-3xl font-extrabold leading-tight">Tu FitBuddy está listo 🎉</h2><p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-buddy-muted">Lo creamos según tus objetivos, nivel, disponibilidad y cosas que quieres cuidar.</p></div>
      <div className="mt-7 rounded-[28px] border border-buddy-border bg-white p-5 shadow-buddyMedium"><div className="flex flex-col items-center border-b border-buddy-border pb-5 text-center"><BuddyMascot size="lg" /><div className="mt-4 flex items-center gap-2 font-display text-3xl font-extrabold">FitBuddy <Pencil className="h-4 w-4 text-buddy-tertiary" /></div><p className="mt-1 text-sm text-buddy-muted">Tu entrenador personal de IA</p><div className="mt-4 flex flex-wrap justify-center gap-2">{form.personality.map((tag) => <span key={tag} className="rounded-full bg-buddy-lavender px-3 py-1 text-xs font-extrabold text-buddy-purpleDark">{tag}</span>)}</div></div><div className="space-y-3 pt-5 text-sm"><SummaryRow icon={Target} label="Objetivo" value={form.goal} /><SummaryRow icon={User} label="Nivel" value={form.level} /><SummaryRow icon={Zap} label="Tiempo" value={form.time} /><SummaryRow icon={Dumbbell} label="Lugar" value={form.equipment} /><SummaryRow icon={Activity} label="Enfoque" value="Bajo impacto + hábitos" /></div></div>
      <div className="mt-6 space-y-3"><Button onClick={next}>Empezar ahora</Button><Button variant="ghost">Ajustar mi buddy</Button></div>
    </AppShell>
  );
}

function SummaryRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-buddy-surfaceAlt text-buddy-purple"><Icon className="h-4 w-4" /></div><span className="font-extrabold text-buddy-muted">{label}</span><span className="ml-auto max-w-[150px] truncate font-extrabold text-buddy-text">{value}</span></div>;
}

function FirstChat({ next, back, form }: { next: () => void; back: () => void; form: OnboardingForm }) {
  const [sent, setSent] = useState(false);
  return (
    <ChatLayout back={back} goDashboard={next}>
      <div className="space-y-4"><ChatBubble>Hola, soy tu <b>FitBuddy 💪</b><br />Ya sé que quieres <b>{form.goal.toLowerCase()}</b>, entrenar <b>{form.equipment.toLowerCase()}</b> y avanzar con un estilo {form.personality.join(', ').toLowerCase()}.</ChatBubble><ChatBubble>Antes de armar tu primera semana, dime cómo está tu energía hoy.</ChatBubble><div className="grid grid-cols-3 gap-3">{['Baja', 'Normal', 'Alta'].map((label) => <button key={label} onClick={() => setSent(true)} className="rounded-2xl border border-buddy-border bg-white px-3 py-3 text-xs font-extrabold shadow-sm">{label}</button>)}</div><AnimatePresence>{sent && <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4"><UserBubble>Normal 🙂</UserBubble><ChatBubble>Perfecto. Te armé un plan inicial realista para esta semana.<div className="mt-3 rounded-2xl border border-buddy-border bg-white p-3"><div className="font-extrabold">Plan inicial — Semana 1</div><ul className="mt-2 space-y-1 text-xs text-buddy-muted"><li>☑ 3 entrenamientos en casa</li><li>☑ 20–30 min por sesión</li><li>☑ Bajo impacto</li><li>☑ Hábito diario simple</li></ul><button onClick={next} className="mt-3 h-10 w-full rounded-xl bg-buddy-lavender text-sm font-extrabold text-buddy-purpleDark">Ver dashboard</button></div></ChatBubble></motion.div>}</AnimatePresence></div>
    </ChatLayout>
  );
}

function ChatLayout({ children, back, goDashboard }: { children: React.ReactNode; back: () => void; goDashboard: () => void }) {
  return <div className="min-h-[852px] bg-white text-buddy-text"><StatusBar /><div className="flex h-16 items-center justify-between border-b border-buddy-border px-5"><button onClick={back} className="flex h-10 w-10 items-center justify-center rounded-full bg-buddy-surfaceAlt">←</button><div className="flex items-center gap-3"><BuddyMascot size="sm" /><div><div className="font-extrabold">FitBuddy</div><div className="text-xs font-extrabold text-[#22C55E]">En línea</div></div></div><button onClick={goDashboard}><MoreVertical className="h-5 w-5 text-buddy-muted" /></button></div><div className="h-[660px] overflow-auto bg-gradient-to-b from-white to-buddy-surfaceAlt p-5">{children}</div><div className="flex items-center gap-3 border-t border-buddy-border bg-white p-4"><button className="flex h-11 w-11 items-center justify-center rounded-full bg-buddy-surfaceAlt"><Plus className="h-5 w-5" /></button><input className="h-11 flex-1 rounded-full bg-buddy-surfaceAlt px-4 text-sm outline-none" placeholder="Escribe tu mensaje..." /><button className="flex h-11 w-11 items-center justify-center rounded-full bg-buddy-purple text-white"><MessageCircle className="h-5 w-5" /></button></div></div>;
}

function ChatBubble({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-3"><BuddyMascot size="sm" /><div className="max-w-[82%] rounded-3xl rounded-tl-lg border border-buddy-border bg-white p-4 text-sm leading-6 shadow-sm">{children}</div></div>;
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return <div className="ml-auto max-w-[82%] rounded-3xl rounded-tr-lg bg-buddy-purple p-4 text-sm font-extrabold text-white">{children}</div>;
}

const dashboardBottomNav = [
  ['home', 'Inicio', Home],
  ['chat', 'Chat', MessageCircle],
  ['memory', 'Memoria', Sparkles],
  ['settings', 'Ajustes', Settings],
] as const;

function Dashboard({ goChat }: { goChat: () => void }) {
  const [tab, setTab] = useState('home');
  return <div className="min-h-[852px] bg-buddy-bg text-buddy-text"><StatusBar /><div className="flex h-[804px] flex-col px-5 pb-4 pt-4"><div className="flex items-center justify-between"><div><h2 className="font-display text-2xl font-extrabold">FitBuddy</h2><p className="text-sm text-buddy-muted">Plan activo · Semana 1</p></div><div className="flex items-center gap-3"><button className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-buddy-border"><Bell className="h-5 w-5" /></button><BuddyMascot size="sm" /></div></div><div className="mt-5 flex rounded-2xl bg-[#EEF2FB] p-1 text-xs font-extrabold text-buddy-muted">{[['home','Inicio'],['plan','Plan'],['memory','Memoria'],['settings','Ajustes']].map(([id,label]) => <button key={id} onClick={() => setTab(id)} className={cn('flex-1 rounded-xl py-2', tab === id ? 'bg-white text-buddy-purple shadow-sm' : '')}>{label}</button>)}</div><div className="mt-5 flex-1 overflow-auto">{tab === 'home' && <DashboardHome />}{tab === 'plan' && <PlanTab />}{tab === 'memory' && <MemoryTab />}{tab === 'settings' && <SettingsTab />}</div><div className="mt-4 grid grid-cols-4 rounded-[28px] border border-buddy-border bg-white p-2 shadow-buddyFloating">{dashboardBottomNav.map(([id, label, Icon]) => <button key={id} onClick={id === 'chat' ? goChat : () => setTab(id)} className={cn('flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-extrabold', tab === id ? 'bg-buddy-purple text-white' : 'text-buddy-muted')}><Icon className="h-5 w-5" />{label}</button>)}</div></div></div>;
}

function DashboardHome() { return <div className="space-y-5"><ProgressHero /><MiniMetrics /><NextAction /><InsightCard /></div>; }
function ProgressHero() { return <div className="rounded-[28px] border border-buddy-border bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><div><div className="text-sm font-bold text-buddy-muted">Tu progreso</div><div className="mt-2 text-4xl font-extrabold">70%</div><div className="text-xs text-buddy-muted">¡Vas muy bien!</div></div><Trophy className="h-20 w-20 text-buddy-orange" /></div><div className="mt-4 h-3 rounded-full bg-buddy-lavender"><div className="h-3 w-[70%] rounded-full bg-gradient-to-r from-buddy-purple to-buddy-blue" /></div></div>; }
function MiniMetrics() { return <div className="grid grid-cols-3 gap-3"><MiniMetric label="Entrenos" value="2 / 3" /><MiniMetric label="Minutos" value="95" /><MiniMetric label="Racha" value="4 días" /></div>; }
function MiniMetric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-buddy-border bg-white p-3 shadow-sm"><div className="text-xs font-bold text-buddy-muted">{label}</div><div className="mt-1 text-lg font-extrabold">{value}</div></div>; }
function NextAction() { return <Section title="Próxima acción"><div className="flex items-center gap-3 rounded-3xl border border-buddy-border bg-white p-4 shadow-sm"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-buddy-lavender text-buddy-purple"><Activity className="h-6 w-6" /></div><div className="min-w-0 flex-1"><div className="font-extrabold">Entrenamiento de hoy</div><div className="text-xs leading-5 text-buddy-muted">Fuerza en casa · 20 min</div></div><button className="rounded-2xl bg-buddy-purple px-4 py-2 text-xs font-extrabold text-white">Comenzar</button></div></Section>; }
function InsightCard() { return <div className="rounded-3xl border border-buddy-lavender bg-[#F7F4FF] p-4 text-sm leading-6 text-buddy-purpleDark"><div className="mb-1 flex items-center gap-2 font-extrabold"><Sparkles className="h-4 w-4" /> Insight de tu buddy</div>Vas mejor cuando tus sesiones son cortas. Esta semana mantendremos entrenamientos de 20–30 minutos.</div>; }
function PlanTab() { const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']; return <div className="space-y-5"><Section title="Plan semanal"><div className="flex gap-2 overflow-auto pb-1">{days.map((day, index) => <button key={day} className={cn('h-11 min-w-11 rounded-2xl text-sm font-extrabold', index === 1 ? 'bg-buddy-purple text-white' : 'bg-white text-buddy-muted ring-1 ring-buddy-border')}>{day}</button>)}</div></Section><div className="rounded-[28px] border border-buddy-border bg-white p-5 shadow-sm"><div className="text-xs font-extrabold text-buddy-purple">MARTES · SESIÓN 2</div><h3 className="mt-2 font-display text-xl font-extrabold">Fuerza suave en casa</h3><p className="mt-2 text-sm leading-6 text-buddy-muted">Bajo impacto · 25 min · Principiante</p><div className="mt-4 space-y-3 text-sm font-bold text-buddy-text"><PlanItem text="Calentamiento y movilidad — 5 min" /><PlanItem text="Circuito de fuerza básico — 15 min" /><PlanItem text="Core + respiración — 5 min" /></div><Button className="mt-5 h-12">Ver sesión completa</Button></div></div>; }
function PlanItem({ text }: { text: string }) { return <div className="flex items-center gap-3"><div className="flex h-7 w-7 items-center justify-center rounded-full bg-buddy-lavender text-buddy-purple"><Check className="h-4 w-4" /></div>{text}</div>; }
function MemoryTab() { return <div className="space-y-3"><p className="text-sm leading-6 text-buddy-muted">Esto es lo que tu buddy recuerda para ayudarte mejor. Puedes editarlo cuando quieras.</p>{mockMemory.map((item) => <div key={item.id} className="rounded-3xl border border-buddy-border bg-white p-4 shadow-sm"><div className="mb-1 text-xs font-extrabold text-buddy-purple">{item.type}</div><div className="text-sm font-semibold leading-6 text-buddy-text">{item.content}</div><div className="mt-3 flex gap-2"><button className="rounded-xl bg-buddy-surfaceAlt px-3 py-2 text-xs font-extrabold text-buddy-muted"><Pencil className="mr-1 inline h-3 w-3" /> Editar</button><button className="rounded-xl bg-[#FEF2F2] px-3 py-2 text-xs font-extrabold text-[#EF4444]"><Trash2 className="mr-1 inline h-3 w-3" /> Eliminar</button></div></div>)}<Button variant="secondary" className="h-12">Agregar algo importante</Button></div>; }
function SettingsTab() { return <div className="space-y-3"><SettingsRow icon={Target} title="Objetivo" value="Perder peso" /><SettingsRow icon={MessageCircle} title="Estilo de respuesta" value="Simple y motivador" /><SettingsRow icon={Bell} title="Recordatorios" value="3 veces por semana" /><SettingsRow icon={Activity} title="Restricciones" value="Bajo impacto" /><SettingsRow icon={Sparkles} title="Personalidad" value="Motivador, paciente" /></div>; }
function SettingsRow({ icon: Icon, title, value }: { icon: React.ElementType; title: string; value: string }) { return <button className="flex w-full items-center gap-3 rounded-3xl border border-buddy-border bg-white p-4 text-left shadow-sm"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-buddy-surfaceAlt text-buddy-purple"><Icon className="h-5 w-5" /></div><div className="min-w-0 flex-1"><div className="font-extrabold">{title}</div><div className="truncate text-xs text-buddy-muted">{value}</div></div><ChevronRight className="h-5 w-5 text-buddy-tertiary" /></button>; }
function Section({ title, children }: { title: string; children: React.ReactNode }) { return <div><div className="mb-2 font-extrabold">{title}</div>{children}</div>; }

export function BeMyBuddyPrototype() {
  const [screen, setScreen] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('fitness');
  const [form, setForm] = useState<OnboardingForm>({ goal: 'Perder peso', level: 'Principiante', time: '3-4 días/semana', equipment: 'En casa', condition: '', personality: ['Motivador', 'Simple'] });
  const next = () => setScreen((value) => Math.min(value + 1, 6));
  const back = () => setScreen((value) => Math.max(value - 1, 0));
  const current = useMemo(() => {
    const props = { next, back, selectedCategory, setSelectedCategory, form, setForm };
    return [<Welcome key="welcome" {...props} />, <ChooseCategory key="category" {...props} />, <PersonalContext key="context" {...props} />, <AIMatch key="match" {...props} />, <BuddySummary key="summary" {...props} />, <FirstChat key="chat" {...props} />, <Dashboard key="dashboard" goChat={() => setScreen(5)} />][screen];
  }, [screen, selectedCategory, form]);
  return <div className="min-h-screen bg-[#0E1226] font-sans"><div className="mx-auto max-w-6xl px-4 py-6 text-white md:py-10"><div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-3"><BuddyMascot size="sm" /><div><div className="font-display text-2xl font-extrabold">Be<span className="text-[#8A74FF]">MyBuddy</span></div><div className="text-sm text-white/60">Next.js Starter · Frontend Prototype · Datos mock</div></div></div><div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">{creationSteps[screen]} · Pantalla {screen + 1} de 7</div></div><PhoneFrame><AnimatePresence mode="wait"><motion.div key={screen} variants={pageMotion} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.22 }}>{current}</motion.div></AnimatePresence></PhoneFrame><div className="mx-auto mt-6 flex max-w-[430px] items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-3 text-xs text-white/70"><button onClick={back} className="rounded-2xl bg-white/10 px-4 py-2 font-bold disabled:opacity-30" disabled={screen === 0}>Atrás</button><div className="flex gap-1.5">{creationSteps.map((_, index) => <button key={index} onClick={() => setScreen(index)} className={cn('h-2.5 w-2.5 rounded-full', index === screen ? 'bg-[#8A74FF]' : 'bg-white/20')} />)}</div><button onClick={next} className="rounded-2xl bg-white/10 px-4 py-2 font-bold disabled:opacity-30" disabled={screen === 6}>Siguiente</button></div></div></div>;
}
