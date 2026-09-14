'use client';

import React, { useState } from 'react';
import {
  Check,
  Copy,
  FolderOpen,
  Image as ImageIcon,
  Plus,
  Search,
  Trash2,
  UploadCloud,
  Video,
} from 'lucide-react';
import { useData } from '../../context/useData';
import { formatFileSize, optimizeProjectImage } from '../../utils/optimizeImage';
import styles from './MediaLibrary.module.css';

const CATEGORIES = ['All', 'Portfolio', 'Backgrounds & Video', 'About & Team', 'Branding', 'Custom Uploads'];

export function MediaLibrary({ onSelectAsset }) {
  const { mediaAssets, addMediaAsset, deleteMediaAsset } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [showUploader, setShowUploader] = useState(false);
  const [uploadName, setUploadName] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Portfolio');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const filteredAssets = (mediaAssets || []).filter((asset) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Custom Uploads' ? asset.isCustom : asset.category === selectedCategory);
    const matchesQuery =
      searchQuery.trim() === '' ||
      asset.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.path?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleCopy = (path, id) => {
    navigator.clipboard.writeText(path);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    try {
      if (file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = () => {
          addMediaAsset({
            name: uploadName.trim() || file.name,
            path: reader.result,
            type: 'video',
            category: uploadCategory,
            dimensions: 'Video File',
          });
          setUploading(false);
          setShowUploader(false);
          setUploadName('');
        };
        reader.readAsDataURL(file);
      } else {
        const result = await optimizeProjectImage(file);
        addMediaAsset({
          name: uploadName.trim() || file.name.replace(/\.[^/.]+$/, ''),
          path: result.dataUrl,
          type: 'image',
          category: uploadCategory,
          dimensions: `${result.width} × ${result.height} (${formatFileSize(result.size)})`,
        });
        setUploading(false);
        setShowUploader(false);
        setUploadName('');
      }
    } catch (err) {
      setUploadError(err.message || 'Failed to process media file.');
      setUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.topActions}>
        <div className={styles.sectionHeading}>
          <span>Asset Manager</span>
          <h3>Project Media &amp; Assets Library</h3>
          <p>Browse all site screenshots, brand logos, and video backgrounds. Copy paths or upload new assets.</p>
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => setShowUploader((prev) => !prev)}
        >
          <Plus size={17} aria-hidden="true" />
          {showUploader ? 'Close Uploader' : 'Upload Asset'}
        </button>
      </div>

      {/* Upload Panel */}
      {showUploader && (
        <div className={styles.uploaderBox}>
          <h4>Upload New Media Asset</h4>
          <div className={styles.uploaderGrid}>
            <div>
              <label className={styles.fieldLabel}>Asset Name / Title</label>
              <input
                type="text"
                placeholder="e.g. Fintech Dashboard Mockup"
                value={uploadName}
                onChange={(e) => setUploadName(e.target.value)}
                className={styles.input}
              />
            </div>
            <div>
              <label className={styles.fieldLabel}>Category</label>
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className={styles.select}
              >
                <option value="Portfolio">Portfolio</option>
                <option value="Backgrounds & Video">Backgrounds &amp; Video</option>
                <option value="About & Team">About &amp; Team</option>
                <option value="Branding">Branding</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          <label className={styles.dropzone}>
            <UploadCloud size={32} className={styles.uploadIcon} aria-hidden="true" />
            <span>Click to select an Image or Video (PNG, JPG, WebP, MP4)</span>
            <input
              type="file"
              accept="image/*,video/mp4"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              disabled={uploading}
            />
          </label>

          {uploading && <p className={styles.uploadMsg}>Processing &amp; optimizing media...</p>}
          {uploadError && <p className={styles.uploadErr}>{uploadError}</p>}
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.searchBox}>
          <Search size={16} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search by file name, path, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.categoryPills}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.pillBtn} ${selectedCategory === cat ? styles.activePill : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asset Grid */}
      {filteredAssets.length === 0 ? (
        <div className={styles.emptyState}>
          <FolderOpen size={40} aria-hidden="true" />
          <h4>No assets found</h4>
          <p>Try adjusting your search query or category filter.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredAssets.map((asset) => {
            const isCopied = copiedId === asset.id;
            return (
              <div key={asset.id} className={styles.assetCard}>
                <div className={styles.previewContainer}>
                  {asset.type === 'video' ? (
                    <video
                      src={asset.path}
                      className={styles.mediaPreview}
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <img
                      src={asset.path}
                      alt={asset.name}
                      className={styles.mediaPreview}
                      loading="lazy"
                    />
                  )}
                  <span className={styles.typeBadge}>
                    {asset.type === 'video' ? <Video size={12} /> : <ImageIcon size={12} />}
                    {asset.category}
                  </span>
                </div>

                <div className={styles.assetInfo}>
                  <h4 className={styles.assetName} title={asset.name}>
                    {asset.name}
                  </h4>
                  <div className={styles.assetMeta}>
                    <code className={styles.pathCode} title={asset.path}>
                      {asset.path.length > 34 ? `${asset.path.slice(0, 32)}…` : asset.path}
                    </code>
                    {asset.dimensions && <span className={styles.dimensions}>{asset.dimensions}</span>}
                  </div>

                  <div className={styles.cardActions}>
                    <button
                      type="button"
                      className={`${styles.copyBtn} ${isCopied ? styles.copied : ''}`}
                      onClick={() => handleCopy(asset.path, asset.id)}
                      title="Copy asset path to clipboard"
                    >
                      {isCopied ? (
                        <>
                          <Check size={14} aria-hidden="true" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} aria-hidden="true" /> Copy Path
                        </>
                      )}
                    </button>

                    {onSelectAsset && (
                      <button
                        type="button"
                        className={styles.selectBtn}
                        onClick={() => onSelectAsset(asset.path)}
                      >
                        Use Asset
                      </button>
                    )}

                    {asset.isCustom && (
                      <button
                        type="button"
                        className={styles.deleteAssetBtn}
                        onClick={() => deleteMediaAsset(asset.id)}
                        title="Delete custom uploaded asset"
                      >
                        <Trash2 size={14} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MediaLibrary;
