'use client';

import React, { useState, type ReactNode } from 'react';
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
  const [mediaAssets] = useState<MediaAsset[]>(INITIAL_MEDIA_ASSETS);
  const [jobPostings, setJobPostings] = usePersistentState<JobPosting[]>(
    'decode_job_postings',
    INITIAL_JOB_POSTINGS,
  );
  const [jobApplications, setJobApplications] = usePersistentState<JobApplication[]>(
    'decode_job_applications',
    EMPTY_APPLICATIONS,
  );

  const addProject = (item: Project) => setProjects((prev) => [...prev, item]);
  const updateProject = (id: string, updated: Partial<Project>) =>
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  const deleteProject = (id: string) => setProjects((prev) => prev.filter((p) => p.id !== id));
  const moveProject = (fromIndex: number, toIndex: number) => {
    setProjects((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return copy;
    });
  };

  const addService = (item: Service) => setServices((prev) => [...prev, item]);
  const updateService = (id: string, updated: Partial<Service>) =>
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  const deleteService = (id: string) => setServices((prev) => prev.filter((s) => s.id !== id));

  const addTestimonial = (item: TestimonialItem) => setTestimonials((prev) => [...prev, item]);
  const updateTestimonial = (id: string, updated: Partial<TestimonialItem>) =>
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  const deleteTestimonial = (id: string) =>
    setTestimonials((prev) => prev.filter((t) => t.id !== id));

  const addFaq = (item: FaqItem) => setFaqs((prev) => [...prev, item]);
  const updateFaq = (id: string, updated: Partial<FaqItem>) =>
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updated } : f)));
  const deleteFaq = (id: string) => setFaqs((prev) => prev.filter((f) => f.id !== id));
  const moveFaq = (fromIndex: number, toIndex: number) => {
    setFaqs((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return copy;
    });
  };

  const addStandard = (item: StandardItem) => setStandards((prev) => [...prev, item]);
  const updateStandard = (id: string, updated: Partial<StandardItem>) =>
    setStandards((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  const deleteStandard = (id: string) => setStandards((prev) => prev.filter((s) => s.id !== id));

  const updateProcessStep = (number: string, updated: Partial<ProcessStep>) =>
    setProcessSteps((prev) => prev.map((p) => (p.number === number ? { ...p, ...updated } : p)));

  const updateSiteContent = (updated: Partial<SiteContent>) =>
    setSiteContent((prev) => ({ ...prev, ...updated }));

  const addJobPosting = (item: JobPosting) => setJobPostings((prev) => [...prev, item]);
  const updateJobPosting = (id: string, updated: Partial<JobPosting>) =>
    setJobPostings((prev) => prev.map((j) => (j.id === id ? { ...j, ...updated } : j)));
  const deleteJobPosting = (id: string) =>
    setJobPostings((prev) => prev.filter((j) => j.id !== id));
  const moveJobPosting = (fromIndex: number, toIndex: number) => {
    setJobPostings((prev) => {
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
  const deleteJobApplication = (index: number) =>
    setJobApplications((prev) => prev.filter((_, i) => i !== index));
  const clearJobApplications = () => setJobApplications([]);

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
    resetAllData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataProvider;
