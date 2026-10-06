import type { Metadata } from 'next';

export const siteUrl = 'https://decodeinfotech.in';

export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  summary: string;
  focusKeyword: string;
  image: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly';
  sections: {
    title: string;
    body: string;
  }[];
  highlights: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export const seoPages: SeoPage[] = [
  {
    slug: 'web-development',
    title: 'Web Development Company in Coimbatore | DeCode InfoTech',
    description:
      'DeCode InfoTech builds fast, SEO-ready business websites and web applications for companies in Coimbatore, Tamil Nadu, and growing markets.',
    h1: 'Web Development Company in Coimbatore',
    eyebrow: 'Web Development',
    summary:
      'Launch a high-performance website or custom web application that is easy to manage, fast on mobile, and built around real business goals.',
    focusKeyword: 'web development company in Coimbatore',
    image: '/assets/project-news.jpg',
    priority: 0.9,
    changeFrequency: 'weekly',
    sections: [
      {
        title: 'Business websites that work beyond launch',
        body: 'We design and build websites for lead generation, service discovery, ecommerce, bookings, dashboards, and content-led growth. Each build includes clean information architecture, responsive layouts, analytics readiness, and practical technical SEO foundations.',
      },
      {
        title: 'Modern web application engineering',
        body: 'For teams that need more than a brochure site, DeCode InfoTech develops secure portals, workflow tools, and custom applications using React, Next.js, Node.js, API integrations, and cloud deployment pipelines.',
      },
    ],
    highlights: [
      'Responsive business websites',
      'Custom React and Next.js applications',
      'CMS-ready page structures',
      'Technical SEO and performance cleanup',
    ],
    faqs: [
      {
        question: 'Do you build SEO-friendly websites in Coimbatore?',
        answer:
          'Yes. We plan page structure, metadata, headings, image alt text, sitemap coverage, internal links, and performance from the start.',
      },
      {
        question: 'Can you redesign an existing website?',
        answer:
          'Yes. We can rebuild outdated websites while preserving important URLs, improving speed, and setting up redirects where needed.',
      },
    ],
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development Company in Coimbatore | DeCode InfoTech',
    description:
      'Build iOS, Android, and cross-platform mobile apps with DeCode InfoTech, a Coimbatore software team focused on reliable product engineering.',
    h1: 'Mobile App Development Company in Coimbatore',
    eyebrow: 'Mobile Apps',
    summary:
      'Turn your app idea into a stable mobile product with clear user flows, scalable APIs, offline-ready thinking, and launch support.',
    focusKeyword: 'mobile app development company in Coimbatore',
    image: '/assets/project-lms.jpg',
    priority: 0.85,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'Apps designed around real user journeys',
        body: 'We map onboarding, core actions, notifications, account flows, and admin workflows before development so your mobile app feels simple for users and manageable for your team.',
      },
      {
        title: 'Backend, APIs, and deployment included',
        body: 'Our mobile app work can include secure APIs, dashboards, payment integrations, push notifications, app store preparation, and post-launch maintenance.',
      },
    ],
    highlights: [
      'iOS and Android app development',
      'Cross-platform product builds',
      'API and admin dashboard development',
      'App store launch support',
    ],
    faqs: [
      {
        question: 'Can you build both the mobile app and backend?',
        answer:
          'Yes. DeCode InfoTech can handle the app interface, backend APIs, database, admin panel, and deployment workflow.',
      },
      {
        question: 'Do you support app updates after launch?',
        answer:
          'Yes. We offer maintenance for bug fixes, security updates, performance improvements, and new feature releases.',
      },
    ],
  },
  {
    slug: 'saas-development',
    title: 'SaaS Development Company | DeCode InfoTech Coimbatore',
    description:
      'DeCode InfoTech develops SaaS products with multi-tenant architecture, dashboards, subscriptions, roles, analytics, and scalable cloud deployment.',
    h1: 'SaaS Development Company',
    eyebrow: 'SaaS Engineering',
    summary:
      'Build a subscription-ready SaaS platform with the foundations needed for onboarding, billing, access control, analytics, and growth.',
    focusKeyword: 'SaaS development company',
    image: '/assets/project-agro.jpg',
    priority: 0.85,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'Product foundations for long-term scale',
        body: 'We help SaaS founders and businesses plan core modules, user roles, tenant boundaries, data models, dashboards, and release priorities before writing production code.',
      },
      {
        title: 'From MVP to mature platform',
        body: 'DeCode InfoTech can build MVPs, rebuild fragile prototypes, or extend existing SaaS systems with payments, reporting, workflow automation, integrations, and performance improvements.',
      },
    ],
    highlights: [
      'SaaS MVP development',
      'Multi-tenant architecture',
      'Role-based access control',
      'Dashboards, analytics, and billing integrations',
    ],
    faqs: [
      {
        question: 'Can you build a SaaS MVP first?',
        answer:
          'Yes. We can define and build a focused MVP, then expand it with analytics, subscriptions, automation, and integrations.',
      },
      {
        question: 'Do you work with existing SaaS products?',
        answer:
          'Yes. We can audit, refactor, optimize, and extend existing SaaS platforms without forcing a complete rebuild when it is not needed.',
      },
    ],
  },
  {
    slug: 'crm-automation',
    title: 'CRM Automation and Custom Software in Coimbatore | DeCode InfoTech',
    description:
      'Automate sales, operations, follow-ups, reporting, and customer workflows with custom CRM and business automation software from DeCode InfoTech.',
    h1: 'CRM Automation and Custom Software in Coimbatore',
    eyebrow: 'CRM Automation',
    summary:
      'Replace scattered spreadsheets and manual follow-ups with practical CRM workflows, dashboards, reminders, and integrations built for your team.',
    focusKeyword: 'CRM development company in Coimbatore',
    image: '/assets/project-construction.jpg',
    priority: 0.8,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'Automation for everyday business operations',
        body: 'We design CRM and workflow tools for lead tracking, quotations, service requests, task assignment, customer records, reports, and repeatable operating processes.',
      },
      {
        title: 'Built around your process',
        body: 'Instead of forcing your team into generic software, we study your actual workflow and build custom screens, permissions, alerts, and reports around how your business runs.',
      },
    ],
    highlights: [
      'Lead and customer management',
      'Sales pipeline automation',
      'Custom dashboards and reports',
      'Email, WhatsApp, and API integrations',
    ],
    faqs: [
      {
        question: 'Can you customize CRM workflows for our business?',
        answer:
          'Yes. We can design modules, fields, permissions, reports, and automations around your current operating process.',
      },
      {
        question: 'Can a custom CRM connect to existing tools?',
        answer:
          'Yes. We can integrate with forms, email, WhatsApp links, payment tools, internal systems, and third-party APIs where available.',
      },
    ],
  },
  {
    slug: 'ui-ux-design',
    title: 'UI UX Design Company in Coimbatore | DeCode InfoTech',
    description:
      'DeCode InfoTech designs user-friendly websites, dashboards, SaaS products, and mobile app interfaces with research-led UI UX design.',
    h1: 'UI UX Design Company in Coimbatore',
    eyebrow: 'UI UX Design',
    summary:
      'Create clean, conversion-focused product interfaces that help users understand, decide, and act with less friction.',
    focusKeyword: 'UI UX design company in Coimbatore',
    image: '/assets/portfolio-2.jpg',
    priority: 0.8,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'Interfaces shaped by user intent',
        body: 'We design websites, SaaS dashboards, mobile apps, landing pages, and internal tools with clear hierarchy, accessible interactions, and business-focused user journeys.',
      },
      {
        title: 'Design systems that support development',
        body: 'Our UI work can include wireframes, Figma prototypes, component libraries, responsive states, and developer-ready handoff details for faster implementation.',
      },
    ],
    highlights: [
      'Website and app interface design',
      'Figma prototypes and wireframes',
      'Dashboard UX and product flows',
      'Design systems and component libraries',
    ],
    faqs: [
      {
        question: 'Do you provide Figma designs before development?',
        answer:
          'Yes. We can produce wireframes, high-fidelity screens, prototypes, and component specifications before engineering starts.',
      },
      {
        question: 'Can you improve an existing product UX?',
        answer:
          'Yes. We can audit confusing flows, simplify navigation, improve visual hierarchy, and redesign key screens.',
      },
    ],
  },
  {
    slug: 'industrial-automation',
    title: 'Industrial Automation, AI and IoT Solutions | DeCode InfoTech',
    description:
      'DeCode InfoTech builds industrial automation, AI, IoT telemetry, monitoring, dashboards, and smart workflow systems for operational teams.',
    h1: 'Industrial Automation, AI and IoT Solutions',
    eyebrow: 'Industrial Automation',
    summary:
      'Connect machines, data, and teams with smart monitoring systems, IoT dashboards, AI-assisted inspection workflows, and operational automation.',
    focusKeyword: 'industrial automation software company',
    image: '/assets/portfolio-neuerung.jpg',
    priority: 0.75,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'Practical automation for industrial teams',
        body: 'We help manufacturers and operations teams track equipment data, visualize alerts, automate reports, and reduce manual coordination through custom software.',
      },
      {
        title: 'AI and IoT connected workflows',
        body: 'DeCode InfoTech can build telemetry dashboards, sensor data pipelines, computer vision workflows, device integrations, and remote monitoring interfaces.',
      },
    ],
    highlights: [
      'IoT telemetry dashboards',
      'AI inspection workflows',
      'Remote monitoring systems',
      'Operations reporting and alerts',
    ],
    faqs: [
      {
        question: 'Can you build dashboards for IoT device data?',
        answer:
          'Yes. We can create dashboards for live device data, alerts, reports, and operational insights.',
      },
      {
        question: 'Do you work on AI-assisted industrial workflows?',
        answer:
          'Yes. We can help design practical AI workflows for inspection, classification, monitoring, and decision support.',
      },
    ],
  },
  {
    slug: '3d-motion-design',
    title: '3D Motion Design and Digital Media | DeCode InfoTech',
    description:
      'Create product visuals, motion graphics, brand media, technical explainers, and digital content assets with DeCode InfoTech.',
    h1: '3D Motion Design and Digital Media',
    eyebrow: 'Motion and Media',
    summary:
      'Use polished visual storytelling to explain products, improve brand trust, support launches, and make technical ideas easier to understand.',
    focusKeyword: '3D motion design company',
    image: '/assets/portfolio-3.jpg',
    priority: 0.7,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'Visual assets for products and brands',
        body: 'We create motion-led visual content for websites, product demos, launch campaigns, service explainers, and investor or sales presentations.',
      },
      {
        title: 'Designed to support digital growth',
        body: 'Our media work pairs with web, SaaS, and marketing builds so visuals are optimized for landing pages, social platforms, presentations, and technical storytelling.',
      },
    ],
    highlights: [
      'Product explainers and motion graphics',
      '3D-style brand visuals',
      'Launch and campaign assets',
      'Website-ready media content',
    ],
    faqs: [
      {
        question: 'Can you create visuals for a product launch?',
        answer:
          'Yes. We can create website visuals, launch videos, motion assets, and technical explainers for product campaigns.',
      },
      {
        question: 'Can motion design be used on the website?',
        answer:
          'Yes. We can prepare optimized visual assets that support page speed and fit the website experience.',
      },
    ],
  },
  {
    slug: 'about',
    title: 'About DeCode InfoTech | Software Company in Coimbatore',
    description:
      'Learn about DeCode InfoTech, a Coimbatore software company building websites, SaaS platforms, mobile apps, automation tools, and digital products.',
    h1: 'About DeCode InfoTech',
    eyebrow: 'About',
    summary:
      'We are a Coimbatore-based digital engineering team helping businesses turn ideas, workflows, and growth plans into dependable software.',
    focusKeyword: 'software company in Coimbatore',
    image: '/assets/who-we-are.jpg',
    priority: 0.75,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'Built for practical business outcomes',
        body: 'DeCode InfoTech combines strategy, design, and engineering to build digital products that solve operational problems, improve customer experience, and support measurable growth.',
      },
      {
        title: 'Local presence, broader delivery',
        body: 'From Coimbatore, we support businesses across Tamil Nadu, India, and global markets with websites, SaaS products, CRM systems, mobile apps, automation, and long-term support.',
      },
    ],
    highlights: [
      'Coimbatore software development team',
      'Web, mobile, SaaS, and automation expertise',
      'Design-led engineering process',
      'Maintenance and growth support',
    ],
    faqs: [
      {
        question: 'Where is DeCode InfoTech based?',
        answer:
          'DeCode InfoTech is based in Coimbatore, Tamil Nadu, and works with clients locally and beyond.',
      },
      {
        question: 'What does DeCode InfoTech build?',
        answer:
          'We build websites, web apps, SaaS platforms, mobile apps, CRM automation systems, industrial automation tools, and digital media assets.',
      },
    ],
  },
  {
    slug: 'contact',
    title: 'Contact DeCode InfoTech | Software Development in Coimbatore',
    description:
      'Contact DeCode InfoTech for websites, mobile apps, SaaS development, CRM automation, UI UX design, and custom software projects in Coimbatore.',
    h1: 'Contact DeCode InfoTech',
    eyebrow: 'Contact',
    summary:
      'Tell us what you want to build. We will help you shape the scope, choose the right technical path, and plan a clear next step.',
    focusKeyword: 'software development company in Coimbatore contact',
    image: '/assets/who-we-are.jpg',
    priority: 0.8,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'Start with a clear project conversation',
        body: 'Share your goals, current challenges, timeline, and budget range. Our team will respond with practical direction for your website, app, SaaS, CRM, automation, or design project.',
      },
      {
        title: 'Coimbatore service area',
        body: 'We work with businesses in Coimbatore and across Tamil Nadu, while also supporting remote product teams and growing companies in other markets.',
      },
    ],
    highlights: [
      'Project consultation',
      'Website and app estimates',
      'SaaS and automation planning',
      'Support for Coimbatore businesses',
    ],
    faqs: [
      {
        question: 'How can I contact DeCode InfoTech?',
        answer:
          'You can email contact@decodeinfotech.in, call 7092802364, or use the contact form on this website.',
      },
      {
        question: 'Can I request a quote for a project?',
        answer:
          'Yes. Send your project requirements and we will help estimate scope, timeline, and next steps.',
      },
    ],
  },
  {
    slug: 'portfolio',
    title: 'Portfolio and Case Studies | DeCode InfoTech',
    description:
      'Explore DeCode InfoTech project examples across education, construction, healthtech, hospitality, SaaS, websites, and digital product engineering.',
    h1: 'Portfolio and Case Studies',
    eyebrow: 'Portfolio',
    summary:
      'See how DeCode InfoTech approaches real business problems with design, engineering, automation, and growth-focused digital products.',
    focusKeyword: 'software development portfolio Coimbatore',
    image: '/assets/portfolio-1.jpg',
    priority: 0.75,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'Project work across business categories',
        body: 'Our work includes learning platforms, construction websites, healthtech portals, hospitality systems, SaaS tools, and digital experiences tailored to specific business models.',
      },
      {
        title: 'Case-study driven growth content',
        body: 'Portfolio pages and case studies help prospects understand how we solve problems, not just what technologies we use. This also supports stronger search visibility over time.',
      },
    ],
    highlights: [
      'EdTech and LMS platforms',
      'Construction and service websites',
      'Healthtech and IoT portals',
      'Hospitality and POS software',
    ],
    faqs: [
      {
        question: 'Can I see examples of DeCode InfoTech work?',
        answer:
          'Yes. The portfolio highlights selected work across websites, SaaS, healthtech, hospitality, and business platforms.',
      },
      {
        question: 'Do you create case studies for completed projects?',
        answer:
          'Yes. Case studies are a useful way to document goals, solutions, outcomes, and technical decisions.',
      },
    ],
  },
  {
    slug: 'blog',
    title: 'Software Development Blog | DeCode InfoTech',
    description:
      'Read DeCode InfoTech insights on web development, SaaS, CRM automation, mobile apps, UI UX design, technical SEO, and digital product growth.',
    h1: 'Software Development Blog',
    eyebrow: 'Blog',
    summary:
      'Useful guides, project notes, and technical articles for businesses planning websites, apps, SaaS products, automation systems, and digital growth.',
    focusKeyword: 'software development blog Coimbatore',
    image: '/assets/project-news.jpg',
    priority: 0.65,
    changeFrequency: 'weekly',
    sections: [
      {
        title: 'Content that builds search authority',
        body: 'Instead of thin keyword posts, this blog should publish practical guides, project breakdowns, cost explainers, SaaS planning notes, CRM automation examples, and technical SEO articles.',
      },
      {
        title: 'A hub for future case studies',
        body: 'As new projects launch, this route can grow into a library of case studies and educational articles that link back to the relevant service pages.',
      },
    ],
    highlights: [
      'Web and mobile development guides',
      'SaaS planning articles',
      'CRM automation examples',
      'Case studies and technical SEO notes',
    ],
    faqs: [
      {
        question: 'What should DeCode InfoTech publish first?',
        answer:
          'Start with service-specific guides, project case studies, CRM automation examples, SaaS planning articles, and website cost guides for Coimbatore businesses.',
      },
      {
        question: 'How does blogging help SEO?',
        answer:
          'Useful articles can earn impressions for long-tail searches, support internal linking, and demonstrate real expertise around your services.',
      },
    ],
  },
];

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}

export function createPageMetadata(page: SeoPage): Metadata {
  const canonical = `${siteUrl}/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: 'DeCode InfoTech',
      images: [
        {
          url: page.image,
          width: 1200,
          height: 800,
          alt: page.h1,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [page.image],
    },
  };
}
