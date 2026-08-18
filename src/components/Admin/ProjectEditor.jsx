import React, { useId, useState } from 'react';
import { Image as ImageIcon, Link2, Save, UploadCloud, X } from 'lucide-react';
import { formatFileSize, optimizeProjectImage } from '../../utils/optimizeImage';
import styles from './ProjectEditor.module.css';

export function ProjectEditor({ project, onChange, onSave, onCancel }) {
  const uploadId = useId();
  const [imageUrl, setImageUrl] = useState(
    project.image?.startsWith('data:') ? '' : project.image || '',
  );
  const [techInput, setTechInput] = useState(project.tech?.join(', ') || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadError, setUploadError] = useState('');

  const update = (field, value) => onChange({ ...project, [field]: value });

  const handleImage = async (file) => {
    if (!file) return;

    setIsProcessing(true);
    setUploadError('');
    setUploadMessage('Optimizing screenshot…');

    try {
      const result = await optimizeProjectImage(file);
      onChange({ ...project, image: result.dataUrl });
      setImageUrl('');
      setUploadMessage(
        `Ready · ${result.width} × ${result.height} · ${formatFileSize(result.size)} WebP`,
      );
    } catch (error) {
      setUploadMessage('');
      setUploadError(error.message || 'Image upload failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!project.image) {
      setUploadError('Upload a screenshot or enter an image URL.');
      return;
    }
    onSave(project);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleImage(event.dataTransfer.files?.[0]);
  };

  return (
    <form className={styles.editor} onSubmit={handleSubmit}>
      <div className={styles.editorHeader}>
        <div>
          <span className={styles.eyebrow}>{project.id ? 'Editing project' : 'New project'}</span>
          <h4>{project.id ? project.title : 'Add portfolio project'}</h4>
        </div>
        <button type="button" className={styles.closeButton} onClick={onCancel} aria-label="Close editor">
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.editorGrid}>
        <div className={styles.formFields}>
          <div className={styles.twoColumns}>
            <label className={styles.field}>
              <span>Project title</span>
              <input
                type="text"
                value={project.title}
                onChange={(event) => update('title', event.target.value)}
                placeholder="Azhagappar Academy"
                required
              />
            </label>

            <label className={styles.field}>
              <span>Category</span>
              <input
                type="text"
                value={project.category}
                onChange={(event) => update('category', event.target.value)}
                placeholder="EdTech / Video Learning"
                required
              />
            </label>
          </div>

          <label className={styles.field}>
            <span>Live website URL</span>
            <div className={styles.inputWithIcon}>
              <Link2 size={17} aria-hidden="true" />
              <input
                type="url"
                value={project.url || ''}
                onChange={(event) => update('url', event.target.value)}
                placeholder="https://example.com"
                required
              />
            </div>
          </label>

          <label className={styles.field}>
            <span>Short description</span>
            <textarea
              value={project.problem}
              onChange={(event) => update('problem', event.target.value)}
              placeholder="One concise paragraph describing the project and its value."
              rows="4"
              maxLength="260"
              required
            />
            <small>{project.problem.length}/260 characters</small>
          </label>

          <label className={styles.field}>
            <span>Technology tags</span>
            <input
              type="text"
              value={techInput}
              onChange={(event) => {
                setTechInput(event.target.value);
                update(
                  'tech',
                  event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean),
                );
              }}
              placeholder="React, Node.js, PostgreSQL"
            />
            <small>Separate tags with commas.</small>
          </label>

          <label className={styles.field}>
            <span>Internal solution note</span>
            <textarea
              value={project.solution || ''}
              onChange={(event) => update('solution', event.target.value)}
              placeholder="Optional internal summary for future case-study content."
              rows="3"
            />
          </label>
        </div>

        <aside className={styles.mediaPanel}>
          <div className={styles.preview}>
            {project.image ? (
              <img src={project.image} alt="Current project preview" />
            ) : (
              <div className={styles.emptyPreview}>
                <ImageIcon size={30} aria-hidden="true" />
                <span>Project preview</span>
              </div>
            )}
          </div>

          <div
            className={styles.dropZone}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              id={uploadId}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => handleImage(event.target.files?.[0])}
              disabled={isProcessing}
            />
            <label htmlFor={uploadId}>
              <UploadCloud size={22} aria-hidden="true" />
              <strong>{isProcessing ? 'Optimizing…' : 'Upload screenshot'}</strong>
              <span>Drop or choose JPG, PNG, or WebP · max 8 MB</span>
            </label>
          </div>

          <div className={styles.divider}><span>or use a URL</span></div>

          <label className={styles.field}>
            <span>Screenshot URL</span>
            <input
              type="url"
              value={imageUrl}
              onChange={(event) => {
                setImageUrl(event.target.value);
                update('image', event.target.value);
                setUploadError('');
                setUploadMessage('');
              }}
              placeholder="https://…/screenshot.jpg"
            />
          </label>

          <p className={styles.mediaHint}>For the best carousel crop, use a 16:10 landscape screenshot.</p>
          {uploadMessage && <p className={styles.successMessage} role="status">{uploadMessage}</p>}
          {uploadError && <p className={styles.errorMessage} role="alert">{uploadError}</p>}
        </aside>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>Cancel</button>
        <button type="submit" className={styles.saveButton} disabled={isProcessing}>
          <Save size={17} aria-hidden="true" />
          {project.id ? 'Save changes' : 'Add project'}
        </button>
      </div>
    </form>
  );
}
