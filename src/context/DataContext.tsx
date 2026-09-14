'use client';

import React, { useState, useEffect, type ReactNode } from 'react';
import { DataContext, type DataContextValue } from './data-context';
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

function readStoredData<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function writeStoredData<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Keep in-memory working
  }
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'azhagappar-academy',
    title: 'Azhagappar Academy',
    category: 'EdTech / Video Learning Platform',
    image: '/assets/portfolio-azhagappar.jpg',
    problem: 'A video-based online learning platform built for structured course delivery, interactive quizzes, and seamless student progress tracking.',
    solution: 'A streamlined digital learning experience for structured video courses and student lifecycle management.',
    url: 'https://azhagapparacademy.com',
    tech: ['React.js', 'Node.js', 'Video Streaming', 'AWS S3'],
  },
  {
    id: 'thozha-associates',
    title: 'Thozha Associates',
    category: 'Construction / Civil Engineering',
    image: '/assets/portfolio-thozha.jpg',
    problem: 'Corporate digital presence for a leading civil engineering & construction firm showcasing turnkey residential, commercial, and renovation projects.',
    solution: 'A high-converting portfolio and lead capture web experience establishing engineering credibility.',
    url: 'https://decodeinfotech.in/thozha',
    tech: ['React', 'CSS Modules', 'SEO', 'Lead Funnel'],
  },
  {
    id: 'neuerung-healthtech',
    title: 'Neuerung HealthTech',
    category: 'HealthTech / AI & IoT',
    image: '/assets/portfolio-neuerung.jpg',
    problem: 'Enterprise portal for an innovative healthtech brand integrating AI-driven diagnostic tools, clinical workflows, and IoT device telemetry.',
    solution: 'A modern, secure healthcare interface communicating advanced connected clinical technology.',
    url: 'https://decodeinfotech.in/neuerung',
    tech: ['AI Diagnostics', 'IoT Telemetry', 'HealthTech UX', 'Cloud API'],
  },
  {
    id: 'hotel-vetri-vel',
    title: 'Hotel Vetri Vel',
    category: 'SaaS / POS Billing Software',
    image: '/assets/portfolio-vetrivel.jpg',
    problem: 'Real-time multi-counter point-of-sale and kitchen order ticketing (KOT) billing system built for high-throughput hospitality operations.',
    solution: 'An ultra-fast cloud POS system with live menu configuration, billing printers, and real-time sales reporting.',
    url: 'https://www.vetrivelunavagam.com',
    tech: ['Cloud POS', 'Live WebSockets', 'Analytics', 'Thermal Print API'],
  },
];

const INITIAL_SERVICES: Service[] = [
  {
    id: '01',
    title: 'Custom Software & Enterprise Solutions in Coimbatore',
    desc: 'Empowering enterprises with bespoke software, cloud architectures, and robust API integrations designed for seamless scalability by Coimbatore’s top engineering team.',
    deliverables: [
      'Custom Enterprise Software',
      'Cloud Architecture & Microservices',
      'API Design & Third-Party Integration',
    ],
    icon: '⚡',
  },
  {
    id: '02',
    title: 'Industrial Automation – AI & IoT',
    desc: 'Transforming manufacturing and industrial workflows in Coimbatore and across Tamil Nadu with smart IoT telemetry, machine learning, and computer vision systems.',
    deliverables: [
      'IoT Sensor Telemetry & Remote Control',
      'AI Vision & Automated Quality Inspection',
      'Smart Factory & SCADA Integration',
    ],
    icon: '❖',
  },
  {
    id: '03',
    title: 'UI/UX Design & Prototyping',
    desc: 'Crafting intuitive, conversion-focused user interfaces and design systems that delight users and drive business metrics for modern brands.',
    deliverables: [
      'User Research & Interactive Wireframes',
      'Figma Prototypes & Design Systems',
      'Conversion Rate Optimization (CRO)',
    ],
    icon: '✦',
  },
  {
    id: '04',
    title: 'SaaS & Web Development Company in Coimbatore',
    desc: 'Engineering high-performance, secure, and multi-tenant web applications and modern websites built to rank #1 and scale effortlessly.',
    deliverables: [
      'Multi-Tenant SaaS Architecture',
      'Interactive Analytics Dashboards',
      'Role-Based Access & Security',
    ],
    icon: '⚙',
  },
  {
    id: '05',
    title: 'Digital Content Creation & Media',
    desc: 'Strategic brand storytelling, technical copywriting, motion graphics, and digital media production that captures attention and elevates market presence.',
    deliverables: [
      'Brand & Product Storytelling',
      'High-Impact Visual Assets & Graphics',
      'Technical Copy & Video Media',
    ],
    icon: '◈',
  },
  {
    id: '06',
    title: 'Mobile App Development in Coimbatore',
    desc: 'Building responsive, feature-rich iOS and Android mobile applications delivering native performance and fluid user journeys.',
    deliverables: [
      'Cross-Platform iOS & Android Apps',
      'Offline-First Sync & Push Notifications',
      'App Store & Play Store Deployment',
    ],
    icon: '📱',
  },
  {
    id: '07',
    title: 'Maintenance, Cloud & Ongoing Support',
    desc: 'Reliable CI/CD automation, proactive server monitoring, regular security updates, and SLA-backed engineering support for growing businesses.',
    deliverables: [
      'Automated CI/CD & Cloud Infrastructure',
      '24/7 Uptime & Performance Monitoring',
      'Security Audits & SLA Maintenance',
    ],
    icon: '⬡',
  },
];

const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    role: 'Founder & CEO',
    company: 'Azhagappar Academy',
    avatar: '✦',
    text: 'DeCode is without a doubt the best software and web development company in Coimbatore. The UI is exceptionally smooth and student engagement grew by 140%.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Priya Sundaram',
    role: 'Head of Operations',
    company: 'AgroMate Technologies',
    avatar: '⚡',
    text: 'Working with DeCode was effortless. They built an ultra-fast web application that our farmers and suppliers across Tamil Nadu love.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Karthik Nathan',
    role: 'Managing Director',
    company: 'Vetrivel Hospitality',
    avatar: '★',
    text: 'Our online bookings doubled after DeCode redesigned our web app. Their attention to detail, local Coimbatore presence, and support is top tier.',
    rating: 5,
  },
];

const INITIAL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    q: 'Why is DeCode InfoTech considered the best software company in Coimbatore?',
    a: 'DeCode InfoTech is recognized as the best software company in Coimbatore because we engineer custom enterprise software, scalable SaaS platforms, AI/IoT solutions, and cloud architectures with modern tech stacks (React, Next.js, Node.js, TypeScript). We deliver robust, bug-free, high-performance software tailored directly to your business goals.',
  },
  {
    id: 'faq-2',
    q: 'What makes DeCode the best web development company in Coimbatore?',
    a: 'As the best web development company in Coimbatore, we focus on blazing-fast load speeds, Core Web Vitals optimization, bespoke UI/UX designs, and technical SEO. Every web application we create is built from the ground up to rank prominently on search engines, engage users, and maximize conversion rates.',
  },
  {
    id: 'faq-3',
    q: 'What types of custom software and web applications do you build in Coimbatore?',
    a: 'We build custom LMS platforms, civil construction management portals, hospitality POS systems, healthcare AI telemetry dashboards, eCommerce platforms, and custom SaaS web applications for startups, SMEs, and enterprises in Coimbatore and across the world.',
  },
  {
    id: 'faq-4',
    q: 'How does DeCode help businesses in Coimbatore with SEO and website speed?',
    a: 'We implement server-side rendering with Next.js, structured schema markup, semantic HTML5, high-speed image compression, clean code architecture, and targeted local SEO strategies to ensure your business dominates local search results in Coimbatore and Tamil Nadu.',
  },
  {
    id: 'faq-5',
    q: 'Can you redesign an existing website without losing current Google SEO rankings?',
    a: 'Yes! We specialize in seamless website migrations and modern redesigns. We audit your existing search ranking keywords, implement 301 redirect mapping, and enhance page speed and responsiveness, protecting and accelerating your SEO authority.',
  },
  {
    id: 'faq-6',
    q: 'How do I hire DeCode InfoTech for a web or software project in Coimbatore?',
    a: 'You can start immediately by submitting a proposal request on our Contact form or emailing us at contact@decodeinfotech.com. Our engineering team in Coimbatore will review your requirements and provide a free consultation and project roadmap within 24 hours.',
  },
];

const INITIAL_STANDARDS: StandardItem[] = [
  {
    id: '01',
    title: 'Clear & Direct Communication',
    desc: 'No confusing technical jargon. We provide straightforward progress updates, transparent timelines, and honest project roadmaps.',
    icon: 'MessageSquare',
  },
  {
    id: '02',
    title: 'Clean, Maintainable Code',
    desc: 'We write well-structured, thoroughly documented code that your engineering team can easily scale and build upon for years to come.',
    icon: 'Code2',
  },
  {
    id: '03',
    title: 'Fast Delivery Without Quality Trade-Offs',
    desc: 'We use modern frameworks, automated build pipelines, and efficient workflows to launch high-quality digital products on schedule.',
    icon: 'Zap',
  },
  {
    id: '04',
    title: 'Practical Solutions Focused on Business Goals',
    desc: 'Every design choice and feature we build directly aligns with your core business targets — driving user conversion and revenue.',
    icon: 'Target',
  },
  {
    id: '05',
    title: 'Long-Term Support After Launch',
    desc: 'Our relationship does not end at deployment. We stand by our work, providing post-launch support, monitoring, and updates.',
    icon: 'Handshake',
  },
  {
    id: '06',
    title: 'Quality is in the Details',
    desc: 'From microscopic micro-interactions to zero-layout-shift performance, we craft digital experiences that leave a lasting impression.',
    icon: 'ScanEye',
  },
];

const INITIAL_PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    tag: 'Exploration',
    icon: 'Compass',
    desc: 'Goal mapping, user needs & project scope.',
    tags: ['Scope', 'Goals'],
  },
  {
    number: '02',
    title: 'Plan',
    tag: 'Strategy',
    icon: 'Layers',
    desc: 'Architecture blueprint & sprint roadmap.',
    tags: ['Tech Stack', 'Roadmap'],
  },
  {
    number: '03',
    title: 'Design',
    tag: 'Creation',
    icon: 'Palette',
    desc: 'Intuitive UX layouts & Figma prototypes.',
    tags: ['Wireframe', 'Prototype'],
  },
  {
    number: '04',
    title: 'Build',
    tag: 'Engineering',
    icon: 'Code2',
    desc: 'Modular frontend, robust APIs & cloud.',
    tags: ['Frontend', 'Backend'],
  },
  {
    number: '05',
    title: 'Test',
    tag: 'QA & Security',
    icon: 'ShieldCheck',
    desc: 'Performance audits, device testing & security checks.',
    tags: ['Device QA', 'Security'],
  },
  {
    number: '06',
    title: 'Launch',
    tag: 'Go-Live',
    icon: 'Rocket',
    desc: 'Production deploy, cloud setup & support.',
    tags: ['Deploy', 'Scaling'],
  },
];

const INITIAL_CONTENT: SiteContent = {
  agencyName: 'DeCode InfoTech',
  logoUrl: '/DeCode_Logo.png',
  heroEyebrow: 'BEST SOFTWARE & WEB DEVELOPMENT COMPANY IN COIMBATORE',
  heroHeadline: 'Decoding the Future of Digital Innovation.',
  heroSubtext: 'Recognized as the best software company in Coimbatore and top web development company in Coimbatore, DeCode InfoTech designs, builds, and launches high-performance web applications, custom SaaS products, and enterprise digital solutions.',
  heroPrimaryCta: 'Start A Project',
  heroSecondaryCta: 'Explore our services',
  heroVideoUrl: '/sample.mp4',
  aboutHeading: 'Building what’s next in Coimbatore.',
  aboutLead: 'As the best software and web development company in Coimbatore, we turn complex challenges into intelligent digital solutions.',
  aboutDesc1: 'At DeCode InfoTech, we combine modern Next.js and React architecture, cloud scalability, and UI/UX craftsmanship to help businesses in Coimbatore and globally lead their industries.',
  aboutDesc2: 'From ambitious local businesses to fast-scaling global SaaS startups, our Coimbatore engineering team delivers robust, future-ready software that drives measurable business growth.',
  aboutImage: '/assets/who-we-are.jpg',
  aboutCaption: 'Built in Coimbatore. Designed for global impact.',
  standardsHeading: 'Our Core Foundation & Engineering Standards',
  standardsSubheading: 'DeCode InfoTech is the best web development company in Coimbatore, designing, building, and launching fast, scalable websites and custom web applications.',
  processHeading: 'A simple process. A better outcome.',
  processSubheading: 'From the first conversation in Coimbatore to global launch, we bring clarity to every stage with a transparent roadmap.',
  processClosingText: 'Your idea. A clear path forward.',
  contactEmail: 'contact@decodeinfotech.com',
  contactLocation: 'Coimbatore, Tamil Nadu, India',
  contactPhone: '+91 98765 43210',
};

const INITIAL_MEDIA_ASSETS: MediaAsset[] = [
  { id: 'asset-logo', name: 'DeCode Logo', path: '/DeCode_Logo.png', type: 'image', category: 'Branding', dimensions: '707 × 353' },
  { id: 'asset-video-sample', name: '3D Globe Background Video', path: '/sample.mp4', type: 'video', category: 'Backgrounds & Video', dimensions: '1920 × 1080' },
  { id: 'asset-who-we-are', name: 'Who We Are Team Workspace', path: '/assets/who-we-are.jpg', type: 'image', category: 'About & Team', dimensions: '1200 × 800' },
  { id: 'asset-port-azhagappar', name: 'Azhagappar Academy Portal', path: '/assets/portfolio-azhagappar.jpg', type: 'image', category: 'Portfolio', dimensions: '1200 × 750' },
  { id: 'asset-port-thozha', name: 'Thozha Associates Construction', path: '/assets/portfolio-thozha.jpg', type: 'image', category: 'Portfolio', dimensions: '1200 × 750' },
  { id: 'asset-port-neuerung', name: 'Neuerung HealthTech Portal', path: '/assets/portfolio-neuerung.jpg', type: 'image', category: 'Portfolio', dimensions: '1200 × 750' },
  { id: 'asset-port-vetrivel', name: 'Hotel Vetri Vel POS Software', path: '/assets/portfolio-vetrivel.jpg', type: 'image', category: 'Portfolio', dimensions: '1200 × 750' },
  { id: 'asset-careers-team', name: 'Careers Team Workspace', path: '/assets/careers-team.png', type: 'image', category: 'Careers', dimensions: '1254 × 1254' },
];

const INITIAL_JOB_POSTINGS: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Hybrid / Remote',
    type: 'Full Time',
    experience: '3+ Years',
    icon: 'FS',
    summary: 'Build high-performance web applications using React.js, Next.js, Node.js, and modern cloud deployment pipelines.',
    requirements: [
      'Strong expertise in React, TypeScript, and Node.js REST / GraphQL APIs',
      'Experience with database schema design (PostgreSQL, MongoDB, or Supabase)',
      'Familiarity with DevOps workflows, Docker, and CI/CD pipelines',
      'Passion for writing clean, modular, and maintainable code',
    ],
  },
  {
    id: 'job-2',
    title: 'UI/UX Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full Time',
    experience: '2+ Years',
    icon: 'UI',
    summary: 'Craft high-converting, aesthetically stunning user interfaces and micro-animations for enterprise and startup clients.',
    requirements: [
      'Proficiency in Figma, design systems, wireframing, and interactive prototyping',
      'Strong understanding of modern visual aesthetics, typography, and contrast',
      'Ability to collaborate directly with frontend engineers for pixel-perfect delivery',
      'Solid portfolio demonstrating real-world Web & Mobile UX designs',
    ],
  },
  {
    id: 'job-3',
    title: 'Frontend Web Specialist',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full Time',
    experience: '2+ Years',
    icon: 'FE',
    summary: 'Specialize in building ultra-fast responsive user interfaces, animations, and Core Web Vitals optimization.',
    requirements: [
      'Mastery of HTML5, CSS3, Tailwind CSS, GSAP, and Framer Motion',
      'Deep knowledge of React state management and component architecture',
      'Experience with cross-browser performance tuning and SEO best practices',
    ],
  },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(() => readStoredData('decode_projects', INITIAL_PROJECTS));
  const [services, setServices] = useState<Service[]>(() => readStoredData('decode_services', INITIAL_SERVICES));
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => readStoredData('decode_testimonials', INITIAL_TESTIMONIALS));
  const [faqs, setFaqs] = useState<FaqItem[]>(() => readStoredData('decode_faqs', INITIAL_FAQS));
  const [standards, setStandards] = useState<StandardItem[]>(() => readStoredData('decode_standards', INITIAL_STANDARDS));
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(() => readStoredData('decode_process', INITIAL_PROCESS_STEPS));
  const [siteContent, setSiteContent] = useState<SiteContent>(() => readStoredData('decode_site_content', INITIAL_CONTENT));
  const [mediaAssets] = useState<MediaAsset[]>(INITIAL_MEDIA_ASSETS);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(() => readStoredData('decode_job_postings', INITIAL_JOB_POSTINGS));
  const [jobApplications, setJobApplications] = useState<JobApplication[]>(() => readStoredData('decode_job_applications', []));

  useEffect(() => { writeStoredData('decode_projects', projects); }, [projects]);
  useEffect(() => { writeStoredData('decode_services', services); }, [services]);
  useEffect(() => { writeStoredData('decode_testimonials', testimonials); }, [testimonials]);
  useEffect(() => { writeStoredData('decode_faqs', faqs); }, [faqs]);
  useEffect(() => { writeStoredData('decode_standards', standards); }, [standards]);
  useEffect(() => { writeStoredData('decode_process', processSteps); }, [processSteps]);
  useEffect(() => { writeStoredData('decode_site_content', siteContent); }, [siteContent]);
  useEffect(() => { writeStoredData('decode_job_postings', jobPostings); }, [jobPostings]);
  useEffect(() => { writeStoredData('decode_job_applications', jobApplications); }, [jobApplications]);

  const addProject = (item: Project) => setProjects(prev => [...prev, item]);
  const updateProject = (id: string, updated: Partial<Project>) =>
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  const deleteProject = (id: string) => setProjects(prev => prev.filter(p => p.id !== id));
  const moveProject = (fromIndex: number, toIndex: number) => {
    setProjects(prev => {
      const copy = [...prev];
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return copy;
    });
  };

  const addService = (item: Service) => setServices(prev => [...prev, item]);
  const updateService = (id: string, updated: Partial<Service>) =>
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  const deleteService = (id: string) => setServices(prev => prev.filter(s => s.id !== id));

  const addTestimonial = (item: TestimonialItem) => setTestimonials(prev => [...prev, item]);
  const updateTestimonial = (id: string, updated: Partial<TestimonialItem>) =>
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  const deleteTestimonial = (id: string) => setTestimonials(prev => prev.filter(t => t.id !== id));

  const addFaq = (item: FaqItem) => setFaqs(prev => [...prev, item]);
  const updateFaq = (id: string, updated: Partial<FaqItem>) =>
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...updated } : f));
  const deleteFaq = (id: string) => setFaqs(prev => prev.filter(f => f.id !== id));
  const moveFaq = (fromIndex: number, toIndex: number) => {
    setFaqs(prev => {
      const copy = [...prev];
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return copy;
    });
  };

  const addStandard = (item: StandardItem) => setStandards(prev => [...prev, item]);
  const updateStandard = (id: string, updated: Partial<StandardItem>) =>
    setStandards(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  const deleteStandard = (id: string) => setStandards(prev => prev.filter(s => s.id !== id));

  const updateProcessStep = (number: string, updated: Partial<ProcessStep>) =>
    setProcessSteps(prev => prev.map(p => p.number === number ? { ...p, ...updated } : p));

  const updateSiteContent = (updated: Partial<SiteContent>) =>
    setSiteContent(prev => ({ ...prev, ...updated }));

  const addJobPosting = (item: JobPosting) => setJobPostings(prev => [...prev, item]);
  const updateJobPosting = (id: string, updated: Partial<JobPosting>) =>
    setJobPostings(prev => prev.map(j => j.id === id ? { ...j, ...updated } : j));
  const deleteJobPosting = (id: string) => setJobPostings(prev => prev.filter(j => j.id !== id));
  const moveJobPosting = (fromIndex: number, toIndex: number) => {
    setJobPostings(prev => {
      const copy = [...prev];
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return copy;
    });
  };

  const addJobApplication = (app: JobApplication) =>
    setJobApplications(prev => [...prev, { ...app, id: `app-${Date.now()}`, timestamp: new Date().toISOString() }]);
  const deleteJobApplication = (index: number) =>
    setJobApplications(prev => prev.filter((_, i) => i !== index));
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
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
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
