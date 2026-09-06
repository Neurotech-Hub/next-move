import type { DestinationPlan } from "../types/navigator";

// Copy note for the UI:
// - Render `evidenceRequired` as "What you need next".
// - Render `academicReturn` as "What this can unlock".
// - Render `facultyCommitment` as "Your likely involvement".
//
// `resourceId` is a suggested fallback resource for the step. The integration
// layer should replace it with a more relevant resource when the user's
// invention type, current state, or eligibility points elsewhere.

export const destinationPlans: DestinationPlan[] = [
  {
    destinationId: "dest-research",
    oneLiner:
      "Use the work to enable better science, methods, collaborations, and follow-on funding.",
    academicReturns: [
      "new methods or datasets",
      "collaborations",
      "follow-on funding",
      "new experiments",
    ],
    facultyCommitment:
      "Usually stays close to normal research activity unless you take on ongoing distribution or support.",
    companyRequired: false,
    defaultRouteId: "strengthen-research",
    checklist: [
      {
        title: "Decide what success looks like in your research",
        why:
          "Success might mean another lab uses it, a new experiment becomes possible, a collaboration starts, or it supports a paper or grant.",
        evidenceRequired:
          "One concrete outcome you want the work to enable, such as outside use, a new dataset, a collaboration, or a grant aim.",
        academicReturn:
          "A clearer reason to keep investing research time in the work.",
        resourceId: "hope-center",
        notNeeded: "need a company, patent, or commercialization plan first.",
      },
      {
        title: "Make it usable by someone else",
        why:
          "If only your team can run it, its scientific reach will stay limited.",
        evidenceRequired:
          "Documentation, a protocol, software instructions, or another handoff that an independent lab could follow.",
        academicReturn:
          "More reproducible use, easier collaboration, and less one-off support.",
        resourceId: "neurotech-hub",
        notNeeded: "need a startup to share a research tool or method.",
      },
      {
        title: "Choose how others should access it",
        why:
          "Direct sharing, open release, licensing, and outside manufacturing create different support and IP obligations.",
        evidenceRequired:
          "A practical access plan that matches how widely you want the work used and how much support your lab can provide.",
        academicReturn:
          "Broader use without automatically turning your lab into the long-term distributor or support team.",
        resourceId: "otm-core",
        notNeeded: "treat forming a company as proof that the science matters.",
      },
    ],
  },
  {
    destinationId: "dest-funding",
    oneLiner:
      "Find funding for a specific experiment, capability, or person.",
    academicReturns: [
      "preliminary data",
      "personnel support",
      "stronger grant aims",
      "new research capability",
    ],
    facultyCommitment:
      "Requires proposal effort now in exchange for added research capacity if funded.",
    companyRequired: false,
    defaultRouteId: "strengthen-research",
    checklist: [
      {
        title: "Define what the funding should accomplish",
        why:
          "Start with the next milestone, not with a list of funding programs.",
        evidenceRequired:
          "A specific milestone, approximate cost and duration, and the decision or capability the work will enable.",
        academicReturn:
          "A clearer and more fundable request tied to a real research need.",
        resourceId: "icts",
        notNeeded: "need a company or licensing objective first.",
      },
      {
        title: "Match the funding source to the work",
        why:
          "Basic research, technology development, therapeutic development, and small-business R&D use different funding mechanisms.",
        evidenceRequired:
          "A clear description of the work being funded and whether it belongs in an academic project, a translational program, or a small business.",
        academicReturn:
          "Less time spent pursuing programs that do not fit the work.",
        resourceId: "icts",
        notNeeded: "apply for SBIR/STTR while the project exists only as an academic lab effort.",
        trap:
          "NIH SBIR/STTR applications must come from an eligible U.S. small business; universities may participate as research partners.",
      },
      {
        title: "Decide what the award should unlock",
        why:
          "The most useful funding produces a defined capability, dataset, person, or decision.",
        evidenceRequired:
          "A simple plan for what you will be able to do or decide after the funded work is complete.",
        academicReturn:
          "New data, people, or capability that moves the research forward.",
        resourceId: "hope-center",
        notNeeded: "change your larger goal simply because a funding program is available.",
      },
    ],
  },
  {
    destinationId: "dest-distribution",
    oneLiner:
      "Get the tool, method, or software into other users' hands.",
    academicReturns: [
      "scientific reach",
      "possible methods publications",
      "collaborators",
      "external users",
    ],
    facultyCommitment:
      "Depends on how much fabrication, hosting, documentation, and user support your lab keeps.",
    companyRequired: false,
    defaultRouteId: "research-tool-adoption",
    checklist: [
      {
        title: "Define the user and how they will get it",
        why:
          "Adoption depends on a practical way to obtain, use, and support the work.",
        evidenceRequired:
          "A specific user, use case, and realistic way for that user to receive and use it.",
        academicReturn:
          "A clearer path from a lab result to real outside use.",
        resourceId: "neurotech-hub",
        notNeeded: "default to a company as the distribution route.",
      },
      {
        title: "Test it with someone outside your team",
        why:
          "Documentation, setup, hosting, fabrication, and support problems often appear only when someone else tries it.",
        evidenceRequired:
          "Feedback from at least one lab or user outside the originating team.",
        academicReturn:
          "A more reproducible tool and a clearer picture of the support users actually need.",
        resourceId: "neurotech-hub",
        notNeeded: "scale distribution before an independent user can make it work.",
      },
      {
        title: "Choose the simplest distribution model that works",
        why:
          "Direct sharing, open release, licensing, and outside manufacturing each create different maintenance and IP obligations.",
        evidenceRequired:
          "A decision about who will provide documentation, updates, quality control, fabrication, hosting, and support.",
        academicReturn:
          "Broader reach without automatically making your lab the permanent manufacturer or support desk.",
        resourceId: "otm-core",
        notNeeded: "form a startup solely because other people want the tool.",
      },
    ],
  },
  {
    destinationId: "dest-clinical",
    oneLiner:
      "Build the evidence and partnerships needed for clinical use.",
    academicReturns: [
      "clinical or translational evidence",
      "clinical collaborators",
      "translational grant opportunities",
      "a clearer path to patient impact",
    ],
    facultyCommitment:
      "Depends on the path: lower when an experienced partner takes on development, higher when your team leads it.",
    companyRequired: false,
    defaultRouteId: "therapeutic",
    checklist: [
      {
        title: "Define the intended clinical use",
        why:
          "Start with who benefits, what changes in care, and why the current approach is insufficient.",
        evidenceRequired:
          "A specific patient or clinical user, the intended use, and the decision, intervention, or outcome you want to change.",
        academicReturn:
          "A sharper clinical question that can guide studies, collaborations, and grant aims.",
        resourceId: "icts",
        notNeeded: "form a company before the clinical need is clear.",
      },
      {
        title: "Identify the development path that applies",
        why:
          "Drugs, devices, diagnostics, software, and other clinical innovations require different evidence, expertise, and funding.",
        evidenceRequired:
          "A clear description of what the intervention is and how it would be used clinically.",
        academicReturn:
          "A better match to the people, programs, and studies that can help next.",
        resourceId: "needleman-npic",
        notNeeded: "assume one generic translational program fits every clinical innovation.",
        trap:
          "Needleman is specific to therapeutic development and should only be shown when that modality fits; verify current application status before presenting it as open.",
      },
      {
        title: "Identify the next uncertainty blocking clinical use",
        why:
          "The next study should address the issue most likely to stop further development, such as safety, efficacy or performance, usability, manufacturing, or deployment.",
        evidenceRequired:
          "The most important unresolved question and the evidence needed for a clinical collaborator, sponsor, partner, or regulator to continue.",
        academicReturn:
          "Evidence that can support the next study, partnership, funding decision, or development step.",
        resourceId: "ninds-devices",
        notNeeded: "personally lead every downstream development activity if an experienced partner can take it on.",
        trap:
          "NINDS device programs apply only to eligible nervous-system or neuromuscular device projects; select a different resource when the modality or disease area does not fit.",
      },
    ],
  },
  {
    destinationId: "dest-licensing",
    oneLiner:
      "Use licensing as a vehicle so another organization can take the work forward while you stay focused on research.",
    academicReturns: [
      "validation data",
      "industry collaborators",
      "possible inventor licensing income",
      "new research or trainee projects",
    ],
    facultyCommitment:
      "Usually requires meaningful involvement during evaluation and validation, but less operational responsibility than founding a company.",
    companyRequired: false,
    defaultRouteId: "device-license",
    checklist: [
      {
        title: "Identify organizations with the missing capabilities",
        why:
          "An established organization may already have the manufacturing, regulatory, sales, distribution, or support capabilities the invention needs.",
        evidenceRequired:
          "A short list of plausible organizations and the capabilities each could contribute.",
        academicReturn:
          "A possible path to real-world use without you running the downstream operation.",
        resourceId: "otm-core",
        notNeeded: "form a startup solely because an invention exists.",
      },
      {
        title: "Ask what a potential licensee would need to see",
        why:
          "The evidence that interests a company may differ from what strengthens the next paper.",
        evidenceRequired:
          "A short list of the data, IP status, technical questions, and remaining risks a potential partner would evaluate.",
        academicReturn:
          "A more focused development plan and fewer unnecessary experiments.",
        resourceId: "dep",
        notNeeded: "need a pitch deck or founding team before exploring licensing.",
      },
      {
        title: "Generate the evidence that most improves partner interest",
        why:
          "Focus development effort on the questions that materially affect whether another organization can take the invention forward.",
        evidenceRequired:
          "A defined experiment or development milestone tied to a specific partner concern or adoption barrier.",
        academicReturn:
          "Useful validation data that may also support publications, grants, or industry collaboration.",
        resourceId: "gap-fund",
        notNeeded: "seek founder coaching unless you later decide a startup is the better path.",
        trap:
          "WashU Gap Fund applies to eligible non-drug technologies and has program-specific disclosure, assignment, feasibility, and IP requirements; verify current eligibility before recommending it.",
      },
    ],
  },
  {
    destinationId: "dest-startup",
    oneLiner:
      "Use a new company as the vehicle when that is the best way to develop and deliver the invention — adoption remains the outcome.",
    academicReturns: [
      "entrepreneurial experience",
      "possible equity — uncertain",
      "a path to develop and deliver the invention",
      "new external collaborators",
    ],
    facultyCommitment:
      "Usually high if you lead the company; potentially lower if an experienced external operator leads it.",
    companyRequired: true,
    defaultRouteId: "startup",
    checklist: [
      {
        title: "Explain why a new company is the right path",
        why:
          "Founding adds time, responsibility, and financing needs, so compare it with licensing or partnering first.",
        evidenceRequired:
          "A clear reason a new company is better suited than an existing organization to develop and deliver the invention.",
        academicReturn:
          "A go/no-go decision before you commit substantial time to company formation.",
        resourceId: "otm-eir",
        notNeeded: "be the CEO yourself; the faculty inventor and company operator can be different people.",
      },
      {
        title: "Clarify the WashU IP and licensing path",
        why:
          "If the company will depend on WashU IP, the ownership and license path need to be clear before serious financing or company-building work.",
        evidenceRequired:
          "An OTM conversation about disclosure, ownership, and the likely licensing path for the relevant WashU IP.",
        academicReturn:
          "A clearer foundation for deciding whether the startup can move forward.",
        resourceId: "otm-core",
        notNeeded: "treat the Skandalaris Venture Competition as a default funding route for a WashU-IP faculty startup.",
        trap:
          "Current Skandalaris Venture Competition rules exclude WashU IP and licenses to university IP; verify the current cycle before showing it as eligible.",
      },
      {
        title: "Match funding to the company's stage and eligibility",
        why:
          "Startup programs differ in company structure, founder commitment, location, matching capital, and project-stage requirements.",
        evidenceRequired:
          "A defined company milestone plus a funding program whose eligibility and terms actually match the team.",
        academicReturn:
          "A more realistic financing plan and less time spent on programs the company cannot use.",
        resourceId: "biogenerator",
        notNeeded: "apply to company-only programs before the team meets their eligibility requirements.",
        trap:
          "Check current eligibility and deadlines for every startup program; requirements and open cycles change frequently.",
      },
    ],
  },
];

export const destinationPlanById = Object.fromEntries(
  destinationPlans.map((plan) => [plan.destinationId, plan]),
);
