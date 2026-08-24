import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
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
  const { services, siteContent } = useData();

  const infiniteServices = [...services, ...services];

  return (
    <section id="services" className={`section-padding ${styles.servicesSection}`}>
      <div className="section-header reveal" style={{ marginBottom: '20px' }}>
        <div className="pill-badge">
          <span className="badge-dot"></span>
          Core Capabilities
        </div>
        <h2 className={styles.sectionHeading}>Technology Solutions Built Around Your Business</h2>
        <p className={styles.sectionSub}>
          At <strong>{siteContent.agencyName || 'DeCode InfoTech'}</strong>, we combine strategic engineering, AI innovation, and intuitive design to deliver scalable technology.
        </p>
      </div>

      <div className={`${styles.carouselContainer} reveal-scale delay-2`}>
        <div className={styles.scrollTrack}>
          {infiniteServices.map((service, index) => (
            <div
              key={`${service.id}-${index}`}
              className={styles.card}
              aria-hidden={index >= services.length}
            >
              <div className={styles.cardHeader}>
                <span className={styles.icon}>
                  {SERVICE_ICONS[service.id] || <Sparkles size={20} aria-hidden="true" />}
                </span>
                <span className={styles.number}>{service.id}</span>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
