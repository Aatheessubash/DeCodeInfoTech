import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useData } from '../../context/DataContext';
import styles from './AdminDashboard.module.css';

export function AdminDashboard() {
  const {
    projects,
    services,
    testimonials,
    siteContent,
    isAdminOpen,
    setIsAdminOpen,
    addProject,
    updateProject,
    deleteProject,
    addService,
    updateService,
    deleteService,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    updateSiteContent,
    resetAllData,
    jobApplications,
    deleteJobApplication,
    clearJobApplications,
  } = useData();

  const [activeTab, setActiveTab] = useState('projects');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');

  // Editing state
  const [editingProject, setEditingProject] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [contentForm, setContentForm] = useState(siteContent);

  if (!isAdminOpen) return null;

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

  const modalContent = (
    <div className={styles.backdrop} onClick={() => setIsAdminOpen(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <span className={styles.badge}>✦ ADMIN CMS</span>
            <h2>DeCode Studio Control Panel</h2>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsAdminOpen(false)}>
            ✕
          </button>
        </div>

        {!isAuthenticated ? (
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <h3>Admin Passkey Authentication</h3>
            <p>Enter the passkey to manage projects, services, careers, and live website content.</p>
            <input
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
              <button
                className={`${styles.tabBtn} ${activeTab === 'projects' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                💼 Projects ({projects.length})
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'services' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('services')}
              >
                ⚡ Services ({services.length})
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'careers' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('careers')}
              >
                🚀 Careers ({jobApplications?.length || 0})
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'testimonials' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('testimonials')}
              >
                💬 Testimonials ({testimonials.length})
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'content' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('content')}
              >
                📝 Site Content
              </button>
            </div>

            {/* TAB 1: PROJECTS MANAGEMENT */}
            {activeTab === 'projects' && (
              <div className={styles.tabContent}>
                <div className={styles.topActions}>
                  <h3>Manage Portfolio Projects</h3>
                  <button
                    className="btn-primary"
                    onClick={() =>
                      setEditingProject({
                        id: '',
                        title: '',
                        category: 'Web Application',
                        image: '/assets/project-lms.jpg',
                        problem: '',
                        solution: '',
                        tech: ['React.js', 'Vite'],
                      })
                    }
                  >
                    + Add New Project
                  </button>
                </div>

                <div className={styles.itemList}>
                  {projects.map((p) => (
                    <div key={p.id} className={styles.itemRow}>
                      <img src={p.image} alt={p.title} className={styles.itemThumb} />
                      <div className={styles.itemDetails}>
                        <span className={styles.itemTag}>{p.category}</span>
                        <h4>{p.title}</h4>
                        <p>{p.problem.substring(0, 70)}...</p>
                      </div>
                      <div className={styles.itemBtnGroup}>
                        <button className={styles.editBtn} onClick={() => setEditingProject(p)}>
                          Edit
                        </button>
                        <button className={styles.deleteBtn} onClick={() => deleteProject(p.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {editingProject && (
                  <form
                    className={styles.editorBox}
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (editingProject.id) {
                        updateProject(editingProject.id, editingProject);
                      } else {
                        addProject(editingProject);
                      }
                      setEditingProject(null);
                    }}
                  >
                    <h4>{editingProject.id ? 'Edit Project' : 'New Project'}</h4>
                    <div className={styles.formGrid}>
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        required
                        className={styles.input}
                      />
                      <input
                        type="text"
                        placeholder="Category"
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                        required
                        className={styles.input}
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={editingProject.image}
                        onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                        required
                        className={styles.input}
                      />
                      <textarea
                        placeholder="The Challenge / Problem"
                        value={editingProject.problem}
                        onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                        rows="2"
                        required
                        className={styles.input}
                      />
                      <textarea
                        placeholder="The Solution"
                        value={editingProject.solution}
                        onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                        rows="2"
                        required
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.editorActions}>
                      <button type="submit" className="btn-primary">
                        Save Project
                      </button>
                      <button type="button" className="btn-secondary" onClick={() => setEditingProject(null)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
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
                            <span style={{ background: '#E0F2FE', color: '#0284C7', border: '1px solid #BAE6FD', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800 }}>
                              {app.jobTitle || 'General Application'}
                            </span>
                            <strong style={{ fontSize: '1.1rem', marginLeft: '10px', color: '#0F172A' }}>{app.name}</strong>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                            {app.timestamp ? new Date(app.timestamp).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: '#475569', flexWrap: 'wrap' }}>
                          <div>📧 <strong>Email:</strong> <a href={`mailto:${app.email}`} style={{ color: '#0A66C2' }}>{app.email}</a></div>
                          {app.phone && <div>📞 <strong>Phone:</strong> {app.phone}</div>}
                          {app.portfolio && (
                            <div>🌐 <strong>Portfolio/GitHub:</strong> <a href={app.portfolio} target="_blank" rel="noreferrer" style={{ color: '#0A66C2' }}>{app.portfolio}</a></div>
                          )}
                        </div>

                        {app.coverLetter && (
                          <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '12px 16px', borderRadius: '10px', fontSize: '0.88rem', color: '#334155' }}>
                            <strong style={{ color: '#0284C7' }}>Cover Letter / Pitch:</strong> {app.coverLetter}
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
                      value={contentForm.agencyName}
                      onChange={(e) => setContentForm({ ...contentForm, agencyName: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Hero Badge Eyebrow</label>
                    <input
                      type="text"
                      value={contentForm.heroEyebrow}
                      onChange={(e) => setContentForm({ ...contentForm, heroEyebrow: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Hero Headline</label>
                    <input
                      type="text"
                      value={contentForm.heroHeadline}
                      onChange={(e) => setContentForm({ ...contentForm, heroHeadline: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Contact Email</label>
                    <input
                      type="text"
                      value={contentForm.contactEmail}
                      onChange={(e) => setContentForm({ ...contentForm, contactEmail: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                  <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                    <label>Hero Subtext</label>
                    <textarea
                      rows="3"
                      value={contentForm.heroSubtext}
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
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
