import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

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
    <div style={{ paddingTop: '140px', minHeight: '100vh' }}>
      {/* Header Section */}
      <section className="section-padding">
        <div className="section-header">
          <div className="pill-badge">
            <span className="badge-dot"></span>
            Careers at DeCode
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
            Build Great Digital Products With Us
          </h1>
          <p style={{ color: '#475569', fontSize: '1.15rem', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
            At <strong>DeCode Studio</strong>, we design and engineer modern web applications for ambitious companies. Join our team and do the best work of your career.
          </p>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
              Why Engineers & Designers Love DeCode
            </h2>
            <p style={{ color: '#64748B', fontSize: '1rem' }}>
              We build a environment where people thrive, learn, and take pride in their craft.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {perks.map((perk, i) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--surface)',
                    color: 'var(--text)',
                    border: '1px solid var(--lav)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    marginBottom: '16px',
                  }}
                >
                  {perk.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                  {perk.title}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.925rem', lineHeight: 1.5 }}>
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
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A' }}>
              Explore Open Roles
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {openPositions.map((job) => (
              <div
                key={job.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '18px',
                  padding: '32px',
                  boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                      <span
                        style={{
                          background: 'var(--surface)',
                          color: 'var(--text)',
                          border: '1px solid var(--lav)',
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          fontSize: '0.8rem',
                          fontWeight: 800,
                        }}
                      >
                        {job.department}
                      </span>
                      <span style={{ color: '#64748B', fontSize: '0.85rem' }}>{job.location} • {job.type}</span>
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>
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

                <p style={{ color: '#475569', fontSize: '0.975rem', lineHeight: 1.6 }}>
                  {job.summary}
                </p>

                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold-bright)', marginBottom: '10px' }}>
                    Key Requirements:
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {job.requirements.map((req, idx) => (
                      <li key={idx} style={{ color: '#475569', fontSize: '0.9rem', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--accent-gold-bright)', fontWeight: 800 }}>✓</span>
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
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setSelectedJob(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '560px',
              width: '100%',
              padding: '36px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedJob(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                fontSize: '1.2rem',
                cursor: 'pointer',
                color: '#475569',
              }}
            >
              ✕
            </button>

            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.6)', color: 'var(--accent-gold-bright)', fontSize: '1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                  ✓
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                  Application Received!
                </h3>
                <p style={{ color: '#475569', fontSize: '0.975rem', lineHeight: 1.6, marginBottom: '24px' }}>
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
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '20px' }}>
                  Submit Your Candidate Application
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                      Portfolio / GitHub URL *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://github.com/username or https://portfolio.com"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                      Cover Letter / Brief Pitch
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us briefly about your recent projects and why you want to join DeCode Studio..."
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.95rem', fontFamily: 'inherit' }}
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
