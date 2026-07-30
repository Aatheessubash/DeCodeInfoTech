import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Building2, ShoppingCart, Briefcase, Rocket, Globe, Users } from 'lucide-react';
import styles from './BusinessTypes.module.css';

const BUSINESS_TYPES = [
  {
    id: 'startup',
    icon: <Rocket className="w-7 h-7" />,
    title: 'Startups & Scale-ups',
    desc: 'Launch your MVP faster or scale your existing product with modern architectures built for rapid growth and agility.'
  },
  {
    id: 'ecommerce',
    icon: <ShoppingCart className="w-7 h-7" />,
    title: 'E-Commerce Brands',
    desc: 'High-converting, lightning-fast storefronts using headless commerce to provide premium shopping experiences.'
  },
  {
    id: 'enterprise',
    icon: <Building2 className="w-7 h-7" />,
    title: 'Enterprise IT',
    desc: 'Secure, scalable custom internal tools and dashboards that streamline operations and replace outdated legacy systems.'
  },
  {
    id: 'saas',
    icon: <Globe className="w-7 h-7" />,
    title: 'SaaS Platforms',
    desc: 'Robust multi-tenant architectures, subscription billing integrations, and intuitive user interfaces.'
  },
  {
    id: 'agency',
    icon: <Briefcase className="w-7 h-7" />,
    title: 'Creative Agencies',
    desc: 'White-label development partnerships to bring your stunning designs to life with pixel-perfect precision.'
  },
  {
    id: 'community',
    icon: <Users className="w-7 h-7" />,
    title: 'Communities & Non-profits',
    desc: 'Accessible, fast, and highly interactive platforms to engage audiences and manage memberships efficiently.'
  }
];

export function BusinessTypes() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className="section-padding" ref={sectionRef}>
      <div className={`section-header reveal ${isVisible ? 'visible' : ''}`}>
        <div className="pill-badge">
          <span className="badge-dot"></span>
          Our Target Audience
        </div>
        <h2>Built for different kinds of businesses.</h2>
        <p>
          We adapt our technology stack and strategic approach to solve the unique challenges of your specific industry.
        </p>
      </div>

      <div className={styles.container}>
        {BUSINESS_TYPES.map((type, idx) => (
          <div
            key={type.id}
            className={`${styles.card} reveal delay-${(idx % 6) + 1} ${isVisible ? 'visible' : ''}`}
          >
            <div className={styles.iconWrapper}>
              {type.icon}
            </div>
            <h3 className={styles.title}>{type.title}</h3>
            <p className={styles.desc}>{type.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
