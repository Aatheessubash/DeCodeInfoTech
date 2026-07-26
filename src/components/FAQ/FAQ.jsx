import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './FAQ.module.css';

export function FAQ() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  /* FIX #5: All accordion items collapsed by default (-1 means none open) */
  const [openIdx, setOpenIdx] = useState(-1);

  const faqs = [
    {
      q: 'What types of projects does DeCode specialize in?',
      a: 'DeCode specializes in custom web applications, SaaS platforms, high-converting business websites, LMS portals, e-commerce applications, and Chrome developer extensions.',
    },
    {
      q: 'How long does it take to complete a project with DeCode?',
      a: 'A custom high-converting website typically takes 2 to 4 weeks, while complex full-stack web applications and SaaS platforms take between 4 to 8 weeks depending on scope.',
    },
    {
      q: 'What technologies and frameworks do you use?',
      a: 'Our primary stack includes React.js, Next.js, Vite, TypeScript, Node.js, Express, PostgreSQL, MongoDB, HTML5, CSS Modules, Tailwind CSS, and WebGL/Three.js.',
    },
    {
      q: 'Do you provide maintenance and support after launch?',
      a: 'Yes! Every project deployed by DeCode includes dedicated post-launch support, security monitoring, performance audits, and ongoing feature updates.',
    },
    {
      q: 'How do we get started on a project?',
      a: 'Simply fill out our proposal form in the Contact section below with your project goals, budget, and timeline. Our team will schedule an initial discovery call within 24 hours.',
    },
    {
      q: 'Can you redesign our existing outdated website?',
      a: 'Absolutely. We regularly transform slow, outdated websites into ultra-fast, modern digital platforms with elevated visual aesthetics and improved conversion rates.',
    },
    {
      q: 'Will my website or web app be mobile responsive?',
      a: 'Yes. All digital products engineered by DeCode are 100% mobile-first responsive, tested across multiple screen resolutions, browsers, and devices.',
    },
    {
      q: 'How is project billing and payment structured?',
      a: 'We work on transparent, milestone-based pricing (typically 50% deposit upon kickoff and 50% upon final launch and delivery). No hidden fees.',
    },
  ];

  const toggleAccordion = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="section-padding" ref={sectionRef}>
      <div className={`section-header reveal ${isVisible ? 'visible' : ''}`}>
        <div className="pill-badge">
          <span className="badge-dot"></span>
          Common Questions
        </div>
        <h2>Frequently Asked Questions</h2>
        <p>
          Everything you need to know about working with <strong>DeCode Studio</strong>.
        </p>
      </div>

      <div className={`${styles.accordionWrapper} reveal delay-1 ${isVisible ? 'visible' : ''}`}>
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`card-panel ${styles.item} ${isOpen ? styles.itemOpen : ''}`}
            >
              <button
                className={styles.questionBtn}
                onClick={() => toggleAccordion(idx)}
                aria-expanded={isOpen}
              >
                <span className={styles.questionText}>{faq.q}</span>
                <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className={styles.answerBody}>
                  <p className={styles.answerText}>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
