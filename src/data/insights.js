export const INSIGHT_CATEGORIES = [
  {
    slug: 'software-development-guides',
    name: 'Software development guides',
    description: 'Practical decisions and delivery practices for building maintainable software.'
  },
  {
    slug: 'startup-mvp',
    name: 'Startup and MVP development',
    description: 'Scope, validate, and launch the smallest useful version of a product.'
  },
  {
    slug: 'ai-automation',
    name: 'AI automation and integrations',
    description: 'Find suitable AI use cases and integrate them with sensible safeguards.'
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile app development',
    description: 'Plan mobile products around users, platform needs, and ongoing operations.'
  },
  {
    slug: 'saas-architecture',
    name: 'SaaS architecture and scalability',
    description: 'Make architecture choices that support a product as its usage grows.'
  },
  {
    slug: 'technology-comparisons',
    name: 'Technology comparisons',
    description: 'Compare tools by project constraints and trade-offs, not popularity.'
  },
  {
    slug: 'client-success-stories',
    name: 'Client success stories',
    description: 'Project stories published only when the client, evidence, and permission are confirmed.'
  }
];

export const INSIGHT_ARTICLES = [
  {
    slug: 'software-project-discovery-checklist',
    category: 'software-development-guides',
    title: 'A practical discovery checklist before software development',
    description: 'Align the problem, users, workflows, risks, and acceptance criteria before committing to a build.',
    publishedAt: '2026-11-04',
    readingMinutes: 5,
    introduction: 'A clear discovery phase is not a long document exercise. It is a short, structured way to reduce expensive misunderstandings before code and deadlines become difficult to change.',
    sections: [
      {
        heading: 'Start with the problem and its evidence',
        paragraphs: [
          'Describe what people are trying to do today, where the current process breaks down, and how often that happens. Separate observed facts from assumptions. If the problem is not frequent or costly enough to matter, a new system may not be the right first step.',
          'Name the primary user and the person who owns the business outcome. They may be different people and should both be represented in decisions.'
        ]
      },
      {
        heading: 'Map the smallest complete workflow',
        paragraphs: [
          'Write down the steps from the user’s first action through the outcome they need. Include exceptions such as missing information, cancellations, permissions, and recovery from errors. A narrow but complete workflow is a better starting point than a long list of disconnected features.'
        ],
        bullets: [
          'What triggers the workflow, and what counts as success?',
          'Which data is required, who can see it, and how long is it retained?',
          'What should happen when a service, payment, or user action fails?',
          'Which existing tools or records must stay in sync?'
        ]
      },
      {
        heading: 'Define acceptance and constraints',
        paragraphs: [
          'Turn vague goals into observable acceptance criteria. For example, identify the allowed user roles, the expected response to invalid input, and the devices or browsers that must work. Agree on security, privacy, accessibility, performance, and data migration needs early.'
        ]
      },
      {
        heading: 'Agree on delivery boundaries',
        paragraphs: [
          'Record what is in the first release, what is explicitly deferred, who provides content and decisions, and how changes are handled. Estimate work only after these boundaries are understood. Revisit assumptions at a short checkpoint before implementation becomes expensive to redirect.'
        ]
      }
    ],
    takeaway: 'A useful discovery outcome is a shared, testable definition of the first release—not a promise that every future requirement is already known.'
  },
  {
    slug: 'mvp-scope-that-tests-the-business',
    category: 'startup-mvp',
    title: 'How to scope an MVP that tests a real business assumption',
    description: 'Choose a minimum viable product by identifying the riskiest assumption and the smallest credible test.',
    publishedAt: '2026-11-04',
    readingMinutes: 5,
    introduction: 'An MVP is not simply a smaller version of a complete product. It is the smallest credible way to learn whether a specific customer problem and proposed solution are worth investing in.',
    sections: [
      {
        heading: 'Write the assumption before the feature list',
        paragraphs: [
          'State who has the problem, what they do today, and what behavior would show that your proposed solution is valuable. A claim such as “customers want an easier booking process” is testable; “we need a modern app” is not yet a product hypothesis.'
        ]
      },
      {
        heading: 'Rank uncertainty, not stakeholder volume',
        paragraphs: [
          'List assumptions about customer demand, willingness to pay, workflow fit, acquisition, and technical feasibility. Prioritize assumptions that are both uncertain and costly if wrong. A short interview, clickable prototype, concierge test, or landing-page experiment may answer one of these questions before software is necessary.'
        ],
        bullets: [
          'What must be true for this business to work?',
          'What is the cheapest safe experiment that could disprove it?',
          'What signal would change the next product decision?',
          'What data will be collected, and is user consent needed?'
        ]
      },
      {
        heading: 'Build one end-to-end value path',
        paragraphs: [
          'If a software MVP is justified, focus on one user group and one complete workflow. Keep account types, automation, integrations, and reporting limited to what is needed to deliver and measure that value. Avoid temporary shortcuts that expose sensitive data or make core records unreliable.'
        ]
      },
      {
        heading: 'Choose learning metrics',
        paragraphs: [
          'Track behaviors connected to the hypothesis: successful task completion, repeat use, time to complete a task, or qualified conversion. Agree on a baseline and observation window. Downloads, sign-ups, and feature counts are not proof of product value by themselves.'
        ]
      }
    ],
    takeaway: 'The best MVP is the smallest experiment that can change a meaningful business decision while remaining safe and usable.'
  },
  {
    slug: 'choosing-ai-automation-use-cases',
    category: 'ai-automation',
    title: 'Choosing an AI automation use case that is worth shipping',
    description: 'Evaluate AI automation by task value, error cost, data quality, human review, and measurable outcomes.',
    publishedAt: '2026-11-04',
    readingMinutes: 6,
    introduction: 'AI is most useful when it improves a defined workflow. Before selecting a model or vendor, understand the task, the cost of mistakes, and how people will review uncertain output.',
    sections: [
      {
        heading: 'Find repetitive work with a clear boundary',
        paragraphs: [
          'Look for a task with repeated inputs and a recognizable output, such as sorting requests or drafting a response from approved information. Avoid starting with high-impact decisions that need accountable human judgment. Identify how much of the task is truly language or pattern work rather than a deterministic rule.'
        ]
      },
      {
        heading: 'Measure quality against a real baseline',
        paragraphs: [
          'Collect representative examples, including awkward and incomplete cases. Define what an acceptable result looks like and compare an AI-assisted workflow with the current process. Measure time saved together with correction effort, error severity, and cases that require escalation.'
        ],
        bullets: [
          'Can the source data legally and safely be used for this purpose?',
          'How will private or sensitive data be minimized and protected?',
          'What errors are tolerable, and which require a person to decide?',
          'Can users identify generated content and correct it?'
        ]
      },
      {
        heading: 'Keep deterministic actions under explicit control',
        paragraphs: [
          'Treat model output as untrusted input. Validate its format, constrain available actions, and require confirmation for consequential operations such as sending messages, changing records, or issuing refunds. Use access controls and audit logs just as you would for any other integration.'
        ]
      },
      {
        heading: 'Plan monitoring and a fallback',
        paragraphs: [
          'Models and upstream services can change or become unavailable. Track quality, latency, cost, and escalation rates over time. Give users a clear fallback to the existing workflow, and define who reviews failures and updates prompts, rules, or evaluation examples.'
        ]
      }
    ],
    takeaway: 'Ship AI when it improves a measurable task under an acceptable error and privacy budget—not just because a model can produce a convincing demo.'
  },
  {
    slug: 'mobile-app-or-responsive-web',
    category: 'mobile-app-development',
    title: 'Mobile app or responsive web: how to choose for your product',
    description: 'Decide between mobile web, cross-platform, and native apps using user behavior and device capabilities.',
    publishedAt: '2026-11-04',
    readingMinutes: 5,
    introduction: 'A mobile app is not automatically better than a responsive website. The right choice depends on what users need to do, how often they return, and which device capabilities are essential.',
    sections: [
      {
        heading: 'Begin with the user’s context',
        paragraphs: [
          'If users arrive occasionally from search, links, or shared content, a responsive web experience often reduces install friction and supports a wider range of devices. If they return frequently and need push notifications, offline workflows, background behavior, or deep device integration, an app may provide meaningful value.'
        ]
      },
      {
        heading: 'Compare the delivery options',
        paragraphs: [
          'Mobile web can be a strong first release for content and transactional workflows. Cross-platform development can share much of the product across iOS and Android while retaining app-store distribution. Native development offers platform-specific control but commonly requires more specialized implementation and maintenance.'
        ],
        bullets: [
          'Which device features are required rather than merely desirable?',
          'Do users need the product when connectivity is unreliable?',
          'Are app-store policies or platform-specific design important?',
          'Can the team support releases, compatibility, and testing on both platforms?'
        ]
      },
      {
        heading: 'Include the ongoing operating cost',
        paragraphs: [
          'A launch is only the start. Budget for operating-system updates, device testing, accessibility, analytics, crash reporting, app-store review, and support. Also account for the backend and security controls that both web and mobile clients need.'
        ]
      },
      {
        heading: 'Validate with the narrowest useful release',
        paragraphs: [
          'Prototype the most important workflow on representative devices and test it with target users. If a responsive site can answer the key product question, it may be a lower-risk first step. Move to app distribution when evidence shows that native capabilities or repeat engagement justify the investment.'
        ]
      }
    ],
    takeaway: 'Choose the delivery channel that removes the biggest user friction and can be maintained reliably after launch.'
  },
  {
    slug: 'saas-scalability-without-premature-complexity',
    category: 'saas-architecture',
    title: 'SaaS scalability without premature architecture complexity',
    description: 'Build a reliable SaaS foundation and use measured bottlenecks to guide future scaling work.',
    publishedAt: '2026-11-04',
    readingMinutes: 6,
    introduction: 'Scalable architecture is not a list of fashionable infrastructure components. It is the ability to meet product, reliability, security, and cost goals as demand changes—without making ordinary changes unnecessarily difficult.',
    sections: [
      {
        heading: 'Define the service you need to provide',
        paragraphs: [
          'Set realistic expectations for availability, recovery, response time, and support. Identify the workflows that are most important to customers and the consequences of their failure. These goals give architecture decisions a concrete context.'
        ]
      },
      {
        heading: 'Get the fundamentals right first',
        paragraphs: [
          'Use clear application boundaries, validated inputs, safe authentication and authorization, reliable backups, and repeatable deployments. Keep production secrets out of source control. Add logs and basic metrics that help the team understand request failures and resource use.'
        ],
        bullets: [
          'Measure latency and error rates for critical user journeys.',
          'Test restore procedures, not just backup creation.',
          'Make database changes reviewable and recoverable.',
          'Apply tenant isolation consistently in queries and authorization.'
        ]
      },
      {
        heading: 'Scale from observed bottlenecks',
        paragraphs: [
          'Profile real workloads before introducing caches, queues, replicas, or service decomposition. A slow query may need an index; a batch task may need a queue; a high-traffic read path may benefit from caching. Each change adds operational behavior that must be monitored and supported.'
        ]
      },
      {
        heading: 'Design for failure and cost',
        paragraphs: [
          'Set timeouts, retry only safe operations, and prevent repeated failures from exhausting resources. Monitor storage, compute, third-party usage, and per-customer costs. Document what the system does when an external dependency is degraded.'
        ]
      }
    ],
    takeaway: 'Start with secure, observable, recoverable foundations. Add complexity when measured demand or service goals justify its operational cost.'
  },
  {
    slug: 'comparing-technology-stacks-for-a-product',
    category: 'technology-comparisons',
    title: 'A fair way to compare technology stacks for a new product',
    description: 'Use team capability, ecosystem, deployment, security, and lifecycle cost to compare software stacks.',
    publishedAt: '2026-11-04',
    readingMinutes: 5,
    introduction: 'Technology comparisons are most useful when they answer a specific product question. A popular framework can still be a poor fit if the team cannot maintain it or the platform does not meet the project’s operational needs.',
    sections: [
      {
        heading: 'Write down the constraints',
        paragraphs: [
          'Record the required platforms, expected usage, data sensitivity, integrations, accessibility needs, release cadence, and available skills. Distinguish requirements from preferences so the comparison does not simply reward the tool a stakeholder already knows.'
        ]
      },
      {
        heading: 'Compare the whole lifecycle',
        paragraphs: [
          'Evaluate development speed alongside testing, deployment, upgrades, hosting, support, and hiring. Check library health, documentation, security response, compatibility, and the cost of replacing a dependency. A short prototype can test a high-risk capability more reliably than an abstract scorecard.'
        ],
        bullets: [
          'Can the team diagnose production issues with this stack?',
          'Are essential libraries maintained and compatible?',
          'How are security updates and framework upgrades handled?',
          'What is the exit path if hosting or a vendor becomes unsuitable?'
        ]
      },
      {
        heading: 'Use a weighted, evidence-based decision',
        paragraphs: [
          'Choose a small set of criteria tied to the project’s risks and weight them before scoring. Record evidence and uncertainty for each score. Avoid false precision: if two options are close, reversibility, team familiarity, and the results of a focused prototype may settle the choice.'
        ]
      },
      {
        heading: 'Revisit only when the context changes',
        paragraphs: [
          'A technology decision does not need to be reopened every month. Review it when product scale, compliance obligations, team skills, or operational costs materially change. This keeps the team focused on delivering value rather than chasing trends.'
        ]
      }
    ],
    takeaway: 'There is no universally best stack. Choose the option that meets the product’s needs and that the team can operate and evolve responsibly.'
  }
];

export const getInsightArticleBySlug = (slug) => INSIGHT_ARTICLES.find((article) => article.slug === slug) || null;

export const getInsightCategoryBySlug = (slug) => INSIGHT_CATEGORIES.find((category) => category.slug === slug) || null;

export const getInsightsRouteByPath = (pathname) => {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  if (normalizedPath === '/insights') {
    return { type: 'hub', canonicalPath: '/insights' };
  }
  const articleMatch = normalizedPath.match(/^\/insights\/([a-z0-9-]+)$/);
  if (!articleMatch) return null;
  const article = getInsightArticleBySlug(articleMatch[1]);
  return article ? { type: 'article', article, canonicalPath: `/insights/${article.slug}` } : null;
};
