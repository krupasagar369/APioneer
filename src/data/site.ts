export type Course = {
  slug: string;
  title: string;
  partner: string;
  category: string;
  level: "Foundation" | "Intermediate" | "Advanced" | "Expert";
  mode: "Live Virtual" | "Classroom" | "Blended";
  duration: string;
  rating: number;
  learners: string;
  price: string;
  featured?: boolean;
  recommended?: boolean;
  summary: string;
  outcomes: string[];
  audience: string[];
  modules: { title: string; detail: string }[];
};

export type Partner = {
  slug: string;
  name: string;
  short: string;
  logo?: string;
  tagline: string;
  accent: string;
  description: string;
  stats: { label: string; value: string }[];
  benefits: { title: string; detail: string }[];
  certifications: string[];
  faqs: { q: string; a: string }[];
};

export const categories = [
  { slug: "cloud", name: "Cloud & Infrastructure", count: 48, blurb: "Azure, AWS and hybrid cloud architecture tracks." },
  { slug: "cybersecurity", name: "Cybersecurity & Risk", count: 36, blurb: "ISO, GRC, SOC and defensive security programmes." },
  { slug: "data-ai", name: "Data, AI & Analytics", count: 41, blurb: "Applied AI, data engineering and analytics fluency." },
  { slug: "agile", name: "Agile & Project Delivery", count: 29, blurb: "Scrum, SAFe, product and portfolio governance." },
  { slug: "quality", name: "Quality & Compliance", count: 22, blurb: "Management systems, auditing and standards." },
  { slug: "leadership", name: "Leadership & Business", count: 25, blurb: "Executive, managerial and communication skills." },
];

export const partners: Partner[] = [
  {
    slug: "microsoft",
    name: "Microsoft",
    short: "MS",
    tagline: "Azure, Security, Data & Power Platform certifications",
    accent: "from-[#0f5fbe] to-[#00a4ef]",
    logo: "https://ik.imagekit.io/iq6dnzo5f/Microsoft-Learning-Partner.webp?updatedAt=1771827020366",
    description:
      "As a Microsoft-aligned learning provider, APIONEER delivers official curriculum across Azure infrastructure, security operations, data platform and the Power Platform — taught by MCT-certified practitioners with hands-on lab environments.",
    stats: [
      { label: "Official courses", value: "60+" },
      { label: "Certified trainers", value: "35" },
      { label: "Exam pass rate", value: "94%" },
    ],
    benefits: [
      { title: "MCT-led delivery", detail: "Every cohort is led by a Microsoft Certified Trainer with live enterprise experience." },
      { title: "Official courseware", detail: "Learners receive authorised digital courseware and Microsoft Learn sandbox labs." },
      { title: "Exam readiness", detail: "Practice assessments, mock exams and a re-sit assurance package on select tracks." },
      { title: "Enterprise reporting", detail: "Cohort dashboards covering attendance, lab completion and certification outcomes." },
    ],
    certifications: ["AZ-104 Azure Administrator", "AZ-305 Solutions Architect", "SC-200 Security Operations", "DP-600 Fabric Analytics Engineer", "AI-102 Azure AI Engineer", "PL-300 Power BI Data Analyst"],
    faqs: [
      { q: "Is the exam voucher included?", a: "Vouchers are bundled on all corporate cohorts and available as an add-on for individual enrolments." },
      { q: "Do you provide lab environments?", a: "Yes — every delegate receives a dedicated cloud sandbox for the duration of the programme plus 30 days after." },
      { q: "Can training be customised?", a: "Absolutely. We routinely blend official modules with your internal architecture standards and tooling." },
    ],
  },
  {
    slug: "ai-cert",
    name: "AI CERTs",
    short: "AI",
    tagline: "Applied AI certification tracks for technical and business roles",
    accent: "from-gold to-gold-soft",
    logo: "https://ik.imagekit.io/iq6dnzo5f/aicert.jpg",
    description:
      "AI CERTs is a specialist certification body for applied artificial intelligence, covering AI fundamentals, prompt engineering, AI governance and role-specific AI upskilling. Course catalogue is fetched live from the AI CERTs platform.",
    stats: [
      { label: "Certification tracks", value: "Live" },
      { label: "Focus areas", value: "Applied AI" },
      { label: "Delivery", value: "Enterprise & individual" },
    ],
    benefits: [
      { title: "Applied AI curriculum", detail: "Tracks spanning AI fundamentals, prompt engineering and AI governance for technical and business roles." },
      { title: "Role-specific upskilling", detail: "Certification pathways mapped to the roles that adopt AI tooling day to day." },
      { title: "Live catalogue", detail: "Course listings are synced live from the AI CERTs platform so availability stays current." },
      { title: "Certification coaching", detail: "Structured exam preparation support from APIONEER's delivery team." },
    ],
    certifications: ["AI Fundamentals", "Prompt Engineering", "AI Governance", "Applied AI for Business Roles"],
    faqs: [
      { q: "Is the course catalogue always up to date?", a: "Yes — the AI CERTs course list is fetched live from their platform, so it reflects current availability." },
      { q: "Are these tracks for technical or business roles?", a: "Both — AI CERTs offers tracks for technical practitioners as well as business and leadership roles adopting AI." },
      { q: "Is there post-training support?", a: "Every delegate gets access to mentor support after the programme closes." },
    ],
  },
  {
    slug: "pecb",
    name: "PECB",
    short: "PECB",
    tagline: "ISO management system certifications and lead auditor tracks",
    accent: "from-[#0b3d5c] to-[#1c8ca8]",
    logo: "https://ik.imagekit.io/iq6dnzo5f/PECB_Logo.png?updatedAt=1784091400773",
    description:
      "An accredited PECB partner delivering ISO/IEC 27001, ISO 22301, ISO 9001 and privacy management certification programmes for compliance, risk and audit functions.",
    stats: [
      { label: "ISO standards", value: "14" },
      { label: "Auditors certified", value: "2,400+" },
      { label: "Accreditation", value: "Accredited" },
    ],
    benefits: [
      { title: "Accredited examinations", detail: "PECB exams delivered on the final day with certification issued on success." },
      { title: "Auditor practice", detail: "Case-based audit simulations, non-conformity drafting and reporting clinics." },
      { title: "Implementation toolkits", detail: "Policy templates, risk registers and Statement of Applicability starters." },
      { title: "Recertification support", detail: "CPD tracking guidance and refresher clinics for renewal cycles." },
    ],
    certifications: ["ISO/IEC 27001 Lead Implementer", "ISO/IEC 27001 Lead Auditor", "ISO 22301 Lead Implementer", "ISO 9001 Lead Auditor", "ISO/IEC 27701 Lead Implementer", "ISO 31000 Risk Manager"],
    faqs: [
      { q: "Is the exam fee included?", a: "Yes, all PECB programmes include the certification exam and first-year certification fee." },
      { q: "What is the exam format?", a: "Open-book, essay-type examination aligned to the PECB competency framework." },
      { q: "Do I need prior experience?", a: "Foundation tracks require none; Lead Auditor tracks assume basic management-system awareness." },
    ],
  },
  {
    slug: "scrum-alliance",
    name: "Scrum Alliance",
    short: "SA",
    tagline: "Certified ScrumMaster, Product Owner and advanced agile",
    accent: "from-[#0e4d64] to-[#38b2ac]",
    logo: "https://ik.imagekit.io/iq6dnzo5f/scrumalliance.png?updatedAt=1784010605297",
    description:
      "Interactive, workshop-driven Scrum Alliance certifications facilitated by Certified Scrum Trainers, focused on real team dynamics rather than slideware.",
    stats: [
      { label: "Workshop hours", value: "16" },
      { label: "Practitioners trained", value: "5,600+" },
      { label: "Satisfaction", value: "4.9/5" },
    ],
    benefits: [
      { title: "CST facilitation", detail: "Led by Certified Scrum Trainers with active coaching engagements." },
      { title: "Two-year membership", detail: "Includes Scrum Alliance membership and SEU tracking guidance." },
      { title: "Team simulations", detail: "Live product simulations covering backlog, forecasting and stakeholder conflict." },
      { title: "Coaching follow-up", detail: "Optional four-week agile coaching sprint for intact teams." },
    ],
    certifications: ["Certified ScrumMaster (CSM)", "Certified Scrum Product Owner (CSPO)", "Advanced CSM", "Advanced CSPO", "Certified Scrum Developer", "Agile Leadership Essentials"],
    faqs: [
      { q: "Is the certification exam included?", a: "Yes — CSM and CSPO include the online assessment and two-year membership." },
      { q: "Are sessions interactive?", a: "Entirely. Expect breakout simulations, retrospectives and facilitation practice throughout." },
      { q: "Can you run this for an intact team?", a: "Private team cohorts are our most requested format and include a tailored simulation." },
    ],
  },
  {
    slug: "istqb",
    name: "ISTQB",
    short: "ISTQB",
    accent: "from-[#c8102e] to-[#8c0c20]",
    logo: "https://ik.imagekit.io/iq6dnzo5f/ISTQB!.png?updatedAt=1786688255527",
    tagline: "Global standard for software testing qualification and certification",
    description:
      "The International Software Testing Qualifications Board (ISTQB) is the world's leading software testing certification scheme. APIONEER delivers ISTQB's accredited syllabus across Foundation, Advanced and Specialist levels for QA engineers, test leads and delivery teams.",
    stats: [
      { label: "Certification levels", value: "3" },
      { label: "Testers certified", value: "1,900+" },
      { label: "Accreditation", value: "Accredited" },
    ],
    benefits: [
      { title: "Globally recognised", detail: "ISTQB is the most widely adopted software testing certification worldwide." },
      { title: "Structured pathway", detail: "Foundation, Advanced and Specialist levels mapped to career progression." },
      { title: "Exam-focused prep", detail: "Practice question banks and mock exams aligned to the current syllabus." },
      { title: "Practitioner trainers", detail: "Delivered by working QA leads with real test-management experience." },
    ],
    certifications: ["Foundation Level", "Advanced Level Test Analyst", "Advanced Level Test Manager", "Agile Tester Extension"],
    faqs: [
      { q: "Is the exam included?", a: "Yes — all ISTQB programmes include the certification exam fee." },
      { q: "Do I need testing experience first?", a: "Foundation Level requires none; Advanced Level assumes prior testing experience." },
      { q: "Is this recognised internationally?", a: "Yes — ISTQB certification is recognised in over 100 countries." },
    ],
  },
  {
    slug: "linux-foundation",
    name: "The Linux Foundation",
    short: "LF",
    accent: "from-[#003366] to-[#0091d5]",
    logo: "https://ik.imagekit.io/iq6dnzo5f/Linux_Foundation_logo.png?updatedAt=1786687485317",
    tagline: "Open source training and certification for Linux, cloud native and DevOps professionals",
    description:
      "The Linux Foundation is the nonprofit steward of the world's most important open source projects, offering training and certification across Linux administration, Kubernetes, cloud native computing and DevOps practices. APIONEER delivers The Linux Foundation's official curriculum with hands-on labs and exam preparation.",
    stats: [
      { label: "Certification tracks", value: "10+" },
      { label: "Professionals certified", value: "1,200+" },
      { label: "Delivery", value: "Enterprise & individual" },
    ],
    benefits: [
      { title: "Open source authority", detail: "Certifications backed by the nonprofit steward of Linux, Kubernetes and CNCF projects." },
      { title: "Hands-on labs", detail: "Live command-line and cluster environments, not slideware." },
      { title: "Cloud native depth", detail: "Coverage spanning Linux administration through Kubernetes and DevOps practice." },
      { title: "Practitioner faculty", detail: "Trainers with production open source infrastructure experience." },
    ],
    certifications: ["Linux Foundation Certified System Administrator (LFCS)", "Certified Kubernetes Administrator (CKA)", "Certified Kubernetes Application Developer (CKAD)", "Kubernetes and Cloud Native Associate (KCNA)"],
    faqs: [
      { q: "Do I need Linux experience first?", a: "LFCS assumes basic Linux familiarity; associate-level tracks like KCNA require none." },
      { q: "Are labs included?", a: "Yes — every certification track includes hands-on lab environments." },
      { q: "Is the exam included?", a: "Exam vouchers are bundled on corporate cohorts and available as an add-on for individuals." },
    ],
  },
  {
    slug: "openedge",
    name: "OpenEdge",
    short: "OE",
    accent: "from-[#004b87] to-[#5cb85c]",
    logo: "https://ik.imagekit.io/iq6dnzo5f/openedge.png?updatedAt=1786688662942",
    tagline: "Progress OpenEdge application development and administration certifications",
    description:
      "OpenEdge, from Progress Software, powers business-critical applications across industries. APIONEER delivers OpenEdge developer and administrator training, covering ABL development, database administration and application modernisation pathways.",
    stats: [
      { label: "Certification tracks", value: "4" },
      { label: "Developers trained", value: "800+" },
      { label: "Delivery", value: "Enterprise & individual" },
    ],
    benefits: [
      { title: "ABL development depth", detail: "Hands-on coverage of Advanced Business Language across real application scenarios." },
      { title: "Administration coverage", detail: "Database administration, tuning and deployment best practice." },
      { title: "Modernisation guidance", detail: "Pathways for migrating legacy OpenEdge applications forward." },
      { title: "Practitioner-led", detail: "Delivered by consultants with production OpenEdge implementation experience." },
    ],
    certifications: ["OpenEdge ABL Developer", "OpenEdge Database Administrator", "OpenEdge Application Modernisation"],
    faqs: [
      { q: "Is this suitable for legacy application teams?", a: "Yes — a core focus is modernising and maintaining existing OpenEdge applications." },
      { q: "Do you cover database administration?", a: "Yes — tuning, backup strategy and deployment are covered in the administrator track." },
      { q: "Can training be customised to our codebase?", a: "We routinely tailor exercises around client application patterns on request." },
    ],
  },
];

export const courses: Course[] = [
  {
    slug: "azure-solutions-architect-az-305",
    title: "Azure Solutions Architect Expert (AZ-305)",
    partner: "Microsoft",
    category: "Cloud & Infrastructure",
    level: "Expert",
    mode: "Live Virtual",
    duration: "4 days",
    rating: 4.9,
    learners: "3,120",
    price: "₹64,000",
    featured: true,
    summary: "Design identity, governance, data, business continuity and infrastructure solutions on Microsoft Azure at enterprise scale.",
    outcomes: ["Design governance and identity architectures", "Model resilient, multi-region workloads", "Optimise cost and operational excellence", "Prepare thoroughly for the AZ-305 examination"],
    audience: ["Cloud architects", "Senior infrastructure engineers", "Technical leads migrating to Azure"],
    modules: [
      { title: "Identity, governance and monitoring", detail: "Entra ID design, subscription topology, policy and observability." },
      { title: "Data storage solutions", detail: "Relational, non-relational and data-integration architecture decisions." },
      { title: "Business continuity", detail: "Backup, recovery objectives and high-availability patterns." },
      { title: "Infrastructure solutions", detail: "Compute, networking, application and migration architecture." },
    ],
  },
  {
    slug: "aws-solutions-architect-associate",
    title: "AWS Certified Solutions Architect – Associate",
    partner: "AWS",
    category: "Cloud & Infrastructure",
    level: "Intermediate",
    mode: "Blended",
    duration: "3 days",
    rating: 4.8,
    learners: "4,480",
    price: "₹52,000",
    featured: true,
    recommended: true,
    summary: "Architect secure, resilient and cost-efficient workloads on AWS using the Well-Architected Framework as the design spine.",
    outcomes: ["Design highly available architectures", "Apply security and identity best practice", "Right-size for performance and cost", "Sit the SAA-C03 exam with confidence"],
    audience: ["Solution architects", "DevOps engineers", "Technology consultants"],
    modules: [
      { title: "Design secure architectures", detail: "IAM, network segmentation and data protection controls." },
      { title: "Resilient architectures", detail: "Decoupling, multi-AZ patterns and failure isolation." },
      { title: "High-performing architectures", detail: "Compute, storage and database selection trade-offs." },
      { title: "Cost-optimised architectures", detail: "Pricing models, storage tiers and cost governance." },
    ],
  },
  {
    slug: "iso-27001-lead-auditor",
    title: "ISO/IEC 27001 Lead Auditor",
    partner: "PECB",
    category: "Cybersecurity & Risk",
    level: "Advanced",
    mode: "Classroom",
    duration: "5 days",
    rating: 4.9,
    learners: "2,140",
    price: "₹58,000",
    featured: true,
    summary: "Master audit principles, techniques and reporting for information security management systems, ending with the accredited PECB examination.",
    outcomes: ["Plan and lead ISMS audits", "Apply ISO 19011 audit methodology", "Draft defensible non-conformity reports", "Achieve PECB Lead Auditor certification"],
    audience: ["Internal auditors", "Information security managers", "GRC and compliance professionals"],
    modules: [
      { title: "ISMS fundamentals", detail: "Standard structure, Annex A controls and certification process." },
      { title: "Audit principles", detail: "ISO 19011 and ISO/IEC 17021-1 based audit programme design." },
      { title: "Conducting the audit", detail: "Evidence collection, interviews, sampling and documentation." },
      { title: "Closing and certification", detail: "Findings, corrective action and the PECB examination." },
    ],
  },
  {
    slug: "certified-scrummaster",
    title: "Certified ScrumMaster (CSM)",
    partner: "Scrum Alliance",
    category: "Agile & Project Delivery",
    level: "Foundation",
    mode: "Live Virtual",
    duration: "2 days",
    rating: 4.9,
    learners: "6,300",
    price: "₹34,000",
    recommended: true,
    summary: "A workshop-led certification that builds real facilitation capability across Scrum events, team health and stakeholder management.",
    outcomes: ["Facilitate all Scrum events with confidence", "Coach teams through impediments", "Manage stakeholder expectations", "Earn CSM certification and membership"],
    audience: ["Scrum Masters", "Project and delivery managers", "Team leads adopting agile"],
    modules: [
      { title: "Agile foundations", detail: "Values, principles and empirical process control." },
      { title: "The Scrum framework", detail: "Roles, artifacts, events and definition of done." },
      { title: "Facilitation and coaching", detail: "Conflict, team dynamics and effective retrospectives." },
      { title: "Scaling and adoption", detail: "Working across dependencies and organisational change." },
    ],
  },
  {
    slug: "microsoft-security-operations-sc-200",
    title: "Microsoft Security Operations Analyst (SC-200)",
    partner: "Microsoft",
    category: "Cybersecurity & Risk",
    level: "Intermediate",
    mode: "Live Virtual",
    duration: "4 days",
    rating: 4.7,
    learners: "1,860",
    price: "₹56,000",
    recommended: true,
    summary: "Detect, investigate and respond to threats using Microsoft Sentinel, Defender XDR and Kusto Query Language.",
    outcomes: ["Operate Microsoft Sentinel end to end", "Hunt threats with KQL", "Automate response playbooks", "Prepare for the SC-200 examination"],
    audience: ["SOC analysts", "Security engineers", "Incident responders"],
    modules: [
      { title: "Defender XDR", detail: "Endpoint, identity, email and cloud app protection." },
      { title: "Microsoft Sentinel", detail: "Workspace design, connectors and analytics rules." },
      { title: "Threat hunting", detail: "KQL query building and proactive hunting workflows." },
      { title: "Automation", detail: "Playbooks, SOAR patterns and incident lifecycle management." },
    ],
  },
  {
    slug: "data-engineering-fabric-dp-600",
    title: "Fabric Analytics Engineer (DP-600)",
    partner: "Microsoft",
    category: "Data, AI & Analytics",
    level: "Advanced",
    mode: "Blended",
    duration: "4 days",
    rating: 4.8,
    learners: "1,240",
    price: "₹60,000",
    summary: "Design and operate lakehouse analytics estates in Microsoft Fabric, from ingestion pipelines to semantic models.",
    outcomes: ["Build lakehouse and warehouse solutions", "Design semantic models", "Optimise performance and cost", "Prepare for the DP-600 examination"],
    audience: ["Data engineers", "BI architects", "Analytics leads"],
    modules: [
      { title: "Fabric foundations", detail: "Workspaces, capacities, governance and OneLake." },
      { title: "Data ingestion", detail: "Pipelines, dataflows and notebook-based transformation." },
      { title: "Semantic modelling", detail: "Star schemas, DAX optimisation and Direct Lake." },
      { title: "Operations", detail: "Monitoring, deployment pipelines and cost governance." },
    ],
  },
  {
    slug: "applied-generative-ai-for-enterprise",
    title: "Applied Generative AI for Enterprise Teams",
    partner: "APIONEER",
    category: "Data, AI & Analytics",
    level: "Intermediate",
    mode: "Live Virtual",
    duration: "3 days",
    rating: 4.9,
    learners: "980",
    price: "₹46,000",
    featured: true,
    summary: "A pragmatic programme that moves teams from experimentation to governed, production-grade generative AI use cases.",
    outcomes: ["Identify high-value AI use cases", "Design retrieval-augmented workflows", "Apply evaluation and guardrails", "Build an internal AI governance model"],
    audience: ["Product and engineering leaders", "Data teams", "Innovation and transformation offices"],
    modules: [
      { title: "Landscape and strategy", detail: "Capability mapping and use-case prioritisation." },
      { title: "Solution patterns", detail: "RAG, agents, evaluation harnesses and tooling." },
      { title: "Risk and governance", detail: "Data residency, bias, auditability and policy design." },
      { title: "Operating model", detail: "Adoption, enablement and measurement of business value." },
    ],
  },
  {
    slug: "iso-9001-lead-implementer",
    title: "ISO 9001 Lead Implementer",
    partner: "PECB",
    category: "Quality & Compliance",
    level: "Intermediate",
    mode: "Classroom",
    duration: "5 days",
    rating: 4.7,
    learners: "1,410",
    price: "₹54,000",
    summary: "Implement and maintain a quality management system that withstands accredited certification audits.",
    outcomes: ["Plan a compliant QMS rollout", "Design process documentation", "Run internal audits", "Achieve PECB Lead Implementer certification"],
    audience: ["Quality managers", "Process owners", "Operations leaders"],
    modules: [
      { title: "QMS principles", detail: "Standard requirements and process approach." },
      { title: "Planning the QMS", detail: "Context, scope, objectives and risk-based thinking." },
      { title: "Implementation", detail: "Documentation, competence and operational control." },
      { title: "Monitoring", detail: "Internal audit, management review and improvement." },
    ],
  },
  {
    slug: "safe-agilist-leading-safe",
    title: "Leading SAFe — Agilist Certification",
    partner: "Scaled Agile",
    category: "Agile & Project Delivery",
    level: "Intermediate",
    mode: "Live Virtual",
    duration: "2 days",
    rating: 4.6,
    learners: "2,260",
    price: "₹42,000",
    summary: "Lead a lean-agile transformation across multiple teams with portfolio-level alignment and flow metrics.",
    outcomes: ["Apply the SAFe lean-agile mindset", "Plan and run PI planning", "Align portfolio to strategy", "Earn the SAFe Agilist certification"],
    audience: ["Programme managers", "Transformation leads", "Senior delivery managers"],
    modules: [
      { title: "Lean-agile thinking", detail: "Principles, mindset and flow-based delivery." },
      { title: "Agile release trains", detail: "Team-of-teams structure and cadence." },
      { title: "PI planning", detail: "Facilitation, dependency mapping and commitment." },
      { title: "Lean portfolio", detail: "Strategy, funding and portfolio governance." },
    ],
  },
  {
    slug: "executive-leadership-in-digital-transformation",
    title: "Executive Leadership in Digital Transformation",
    partner: "APIONEER",
    category: "Leadership & Business",
    level: "Advanced",
    mode: "Classroom",
    duration: "3 days",
    rating: 4.8,
    learners: "640",
    price: "₹78,000",
    summary: "A boardroom-level programme on shaping technology strategy, operating models and change capability.",
    outcomes: ["Set a credible transformation agenda", "Build a technology operating model", "Lead change across functions", "Measure transformation value"],
    audience: ["CXOs and directors", "Business unit heads", "Transformation sponsors"],
    modules: [
      { title: "Strategy and value", detail: "Linking technology investment to business outcomes." },
      { title: "Operating models", detail: "Structure, funding and capability design." },
      { title: "Leading change", detail: "Stakeholder alignment and culture." },
      { title: "Governance", detail: "Portfolio oversight, metrics and risk." },
    ],
  },
  {
    slug: "kubernetes-platform-engineering",
    title: "Kubernetes Platform Engineering",
    partner: "APIONEER",
    category: "Cloud & Infrastructure",
    level: "Advanced",
    mode: "Live Virtual",
    duration: "4 days",
    rating: 4.7,
    learners: "1,120",
    price: "₹58,000",
    summary: "Design and operate an internal developer platform on Kubernetes with GitOps, observability and policy as code.",
    outcomes: ["Design multi-tenant clusters", "Implement GitOps delivery", "Apply policy and supply-chain security", "Operate platform SLOs"],
    audience: ["Platform engineers", "SREs", "DevOps leads"],
    modules: [
      { title: "Cluster architecture", detail: "Multi-tenancy, networking and node strategy." },
      { title: "GitOps delivery", detail: "Argo CD, progressive delivery and environments." },
      { title: "Security", detail: "Policy as code, admission control and supply chain." },
      { title: "Operations", detail: "Observability, SLOs and incident response." },
    ],
  },
  {
    slug: "cyber-risk-management-for-leaders",
    title: "Cyber Risk Management for Leaders",
    partner: "APIONEER",
    category: "Cybersecurity & Risk",
    level: "Foundation",
    mode: "Live Virtual",
    duration: "2 days",
    rating: 4.6,
    learners: "870",
    price: "₹32,000",
    summary: "Equip non-technical executives to challenge, fund and govern cyber risk decisions with confidence.",
    outcomes: ["Interpret cyber risk reporting", "Set risk appetite", "Govern incident readiness", "Communicate to boards and regulators"],
    audience: ["Executives", "Board members", "Business risk owners"],
    modules: [
      { title: "Threat landscape", detail: "Actors, motives and sector-specific exposure." },
      { title: "Risk quantification", detail: "Framing cyber risk in financial terms." },
      { title: "Governance", detail: "Committees, reporting lines and assurance." },
      { title: "Crisis readiness", detail: "Tabletop exercise and communications." },
    ],
  },
];

export const workshops = [
  { slug: "cloud-cost-optimisation-lab", title: "Cloud Cost Optimisation Lab", date: "14 Aug 2026", city: "Bengaluru", format: "In-person", seats: "24 seats", duration: "1 day", focus: "FinOps", blurb: "A hands-on lab where teams cut real cloud spend using tagging, rightsizing and commitment strategies." },
  { slug: "ai-adoption-sprint", title: "Enterprise AI Adoption Sprint", date: "22 Aug 2026", city: "Hyderabad", format: "In-person", seats: "30 seats", duration: "2 days", focus: "Generative AI", blurb: "Move from AI curiosity to a governed, prioritised use-case portfolio in two facilitated days." },
  { slug: "isms-audit-clinic", title: "ISMS Internal Audit Clinic", date: "05 Sep 2026", city: "Live Virtual", format: "Virtual", seats: "40 seats", duration: "1 day", focus: "ISO 27001", blurb: "Practise audit planning, evidence sampling and non-conformity writing with accredited auditors." },
  { slug: "product-discovery-intensive", title: "Product Discovery Intensive", date: "19 Sep 2026", city: "Pune", format: "In-person", seats: "20 seats", duration: "1 day", focus: "Agile", blurb: "Structured discovery techniques for product owners working under delivery pressure." },
  { slug: "kubernetes-day-zero", title: "Kubernetes Day-Zero Bootcamp", date: "02 Oct 2026", city: "Chennai", format: "In-person", seats: "26 seats", duration: "2 days", focus: "Platform", blurb: "Stand up a production-shaped cluster with GitOps and observability from an empty account." },
  { slug: "leadership-communication-lab", title: "Executive Communication Lab", date: "17 Oct 2026", city: "Live Virtual", format: "Virtual", seats: "18 seats", duration: "1 day", focus: "Leadership", blurb: "High-stakes narrative, board storytelling and influence practice with video feedback." },
];

export const webinars = [
  { slug: "azure-landing-zones", title: "Designing Azure Landing Zones That Scale", date: "06 Aug 2026", time: "16:00 IST", speaker: "Ritika Menon", role: "Principal Cloud Architect", duration: "60 min", blurb: "A reference-architecture walkthrough covering subscription topology, policy and network hubs." },
  { slug: "iso-27001-2022-transition", title: "ISO 27001:2022 Transition — What Auditors Expect", date: "13 Aug 2026", time: "15:30 IST", speaker: "Anand Krishnan", role: "Lead Auditor, PECB", duration: "45 min", blurb: "The control changes that matter and the evidence certification bodies are asking for." },
  { slug: "genai-guardrails", title: "Guardrails for Enterprise Generative AI", date: "27 Aug 2026", time: "17:00 IST", speaker: "Dr. Meera Iyer", role: "Head of AI Practice", duration: "60 min", blurb: "Evaluation, red-teaming and policy patterns for production AI systems." },
  { slug: "agile-metrics-that-matter", title: "Agile Metrics That Executives Actually Trust", date: "10 Sep 2026", time: "16:00 IST", speaker: "Kabir Shah", role: "Certified Scrum Trainer", duration: "45 min", blurb: "Replacing velocity theatre with flow metrics that drive real decisions." },
];

export const blogs = [
  { slug: "skills-gap-2026", title: "The Enterprise Skills Gap Report 2026", category: "Research", date: "18 Jul 2026", read: "9 min", author: "APIONEER Research", excerpt: "What 400 technology leaders told us about capability shortfalls in cloud, security and AI — and the budgets they are moving to close them." },
  { slug: "certification-roi", title: "Measuring the ROI of Certification Programmes", category: "Corporate L&D", date: "09 Jul 2026", read: "7 min", author: "Ritika Menon", excerpt: "A practical model for connecting certification spend to delivery throughput, incident reduction and retention." },
  { slug: "ai-upskilling-blueprint", title: "An AI Upskilling Blueprint for Non-Technical Teams", category: "Artificial Intelligence", date: "28 Jun 2026", read: "6 min", author: "Dr. Meera Iyer", excerpt: "How to build fluency across finance, HR and operations without turning everyone into a data scientist." },
  { slug: "iso-audit-readiness", title: "Seven Signals You Are Not Audit Ready", category: "Compliance", date: "16 Jun 2026", read: "5 min", author: "Anand Krishnan", excerpt: "Common gaps we find in the four weeks before a certification audit, and how to close them quickly." },
  { slug: "government-digital-capability", title: "Building Digital Capability in the Public Sector", category: "Government", date: "02 Jun 2026", read: "8 min", author: "Sunita Rao", excerpt: "Lessons from delivering large-scale technical upskilling for state departments and public undertakings." },
  { slug: "hybrid-cohort-design", title: "Designing Hybrid Cohorts That People Finish", category: "Learning Design", date: "21 May 2026", read: "6 min", author: "Kabir Shah", excerpt: "Completion is a design problem. Here is the cohort structure that lifted our finish rate to 96%." },
];

export const resources = [
  { title: "Enterprise Skills Gap Report 2026", type: "Report", pages: "42 pages", blurb: "Benchmark data across cloud, security, data and agile capability from 400 organisations." },
  { title: "Corporate Training Buyer's Guide", type: "Guide", pages: "18 pages", blurb: "Evaluation criteria, commercial models and a scoring matrix for selecting a training partner." },
  { title: "ISO 27001 Implementation Toolkit", type: "Toolkit", pages: "12 templates", blurb: "Risk register, SoA starter, policy set and internal audit checklist." },
  { title: "Cloud Certification Roadmap", type: "Roadmap", pages: "1 poster", blurb: "Role-based certification pathways across Microsoft Azure and AWS." },
  { title: "AI Governance Policy Template", type: "Template", pages: "9 pages", blurb: "A starting policy covering acceptable use, data handling and model review." },
  { title: "Learning Programme ROI Calculator", type: "Calculator", pages: "Spreadsheet", blurb: "Model cost, productivity uplift and payback for a proposed cohort." },
];

export const careers = [
  { slug: "senior-cloud-trainer", title: "Senior Cloud Trainer (Azure / AWS)", team: "Delivery", location: "Bengaluru · Hybrid", type: "Full-time", exp: "8+ years", blurb: "Lead enterprise cloud cohorts and shape our architecture curriculum." },
  { slug: "enterprise-account-director", title: "Enterprise Account Director", team: "Growth", location: "Mumbai · Hybrid", type: "Full-time", exp: "10+ years", blurb: "Own strategic accounts across BFSI and manufacturing." },
  { slug: "learning-experience-designer", title: "Learning Experience Designer", team: "Learning Design", location: "Remote · India", type: "Full-time", exp: "5+ years", blurb: "Design cohort journeys, labs and assessment strategy." },
  { slug: "cybersecurity-consultant", title: "Cybersecurity Consultant (ISMS)", team: "Consulting", location: "Hyderabad · Onsite", type: "Full-time", exp: "6+ years", blurb: "Deliver ISO 27001 implementation and audit engagements." },
  { slug: "government-programme-manager", title: "Government Programme Manager", team: "Public Sector", location: "New Delhi · Onsite", type: "Full-time", exp: "9+ years", blurb: "Run large-scale public sector upskilling programmes end to end." },
  { slug: "marketing-content-lead", title: "Marketing Content Lead", team: "Marketing", location: "Remote · India", type: "Full-time", exp: "6+ years", blurb: "Own thought leadership, research reports and demand content." },
];

export const services = [
  { title: "Corporate Training", detail: "Private cohorts, capability academies and role-based learning paths for enterprise teams.", href: "/corporate-training" },
  { title: "Government Training", detail: "Large-scale technical upskilling for ministries, departments and public undertakings.", href: "/government-training" },
  { title: "Professional Certification", detail: "Accredited certification delivery across Microsoft, AWS, PECB and Scrum Alliance.", href: "/courses" },
  { title: "IT Consulting", detail: "Cloud architecture, security posture and platform engineering advisory engagements.", href: "/services" },
  { title: "Technical Upskilling", detail: "Assessment-led reskilling programmes with measurable competency uplift.", href: "/services" },
  { title: "Enterprise Learning Solutions", detail: "Learning strategy, LMS readiness, content curation and outcome analytics.", href: "/services" },
];

export const industries = [
  { name: "Banking & Financial Services", detail: "Regulated cloud adoption, resilience and audit readiness." },
  { name: "Manufacturing & Industrial", detail: "OT security, digital operations and Industry 4.0 capability." },
  { name: "Healthcare & Life Sciences", detail: "Data privacy, validated systems and clinical analytics." },
  { name: "Government & Public Sector", detail: "Digital service delivery and workforce transformation at scale." },
  { name: "Technology & Telecom", detail: "Platform engineering, SRE and product delivery capability." },
  { name: "Energy & Utilities", detail: "Grid modernisation, asset analytics and cyber resilience." },
];

export const testimonials = [
  { quote: "APIONEER rebuilt our cloud capability in nine months. The cohorts were rigorous, the reporting was transparent, and our migration timeline moved left by a full quarter.", name: "Vikram Desai", role: "CTO, national retail bank", metric: "38% faster migration" },
  { quote: "The ISO 27001 programme was the most practical compliance training our team has attended. We passed the certification audit with zero major non-conformities.", name: "Priya Nair", role: "Head of Risk, healthcare group", metric: "0 major findings" },
  { quote: "They treat learning as an engineering problem — baselines, measurement, iteration. That mindset is why we made them our global training partner.", name: "Daniel Okoro", role: "Global L&D Director, industrial manufacturer", metric: "14 countries covered" },
];

export const stats = [
  { value: 42, suffix: "", label: "Countries Reached" },
  { value: 780, suffix: "+", label: "Corporate Clients" },
  { value: 1000, suffix: "+", label: "Training Programmes" },
  { value: 250, suffix: "K+", label: "Professionals Trained" },
  { value: 50, suffix: "+", label: "Global Partners" },
  { value: 150, suffix: "+", label: "Experts & Consultants" },
];

export const clients = [
  "NORTHBRIDGE", "AXIOM ENERGY", "VERTEXA", "KAIROS BANK", "MERIDIAN HEALTH", "STRATOFORM", "ORBITAL TELECOM", "CIVICA GROUP",
];

export const ctaOptions = ["Request Callback", "Download Brochure", "Talk to an Expert", "Corporate Inquiry", "Book Free Consultation"] as const;

export type Workshop = (typeof workshops)[number];
export type Webinar = (typeof webinars)[number];
export type BlogPost = (typeof blogs)[number];
export type Resource = (typeof resources)[number];
export type Career = (typeof careers)[number];
export type Testimonial = (typeof testimonials)[number];

const caseHealthcare = "/images/corporate-training.jpg";
const caseGovernment = "/images/government.jpg";

export const caseStudies = [
  {
    sector: "Healthcare",
    title: "A national provider certified 480 engineers in nine months",
    image: caseHealthcare,
    imageAlt: "Modern hospital atrium representing a national healthcare provider",
    challenge: "Fragmented cloud skills slowed platform delivery across 40 clinical sites.",
    solution: "A role-mapped Azure and security academy with labs on the provider's own reference architecture.",
    outcome: "Release cadence moved from quarterly to fortnightly for 22,000 clinicians served.",
  },
  {
    sector: "Public sector",
    title: "A ministry upskilled 3,100 officers on secure digital services",
    image: caseGovernment,
    imageAlt: "Government building interior representing a public sector digital programme",
    challenge: "Legacy processes and thin in-house capability blocked a national digital mandate.",
    solution: "Blended PECB and cloud governance tracks with cohort mentoring and audit-ready reporting.",
    outcome: "Audit findings reduced by 62% within the first compliance cycle.",
  },
] as const;