'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { ContactProposal } from '@/lib/types';
import { PROJECT_CATEGORIES } from '@/lib/project-categories';
import { trackEvent } from '@/lib/analytics';
import styles from './Contact.module.css';

type ContactFormProps = {
  idPrefix?: string;
};

export function ContactForm({ idPrefix = 'contact' }: ContactFormProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactProposal>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const fieldId = (name: keyof ContactProposal) => `${idPrefix}-${name}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setSubmitError('');
    setFormData({ name: '', email: '', phone: '', company: '', projectType: '', message: '' });
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
      if (submitted) {
        trackEvent({
          action: 'generate_lead',
          category: 'lead',
          label: formData.projectType,
        });
        setFormSubmitted(true);
      } else {
        setSubmitError('We could not send your request. Please try again or contact us by email.');
      }

      setSubmitting(false);
    }
  };

  if (formSubmitted) {
    return (
      <div className={styles.successBox} role="status">
        <div className={styles.successIcon}>✓</div>
        <h3>Proposal request sent</h3>
        <p>
          Thank you <strong>{formData.name}</strong>. The DeCode team has received your project
          proposal details and will reach out via email (<strong>{formData.email}</strong>) shortly.
        </p>
        <button type="button" className="btn-primary" onClick={resetForm}>
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className={styles.formCard} onSubmit={handleSubmit}>
      <div className={styles.formGrid}>
        <div className={styles.fieldGroup}>
          <label htmlFor={fieldId('name')} className={styles.label}>
            Your name *
          </label>
          <input
            type="text"
            id={fieldId('name')}
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
          <label htmlFor={fieldId('email')} className={styles.label}>
            Email address *
          </label>
          <input
            type="email"
            id={fieldId('email')}
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
          <label htmlFor={fieldId('phone')} className={styles.label}>
            Phone number *
          </label>
          <input
            type="tel"
            id={fieldId('phone')}
            name="phone"
            autoComplete="tel"
            required
            inputMode="tel"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor={fieldId('company')} className={styles.label}>
            Company / organization
          </label>
          <input
            type="text"
            id={fieldId('company')}
            name="company"
            autoComplete="organization"
            placeholder="Acme Corp"
            value={formData.company}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor={fieldId('projectType')} className={styles.label}>
            Project category *
          </label>
          <select
            id={fieldId('projectType')}
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className={styles.select}
            required
          >
            <option value="" disabled>
              Select Project Category
            </option>
            {PROJECT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
          <label htmlFor={fieldId('message')} className={styles.label}>
            Project overview &amp; goals *
          </label>
          <textarea
            id={fieldId('message')}
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
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {submitError}
        </div>
      )}
      <button type="submit" disabled={submitting} className={`btn-primary ${styles.submitBtn}`}>
        <span>{submitting ? 'Sending proposal email...' : 'Submit proposal request'}</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </form>
  );
}
