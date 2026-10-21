'use client';

import React, { useRef, useState } from 'react';
import { ArrowDown, UploadCloud, FileText, X } from 'lucide-react';
import { useData } from '@/context/useData';
import type { JobPosting, JobApplication, ResumeAttachment } from '@/lib/types';
import { SiteModal } from '@/components/shared/SiteModal';
import styles from './CareersPage.module.css';

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [resume, setResume] = useState<ResumeAttachment | null>(null);
  const [resumeError, setResumeError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Omit<JobApplication, 'jobTitle' | 'resume'>>({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    experience: '2-4 years',
    coverLetter: '',
  });

  const { addJobApplication, jobPostings } = useData();

  const openPositions = jobPostings || [];

  const handleFile = (file: File | null) => {
    setResumeError('');
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase();
    const validExts = ['pdf', 'doc', 'docx'];
    if (!ext || !validExts.includes(ext)) {
      setResumeError('Please attach a PDF, DOC, or DOCX document.');
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setResumeError('Resume file size must not exceed 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setResume({
          name: file.name,
          type: file.type || 'application/pdf',
          size: file.size,
          base64: reader.result,
        });
        setResumeError('');
      }
    };
    reader.onerror = () => {
      setResumeError('Failed to read the file. Please try selecting it again.');
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      portfolio: '',
      experience: '2-4 years',
      coverLetter: '',
    });
    setResume(null);
    setResumeError('');
    setHoneypot('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFormSubmitted(false);
    setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let portfolioUrl = formData.portfolio.trim();
    if (portfolioUrl && !/^https?:\/\//i.test(portfolioUrl)) {
      portfolioUrl = `https://${portfolioUrl}`;
    }

    const payload: JobApplication = {
      ...formData,
      portfolio: portfolioUrl,
      jobTitle: selectedJob?.title || 'General Application',
      ...(resume ? { resume } : {}),
    };

    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, website: honeypot }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            'We could not send your application. Please try again or reach us at contact@decodeinfotech.in.',
        );
      }
      addJobApplication(payload);
      setFormSubmitted(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : 'We could not send your application. Please try again or contact us by email.';
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`glow-bg ${styles.pageWrapper}`}>
      {/* Hero Section */}
      <section className={`section-padding ${styles.heroSection}`}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroHeadline}>Engineer World-Class Digital Products With Us</h1>
            <p className={styles.heroSubtext}>
              Join <strong>DeCode InfoTech</strong> — where elite software engineers, technical
              architects, and product designers build mission-critical web platforms, enterprise
              SaaS architectures, and intelligent cloud systems for high-growth global ventures.
            </p>
            <div className={styles.heroActions}>
              <a href="#open-roles" className="btn-primary">
                Explore Open Roles <ArrowDown size={18} aria-hidden="true" />
              </a>
              <span className={styles.heroCaption}>
                Designers, developers &amp; problem solvers
              </span>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.careerImage}>
              <img
                src="/assets/careers-team.png"
                alt="DeCode InfoTech team collaborating in a modern studio"
                width="1254"
                height="1254"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-roles" className="section-padding">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 className={styles.sectionTitle}>Explore Open Roles</h2>
        </div>

        {openPositions.length === 0 ? (
          <div className={`card-panel ${styles.emptyJobs}`}>
            <h3>No Open Roles Right Now</h3>
            <p>
              We are not actively hiring today, but you can still reach us through the contact page
              for future opportunities.
            </p>
          </div>
        ) : (
          <div className={styles.jobsGrid}>
            {openPositions.map((job) => (
              <div key={job.id} className={`card-panel ${styles.jobCard}`}>
                <div className={styles.jobHeader}>
                  <div>
                    <div className={styles.jobMeta}>
                      <span className={styles.jobDepartment}>{job.department}</span>
                      <span className={styles.jobLocation}>
                        {job.location} • {job.type}
                      </span>
                    </div>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                  </div>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      resetForm();
                      setSelectedJob(job);
                    }}
                  >
                    Apply For Role
                  </button>
                </div>

                <p className={styles.jobSummary}>{job.summary}</p>

                {job.requirements && job.requirements.length > 0 && (
                  <div>
                    <h4 className={styles.reqHeader}>Key Requirements:</h4>
                    <ul className={styles.reqList}>
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className={styles.reqItem}>
                          <span className={styles.reqCheck}>✓</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <SiteModal
          isOpen={Boolean(selectedJob)}
          onClose={() => {
            setSelectedJob(null);
            resetForm();
          }}
          eyebrow={formSubmitted ? 'Application Status' : `Applying for ${selectedJob.title}`}
          title={
            formSubmitted ? (
              'Application Received!'
            ) : (
              <>
                Submit Your <span className="modal-title-accent">Application</span>
              </>
            )
          }
          titleId="career-dialog-title"
          size="sm"
          closeLabel="Close application form"
        >
          {formSubmitted ? (
            <div className={styles.successState}>
              <div className={styles.successIcon}>✓</div>
              <p className={styles.jobSummary} style={{ marginBottom: '24px' }}>
                Thank you <strong>{formData.name}</strong>. Your application for{' '}
                <strong>{selectedJob.title}</strong>
                {resume ? ` (with resume ${resume.name})` : ''} has been submitted. Our engineering
                leads will review your details and respond via email within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Invisible honeypot to trap automated scrapers/bots */}
              <div
                style={{
                  display: 'none',
                  position: 'absolute',
                  left: '-9999px',
                  opacity: 0,
                  pointerEvents: 'none',
                }}
                aria-hidden="true"
              >
                <label htmlFor="career-website">Leave this empty</label>
                <input
                  id="career-website"
                  name="website"
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className={styles.formGroup}>
                <div>
                  <label htmlFor="career-name" className={styles.label}>
                    Full name <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="career-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={styles.input}
                    autoFocus
                  />
                </div>

                <div>
                  <label htmlFor="career-email" className={styles.label}>
                    Email address <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="career-email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={styles.input}
                  />
                </div>

                <div>
                  <label htmlFor="career-phone" className={styles.label}>
                    Phone number
                  </label>
                  <input
                    id="career-phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={styles.input}
                  />
                </div>

                <div>
                  <label htmlFor="career-experience" className={styles.label}>
                    Total Experience
                  </label>
                  <select
                    id="career-experience"
                    name="experience"
                    value={formData.experience || 'Around 2 years'}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className={styles.input}
                  >
                    <option value="Fresher / 0-1 years">Fresher / 0-1 years</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="Around 2 years">Around 2 years</option>
                    <option value="2-4 years">2-4 years</option>
                    <option value="4+ years">4+ years</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="career-portfolio" className={styles.label}>
                    Portfolio / LinkedIn / GitHub URL
                  </label>
                  <input
                    id="career-portfolio"
                    name="portfolio"
                    type="text"
                    placeholder="https://linkedin.com/in/username or https://github.com/username"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    className={styles.input}
                  />
                </div>

                <div>
                  <label htmlFor="career-resume" className={styles.label}>
                    Resume / CV Attachment
                  </label>

                  {resume ? (
                    <div className={styles.fileSelectedCard}>
                      <div className={styles.fileInfo}>
                        <div className={styles.fileIcon}>
                          <FileText size={20} aria-hidden="true" />
                        </div>
                        <div className={styles.fileDetails}>
                          <span className={styles.fileName}>{resume.name}</span>
                          <span className={styles.fileMeta}>
                            {formatFileSize(resume.size)}
                            <span className={styles.fileBadge}>Ready</span>
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className={styles.removeFileBtn}
                        onClick={() => {
                          setResume(null);
                          setResumeError('');
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        title="Remove resume"
                        aria-label="Remove resume"
                      >
                        <X size={18} aria-hidden="true" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`${styles.fileUploadZone} ${isDragging ? styles.fileUploadZoneActive : ''}`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleFile(file);
                      }}
                    >
                      <input
                        id="career-resume"
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className={styles.hiddenFileInput}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFile(file);
                        }}
                      />
                      <UploadCloud size={24} className={styles.uploadIcon} aria-hidden="true" />
                      <p className={styles.uploadPrompt}>
                        <strong>Upload resume</strong> or drag and drop
                      </p>
                      <p className={styles.uploadHint}>PDF, DOC, DOCX up to 5MB</p>
                    </div>
                  )}
                  {resumeError && (
                    <p className={styles.fieldError} role="alert">
                      {resumeError}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="career-cover-letter" className={styles.label}>
                    Cover letter / brief pitch
                  </label>
                  <textarea
                    id="career-cover-letter"
                    name="coverLetter"
                    rows={4}
                    placeholder="Tell us briefly about your recent projects and why you want to join DeCode Studio..."
                    value={formData.coverLetter || ''}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    className={styles.input}
                  />
                </div>

                {submitError && (
                  <p role="alert" className={styles.formAlert}>
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary"
                  style={{ width: '100%', marginTop: '8px' }}
                >
                  {submitting ? 'Submitting Application...' : 'Submit candidate application'}
                </button>
              </div>
            </form>
          )}
        </SiteModal>
      )}
    </div>
  );
}
