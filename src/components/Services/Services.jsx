import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useData } from '../../context/DataContext';
import styles from './Services.module.css';
import { MonitorSmartphone, Code2, Cpu, Rocket, RotateCcw, Wrench } from 'lucide-react';

const SERVICE_ICONS = {
  '01': <MonitorSmartphone className="w-6 h-6" />,
  '02': <Code2 className="w-6 h-6" />,
  '03': <Cpu className="w-6 h-6" />,
  '04': <Rocket className="w-6 h-6" />,
  '05': <RotateCcw className="w-6 h-6" />,
  '06': <Wrench className="w-6 h-6" />
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
        <h2>Services Built for Real Business Growth</h2>
        <p>
          At <strong>{siteContent.agencyName || 'DeCode'}</strong>, we combine strategic design with clean engineering to deliver fast, reliable digital products.
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
                <span className={styles.icon}>{SERVICE_ICONS[service.id] || <Cpu className="w-6 h-6" />}</span>
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
