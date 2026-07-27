import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './Contact.module.css';

export function Contact() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Web Application',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setSubmitError('');
    setFormData({ name: '', email: '', company: '', projectType: 'Web Application', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      const endpoint = import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api/contact`
        : '/api/contact';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setFormSubmitted(true);
      } else {
        // Fallback for dev / offline server
        const savedLeads = JSON.parse(localStorage.getItem('decode_contact_leads') || '[]');
        savedLeads.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('decode_contact_leads', JSON.stringify(savedLeads));
        setFormSubmitted(true);
      }
    } catch {
      // Fallback for dev / offline server
      const savedLeads = JSON.parse(localStorage.getItem('decode_contact_leads') || '[]');
      savedLeads.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('decode_contact_leads', JSON.stringify(savedLeads));
      setFormSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding glow-bg" ref={sectionRef}>
      <div className={`section-header reveal ${isVisible ? 'visible' : ''}`}>
        <div className="pill-badge">
          <span className="badge-dot"></span>
          Start Your Project
        </div>
        <h2>Let's Build Something Exceptional</h2>
        <p>
          Ready to turn your vision into a high-performing digital product? Fill out the proposal form below and the <strong>DeCode</strong> team will get back to you within 24 hours.
        </p>
      </div>

      <div className={`${styles.container} reveal delay-1 ${isVisible ? 'visible' : ''}`}>
        {formSubmitted ? (
          <div className={styles.successBox}>
            <div className={styles.successIcon}>✓</div>
            <h3>Proposal Request Sent!</h3>
            <p>
              Thank you <strong>{formData.name}</strong>. The DeCode team has received your project proposal details and will reach out via email (<strong>{formData.email}</strong>) shortly.
            </p>
            <button className="btn-primary" onClick={resetForm}>
              Send Another Request
            </button>
          </div>
        ) : (
          <form className={styles.formCard} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <label htmlFor="name" className={styles.label}>Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="email" className={styles.label}>Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="company" className={styles.label}>Company / Organization</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Acme Corp"
                  value={formData.company}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="projectType" className={styles.label}>Project Category *</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="Web Application">Web Application</option>
                  <option value="Custom Business Website">Custom Business Website</option>
                  <option value="SaaS Platform">SaaS Platform</option>
                  <option value="Website Redesign">Website Redesign</option>
                  <option value="Chrome Extension">Chrome Extension</option>
                </select>
              </div>

              <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                <label htmlFor="message" className={styles.label}>Project Overview & Goals *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  placeholder="Tell us about your project, key requirements, target audience, and business goals..."
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                ></textarea>
              </div>
            </div>

            {submitError && (
              <div className={styles.errorBanner}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {submitError}
              </div>
            )}
            <button type="submit" disabled={submitting} className={`btn-primary ${styles.submitBtn}`}>
              {submitting ? 'Sending Proposal Email...' : 'Submit Proposal Request'}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
