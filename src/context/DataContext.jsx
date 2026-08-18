import React, { useState, useEffect } from 'react';
import { DataContext } from './data-context';

function readStoredData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}

function writeStoredData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Keep the in-memory experience working when storage is unavailable.
  }
}


const INITIAL_PROJECTS = [
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

const INITIAL_SERVICES = [
  {
    id: '01',
    title: 'Software & Technology Solutions',
    desc: 'Empowering enterprises with bespoke software, cloud architectures, and robust API integrations designed for seamless scalability.',
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
    desc: 'Transforming manufacturing and industrial workflows with smart IoT telemetry, machine learning, and computer vision systems.',
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
    desc: 'Crafting intuitive, conversion-focused user interfaces and design systems that delight users and drive business metrics.',
    deliverables: [
      'User Research & Interactive Wireframes',
      'Figma Prototypes & Design Systems',
      'Conversion Rate Optimization (CRO)',
    ],
    icon: '✦',
  },
  {
    id: '04',
    title: 'SaaS & Custom Web App Development',
    desc: 'Engineering high-performance, secure, and multi-tenant web applications built to scale effortlessly under heavy loads.',
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
    desc: 'Strategic brand storytelling, technical copywriting, motion graphics, and digital media production that captures attention.',
    deliverables: [
      'Brand & Product Storytelling',
      'High-Impact Visual Assets & Graphics',
      'Technical Copy & Video Media',
    ],
    icon: '◈',
  },
  {
    id: '06',
    title: 'Mobile App Development',
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
    desc: 'Reliable CI/CD automation, proactive server monitoring, regular security updates, and SLA-backed engineering support.',
    deliverables: [
      'Automated CI/CD & Cloud Infrastructure',
      '24/7 Uptime & Performance Monitoring',
      'Security Audits & SLA Maintenance',
    ],
    icon: '⬡',
  },
];

const INITIAL_TESTIMONIALS = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    role: 'Founder & CEO',
    company: 'Azhagappar Academy',
    avatar: '✦',
    text: 'DeCode delivered ahead of schedule. The UI is exceptionally smooth and student engagement grew by 140%.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Priya Sundaram',
    role: 'Head of Operations',
    company: 'AgroMate Technologies',
    avatar: '⚡',
    text: 'Working with DeCode was effortless. They built an ultra-fast web application that our farmers love.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Karthik Nathan',
    role: 'Managing Director',
    company: 'Vetrivel Hospitality',
    avatar: '★',
    text: 'Our online bookings doubled after DeCode redesigned our web app. Their attention to detail is top tier.',
    rating: 5,
  },
];

const INITIAL_CONTENT = {
  heroEyebrow: 'INNOVATION & TECHNOLOGY SOLUTIONS',
  heroHeadline: 'Transforming Ideas Into Technology That Moves Businesses Forward',
  heroSubtext: 'From custom software and industrial IoT to scalable SaaS and mobile apps — DeCode designs, engineers, and scales high-performance digital solutions tailored to your business goals.',
  heroPrimaryCta: 'Start a Conversation',
  heroSecondaryCta: 'Explore Our Services',
  agencyName: 'DeCode InfoTech',
  contactEmail: 'contact@decodeinfotech.com',
  contactLocation: 'Coimbatore, Tamil Nadu, India',
};

const INITIAL_JOB_POSTINGS = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Hybrid / Remote',
    type: 'Full Time',
    experience: '3+ Years',
    icon: 'FS',
    summary: 'Build high-performance web applications using React.js, Node.js, Express, and modern cloud deployment pipelines.',
    requirements: [
      'Strong expertise in React, JavaScript (ES6+), and Node.js REST APIs',
      'Experience with database schema design (MongoDB, PostgreSQL, or Supabase)',
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
    icon: 'UX',
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
      'Mastery of HTML5, CSS3, Tailwind, Framer Motion, and CSS Modules',
      'Deep knowledge of React state management and component architecture',
      'Experience with cross-browser performance tuning and SEO best practices',
    ],
  },
  {
    id: 'job-4',
    title: 'DevOps & Cloud Engineer',
    department: 'Infrastructure',
    location: 'Remote',
    type: 'Full Time / Contract',
    experience: '3+ Years',
    icon: 'DC',
    summary: 'Manage automated GitHub Actions CI/CD pipelines, Docker containerization, and AWS/Vercel cloud infrastructure.',
    requirements: [
      'Hands-on experience with Docker, Kubernetes, Nginx, and Linux server admin',
      'Experience setting up automated build & deployment workflows',
      'Knowledge of cloud security, SSL setup, and infrastructure monitoring',
    ],
  },
];

function normalizeJobPosting(job) {
  const requirements = Array.isArray(job?.requirements) ? job.requirements : [];

  return {
    title: '',
    department: '',
    location: 'Remote',
    type: 'Full Time',
    experience: '',
    icon: '',
    summary: '',
    ...job,
    requirements,
  };
}

export function DataProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    return readStoredData('decode_projects_v4', INITIAL_PROJECTS);
  });

  const [services, setServices] = useState(() => {
    return readStoredData('decode_services_v3', INITIAL_SERVICES);
  });

  const [testimonials, setTestimonials] = useState(() => {
    return readStoredData('decode_testimonials_v2', INITIAL_TESTIMONIALS);
  });

  const [siteContent, setSiteContent] = useState(() => {
    return readStoredData('decode_site_content_v2', INITIAL_CONTENT);
  });

  const [jobApplications, setJobApplications] = useState(() => {
    return readStoredData('decode_job_applications', []);
  });

  const [jobPostings, setJobPostings] = useState(() => {
    const savedJobs = readStoredData(
      'decode_job_postings_v2',
      readStoredData('decode_job_postings', INITIAL_JOB_POSTINGS),
    );
    return Array.isArray(savedJobs) ? savedJobs.map(normalizeJobPosting) : INITIAL_JOB_POSTINGS;
  });

  useEffect(() => {
    writeStoredData('decode_projects_v4', projects);
  }, [projects]);

  useEffect(() => {
    writeStoredData('decode_services_v3', services);
  }, [services]);

  useEffect(() => {
    writeStoredData('decode_testimonials_v2', testimonials);
  }, [testimonials]);

  useEffect(() => {
    writeStoredData('decode_site_content_v2', siteContent);
  }, [siteContent]);

  useEffect(() => {
    writeStoredData('decode_job_applications', jobApplications);
  }, [jobApplications]);

  // Project Mutations
  const addProject = (project) => {
    setProjects((prev) => [...prev, { ...project, id: `proj-${Date.now()}` }]);
  };

  const updateProject = (id, updated) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const moveProject = (id, direction) => {
    setProjects((prev) => {
      const currentIndex = prev.findIndex((project) => project.id === id);
      const nextIndex = currentIndex + direction;
      if (currentIndex < 0 || nextIndex < 0 || nextIndex >= prev.length) return prev;

      const reordered = [...prev];
      [reordered[currentIndex], reordered[nextIndex]] = [reordered[nextIndex], reordered[currentIndex]];
      return reordered;
    });
  };

  // Service Mutations
  const addService = (service) => {
    setServices((prev) => [...prev, { ...service, id: `0${prev.length + 1}` }]);
  };

  const updateService = (id, updated) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteService = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  // Testimonial Mutations
  const addTestimonial = (testimonial) => {
    setTestimonials((prev) => [...prev, { ...testimonial, id: `test-${Date.now()}` }]);
  };

  const updateTestimonial = (id, updated) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

  const deleteTestimonial = (id) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  // Careers & Job Applications Mutations
  const addJobApplication = (app) => {
    setJobApplications((prev) => [
      { ...app, id: `app-${Date.now()}`, timestamp: new Date().toISOString() },
      ...prev,
    ]);
  };

  const deleteJobApplication = (id) => {
    setJobApplications((prev) => prev.filter((a) => a.id !== id));
  };

  const clearJobApplications = () => {
    setJobApplications([]);
  };

  const addJobPosting = (job) => {
    setJobPostings((prev) => [...prev, { ...job, id: `job-${Date.now()}` }]);
  };

  const updateJobPosting = (id, updated) => {
    setJobPostings((prev) => prev.map((j) => (j.id === id ? { ...j, ...updated } : j)));
  };

  const deleteJobPosting = (id) => {
    setJobPostings((prev) => prev.filter((j) => j.id !== id));
  };

  const moveJobPosting = (id, direction) => {
    setJobPostings((prev) => {
      const currentIndex = prev.findIndex((job) => job.id === id);
      const nextIndex = currentIndex + direction;
      if (currentIndex < 0 || nextIndex < 0 || nextIndex >= prev.length) return prev;

      const reordered = [...prev];
      [reordered[currentIndex], reordered[nextIndex]] = [reordered[nextIndex], reordered[currentIndex]];
      return reordered;
    });
  };

  // Content Mutations
  const updateSiteContent = (newContent) => {
    setSiteContent((prev) => ({ ...prev, ...newContent }));
  };

  const resetAllData = () => {
    setProjects(INITIAL_PROJECTS);
    setServices(INITIAL_SERVICES);
    setTestimonials(INITIAL_TESTIMONIALS);
    setSiteContent(INITIAL_CONTENT);
    setJobApplications([]);
    setJobPostings(INITIAL_JOB_POSTINGS);
    localStorage.clear();
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        services,
        testimonials,
        siteContent,
        jobApplications,
        jobPostings,
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
        addJobApplication,
        deleteJobApplication,
        clearJobApplications,
        addJobPosting,
        updateJobPosting,
        deleteJobPosting,
        moveJobPosting,
        updateSiteContent,
        resetAllData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
