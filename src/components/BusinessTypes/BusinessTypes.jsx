import React from 'react';
import { Building2, ShoppingCart, Briefcase, Rocket, Globe, Users, GraduationCap, HeartPulse, Landmark, House, Utensils, Plane, Truck, Factory, Sprout, Dumbbell, Clapperboard, HardHat, Scale, CalendarDays } from 'lucide-react';
import styles from './BusinessTypes.module.css';

const BUSINESS_TYPES = [
  {
    id: 'startup',
    icon: <Rocket size={28} aria-hidden="true" />,
    title: 'Startups & Scale-ups',
    desc: 'Launch your MVP faster or scale your existing product with modern architectures built for rapid growth and agility.'
  },
  {
    id: 'ecommerce',
    icon: <ShoppingCart size={28} aria-hidden="true" />,
    title: 'E-Commerce Brands',
    desc: 'High-converting, lightning-fast storefronts using headless commerce to provide premium shopping experiences.'
  },
  {
    id: 'enterprise',
    icon: <Building2 size={28} aria-hidden="true" />,
    title: 'Enterprise IT',
    desc: 'Secure, scalable custom internal tools and dashboards that streamline operations and replace outdated legacy systems.'
  },
  {
    id: 'saas',
    icon: <Globe size={28} aria-hidden="true" />,
    title: 'SaaS Platforms',
    desc: 'Robust multi-tenant architectures, subscription billing integrations, and intuitive user interfaces.'
  },
  {
    id: 'agency',
    icon: <Briefcase size={28} aria-hidden="true" />,
    title: 'Creative Agencies',
    desc: 'White-label development partnerships to bring your stunning designs to life with pixel-perfect precision.'
  },
  {
    id: 'community',
    icon: <Users size={28} aria-hidden="true" />,
    title: 'Communities & Non-profits',
    desc: 'Accessible, fast, and highly interactive platforms to engage audiences and manage memberships efficiently.'
  } ,
  { id: "education", icon: <GraduationCap size={28} aria-hidden="true" />, title: "Education & Training", desc: "Learning platforms, course delivery, and student portals that make education more accessible." },
  { id: "healthcare", icon: <HeartPulse size={28} aria-hidden="true" />, title: "Healthcare Providers", desc: "Appointment booking, patient portals, and tools that simplify care coordination." },
  { id: "finance", icon: <Landmark size={28} aria-hidden="true" />, title: "Financial Services", desc: "Customer dashboards and digital workflows built around secure access and clear reporting." },
  { id: "real-estate", icon: <House size={28} aria-hidden="true" />, title: "Real Estate", desc: "Property listings, enquiry management, and virtual experiences for buyers and agents." },
  { id: "restaurants", icon: <Utensils size={28} aria-hidden="true" />, title: "Restaurants & Food Brands", desc: "Online ordering, reservations, and digital menus that connect kitchens with customers." },
  { id: "travel", icon: <Plane size={28} aria-hidden="true" />, title: "Travel & Hospitality", desc: "Booking platforms and guest experiences for hotels, tour operators, and travel brands." },
  { id: "logistics", icon: <Truck size={28} aria-hidden="true" />, title: "Logistics & Transport", desc: "Shipment tracking, fleet dashboards, and workflows that keep operations moving." },
  { id: "manufacturing", icon: <Factory size={28} aria-hidden="true" />, title: "Manufacturing", desc: "Production dashboards, inventory tools, and supplier portals for connected operations." },
  { id: "agriculture", icon: <Sprout size={28} aria-hidden="true" />, title: "Agriculture & Agritech", desc: "Farm management tools, produce marketplaces, and data platforms for growing businesses." },
  { id: "fitness", icon: <Dumbbell size={28} aria-hidden="true" />, title: "Fitness & Wellness", desc: "Class scheduling, memberships, and coaching platforms that support healthier routines." },
  { id: "media", icon: <Clapperboard size={28} aria-hidden="true" />, title: "Media & Entertainment", desc: "Content platforms and publishing tools that bring creators and audiences together." },
  { id: "construction", icon: <HardHat size={28} aria-hidden="true" />, title: "Construction", desc: "Project tracking, contractor coordination, and reporting tools for teams on site." },
  { id: "legal", icon: <Scale size={28} aria-hidden="true" />, title: "Legal & Professional Services", desc: "Client portals, appointment scheduling, and document workflows for service firms." },
  { id: "events", icon: <CalendarDays size={28} aria-hidden="true" />, title: "Events & Experiences", desc: "Ticketing, registrations, and attendee platforms for memorable events." }
];

export function BusinessTypes() {
  return (
    <section id="industries" className={styles.section} aria-labelledby="audience-heading">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 id="audience-heading" className={styles.sectionHeading}>
            Built for Different Kinds of <span>Businesses.</span>
          </h2>
          <p className={styles.sectionSub}>
            We adapt our technology and approach to the challenges of your
            industry — and the next stage of your business.
          </p>
        </header>

        <div className={styles.rows}>
          {[BUSINESS_TYPES.slice(0, 10), BUSINESS_TYPES.slice(10, 20)].map((row, index) => (
            <div key={index} className={styles.viewport} role="region" aria-label={`Target audience row ${index + 1}`}>
              <div className={`${styles.track} ${index === 1 ? styles.reverse : ''}`}>
                {[0, 1].map((copy) => (
                  <ul key={copy} className={styles.audienceList} aria-hidden={copy === 1 ? true : undefined}>
                    {row.map((type) => (
                      <li key={type.id} className={styles.audience}>
                        <div className={styles.iconWrapper}>{type.icon}</div>
                        <h3 className={styles.title}>{type.title}</h3>
                        <p className={styles.desc}>{type.desc}</p>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
