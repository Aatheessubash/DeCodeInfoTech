import { createContext } from 'react';
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

export interface DataContextValue {
  projects: Project[];
  services: Service[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
  standards: StandardItem[];
  processSteps: ProcessStep[];
  jobPostings: JobPosting[];
  jobApplications: JobApplication[];
  siteContent: SiteContent;
  mediaAssets: MediaAsset[];
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  moveProject: (fromIndex: number, toIndex: number) => void;
  addService: (service: Service) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addTestimonial: (testimonial: TestimonialItem) => void;
  updateTestimonial: (id: string, testimonial: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;
  addFaq: (faq: FaqItem) => void;
  updateFaq: (id: string, faq: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;
  moveFaq: (fromIndex: number, toIndex: number) => void;
  addStandard: (standard: StandardItem) => void;
  updateStandard: (id: string, standard: Partial<StandardItem>) => void;
  deleteStandard: (id: string) => void;
  updateProcessStep: (number: string, step: Partial<ProcessStep>) => void;
  updateSiteContent: (content: Partial<SiteContent>) => void;
  addJobPosting: (job: JobPosting) => void;
  updateJobPosting: (id: string, job: Partial<JobPosting>) => void;
  deleteJobPosting: (id: string) => void;
  moveJobPosting: (fromIndex: number, toIndex: number) => void;
  addJobApplication: (app: JobApplication) => void;
  deleteJobApplication: (index: number) => void;
  clearJobApplications: () => void;
  resetAllData: () => void;
}

export const DataContext = createContext<DataContextValue | null>(null);
