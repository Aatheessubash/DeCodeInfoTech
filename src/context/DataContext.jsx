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

const INITIAL_FAQS = [
  {
    id: 'faq-1',
    q: 'Why should I hire a web development agency for my SaaS startup?',
    a: 'Hiring a specialized web development agency for startups like DeCode ensures end to end product development in India. We offer modern web application development, scalable architecture, MERN stack expertise, and custom UI/UX design built for conversions.',
  },
  {
    id: 'faq-2',
    q: 'Can you build custom LMS platform development services or enterprise tools?',
    a: 'Yes, we specialize in custom LMS platform development services, construction management software, agriculture portals, news portals, and SaaS platforms tailored to your business needs.',
  },
  {
    id: 'faq-3',
    q: 'What modern tech stack and frameworks do you use?',
    a: 'Our primary tech stack includes React JS, Next JS, Node JS, Express, TypeScript, MongoDB, PostgreSQL, Tailwind CSS, Docker, Kubernetes, and Vercel deployments.',
  },
  {
    id: 'faq-4',
    q: 'How do you improve website speed and Core Web Vitals?',
    a: 'We perform technical SEO and web development optimization, code splitting, image compression, server-side caching, and DOM cleanup to fix low conversion rates and ensure maximum speed.',
  },
  {
    id: 'faq-5',
    q: 'Can you help redesign an outdated business website without losing SEO?',
    a: 'Absolutely! We specialize in redesigning outdated business websites, optimizing performance, setting up 301 redirects, and providing SEO friendly website development for lead generation.',
  },
  {
    id: 'faq-6',
    q: 'Do you offer full stack developer services and DevOps consulting in India?',
    a: 'Yes, DeCode provides full stack web development services in India alongside Docker DevOps consulting, CI/CD pipeline setup with GitHub Actions, and ongoing support for small businesses and startups.',
  },
];

const INITIAL_STANDARDS = [
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

const INITIAL_PROCESS_STEPS = [
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

const INITIAL_CONTENT = {
  agencyName: 'DeCode InfoTech',
  logoUrl: '/DeCode_Logo.png',
  heroEyebrow: 'INNOVATION & TECHNOLOGY SOLUTIONS',
  heroHeadline: 'Decoding the Future of Digital Innovation.',
  heroSubtext: 'Empowering businesses to grow through innovation and technology. We deliver scalable, future-ready solutions that enhance operations, drive sustainable growth, and create long-term business value.',
  heroPrimaryCta: 'Start A Project',
  heroSecondaryCta: 'Explore our services',
  heroVideoUrl: '/sample.mp4',
  aboutHeading: 'Building what’s next.',
  aboutLead: 'We turn complex challenges into intelligent digital solutions.',
  aboutDesc1: 'At DeCode InfoTech, we combine technology, strategy, and design to create scalable foundations for growth.',
  aboutDesc2: 'Our solutions simplify operations, unlock new possibilities, and adapt to change — delivering lasting value that keeps your business moving forward.',
  aboutImage: '/assets/who-we-are.jpg',
  aboutCaption: 'Built to evolve. Designed for what’s next.',
  standardsHeading: 'Our Core Foundation & Engineering Standards',
  standardsSubheading: 'DeCode is a modern software studio that designs, builds, and launches fast, scalable websites and custom web applications.',
  processHeading: 'A simple process. A better outcome.',
  processSubheading: 'From the first conversation to launch, we bring clarity to every stage — with a shared plan and a clear next step.',
  processClosingText: 'Your idea. A clear path forward.',
  contactEmail: 'contact@decodeinfotech.com',
  contactLocation: 'Coimbatore, Tamil Nadu, India',
  contactPhone: '+91 98765 43210',
};

const INITIAL_MEDIA_ASSETS = [
  { id: 'asset-logo', name: 'DeCode Logo', path: '/DeCode_Logo.png', type: 'image', category: 'Branding', dimensions: '707 × 353' },
  { id: 'asset-video-sample', name: '3D Globe Background Video', path: '/sample.mp4', type: 'video', category: 'Backgrounds & Video', dimensions: '1920 × 1080' },
  { id: 'asset-who-we-are', name: 'Who We Are Team Workspace', path: '/assets/who-we-are.jpg', type: 'image', category: 'About & Team', dimensions: '1200 × 800' },
  { id: 'asset-port-azhagappar', name: 'Azhagappar Academy Portal', path: '/assets/portfolio-azhagappar.jpg', type: 'image', category: 'Portfolio', dimensions: '1200 × 750' },
  { id: 'asset-port-thozha', name: 'Thozha Associates Construction', path: '/assets/portfolio-thozha.jpg', type: 'image', category: 'Portfolio', dimensions: '1200 × 750' },
  { id: 'asset-port-neuerung', name: 'Neuerung HealthTech Portal', path: '/assets/portfolio-neuerung.jpg', type: 'image', category: 'Portfolio', dimensions: '1200 × 750' },
  { id: 'asset-port-vetrivel', name: 'Hotel Vetri Vel POS Software', path: '/assets/portfolio-vetrivel.jpg', type: 'image', category: 'Portfolio', dimensions: '1200 × 750' },
  { id: 'asset-proj-lms', name: 'LMS Platform Screenshot', path: '/assets/project-lms.jpg', type: 'image', category: 'Portfolio', dimensions: '1200 × 750' },
  { id: 'asset-proj-agro', name: 'AgroTech Platform Screenshot', path: '/assets/project-agro.jpg', type: 'image', category: 'Portfolio', dimensions: '1200 × 750' },
  { id: 'asset-proj-construction', name: 'Construction Platform Screenshot', path: '/assets/project-construction.jpg', type: 'image', category: 'Portfolio', dimensions: '1200 × 750' },
  { id: 'asset-proj-news', name: 'News Media Portal', path: '/assets/project-news.jpg', type: 'image', category: 'Portfolio', dimensions: '1200 × 750' },
  { id: 'asset-proj-linkroaster', name: 'LinkRoaster SaaS Platform', path: '/assets/project-linkroaster.jpg', type: 'image', category: 'Portfolio', dimensions: '1200 × 750' },
  { id: 'asset-proj-restaurant', name: 'Restaurant Web Ordering App', path: '/assets/project-restaurant.jpg', type: 'image', category: 'Portfolio', dimensions: '1200 × 750' },
  { id: 'asset-deal-handshake', name: 'Client Deal Handshake', path: '/assets/deal-handshake.jpg', type: 'image', category: 'General', dimensions: '1200 × 800' },
  { id: 'asset-hero-1', name: 'Hero Workspace Shot 1', path: '/assets/hero-1.jpg', type: 'image', category: 'Backgrounds & Video', dimensions: '1920 × 1080' },
  { id: 'asset-hero-2', name: 'Hero Workspace Shot 2', path: '/assets/hero-2.jpg', type: 'image', category: 'Backgrounds & Video', dimensions: '1920 × 1080' },
  { id: 'asset-hero-3', name: 'Hero Workspace Shot 3', path: '/assets/hero-3.jpg', type: 'image', category: 'Backgrounds & Video', dimensions: '1920 × 1080' },
  { id: 'asset-team-1', name: 'Team Member 1 Portrait', path: '/assets/team-1.jpg', type: 'image', category: 'About & Team', dimensions: '800 × 1000' },
  { id: 'asset-team-2', name: 'Team Member 2 Portrait', path: '/assets/team-2.jpg', type: 'image', category: 'About & Team', dimensions: '800 × 1000' },
  { id: 'asset-team-3', name: 'Team Member 3 Portrait', path: '/assets/team-3.jpg', type: 'image', category: 'About & Team', dimensions: '800 × 1000' },
];

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
    return readStoredData('decode_projects_v5', INITIAL_PROJECTS);
  });

  const [services, setServices] = useState(() => {
    return readStoredData('decode_services_v4', INITIAL_SERVICES);
  });

  const [testimonials, setTestimonials] = useState(() => {
    return readStoredData('decode_testimonials_v3', INITIAL_TESTIMONIALS);
  });

  const [faqs, setFaqs] = useState(() => {
    return readStoredData('decode_faqs_v1', INITIAL_FAQS);
  });

  const [standards, setStandards] = useState(() => {
    return readStoredData('decode_standards_v1', INITIAL_STANDARDS);
  });

  const [processSteps, setProcessSteps] = useState(() => {
    return readStoredData('decode_process_steps_v1', INITIAL_PROCESS_STEPS);
  });

  const [mediaAssets, setMediaAssets] = useState(() => {
    return readStoredData('decode_media_assets_v1', INITIAL_MEDIA_ASSETS);
  });

  const [siteContent, setSiteContent] = useState(() => {
    const saved = readStoredData('decode_site_content_v5', null);
    if (saved) return { ...INITIAL_CONTENT, ...saved };
    return INITIAL_CONTENT;
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
    writeStoredData('decode_projects_v5', projects);
  }, [projects]);

  useEffect(() => {
    writeStoredData('decode_services_v4', services);
  }, [services]);

  useEffect(() => {
    writeStoredData('decode_testimonials_v3', testimonials);
  }, [testimonials]);

  useEffect(() => {
    writeStoredData('decode_faqs_v1', faqs);
  }, [faqs]);

  useEffect(() => {
    writeStoredData('decode_standards_v1', standards);
  }, [standards]);

  useEffect(() => {
    writeStoredData('decode_process_steps_v1', processSteps);
  }, [processSteps]);

  useEffect(() => {
    writeStoredData('decode_media_assets_v1', mediaAssets);
  }, [mediaAssets]);

  useEffect(() => {
    writeStoredData('decode_site_content_v5', siteContent);
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

  // FAQ Mutations
  const addFaq = (faq) => {
    setFaqs((prev) => [...prev, { ...faq, id: `faq-${Date.now()}` }]);
  };

  const updateFaq = (id, updated) => {
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updated } : f)));
  };

  const deleteFaq = (id) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  const moveFaq = (id, direction) => {
    setFaqs((prev) => {
      const currentIndex = prev.findIndex((f) => f.id === id);
      const nextIndex = currentIndex + direction;
      if (currentIndex < 0 || nextIndex < 0 || nextIndex >= prev.length) return prev;
      const reordered = [...prev];
      [reordered[currentIndex], reordered[nextIndex]] = [reordered[nextIndex], reordered[currentIndex]];
      return reordered;
    });
  };

  // Standards Mutations
  const addStandard = (standard) => {
    setStandards((prev) => [...prev, { ...standard, id: `0${prev.length + 1}` }]);
  };

  const updateStandard = (id, updated) => {
    setStandards((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteStandard = (id) => {
    setStandards((prev) => prev.filter((s) => s.id !== id));
  };

  // Process Steps Mutations
  const updateProcessStep = (number, updated) => {
    setProcessSteps((prev) => prev.map((p) => (p.number === number ? { ...p, ...updated } : p)));
  };

  // Media Assets Mutations
  const addMediaAsset = (asset) => {
    setMediaAssets((prev) => [
      { ...asset, id: `asset-${Date.now()}`, isCustom: true },
      ...prev,
    ]);
  };

  const deleteMediaAsset = (id) => {
    setMediaAssets((prev) => prev.filter((a) => a.id !== id));
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
    setFaqs(INITIAL_FAQS);
    setStandards(INITIAL_STANDARDS);
    setProcessSteps(INITIAL_PROCESS_STEPS);
    setMediaAssets(INITIAL_MEDIA_ASSETS);
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
        faqs,
        standards,
        processSteps,
        mediaAssets,
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
        addFaq,
        updateFaq,
        deleteFaq,
        moveFaq,
        addStandard,
        updateStandard,
        deleteStandard,
        updateProcessStep,
        addMediaAsset,
        deleteMediaAsset,
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
