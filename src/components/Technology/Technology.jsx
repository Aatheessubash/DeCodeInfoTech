import React from 'react';
import styles from './Technology.module.css';
import { SectionBadge } from '../shared/SectionBadge';
import { BlurFadeText } from '../shared/BlurFadeText';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export function Technology() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const categories = [
    {
      title: 'Frontend Development',
      icon: '✦',
      tools: ['React.js', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      title: 'Backend & Databases',
      icon: '⚙',
      tools: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'Mongoose', 'Firebase', 'Supabase'],
    },
    {
      title: 'DevOps & Cloud',
      icon: '⚡',
      tools: ['Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD Pipelines', 'Vercel', 'Render', 'Netlify', 'Linux', 'Nginx', 'Cloud Deployment'],
    },
    {
      title: 'Design & Collaboration',
      icon: '❖',
      tools: ['Figma', 'Adobe XD', 'GitHub', 'Postman', 'Notion', 'ClickUp', 'Trello'],
    },
  ];

  return (
    <section id="technology" className="section-padding glow-bg" ref={sectionRef}>
      <div className={`section-header reveal ${isVisible ? 'visible' : ''}`}>
        <SectionBadge>Technology</SectionBadge>
        <h2>
          Modern technology. <br />
          <span style={{ color: 'var(--muted)' }}>Practical execution.</span>
        </h2>
        <p>
          We choose tools based on what your product needs: speed, reliability, maintainability, and room <BlurFadeText>to grow.</BlurFadeText>
        </p>
      </div>

      <div className={styles.techGrid}>
        {categories.map((cat, idx) => (
          <div
            key={cat.title}
            className={`card-panel ${styles.techCategoryCard} reveal delay-${idx + 1} ${isVisible ? 'visible' : ''}`}
          >
            <h3 className={styles.categoryTitle}>
              <span className={styles.categoryIcon}>{cat.icon}</span>
              <span>{cat.title}</span>
            </h3>

            <div className={styles.chipsContainer}>
              {cat.tools.map((tool) => (
                <div key={tool} className={styles.techChip}>
                  {tool}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
