import type { Resource } from "../types/navigator";

const VERIFIED = "2026-09-04";

export const resources: Resource[] = [
  {
    id: "otm-core",
    type: "resource",
    title: "OTM — invention disclosure, evaluation, IP and licensing",
    organization: "Office of Technology Management, WashU",
    url: "https://otm.wustl.edu/disclose-inventions/licensing-process/",
    internality: "washu",
    domains: ["therapeutic", "device", "diagnostic", "software", "research-tool"],
    states: ["s3", "s4", "s5", "s6", "s7", "s8"],
    problemsSolved: ["ip", "disclosure", "license", "transfer"],
    whatYouGet:
      "Disclosure intake, evaluation, patent/IP strategy, marketing, licensing, and commercialization support. The disclosure asks for an invention description, creators, funding, and related information.",
    whyYouMightCare:
      "Lets you understand transfer options without deciding to become an entrepreneur. A conversation with OTM can preserve options before a talk or paper — it is not a commitment to patent or found.",
    usefulWhen: [
      "Something developed in the lab may have utility outside it",
      "You want to preserve transfer or commercialization options",
      "You are choosing among protect, license, distribute, or open-release",
    ],
    notFor: [
      "A required first step for every research idea",
      "A substitute for deciding what success looks like to you",
    ],
    eligibility:
      "WashU inventions; assignment and contact depend on academic unit. OTM’s department lookup includes neuroscience-related units.",
    requiresDisclosure: false,
    companyRequired: false,
    funding: null,
    caveats: [
      "Talking with OTM is not the same as filing a patent.",
      "A startup is not required.",
    ],
    investigatorReturns: [
      "clarity on transfer options",
      "possible protection before public disclosure",
      "a path to licensing without founding",
    ],
    nextStates: ["s5", "s6", "s8"],
    status: "evergreen",
    nextDeadline: null,
    lastVerified: VERIFIED,
    sourceUrls: [
      "https://otm.wustl.edu/disclose-inventions/licensing-process/",
      "https://otm.wustl.edu/disclose-inventions/otm-contact-by-washu-department/",
    ],
    contact: "otm@wustl.edu · 314-747-1700",
  },
  {
    id: "neurotech-hub",
    type: "resource",
    title: "Neurotech Hub",
    organization: "Washington University in St. Louis",
    url: "https://neurotechhub.wustl.edu/",
    internality: "washu",
    domains: ["device", "software", "research-tool", "algorithm"],
    states: ["s0", "s1", "s2", "s3"],
    problemsSolved: ["prototype", "engineering", "technical-development"],
    whatYouGet:
      "On-demand technical services and development of new technical paradigms and tools for neuroscience.",
    whyYouMightCare:
      "Turns a technical problem into research capability, preliminary data, prototypes, and potentially protectable inventions — before you need a commercial plan.",
    usefulWhen: [
      "You have an experimental or technical problem, concept, or prototype",
      "You need engineering help to make the first convincing test",
      "You want a working tool for the lab, not a company",
    ],
    notFor: [
      "A substitute for clinical or regulatory strategy",
      "Late-stage company financing",
    ],
    eligibility:
      "Neuroscience-oriented WashU resource. Precise project prioritization and service terms are locally managed where not publicly stated.",
    requiresDisclosure: false,
    companyRequired: false,
    funding: null,
    caveats: ["Bring a problem. You do not need a commercialization plan first."],
    investigatorReturns: [
      "prototypes and methods",
      "preliminary data",
      "trainee technical projects",
    ],
    nextStates: ["s2", "s3"],
    status: "evergreen",
    nextDeadline: null,
    lastVerified: VERIFIED,
    sourceUrls: ["https://neurotechhub.wustl.edu/"],
  },
  {
    id: "dep",
    type: "resource",
    title: "Domain Expert Program (DEP)",
    organization: "Office of Technology Management, WashU",
    url: "https://otm.wustl.edu/items/domain-expert-program-dep/",
    internality: "washu",
    domains: ["device", "diagnostic", "software", "research-tool", "therapeutic"],
    states: ["s3", "s4", "s5", "s6"],
    problemsSolved: ["external-feedback", "need-validation", "de-risking"],
    whatYouGet:
      "Curated sector-specific industry and investor feedback, plus actionable recommendations about commercial potential and de-risking. OTM reports DEP panels have connected projects onward to resources including the Gap Fund.",
    whyYouMightCare:
      "Can prevent the lab from spending scarce research time on development milestones that outsiders do not value. You do not need to already know the market or have a startup team.",
    usefulWhen: [
      "The technology works scientifically, but you do not know what evidence industry would want next",
      "You want external judgment without founding a company",
    ],
    notFor: [
      "General business-plan tutoring (see Skandalaris Venture Development)",
      "Founder coaching (see OTM New Ventures / EIR)",
    ],
    eligibility:
      "OTM-mediated selection and referral. Complete researcher-facing public eligibility criteria are unspecified.",
    requiresDisclosure: true,
    companyRequired: false,
    funding: null,
    caveats: ["Start with OTM. Access is mediated, not a walk-in clinic."],
    investigatorReturns: [
      "external validation of need",
      "a shorter de-risking list",
      "possible onward path to Gap Fund",
    ],
    nextStates: ["s4", "s6", "s7"],
    status: "evergreen",
    nextDeadline: null,
    lastVerified: VERIFIED,
    sourceUrls: ["https://otm.wustl.edu/items/domain-expert-program-dep/"],
    contact: "Start with OTM · otm@wustl.edu",
  },
  {
    id: "gap-fund",
    type: "resource",
    title: "Washington University Gap Fund",
    organization: "Office of Technology Management, WashU",
    url: "https://otm.wustl.edu/disclose-inventions/gap-fund/",
    internality: "washu",
    domains: ["device", "diagnostic", "software", "research-tool"],
    states: ["s6", "s7"],
    problemsSolved: ["funding", "de-risking", "prototype"],
    whatYouGet:
      "Translational funding for promising non-drug WashU technologies. Current OTM information says commitments are made in blocks up to $55,000; technically no overall maximum is stated.",
    whyYouMightCare:
      "Pays for work conventional academic grants may not prioritize but that can de-risk a technology. You do not need to start a company.",
    usefulWhen: [
      "A specific non-drug experiment, prototype, or milestone would increase transfer value",
      "You have a WashU technology and a concrete de-risking experiment",
    ],
    notFor: [
      "Drug development / therapeutic candidates (see Needleman)",
      "General unfocused research support",
    ],
    eligibility:
      "WashU non-drug technologies; project selection through OTM. Additional selection criteria and timing are program-specific.",
    requiresDisclosure: true,
    companyRequired: false,
    funding: "Commitments in blocks up to $55,000 (verify current terms)",
    caveats: [
      "This is not a drug-development program.",
      "Selection is OTM-routed.",
    ],
    investigatorReturns: [
      "funded development work",
      "validation data",
      "possible grant and publication leverage",
    ],
    nextStates: ["s7"],
    status: "evergreen_program_verify_current_call",
    nextDeadline: null,
    lastVerified: VERIFIED,
    sourceUrls: ["https://otm.wustl.edu/disclose-inventions/gap-fund/"],
    contact: "OTM · otm@wustl.edu",
  },
  {
    id: "needleman-npic",
    type: "resource",
    title: "Needleman Program (NPIC)",
    organization: "Needleman Program for Innovation & Commercialization, WashU",
    url: "https://needlemanprogram.wustl.edu/services/",
    internality: "washu",
    domains: ["therapeutic"],
    states: ["s5", "s6", "s7"],
    problemsSolved: ["therapeutic-development", "funding", "ind"],
    whatYouGet:
      "Funding plus drug-discovery and development expertise and business mentoring. NPIC’s stated objective is to move promising therapeutic candidates toward FDA investigational-new-drug status.",
    whyYouMightCare:
      "Provides capabilities most academic labs are not organized to execute and can preserve the PI’s focus on science. A startup is not required.",
    usefulWhen: [
      "A promising WashU therapeutic candidate needs work beyond normal discovery science",
      "The next question is developability toward IND, not another mechanistic paper",
    ],
    notFor: [
      "Generic non-therapeutic devices",
      "Research tools or software without a therapeutic candidate",
    ],
    eligibility:
      "During open windows, PIs from any WashU school or department may apply. The public page currently says applications are closed and a future RFP is planned.",
    requiresDisclosure: false,
    companyRequired: false,
    funding: "Program funding during open RFPs (verify current call)",
    caveats: [
      "Applications were closed as of 2026-09-04; treat this as a future milestone until a new RFP opens.",
    ],
    investigatorReturns: [
      "drug-development expertise",
      "milestone-driven funding",
      "path toward IND without founding",
    ],
    nextStates: ["s7", "s8"],
    status: "closed_verify",
    nextDeadline: null,
    lastVerified: VERIFIED,
    sourceUrls: [
      "https://needlemanprogram.wustl.edu/services/",
      "https://needlemanprogram.wustl.edu/application-resources/",
      "https://needlemanprogram.wustl.edu/contact-us/",
    ],
    contact: "npic@wustl.edu",
  },
  {
    id: "icts",
    type: "resource",
    title: "ICTS Research Forum + CTRFP / Just-In-Time funding",
    organization: "Institute of Clinical and Translational Sciences, WashU",
    url: "https://icts.wustl.edu/research-services/research-development-program/research-forum-program/",
    internality: "washu",
    domains: ["therapeutic", "device", "diagnostic", "clinical-workflow"],
    states: ["s1", "s2", "s3", "s4", "s6", "s7"],
    problemsSolved: ["study-design", "funding", "grants", "translational-evidence"],
    whatYouGet:
      "Year-round multidisciplinary project-development or grant-review roundtables (design, aims, methods, statistics, milestones, stakeholders). CTRFP currently provides up to $50,000 direct costs for one-year clinical/translational or community-engaged projects and up to $25,000 for biostatistics/epidemiology/research-design projects. JIT provides rapid core-service support for preliminary data or certain QA/QI work.",
    whyYouMightCare:
      "Particularly valuable for turning a promising invention into rigorous translational evidence and competitive grants. No commercialization plan or company is required.",
    usefulWhen: [
      "You have a translational concept or grant that needs study design and critique",
      "Preliminary or core-services data are the immediate bottleneck",
    ],
    notFor: [
      "A company-formation program",
      "Unrestricted laboratory operating support",
    ],
    eligibility:
      "Research Forum is available to ICTS members across career stages and partner affiliations. CTRFP PI must be an ICTS member. As of 2026-09-04 the 2026 CTRFP LOI deadline had passed; invited full applications were due September 14, 2026. JIT has separate rolling processes and limits.",
    requiresDisclosure: false,
    companyRequired: false,
    funding: "CTRFP up to $50,000 / $25,000 by category; JIT core-service support",
    caveats: [
      "CTRFP is a competitive call with cycle-specific deadlines — verify current status.",
      "Membership is required for CTRFP.",
    ],
    investigatorReturns: [
      "stronger aims and methods",
      "preliminary data",
      "grant competitiveness",
      "collaborators",
    ],
    nextStates: ["s2", "s6", "s7"],
    status: "evergreen_program_verify_current_call",
    nextDeadline: "2026-09-14 (invited CTRFP applications; verify)",
    lastVerified: VERIFIED,
    sourceUrls: [
      "https://icts.wustl.edu/research-services/research-development-program/research-forum-program/",
      "https://icts.wustl.edu/funding/ctrfp-funding-program/",
      "https://icts.wustl.edu/funding/just-in-time-jit/",
    ],
    contact: "icts@wustl.edu · JIT@wustl.edu",
  },
  {
    id: "hope-center",
    type: "resource",
    title: "Hope Center for Neurological Disorders",
    organization: "Washington University in St. Louis",
    url: "https://hopecenter.wustl.edu/funding-awards/pilot-projects/",
    internality: "washu",
    domains: ["therapeutic", "device", "research-tool"],
    states: ["s1", "s2", "s3", "s4"],
    problemsSolved: ["pilot-funding", "collaborators", "neuroscience"],
    whatYouGet:
      "Translational neuroscience community and pilot opportunities. Current pilot eligibility requires the project PI to be a Hope Center faculty member; cycle-specific requirements change.",
    whyYouMightCare:
      "Pilot data, collaborators, and neuroscience-specific infrastructure can strengthen papers and external grant applications. Commercialization is not required.",
    usefulWhen: [
      "The work addresses neurological disease",
      "You need collaborative pilot funding or specialized neuroscience infrastructure",
    ],
    notFor: [
      "Investigators seeking a general startup accelerator",
      "Projects with no neurological-disease connection",
    ],
    eligibility:
      "Hope Center faculty membership required for the PI of the current pilot program; collaborator membership rules are less restrictive.",
    requiresDisclosure: false,
    companyRequired: false,
    funding: "Pilot awards (cycle-specific; verify current call)",
    caveats: ["Confirm current membership and cycle requirements before applying."],
    investigatorReturns: [
      "pilot data",
      "collaborators",
      "grant leverage",
    ],
    nextStates: ["s2", "s3", "s4"],
    status: "evergreen_program_verify_current_call",
    nextDeadline: null,
    lastVerified: VERIFIED,
    sourceUrls: ["https://hopecenter.wustl.edu/funding-awards/pilot-projects/"],
  },
  {
    id: "xir",
    type: "resource",
    title: "OTM Experts-in-Residence (XiR)",
    organization: "Office of Technology Management, WashU",
    url: "https://otm.wustl.edu/items/experts-in-residence/",
    internality: "washu",
    domains: ["device", "diagnostic", "software", "therapeutic", "research-tool"],
    states: ["s4", "s5", "s6"],
    problemsSolved: ["expertise", "external-feedback"],
    whatYouGet:
      "Access to experienced expertise within the OTM innovation network. OTM publishes XiR eligibility for participating experts; expert participation itself is invitation-only.",
    whyYouMightCare:
      "You do not have to independently locate every expert. This is domain judgment, not a request that you become a founder.",
    usefulWhen: [
      "The project needs experienced external judgment rather than general business instruction",
      "You want to define a product, technical, or milestone question",
    ],
    notFor: [
      "Founder coaching (see EIR / New Ventures)",
      "Open office hours without OTM context",
    ],
    eligibility:
      "Researcher-facing routing criteria are unspecified publicly; access should be treated as OTM-mediated.",
    requiresDisclosure: true,
    companyRequired: false,
    funding: null,
    caveats: ["Start with OTM. Do not treat XiR as a walk-in mentoring pool."],
    investigatorReturns: [
      "targeted expert advice",
      "clearer next technical or product milestone",
    ],
    nextStates: ["s6"],
    status: "evergreen",
    nextDeadline: null,
    lastVerified: VERIFIED,
    sourceUrls: ["https://otm.wustl.edu/items/experts-in-residence/"],
    contact: "Start with OTM · otm@wustl.edu",
  },
  {
    id: "otm-eir",
    type: "resource",
    title: "OTM New Ventures / Entrepreneur-in-Residence",
    organization: "Office of Technology Management, WashU",
    url: "https://otm.wustl.edu/disclose-inventions/new-ventures/",
    internality: "washu",
    domains: ["therapeutic", "device", "diagnostic", "software"],
    states: ["s7", "s8"],
    problemsSolved: ["startup", "founder-coaching", "business-model"],
    whatYouGet:
      "Founder coaching, business-case and value-proposition refinement, business-model work, and startup mentoring. The EIR program is administered through New Ventures.",
    whyYouMightCare:
      "Faculty can explore company formation without personally having all CEO or business-development expertise. Startup intent is relevant; this is not the default path for every disclosed invention.",
    usefulWhen: [
      "A startup is becoming a plausible vehicle",
      "Scientific founders need experienced company-building help",
    ],
    notFor: [
      "Investigators who want licensing or distribution without founding",
      "Early ideas with no company hypothesis",
    ],
    eligibility:
      "OTM states that the research team’s WashU patent must be foundational to the startup license; EIR connection is at New Ventures’ discretion.",
    requiresDisclosure: true,
    companyRequired: true,
    funding: null,
    caveats: [
      "A foundational WashU patent/license path is assumed.",
      "This is founder support, not general scientific mentoring.",
    ],
    investigatorReturns: [
      "company-building coaching",
      "a clearer go/no-go on founding",
      "possible license path",
    ],
    nextStates: ["s8", "s9"],
    status: "evergreen",
    nextDeadline: null,
    lastVerified: VERIFIED,
    sourceUrls: [
      "https://otm.wustl.edu/disclose-inventions/new-ventures/",
      "https://otm.wustl.edu/items/entrepreneur-in-residence/",
    ],
    contact: "OTM New Ventures · otm@wustl.edu",
  },
  {
    id: "skandalaris-vd",
    type: "resource",
    title: "Skandalaris Venture Development",
    organization: "Skandalaris Center, WashU",
    url: "https://skandalaris.wustl.edu/resource/venture-development/",
    internality: "washu",
    domains: ["device", "software", "research-tool", "therapeutic", "diagnostic"],
    states: ["s4", "s6", "s7", "s8"],
    problemsSolved: ["venture-exploration", "business-model", "pitch"],
    whatYouGet:
      "30-minute advising on brainstorming, business plans, financial models, pitching, and next-step guidance.",
    whyYouMightCare:
      "An excellent low-commitment way to ask whether entrepreneurship is even sensible. No incorporation or mature startup is required.",
    usefulWhen: [
      "You want help thinking through an idea, model, or next entrepreneurial step",
      "You are exploring founding without committing to it",
    ],
    notFor: [
      "The Skandalaris Venture Competition — current rules prohibit WashU / university IP and licenses to university IP",
      "A substitute for OTM evaluation of a WashU invention",
    ],
    eligibility:
      "WashU students, faculty, staff, and alumni; ventures may be at any stage.",
    requiresDisclosure: false,
    companyRequired: false,
    funding: null,
    caveats: [
      "Do not confuse Venture Development advising with the Skandalaris Venture Competition.",
      "SVC currently excludes WashU IP — a common mis-route for faculty inventions.",
    ],
    investigatorReturns: [
      "a low-stakes read on whether a company is justified",
      "help framing a model or pitch if you proceed",
    ],
    nextStates: ["s6", "s8"],
    status: "evergreen",
    nextDeadline: null,
    lastVerified: VERIFIED,
    sourceUrls: [
      "https://skandalaris.wustl.edu/resource/venture-development/",
      "https://skandalaris.wustl.edu/programs/",
    ],
    contact: "sc@wustl.edu",
  },
  {
    id: "biogenerator",
    type: "resource",
    title: "BioGenerator Ventures",
    organization: "BioSTL",
    url: "https://www.biostl.org/what-we-do/biogenerator",
    internality: "regional",
    domains: ["therapeutic", "device", "diagnostic", "research-tool"],
    states: ["s7", "s8", "s9"],
    problemsSolved: ["startup", "capital", "lab-space", "operators"],
    whatYouGet:
      "Early-stage capital, expert guidance, laboratory space, and hands-on company support in human health and agriculture.",
    whyYouMightCare:
      "A strong regional bridge from university invention to an investable company and external talent. A first conversation can precede a mature fundraising round.",
    usefulWhen: [
      "A bioscience opportunity is becoming a company",
      "Founders need investment, operators, space, or investor connections",
    ],
    notFor: [
      "Academic projects with no company hypothesis",
      "A general faculty grant program",
    ],
    eligibility:
      "Focus on high-growth science-based companies. Exact investment criteria and terms are deal-specific.",
    requiresDisclosure: false,
    companyRequired: true,
    funding: "Early-stage company capital (deal-specific)",
    caveats: [
      "This is company-building support, not an academic pilot grant.",
    ],
    investigatorReturns: [
      "company infrastructure and talent",
      "early capital",
      "regional investor network",
    ],
    nextStates: ["s8", "s9"],
    status: "evergreen",
    nextDeadline: null,
    lastVerified: VERIFIED,
    sourceUrls: [
      "https://www.biostl.org/what-we-do/biogenerator",
      "https://www.biostl.org/about/",
    ],
  },
  {
    id: "nih-ninds-sbir",
    type: "resource",
    title: "NIH / NINDS + Missouri SBIR/STTR support",
    organization: "NIH SEED · NINDS · Missouri SBDC FAST",
    url: "https://seed.nih.gov/small-business-funding/find-funding/sbir-sttr-funding-opportunities",
    internality: "federal",
    domains: ["therapeutic", "device", "diagnostic", "software", "research-tool"],
    states: ["s6", "s7", "s8", "s9"],
    problemsSolved: ["funding", "small-business", "device-translation"],
    whatYouGet:
      "Non-dilutive federal R&D funding through NIH SBIR/STTR (typically three cycles per year). NINDS Translational Devices supports development, optimization, translation, and first-in-human testing of therapeutic and diagnostic devices; NINDS also has dedicated small-business programs. Missouri SBDC FAST helps with proposal strategy and submission.",
    whyYouMightCare:
      "Can fund scientists, engineers, prototypes, preclinical work, and commercialization-oriented R&D while retaining company equity. NINDS device routes can finance evidence that R01-style projects often do not emphasize.",
    usefulWhen: [
      "A product-oriented biomedical project should sit inside a U.S. small business",
      "A neural device needs milestone-driven translation or first-in-human work",
      "Founders need help navigating SBIR/STTR",
    ],
    notFor: [
      "An academic laboratory acting alone (SBIR/STTR applicant must be an eligible U.S. small business; STTR requires formal research-institution participation)",
      "An early idea with no company or academic-device NOFO fit",
    ],
    eligibility:
      "SBIR/STTR: U.S. small-business eligibility. Some NINDS translational-device NOFOs are academic; others are small-business-only — inspect the current NOFO rather than inferring from the program family.",
    requiresDisclosure: false,
    companyRequired: false,
    funding: "NIH SBIR/STTR and NINDS translational-device NOFOs (verify current)",
    caveats: [
      "An academic lab alone is not an SBIR/STTR applicant.",
      "I-Corps at NIH is generally downstream of a qualifying Phase I award — not an entry program.",
    ],
    investigatorReturns: [
      "substantial non-dilutive R&D funding",
      "device-translation milestones",
      "local proposal assistance via Missouri SBDC",
    ],
    nextStates: ["s7", "s8", "s9"],
    status: "evergreen_program_verify_current_call",
    nextDeadline: null,
    lastVerified: VERIFIED,
    sourceUrls: [
      "https://seed.nih.gov/small-business-funding/find-funding/sbir-sttr-funding-opportunities",
      "https://www.ninds.nih.gov/current-research/research-funded-ninds/translational-research/translational-devices",
      "https://www.ninds.nih.gov/funding/ninds-small-business-program",
      "https://sbdc.missouri.edu/programs/technology/funding",
    ],
  },
];

export const resourceById = Object.fromEntries(
  resources.map((resource) => [resource.id, resource]),
);
