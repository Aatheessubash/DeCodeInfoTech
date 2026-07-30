import React, { useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import { Results } from '../components/Results/Results';

export function WorkPage() {
  const { projects } = useData();
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!projects) return null;

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div style={{ paddingTop: '140px', minHeight: '100vh' }}>
      <section className="section-padding">
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div className="pill-badge" style={{ marginBottom: '16px' }}>
            <span className="badge-dot"></span>
            Our Portfolio
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text)', marginBottom: '24px' }}>
            Work That Drives Results
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.15rem', maxWidth: '680px', margin: '0 auto 48px auto', lineHeight: 1.6 }}>
            Explore our latest web applications, digital platforms, and design systems engineered for scale.
          </p>

          {/* Filter Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '48px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '99px',
                  border: '1px solid',
                  borderColor: activeFilter === cat ? 'var(--gold)' : 'var(--lav)',
                  backgroundColor: activeFilter === cat ? 'var(--gold)' : 'var(--surface)',
                  color: activeFilter === cat ? '#120331' : 'var(--text)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 200ms ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
            {filteredProjects.map(project => (
              <div 
                key={project.id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--lav)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 300ms ease, box-shadow 300ms ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(212, 175, 55, 0.15)';
                  e.currentTarget.style.borderColor = 'var(--gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--lav)';
                }}
              >
                <div style={{ height: '240px', overflow: 'hidden' }}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 500ms ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '28px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    {project.category}
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', marginBottom: '12px' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {project.problem}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.tech?.map((t, i) => (
                      <span 
                        key={i} 
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: 'rgba(107, 107, 131, 0.1)',
                          color: 'var(--text)',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Results />
    </div>
  );
}
