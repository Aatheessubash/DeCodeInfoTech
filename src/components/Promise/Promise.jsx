import React from 'react';
import { MessageSquare, Code2, Zap, Target, Handshake, ScanEye } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useData } from '../../context/useData';
import styles from './Promise.module.css';

export function PromiseSection() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const { siteContent } = useData();

  const coreValues = [
    {
      id: '01',
      title: 'Clear & Direct Communication',
      desc: 'No confusing technical jargon. We provide straightforward progress updates, transparent timelines, and honest project roadmaps.',
      icon: MessageSquare,
    },
    {
      id: '02',
      title: 'Clean, Maintainable Code',
      desc: 'We write well-structured, thoroughly documented code that your engineering team can easily scale and build upon for years to come.',
      icon: Code2,
    },
    {
      id: '03',
      title: 'Fast Delivery Without Quality Trade-Offs',
      desc: 'We use modern frameworks, automated build pipelines, and efficient workflows to launch high-quality digital products on schedule.',
      icon: Zap,
    },
    {
      id: '04',
      title: 'Practical Solutions Focused on Business Goals',
      desc: 'Every design choice and feature we build directly aligns with your core business targets — driving user conversion and revenue.',
      icon: Target,
    },
    {
      id: '05',
      title: 'Long-Term Support After Launch',
      desc: 'Our relationship does not end at deployment. We stand by our work, providing post-launch support, monitoring, and updates.',
      icon: Handshake,
    },
    {
      id: '06',
      title: 'Quality is in the Details',
      desc: 'From microscopic micro-interactions to zero-layout-shift performance, we craft digital experiences that leave a lasting impression.',
      icon: ScanEye,
    },
  ];

  return (
    <section id="standards" className="section-padding glow-bg" ref={sectionRef}>
      <div className={styles.sectionHeader} data-motion="rise">
        <h2 className={styles.heading}>Our Core Foundation &amp; <span>Engineering Standards</span></h2>
        <p className={styles.subheading}>
          <strong>{siteContent?.agencyName || 'DeCode'}</strong> is a modern software studio that designs, builds, and launches fast, scalable websites and custom web applications.
        </p>
      </div>

      <div className={styles.grid}>
        {coreValues.map((val, idx) => {
          const Icon = val.icon;
          return (
          <div
            key={val.id}
            className={`${styles.valueCard} reveal delay-${(idx % 3) + 1} ${isVisible ? 'visible' : ''}`}
          >
            <div className={styles.cardHeader}>
              <span className={styles.iconCircle}><Icon size={24} strokeWidth={1.5} aria-hidden="true" /></span>
            </div>
            <h3 className={styles.title}>{val.title}</h3>
            <p className={styles.desc}>{val.desc}</p>
          </div>
          );
        })}
      </div>
    </section>
  );
}

export const Promise = PromiseSection;
export default PromiseSection;
