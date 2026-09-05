import type { MapNode } from "../types/navigator";

export const nodes: MapNode[] = [
  {
    id: "s0",
    type: "state",
    region: "discover",
    title: "Problem / observation",
    shortDescription: "An unmet need exists. A solution is not yet defined.",
    position: { x: 80, y: 420 },
    tags: ["observation", "need", "discovery"],
    resourceIds: ["neurotech-hub", "icts", "hope-center"],
    details: {
      whyItMatters:
        "Many useful paths start before there is an invention. Naming the problem separately from a solution keeps later work honest.",
      youMayBeHereIf: [
        "You have noticed a scientific, technical, or clinical gap",
        "You do not yet have a defined method, target, or prototype",
        "You are deciding whether this is even worth pursuing",
      ],
      nextSteps: [
        "Write the problem in one sentence, without your solution",
        "Ask who feels this problem besides your lab",
        "Find the cheapest test that would make the need more concrete",
      ],
      leadsTo: ["s1"],
    },
  },
  {
    id: "s1",
    type: "state",
    region: "discover",
    title: "Concept / discovery",
    shortDescription: "A hypothesis, target, algorithm, or new use exists.",
    position: { x: 280, y: 420 },
    tags: ["idea", "discovery", "concept", "target"],
    resourceIds: ["neurotech-hub", "icts", "hope-center"],
    details: {
      whyItMatters:
        "A named approach lets you design a first decisive test — and decide whether this is a research direction, a tool, or something that could travel further.",
      youMayBeHereIf: [
        "You have a mechanism, design, algorithm, or new use in mind",
        "You have early data but not a convincing test of the core idea",
        "You are framing a grant aim or a trainee project around it",
      ],
      nextSteps: [
        "State the cheapest convincing test of the core principle",
        "Separate what would strengthen the science from what would transfer",
        "Talk with a technical or translational colleague before scaling the experiment",
      ],
      leadsTo: ["s2", "dest-funding", "dest-research"],
    },
  },
  {
    id: "s2",
    type: "state",
    region: "develop",
    title: "Initial proof of principle",
    shortDescription: "A first experiment or benchtop prototype suggests feasibility.",
    position: { x: 590, y: 420 },
    tags: ["evidence", "prototype", "proof", "feasibility"],
    resourceIds: ["neurotech-hub", "icts", "hope-center"],
    details: {
      whyItMatters:
        "First feasibility is exciting and easy to over-read. The useful next question is whether someone else could evaluate it.",
      youMayBeHereIf: [
        "One experiment, simulation, or prototype worked once",
        "Conditions are still narrow or inventor-dependent",
        "You are deciding what to reproduce next",
      ],
      nextSteps: [
        "Define the conditions under which it should work again",
        "Capture a protocol someone outside the originating pair of hands could follow",
        "Ask whether this is a research finding, a tool, or a candidate product",
      ],
      leadsTo: ["s3"],
    },
  },
  {
    id: "s3",
    type: "state",
    region: "develop",
    title: "Reproducible research asset",
    shortDescription: "It works repeatedly under defined conditions.",
    position: { x: 810, y: 420 },
    tags: ["prototype", "software", "device", "research-tool", "reproducible"],
    resourceIds: ["otm-core", "neurotech-hub", "dep"],
    details: {
      whyItMatters:
        "A repeatable asset is the first point where transfer, distribution, or deeper de-risking become real options — not obligations.",
      youMayBeHereIf: [
        "A method, device, software, compound, or assay works more than once",
        "You can describe performance under defined conditions",
        "Someone in another lab could, in principle, try it",
      ],
      nextSteps: [
        "Ask who outside your lab would care, and what they would need to see",
        "Decide whether to preserve transfer options before you publish or present",
        "Choose the next experiment for an outsider, not only for the next paper",
      ],
      leadsTo: ["s4", "s5", "ms-validate-need", "ms-preserve-ip", "dest-research", "dest-distribution"],
    },
  },
  {
    id: "s4",
    type: "state",
    region: "de-risk",
    title: "Externally relevant opportunity",
    shortDescription: "Someone outside the lab can say why this matters.",
    position: { x: 1100, y: 240 },
    tags: ["need", "users", "clinical", "industry", "feedback"],
    resourceIds: ["dep", "xir", "skandalaris-vd", "icts"],
    details: {
      whyItMatters:
        "External relevance is not a market analysis. It is evidence that a clinician, company, or independent user can articulate the need in their own words.",
      youMayBeHereIf: [
        "A user, clinician, or external expert has reacted to the work",
        "You can name who would use this and what decision it would change",
        "You suspect scientific success and external usefulness are not the same",
      ],
      nextSteps: [
        "Write down what an outsider would need before saying yes",
        "Use structured feedback (DEP, XiR, or a translational forum) rather than informal enthusiasm",
        "Decide whether the next milestone is scientific, regulatory, or transfer-related",
      ],
      leadsTo: ["s5", "s6"],
    },
  },
  {
    id: "s5",
    type: "state",
    region: "de-risk",
    title: "A transfer plan with OTM",
    shortDescription: "OTM has helped you understand protection and transfer options.",
    position: { x: 1100, y: 600 },
    tags: ["ip", "patent", "disclosure", "license", "otm"],
    resourceIds: ["otm-core", "otm-inventor-companion"],
    details: {
      whyItMatters:
        "A patent is a vehicle. The useful outcome here is a strategy: protect, license, distribute, partner, open-release — or combine them.",
      youMayBeHereIf: [
        "You have disclosed, or you are preparing to talk with OTM",
        "You want to preserve options before a talk, poster, or paper",
        "You are unsure whether IP is even relevant to this asset",
      ],
      nextSteps: [
        "Contact OTM with what you have — a finished company plan is not required",
        "Ask what would be lost by publishing now versus waiting briefly",
        "Treat open distribution and licensing as deliberate choices, not defaults",
      ],
      leadsTo: ["s6", "dest-distribution"],
    },
  },
  {
    id: "s6",
    type: "state",
    region: "de-risk",
    title: "Translational plan defined",
    shortDescription: "You know the specific risks that still block an outsider from saying yes.",
    position: { x: 1400, y: 420 },
    tags: ["plan", "milestones", "regulatory", "de-risk"],
    resourceIds: ["dep", "icts", "needleman-npic", "gap-fund"],
    details: {
      whyItMatters:
        "A plan turns vague “translation” into two or three uncertainties: performance, need, safety, manufacturability, or path to users.",
      youMayBeHereIf: [
        "You can list the three uncertainties that would stop an external party",
        "You know whether this is a drug, device, tool, or software path",
        "The next experiment can be tied to a transfer or clinical decision",
      ],
      nextSteps: [
        "Fund only the milestone that removes the largest transfer risk",
        "Route therapeutics differently from devices and research tools",
        "Use a translational forum or domain experts to pressure-test the plan",
      ],
      leadsTo: ["s7", "dest-funding"],
    },
  },
  {
    id: "s7",
    type: "state",
    region: "de-risk",
    title: "De-risked translational asset",
    shortDescription: "A critical external-facing milestone has evidence beyond the originating lab.",
    position: { x: 1640, y: 420 },
    tags: ["validated", "de-risked", "translational"],
    resourceIds: ["gap-fund", "needleman-npic", "otm-core"],
    details: {
      whyItMatters:
        "This is often the first time licensing, partnership, or company formation become realistic — and also the moment many investigators can stop, having already gained data, grants, or collaborators.",
      youMayBeHereIf: [
        "Independent or external-facing evidence exists for a key risk",
        "A potential partner could diligence a concise package",
        "You are choosing among license, partner, distribute, or found",
      ],
      nextSteps: [
        "Build a short package: problem, evidence, remaining risks, intended use",
        "Ask whether a new company is necessary, or whether an existing organization can take it",
        "Do not treat incorporation as the proof that the work mattered",
      ],
      leadsTo: ["s8", "ms-license-vs-startup", "dest-clinical", "dest-licensing", "dest-startup"],
    },
  },
  {
    id: "s8",
    type: "state",
    region: "translate",
    title: "Vehicle ready",
    shortDescription: "A license, partnership, distribution path, or company is actionable.",
    position: { x: 1910, y: 420 },
    tags: ["license", "startup", "partner", "vehicle"],
    resourceIds: ["otm-eir", "skandalaris-vd", "biogenerator", "otm-core"],
    details: {
      whyItMatters:
        "The vehicle is how the work reaches users. Licensing, industry partnership, academic distribution, and a startup are alternatives — not a ladder.",
      youMayBeHereIf: [
        "A licensee, partner, manufacturer, or founding team is in view",
        "University IP and transfer terms are being discussed in concrete terms",
        "Someone other than the originating PI may run day-to-day development",
      ],
      nextSteps: [
        "Match capital and help to the vehicle you actually chose",
        "If founding, identify who will operate the company",
        "If licensing, ask OTM what a capable licensee still needs",
      ],
      leadsTo: ["s9", "dest-licensing", "dest-startup"],
    },
  },
  {
    id: "s9",
    type: "state",
    region: "impact",
    title: "Adoption / impact",
    shortDescription: "External users, labs, patients, or licensees receive sustained value.",
    position: { x: 2300, y: 420 },
    tags: ["impact", "adoption", "clinical", "users"],
    resourceIds: ["biogenerator", "nih-ninds-sbir"],
    details: {
      whyItMatters:
        "Impact is the destination. Patents issued and companies formed are only interesting if someone actually uses the work.",
      youMayBeHereIf: [
        "Other labs, clinicians, or customers are using it",
        "A licensee or partner is deploying it",
        "You can point to papers, grants, patients, or products that followed",
      ],
      nextSteps: [
        "Measure use, not only disclosure or incorporation",
        "Support documentation, quality, and distribution if you are still the source",
        "Capture academic returns: methods papers, trainees, follow-on grants",
      ],
      leadsTo: ["dest-clinical", "dest-distribution"],
    },
  },
  {
    id: "ms-validate-need",
    type: "milestone",
    region: "de-risk",
    title: "Validate who needs this",
    shortDescription: "Ask who outside your lab cares — in their words.",
    position: { x: 1100, y: 90 },
    tags: ["need", "users", "feedback"],
    resourceIds: ["dep", "xir", "skandalaris-vd"],
    details: {
      whyItMatters:
        "Scientific elegance and external need diverge more often than investigators expect. A short, structured conversation can save a year of the wrong experiment.",
      youMayBeHereIf: [
        "The asset works in your hands",
        "You cannot yet name a user and a decision they would change",
        "You want industry or clinical feedback without starting a company",
      ],
      nextSteps: [
        "Request Domain Expert or XiR input through OTM",
        "Talk with one independent lab or clinician before optimizing further",
        "Write the need in the user’s language, not the paper’s",
      ],
      leadsTo: ["s4"],
    },
  },
  {
    id: "ms-preserve-ip",
    type: "milestone",
    region: "de-risk",
    title: "Preserve transfer options",
    shortDescription: "Understand what publishing or presenting would change.",
    position: { x: 1100, y: 780 },
    tags: ["ip", "patent", "disclosure", "otm"],
    resourceIds: ["otm-core", "otm-inventor-companion"],
    details: {
      whyItMatters:
        "OTM evaluates WashU inventions and, when warranted, files patents. A conversation keeps options open and does not require you to found a company.",
      youMayBeHereIf: [
        "A manuscript, talk, poster, or demo is approaching",
        "You suspect this could be useful outside the lab",
        "You want to know whether disclosure is even relevant",
      ],
      nextSteps: [
        "Email OTM a short description of what you have",
        "Ask what, if anything, should happen before you present",
        "You do not need a company, a pitch deck, or certainty",
      ],
      leadsTo: ["s5"],
    },
  },
  {
    id: "ms-license-vs-startup",
    type: "milestone",
    region: "translate",
    title: "License or found?",
    shortDescription: "A new company is optional. Ask why you would need one.",
    position: { x: 1910, y: 640 },
    tags: ["license", "startup", "vehicle"],
    resourceIds: ["otm-core", "otm-eir"],
    details: {
      whyItMatters:
        "Startups make sense when no existing organization can develop, manufacture, regulate, or distribute the work. They are a costly vehicle, not a badge of seriousness.",
      youMayBeHereIf: [
        "The asset is de-risked enough that someone could take it forward",
        "You are being asked — or asking yourself — whether to incorporate",
        "You want impact without becoming an operator",
      ],
      nextSteps: [
        "List organizations that already have the missing capabilities",
        "If a company is truly needed, identify who will run it",
        "Ask OTM about licensing and, only if relevant, New Ventures / EIR",
      ],
      leadsTo: ["s8", "dest-licensing", "dest-startup"],
    },
  },
  {
    id: "dest-research",
    type: "destination",
    region: "impact",
    title: "Research impact",
    shortDescription: "Strengthen science — yours and others’.",
    position: { x: 2480, y: 70 },
    tags: ["research", "publications", "science", "papers"],
    resourceIds: ["neurotech-hub", "hope-center", "icts"],
    details: {
      whyItMatters:
        "For many investigators this is the real destination: methods, datasets, collaborations, and follow-on science — not a product.",
      youMayBeHereIf: [
        "Success looks like papers, citations, or enabled experiments",
        "You want other laboratories to extend the work",
        "Company formation would be a distraction",
      ],
      nextSteps: [
        "Define impact in academic terms: users, replications, grants, trainees",
        "Make documentation and reproducibility part of the scientific deliverable",
        "Treat distribution as a research problem, not a default startup",
      ],
      leadsTo: [],
    },
  },
  {
    id: "dest-funding",
    type: "destination",
    region: "impact",
    title: "Funding",
    shortDescription: "Resources to continue the research or development.",
    position: { x: 2480, y: 190 },
    tags: ["funding", "grants", "personnel"],
    resourceIds: ["icts", "hope-center", "gap-fund", "needleman-npic"],
    details: {
      whyItMatters:
        "Funding is often the immediate objective. The useful question is what evidence the money will buy — not which pot is largest.",
      youMayBeHereIf: [
        "You need personnel, preliminary data, or a specific milestone paid for",
        "Conventional grants do not cover the next experiment",
        "You are matching a milestone to a mechanism",
      ],
      nextSteps: [
        "Name the milestone, cost, duration, and downstream decision",
        "If it advances science: ICTS, Hope, NIH",
        "If it de-risks a non-drug WashU technology: Gap Fund; if a therapeutic: Needleman",
      ],
      leadsTo: [],
    },
  },
  {
    id: "dest-distribution",
    type: "destination",
    region: "impact",
    title: "Distribution / adoption",
    shortDescription: "Other researchers or users actually get and use it.",
    position: { x: 2480, y: 310 },
    tags: ["distribution", "software", "research-tool", "adoption"],
    resourceIds: ["otm-core", "neurotech-hub"],
    details: {
      whyItMatters:
        "A tool that only the originating lab can run has not yet traveled. Adoption can be academic, licensed, or manufactured — a startup is only one option.",
      youMayBeHereIf: [
        "You want other labs or users to obtain a working asset",
        "Support, hosting, or fabrication is becoming a burden",
        "You are choosing among open release, a manufacturer, or a license",
      ],
      nextSteps: [
        "Test with an independent user before optimizing for scale",
        "Decide who will handle documentation, updates, and quality",
        "Engage OTM if university IP or licensing obligations may apply",
      ],
      leadsTo: [],
    },
  },
  {
    id: "dest-clinical",
    type: "destination",
    region: "impact",
    title: "Clinical use",
    shortDescription: "Eventually used in patient care.",
    position: { x: 2480, y: 520 },
    tags: ["clinical", "patients", "therapeutic", "device"],
    resourceIds: ["needleman-npic", "icts", "nih-ninds-sbir"],
    details: {
      whyItMatters:
        "Patient impact is a destination. Plan backward through evidence, regulatory, and who will sponsor, manufacture, and support the intervention.",
      youMayBeHereIf: [
        "Success means changing a clinical decision or intervention",
        "You can name the patient or user and the unmet need",
        "You are choosing among academic trials, a partner, or a company",
      ],
      nextSteps: [
        "Separate therapeutic routing from device or diagnostic routing",
        "Make the next experiment correspond to a downstream uncertainty",
        "Decide who ultimately manufactures, regulates, and deploys — it may not be you",
      ],
      leadsTo: [],
    },
  },
  {
    id: "dest-licensing",
    type: "destination",
    region: "impact",
    title: "Licensing",
    shortDescription: "Another organization develops and deploys it.",
    position: { x: 2480, y: 640 },
    tags: ["license", "industry", "partner"],
    resourceIds: ["otm-core", "dep", "gap-fund"],
    details: {
      whyItMatters:
        "Licensing is how many academic inventions reach users without the inventor becoming a founder. An existing company may already have manufacturing, sales, and regulatory capacity.",
      youMayBeHereIf: [
        "You want the work used without running a company",
        "Potential licensees already exist in the space",
        "You can imagine a diligence package more easily than a founding team",
      ],
      nextSteps: [
        "Ask what data those organizations would need before diligence",
        "Fund only the de-risking that improves transferability",
        "Work with OTM; do not form a startup solely because an invention exists",
      ],
      leadsTo: [],
    },
  },
  {
    id: "dest-startup",
    type: "destination",
    region: "impact",
    title: "Build a company",
    shortDescription: "A new company is the vehicle — not the goal itself.",
    position: { x: 2480, y: 760 },
    tags: ["startup", "venture", "company"],
    resourceIds: ["otm-eir", "skandalaris-vd", "biogenerator", "nih-ninds-sbir"],
    details: {
      whyItMatters:
        "A company can be the right vehicle when no existing organization will develop the work. Faculty need not be the CEO. Equity is uncertain; time cost is not.",
      youMayBeHereIf: [
        "You can explain why a new company is necessary",
        "Someone is prepared to operate it day to day",
        "University IP and a license path are part of the plan",
      ],
      nextSteps: [
        "Validate a customer before optimizing a pitch",
        "Clarify the WashU license route with OTM New Ventures",
        "Match capital to stage — and skip competitions that exclude university IP",
      ],
      leadsTo: [],
    },
  },
];

export const nodeById = Object.fromEntries(nodes.map((node) => [node.id, node]));
