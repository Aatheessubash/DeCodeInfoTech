'use client';

import React, { useState } from 'react';
import { useData } from '@/context/useData';
import styles from './Contact.module.css';
import { Mail, MapPin, ArrowRight } from 'lucide-react';
import type { ContactProposal } from '@/lib/types';

function saveLeadLocally(formData: ContactProposal) {
  try {
    const storedLeads = JSON.parse(localStorage.getItem('decode_contact_leads') || '[]');
    const leads = Array.isArray(storedLeads) ? storedLeads : [];
    leads.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('decode_contact_leads', JSON.stringify(leads));
    return true;
  } catch {
    return false;
  }
}

export function Contact() {
  const { siteContent } = useData();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactProposal>({
    name: '',
    email: '',
    company: '',
    projectType: 'Web Application',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setSubmitError('');
    setFormData({ name: '', email: '', company: '', projectType: 'Web Application', message: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    let submitted = false;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json().catch(() => null);
      submitted = Boolean(response.ok && data?.success);
    } catch {
      submitted = false;
    } finally {
      if (!submitted) submitted = saveLeadLocally(formData);

      if (submitted) {
        setFormSubmitted(true);
      } else {
        setSubmitError('We could not send or save your request. Please try again.');
      }

      setSubmitting(false);
    }
  };

  const contactDetails = (
    <div className={styles.directContact}>
      <div className={styles.contactItem}>
        <Mail className={styles.contactIcon} aria-hidden="true" />
        <a href={`mailto:${siteContent?.contactEmail || 'contact@decodeinfotech.com'}`}>
          {siteContent?.contactEmail || 'contact@decodeinfotech.com'}
        </a>
      </div>
      <div className={styles.contactItem}>
        <MapPin className={styles.contactIcon} aria-hidden="true" />
        <span>{siteContent?.contactLocation || 'Coimbatore, Tamil Nadu, India'}</span>
      </div>
    </div>
  );

  return (
    <section id="contact" className={styles.contactSection} aria-labelledby="contact-heading">
      <div className={styles.mainWrapper}>
        <div className={styles.sideCol}>
          <div className={styles.intro}>
            <h2 id="contact-heading" className={styles.heading}>
              Let's Build Something <span>Exceptional</span>
            </h2>
            <p className={styles.subheading}>
              Ready to turn your vision into a high-performing digital product? Fill out the proposal form below and the <strong>DeCode</strong> team will get back to you within 24 hours.
            </p>
          </div>
          {contactDetails}
        </div>

        {/* RIGHT COLUMN: PROPOSAL REQUEST FORM */}
        <div className={styles.formCol}>
          {formSubmitted ? (
            <div className={styles.successBox} role="status">
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
                    autoComplete="name"
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
                    autoComplete="email"
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
                    autoComplete="organization"
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
                    <option value="Mobile App Development">Mobile App Development</option>
                  </select>
                </div>

                <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                  <label htmlFor="message" className={styles.label}>Project Overview &amp; Goals *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your project, key requirements, target audience, and business goals..."
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                  />
                </div>
              </div>

              {submitError && (
                <div className={styles.errorBanner} role="alert">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {submitError}
                </div>
              )}
              <button type="submit" disabled={submitting} className={`btn-primary ${styles.submitBtn}`}>
                <span>{submitting ? 'Sending Proposal Email...' : 'Submit Proposal Request'}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
