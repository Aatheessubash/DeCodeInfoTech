import React from 'react';
import { useData } from '../../context/useData';
import styles from './Services.module.css';
import {
  Code2,
  Cpu,
  Palette,
  Cloud,
  Video,
  Smartphone,
  Wrench,
  Sparkles,
} from 'lucide-react';

const SERVICE_ICONS = {
  '01': <Code2 size={20} aria-hidden="true" />,
  '02': <Cpu size={20} aria-hidden="true" />,
  '03': <Palette size={20} aria-hidden="true" />,
  '04': <Cloud size={20} aria-hidden="true" />,
  '05': <Video size={20} aria-hidden="true" />,
  '06': <Smartphone size={20} aria-hidden="true" />,
  '07': <Wrench size={20} aria-hidden="true" />,
};

export function Services() {
  const { services } = useData();

  return (
    <section id="services" className={styles.servicesSection} aria-labelledby="services-heading">
      <div className={styles.container}>
      <div className={styles.sectionHeader} data-motion="rise">
        <h2 id="services-heading" className={styles.sectionHeading}>Technology That Moves Business <span>Forward</span></h2>
        <p className={styles.sectionSub}>
         At DeCode, we unite engineering, AI, and thoughtful design to create intelligent technology that scales with your business.
        </p>
      </div>

      <div className={styles.carouselViewport} role="region" aria-label="Service cards">
        <div className={styles.scrollTrack} style={{ '--duration': `${Math.max(services.length, 4) * 6}s` }}>
          {[0, 1].map((copy) => (
            <div key={copy} className={styles.servicesGroup} aria-hidden={copy === 1 ? true : undefined}>
          {services.map((service) => (
            <article
              key={service.id}
              className={styles.card}
            >
              <div className={styles.cardHeader}>
                <span className={styles.icon}>
                  {SERVICE_ICONS[service.id] || <Sparkles size={20} aria-hidden="true" />}
                </span>
              </div>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.desc}>{service.desc}</p>
              
              {service.deliverables && service.deliverables.length > 0 && (
                <div className={styles.deliverables}>
                  <div className={styles.tagsRow}>
                    {service.deliverables.slice(0, 3).map((item, i) => (
                      <span key={i} className={styles.delivChip}>
                        <span className={styles.chipDot} />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

export default Services;
