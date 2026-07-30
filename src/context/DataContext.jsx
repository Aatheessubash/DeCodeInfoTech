import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const INITIAL_PROJECTS = [
  {
    id: 'lms',
    title: 'Azhagappar Academy LMS Platform',
    category: 'Education / Learning Management',
    image: '/assets/project-lms.jpg',
    problem: 'The academy required a centralized digital learning platform to host course materials, manage student enrollments, and track academic progress online.',
    solution: 'DeCode designed and engineered an intuitive, fast-loading LMS with real-time course analytics, student portals, and automated progress reporting.',
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    id: 'construction',
    title: 'Construction Operations Platform',
    category: 'Business Operations SaaS',
    image: '/assets/project-construction.jpg',
    problem: 'Manual tracking of construction sites, equipment dispatching, and material inventory caused operational delays and budget overruns.',
    solution: 'We engineered a custom web platform providing real-time project dashboards, resource allocation tools, and automated inventory alerts.',
    tech: ['React.js', 'TypeScript', 'Express', 'MongoDB'],
  },
  {
    id: 'agro',
    title: 'AgroMate Agriculture Hub',
    category: 'AgriTech Web Portal',
    image: '/assets/project-agro.jpg',
    problem: 'Local farming communities lacked accessible, real-time market pricing updates, crop disease diagnostics, and direct buyer connections.',
    solution: 'DeCode built a modern digital web application offering live market feeds, weather forecasting analytics, and a direct trade marketplace.',
    tech: ['Vite', 'React.js', 'REST API', 'Chart.js'],
  },
  {
    id: 'linkroaster',
    title: 'Link Roaster Chrome Extension',
    category: 'Developer & SEO Tool',
    image: '/assets/project-linkroaster.jpg',
    problem: 'Webmasters and content teams spent hours manually auditing websites for broken links, redirect chains, and missing SEO tags.',
    solution: 'We built a high-speed browser extension that instantly scans webpage URLs, highlights broken references, and outputs detailed SEO reports.',
    tech: ['JavaScript ES6+', 'Chrome Extension API', 'DOM Parser'],
  },
  {
    id: 'restaurant',
    title: 'Vetrivel Unavagam Web App',
    category: 'Hospitality & Dining',
    image: '/assets/project-restaurant.jpg',
    problem: 'Traditional phone reservations created peak-hour bottlenecks and customer drop-offs during busy weekend dining shifts.',
    solution: 'DeCode delivered a mobile-responsive restaurant website with contactless menu browsing, automated table bookings, and customer review management.',
    tech: ['React.js', 'CSS Modules', 'Webhooks', 'Vite'],
  },
  {
    id: 'news',
    title: 'News & Media Web Portal',
    category: 'Content Platform',
    image: '/assets/project-news.jpg',
    problem: 'A growing news publication needed a high-performance content portal capable of delivering breaking news alerts with zero lag under high traffic spikes.',
    solution: 'We developed an ultra-fast news web application featuring dynamic category filters, article search, and optimized asset delivery.',
    tech: ['Next.js', 'React.js', 'GraphQL', 'Vercel'],
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

export function DataProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('decode_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('decode_services_v2');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('decode_testimonials_v2');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [siteContent, setSiteContent] = useState(() => {
    const saved = localStorage.getItem('decode_site_content');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [jobApplications, setJobApplications] = useState(() => {
    const saved = localStorage.getItem('decode_job_applications');
    return saved ? JSON.parse(saved) : [];
  });

  const [jobPostings, setJobPostings] = useState(() => {
    const saved = localStorage.getItem('decode_job_postings');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'job-1',
            title: 'Senior Full Stack Developer',
            department: 'Engineering',
            location: 'Hybrid / Remote',
            type: 'Full Time',
            experience: '3+ Years',
            summary: 'Build high-performance web applications using React.js, Node.js, Express, and cloud deployment pipelines.',
          },
          {
            id: 'job-2',
            title: 'UI/UX Product Designer',
            department: 'Design',
            location: 'Remote',
            type: 'Full Time',
            experience: '2+ Years',
            summary: 'Craft high-converting, aesthetically stunning user interfaces and micro-animations for enterprise and startup clients.',
          },
          {
            id: 'job-3',
            title: 'Frontend Web Specialist',
            department: 'Engineering',
            location: 'Remote',
            type: 'Full Time',
            experience: '2+ Years',
            summary: 'Specialize in building ultra-fast responsive user interfaces, animations, and Core Web Vitals optimization.',
          },
          {
            id: 'job-4',
            title: 'DevOps & Cloud Engineer',
            department: 'Infrastructure',
            location: 'Remote',
            type: 'Full Time / Contract',
            experience: '3+ Years',
            summary: 'Manage automated GitHub Actions CI/CD pipelines, Docker containerization, and AWS/Vercel cloud infrastructure.',
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem('decode_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('decode_services_v2', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('decode_testimonials_v2', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('decode_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem('decode_job_applications', JSON.stringify(jobApplications));
  }, [jobApplications]);

  useEffect(() => {
    localStorage.setItem('decode_job_postings', JSON.stringify(jobPostings));
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
        isAdminOpen,
        setIsAdminOpen,
        addProject,
        updateProject,
        deleteProject,
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
        updateSiteContent,
        resetAllData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
