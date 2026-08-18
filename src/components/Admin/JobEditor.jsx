import React, { useMemo, useState } from 'react';
import { BriefcaseBusiness, Save, X } from 'lucide-react';
import styles from './JobEditor.module.css';

function joinRequirements(requirements) {
  return Array.isArray(requirements) ? requirements.join('\n') : '';
}

function splitRequirements(value) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function JobEditor({ job, onChange, onSave, onCancel }) {
  const [requirementsInput, setRequirementsInput] = useState(() => joinRequirements(job.requirements));

  const previewRequirements = useMemo(() => splitRequirements(requirementsInput), [requirementsInput]);

  const updateField = (field, value) => {
    onChange({ ...job, [field]: value });
  };

  const handleRequirementsChange = (value) => {
    setRequirementsInput(value);
    updateField('requirements', splitRequirements(value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      ...job,
      requirements: previewRequirements,
      icon: (job.icon || job.department || 'JOB').slice(0, 2).toUpperCase(),
    });
  };

  return (
    <form className={styles.editor} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <div>
          <span>{job.id ? 'Edit role' : 'New role'}</span>
          <h4>{job.id ? job.title || 'Untitled job post' : 'Create job post'}</h4>
        </div>
        <BriefcaseBusiness size={24} aria-hidden="true" />
      </div>

      <div className={styles.formGrid}>
        <label>
          <span>Job Title</span>
          <input
            type="text"
            value={job.title || ''}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="Frontend Developer"
            required
          />
        </label>

        <label>
          <span>Department</span>
          <input
            type="text"
            value={job.department || ''}
            onChange={(event) => updateField('department', event.target.value)}
            placeholder="Engineering"
            required
          />
        </label>

        <label>
          <span>Location</span>
          <input
            type="text"
            value={job.location || ''}
            onChange={(event) => updateField('location', event.target.value)}
            placeholder="Remote / Coimbatore"
            required
          />
        </label>

        <label>
          <span>Job Type</span>
          <select value={job.type || 'Full Time'} onChange={(event) => updateField('type', event.target.value)}>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Internship</option>
            <option>Contract</option>
            <option>Full Time / Contract</option>
          </select>
        </label>

        <label>
          <span>Experience</span>
          <input
            type="text"
            value={job.experience || ''}
            onChange={(event) => updateField('experience', event.target.value)}
            placeholder="2+ Years"
            required
          />
        </label>

        <label>
          <span>Card Initials</span>
          <input
            type="text"
            value={job.icon || ''}
            onChange={(event) => updateField('icon', event.target.value.slice(0, 2).toUpperCase())}
            placeholder="FE"
            maxLength={2}
          />
        </label>

        <label className={styles.fullWidth}>
          <span>Short Summary</span>
          <textarea
            value={job.summary || ''}
            onChange={(event) => updateField('summary', event.target.value)}
            placeholder="Describe the role in one or two clean sentences."
            rows={3}
            maxLength={260}
            required
          />
          <small>{(job.summary || '').length}/260</small>
        </label>

        <label className={styles.fullWidth}>
          <span>Key Requirements</span>
          <textarea
            value={requirementsInput}
            onChange={(event) => handleRequirementsChange(event.target.value)}
            placeholder="Add one requirement per line"
            rows={6}
            required
          />
        </label>
      </div>

      <div className={styles.preview}>
        <div className={styles.avatar}>{(job.icon || job.department || 'JB').slice(0, 2).toUpperCase()}</div>
        <div>
          <span>{job.department || 'Department'} / {job.type || 'Type'}</span>
          <strong>{job.title || 'Job title preview'}</strong>
          <p>{job.summary || 'The short role summary will appear here on the careers page.'}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className="btn-primary">
          <Save size={16} aria-hidden="true" /> Save job post
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          <X size={16} aria-hidden="true" /> Cancel
        </button>
      </div>
    </form>
  );
}
