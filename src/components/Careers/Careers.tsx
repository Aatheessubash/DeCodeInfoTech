'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import styles from './Careers.module.css';

export function Careers() {
  return (
    <section id="careers" className={styles.careersSection} aria-labelledby="careers-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.copy}>
            <h2 id="careers-title" className={styles.headline}>
              Great work starts
              <br />
              with <span>great people.</span>
            </h2>
            <p className={styles.description}>
              Curious minds. Thoughtful makers. People who care.
              <br className={styles.desktopBreak} /> Help us build what comes next, together.
            </p>
            <div className={styles.highlights} aria-label="Career highlights">
              <div>
                <strong>Hybrid</strong>
                <span>Work rhythm</span>
              </div>
              <div>
                <strong>Mentored</strong>
                <span>Growth paths</span>
              </div>
              <div>
                <strong>Real</strong>
                <span>Client impact</span>
              </div>
            </div>
            <div className={styles.actionBlock}>
              <Link href="/careers" className={`btn-primary ${styles.primaryLink}`}>
                Explore open roles <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <p className={styles.caption}>Your next chapter, built at DeCode.</p>
            </div>
          </div>

          <div className={styles.careerImage}>
            <img
              src="/assets/careers-team.png"
              alt="Designers and developers collaborating around a laptop in a bright studio"
              width="1254"
              height="1254"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className={styles.bottomLine}>
          <Link href="/careers">
            Find your place at DeCode <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Careers;
