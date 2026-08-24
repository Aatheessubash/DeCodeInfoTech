import React, { useState } from 'react';
import styles from './FAQ.module.css';

export function FAQ() {
  const [openIdx, setOpenIdx] = useState(-1);

  const faqs = [
    {
      q: 'Why should I hire a web development agency for my SaaS startup?',
      a: 'Hiring a specialized web development agency for startups like DeCode ensures end to end product development in India. We offer modern web application development, scalable architecture, MERN stack expertise, and custom UI/UX design built for conversions.',
    },
    {
      q: 'Can you build custom LMS platform development services or enterprise tools?',
      a: 'Yes, we specialize in custom LMS platform development services, construction management software, agriculture portals, news portals, and SaaS platforms tailored to your business needs.',
    },
    {
      q: 'What modern tech stack and frameworks do you use?',
      a: 'Our primary tech stack includes React JS, Next JS, Node JS, Express, TypeScript, MongoDB, PostgreSQL, Tailwind CSS, Docker, Kubernetes, and Vercel deployments.',
    },
    {
      q: 'How do you improve website speed and Core Web Vitals?',
      a: 'We perform technical SEO and web development optimization, code splitting, image compression, server-side caching, and DOM cleanup to fix low conversion rates and ensure maximum speed.',
    },
    {
      q: 'Can you help redesign an outdated business website without losing SEO?',
      a: 'Absolutely! We specialize in redesigning outdated business websites, optimizing performance, setting up 301 redirects, and providing SEO friendly website development for lead generation.',
    },
    {
      q: 'Do you offer full stack developer services and DevOps consulting in India?',
      a: 'Yes, DeCode provides full stack web development services in India alongside Docker DevOps consulting, CI/CD pipeline setup with GitHub Actions, and ongoing support for small businesses and startups.',
    },
  ];

  const toggleAccordion = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="section-padding">
      <div className="section-header reveal">
        <div className="pill-badge">
          <span className="badge-dot"></span>
          Common Questions
        </div>
        <h2>Frequently Asked Questions</h2>
        <p>
          Everything you need to know about working with <strong>DeCode Studio</strong>.
        </p>
      </div>

      <div className={`${styles.accordionWrapper} reveal delay-1`}>
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`card-panel ${styles.item} ${isOpen ? styles.itemOpen : ''}`}
            >
              <button
                type="button"
                className={styles.questionBtn}
                onClick={() => toggleAccordion(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
              >
                <span className={styles.questionText}>{faq.q}</span>
                <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} aria-hidden="true">+</span>
              </button>
              {isOpen && (
                <div id={`faq-answer-${idx}`} className={styles.answerBody} role="region">
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
