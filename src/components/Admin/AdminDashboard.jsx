'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  BriefcaseBusiness,
  ChevronDown,
  ChevronUp,
  FileText,
  FolderOpen,
  HelpCircle,
  Image as ImageIcon,
  ListOrdered,
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
import { MediaLibrary } from './MediaLibrary';
import { ProjectEditor } from './ProjectEditor';
import styles from './AdminDashboard.module.css';

const ADMIN_TABS = [
  { id: 'projects', label: 'Projects', Icon: BriefcaseBusiness },
  { id: 'services', label: 'Services', Icon: Wrench },
  { id: 'careers', label: 'Careers', Icon: Users },
  { id: 'testimonials', label: 'Testimonials', Icon: MessageSquareQuote },
  { id: 'faqs', label: 'FAQs', Icon: HelpCircle },
  { id: 'standards', label: 'Standards & Process', Icon: ListOrdered },
  { id: 'assets', label: 'Media Library', Icon: ImageIcon },
  { id: 'content', label: 'Site Copy & Media', Icon: FileText },
];

export function AdminDashboard({ onClose }) {
  const {
    projects,
    services,
    testimonials,
    faqs,
    standards,
    processSteps,
    mediaAssets,
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
    addFaq,
    updateFaq,
    deleteFaq,
    moveFaq,
    addStandard,
    updateStandard,
    deleteStandard,
    updateProcessStep,
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Editing state
  const [editingProject, setEditingProject] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editingFaq, setEditingFaq] = useState(null);
  const [editingStandard, setEditingStandard] = useState(null);
  const [editingProcessStep, setEditingProcessStep] = useState(null);
  const [contentForm, setContentForm] = useState(siteContent || {});

  useEffect(() => {
    if (siteContent) {
      setContentForm(siteContent);
    }
  }, [siteContent]);

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

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all site content, projects, and assets to defaults?')) {
      resetAllData();
      alert('All content reset to factory defaults.');
    }
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
            <p>Enter the passkey to manage projects, media assets, FAQs, services, careers, and live website copy.</p>
            <input
              aria-label="Admin passkey"
              type="password"
              placeholder="Enter passkey (default: admin)"
              value={passkeyInput}
              onChange={(e) => setPasskeyInput(e.target.value)}
              className={styles.input}
              autoFocus
            />
            <button type="submit" className="btn-primary">
              Unlock Dashboard
            </button>
          </form>
        ) : (
          <div className={styles.body}>
            {/* Navigation Tabs */}
            <div className={styles.tabs}>
              {ADMIN_TABS.map(({ id, label, Icon }) => {
                const counts = {
                  projects: projects?.length || 0,
                  services: services?.length || 0,
                  careers: jobPostings?.length || 0,
                  testimonials: testimonials?.length || 0,
                  faqs: faqs?.length || 0,
                  standards: (standards?.length || 0) + (processSteps?.length || 0),
                  assets: mediaAssets?.length || 0,
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
                      <p>Edit content, upload optimized screenshots, pick asset paths, and control carousel order.</p>
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
                    <div className={styles.sectionHeading}>
                      <span>Services</span>
                      <h3>Manage Core Capabilities</h3>
                      <p>Define the engineering services and key deliverables displayed on the homepage.</p>
                    </div>
                    <button
                      type="button"
                      className={styles.addButton}
                      onClick={() =>
                        setEditingService({
                          id: '',
                          title: '',
                          desc: '',
                          deliverables: ['Custom Capability 1', 'Custom Capability 2'],
                          icon: '⚡',
                        })
                      }
                    >
                      <Plus size={17} aria-hidden="true" /> Add New Service
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
                          <button type="button" className={styles.editBtn} onClick={() => setEditingService(s)}>
                            Edit
                          </button>
                          <button type="button" className={styles.deleteBtn} onClick={() => deleteService(s.id)}>
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
                        <div className={styles.fieldGroup}>
                          <label>Service Title</label>
                          <input
                            type="text"
                            placeholder="e.g. AI & Full-Stack Solutions"
                            value={editingService.title}
                            onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                            required
                            className={styles.input}
                          />
                        </div>
                        <div className={styles.fieldGroup}>
                          <label>Icon Symbol (e.g. ⚡, ✦, ⚙, 📱, ❖)</label>
                          <input
                            type="text"
                            placeholder="⚡"
                            value={editingService.icon}
                            onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                            required
                            className={styles.input}
                          />
                        </div>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                          <label>Description</label>
                          <textarea
                            placeholder="Describe how this service helps clients scale..."
                            value={editingService.desc}
                            onChange={(e) => setEditingService({ ...editingService, desc: e.target.value })}
                            rows="3"
                            required
                            className={styles.input}
                          />
                        </div>
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

              {/* TAB 3: CAREERS & JOB APPLICATIONS */}
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
                    <div className={styles.topActions} style={{ marginTop: '36px' }}>
                      <div className={styles.sectionHeading}>
                        <span>Candidates</span>
                        <h3>Candidate Applications</h3>
                      </div>
                      {jobApplications?.length > 0 && (
                        <button
                          type="button"
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
                                type="button"
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

              {/* TAB 4: TESTIMONIALS MANAGEMENT */}
              {activeTab === 'testimonials' && (
                <div className={styles.tabContent}>
                  <div className={styles.topActions}>
                    <div className={styles.sectionHeading}>
                      <span>Social Proof</span>
                      <h3>Manage Client Reviews</h3>
                      <p>Showcase real testimonials and feedback from clients and founders.</p>
                    </div>
                    <button
                      type="button"
                      className={styles.addButton}
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
                      <Plus size={17} aria-hidden="true" /> Add Testimonial
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
                          <button type="button" className={styles.editBtn} onClick={() => setEditingTestimonial(t)}>
                            Edit
                          </button>
                          <button type="button" className={styles.deleteBtn} onClick={() => deleteTestimonial(t.id)}>
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
                        <div className={styles.fieldGroup}>
                          <label>Client Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Ramesh Kumar"
                            value={editingTestimonial.name}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                            required
                            className={styles.input}
                          />
                        </div>
                        <div className={styles.fieldGroup}>
                          <label>Role / Designation</label>
                          <input
                            type="text"
                            placeholder="e.g. Founder & CEO"
                            value={editingTestimonial.role}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                            required
                            className={styles.input}
                          />
                        </div>
                        <div className={styles.fieldGroup}>
                          <label>Company / Organization</label>
                          <input
                            type="text"
                            placeholder="e.g. Azhagappar Academy"
                            value={editingTestimonial.company}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                            required
                            className={styles.input}
                          />
                        </div>
                        <div className={styles.fieldGroup}>
                          <label>Star Rating (1 - 5)</label>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={editingTestimonial.rating}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value, 10) || 5 })}
                            required
                            className={styles.input}
                          />
                        </div>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                          <label>Review Text</label>
                          <textarea
                            placeholder="Client quote / feedback..."
                            value={editingTestimonial.text}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, text: e.target.value })}
                            rows="3"
                            required
                            className={styles.input}
                          />
                        </div>
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

              {/* TAB 5: FAQS MANAGEMENT */}
              {activeTab === 'faqs' && (
                <div className={styles.tabContent}>
                  <div className={styles.topActions}>
                    <div className={styles.sectionHeading}>
                      <span>FAQ</span>
                      <h3>Frequently Asked Questions</h3>
                      <p>Manage the dynamic question and answer accordions shown on the live website.</p>
                    </div>
                    <button
                      type="button"
                      className={styles.addButton}
                      onClick={() =>
                        setEditingFaq({
                          id: '',
                          q: '',
                          a: '',
                        })
                      }
                    >
                      <Plus size={17} aria-hidden="true" /> Add New FAQ
                    </button>
                  </div>

                  <div className={styles.itemList}>
                    {(faqs || []).map((faq, index) => (
                      <div key={faq.id || index} className={styles.itemRow}>
                        <div className={styles.itemDetails}>
                          <span className={styles.itemTag}>Question #{index + 1}</span>
                          <h4>{faq.q}</h4>
                          <p>{faq.a}</p>
                        </div>
                        <div className={styles.projectActions}>
                          <button
                            type="button"
                            onClick={() => moveFaq(faq.id, -1)}
                            disabled={index === 0}
                            aria-label="Move FAQ up"
                            title="Move up"
                          >
                            <ChevronUp size={16} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveFaq(faq.id, 1)}
                            disabled={index === faqs.length - 1}
                            aria-label="Move FAQ down"
                            title="Move down"
                          >
                            <ChevronDown size={16} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingFaq({ ...faq })}
                            aria-label="Edit FAQ"
                            title="Edit FAQ"
                          >
                            <Pencil size={16} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className={styles.dangerAction}
                            onClick={() => {
                              if (window.confirm(`Delete FAQ: "${faq.q}"?`)) {
                                deleteFaq(faq.id);
                                if (editingFaq?.id === faq.id) setEditingFaq(null);
                              }
                            }}
                            aria-label="Delete FAQ"
                            title="Delete FAQ"
                          >
                            <Trash2 size={16} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {editingFaq && (
                    <form
                      className={styles.editorBox}
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (editingFaq.id) {
                          updateFaq(editingFaq.id, editingFaq);
                        } else {
                          addFaq(editingFaq);
                        }
                        setEditingFaq(null);
                      }}
                    >
                      <h4>{editingFaq.id ? 'Edit FAQ' : 'New FAQ Item'}</h4>
                      <div className={styles.formGrid}>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                          <label>Question</label>
                          <input
                            type="text"
                            placeholder="e.g. What modern tech stack and frameworks do you use?"
                            value={editingFaq.q}
                            onChange={(e) => setEditingFaq({ ...editingFaq, q: e.target.value })}
                            required
                            className={styles.input}
                          />
                        </div>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                          <label>Detailed Answer</label>
                          <textarea
                            placeholder="Comprehensive answer explaining your engineering or delivery process..."
                            value={editingFaq.a}
                            onChange={(e) => setEditingFaq({ ...editingFaq, a: e.target.value })}
                            rows="4"
                            required
                            className={styles.input}
                          />
                        </div>
                      </div>
                      <div className={styles.editorActions}>
                        <button type="submit" className="btn-primary">
                          Save FAQ
                        </button>
                        <button type="button" className="btn-secondary" onClick={() => setEditingFaq(null)}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 6: STANDARDS & PROCESS MANAGEMENT */}
              {activeTab === 'standards' && (
                <div className={styles.tabContent}>
                  <div className={styles.topActions}>
                    <div className={styles.sectionHeading}>
                      <span>Engineering Standards</span>
                      <h3>Quality Standards &amp; Process Steps</h3>
                      <p>Customize the six core foundation pillars and roadmap steps displayed across the site.</p>
                    </div>
                    <button
                      type="button"
                      className={styles.addButton}
                      onClick={() =>
                        setEditingStandard({
                          id: '',
                          title: '',
                          desc: '',
                          icon: 'MessageSquare',
                        })
                      }
                    >
                      <Plus size={17} aria-hidden="true" /> Add Standard Pillar
                    </button>
                  </div>

                  <h4 style={{ margin: '20px 0 12px', color: '#111C31', fontSize: '1.05rem', fontWeight: 800 }}>Core Standards Pillars</h4>
                  <div className={styles.itemList}>
                    {(standards || []).map((std) => (
                      <div key={std.id} className={styles.itemRow}>
                        <div className={styles.itemDetails}>
                          <span className={styles.itemTag}>Standard #{std.id} · Icon: {std.icon}</span>
                          <h4>{std.title}</h4>
                          <p>{std.desc}</p>
                        </div>
                        <div className={styles.itemBtnGroup}>
                          <button type="button" className={styles.editBtn} onClick={() => setEditingStandard(std)}>
                            Edit
                          </button>
                          <button
                            type="button"
                            className={styles.deleteBtn}
                            onClick={() => {
                              if (window.confirm(`Delete standard pillar: "${std.title}"?`)) {
                                deleteStandard(std.id);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {editingStandard && (
                    <form
                      className={styles.editorBox}
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (editingStandard.id) {
                          updateStandard(editingStandard.id, editingStandard);
                        } else {
                          addStandard(editingStandard);
                        }
                        setEditingStandard(null);
                      }}
                    >
                      <h4>{editingStandard.id ? 'Edit Standard Pillar' : 'New Standard Pillar'}</h4>
                      <div className={styles.formGrid}>
                        <div className={styles.fieldGroup}>
                          <label>Pillar Title</label>
                          <input
                            type="text"
                            placeholder="e.g. Clean, Maintainable Code"
                            value={editingStandard.title}
                            onChange={(e) => setEditingStandard({ ...editingStandard, title: e.target.value })}
                            required
                            className={styles.input}
                          />
                        </div>
                        <div className={styles.fieldGroup}>
                          <label>Icon Identifier (e.g. MessageSquare, Code2, Zap, Target, Handshake, ScanEye)</label>
                          <input
                            type="text"
                            placeholder="Code2"
                            value={editingStandard.icon}
                            onChange={(e) => setEditingStandard({ ...editingStandard, icon: e.target.value })}
                            required
                            className={styles.input}
                          />
                        </div>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                          <label>Description</label>
                          <textarea
                            placeholder="Describe this engineering standard..."
                            value={editingStandard.desc}
                            onChange={(e) => setEditingStandard({ ...editingStandard, desc: e.target.value })}
                            rows="3"
                            required
                            className={styles.input}
                          />
                        </div>
                      </div>
                      <div className={styles.editorActions}>
                        <button type="submit" className="btn-primary">
                          Save Pillar
                        </button>
                        <button type="button" className="btn-secondary" onClick={() => setEditingStandard(null)}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  <h4 style={{ margin: '36px 0 12px', color: '#111C31', fontSize: '1.05rem', fontWeight: 800 }}>Process Roadmap Steps</h4>
                  <div className={styles.itemList}>
                    {(processSteps || []).map((step) => (
                      <div key={step.number} className={styles.itemRow}>
                        <div className={styles.itemDetails}>
                          <span className={styles.itemTag}>Step {step.number} · {step.tag}</span>
                          <h4>{step.title}</h4>
                          <p>{step.desc}</p>
                        </div>
                        <div className={styles.itemBtnGroup}>
                          <button
                            type="button"
                            className={styles.editBtn}
                            onClick={() =>
                              setEditingProcessStep({
                                ...step,
                                tagsString: (step.tags || []).join(', '),
                              })
                            }
                          >
                            Edit Step
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {editingProcessStep && (
                    <form
                      className={styles.editorBox}
                      onSubmit={(e) => {
                        e.preventDefault();
                        const tags = (editingProcessStep.tagsString || '')
                          .split(',')
                          .map((t) => t.trim())
                          .filter(Boolean);
                        updateProcessStep(editingProcessStep.number, {
                          title: editingProcessStep.title,
                          tag: editingProcessStep.tag,
                          desc: editingProcessStep.desc,
                          icon: editingProcessStep.icon,
                          tags,
                        });
                        setEditingProcessStep(null);
                      }}
                    >
                      <h4>Edit Process Step {editingProcessStep.number}</h4>
                      <div className={styles.formGrid}>
                        <div className={styles.fieldGroup}>
                          <label>Step Title</label>
                          <input
                            type="text"
                            value={editingProcessStep.title}
                            onChange={(e) => setEditingProcessStep({ ...editingProcessStep, title: e.target.value })}
                            required
                            className={styles.input}
                          />
                        </div>
                        <div className={styles.fieldGroup}>
                          <label>Step Category Tag</label>
                          <input
                            type="text"
                            value={editingProcessStep.tag}
                            onChange={(e) => setEditingProcessStep({ ...editingProcessStep, tag: e.target.value })}
                            required
                            className={styles.input}
                          />
                        </div>
                        <div className={styles.fieldGroup}>
                          <label>Icon Identifier (e.g. Compass, Layers, Palette, Code2, ShieldCheck, Rocket)</label>
                          <input
                            type="text"
                            value={editingProcessStep.icon}
                            onChange={(e) => setEditingProcessStep({ ...editingProcessStep, icon: e.target.value })}
                            required
                            className={styles.input}
                          />
                        </div>
                        <div className={styles.fieldGroup}>
                          <label>Keywords / Tags (comma separated)</label>
                          <input
                            type="text"
                            value={editingProcessStep.tagsString}
                            onChange={(e) => setEditingProcessStep({ ...editingProcessStep, tagsString: e.target.value })}
                            placeholder="Frontend, Backend"
                            className={styles.input}
                          />
                        </div>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                          <label>Step Description</label>
                          <textarea
                            value={editingProcessStep.desc}
                            onChange={(e) => setEditingProcessStep({ ...editingProcessStep, desc: e.target.value })}
                            rows="2"
                            required
                            className={styles.input}
                          />
                        </div>
                      </div>
                      <div className={styles.editorActions}>
                        <button type="submit" className="btn-primary">
                          Save Process Step
                        </button>
                        <button type="button" className="btn-secondary" onClick={() => setEditingProcessStep(null)}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 7: MEDIA ASSETS LIBRARY */}
              {activeTab === 'assets' && (
                <div className={styles.tabContent}>
                  <MediaLibrary />
                </div>
              )}

              {/* TAB 8: SITE COPY & MEDIA CONTENT */}
              {activeTab === 'content' && (
                <form className={styles.tabContent} onSubmit={handleSaveContent}>
                  <div className={styles.topActions}>
                    <div className={styles.sectionHeading}>
                      <span>Live Site Copy</span>
                      <h3>Website Content &amp; Media Manager</h3>
                      <p>Update live headers, text copy, video links, team photos, and brand parameters.</p>
                    </div>
                  </div>

                  <div className={styles.formGrid}>
                    {/* Brand & Header Section */}
                    <div className={styles.sectionDivider}>
                      <h4>🌟 Brand &amp; General Details</h4>
                      <p>Global agency name, header logo, and primary contact coordinates.</p>
                    </div>
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
                      <label>Brand Logo Path / URL</label>
                      <input
                        type="text"
                        value={contentForm.logoUrl || ''}
                        onChange={(e) => setContentForm({ ...contentForm, logoUrl: e.target.value })}
                        placeholder="/DeCode_Logo.png"
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label>Contact Email Address</label>
                      <input
                        type="email"
                        value={contentForm.contactEmail || ''}
                        onChange={(e) => setContentForm({ ...contentForm, contactEmail: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label>Contact Phone Number</label>
                      <input
                        type="text"
                        value={contentForm.contactPhone || ''}
                        onChange={(e) => setContentForm({ ...contentForm, contactPhone: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                    <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                      <label>Office Location</label>
                      <input
                        type="text"
                        value={contentForm.contactLocation || ''}
                        onChange={(e) => setContentForm({ ...contentForm, contactLocation: e.target.value })}
                        className={styles.input}
                      />
                    </div>

                    {/* Hero Section */}
                    <div className={styles.sectionDivider}>
                      <h4>🎬 Hero Section</h4>
                      <p>Top landing banner headline, background video, and call-to-action buttons.</p>
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
                      <label>Hero Background Video URL / Asset Path</label>
                      <input
                        type="text"
                        value={contentForm.heroVideoUrl || ''}
                        onChange={(e) => setContentForm({ ...contentForm, heroVideoUrl: e.target.value })}
                        placeholder="/sample.mp4"
                        className={styles.input}
                      />
                    </div>
                    <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                      <label>Hero Headline / Main Tagline</label>
                      <input
                        type="text"
                        value={contentForm.heroHeadline || ''}
                        onChange={(e) => setContentForm({ ...contentForm, heroHeadline: e.target.value })}
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
                    <div className={styles.fieldGroup}>
                      <label>Primary CTA Button Label</label>
                      <input
                        type="text"
                        value={contentForm.heroPrimaryCta || ''}
                        onChange={(e) => setContentForm({ ...contentForm, heroPrimaryCta: e.target.value })}
                        placeholder="Start A Project"
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label>Secondary CTA Button Label</label>
                      <input
                        type="text"
                        value={contentForm.heroSecondaryCta || ''}
                        onChange={(e) => setContentForm({ ...contentForm, heroSecondaryCta: e.target.value })}
                        placeholder="Explore our services"
                        className={styles.input}
                      />
                    </div>

                    {/* Who We Are (About Us) Section */}
                    <div className={styles.sectionDivider}>
                      <h4>📖 Who We Are (About Section)</h4>
                      <p>Company story, description paragraphs, workspace photo, and floating caption.</p>
                    </div>
                    <div className={styles.fieldGroup}>
                      <label>About Heading</label>
                      <input
                        type="text"
                        value={contentForm.aboutHeading || ''}
                        onChange={(e) => setContentForm({ ...contentForm, aboutHeading: e.target.value })}
                        placeholder="Building what’s next."
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label>About Lead Subheading</label>
                      <input
                        type="text"
                        value={contentForm.aboutLead || ''}
                        onChange={(e) => setContentForm({ ...contentForm, aboutLead: e.target.value })}
                        placeholder="We turn complex challenges into intelligent digital solutions."
                        className={styles.input}
                      />
                    </div>
                    <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                      <label>About Description Paragraph 1</label>
                      <textarea
                        rows="2"
                        value={contentForm.aboutDesc1 || ''}
                        onChange={(e) => setContentForm({ ...contentForm, aboutDesc1: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                    <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                      <label>About Description Paragraph 2</label>
                      <textarea
                        rows="2"
                        value={contentForm.aboutDesc2 || ''}
                        onChange={(e) => setContentForm({ ...contentForm, aboutDesc2: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label>About Image Asset Path / URL</label>
                      <input
                        type="text"
                        value={contentForm.aboutImage || ''}
                        onChange={(e) => setContentForm({ ...contentForm, aboutImage: e.target.value })}
                        placeholder="/assets/who-we-are.jpg"
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label>About Image Caption</label>
                      <input
                        type="text"
                        value={contentForm.aboutCaption || ''}
                        onChange={(e) => setContentForm({ ...contentForm, aboutCaption: e.target.value })}
                        placeholder="Built to evolve. Designed for what’s next."
                        className={styles.input}
                      />
                    </div>

                    {/* Standards & Process Headings */}
                    <div className={styles.sectionDivider}>
                      <h4>🏆 Standards &amp; Process Section Headings</h4>
                      <p>Section title and subtitle text for Engineering Standards and Process Roadmap.</p>
                    </div>
                    <div className={styles.fieldGroup}>
                      <label>Standards Section Heading</label>
                      <input
                        type="text"
                        value={contentForm.standardsHeading || ''}
                        onChange={(e) => setContentForm({ ...contentForm, standardsHeading: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label>Standards Subtitle Text</label>
                      <input
                        type="text"
                        value={contentForm.standardsSubheading || ''}
                        onChange={(e) => setContentForm({ ...contentForm, standardsSubheading: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label>Process Section Heading</label>
                      <input
                        type="text"
                        value={contentForm.processHeading || ''}
                        onChange={(e) => setContentForm({ ...contentForm, processHeading: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label>Process Subtitle Text</label>
                      <input
                        type="text"
                        value={contentForm.processSubheading || ''}
                        onChange={(e) => setContentForm({ ...contentForm, processSubheading: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                    <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                      <label>Process Bottom Banner Closing Text</label>
                      <input
                        type="text"
                        value={contentForm.processClosingText || ''}
                        onChange={(e) => setContentForm({ ...contentForm, processClosingText: e.target.value })}
                        placeholder="Your idea. A clear path forward."
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.editorActions} style={{ marginTop: '24px' }}>
                    <button type="submit" className="btn-primary">
                      Save Live Changes
                    </button>
                    <button type="button" className={styles.resetBtn} onClick={handleResetData}>
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

  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(modalContent, document.body);
}
