import React from 'react';
import styles from './Process.module.css';
import {
  Compass,
  Layers,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
} from 'lucide-react';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    tag: 'Exploration',
    icon: Compass,
    desc: 'Goal mapping, user needs & project scope.',
    tags: ['Scope', 'Goals'],
  },
  {
    number: '02',
    title: 'Plan',
    tag: 'Strategy',
    icon: Layers,
    desc: 'Architecture blueprint & sprint roadmap.',
    tags: ['Tech Stack', 'Roadmap'],
  },
  {
    number: '03',
    title: 'Design',
    tag: 'Creation',
    icon: Palette,
    desc: 'Intuitive UX layouts & Figma prototypes.',
    tags: ['Wireframe', 'Prototype'],
  },
  {
    number: '04',
    title: 'Build',
    tag: 'Engineering',
    icon: Code2,
    desc: 'Modular frontend, robust APIs & cloud.',
    tags: ['Frontend', 'Backend'],
  },
  {
    number: '05',
    title: 'Test',
    tag: 'QA & Security',
    icon: ShieldCheck,
    desc: 'Performance audits, device testing & security checks.',
    tags: ['Device QA', 'Security'],
  },
  {
    number: '06',
    title: 'Launch',
    tag: 'Go-Live',
    icon: Rocket,
    desc: 'Production deploy, cloud setup & support.',
    tags: ['Deploy', 'Scaling'],
  },
];

export function Process() {
  return (
    <section id="process" className={styles.processSection} aria-labelledby="process-heading">
      <div className={styles.container}>
        <header className={styles.sectionHeader} data-motion="rise">
          <h2 id="process-heading" className={styles.sectionTitle}>
            A simple process.<br />
            <span>A better outcome.</span>
          </h2>
          <p className={styles.sectionDesc}>
            From the first conversation to launch, we bring clarity to every
            stage — with a shared plan and a clear next step.
          </p>
        </header>

        <ol className={styles.steps}>
          {PROCESS_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <li key={step.number} className={styles.step} data-motion="rise">
                <div className={styles.stepHeader}>
                  <span className={styles.icon}><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span>
                </div>
                <div className={styles.stepBody}>
                  <p className={styles.stage}>{step.tag}</p>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
                <ul className={styles.deliverables} aria-label={`${step.title} deliverables`}>
                  {step.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </li>
            );
          })}
        </ol>
        <div className={styles.closing}>
          <p>Your idea. A clear path forward.</p>
          <a href="#contact" className={styles.contactLink}>
            Let’s talk about your project <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Process;
