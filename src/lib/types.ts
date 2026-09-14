export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  problem?: string;
  solution?: string;
  url?: string;
  tech?: string[];
}

export interface Service {
  id: string;
  title: string;
  desc: string;
  deliverables?: string[];
  icon?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  text: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface StandardItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  tag: string;
  icon: string;
  desc: string;
  tags?: string[];
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  icon?: string;
  summary: string;
  requirements: string[];
}

export interface JobApplication {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  portfolio: string;
  experience?: string;
  coverLetter?: string;
  jobTitle: string;
  timestamp?: string;
}

export interface ContactProposal {
  id?: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  message: string;
  timestamp?: string;
}

export interface SiteContent {
  agencyName: string;
  logoUrl: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubtext: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroVideoUrl: string;
  aboutHeading: string;
  aboutLead: string;
  aboutDesc1: string;
  aboutDesc2: string;
  aboutImage: string;
  aboutCaption: string;
  standardsHeading: string;
  standardsSubheading: string;
  processHeading: string;
  processSubheading: string;
  processClosingText: string;
  contactEmail: string;
  contactLocation: string;
  [key: string]: any;
}

export interface MediaAsset {
  id: string;
  name: string;
  path: string;
  type: 'image' | 'video' | 'document';
  category: string;
  dimensions?: string;
}
