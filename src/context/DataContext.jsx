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
    problem: 'A video-based online learning platform built for structured course delivery.',
    solution: 'A streamlined digital learning experience for structured video courses.',
    url: 'https://azhagapparacademy.com',
    tech: ['Video Learning', 'Course Delivery'],
  },
  {
    id: 'thozha-associates',
    title: 'Thozha Associates',
    category: 'Construction / Civil Engineering',
    image: '/assets/portfolio-thozha.jpg',
    problem: 'Business website for a Pollachi-based civil engineering and construction firm led by Er. Taran D V, showcasing residential, commercial, and renovation services since 2014.',
    solution: 'A polished company website that presents services, expertise, and project credibility.',
    url: 'https://decodeinfotech.in/thozha',
    tech: ['Business Website', 'Responsive Design'],
  },
  {
    id: 'neuerung-healthtech',
    title: 'Neuerung HealthTech',
    category: 'HealthTech / AI & IoT',
    image: '/assets/portfolio-neuerung.jpg',
    problem: 'Corporate site for a healthtech company delivering AI, digital, IoT, and clinical technology solutions to improve healthcare efficiency and patient care.',
    solution: 'A modern corporate experience communicating a connected healthcare ecosystem.',
    url: 'https://decodeinfotech.in/neuerung',
    tech: ['AI', 'IoT', 'HealthTech'],
  },
  {
    id: 'hotel-vetri-vel',
    title: 'Hotel Vetri Vel',
    category: 'SaaS / POS Billing Software',
    image: '/assets/portfolio-vetrivel.jpg',
    problem: 'Real-time point-of-sale and billing system for hotels and restaurants, with live order management, menu master, transaction history, and dashboard analytics.',
    solution: 'A focused restaurant operations platform for faster orders, billing, and reporting.',
    url: 'https://www.vetrivelunavagam.com',
    tech: ['POS', 'Real-time Orders', 'Analytics'],
  },
];

const INITIAL_SERVICES = [
  {
    id: '01',
    title: 'Modern Website Design Services',
    desc: 'High-converting UI/UX designs and responsive layouts crafted for modern brands.',
    deliverables: [
      'Conversion Focused Design',
      'Mobile-First Layouts',
      'Interactive Prototypes',
    ],
    icon: '✦',
  },
  {
    id: '02',
    title: 'Full Stack Web Development Services',
    desc: 'Fast, secure, and maintainable web apps engineered with modern frameworks.',
    deliverables: [
      'React & Node JS Backend',
      'Custom Web Dashboards',
      'API Integration',
    ],
    icon: '⚡',
  },
  {
    id: '03',
    title: 'Custom Web Application Development',
    desc: 'Scalable custom software to streamline workflows and handle high traffic.',
    deliverables: [
      'SaaS & Enterprise Portals',
      'Custom Admin Dashboards',
      'Role-Based Access',
    ],
    icon: '⚙',
  },
  {
    id: '04',
    title: 'Website Optimization & SEO',
    desc: 'Turn traffic into paying customers with optimized speeds and technical SEO.',
    deliverables: [
      'Core Web Vitals Optimization',
      'Technical SEO',
      'Conversion Rate (CRO)',
    ],
    icon: '◈',
  },
  {
    id: '05',
    title: 'Website Redesign & Refresh',
    desc: 'Transform outdated websites into sleek, modern digital products.',
    deliverables: [
      'Modern Visual UI Upgrade',
      'Tech Stack Migration',
      'Code Refactoring',
    ],
    icon: '❖',
  },
  {
    id: '06',
    title: 'DevOps & Ongoing Support',
    desc: 'Reliable CI/CD pipeline setup, DevOps consulting, and product maintenance.',
    deliverables: [
      'GitHub Actions Automation',
      'Kubernetes Deployment',
      'Performance Monitoring',
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
  heroEyebrow: 'SAAS PRODUCT DEVELOPMENT COMPANY IN INDIA',
  heroHeadline: 'We build digital experiences that help businesses grow. Leading web development company for startups.',
  heroSubtext: 'From high-converting modern website design services to complete custom web application development — DeCode designs, builds, and launches fast, scalable digital products engineered for long-term growth. We are your trusted UI UX design and development studio.',
  agencyName: 'DeCode Studio',
  contactEmail: 'hello@decode.com',
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
    return readStoredData('decode_projects_v3', INITIAL_PROJECTS);
  });

  const [services, setServices] = useState(() => {
    return readStoredData('decode_services_v2', INITIAL_SERVICES);
  });

  const [testimonials, setTestimonials] = useState(() => {
    return readStoredData('decode_testimonials_v2', INITIAL_TESTIMONIALS);
  });

  const [siteContent, setSiteContent] = useState(() => {
    return readStoredData('decode_site_content', INITIAL_CONTENT);
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
    writeStoredData('decode_projects_v3', projects);
  }, [projects]);

  useEffect(() => {
    writeStoredData('decode_services_v2', services);
  }, [services]);

  useEffect(() => {
    writeStoredData('decode_testimonials_v2', testimonials);
  }, [testimonials]);

  useEffect(() => {
    writeStoredData('decode_site_content', siteContent);
  }, [siteContent]);

  useEffect(() => {
    writeStoredData('decode_job_applications', jobApplications);
  }, [jobApplications]);

  useEffect(() => {
    writeStoredData('decode_job_postings_v2', jobPostings);
  }, [jobPostings]);

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
