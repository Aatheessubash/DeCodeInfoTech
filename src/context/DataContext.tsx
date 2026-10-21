'use client';

import React, { useEffect, type ReactNode } from 'react';
import { usePersistentState } from '@/hooks/usePersistentState';
import { DataContext, type DataContextValue } from './data-context';
import {
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
  INITIAL_STANDARDS,
  INITIAL_PROCESS_STEPS,
  INITIAL_CONTENT,
  INITIAL_MEDIA_ASSETS,
  INITIAL_JOB_POSTINGS,
} from '@/data/site-content';
import type {
  Project,
  Service,
  TestimonialItem,
  FaqItem,
  StandardItem,
  ProcessStep,
  JobPosting,
  JobApplication,
  SiteContent,
  MediaAsset,
} from '@/lib/types';

const EMPTY_APPLICATIONS: JobApplication[] = [];

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = usePersistentState<Project[]>(
    'decode_projects',
    INITIAL_PROJECTS,
  );
  const [services, setServices] = usePersistentState<Service[]>(
    'decode_services',
    INITIAL_SERVICES,
  );
  const [testimonials, setTestimonials] = usePersistentState<TestimonialItem[]>(
    'decode_testimonials',
    INITIAL_TESTIMONIALS,
  );
  const [faqs, setFaqs] = usePersistentState<FaqItem[]>('decode_faqs', INITIAL_FAQS);
  const [standards, setStandards] = usePersistentState<StandardItem[]>(
    'decode_standards',
    INITIAL_STANDARDS,
  );
  const [processSteps, setProcessSteps] = usePersistentState<ProcessStep[]>(
    'decode_process',
    INITIAL_PROCESS_STEPS,
  );
  const [siteContent, setSiteContent] = usePersistentState<SiteContent>(
    'decode_site_content',
    INITIAL_CONTENT,
  );
  const [mediaAssets, setMediaAssets] = usePersistentState<MediaAsset[]>(
    'decode_media_assets',
    INITIAL_MEDIA_ASSETS,
  );
  const [jobPostings, setJobPostings] = usePersistentState<JobPosting[]>(
    'decode_job_postings',
    INITIAL_JOB_POSTINGS,
  );
  const [jobApplications, setJobApplications] = usePersistentState<JobApplication[]>(
    'decode_job_applications',
    EMPTY_APPLICATIONS,
  );

  useEffect(() => {
    setJobPostings((prev) => {
      const existingIds = new Set(prev.map((j) => j.id));
      const missing = INITIAL_JOB_POSTINGS.filter((j) => !existingIds.has(j.id));
      return missing.length > 0 ? [...prev, ...missing] : prev;
    });
  }, [setJobPostings]);

  const addProject = (item: Project) => {
    const id = item.id?.trim() || `project-${Date.now()}`;
    setProjects((prev) => [...prev, { ...item, id }]);
  };
  const updateProject = (id: string, updated: Partial<Project>) =>
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  const deleteProject = (id: string) => setProjects((prev) => prev.filter((p) => p.id !== id));
  const moveProject = (fromIndexOrId: number | string, toIndexOrDirection: number) => {
    setProjects((prev) => {
      let fromIndex: number;
      let toIndex: number;
      if (typeof fromIndexOrId === 'string') {
        fromIndex = prev.findIndex((p) => p.id === fromIndexOrId);
        if (fromIndex === -1) return prev;
        toIndex = fromIndex + toIndexOrDirection;
      } else {
        fromIndex = fromIndexOrId;
        toIndex = toIndexOrDirection;
      }
      if (toIndex < 0 || toIndex >= prev.length || fromIndex === toIndex) return prev;
      const copy = [...prev];
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return copy;
    });
  };

  const addService = (item: Service) => {
    setServices((prev) => {
      const id = item.id?.trim() || String(prev.length + 1).padStart(2, '0');
      return [...prev, { ...item, id }];
    });
  };
  const updateService = (id: string, updated: Partial<Service>) =>
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  const deleteService = (id: string) => setServices((prev) => prev.filter((s) => s.id !== id));

  const addTestimonial = (item: TestimonialItem) => {
    const id = item.id?.trim() || `testi-${Date.now()}`;
    setTestimonials((prev) => [...prev, { ...item, id }]);
  };
  const updateTestimonial = (id: string, updated: Partial<TestimonialItem>) =>
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  const deleteTestimonial = (id: string) =>
    setTestimonials((prev) => prev.filter((t) => t.id !== id));

  const addFaq = (item: FaqItem) => {
    const id = item.id?.trim() || `faq-${Date.now()}`;
    setFaqs((prev) => [...prev, { ...item, id }]);
  };
  const updateFaq = (id: string, updated: Partial<FaqItem>) =>
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updated } : f)));
  const deleteFaq = (id: string) => setFaqs((prev) => prev.filter((f) => f.id !== id));
  const moveFaq = (fromIndexOrId: number | string, toIndexOrDirection: number) => {
    setFaqs((prev) => {
      let fromIndex: number;
      let toIndex: number;
      if (typeof fromIndexOrId === 'string') {
        fromIndex = prev.findIndex((f) => f.id === fromIndexOrId);
        if (fromIndex === -1) return prev;
        toIndex = fromIndex + toIndexOrDirection;
      } else {
        fromIndex = fromIndexOrId;
        toIndex = toIndexOrDirection;
      }
      if (toIndex < 0 || toIndex >= prev.length || fromIndex === toIndex) return prev;
      const copy = [...prev];
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return copy;
    });
  };

  const addStandard = (item: StandardItem) => {
    const id = item.id?.trim() || `std-${Date.now()}`;
    setStandards((prev) => [...prev, { ...item, id }]);
  };
  const updateStandard = (id: string, updated: Partial<StandardItem>) =>
    setStandards((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  const deleteStandard = (id: string) => setStandards((prev) => prev.filter((s) => s.id !== id));

  const updateProcessStep = (number: string, updated: Partial<ProcessStep>) =>
    setProcessSteps((prev) => prev.map((p) => (p.number === number ? { ...p, ...updated } : p)));

  const updateSiteContent = (updated: Partial<SiteContent>) =>
    setSiteContent((prev) => ({ ...prev, ...updated }));

  const addJobPosting = (item: JobPosting) => {
    const id = item.id?.trim() || `job-${Date.now()}`;
    setJobPostings((prev) => [...prev, { ...item, id }]);
  };
  const updateJobPosting = (id: string, updated: Partial<JobPosting>) =>
    setJobPostings((prev) => prev.map((j) => (j.id === id ? { ...j, ...updated } : j)));
  const deleteJobPosting = (id: string) =>
    setJobPostings((prev) => prev.filter((j) => j.id !== id));
  const moveJobPosting = (fromIndexOrId: number | string, toIndexOrDirection: number) => {
    setJobPostings((prev) => {
      let fromIndex: number;
      let toIndex: number;
      if (typeof fromIndexOrId === 'string') {
        fromIndex = prev.findIndex((j) => j.id === fromIndexOrId);
        if (fromIndex === -1) return prev;
        toIndex = fromIndex + toIndexOrDirection;
      } else {
        fromIndex = fromIndexOrId;
        toIndex = toIndexOrDirection;
      }
      if (toIndex < 0 || toIndex >= prev.length || fromIndex === toIndex) return prev;
      const copy = [...prev];
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return copy;
    });
  };

  const addJobApplication = (app: JobApplication) =>
    setJobApplications((prev) => [
      ...prev,
      { ...app, id: `app-${Date.now()}`, timestamp: new Date().toISOString() },
    ]);
  const deleteJobApplication = (idOrIndex: string | number) =>
    setJobApplications((prev) =>
      prev.filter((app, i) =>
        typeof idOrIndex === 'string' ? app.id !== idOrIndex : i !== idOrIndex,
      ),
    );
  const clearJobApplications = () => setJobApplications([]);

  const addMediaAsset = (item: MediaAsset) => {
    const id = item.id?.trim() || `asset-${Date.now()}`;
    setMediaAssets((prev) => [...prev, { ...item, id }]);
  };
  const deleteMediaAsset = (id: string) =>
    setMediaAssets((prev) => prev.filter((a) => a.id !== id));

  const resetAllData = () => {
    setProjects(INITIAL_PROJECTS);
    setServices(INITIAL_SERVICES);
    setTestimonials(INITIAL_TESTIMONIALS);
    setFaqs(INITIAL_FAQS);
    setStandards(INITIAL_STANDARDS);
    setProcessSteps(INITIAL_PROCESS_STEPS);
    setSiteContent(INITIAL_CONTENT);
    setJobPostings(INITIAL_JOB_POSTINGS);
    setJobApplications([]);
    setMediaAssets(INITIAL_MEDIA_ASSETS);
  };

  const value: DataContextValue = {
    projects,
    services,
    testimonials,
    faqs,
    standards,
    processSteps,
    jobPostings,
    jobApplications,
    siteContent,
    mediaAssets,
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
    addJobPosting,
    updateJobPosting,
    deleteJobPosting,
    moveJobPosting,
    addJobApplication,
    deleteJobApplication,
    clearJobApplications,
    addMediaAsset,
    deleteMediaAsset,
    resetAllData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataProvider;
