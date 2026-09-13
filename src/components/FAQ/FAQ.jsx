import React, { useState } from 'react';
import { useData } from '../../context/useData';
import styles from './FAQ.module.css';

export function FAQ() {
  const [openIdx, setOpenIdx] = useState(-1);
  const { faqs, siteContent } = useData();

  const toggleAccordion = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  const faqsList = faqs && faqs.length > 0 ? faqs : [];

  return (
    <section id="faq" className="section-padding">
      <div className={styles.sectionHeader} data-motion="rise">
        <h2 className={styles.heading}>Frequently Asked <span>Questions</span></h2>
        <p className={styles.subheading}>
          Everything you need to know about working with <strong>{siteContent?.agencyName || 'DeCode'}</strong>.
        </p>
      </div>

      <div className={`${styles.accordionWrapper} reveal delay-1`}>
        {faqsList.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={faq.id || idx}
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
                <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
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

export default FAQ;
