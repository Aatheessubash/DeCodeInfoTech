import type { Metadata } from 'next';

export const siteUrl = 'https://www.decodeinfotech.in';

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
    title: 'High-Performance Web Development Services | DeCode InfoTech',
    description:
      'DeCode InfoTech engineers lightning-fast, conversion-focused modern websites and custom web applications with Next.js, React, TypeScript, and modern cloud deployment.',
    h1: 'High-Performance Web Development & Engineering',
    eyebrow: '',
    summary:
      'Launch ultra-fast, responsive web experiences engineered for measurable business growth. We build bespoke corporate platforms, high-converting landing funnels, and scalable web applications with clean architecture and zero-compromise performance.',
    focusKeyword: 'web development company in Coimbatore',
    image: '/assets/project-news.jpg',
    priority: 0.9,
    changeFrequency: 'weekly',
    sections: [
      {
        title: 'Modern Next.js & React Full-Stack Architecture',
        body: 'We build exclusively with modern production frameworks including Next.js, React, Node.js, and TypeScript. By leveraging server-side rendering (SSR), static site generation (SSG), and incremental static regeneration (ISR), our web applications achieve sub-second load times, flawless responsiveness across every device viewport, and maximum Core Web Vitals scores.',
      },
      {
        title: 'Conversion-Led Engineering & Technical SEO Foundations',
        body: 'A website is only as valuable as the conversions it generates. We architect every page around intentional user journeys, high-converting lead funnels, and technical SEO excellence. From semantic HTML5, clean OpenGraph tags, and schema structured data to automated XML sitemaps and edge CDN caching, your site is built to dominate search engine rankings.',
      },
      {
        title: 'Custom Web Portals, Admin Dashboards & API Ecosystems',
        body: 'For businesses requiring custom workflows beyond static marketing pages, DeCode builds secure customer portals, role-based admin consoles, and complex API integrations. Whether connecting with ERPs, payment gateways, CRM pipelines, or third-party webhooks, we ensure data synchronizes instantly and reliably.',
      },
      {
        title: 'Enterprise Security, Zero-Downtime CI/CD & Cloud Hosting',
        body: 'We configure automated GitHub Actions CI/CD pipelines, SSL encryption, security header hardening, and automated database backups on robust cloud infrastructure (Vercel, AWS, GCP). Every production release is tested, optimized, and deployed with zero downtime.',
      },
    ],
    highlights: [
      'Custom Next.js, React & TypeScript web development',
      '95+ Google Lighthouse & Core Web Vitals optimization',
      'Comprehensive technical SEO & structured schema markup',
      'Headless CMS integration (Sanity, Strapi, WordPress)',
      'Secure REST & GraphQL API integrations with third-party tools',
      'Automated CI/CD build pipelines & cloud infrastructure setup',
    ],
    faqs: [
      {
        question: 'Which tech stack do you recommend for modern web development?',
        answer:
          'We primarily use Next.js, React, TypeScript, Tailwind CSS, and Node.js deployed on Vercel or AWS. This stack provides unparalleled rendering speed, SEO advantages, enterprise-grade type safety, and seamless scalability.',
      },
      {
        question: 'Will our website achieve top Google Core Web Vitals scores?',
        answer:
          'Yes. We optimize every asset, implement next-gen image compression (WebP/AVIF), eliminate render-blocking CSS, and remove DOM bloat to ensure scores consistently exceed 90+ on desktop and mobile.',
      },
      {
        question: 'Can we easily update and manage website content after launch?',
        answer:
          'Yes. We integrate user-friendly headless CMS solutions (or tailored admin panels) that allow your marketing team to edit text, publish articles, add media, and update banners without writing any code.',
      },
      {
        question: 'Do we retain full ownership of the source code and assets?',
        answer:
          '100%. Upon project completion and final handover, all intellectual property, source code repositories, design assets, and cloud credentials belong entirely to you with zero vendor lock-in.',
      },
      {
        question:
          'Can you redesign our existing website without losing current Google search rankings?',
        answer:
          'Yes. We execute comprehensive SEO audits, compile 301 URL redirect maps, preserve URL slug structures, and safeguard keyword rankings so your organic traffic continues growing through and after launch.',
      },
    ],
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development & Engineering | DeCode InfoTech',
    description:
      'DeCode InfoTech engineers native and cross-platform iOS and Android mobile applications featuring fluid gesture navigation, offline-first sync, real-time push alerts, and scalable cloud backends.',
    h1: 'Mobile App Development & Engineering',
    eyebrow: '',
    summary:
      'Turn your mobile product concept into a high-performance iOS and Android application. We engineer fluid, intuitive mobile experiences backed by robust cloud APIs, offline synchronization, biometric security, and full App Store and Play Store launch support.',
    focusKeyword: 'mobile app development company in Coimbatore',
    image: '/assets/project-lms.jpg',
    priority: 0.85,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'Cross-Platform Efficiency with Native Fluidity',
        body: 'We utilize modern frameworks like React Native and Flutter to deliver 60 FPS native performance, platform-consistent UI/UX, and unified single-codebase velocity across both Apple iOS and Google Android. Your product gets to market faster with reduced maintenance overhead and uniform feature parity.',
      },
      {
        title: 'Offline-First Architecture & Real-Time Sync',
        body: 'Field technicians, mobile customers, and traveling executives often face spotty connectivity. We architect our mobile applications with local SQLite/WatermelonDB storage, background data syncing, and optimistic UI updates so users can browse, draft, and take action without waiting for network connectivity.',
      },
      {
        title: 'Cloud APIs, Microservices & Admin Orchestration',
        body: 'A mobile application is only as powerful as the backend powering it. DeCode engineers secure REST and WebSocket cloud backends, payment gateway integrations (Stripe, Razorpay), automated push notifications (FCM/APNs), and centralized web admin consoles for end-to-end operational visibility.',
      },
      {
        title: 'Strict Security, Compliance & App Store Submission',
        body: 'From biometric authentication (Face ID/Fingerprint) and token-based JWT sessions to end-to-end data encryption and Apple/Google review guidelines compliance, we manage the entire publishing pipeline from TestFlight betas to public store distribution.',
      },
    ],
    highlights: [
      'Cross-platform iOS and Android mobile development',
      '60 FPS fluid UI/UX with platform-native gesture control',
      'Offline-first local caching and background cloud sync',
      'Push notification pipelines via Apple APNs & Google FCM',
      'Biometric authentication & secure payment integrations',
      'End-to-end App Store & Google Play Store publishing support',
    ],
    faqs: [
      {
        question: 'Do you build cross-platform apps or native apps?',
        answer:
          'We specialize in cross-platform development using React Native and Flutter. This allows us to ship one clean codebase to both iOS and Android simultaneously, cutting development cost in half while maintaining authentic native feel and responsiveness.',
      },
      {
        question: 'Can you build the backend APIs and admin dashboard as well?',
        answer:
          'Yes. We provide complete end-to-end engineering, including secure cloud databases, authentication services, payment workflows, and web-based administrative consoles to manage app content and user data.',
      },
      {
        question: 'How do you handle App Store and Play Store review guidelines?',
        answer:
          'We handle all developer console provisioning, certificate signing, privacy policy compliance, app icon sizing, screenshots, and submission checklists to guarantee a frictionless app review and approval process.',
      },
      {
        question: 'Can the mobile app work without an active internet connection?',
        answer:
          'Yes. We implement offline-first database architectures that cache essential data locally, allowing uninterrupted offline interaction, and automatically resolve conflicts when an internet connection is re-established.',
      },
      {
        question: 'What ongoing support and maintenance do you offer after launch?',
        answer:
          'We provide ongoing SLA maintenance covering new iOS/Android OS version compatibility, third-party API deprecations, crash analytics monitoring, performance tuning, and agile sprint-based feature expansions.',
      },
    ],
  },
  {
    slug: 'saas-development',
    title: 'SaaS Product Development & Multi-Tenant Cloud Engineering | DeCode InfoTech',
    description:
      'DeCode InfoTech engineers scalable multi-tenant SaaS platforms, interactive analytics dashboards, subscription billing engines, and enterprise security frameworks for modern software ventures.',
    h1: 'SaaS & Custom Web App Development',
    eyebrow: '',
    summary:
      'Architect, build, and scale subscription software with confidence. We partner with ambitious founders and enterprise teams to engineer multi-tenant SaaS products with frictionless onboarding, recurring billing, role-based permissions, and real-time analytics.',
    focusKeyword: 'SaaS development company',
    image: '/assets/project-agro.jpg',
    priority: 0.85,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'Bulletproof Multi-Tenant Cloud Architecture',
        body: 'Scaling a SaaS platform requires strict tenant data isolation, predictable query performance, and elastic cloud infrastructure. We design database schemas with row-level security (RLS) or dedicated tenant schemas, paired with containerized microservices that scale horizontally on Kubernetes, AWS, or Google Cloud.',
      },
      {
        title: 'Automated Subscription Billing & License Management',
        body: 'Monetization must be flexible. We integrate enterprise billing infrastructure via Stripe, Paddle, and Razorpay — supporting tiered subscriptions, seat-based billing, usage metered invoices, automated proration, and dunning management that recovers churned payments automatically.',
      },
      {
        title: 'Interactive Dashboards & Real-Time Business Analytics',
        body: 'Empower your end users with rich, high-speed data visualizations. We build custom interactive charts, audit logs, CSV/PDF report generators, and live activity streams that transform complex datasets into actionable operational intelligence.',
      },
      {
        title: 'Granular Role-Based Access Control (RBAC) & SSO',
        body: 'Enterprise clients expect enterprise-grade governance. We implement fine-grained role-based access control, team member workspace invites, audit trail logs, and SAML 2.0 / OAuth2 single sign-on (SSO) integrations (Google Workspace, Microsoft Entra ID, Okta).',
      },
    ],
    highlights: [
      'Multi-tenant architecture with strict tenant isolation (RLS)',
      'Stripe, Paddle & Razorpay automated subscription billing',
      'Granular role-based access control (RBAC) & SSO (SAML/OAuth)',
      'Interactive data visualization dashboards & report generators',
      'RESTful & GraphQL API gateway design for third-party developers',
      'Horizontal cloud autoscaling with Docker & Kubernetes',
    ],
    faqs: [
      {
        question: 'Can you help us build a SaaS MVP before committing to full platform scale?',
        answer:
          'Yes. We frequently build rapid, high-impact MVPs focusing on your core differentiator and automated subscription flow, allowing you to validate market demand, onboard pilot clients, and gather user feedback within 8-12 weeks.',
      },
      {
        question: 'How do you ensure data isolation between different customer accounts?',
        answer:
          'We enforce strict tenant boundaries at the database level using PostgreSQL Row-Level Security (RLS) or isolated database schemas, paired with cryptographic session tokens to ensure cross-tenant data leakage is mathematically impossible.',
      },
      {
        question: 'Can you integrate our SaaS with external platforms via webhooks and APIs?',
        answer:
          'Yes. We design public-facing developer APIs with Swagger/OpenAPI documentation, API key management, rate limiting, and outgoing webhook systems so your customers can connect their tools directly.',
      },
      {
        question: 'What database and cloud infrastructure do you recommend for SaaS?',
        answer:
          'We typically recommend PostgreSQL (Supabase or AWS Aurora) for relational ACID data, Redis for sub-millisecond caching and session state, and Next.js / Node.js deployed on Vercel or AWS ECS for autoscaling web compute.',
      },
      {
        question: 'Can you audit and refactor an existing slow or buggy SaaS codebase?',
        answer:
          'Yes. We conduct comprehensive architectural audits, identifying database N+1 query bottlenecks, unindexed lookups, security vulnerabilities, and memory leaks, refactoring critical paths without interrupting active subscribers.',
      },
    ],
  },
  {
    slug: 'crm-automation',
    title: 'CRM Automation & Custom Software Solutions | DeCode InfoTech',
    description:
      'DeCode InfoTech develops custom CRM platforms, sales pipeline automations, customer lifecycle dashboards, and automated business operations software.',
    h1: 'CRM Automation & Custom Software',
    eyebrow: '',
    summary:
      'Eliminate scattered spreadsheets, manual follow-up friction, and administrative bottlenecks. We build custom CRM and business workflow platforms designed around your exact operating model, sales stages, and customer communication channels.',
    focusKeyword: 'CRM development company in Coimbatore',
    image: '/assets/project-construction.jpg',
    priority: 0.8,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'Custom CRMs Built Exactly Around Your Operating Model',
        body: 'Off-the-shelf CRM tools like Salesforce or HubSpot are often bloated, overpriced, and rigid. DeCode engineers custom CRM platforms built around your precise sales stages, terminology, customer data fields, and internal approval hierarchies with zero unnecessary complexity.',
      },
      {
        title: 'Multi-Channel Communication & Trigger Automations',
        body: 'Keep deals moving without manual reminders. We build automated notification engines across WhatsApp Business API, SMS gateways, and transactional email (SendGrid/Resend) — triggering instant quote follow-ups, payment reminders, and onboarding sequences automatically.',
      },
      {
        title: 'Centralized Customer 360 & Deal Pipeline Dashboards',
        body: 'Give your sales leads and executives total visibility. Our intuitive drag-and-drop Kanban pipelines, deal stage tracking, conversion analytics, and revenue forecasting dashboards provide an instant pulse on team performance and cash flow projections.',
      },
      {
        title: 'Seamless Integration with Existing Accounting & ERP Systems',
        body: 'Your CRM should not operate on an island. We build real-time connectors to sync customer orders, invoices, and payment statuses directly with Tally, QuickBooks, Zoho, SAP, or custom legacy enterprise systems.',
      },
    ],
    highlights: [
      'Custom CRM architecture with tailor-made data models',
      'Interactive Kanban sales pipeline & deal stage tracking',
      'Automated WhatsApp, Email & SMS notification triggers',
      'Role-based sales team permissions & territory assignments',
      'Real-time revenue analytics & rep activity dashboards',
      'Two-way data sync with ERPs, accounting tools, and billing software',
    ],
    faqs: [
      {
        question: 'Why build a custom CRM instead of subscribing to HubSpot or Zoho?',
        answer:
          'Custom CRMs carry zero recurring per-user monthly license fees, match your workflow 100% without awkward workarounds, and keep your valuable customer proprietary data securely in your own private cloud database.',
      },
      {
        question: 'Can the CRM automate messaging via WhatsApp and Email?',
        answer:
          'Yes. We integrate official WhatsApp Cloud APIs, SMS gateways, and transactional email providers to automatically trigger personalized messages when deals advance, invoices are issued, or tickets are updated.',
      },
      {
        question: 'Can we migrate our existing customer data from spreadsheets into the new CRM?',
        answer:
          'Yes. We handle the complete data cleansing, normalization, deduplication, and migration process from Excel, Google Sheets, or previous CRM exports into your new system.',
      },
      {
        question: 'Can different sales reps have restricted access to only their accounts?',
        answer:
          'Yes. We build granular permission structures where sales executives only see their assigned territory and leads, while branch managers and directors have complete cross-organizational analytics access.',
      },
      {
        question: 'Is the CRM mobile-responsive for field sales executives?',
        answer:
          'Yes. Every interface we build is completely mobile-optimized and responsive, allowing field sales representatives to log calls, update meeting notes, and upload documents directly from their phones.',
      },
    ],
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design, Prototyping & Product Experience | DeCode InfoTech',
    description:
      'DeCode InfoTech creates intuitive, conversion-focused user interfaces, interactive Figma design systems, wireframes, and enterprise UX architectures.',
    h1: 'UI/UX Design & Prototyping',
    eyebrow: '',
    summary:
      'Transform complex digital concepts into intuitive, breathtaking user experiences. We craft research-backed UI/UX design systems, clickable Figma prototypes, and conversion-optimized interfaces that turn casual visitors into loyal customers.',
    focusKeyword: 'UI UX design company in Coimbatore',
    image: '/assets/portfolio-2.jpg',
    priority: 0.8,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'User-Centric Discovery & Information Architecture',
        body: 'Great design begins with deep empathy and structural clarity. We analyze user behaviors, map detailed customer journey flows, and design clean information architectures that guide users effortlessly toward key actions while eliminating cognitive friction.',
      },
      {
        title: 'Scalable Figma Design Systems & Component Libraries',
        body: 'We build comprehensive, tokenized design systems in Figma complete with typography hierarchies, responsive grid layouts, auto-layout components, color palettes, and interactive component states (hover, focus, active, disabled) that bridge design and engineering seamlessly.',
      },
      {
        title: 'Interactive High-Fidelity Clickable Prototypes',
        body: 'Validate your product vision before investing in engineering. We produce rich, clickable Figma prototypes that simulate authentic micro-interactions, mobile gestures, and modal flows — ideal for user testing, executive alignment, and investor presentations.',
      },
      {
        title: 'Developer-Ready Handoff with Clean Specifications',
        body: 'Too many great designs get lost in translation. Because DeCode is also an engineering studio, our designers specify CSS variables, flexbox constraints, vector SVG exports, and edge-case states so developers can build pixel-perfect implementations without guesswork.',
      },
    ],
    highlights: [
      'User research, persona mapping & UX wireframing',
      'Complete Figma design systems with reusable component tokens',
      'Clickable interactive prototypes for user testing & investor pitches',
      'Conversion Rate Optimization (CRO) & accessibility audits (WCAG 2.1)',
      'Responsive design for desktop, tablet, and mobile breakpoints',
      'Developer-ready inspectable handoff with full design tokens',
    ],
    faqs: [
      {
        question: 'What deliverables do we receive at the end of a UI/UX project?',
        answer:
          'You receive full access and ownership to our organized Figma workspace, including UX wireframes, interactive high-fidelity prototypes, production design system tokens, responsive mobile/desktop variants, and optimized vector graphics.',
      },
      {
        question: 'Can we test the prototype on real devices before development starts?',
        answer:
          'Yes. We create interactive Figma prototypes that can be opened directly on your smartphone, tablet, or desktop browser, letting you click through flows and experience the product as if it were already live.',
      },
      {
        question: 'Can you redesign an existing product that users find confusing?',
        answer:
          'Yes. We perform comprehensive heuristic UX audits, review session heatmaps, pinpoint drop-off friction points, and restructure navigation to dramatically increase user retention and satisfaction.',
      },
      {
        question: 'Do your designers understand frontend code constraints?',
        answer:
          'Yes. Our design team works hand-in-hand with our software engineers. We design with CSS Grid, Flexbox, Tailwind utility tokens, and real-world asset optimization in mind, ensuring 100% build feasibility.',
      },
      {
        question: 'Do you adhere to accessibility standards (WCAG)?',
        answer:
          'Yes. We enforce strict color contrast ratios, accessible touch-target sizes (48px+ on mobile), clear typography scales, and keyboard-navigable hierarchies to ensure compliance with WCAG 2.1 AA standards.',
      },
    ],
  },
  {
    slug: 'industrial-automation',
    title: 'Industrial Automation, AI and IoT Solutions | DeCode InfoTech',
    description:
      'DeCode InfoTech engineers end-to-end industrial automation, edge AI computer vision, IoT telemetry, SCADA integration, and smart factory dashboards for manufacturing teams.',
    h1: 'Industrial Automation, AI and IoT Solutions',
    eyebrow: '',
    summary:
      'Bridge the gap between physical machinery and modern digital intelligence. We engineer end-to-end industrial IoT platforms, real-time telemetry dashboards, and edge AI inspection systems that reduce downtime, eliminate manual errors, and scale operational efficiency.',
    focusKeyword: 'industrial automation software company',
    image: '/assets/portfolio-neuerung.jpg',
    priority: 0.8,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'From Shop Floor Sensors to Executive Cloud Dashboards',
        body: 'Modern manufacturing demands total operational visibility. DeCode builds high-throughput telemetry pipelines that capture telemetry from edge sensors, PLCs, and legacy machines via MQTT, Modbus, and OPC-UA. We transform raw industrial signals into sub-second interactive dashboards, centralized asset health monitoring, and automated alerts that keep plant managers and engineering teams ahead of critical issues.',
      },
      {
        title: 'Edge Computer Vision & Automated AI Quality Control',
        body: 'Replace error-prone manual spot-checks with high-speed automated visual inspection. We design and train custom computer vision models deployed directly at the network edge on industrial IPCs and smart cameras. From sub-millimeter surface defect detection and part dimension verification to packaging anomaly flagging, our AI pipelines ensure 100% throughput inspection at factory line speeds.',
      },
      {
        title: 'Predictive Maintenance & Intelligent Workflows',
        body: 'Unplanned equipment failure is a major operational cost center. By combining acoustic, thermal, and vibration sensor streams with machine learning models, our systems predict mechanical degradation before catastrophic failure occurs — automatically dispatching maintenance tickets, notifying floor technicians, and protecting asset lifespans.',
      },
      {
        title: 'Offline-First Edge Architecture Built for Industrial Reliability',
        body: 'Industrial facilities cannot risk downtime from cloud disconnections. We architect robust hybrid edge-to-cloud systems that maintain full local operational autonomy during internet disruptions, securely synchronizing encrypted telemetry back to centralized cloud databases when connectivity resumes.',
      },
    ],
    highlights: [
      'Real-time IoT telemetry & interactive SCADA dashboards',
      'High-speed edge AI vision for quality & defect inspection',
      'PLC, SCADA & industrial protocol integration (MQTT, Modbus, OPC-UA)',
      'Predictive maintenance & anomaly detection workflows',
      'Offline-first edge gateways with encrypted cloud sync',
      'Role-based multi-facility monitoring & automated alerting',
    ],
    faqs: [
      {
        question: 'How do you connect and collect data from older, legacy industrial machines?',
        answer:
          'We bridge legacy machinery using non-invasive IoT edge gateways and industrial protocol converters (Modbus, RS-485, OPC-UA, or analog current/vibration sensors). You get modern cloud telemetry and AI analytics without needing to replace existing capital equipment.',
      },
      {
        question:
          'Can computer vision inspection run locally on our factory floor without cloud latency?',
        answer:
          'Yes. We deploy optimized edge AI models directly onto ruggedized industrial edge computers (like NVIDIA Jetson or industrial IPCs). Inspection inferences happen in milliseconds on-premises, with only defect logs and analytics synced to the cloud.',
      },
      {
        question: 'What industrial communication protocols do you support?',
        answer:
          'We support industry-standard protocols including MQTT, OPC-UA, Modbus TCP/RTU, CAN bus, REST APIs, and WebSockets to ensure seamless interoperability between field devices, local SCADA systems, and modern cloud databases.',
      },
      {
        question: 'How is data security handled between the factory floor and the cloud?',
        answer:
          'We implement strict zero-trust operational security (OT/IT network separation), TLS-encrypted transmission, mutual authentication certificates (mTLS), and secure key storage, ensuring industrial telemetry is immune to tampering and external breaches.',
      },
      {
        question: 'Can your systems integrate with our existing ERP or maintenance software?',
        answer:
          'Yes. Our systems are built with developer-friendly REST and GraphQL APIs and webhooks, allowing seamless two-way data synchronization with SAP, Oracle, custom ERPs, and computerized maintenance management systems (CMMS).',
      },
    ],
  },
  {
    slug: '3d-motion-design',
    title: '3D Motion Design, Product Visuals & Digital Media | DeCode InfoTech',
    description:
      'DeCode InfoTech produces captivating 3D product animations, interactive website motion graphics, explainer media, and brand storytelling visuals.',
    h1: '3D Motion Design & Digital Media',
    eyebrow: '',
    summary:
      'Captivate your audience and make complex technical concepts instantly understandable. We craft high-impact 3D motion design, animated product explainers, and interactive web motion graphics that elevate brand authority and drive conversions.',
    focusKeyword: '3D motion design company',
    image: '/assets/portfolio-3.jpg',
    priority: 0.7,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'Cinematic 3D Product Animations & Explainer Videos',
        body: 'Physical hardware, medical devices, and abstract software architectures are often difficult to convey in plain text. We model, texture, and animate photorealistic 3D product visualizations, exploded-view mechanics, and dynamic camera choreography that demonstrate your product value in seconds.',
      },
      {
        title: 'Web-Optimized Micro-Interactions & Lottie Animations',
        body: 'Motion should delight users without slowing down your website. We produce lightweight vector Lottie JSON animations, CSS keyframe sequences, and optimized video loops that integrate seamlessly into Next.js websites with zero performance degradation or Core Web Vitals penalty.',
      },
      {
        title: 'Interactive 3D Web Experiences via Three.js',
        body: 'Take user engagement to the next level with real-time interactive 3D viewports. We build browser-based 3D model viewers (using Three.js and WebGL) that allow visitors to rotate, inspect, and configure products directly on your landing page in real time.',
      },
      {
        title: 'Brand Storytelling & Launch Campaign Digital Media',
        body: 'From high-resolution hero banners and social media motion teasers to keynote presentation media and investor demo loops, we craft cohesive visual storytelling packages that give your brand a modern, world-class market presence.',
      },
    ],
    highlights: [
      'Photorealistic 3D product modeling, texturing & rendering',
      'Exploded-view mechanical and architectural animations',
      'Lightweight Lottie & WebM animations optimized for web speed',
      'Interactive WebGL & Three.js browser-based 3D viewers',
      'Product launch visual assets & promotional motion teasers',
      'High-resolution media packages for pitch decks and marketing campaigns',
    ],
    faqs: [
      {
        question: 'Will 3D animations and videos slow down our website speed?',
        answer:
          'No. We specialize in high-efficiency web compression, delivering ultra-compact WebM/MP4 video streams and lightweight vector Lottie files that load asynchronously without delaying First Contentful Paint (FCP).',
      },
      {
        question: 'Can you work from our existing CAD or 3D engineering files?',
        answer:
          'Yes. We can import and clean up standard engineering CAD formats (STEP, OBJ, FBX, STL), optimize polygon topology for digital rendering, and apply photorealistic materials, lighting, and textures.',
      },
      {
        question: 'What formats do you provide for web and social media marketing?',
        answer:
          'We export in whatever formats your channels require: transparent WebM/MP4 video, Lottie JSON, high-res PNG/TIFF renders, 9:16 vertical reels, 16:9 widescreen presentations, and 1:1 social assets.',
      },
      {
        question: 'Can you create an interactive 3D model that visitors can rotate on our site?',
        answer:
          'Yes. We develop interactive Three.js / WebGL canvas components that let users pan, zoom, rotate, and interact with 3D models smoothly in their web browser without requiring external plugins.',
      },
      {
        question: 'What is the typical production timeline for a 3D product animation?',
        answer:
          'Standard 30-to-60 second 3D product animations typically take between 2 to 4 weeks, including 3D asset modeling, storyboard approval, camera movement animatics, lighting/texturing, and final rendering.',
      },
    ],
  },
  {
    slug: 'about',
    title: 'About DeCode InfoTech | Global Digital Product Engineering Studio',
    description:
      'DeCode InfoTech is an enterprise-grade digital product engineering studio. We partner with ambitious leaders, high-growth startups, and multinational enterprises to design, engineer, and scale mission-critical software solutions.',
    h1: 'Engineering Digital Products for Global Impact',
    eyebrow: '',
    summary:
      'We bridge the divide between strategic vision and flawless technical execution. DeCode InfoTech is a modern product engineering firm delivering scalable cloud architectures, high-performance web applications, intelligent automation, and bespoke enterprise software for industry leaders worldwide.',
    focusKeyword: 'software company in Coimbatore',
    image: '/assets/who-we-are.jpg',
    priority: 0.85,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'High-Velocity Engineering Pods & Product Craftsmanship',
        body: 'We believe enterprise-grade software requires more than mechanical coding — it demands deep architectural foresight, disciplined engineering governance, and intuitive UI/UX design. Our cross-functional product pods integrate senior cloud architects, full-stack engineers, and product designers to take initiatives from whiteboard concepts to resilient, production-ready deployments.',
      },
      {
        title: 'Enterprise Cloud Standards & Modern Architecture',
        body: 'We build exclusively with battle-tested modern technology stacks: Next.js, React, Node.js, TypeScript, PostgreSQL, Docker, and distributed cloud services (AWS, GCP, Vercel). Every system we architect is built for horizontal scalability, sub-second query performance, multi-region failover, and strict data security compliance (SOC 2, GDPR, ISO).',
      },
      {
        title: 'A Culture of Ownership, Transparency & Zero Technical Debt',
        body: 'Unlike traditional outsourcing agencies that generate bloated, unmaintainable codebases, DeCode operates with relentless engineering rigor. We enforce automated testing pipelines, comprehensive code reviews, continuous documentation, and full intellectual property transfer — ensuring your internal teams inherit clean, modular software that scales effortlessly.',
      },
      {
        title: 'Global Delivery with Local Engineering Precision',
        body: 'Headquartered in Coimbatore’s emerging technology corridor, DeCode serves enterprise clients, VC-backed SaaS founders, and industrial leaders across India, North America, Europe, and Southeast Asia. We combine competitive global cost efficiencies with top-tier engineering talent and agile time-zone overlap.',
      },
    ],
    highlights: [
      'Cross-functional dedicated engineering pods & senior architectural oversight',
      'Modern Next.js, React, TypeScript, and cloud-native microservices',
      'SOC 2, GDPR, and ISO-aligned data security & enterprise governance',
      'Automated CI/CD build pipelines, test coverage & zero-downtime releases',
      '100% intellectual property (IP) and source code ownership transfer',
      'SLA-backed 24/7 uptime monitoring & enterprise platform maintenance',
    ],
    faqs: [
      {
        question:
          'What distinguishes DeCode InfoTech from traditional software outsourcing agencies?',
        answer:
          'We operate as an embedded product engineering partner rather than a transactional vendor. We take complete ownership of architectural integrity, user experience, code maintainability, and commercial business outcomes — delivering enterprise-grade velocity without technical debt.',
      },
      {
        question: 'What engagement models do you provide for enterprise clients?',
        answer:
          'We offer flexible, outcome-driven engagement models: Dedicated Engineering Pods (cross-functional teams dedicated exclusively to your roadmap), End-to-End Product Delivery (fixed-scope turnkey development), and Strategic Architecture & Modernization Consulting.',
      },
      {
        question: 'How do you safeguard client intellectual property (IP) and confidentiality?',
        answer:
          'We enforce strict multi-lateral Non-Disclosure Agreements (NDAs), encrypted private code repositories, and complete IP assignment upon project completion. All source code, assets, database schemas, and documentation are 100% owned by your organization.',
      },
      {
        question: 'What size companies does DeCode InfoTech typically partner with?',
        answer:
          'We work with venture-funded scale-ups, mid-market enterprise leaders, and multinational corporations looking to accelerate their digital roadmap, modernize legacy infrastructure, or launch disruptive SaaS and mobile products.',
      },
      {
        question: 'How do you manage communication and delivery across international time zones?',
        answer:
          'We operate with transparent agile cadences: daily asynchronous Slack/Teams updates, bi-weekly sprint demos, shared Jira/GitHub project boards, and planned overlap hours for live executive syncs with clients across North America, Europe, and APAC.',
      },
    ],
  },
  {
    slug: 'contact',
    title: 'Contact DeCode InfoTech | Enterprise Engineering & Advisory',
    description:
      'Initiate an executive consultation with DeCode InfoTech. Connect with our engineering leads to scope custom software, SaaS platforms, enterprise web applications, and AI/IoT solutions.',
    h1: 'Partner with DeCode InfoTech',
    eyebrow: '',
    summary:
      'Accelerate your digital roadmap with enterprise engineering precision. Connect with our technical directors and product architects to discuss your technical challenges, scope feasibility, and receive a comprehensive delivery blueprint within 24 hours.',
    focusKeyword: 'software development company in Coimbatore contact',
    image: '/assets/who-we-are.jpg',
    priority: 0.85,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'Structured Technical Discovery & Rapid Scoping',
        body: 'We respect your time. Our discovery process cuts through generic sales pitches to focus directly on your technical architecture, business constraints, integration dependencies, and delivery milestones. We evaluate feasibility and provide realistic commercial estimates backed by proven sprint velocity.',
      },
      {
        title: 'Enterprise Engagement & NDA Protection',
        body: 'Your proprietary concepts and enterprise workflows are protected under strict confidentiality. We execute mutual non-disclosure agreements prior to technical deep-dives, ensuring your trade secrets, customer records, and operational architecture remain completely secure.',
      },
      {
        title: 'Direct Access to Senior Technical Leadership',
        body: 'You will never be handed off to junior account managers. From your very first conversation, you collaborate directly with senior full-stack architects, cloud leads, and product strategists who understand enterprise engineering and commercial viability.',
      },
      {
        title: 'Transparent Sprint Roadmaps & Predictable Delivery',
        body: 'Following our initial alignment session, we deliver a comprehensive Project Blueprint — complete with recommended tech stacks, architecture diagrams, milestone sprint breakdowns, team pod compositions, and fixed-timeline deliverables.',
      },
    ],
    highlights: [
      'Complimentary architectural review & technical feasibility audit',
      'Formal mutual Non-Disclosure Agreement (NDA) execution',
      'Guaranteed response & initial scoping proposal within 24 hours',
      'Direct collaboration with senior engineering directors & architects',
      'Transparent milestone-based commercial pricing with zero hidden fees',
      'Flexible engagement: Dedicated Pods, Turnkey Projects, or Advisory',
    ],
    faqs: [
      {
        question: 'What information should we prepare before our initial discovery call?',
        answer:
          'A high-level summary of your project vision, core user personas, key functional requirements, existing technical constraints or legacy systems, and your target launch timeline will help us provide immediate, high-value architectural guidance.',
      },
      {
        question: 'How quickly can DeCode InfoTech mobilize an engineering pod?',
        answer:
          'For turnkey projects and dedicated pods, our mobilization window is typically 1 to 2 weeks following contract finalization, ensuring rapid sprint kickoff without lengthy onboarding delays.',
      },
      {
        question: 'Do you offer formal SLAs and ongoing post-launch enterprise support?',
        answer:
          'Yes. We provide enterprise Service Level Agreements (SLAs) with 24/7 uptime monitoring, guaranteed response windows, proactive security patches, and continuous feature development sprints.',
      },
      {
        question: 'Can we begin with a paid Proof of Concept (PoC) or Discovery Sprint?',
        answer:
          'Yes. We frequently conduct 2-to-3 week Rapid Discovery Sprints to build clickable prototypes, benchmark system architectures, and validate technical viability before committing to large-scale capital investments.',
      },
      {
        question: 'What are your primary direct contact channels?',
        answer:
          'You can reach our engineering executive office directly at contact@decodeinfotech.in, call +91 70928 02364, or submit your project proposal directly through the interactive form on this page.',
      },
    ],
  },
  {
    slug: 'portfolio',
    title: 'Client Case Studies & Enterprise Engineering Portfolio | DeCode InfoTech',
    description:
      'Explore DeCode InfoTech’s delivered case studies across enterprise SaaS, AI & IoT healthcare telemetry, EdTech streaming platforms, and high-throughput hospitality POS systems.',
    h1: 'Delivered Engineering & Case Studies',
    eyebrow: '',
    summary:
      'Explore how DeCode InfoTech partners with industry innovators and enterprise operators to architect, build, and scale transformative digital products that deliver quantifiable commercial return.',
    focusKeyword: 'software development portfolio Coimbatore',
    image: '/assets/portfolio-1.jpg',
    priority: 0.85,
    changeFrequency: 'monthly',
    sections: [
      {
        title: 'EdTech Video Learning & Lifecycle Platform',
        body: 'For Azhagappar Academy, DeCode engineered an ultra-low-latency video streaming platform with adaptive bitrate delivery, interactive assessment engines, and automated student progress analytics. Built on React.js, Node.js, and AWS S3/CloudFront, the platform increased student engagement by 140% and maintains 99.98% streaming uptime during peak exam concurrency.',
      },
      {
        title: 'HealthTech AI Diagnostics & Connected IoT Telemetry Portal',
        body: 'For Neuerung HealthTech, we architected an enterprise healthcare portal bridging AI-driven clinical diagnostic models with IoT medical device telemetry. The platform delivers real-time vital telemetry streams, HIPAA-ready patient data encryption, and an intuitive clinical UX that communicates complex diagnostic metrics with absolute clarity.',
      },
      {
        title: 'High-Throughput Hospitality POS & Cloud Billing Engine',
        body: 'For Hotel Vetri Vel, DeCode engineered a mission-critical multi-counter Point-of-Sale (POS) and Kitchen Order Ticketing (KOT) billing engine. Featuring real-time WebSocket state synchronization, thermal printer network integration, and instant executive analytics, the system processes thousands of daily orders with zero latency under heavy rush-hour loads.',
      },
      {
        title: 'Turnkey Engineering Credibility & High-Converting Lead Funnel',
        body: 'For Thozha Associates, a premier civil engineering and construction enterprise, DeCode designed and developed a high-converting digital presence showcasing turnkey residential and infrastructure projects. The platform elevated corporate brand equity and doubled inbound contract inquiries within 90 days of deployment.',
      },
    ],
    highlights: [
      'Azhagappar Academy: Video streaming EdTech with 140% engagement surge',
      'Neuerung HealthTech: Connected IoT telemetry & AI clinical diagnostic portal',
      'Hotel Vetri Vel: High-throughput real-time cloud POS & thermal print API',
      'Thozha Associates: Infrastructure engineering portfolio & conversion funnel',
      '99.98% average production uptime across all deployed customer systems',
      'Zero-defect deployment record backed by automated regression test suites',
    ],
    faqs: [
      {
        question: 'Can DeCode InfoTech handle projects requiring strict regulatory compliance?',
        answer:
          'Yes. We have demonstrated experience building systems compliant with healthcare data security (HIPAA principles), financial PCI-DSS gateway standards, and industrial zero-trust network segregation.',
      },
      {
        question: 'Can we speak directly with references or past enterprise clients?',
        answer:
          'Yes. During the commercial proposal phase, we can connect you directly with client executives who have partnered with DeCode to discuss our engineering velocity, communication, and delivery quality.',
      },
      {
        question: 'Do your case studies represent end-to-end builds or partial contributions?',
        answer:
          'All featured case studies represent full-lifecycle product engineering engagements where DeCode served as the primary technology partner — handling UI/UX design, database architecture, frontend/backend engineering, and cloud deployment.',
      },
      {
        question: 'How do you benchmark and measure product success after deployment?',
        answer:
          'We measure quantitative operational KPIs: page load speed (under 1.2s), Core Web Vitals (90+), transaction throughput, database query latency, customer conversion lift, and system availability (99.9%+).',
      },
      {
        question: 'Can you build a similar custom platform tailored to our specific industry?',
        answer:
          'Yes. While our technical foundations remain consistent (scalable cloud, type safety, modular microservices), every business logic engine, workflow, and user interface is custom-architected around your unique competitive advantage.',
      },
    ],
  },
  {
    slug: 'blog',
    title: 'Engineering Insights & Technical Architecture Blog | DeCode InfoTech',
    description:
      'In-depth architectural whitepapers, engineering best practices, Next.js optimization guides, and enterprise product strategy from the DeCode InfoTech engineering team.',
    h1: 'Engineering Insights & Technology Whitepapers',
    eyebrow: '',
    summary:
      'Deep-dive architectural essays, system design teardowns, and engineering insights authored by our senior architects and technical directors to help modern leaders make informed technology decisions.',
    focusKeyword: 'software development blog Coimbatore',
    image: '/assets/project-news.jpg',
    priority: 0.75,
    changeFrequency: 'weekly',
    sections: [
      {
        title: 'Architectural Deep-Dives for High-Scale Applications',
        body: 'We share real-world engineering blueprints from the front lines: optimizing PostgreSQL queries under millions of records, configuring multi-tenant Row-Level Security, tuning Next.js App Router performance, and deploying zero-cold-start edge functions.',
      },
      {
        title: 'Enterprise Product Strategy & ROI Maximization',
        body: 'Technology exists to serve commercial ambition. Our product essays examine build-vs-buy decisions, evaluating modern frontend frameworks, eliminating legacy technical debt, and structuring agile sprint pods that deliver measurable revenue velocity.',
      },
      {
        title: 'Edge Computing, AI Inference & Industry 4.0 Telemetry',
        body: 'Explore our research on deploying edge computer vision models, building low-latency MQTT/Modbus telemetry pipelines, and implementing offline-first synchronization architectures in challenging operational environments.',
      },
      {
        title: 'Security, Compliance & Resilient Cloud Infrastructure',
        body: 'Practical guides on zero-trust cloud architecture, hardening automated CI/CD pipelines against supply chain vulnerabilities, multi-region disaster recovery, and meeting SOC 2 / GDPR compliance in modern SaaS products.',
      },
    ],
    highlights: [
      'Production Next.js & React performance optimization guides',
      'Multi-tenant PostgreSQL database scaling & RLS security blueprints',
      'Edge AI computer vision deployment & industrial IoT architectures',
      'Executive build-vs-buy analysis & enterprise software ROI frameworks',
      'Zero-trust cloud infrastructure, DevSecOps & CI/CD automation',
      'Real-world case study teardowns and lessons from active deployments',
    ],
    faqs: [
      {
        question: 'Who authors the technical articles on the DeCode blog?',
        answer:
          'All articles and whitepapers are authored directly by our senior software engineers, cloud architects, and product directors, grounded in real-world challenges encountered on active production deployments.',
      },
      {
        question: 'Can we suggest a technical topic or request an architectural breakdown?',
        answer:
          'Yes. We regularly accept topic suggestions from engineering leaders and startup founders. Reach out to our editorial team at contact@decodeinfotech.in with your challenge.',
      },
      {
        question: 'Do you provide code repositories and architectural diagrams with your guides?',
        answer:
          'Yes. Where applicable, our engineering whitepapers link to open-source GitHub repositories, benchmark reproducible test scripts, and interactive architecture diagrams.',
      },
      {
        question: 'Can we subscribe to receive new engineering whitepapers automatically?',
        answer:
          'Yes. You can follow our RSS feed or connect with our LinkedIn engineering page to receive our bi-weekly architectural releases directly.',
      },
      {
        question: 'Can your team consult on an architectural challenge featured in an article?',
        answer:
          'Yes. If your enterprise is currently navigating a migration, scaling bottleneck, or cloud modernization challenge discussed in our writing, schedule a direct advisory consultation with our lead architects.',
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
