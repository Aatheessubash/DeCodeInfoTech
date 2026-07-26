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
    title: 'Web Design & Experience',
    desc: 'High-converting UI/UX designs crafted specifically for modern brands, startups, and growing enterprises.',
    deliverables: [
      'Custom Web & Product Design',
      'Mobile-First Responsive Layouts',
      'Design Systems & UI Kits',
      'Interactive Wireframes & Prototypes',
    ],
    icon: '✦',
  },
  {
    id: '02',
    title: 'Full-Stack Web Development',
    desc: 'Fast, secure, and maintainable web applications engineered with clean code and modern frameworks.',
    deliverables: [
      'React JS, Next.js & Vite Applications',
      'Custom Web Platforms & Dashboards',
      'API Integration & CMS Setup',
      'Performance & Speed Optimization',
    ],
    icon: '⚡',
  },
  {
    id: '03',
    title: 'Web Application Development',
    desc: 'Scalable custom software designed to streamline business workflows, automate tasks, and handle high traffic.',
    deliverables: [
      'SaaS Platforms & Enterprise Portals',
      'Custom Admin Dashboards',
      'Database Architecture & Security',
      'Role-Based Access Control',
    ],
    icon: '⚙',
  },
  {
    id: '04',
    title: 'Website Optimization & SEO',
    desc: 'Turn visitor traffic into paying customers with optimized page loading speeds and search rankings.',
    deliverables: [
      'Core Web Vitals Optimization',
      'Technical & On-Page SEO',
      'Conversion Rate Optimization (CRO)',
      'Cross-Browser & Device Audit',
    ],
    icon: '📈',
  },
  {
    id: '05',
    title: 'Website Redesign & Refresh',
    desc: 'Transform outdated websites into sleek, modern digital products that reflect your true business quality.',
    deliverables: [
      'Modern Visual UI Upgrade',
      'Mobile Responsiveness Overhaul',
      'Code Refactoring & Cleanup',
      'Content Restructuring',
    ],
    icon: '🎨',
  },
  {
    id: '06',
    title: 'Ongoing Support & Growth',
    desc: 'Reliable long-term technical support, updates, and maintenance to keep your digital product running smoothly.',
    deliverables: [
      'Security & Dependency Updates',
      'Feature Enhancements & Scaling',
      'Monthly Performance Monitoring',
      'Priority Technical Support',
    ],
    icon: '🛡',
  },
];

const INITIAL_TESTIMONIALS = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    role: 'Founder & CEO',
    company: 'Azhagappar Academy',
    avatar: '✦',
    text: 'DeCode delivered our LMS platform ahead of schedule. The user interface is exceptionally smooth and our student engagement increased by 140% in the first month.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Priya Sundaram',
    role: 'Head of Operations',
    company: 'AgroMate Technologies',
    avatar: '⚡',
    text: 'Working with the DeCode team was effortless. They understood our complex business requirements immediately and built an ultra-fast web application our farmers love.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Karthik Nathan',
    role: 'Managing Director',
    company: 'Vetrivel Hospitality',
    avatar: '★',
    text: 'Our online bookings doubled after DeCode redesigned our web app. Their attention to detail, performance optimization, and post-launch support is top tier.',
    rating: 5,
  },
];

const INITIAL_CONTENT = {
  heroEyebrow: 'WHERE VISION BECOMES REALITY',
  heroHeadline: 'We build digital experiences that help businesses grow.',
  heroSubtext: 'From high-converting websites to complete custom web platforms — DeCode designs, builds, and launches fast, scalable digital products engineered for long-term growth.',
  agencyName: 'DeCode Studio',
  contactEmail: 'hello@decode.com',
  contactLocation: 'Tamil Nadu, India',
};

export function DataProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('decode_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('decode_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('decode_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [siteContent, setSiteContent] = useState(() => {
    const saved = localStorage.getItem('decode_site_content');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('decode_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('decode_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('decode_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('decode_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

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

  // Content Mutations
  const updateSiteContent = (newContent) => {
    setSiteContent((prev) => ({ ...prev, ...newContent }));
  };

  const resetAllData = () => {
    setProjects(INITIAL_PROJECTS);
    setServices(INITIAL_SERVICES);
    setTestimonials(INITIAL_TESTIMONIALS);
    setSiteContent(INITIAL_CONTENT);
    localStorage.clear();
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        services,
        testimonials,
        siteContent,
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
