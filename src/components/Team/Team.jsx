import React from 'react';
import styles from './Team.module.css';
import { SectionBadge } from '../shared/SectionBadge';
import { BlurFadeText } from '../shared/BlurFadeText';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export function Team() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.15 });

  const members = [
    {
      name: 'Alexandre Mercer',
      role: 'Creative Director & Founder',
      image: '/assets/team-1.jpg',
    },
    {
      name: 'Elena Rostova',
      role: 'Lead UI/UX Architect',
      image: '/assets/team-2.jpg',
    },
    {
      name: 'David Chen',
      role: 'Head of Web Engineering',
      image: '/assets/team-3.jpg',
    },
  ];

  return (
    <section id="team" className="section-padding glow-bg" ref={sectionRef}>
      <div className={`section-header reveal ${isVisible ? 'visible' : ''}`}>
        <SectionBadge>Team</SectionBadge>
        <h2>
          The Minds Behind <br />
          <span style={{ color: '#9CA3AF' }}>The Craft.</span>
        </h2>
        <p>
          Passionate designers, engineers, and strategists committed to pushing boundaries. <BlurFadeText>Visionaries in action.</BlurFadeText>
        </p>
      </div>

      <div className={styles.teamGrid}>
        {members.map((member, idx) => (
          <div
            key={member.name}
            className={`${styles.teamCard} reveal delay-${idx + 1} ${isVisible ? 'visible' : ''}`}
          >
            <div className={styles.photoWrapper}>
              <img src={member.image} alt={member.name} className={styles.portraitImg} />
            </div>
            <h3 className={styles.memberName}>{member.name}</h3>
            <p className={styles.memberRole}>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
