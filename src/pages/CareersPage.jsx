import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import styles from './CareersPage.module.css';

export function CareersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedJob, setSelectedJob] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    experience: '2-4 years',
    coverLetter: '',
  });

  const openPositions = [
    {
      id: 'job-1',
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Hybrid / Remote',
      type: 'Full Time',
      experience: '3+ Years',
      icon: '⚡',
      summary: 'Build high-performance web applications using React.js, Node.js, Express, and modern cloud deployment pipelines.',
      requirements: [
        'Strong expertise in React, JavaScript (ES6+), and Node.js REST APIs',
        'Experience with database schema design (MongoDB, PostgreSQL, or Supabase)',
        'Familiarity with DevOps workflows, Docker, and CI/CD pipelines',
        'Passion for writing clean, modular, and maintainable code',
      ],
    },
    {
      id: 'job-2',
      title: 'UI/UX Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full Time',
      experience: '2+ Years',
      icon: '✦',
      summary: 'Craft high-converting, aesthetically stunning user interfaces and micro-animations for enterprise and startup clients.',
      requirements: [
        'Proficiency in Figma, design systems, wireframing, and interactive prototyping',
        'Strong understanding of modern visual aesthetics, typography, and contrast',
        'Ability to collaborate directly with frontend engineers for pixel-perfect delivery',
        'Solid portfolio demonstrating real-world Web & Mobile UX designs',
      ],
    },
    {
      id: 'job-3',
      title: 'Frontend Web Specialist',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full Time',
      experience: '2+ Years',
      icon: '❖',
      summary: 'Specialize in building ultra-fast responsive user interfaces, animations, and Core Web Vitals optimization.',
      requirements: [
        'Mastery of HTML5, CSS3, Tailwind, Framer Motion, and CSS Modules',
        'Deep knowledge of React state management and component architecture',
        'Experience with cross-browser performance tuning and SEO best practices',
      ],
    },
    {
      id: 'job-4',
      title: 'DevOps & Cloud Engineer',
      department: 'Infrastructure',
      location: 'Remote',
      type: 'Full Time / Contract',
      experience: '3+ Years',
      icon: '⬡',
      summary: 'Manage automated GitHub Actions CI/CD pipelines, Docker containerization, and AWS/Vercel cloud infrastructure.',
      requirements: [
        'Hands-on experience with Docker, Kubernetes, Nginx, and Linux server admin',
        'Experience setting up automated build & deployment workflows',
        'Knowledge of cloud security, SSL setup, and infrastructure monitoring',
      ],
    },
  ];

  const perks = [
    { icon: '✦', title: 'Competitive Salary', desc: 'Above-market compensation with performance bonuses and annual growth reviews.' },
    { icon: '⚡', title: 'Remote & Hybrid Flexibility', desc: 'Work from home or from our hub with flexible hours focused on real output.' },
    { icon: '⚙', title: 'Modern Tech Stack', desc: 'No legacy debt. We use React, Next.js, Node.js, Vite, and leading cloud tooling.' },
    { icon: '◈', title: 'Continuous Growth', desc: 'Stipends for courses, technical books, and conferences to sharpen your skills.' },
    { icon: '⬡', title: 'High Impact Work', desc: 'Build scalable products directly for real businesses, startups, and enterprises.' },
    { icon: '❖', title: 'Great Work Culture', desc: 'Collaborative, zero-micromanagement environment with friendly engineering leaders.' },
  ];

  const { addJobApplication } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      jobTitle: selectedJob?.title || 'General Application',
    };

    addJobApplication(payload);

    try {
      const endpoint = import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api/careers`
        : '/api/careers';

      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      console.warn('Mail server offline. Application stored in CMS dashboard.');
    }

    setFormSubmitted(true);
  };

  return (
    <div className={`glow-bg ${styles.pageWrapper}`}>
      {/* Header Section */}
      <section className="section-padding">
        <div className="section-header">
          <div className="pill-badge">
            <span className="badge-dot"></span>
            Careers at DeCode
          </div>
          <h1 className={styles.heroHeadline}>
            Build Great Digital Products With Us
          </h1>
          <p className={styles.heroSubtext}>
            At <strong>DeCode Studio</strong>, we design and engineer modern web applications for ambitious companies. Join our team and do the best work of your career.
          </p>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className={`section-padding ${styles.perksSection}`}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className={styles.sectionTitle}>
              Why Engineers & Designers Love DeCode
            </h2>
            <p className={styles.sectionSubtitle}>
              We build a environment where people thrive, learn, and take pride in their craft.
            </p>
          </div>

          <div className={styles.perksGrid}>
            {perks.map((perk, i) => (
              <div key={i} className={`card-panel ${styles.perkCard}`}>
                <div className={styles.perkIcon}>
                  {perk.icon}
                </div>
                <h3 className={styles.perkTitle}>
                  {perk.title}
                </h3>
                <p className={styles.perkDesc}>
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="section-padding">
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="pill-badge" style={{ marginBottom: '12px' }}>
              <span className="badge-dot"></span>
              Current Openings
            </div>
            <h2 className={styles.sectionTitle}>
              Explore Open Roles
            </h2>
          </div>

          <div className={styles.jobsGrid}>
            {openPositions.map((job) => (
              <div key={job.id} className={`card-panel ${styles.jobCard}`}>
                <div className={styles.jobHeader}>
                  <div>
                    <div className={styles.jobMeta}>
                      <span className={styles.jobDepartment}>
                        {job.department}
                      </span>
                      <span className={styles.jobLocation}>{job.location} • {job.type}</span>
                    </div>
                    <h3 className={styles.jobTitle}>
                      {job.title}
                    </h3>
                  </div>

                  <button
                    className="btn-primary"
                    onClick={() => {
                      setSelectedJob(job);
                      setFormSubmitted(false);
                    }}
                  >
                    Apply For Role
                  </button>
                </div>

                <p className={styles.jobSummary}>
                  {job.summary}
                </p>

                <div>
                  <h4 className={styles.reqHeader}>
                    Key Requirements:
                  </h4>
                  <ul className={styles.reqList}>
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className={styles.reqItem}>
                        <span className={styles.reqCheck}>✓</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedJob(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedJob(null)}>
              ✕
            </button>

            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.modalTitle}>
                  Application Received!
                </h3>
                <p className={styles.jobSummary} style={{ marginBottom: '24px' }}>
                  Thank you <strong>{formData.name}</strong>. Your application for <strong>{selectedJob.title}</strong> has been submitted. Our engineering leads will review your details and respond via email within 48 hours.
                </p>
                <button className="btn-primary" onClick={() => setSelectedJob(null)}>
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="pill-badge" style={{ marginBottom: '8px' }}>
                  Applying for {selectedJob.title}
                </div>
                <h3 className={styles.modalTitle} style={{ marginBottom: '20px' }}>
                  Submit Your Candidate Application
                </h3>

                <div className={styles.formGroup}>
                  <div>
                    <label className={styles.label}>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div>
                    <label className={styles.label}>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div>
                    <label className={styles.label}>Portfolio / GitHub URL *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://github.com/username or https://portfolio.com"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div>
                    <label className={styles.label}>Cover Letter / Brief Pitch</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us briefly about your recent projects and why you want to join DeCode Studio..."
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                    Submit Candidate Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
