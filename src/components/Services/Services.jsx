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
  '01': <Code2 className="w-6 h-6" />,
  '02': <Cpu className="w-6 h-6" />,
  '03': <Palette className="w-6 h-6" />,
  '04': <Cloud className="w-6 h-6" />,
  '05': <Video className="w-6 h-6" />,
  '06': <Smartphone className="w-6 h-6" />,
  '07': <Wrench className="w-6 h-6" />,
};

export function Services() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const { services, siteContent } = useData();

  const infiniteServices = [...services, ...services];

  return (
    <section id="services" className="section-padding" ref={sectionRef}>
      <div className={`section-header reveal ${isVisible ? 'visible' : ''}`}>
        <div className="pill-badge">
          <span className="badge-dot"></span>
          Core Capabilities
        </div>
        <h2>Technology Solutions Built Around Your Business</h2>
        <p>
          At <strong>{siteContent.agencyName || 'DeCode InfoTech'}</strong>, we combine strategic engineering, industrial innovation, and intuitive design to deliver scalable technology solutions.
        </p>
      </div>

      <div className={styles.carouselContainer}>
        <div className={styles.scrollTrack}>
          {infiniteServices.map((service, index) => (
            <div
              key={`${service.id}-${index}`}
              className={styles.card}
              aria-hidden={index >= services.length}
            >
              <div className={styles.cardHeader}>
                <span className={styles.icon}>
                  {SERVICE_ICONS[service.id] || <Sparkles className="w-6 h-6" />}
                </span>
                <span className={styles.number}>{service.id}</span>
              </div>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.desc}>{service.desc}</p>
              <div className={styles.deliverables}>
                <h4 className={styles.delivTitle}>What We Deliver:</h4>
                <ul className={styles.list}>
                  {service.deliverables?.map((item, i) => (
                    <li key={i}>
                      <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
