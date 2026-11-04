const commonFaqs = {
  timeline: {
    question: 'How long does a software project take?',
    answer: 'The timeline depends on the scope, integrations, and delivery milestones. We define a practical roadmap and estimate after discussing your requirements.'
  },
  process: {
    question: 'How do you start a project?',
    answer: 'We begin with a free consultation to understand your users, goals, existing systems, and constraints. From there, we recommend a scope and phased delivery plan.'
  }
};

export const SERVICE_PAGES = [
  {
    slug: 'web-development',
    name: 'Web Development',
    title: 'Web Development Services | IT HUNT',
    description: 'Custom web development for startups and growing businesses. IT HUNT builds responsive websites, web applications, APIs, and portals tailored to your goals.',
    headline: 'Web development built around your business',
    intro: 'We design and build responsive websites and web applications that help organizations serve customers, streamline workflows, and grow online.',
    audience: 'Startups, growing businesses, and organizations that need a new website, customer portal, or custom web application.',
    challenge: 'Off-the-shelf sites and disconnected tools can make it difficult to deliver the right customer experience or support business-specific workflows.',
    approach: 'We clarify user needs and business requirements, then build a maintainable web solution with thoughtful UX, secure APIs, and a responsive interface.',
    deliverables: ['Business and product requirements', 'Responsive website or web application', 'API and data integrations', 'Deployment and handover documentation'],
    technologies: ['Vue.js', 'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
    outcomes: ['A website or application aligned to your business goals', 'Clearer digital journeys for customers and teams', 'A maintainable foundation for future improvements'],
    faqs: [
      { question: 'Can you build a new website or improve an existing one?', answer: 'Yes. We can plan and build a new website or assess an existing application and recommend focused improvements.' },
      commonFaqs.timeline,
      commonFaqs.process
    ]
  },
  {
    slug: 'ios-app-development',
    name: 'iOS App Development',
    title: 'iOS App Development Services | IT HUNT',
    description: 'iOS app development for businesses, from product discovery and interface design to native iPhone apps, integrations, testing, and App Store preparation.',
    headline: 'iOS apps designed for real-world use',
    intro: 'We help organizations plan and build iPhone applications that make services easier to access and give customers a polished, dependable mobile experience.',
    audience: 'Businesses and product teams building a new iOS product or extending an existing service to iPhone users.',
    challenge: 'A mobile idea needs more than screens: it must fit real user needs, connect safely to business systems, and work reliably across supported devices.',
    approach: 'We turn product requirements into an iOS roadmap, design native-feeling user journeys, and develop, test, and prepare the app for release.',
    deliverables: ['Product scope and feature roadmap', 'iOS interface and interaction design', 'Native app and backend integrations', 'Device testing and release preparation'],
    technologies: ['Swift', 'SwiftUI', 'UIKit', 'Xcode', 'REST APIs', 'Firebase'],
    outcomes: ['A focused iPhone experience for your customers', 'Mobile access to your products and services', 'A release-ready codebase your team can maintain'],
    faqs: [
      { question: 'Do you build native iOS apps?', answer: 'Yes. We work with native Apple technologies such as Swift, SwiftUI, and UIKit, based on the product requirements.' },
      commonFaqs.timeline,
      commonFaqs.process
    ]
  },
  {
    slug: 'android-app-development',
    name: 'Android App Development',
    title: 'Android App Development Services | IT HUNT',
    description: 'Custom Android app development for businesses. Plan, design, build, test, and prepare Android applications around your users and workflows.',
    headline: 'Android applications for your customers and teams',
    intro: 'We create Android applications that bring your services, workflows, and customer experiences to mobile devices.',
    audience: 'Organizations launching an Android product, modernizing a mobile workflow, or bringing an existing service to Android.',
    challenge: 'Different devices, user contexts, and backend requirements make it important to plan for usability, compatibility, and reliable data exchange.',
    approach: 'We define the core use cases, design clear Android journeys, connect the app to the right services, and test key flows across supported devices.',
    deliverables: ['Feature scope and technical plan', 'Android app UI and implementation', 'Backend and third-party integrations', 'Compatibility testing and release support'],
    technologies: ['Kotlin', 'Jetpack Compose', 'Android SDK', 'REST APIs', 'Firebase', 'Room'],
    outcomes: ['A mobile channel for customers or field teams', 'Simpler access to key business workflows', 'A structured app foundation for ongoing development'],
    faqs: [
      { question: 'Can the Android app connect to our existing software?', answer: 'Yes. We can assess your available APIs and plan secure integrations with existing services and data.' },
      commonFaqs.timeline,
      commonFaqs.process
    ]
  },
  {
    slug: 'saas-development',
    name: 'SaaS Development',
    title: 'SaaS Development Services | IT HUNT',
    description: 'SaaS product development for startups and businesses, including product planning, multi-tenant platforms, subscriptions, dashboards, and cloud deployment.',
    headline: 'SaaS products from product idea to launch',
    intro: 'We help teams shape and build software products delivered online, with the core workflows, account management, and integrations their customers need.',
    audience: 'Founders and businesses validating a software product or improving an existing subscription-based platform.',
    challenge: 'Launching SaaS involves balancing customer workflows, account boundaries, subscription operations, security, and a product that can evolve.',
    approach: 'We map the product’s essential user journeys, design a phased release, and build the platform around maintainable services and data boundaries.',
    deliverables: ['Product discovery and MVP scope', 'User accounts and role-based workflows', 'Subscription and billing integrations', 'Admin tools, deployment, and handover'],
    technologies: ['React', 'Vue.js', 'Node.js', 'PostgreSQL', 'MongoDB', 'Cloud platforms'],
    outcomes: ['A practical first release focused on core customer needs', 'Centralized product and account workflows', 'A codebase designed for iterative product development'],
    faqs: [
      { question: 'Can you help define an MVP before development?', answer: 'Yes. We can help prioritize essential user workflows and define a phased scope before implementation starts.' },
      commonFaqs.timeline,
      commonFaqs.process
    ]
  },
  {
    slug: 'ai-development',
    name: 'AI Development',
    title: 'AI Development Services | IT HUNT',
    description: 'Practical AI development for businesses, including AI-enabled features, workflow automation, data integrations, and responsible product implementation.',
    headline: 'Practical AI solutions for business workflows',
    intro: 'We help businesses identify useful AI opportunities and integrate AI capabilities into products and operations with clear human oversight.',
    audience: 'Teams exploring AI for customer support, internal knowledge, content workflows, document processing, or product features.',
    challenge: 'AI experiments can be unreliable or disconnected from real work when data quality, evaluation, privacy, and user review are not planned.',
    approach: 'We identify a focused use case, connect appropriate models and business data, and design evaluation, safeguards, and human review into the workflow.',
    deliverables: ['AI use-case assessment and solution plan', 'Model and data integration', 'User-facing AI workflow or internal tool', 'Evaluation and operational guidance'],
    technologies: ['Python', 'FastAPI', 'LLM APIs', 'Vector search', 'Node.js', 'Cloud services'],
    outcomes: ['AI features tied to a defined business task', 'Less repetitive manual handling where suitable', 'Clear review and evaluation practices for ongoing use'],
    faqs: [
      { question: 'Can AI be added to our existing product?', answer: 'Often, yes. We first review the product, data, and use case to determine a suitable and responsible integration.' },
      { question: 'Will AI replace human review?', answer: 'That depends on the use case. We design appropriate human review and safeguards, especially when outputs affect important decisions.' },
      commonFaqs.process
    ]
  },
  {
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    title: 'UI/UX Design Services | IT HUNT',
    description: 'UI/UX design for websites, mobile apps, and software products. IT HUNT helps teams improve user journeys, prototypes, and interface consistency.',
    headline: 'UI/UX design that makes products easier to use',
    intro: 'We help teams turn complex services and workflows into clear, accessible digital experiences for customers and employees.',
    audience: 'Organizations creating a new digital product or improving usability and consistency across an existing website or application.',
    challenge: 'Unclear journeys and inconsistent interfaces can make useful products hard to learn and frustrating to use.',
    approach: 'We understand the user goals, map key journeys, prototype the experience, and refine interface patterns with accessibility and implementation in mind.',
    deliverables: ['User journey and information architecture', 'Wireframes and interactive prototypes', 'Visual interface and responsive design', 'Design handoff and implementation guidance'],
    technologies: ['Figma', 'Design systems', 'Prototyping', 'Accessibility practices', 'Usability reviews'],
    outcomes: ['Clearer paths through important user tasks', 'Consistent interfaces across screens and devices', 'Design assets ready for implementation and iteration'],
    faqs: [
      { question: 'Can you redesign an existing application?', answer: 'Yes. We can review key user flows and prioritize interface and usability improvements.' },
      { question: 'Do you provide development after design?', answer: 'We can coordinate design with web or mobile development so the experience carries through implementation.' },
      commonFaqs.process
    ]
  },
  {
    slug: 'ecommerce-development',
    name: 'eCommerce Development',
    title: 'eCommerce Development Services | IT HUNT',
    description: 'eCommerce development for businesses, including online storefronts, product catalogs, payment integrations, order workflows, and custom commerce features.',
    headline: 'eCommerce experiences built for your business',
    intro: 'We build and improve online storefronts that help customers discover products, complete purchases, and stay connected with your business.',
    audience: 'Retailers and businesses launching online sales or improving an existing commerce experience and operations.',
    challenge: 'A fragmented shopping journey, difficult catalog management, or disconnected order operations can create friction for customers and staff.',
    approach: 'We map the shopping and fulfillment workflows, then build a storefront and integrations that fit your catalog, payments, and operating needs.',
    deliverables: ['Storefront and product catalog', 'Search, filtering, and product detail journeys', 'Payment and order integrations', 'Admin workflows and analytics integration'],
    technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Payment APIs', 'Headless commerce'],
    outcomes: ['A coherent path from product discovery to checkout', 'Connected catalog, payment, and order workflows', 'A commerce foundation that can be improved over time'],
    faqs: [
      { question: 'Can you connect payments and shipping services?', answer: 'We can integrate supported payment, shipping, inventory, and business services based on your requirements and provider access.' },
      commonFaqs.timeline,
      commonFaqs.process
    ]
  },
  {
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    title: 'Cloud & DevOps Services | IT HUNT',
    description: 'Cloud and DevOps services to help teams deploy software reliably, automate delivery workflows, improve observability, and plan scalable infrastructure.',
    headline: 'Cloud foundations and delivery workflows that scale',
    intro: 'We help engineering teams build and operate cloud environments with repeatable deployments, practical monitoring, and clear operational practices.',
    audience: 'Businesses modernizing infrastructure, improving software delivery, or preparing applications for changing usage and operational needs.',
    challenge: 'Manual releases and unclear infrastructure can slow delivery, make failures harder to diagnose, and complicate operational growth.',
    approach: 'We assess the current environment, prioritize operational risks, and implement infrastructure and delivery improvements in manageable stages.',
    deliverables: ['Cloud architecture and deployment plan', 'CI/CD workflow setup', 'Infrastructure configuration and automation', 'Monitoring, backups, and operational documentation'],
    technologies: ['AWS', 'Google Cloud', 'Docker', 'CI/CD', 'Linux', 'Infrastructure as Code'],
    outcomes: ['More repeatable application releases', 'Improved visibility into application operations', 'Documented infrastructure that teams can maintain'],
    faqs: [
      { question: 'Can you work with our current cloud provider?', answer: 'Yes. We can assess your existing provider and infrastructure before recommending changes.' },
      { question: 'Do you support existing applications?', answer: 'Yes. Cloud and delivery improvements can be scoped around existing applications and team workflows.' },
      commonFaqs.process
    ]
  },
  {
    slug: 'software-maintenance',
    name: 'Software Maintenance',
    title: 'Software Maintenance Services | IT HUNT',
    description: 'Ongoing software maintenance for websites and applications, including bug fixes, dependency updates, security improvements, performance reviews, and support.',
    headline: 'Keep your software dependable as it evolves',
    intro: 'We help businesses maintain and improve existing software so teams can address issues, keep dependencies current, and adapt products to changing needs.',
    audience: 'Organizations with existing websites or applications that need ongoing technical support, updates, or a clear improvement roadmap.',
    challenge: 'Unresolved defects and outdated dependencies can increase operational risk and make it harder to deliver new improvements confidently.',
    approach: 'We review the application, prioritize issues with your team, and deliver agreed maintenance work with clear change notes and verification.',
    deliverables: ['Codebase and dependency review', 'Bug fixes and technical improvements', 'Security and performance recommendations', 'Release support and maintenance notes'],
    technologies: ['JavaScript', 'Node.js', 'Vue.js', 'React', 'Databases', 'Cloud platforms'],
    outcomes: ['A prioritized view of maintenance needs', 'More predictable updates and fixes', 'A clearer path for safe future enhancements'],
    faqs: [
      { question: 'Can you maintain software built by another team?', answer: 'Yes. We begin with an assessment of the codebase, deployment, and documentation to understand the support needs.' },
      { question: 'Can maintenance work be arranged as ongoing support?', answer: 'Support can be scoped around your priorities and release cadence after an initial review.' },
      commonFaqs.process
    ]
  }
];

export const getServicePageByPath = (pathname) => {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  return SERVICE_PAGES.find((service) => `/services/${service.slug}` === normalizedPath) || null;
};
