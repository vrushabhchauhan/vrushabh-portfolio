import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  CircleDot,
  Copy,
  Download,
  ExternalLink,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Radio,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type CaseStudy = {
  id: string;
  phase: string;
  title: string;
  body: string;
  stat: string;
  statLabel: string;
  statTwo: string;
  statTwoLabel: string;
  statThree: string;
  statThreeLabel: string;
  position: string;
};

const caseStudies: CaseStudy[] = [
  {
    id: 'signal',
    phase: '01 / SIGNAL',
    title: 'Find the signal before it becomes noise.',
    body: 'A data platform for teams who needed a shared view of what was happening next. I translated fragmented customer needs into a product signal that engineering, design, and GTM could all use.',
    stat: '14',
    statLabel: 'customer inputs',
    statTwo: '03',
    statTwoLabel: 'market patterns',
    statThree: '01',
    statThreeLabel: 'clear bet',
    position: 'Discovery / framing',
  },
  {
    id: 'system',
    phase: '02 / SYSTEM',
    title: 'Turn a clever model into a dependable system.',
    body: 'The hard part was not the model. It was the operating system around it: confidence signals, human review, responsible defaults, and a path from prototype to repeatable value.',
    stat: '06',
    statLabel: 'workstreams aligned',
    statTwo: '2.4×',
    statTwoLabel: 'faster validation',
    statThree: '92%',
    statThreeLabel: 'team adoption',
    position: 'Architecture / orchestration',
  },
  {
    id: 'shift',
    phase: '03 / SHIFT',
    title: 'Move the organisation without losing the plot.',
    body: 'A launch is a change-management problem disguised as a roadmap. I built the narrative, decision cadence, and feedback loops that let a cross-functional team move with conviction.',
    stat: '08',
    statLabel: 'markets prepared',
    statTwo: '11 wks',
    statTwoLabel: 'from brief to pilot',
    statThree: '04',
    statThreeLabel: 'teams in lockstep',
    position: 'Enablement / launch',
  },
  {
    id: 'impact',
    phase: '04 / IMPACT',
    title: 'Make the result legible, then make it last.',
    body: 'The finish line is a useful habit, not a launch day. I defined the measures that connected product behaviour to business outcomes and made the next decision easier.',
    stat: '+31%',
    statLabel: 'active usage',
    statTwo: '18 pts',
    statTwoLabel: 'confidence lift',
    statThree: 'Q+2',
    statThreeLabel: 'next bet funded',
    position: 'Outcomes / iteration',
  },
];

const experiments = [
  { name: 'AI product patterns', copy: 'Cataloguing the moments when AI should explain, ask, or stay quiet.', status: 'in progress' },
  { name: 'Decision memos', copy: 'Shorter documents for harder decisions. A weekly practice in precision.', status: 'active' },
  { name: 'Data trust loops', copy: 'How feedback becomes product quality when the system learns in public.', status: 'field notes' },
];

const principles = [
  ['01', 'Clarity is a feature.', 'If a team cannot explain the decision, the product is not ready for the next lap.'],
  ['02', 'Systems beat heroics.', 'Build the hand-offs, rituals, and defaults that keep quality high on an ordinary Tuesday.'],
  ['03', 'Move at the speed of learning.', 'Momentum is not rushing. It is reducing the cost of a useful next step.'],
  ['04', 'Earn the second look.', 'The best work makes people pause, understand the trade-off, and choose with confidence.'],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function StartSequence({ onComplete }: { onComplete: () => void }) {
  const [activeLights, setActiveLights] = useState(0);
  const [green, setGreen] = useState(false);

  useEffect(() => {
    const lightTimer = window.setInterval(() => {
      setActiveLights((current) => {
        if (current >= 5) {
          window.clearInterval(lightTimer);
          return current;
        }
        return current + 1;
      });
    }, 300);
    const greenTimer = window.setTimeout(() => setGreen(true), 1900);
    const finishTimer = window.setTimeout(onComplete, 2650);
    return () => {
      window.clearInterval(lightTimer);
      window.clearTimeout(greenTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loader ${green ? 'is-gone' : ''}`} aria-label="Loading Vrushabh Chauhan portfolio">
      <div className="loader-grid">
        <div className="loader-bottom">
          <span className="eyebrow">VC / portfolio system</span>
          <span className="mono">{green ? 'GO' : 'PIT LANE'}</span>
        </div>
        <div className="lights" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className={`light ${green ? 'is-green' : index < activeLights ? 'is-on' : ''}`} key={index} />
          ))}
        </div>
        <div className="loader-bottom">
          <span className="loader-label">{green ? 'The work is already moving.' : 'Preparing the grid.'}</span>
          <span className="mono">DATA / AI</span>
        </div>
      </div>
    </div>
  );
}

function Topbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const links = useMemo(() => [
    ['01', 'History', 'history'],
    ['02', 'Case work', 'case-work'],
    ['03', 'Principles', 'principles'],
    ['04', 'Contact', 'contact'],
  ], []);

  const go = (id: string) => {
    scrollToId(id);
    setMenuOpen(false);
  };

  return (
    <header className="topbar">
      <button className="mark" onClick={() => go('home')} data-testid="button-home">
        <span className="mark-block">VC</span>
        <span className="mark-copy">VRUSHABH<br />CHAUHAN</span>
      </button>
      <nav className={`topnav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
        {links.map(([index, label, id]) => (
          <button key={id} onClick={() => go(id)} data-testid={`link-${id}`}>
            <span style={{ color: 'hsl(var(--primary))' }}>{index}</span>&nbsp; {label}
          </button>
        ))}
      </nav>
      <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu">
        {menuOpen ? <X size={19} /> : <Menu size={19} />}
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-kicker eyebrow reveal">Product portfolio manager / Cisco</div>
        <h1 className="display reveal reveal-delay-1">I build the <em>systems</em> behind meaningful momentum.</h1>
        <div className="hero-intro reveal reveal-delay-2">
          <p>Vrushabh Chauhan works at the intersection of data, AI, and product craft — turning ambiguous signals into products teams can trust and customers can feel.</p>
          <div className="hero-actions">
            <button className="button-primary" onClick={() => scrollToId('case-work')} data-testid="button-explore-work">Explore the work <ArrowDownRight size={14} /></button>
            <button className="button-quiet" onClick={() => window.print()} data-testid="button-print-resume">Print résumé <Download size={13} /></button>
          </div>
        </div>
      </div>
      <div className="hero-meta reveal reveal-delay-3">
        <div className="meta-line"><span>Current</span><strong>San Jose, CA</strong></div>
        <div className="meta-line"><span>Focus</span><strong>Data + AI</strong></div>
        <div className="meta-line"><span>Mode</span><strong>Building</strong></div>
      </div>
      <div className="scroll-cue"><span /> Scroll to enter the history</div>
    </section>
  );
}

function History() {
  return (
    <section className="section-pad" id="history">
      <div className="section-head reveal">
        <div><div className="eyebrow">02 / Race history</div><h2 className="section-title">A career in<br />useful laps.</h2></div>
        <p className="section-note">Different tracks. Same question: what needs to become clearer for the team to move?</p>
      </div>
      <div className="timeline">
        <article className="timeline-row timeline-current reveal">
          <div className="timeline-year">2022 — now</div><span className="timeline-dot" />
          <div><h3 className="timeline-role">Product Portfolio Manager</h3><p className="timeline-org">Cisco / Data &amp; AI</p><p className="timeline-copy">Shaping portfolio direction across data and AI products, connecting customer value to the operating decisions that make complex work shippable.</p><div className="timeline-tags"><span className="tag">Portfolio strategy</span><span className="tag">AI adoption</span><span className="tag">Executive narrative</span></div></div>
        </article>
        <article className="timeline-row reveal reveal-delay-1">
          <div className="timeline-year">2019 — 2022</div><span className="timeline-dot" />
          <div><h3 className="timeline-role">Senior Product Manager</h3><p className="timeline-org">Enterprise software / Platform</p><p className="timeline-copy">Led platform bets from early customer discovery through multi-team delivery. Made the invisible work visible: dependencies, trade-offs, and the smallest credible next step.</p><div className="timeline-tags"><span className="tag">0→1 products</span><span className="tag">Platform UX</span><span className="tag">Go-to-market</span></div></div>
        </article>
        <article className="timeline-row reveal reveal-delay-2">
          <div className="timeline-year">2016 — 2019</div><span className="timeline-dot" />
          <div><h3 className="timeline-role">Product Analyst → PM</h3><p className="timeline-org">B2B technology / Intelligence</p><p className="timeline-copy">Started close to the data and moved toward the decisions around it. Learned that a good insight is only valuable when it changes what happens next.</p><div className="timeline-tags"><span className="tag">Customer insight</span><span className="tag">Analytics</span><span className="tag">Product operations</span></div></div>
        </article>
      </div>
    </section>
  );
}

function CaseWork() {
  const [selected, setSelected] = useState('system');
  const active = caseStudies.find((item) => item.id === selected) ?? caseStudies[1];
  return (
    <section className="section-pad case-wrap" id="case-work">
      <div className="section-head reveal"><div><div className="eyebrow">03 / Selected case work</div><h2 className="section-title">From first<br />signal to impact.</h2></div><p className="section-note">A repeatable way of thinking about products where uncertainty is part of the brief.</p></div>
      <div className="case-list">
        <div className="case-nav reveal">
          {caseStudies.map((item) => (
            <button className={selected === item.id ? 'is-active' : ''} onClick={() => setSelected(item.id)} key={item.id} data-testid={`button-case-${item.id}`}>
              <span className="case-nav-title">{item.phase.split(' / ')[1]}</span><span className="case-nav-index">{item.phase.split(' / ')[0]} <ChevronRight size={13} /></span>
            </button>
          ))}
        </div>
        <article className="case-panel reveal reveal-delay-1" data-testid="card-active-case">
          <div className="case-panel-top"><span className="case-signal"><CircleDot size={13} /> {active.position}</span><span className="mono" style={{ color: '#65706d', fontSize: '.58rem' }}>CASE / 0{caseStudies.indexOf(active) + 1}</span></div>
          <h3>{active.title}</h3><p>{active.body}</p>
          <div className="case-stats"><div className="case-stat"><strong>{active.stat}</strong><span>{active.statLabel}</span></div><div className="case-stat"><strong>{active.statTwo}</strong><span>{active.statTwoLabel}</span></div><div className="case-stat"><strong>{active.statThree}</strong><span>{active.statThreeLabel}</span></div></div>
          <div className="case-rail"><span>brief</span><i /><span>outcome</span></div>
        </article>
      </div>
    </section>
  );
}

function Performance() {
  return (
    <section className="section-pad performance" id="performance">
      <div className="section-head reveal"><div><div className="eyebrow">04 / Performance</div><h2 className="section-title">The numbers<br />behind the feel.</h2></div><p className="section-note">Metrics are not trophies here. They are instruments for finding the next correction.</p></div>
      <div className="metric-grid reveal">
        <div className="metric"><div className="metric-number">31<span style={{ fontSize: '.45em' }}>%</span></div><div><div className="metric-label">Increase in active product usage</div><div className="metric-detail">A clearer path from first value to repeat behaviour.</div></div></div>
        <div className="metric"><div className="metric-number">2.4<span style={{ fontSize: '.45em' }}>×</span></div><div><div className="metric-label">Faster validation cycles</div><div className="metric-detail">Less theatre. More learning per week.</div></div></div>
        <div className="metric"><div className="metric-number">18</div><div><div className="metric-label">Point confidence lift</div><div className="metric-detail">Measured after the system met the team where it was.</div></div></div>
      </div>
      <div className="lap-line reveal"><span>Lap 01 / Baseline</span><span /><span style={{ textAlign: 'right' }}>Lap 04 / Current read</span></div>
    </section>
  );
}

function Garage() {
  return (
    <section className="section-pad garage" id="garage">
      <div className="section-head reveal"><div><div className="eyebrow">05 / The garage</div><h2 className="section-title">Work in<br />the bays.</h2></div><p className="section-note">A few product surfaces, narratives, and systems I have helped take from a rough sketch to a useful machine.</p></div>
      <div className="project-grid">
        <article className="project-card large reveal"><div className="project-top"><span className="project-type">Portfolio platform / 01</span><span className="project-year">2024</span></div><div className="project-orbit"><span className="project-orbit-dot" /></div><div className="project-bottom"><h3>Making AI legible at enterprise scale.</h3><p>A product narrative and operating model for turning technical possibility into a sequence of decisions teams could actually make.</p><div className="project-arrow"><ArrowUpRight size={18} /></div></div></article>
        <article className="project-card small reveal reveal-delay-1"><div className="project-top"><span className="project-type">Decision system / 02</span><span className="project-year">2023</span></div><div className="project-bottom"><h3>The memo as a product.</h3><p>A lightweight ritual for high-context, low-drama decisions.</p><div className="project-arrow"><ArrowUpRight size={18} /></div></div></article>
        <article className="project-card small reveal reveal-delay-2"><div className="project-top"><span className="project-type">Data trust / 03</span><span className="project-year">Ongoing</span></div><div className="project-bottom"><h3>Feedback with a return address.</h3><p>Exploring feedback loops that improve the system and the relationship around it.</p><div className="project-arrow"><ArrowUpRight size={18} /></div></div></article>
      </div>
    </section>
  );
}

function Experiments() {
  return (
    <section className="section-pad" id="experiments">
      <div className="section-head reveal"><div><div className="eyebrow">06 / Open telemetry</div><h2 className="section-title">Still learning<br />in public.</h2></div><p className="section-note">The best product practice is a live one. These are the questions currently taking up space.</p></div>
      <div className="experiments-grid"><div className="experiment-list reveal">{experiments.map((experiment, index) => <article className="experiment" key={experiment.name}><span className="experiment-index">0{index + 1}</span><div><h3>{experiment.name}</h3><p>{experiment.copy}</p></div><span className="experiment-status">{experiment.status}</span></article>)}</div><div className="manifesto reveal reveal-delay-1"><p>“Good strategy gives a team fewer things to be confused about — and <span>more courage to act.</span>”</p><div className="manifesto-foot"><Radio size={14} /><span>Current operating principle<br />Updated 14.02.25</span></div></div></div>
    </section>
  );
}

function Principles() {
  return (
    <section className="section-pad principles" id="principles">
      <div className="section-head reveal"><div><div className="eyebrow">07 / Engineering philosophy</div><h2 className="section-title">How I hold<br />the wheel.</h2></div><p className="section-note">Principles are useful when they survive contact with a difficult roadmap.</p></div>
      <div>{principles.map(([number, title, copy], index) => <article className={`principle-row reveal reveal-delay-${Math.min(index + 1, 3)}`} key={number}><span className="principle-num">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'vrushabh.chauhan@cisco.com';
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  return (
    <section className="section-pad contact" id="contact">
      <div className="contact-inner reveal"><div className="eyebrow">08 / Useful coordinates</div><h2>Let’s make the next lap count.</h2><p className="contact-copy">For a thoughtful conversation about product strategy, data, AI, or the work between the lines, I’m usually easiest to find by email.</p><div className="contact-links"><a className="contact-link" href={`mailto:${email}`} data-testid="link-email"><Mail size={15} /> Start a conversation <ArrowRight size={14} /></a><button className="contact-link" onClick={copyEmail} data-testid="button-copy-email"><Copy size={14} /> {copied ? 'Copied to clipboard' : 'Copy email'}</button><a className="contact-link" href="https://www.linkedin.com" target="_blank" rel="noreferrer" data-testid="link-linkedin"><Linkedin size={15} /> LinkedIn <ExternalLink size={13} /></a></div></div>
    </section>
  );
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .12 });
    const revealNodes = document.querySelectorAll('.reveal');
    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="portfolio-shell">
      {loading && <StartSequence onComplete={() => setLoading(false)} />}
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <div className="intro-strip reveal"><span className="eyebrow">The brief</span><p>Build products that help people make better decisions — especially when the data is complicated and the stakes are real.</p></div>
        <History />
        <CaseWork />
        <Performance />
        <Garage />
        <Experiments />
        <Principles />
        <Contact />
      </main>
      <footer className="footer"><span>Vrushabh Chauhan / Product Portfolio Manager</span><span>Data + AI / Cisco / 2025</span><span><MapPin size={11} style={{ verticalAlign: 'middle' }} /> 37°20′N 121°53′W</span></footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;