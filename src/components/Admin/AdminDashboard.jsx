import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  BriefcaseBusiness,
  ChevronDown,
  ChevronUp,
  FileText,
  FolderOpen,
  MessageSquareQuote,
  Pencil,
  Plus,
  ShieldCheck,
  Trash2,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import { useData } from '../../context/useData';
import { JobEditor } from './JobEditor';
import { ProjectEditor } from './ProjectEditor';
import styles from './AdminDashboard.module.css';

const ADMIN_TABS = [
  { id: 'projects', label: 'Projects', Icon: BriefcaseBusiness },
  { id: 'services', label: 'Services', Icon: Wrench },
  { id: 'careers', label: 'Careers', Icon: Users },
  { id: 'testimonials', label: 'Testimonials', Icon: MessageSquareQuote },
  { id: 'content', label: 'Site Content', Icon: FileText },
];

export function AdminDashboard({ onClose }) {
  const {
    projects,
    services,
    testimonials,
    siteContent,
    addProject,
    updateProject,
    deleteProject,
    moveProject,
    addService,
    updateService,
    deleteService,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    updateSiteContent,
    resetAllData,
    jobApplications,
    jobPostings,
    addJobPosting,
    updateJobPosting,
    deleteJobPosting,
    moveJobPosting,
    deleteJobApplication,
    clearJobApplications,
  } = useData();

  const [activeTab, setActiveTab] = useState('projects');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');

  // Editing state
  const [editingProject, setEditingProject] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [contentForm, setContentForm] = useState(siteContent);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      passkeyInput === '782274' ||
      passkeyInput === 'divinecode01' ||
      passkeyInput === 'admin' ||
      passkeyInput === 'decode123'
    ) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid admin credentials. Passkey required.');
    }
  };

  const handleSaveContent = (e) => {
    e.preventDefault();
    updateSiteContent(contentForm);
    alert('Site content updated successfully!');
  };

  const startNewProject = () => {
    setEditingProject({
      id: '',
      title: '',
      category: '',
      image: '',
      url: 'https://',
      problem: '',
      solution: '',
      tech: [],
    });
  };

  const handleSaveProject = (project) => {
    if (project.id) {
      updateProject(project.id, project);
    } else {
      addProject(project);
    }
    setEditingProject(null);
  };

  const handleDeleteProject = (project) => {
    if (window.confirm(`Delete “${project.title}” from the portfolio?`)) {
      deleteProject(project.id);
      if (editingProject?.id === project.id) setEditingProject(null);
    }
  };

  const startNewJob = () => {
    setEditingJob({
      id: '',
      title: '',
      department: '',
      location: 'Remote',
      type: 'Full Time',
      experience: '',
      icon: '',
      summary: '',
      requirements: [],
    });
  };

  const handleSaveJob = (job) => {
    if (job.id) {
      updateJobPosting(job.id, job);
    } else {
      addJobPosting(job);
    }
    setEditingJob(null);
  };

  const handleDeleteJob = (job) => {
    if (window.confirm(`Delete ${job.title} from the Careers page?`)) {
      deleteJobPosting(job.id);
      if (editingJob?.id === job.id) setEditingJob(null);
    }
  };

  const modalContent = (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-dashboard-title"
      >
        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <span className={styles.badge}><ShieldCheck size={14} aria-hidden="true" /> ADMIN CMS</span>
            <h2 id="admin-dashboard-title">DeCode Content Manager</h2>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close admin dashboard">
            <X size={19} aria-hidden="true" />
          </button>
        </div>

        {!isAuthenticated ? (
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <h3>Admin Passkey Authentication</h3>
            <p>Enter the passkey to manage projects, services, careers, and live website content.</p>
            <input
              aria-label="Admin passkey"
              type="password"
              placeholder="Enter passkey (default: admin)"
              value={passkeyInput}
              onChange={(e) => setPasskeyInput(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className="btn-primary">
              Unlock Dashboard
            </button>
          </form>
        ) : (
          <div className={styles.body}>
            {/* Tabs */}
            <div className={styles.tabs}>
              {ADMIN_TABS.map(({ id, label, Icon }) => {
                const counts = {
                  projects: projects.length,
                  services: services.length,
                  careers: jobPostings?.length || 0,
                  testimonials: testimonials.length,
                };

                return (
                  <button
                    type="button"
                    key={id}
                    className={`${styles.tabBtn} ${activeTab === id ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab(id)}
                    aria-current={activeTab === id ? 'page' : undefined}
                  >
                    <Icon size={17} aria-hidden="true" />
                    <span>{label}</span>
                    {counts[id] !== undefined && <strong>{counts[id]}</strong>}
                  </button>
                );
              })}
            </div>

            <div className={styles.workspace}>

            {/* TAB 1: PROJECTS MANAGEMENT */}
            {activeTab === 'projects' && (
              <div className={styles.tabContent}>
                <div className={styles.topActions}>
                  <div className={styles.sectionHeading}>
                    <span>Portfolio</span>
                    <h3>Manage projects</h3>
                    <p>Edit content, upload optimized screenshots, and control carousel order.</p>
                  </div>
                  <button type="button" className={styles.addButton} onClick={startNewProject}>
                    <Plus size={17} aria-hidden="true" />
                    Add project
                  </button>
                </div>

                <div className={styles.projectWorkspace}>
                  <div className={styles.projectList} aria-label="Portfolio projects">
                    {projects.map((project, index) => (
                      <article
                        key={project.id}
                        className={`${styles.projectRow} ${editingProject?.id === project.id ? styles.selectedProject : ''}`}
                      >
                        <img src={project.image} alt="" loading="lazy" />
                        <div className={styles.projectSummary}>
                          <span>{String(index + 1).padStart(2, '0')} · {project.category}</span>
                          <h4>{project.title}</h4>
                          <p>{project.problem?.slice(0, 78)}{project.problem?.length > 78 ? '…' : ''}</p>
                        </div>
                        <div className={styles.projectActions}>
                          <button
                            type="button"
                            onClick={() => moveProject(project.id, -1)}
                            disabled={index === 0}
                            aria-label={`Move ${project.title} up`}
                            title="Move up"
                          >
                            <ChevronUp size={16} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveProject(project.id, 1)}
                            disabled={index === projects.length - 1}
                            aria-label={`Move ${project.title} down`}
                            title="Move down"
                          >
                            <ChevronDown size={16} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingProject({ ...project })}
                            aria-label={`Edit ${project.title}`}
                            title="Edit project"
                          >
                            <Pencil size={16} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className={styles.dangerAction}
                            onClick={() => handleDeleteProject(project)}
                            aria-label={`Delete ${project.title}`}
                            title="Delete project"
                          >
                            <Trash2 size={16} aria-hidden="true" />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className={styles.projectEditorPanel}>
                    {editingProject ? (
                      <ProjectEditor
                        key={editingProject.id || 'new-project'}
                        project={editingProject}
                        onChange={setEditingProject}
                        onSave={handleSaveProject}
                        onCancel={() => setEditingProject(null)}
                      />
                    ) : (
                      <div className={styles.emptyEditor}>
                        <FolderOpen size={34} aria-hidden="true" />
                        <h4>Select a project to edit</h4>
                        <p>Choose Edit on a project or add a new portfolio item.</p>
                        <button type="button" className={styles.addButton} onClick={startNewProject}>
                          <Plus size={17} aria-hidden="true" /> Add project
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SERVICES MANAGEMENT */}
            {activeTab === 'services' && (
              <div className={styles.tabContent}>
                <div className={styles.topActions}>
                  <h3>Manage Core Capabilities / Services</h3>
                  <button
                    className="btn-primary"
                    onClick={() =>
                      setEditingService({
                        id: '',
                        title: '',
                        desc: '',
                        deliverables: ['Custom Feature 1', 'Custom Feature 2'],
                        icon: '⚡',
                      })
                    }
                  >
                    + Add New Service
                  </button>
                </div>

                <div className={styles.itemList}>
                  {services.map((s) => (
                    <div key={s.id} className={styles.itemRow}>
                      <span className={styles.serviceIcon}>{s.icon}</span>
                      <div className={styles.itemDetails}>
                        <span className={styles.itemTag}>Service #{s.id}</span>
                        <h4>{s.title}</h4>
                        <p>{s.desc}</p>
                      </div>
                      <div className={styles.itemBtnGroup}>
                        <button className={styles.editBtn} onClick={() => setEditingService(s)}>
                          Edit
                        </button>
                        <button className={styles.deleteBtn} onClick={() => deleteService(s.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {editingService && (
                  <form
                    className={styles.editorBox}
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (editingService.id) {
                        updateService(editingService.id, editingService);
                      } else {
                        addService(editingService);
                      }
                      setEditingService(null);
                    }}
                  >
                    <h4>{editingService.id ? 'Edit Service' : 'New Service'}</h4>
                    <div className={styles.formGrid}>
                      <input
                        type="text"
                        placeholder="Service Title"
                        value={editingService.title}
                        onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                        required
                        className={styles.input}
                      />
                      <input
                        type="text"
                        placeholder="Icon (e.g. ⚡, ✦, ⚙)"
                        value={editingService.icon}
                        onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                        required
                        className={styles.input}
                      />
                      <textarea
                        placeholder="Description"
                        value={editingService.desc}
                        onChange={(e) => setEditingService({ ...editingService, desc: e.target.value })}
                        rows="2"
                        required
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.editorActions}>
                      <button type="submit" className="btn-primary">
                        Save Service
                      </button>
                      <button type="button" className="btn-secondary" onClick={() => setEditingService(null)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB: CAREERS & JOB APPLICATIONS */}
            {activeTab === 'careers' && (
              <div className={styles.tabContent}>
                <div className={styles.topActions}>
                  <div className={styles.sectionHeading}>
                    <span>Careers</span>
                    <h3>Manage job posts</h3>
                    <p>Add, edit, reorder, or remove the roles shown on the public Careers page.</p>
                  </div>
                  <button type="button" className={styles.addButton} onClick={startNewJob}>
                    <Plus size={17} aria-hidden="true" />
                    Add job post
                  </button>
                </div>

                <div className={styles.jobWorkspace}>
                  <div className={styles.jobPostingList} aria-label="Live job posts">
                    {jobPostings?.length > 0 ? (
                      jobPostings.map((job, index) => (
                        <article
                          key={job.id}
                          className={`${styles.jobRow} ${editingJob?.id === job.id ? styles.selectedProject : ''}`}
                        >
                          <div className={styles.jobAvatar} aria-hidden="true">
                            {(job.icon || job.department || 'JB').slice(0, 2).toUpperCase()}
                          </div>
                          <div className={styles.jobSummaryAdmin}>
                            <span>
                              {String(index + 1).padStart(2, '0')} / {job.department || 'Department'} / {job.type || 'Type'}
                            </span>
                            <h4>{job.title}</h4>
                            <p>{job.location} / {job.experience}</p>
                          </div>
                          <div className={styles.projectActions}>
                            <button
                              type="button"
                              onClick={() => moveJobPosting(job.id, -1)}
                              disabled={index === 0}
                              aria-label={`Move ${job.title} up`}
                              title="Move up"
                            >
                              <ChevronUp size={16} aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveJobPosting(job.id, 1)}
                              disabled={index === jobPostings.length - 1}
                              aria-label={`Move ${job.title} down`}
                              title="Move down"
                            >
                              <ChevronDown size={16} aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingJob({ ...job, requirements: job.requirements || [] })}
                              aria-label={`Edit ${job.title}`}
                              title="Edit job post"
                            >
                              <Pencil size={16} aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              className={styles.dangerAction}
                              onClick={() => handleDeleteJob(job)}
                              aria-label={`Delete ${job.title}`}
                              title="Delete job post"
                            >
                              <Trash2 size={16} aria-hidden="true" />
                            </button>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className={styles.emptyEditor}>
                        <BriefcaseBusiness size={34} aria-hidden="true" />
                        <h4>No live job posts</h4>
                        <p>Add a role when hiring opens again.</p>
                        <button type="button" className={styles.addButton} onClick={startNewJob}>
                          <Plus size={17} aria-hidden="true" /> Add job post
                        </button>
                      </div>
                    )}
                  </div>

                  <div className={styles.jobEditorPanel}>
                    {editingJob ? (
                      <JobEditor
                        key={editingJob.id || 'new-job'}
                        job={editingJob}
                        onChange={setEditingJob}
                        onSave={handleSaveJob}
                        onCancel={() => setEditingJob(null)}
                      />
                    ) : (
                      <div className={styles.emptyEditor}>
                        <BriefcaseBusiness size={34} aria-hidden="true" />
                        <h4>Select a job post to edit</h4>
                        <p>Choose Edit on a role or create a new opening.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.applicationsSection}>
                <div className={styles.topActions}>
                  <h3>Candidate Job Applications</h3>
                  {jobApplications?.length > 0 && (
                    <button
                      className={styles.deleteBtn}
                      onClick={() => {
                        if (window.confirm('Clear all received candidate applications?')) {
                          clearJobApplications();
                        }
                      }}
                    >
                      Clear All Applications
                    </button>
                  )}
                </div>

                {!jobApplications || jobApplications.length === 0 ? (
                  <div style={{ padding: '36px 0', textAlign: 'center', color: '#64748B' }}>
                    No candidate job applications received yet.
                  </div>
                ) : (
                  <div className={styles.itemList}>
                    {jobApplications.map((app, idx) => (
                      <div
                        key={app.id || idx}
                        className={styles.itemRow}
                        style={{ flexDirection: 'column', alignItems: 'stretch', gap: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                          <div>
                            <span style={{ background: 'rgba(255, 255, 255, 0.6)', color: 'var(--accent-gold-bright)', border: '1px solid #5996FF', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800 }}>
                              {app.jobTitle || 'General Application'}
                            </span>
                            <strong style={{ fontSize: '1.1rem', marginLeft: '10px', color: '#0F172A' }}>{app.name}</strong>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                            {app.timestamp ? new Date(app.timestamp).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: '#475569', flexWrap: 'wrap' }}>
                          <div>📧 <strong>Email:</strong> <a href={`mailto:${app.email}`} style={{ color: 'var(--accent-gold)' }}>{app.email}</a></div>
                          {app.phone && <div>📞 <strong>Phone:</strong> {app.phone}</div>}
                          {app.portfolio && (
                            <div>🌐 <strong>Portfolio/GitHub:</strong> <a href={app.portfolio} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-gold)' }}>{app.portfolio}</a></div>
                          )}
                        </div>

                        {app.coverLetter && (
                          <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '12px 16px', borderRadius: '10px', fontSize: '0.88rem', color: '#334155' }}>
                            <strong style={{ color: 'var(--accent-gold-bright)' }}>Cover Letter / Pitch:</strong> {app.coverLetter}
                          </div>
                        )}

                        <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                          <button
                            className={styles.deleteBtn}
                            onClick={() => deleteJobApplication(app.id)}
                          >
                            Delete Application
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                </div>
              </div>
            )}

            {/* TAB 3: TESTIMONIALS MANAGEMENT */}
            {activeTab === 'testimonials' && (
              <div className={styles.tabContent}>
                <div className={styles.topActions}>
                  <h3>Manage Client Testimonials</h3>
                  <button
                    className="btn-primary"
                    onClick={() =>
                      setEditingTestimonial({
                        id: '',
                        name: '',
                        role: '',
                        company: '',
                        avatar: '✦',
                        text: '',
                        rating: 5,
                      })
                    }
                  >
                    + Add Testimonial
                  </button>
                </div>


                <div className={styles.itemList}>
                  {testimonials.map((t) => (
                    <div key={t.id} className={styles.itemRow}>
                      <div className={styles.itemDetails}>
                        <span className={styles.itemTag}>
                          {'★'.repeat(t.rating)} — {t.role}, {t.company}
                        </span>
                        <h4>{t.name}</h4>
                        <p>"{t.text}"</p>
                      </div>
                      <div className={styles.itemBtnGroup}>
                        <button className={styles.editBtn} onClick={() => setEditingTestimonial(t)}>
                          Edit
                        </button>
                        <button className={styles.deleteBtn} onClick={() => deleteTestimonial(t.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {editingTestimonial && (
                  <form
                    className={styles.editorBox}
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (editingTestimonial.id) {
                        updateTestimonial(editingTestimonial.id, editingTestimonial);
                      } else {
                        addTestimonial(editingTestimonial);
                      }
                      setEditingTestimonial(null);
                    }}
                  >
                    <h4>{editingTestimonial.id ? 'Edit Testimonial' : 'New Testimonial'}</h4>
                    <div className={styles.formGrid}>
                      <input
                        type="text"
                        placeholder="Client Name"
                        value={editingTestimonial.name}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                        required
                        className={styles.input}
                      />
                      <input
                        type="text"
                        placeholder="Role / Title"
                        value={editingTestimonial.role}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                        required
                        className={styles.input}
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={editingTestimonial.company}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                        required
                        className={styles.input}
                      />
                      <textarea
                        placeholder="Review Text"
                        value={editingTestimonial.text}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, text: e.target.value })}
                        rows="2"
                        required
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.editorActions}>
                      <button type="submit" className="btn-primary">
                        Save Testimonial
                      </button>
                      <button type="button" className="btn-secondary" onClick={() => setEditingTestimonial(null)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 4: SITE CONTENT */}
            {activeTab === 'content' && (
              <form className={styles.tabContent} onSubmit={handleSaveContent}>
                <h3>Live Site Copy & Brand Details</h3>
                <div className={styles.formGrid}>
                  <div className={styles.fieldGroup}>
                    <label>Agency Name</label>
                    <input
                      type="text"
                      value={contentForm.agencyName || ''}
                      onChange={(e) => setContentForm({ ...contentForm, agencyName: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Hero Badge Eyebrow</label>
                    <input
                      type="text"
                      value={contentForm.heroEyebrow || ''}
                      onChange={(e) => setContentForm({ ...contentForm, heroEyebrow: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Hero Headline / Tagline</label>
                    <input
                      type="text"
                      value={contentForm.heroHeadline || ''}
                      onChange={(e) => setContentForm({ ...contentForm, heroHeadline: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Contact Email</label>
                    <input
                      type="text"
                      value={contentForm.contactEmail || ''}
                      onChange={(e) => setContentForm({ ...contentForm, contactEmail: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Contact Location</label>
                    <input
                      type="text"
                      value={contentForm.contactLocation || ''}
                      onChange={(e) => setContentForm({ ...contentForm, contactLocation: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Hero Primary CTA Button</label>
                    <input
                      type="text"
                      value={contentForm.heroPrimaryCta || ''}
                      onChange={(e) => setContentForm({ ...contentForm, heroPrimaryCta: e.target.value })}
                      placeholder="Start a Conversation"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Hero Secondary CTA Button</label>
                    <input
                      type="text"
                      value={contentForm.heroSecondaryCta || ''}
                      onChange={(e) => setContentForm({ ...contentForm, heroSecondaryCta: e.target.value })}
                      placeholder="Explore Our Services"
                      className={styles.input}
                    />
                  </div>
                  <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                    <label>Hero Subtext</label>
                    <textarea
                      rows="3"
                      value={contentForm.heroSubtext || ''}
                      onChange={(e) => setContentForm({ ...contentForm, heroSubtext: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.editorActions} style={{ marginTop: '20px' }}>
                  <button type="submit" className="btn-primary">
                    Save Live Changes
                  </button>
                  <button type="button" className={styles.resetBtn} onClick={resetAllData}>
                    Reset to Defaults
                  </button>
                </div>
              </form>
            )}
          </div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
