import type { DestinationPlan } from "../types/navigator";

export const destinationPlans: DestinationPlan[] = [
  {
    destinationId: "dest-research",
    oneLiner: "Papers, methods, collaborators, and follow-on science.",
    academicReturns: [
      "methods or datasets",
      "collaborations",
      "follow-on grants",
      "enabled experiments",
    ],
    facultyCommitment: "Stays inside research time if you keep distribution light.",
    companyRequired: false,
    defaultRouteId: "strengthen-research",
    checklist: [
      {
        title: "Define impact in academic terms",
        why: "Success here is users, replications, collaborations, or enabled experiments — not a product.",
        evidenceRequired:
          "A measurable academic outcome: users, citations, datasets, or a follow-on grant aim.",
        academicReturn: "A clearer next paper, method, or grant story.",
        resourceId: "hope-center",
        notNeeded: "A company, a patent, or a commercialization plan.",
      },
      {
        title: "Make it usable outside your hands",
        why: "A method only you can run has not yet traveled.",
        evidenceRequired:
          "Documentation or a protocol an independent lab could follow.",
        academicReturn: "Replications, citations, and trainee-ready methods.",
        resourceId: "neurotech-hub",
        notNeeded: "A startup to share a research tool.",
      },
      {
        title: "Choose how others should get it",
        why: "Open release, an OTM license, or a manufacturer are deliberate choices.",
        evidenceRequired: "A transfer decision that matches how you want the work used.",
        academicReturn: "Reach without becoming the support desk.",
        resourceId: "otm-core",
        notNeeded: "Incorporation as proof the science mattered.",
      },
    ],
  },
  {
    destinationId: "dest-funding",
    oneLiner: "Money that buys a specific next experiment or person.",
    academicReturns: [
      "preliminary data",
      "personnel support",
      "stronger grant aims",
    ],
    facultyCommitment: "Proposal time now; the return is lab capacity.",
    companyRequired: false,
    defaultRouteId: "strengthen-research",
    checklist: [
      {
        title: "Name the evidence the money will buy",
        why: "Do not start with “where can I get money?” Start with the milestone.",
        evidenceRequired:
          "Milestone, cost, duration, and the decision the data will enable.",
        academicReturn: "A fundable aim instead of an unfocused ask.",
        resourceId: "icts",
        notNeeded: "A company or a licensing objective.",
      },
      {
        title: "Match the mechanism to the milestone",
        why: "Science, non-drug de-risking, therapeutics, and companies use different pots.",
        evidenceRequired: "A category: science, transfer, therapeutic, or company R&D.",
        academicReturn: "Less time spent on the wrong call.",
        resourceId: "icts",
        notNeeded: "SBIR/STTR while this is still an academic lab project.",
        trap: "An academic laboratory acting alone is not an SBIR/STTR applicant.",
      },
      {
        title: "Treat the award as an intermediate success",
        why: "Funding is a vehicle back to the destination you actually want.",
        evidenceRequired: "A plan for what the award unlocks next.",
        academicReturn: "Data, people, or a de-risked asset — then the next decision.",
        resourceId: "hope-center",
        notNeeded: "A new destination just because a pot exists.",
      },
    ],
  },
  {
    destinationId: "dest-distribution",
    oneLiner: "Other labs or users actually get and use it.",
    academicReturns: [
      "scientific reach",
      "methods papers",
      "collaborators",
    ],
    facultyCommitment:
      "Moderate if the lab must support users; lower if you pick a light transfer path.",
    companyRequired: false,
    defaultRouteId: "research-tool-adoption",
    checklist: [
      {
        title: "Name the user and how they obtain it",
        why: "Adoption is a logistics problem, not a press-release problem.",
        evidenceRequired: "A user, a use case, and a realistic handoff.",
        academicReturn: "Use, not merely disclosure or a website.",
        resourceId: "neurotech-hub",
        notNeeded: "A company as the default distribution vehicle.",
      },
      {
        title: "Test with an independent user",
        why: "Support, hosting, or fabrication often breaks only after someone else tries it.",
        evidenceRequired: "Feedback from at least one lab or user outside the originating pair of hands.",
        academicReturn: "A methods paper and a shorter support burden.",
        resourceId: "dep",
        notNeeded: "Scale before one outsider can run it.",
      },
      {
        title: "Pick the lightest transfer that will hold",
        why: "Open release, a manufacturer, or an OTM license are alternatives.",
        evidenceRequired: "A decision about documentation, updates, quality, and IP obligations.",
        academicReturn: "Reach without you becoming the manufacturer.",
        resourceId: "otm-core",
        notNeeded: "A startup solely because people want the tool.",
      },
    ],
  },
  {
    destinationId: "dest-clinical",
    oneLiner: "Change a clinical decision — planned backward from the patient.",
    academicReturns: [
      "translational evidence",
      "clinical collaborators",
      "patient-impact grants",
    ],
    facultyCommitment:
      "Moderate on a partner or license path; high if you operate the vehicle.",
    companyRequired: false,
    defaultRouteId: "therapeutic",
    checklist: [
      {
        title: "Define the patient and the decision this changes",
        why: "Clinical use is a destination. Plan backward from the unmet need.",
        evidenceRequired: "A named user or patient and the intervention or decision being changed.",
        academicReturn: "A translational question that can become aims, not only a paper.",
        resourceId: "icts",
        notNeeded: "A company before the clinical question is sharp.",
      },
      {
        title: "Separate therapeutic routing from device routing",
        why: "Needleman and VeritaScience are not the Gap Fund; NINDS devices are not an R01.",
        evidenceRequired: "A modality: drug, device/diagnostic, or something else.",
        academicReturn: "The right expertise instead of a generic “translation” card.",
        resourceId: "needleman-npic",
        notNeeded: "A single generic translational-funding application.",
        trap: "Needleman applications are closed as of 2026-09-04 — treat it as a future window.",
      },
      {
        title: "Fund the uncertainty that blocks an outsider",
        why: "The next experiment should correspond to safety, efficacy, usability, or deployment — not another interesting mechanism.",
        evidenceRequired: "The largest remaining uncertainty and who will manufacture, sponsor, and support.",
        academicReturn: "Evidence a partner, licensee, or trialist can use.",
        resourceId: "ninds-devices",
        notNeeded: "You becoming the operator if a partner can take it.",
      },
    ],
  },
  {
    destinationId: "dest-licensing",
    oneLiner: "Another organization develops and deploys it. You stay faculty.",
    academicReturns: [
      "validation data",
      "industry collaborators",
      "possible inventor licensing return",
      "trainee projects",
    ],
    facultyCommitment:
      "Moderate during validation; usually much lower than founding.",
    companyRequired: false,
    defaultRouteId: "device-license",
    checklist: [
      {
        title: "Ask who already has the missing capabilities",
        why: "Licensing is how many academic inventions reach users without a founder-PI.",
        evidenceRequired:
          "Existing companies with manufacturing, regulatory, sales, or distribution capacity.",
        academicReturn: "A path to use without you running operations.",
        resourceId: "otm-core",
        notNeeded: "A startup solely because an invention exists.",
      },
      {
        title: "Learn what a licensee would need to see",
        why: "External diligence is not the same as a stronger paper.",
        evidenceRequired: "A short list of data, IP status, and remaining risks.",
        academicReturn: "A shorter de-risking list and possible Gap Fund or DEP path.",
        resourceId: "dep",
        notNeeded: "A pitch deck or a founding team first.",
      },
      {
        title: "Fund only the work that improves transferability",
        why: "Company formation is optional. Transfer-ready evidence is not.",
        evidenceRequired: "A concise package: problem, evidence, IP/transfer status, intended use.",
        academicReturn: "Validation data, a methods or translational paper, industry collaborators.",
        resourceId: "gap-fund",
        notNeeded: "Founder coaching unless you later decide a company is necessary.",
        trap: "The Gap Fund is for non-drug WashU technologies — therapeutics route to Needleman or VeritaScience.",
      },
    ],
  },
  {
    destinationId: "dest-startup",
    oneLiner: "A company only if no existing organization will take it.",
    academicReturns: [
      "entrepreneurial learning",
      "possible equity — uncertain",
      "a vehicle for deployment",
    ],
    facultyCommitment:
      "High if you operate it; moderate if an external CEO runs it.",
    companyRequired: true,
    defaultRouteId: "startup",
    checklist: [
      {
        title: "Answer why a new company is necessary",
        why: "A startup is a costly vehicle, not a badge of seriousness.",
        evidenceRequired:
          "A reason no licensee, partner, or distributor can develop, manufacture, or deploy it.",
        academicReturn: "A go/no-go before you spend a year founding.",
        resourceId: "otm-eir",
        notNeeded: "You as CEO. Faculty inventor and operator need not be the same person.",
      },
      {
        title: "Clarify the WashU IP and license path",
        why: "EIR and New Ventures assume foundational WashU patent rights for the startup.",
        evidenceRequired: "An OTM conversation and a plausible license route.",
        academicReturn: "A legal path that later capital can actually use.",
        resourceId: "otm-eir",
        notNeeded: "Skandalaris Venture Competition as a faculty-IP fundraising plan.",
        trap: "SVC currently prohibits WashU IP and licenses to university IP.",
      },
      {
        title: "Match capital to company stage — and skip ineligible pots",
        why: "SBIR needs a small business; Arch Grants needs a full-time founder in St. Louis; MTC matches private capital.",
        evidenceRequired: "A company, a milestone, and a fund that can actually write the check.",
        academicReturn: "Non-dilutive or regional capital when the vehicle is real.",
        resourceId: "biogenerator",
        notNeeded: "Academic lab SBIR applications, or competitions that exclude university IP.",
        trap: "Arch Grants 2026 is closed; at least one founder must work on the company full-time and HQ in St. Louis for a year.",
      },
    ],
  },
];

export const destinationPlanById = Object.fromEntries(
  destinationPlans.map((plan) => [plan.destinationId, plan]),
);
