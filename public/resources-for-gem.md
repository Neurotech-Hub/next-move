# NextMove resource catalog (for Gemini Gem)

Source: next-move
Version: 0.2.0
Program count: 41
Last generated for Gem upload. Prefer this file (or resources-for-gem.pdf) over resources.json for conversational grounding.

## How the Gem should use this catalog

1. Treat each PROGRAM block as one distinct resource. Do not merge programs.
2. Before recommending a program, check NOT FOR, ELIGIBILITY, COMPANY REQUIRED, MODALITY LOCK, and CONTEXT GATE.
3. Patents, licenses, and startups are vehicles — not destinations. Prefer academic returns when the investigator wants research impact, funding, trainees, or distribution without founding.
4. If COMPANY REQUIRED is no, do not imply the investigator must start a company.
5. If a CONTEXT GATE is listed, only recommend that program when the user's situation matches (for example emergency care, cancer, digital health).
6. If a MODALITY LOCK is listed, only recommend when the invention type matches (for example therapeutics-only or devices-only).
7. When unsure, ask a clarifying question rather than guessing eligibility.
8. Cite the OFFICIAL URL when pointing the investigator to a next step.

## Global gating rules

### Modality locks (recommend only for these invention types)
- Needleman Program (NPIC) (needleman-npic): therapeutic
- VeritaScience — WashU + Deerfield (veritascience): therapeutic
- Bristol Myers Squibb–WashU neuroscience collaboration (bms-neuro): therapeutic
- Center for Drug Discovery (CDD) (center-drug-discovery): therapeutic
- NINDS Translational Devices + Small Business Program (ninds-devices): device

### Context gates (recommend only when context matches)
- Emergency Care Research Core (ECRC) (ecrc): emergency-care
- Siteman Investment Program Research Development Awards (SIP RDA) (siteman-sip-rda): cancer
- Trial-CARE (trial-care): multicenter-trial
- mHealth Research Core (mHRC) (mhealth-research-core): digital-health, mhealth
- Joint Research Office for Contracts (JROC) (jroc): industry-collaboration, industry-sponsored-research

### Context expand aliases
- digital-health → digital-health, mhealth, clinical-workflow
- clinical-workflow → clinical-workflow, digital-health
- industry-collaboration → industry-collaboration, industry-sponsored-research, research-contracts, collaboration-agreements
- multicenter-trial → multicenter-trial
- cancer → cancer
- emergency-care → emergency-care
- mhealth → mhealth, digital-health

## Program index

1. AI companion for new inventions — id `otm-inventor-companion`
2. Arch Grants Startup Competition — id `arch-grants`
3. BioGenerator Startup Connect — id `biogenerator-connect`
4. BioGenerator Ventures — id `biogenerator`
5. Bristol Myers Squibb–WashU neuroscience collaboration — id `bms-neuro`
6. Center for Clinical Studies (CCS) — id `center-clinical-studies`
7. Center for Drug Discovery (CDD) — id `center-drug-discovery`
8. Cortex SQ1 Ignite / Bootcamp — id `cortex-ignite`
9. Cultivation Capital — Life Sciences & Health Tech — id `cultivation-capital`
10. Domain Expert Program (DEP) — id `dep`
11. Emergency Care Research Core (ECRC) — id `ecrc`
12. Hope Center for Neurological Disorders — id `hope-center`
13. I-Corps at NIH — id `nih-icorps`
14. ICTS Regulatory Support Center (RSC) — id `icts-regulatory-support`
15. ICTS Research Forum + CTRFP / Just-In-Time funding — id `icts`
16. Joint Research Office for Contracts (JROC) — id `jroc`
17. mHealth Research Core (mHRC) — id `mhealth-research-core`
18. Missouri SBDC FAST / SBIR-STTR assistance — id `missouri-sbdc`
19. Missouri Technology Corporation IDEA Fund — id `mtc-idea`
20. NCATS Small Business Programs — id `ncats-sbir`
21. Needleman Program (NPIC) — id `needleman-npic`
22. NEURO360 / regional neuroscience innovation network — id `neuro360`
23. Neurotech Hub — id `neurotech-hub`
24. NIA Small Business — Alzheimer’s / ADRD and aging — id `nia-sbir`
25. NIH SBIR/STTR small-business funding — id `nih-ninds-sbir`
26. NINDS Translational Devices + Small Business Program — id `ninds-devices`
27. NSF I-Corps — id `nsf-icorps`
28. Osage University Partners (OUP) — id `oup`
29. OTM — invention disclosure, evaluation, IP and licensing — id `otm-core`
30. OTM Experts-in-Residence (XiR) — id `xir`
31. OTM New Ventures / Entrepreneur-in-Residence — id `otm-eir`
32. OTM Quick Start License — id `quick-start-license`
33. RiverVest Venture Partners — id `rivervest`
34. Siteman Investment Program Research Development Awards (SIP RDA) — id `siteman-sip-rda`
35. Skandalaris In-Residence / IdeaBounce — id `skandalaris-ideabounce`
36. Skandalaris Venture Competition (SVC) — id `skandalaris-svc`
37. Skandalaris Venture Development — id `skandalaris-vd`
38. Trial-CARE — id `trial-care`
39. VeritaScience — WashU + Deerfield — id `veritascience`
40. Washington University Gap Fund — id `gap-fund`
41. WashU Innovation — id `washu-innovation`

---

## PROGRAM: AI companion for new inventions

ID: otm-inventor-companion
ORGANIZATION: Neurotech Hub · Department of Neuroscience, WashU
OFFICIAL URL: https://neurotechhub.wustl.edu/an-ai-companion-for-new-inventions/
CONTACT: otm@wustl.edu · Neurotech Hub
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: ip-licensing
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, software, research-tool
JOURNEY STAGES: s3, s4, s5
PRIORITY: unspecified
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
A short, structured AI interview (about 10 minutes) that produces a companion brief you can attach when filing an invention disclosure in InnovateIP. The preferred agent file includes interview instructions plus a periodically refreshed snapshot of public OTM pages.

WHY AN INVESTIGATOR MIGHT CARE:
Helps you clarify claims, novelty, evidence, and how the invention advances your professional goals before or while you talk with OTM — without replacing InnovateIP or OTM’s assessment.

USEFUL WHEN:
- You are preparing an invention disclosure or exploring whether to disclose
- You want a clearer story for an OTM case manager
- You have a nascent idea and want structured feedback before filing

NOT FOR (do not recommend when):
- treat this as a substitute for filing in InnovateIP
- use a consumer AI chat that may store or train on unpublished inventions
- treat the brief as legal advice, a patent search, or OTM’s formal evaluation

ELIGIBILITY:
Any WashU inventor preparing disclosure context. Use only a WashU-supported AI tool approved for institutional use with confidentiality controls for unpublished inventions.

CAVEATS:
- Alpha tool from the Neurotech Hub — not an official WashU or OTM product; workflows may change.
- Use only an institutionally approved AI tool. Consumer ChatGPT and similar tools can create a public-disclosure risk.
- The official record remains the InnovateIP disclosure; attach the brief as a companion document.

ACADEMIC RETURNS:
- a short companion brief for OTM
- clearer invention story before disclosure
- preliminary landscape and goal-routing context

PROBLEMS SOLVED:
- disclosure
- ip
- transfer
- clarity

SOURCE URLS:
- https://neurotechhub.wustl.edu/an-ai-companion-for-new-inventions/
- https://github.com/Neurotech-Hub/WashU-OTM-Inventor-Companion

---

## PROGRAM: Arch Grants Startup Competition

ID: arch-grants
ORGANIZATION: Arch Grants
OFFICIAL URL: https://archgrants.org/programs/startup-competition/
CONTACT: competition@archgrants.org
LOCATION: st-louis
SCOPE: regional
NEEDS ADDRESSED: funding, startup-support
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, software, research-tool
JOURNEY STAGES: s8, s9
PRIORITY: second
COMPANY REQUIRED: yes
DISCLOSURE TYPICALLY NEEDED: no
STATUS: closed_verify
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
$75,000 equity-free; an additional $25,000 for qualifying relocations; eligibility for follow-on Growth Grants up to $100,000; fundraising and network support.

WHY AN INVESTIGATOR MIGHT CARE:
Non-dilutive startup capital — if the company can actually meet the founder and St. Louis commitments.

USEFUL WHEN:
- A genuine startup can commit to building in St. Louis
- Founders want equity-free company capital

NOT FOR (do not recommend when):
- An academic laboratory project
- A faculty side project without a full-time founder

ELIGIBILITY:
Company headquarters in St. Louis for at least one year; residency and team requirements; at least one founder must currently work on the company as their primary/full-time role. 2026 applications are closed.

CAVEATS:
- 2026 applications are closed. Headquarters and full-time founder requirements are hard gates.

ACADEMIC RETURNS:
- equity-free company capital — if eligible

PROBLEMS SOLVED:
- funding
- startup

FUNDING:
$75,000 equity-free (+ $25,000 relocation; Growth Grants up to $100,000)

SOURCE URLS:
- https://archgrants.org/programs/startup-competition/

---

## PROGRAM: BioGenerator Startup Connect

ID: biogenerator-connect
ORGANIZATION: BioGenerator Ventures
OFFICIAL URL: https://www.biostl.org/events/startup-connect/
CONTACT: aj@biogeneratorventures.com
LOCATION: st-louis
SCOPE: regional
NEEDS ADDRESSED: industry-connections
INVENTION TYPES: therapeutics, devices-diagnostics, research-tools
DOMAINS: therapeutic, device, diagnostic, research-tool
JOURNEY STAGES: s8, s9
PRIORITY: second
COMPANY REQUIRED: yes
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen_program_verify_current_call
NEXT DEADLINE: 2027-09-08 (Startup Connect 2027; invite-only)
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
Invite-only presentations, investor meetings, and networking among human-health and agriculture startups, investors, academics, government, and corporate partners.

WHY AN INVESTIGATOR MIGHT CARE:
Investor exposure without relying only on cold outreach — once a company is real enough to present.

USEFUL WHEN:
- A startup is mature enough to benefit from curated investor meetings

NOT FOR (do not recommend when):
- An early idea-development program
- An academic project with no company

ELIGIBILITY:
Invite-only. Not an early idea-development program.

CAVEATS:
- Startup Connect 2026 has concluded; Startup Connect 2027 is scheduled for September 8–9, 2027 (request an invitation on the event page).

ACADEMIC RETURNS:
- investor meetings
- ecosystem visibility

PROBLEMS SOLVED:
- investors
- networking

SOURCE URLS:
- https://www.biostl.org/events/startup-connect/
- https://www.biostl.org/what-we-do/biogenerator

---

## PROGRAM: BioGenerator Ventures

ID: biogenerator
ORGANIZATION: BioSTL
OFFICIAL URL: https://www.biogeneratorventures.com/
LOCATION: st-louis
SCOPE: regional
NEEDS ADDRESSED: startup-support, funding
INVENTION TYPES: therapeutics, devices-diagnostics, research-tools
DOMAINS: therapeutic, device, diagnostic, research-tool
JOURNEY STAGES: s7, s8, s9
PRIORITY: unspecified
COMPANY REQUIRED: yes
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
Early-stage capital, expert guidance, laboratory space, and hands-on company support in human health and agriculture.

WHY AN INVESTIGATOR MIGHT CARE:
A strong regional bridge from university invention to an investable company and external talent. A first conversation can precede a mature fundraising round.

USEFUL WHEN:
- A bioscience opportunity is becoming a company
- Founders need investment, operators, space, or investor connections

NOT FOR (do not recommend when):
- Academic projects with no company hypothesis
- A general faculty grant program

ELIGIBILITY:
Focus on high-growth science-based companies. Exact investment criteria and terms are deal-specific.

CAVEATS:
- This is company-building support, not an academic pilot grant.

ACADEMIC RETURNS:
- company infrastructure and talent
- early capital
- regional investor network

PROBLEMS SOLVED:
- startup
- capital
- lab-space
- operators

FUNDING:
Early-stage company capital (deal-specific)

SOURCE URLS:
- https://www.biogeneratorventures.com/
- https://www.biostl.org/what-we-do/biogenerator
- https://www.biostl.org/about/

---

## PROGRAM: Bristol Myers Squibb–WashU neuroscience collaboration

ID: bms-neuro
ORGANIZATION: Washington University School of Medicine · BMS
OFFICIAL URL: https://medicine.washu.edu/news/washu-announces-new-academic-industry-collaboration-with-bristol-myers-squibb/
CONTACT: Mark Van Horn · markv@wustl.edu
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: funding, industry-connections
INVENTION TYPES: therapeutics
DOMAINS: therapeutic
JOURNEY STAGES: s4, s6, s7
PRIORITY: second
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: closed_verify
LAST VERIFIED: 2026-10-26
MODALITY LOCK: therapeutic
CONTEXT GATE: none

WHAT YOU GET:
Multiyear collaboration funding up to three translational neuroscience research programs per year and up to three visiting fellows per year, working alongside BMS scientists.

WHY AN INVESTIGATOR MIGHT CARE:
Collaboration, translational expertise, and trainee industry exposure without startup formation. Industry collaboration is itself an academic return.

USEFUL WHEN:
- A neuroscience therapeutic program would benefit from pharmaceutical-development engagement
- A trainee would benefit from a visiting-fellow placement

NOT FOR (do not recommend when):
- Non-neuroscience projects outside the stated priority areas
- A general startup accelerator

ELIGIBILITY:
Priority areas include neurological, neuromuscular, neuroinflammatory, and psychiatric conditions. The first announced EOI deadline was September 1, 2026 and has passed; monitor future rounds.

CAVEATS:
- The first EOI window has passed as of 2026-09-04. Treat this as a future cycle until a new call opens.

ACADEMIC RETURNS:
- industry collaborators
- trainee placements
- drug-development exposure without founding

PROBLEMS SOLVED:
- collaboration
- trainees
- therapeutic-development

FUNDING:
Up to three translational programs and three visiting fellows per year

SOURCE URLS:
- https://medicine.washu.edu/news/washu-announces-new-academic-industry-collaboration-with-bristol-myers-squibb/

---

## PROGRAM: Center for Clinical Studies (CCS)

ID: center-clinical-studies
ORGANIZATION: Washington University in St. Louis
OFFICIAL URL: https://research.washu.edu/offices/center-for-clinical-studies/
CONTACT: ccs@wustl.edu · 314-747-4000
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: build-test, expertise-mentorship
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, software, clinical-workflow
JOURNEY STAGES: s6, s7, s8
PRIORITY: unspecified
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
Administrative and clinical research services spanning the clinical-study lifecycle, from initial proposal through study close-out. CCS is also the institutional home/partner for several specialized clinical-trial support services.

WHY AN INVESTIGATOR MIGHT CARE:
Once the next translational milestone requires a human study, the bottleneck is often execution rather than invention strategy. CCS is a practical door into study operations without requiring a company or license path.

USEFUL WHEN:
- A device, therapeutic, diagnostic, digital intervention, or workflow is moving into human research
- You need help planning or executing the operational side of a clinical study
- You are unsure which specialized clinical-study service should own the next problem

NOT FOR (do not recommend when):
- Patent or licensing strategy
- General laboratory prototype engineering

ELIGIBILITY:
WashU clinical-research resource. Specific services, pricing, and project requirements depend on the study; contact CCS for routing.

CAVEATS:
- This is clinical-research infrastructure, not product-development funding.
- Specialized needs may route onward to Regulatory Support Center, Trial-CARE, recruitment, biostatistics, or other ICTS/CCS services.

ACADEMIC RETURNS:
- a more executable clinical study
- operational support from proposal through close-out
- routing to specialized trial infrastructure

PROBLEMS SOLVED:
- clinical-study-operations
- trial-startup
- study-closeout

SOURCE URLS:
- https://research.washu.edu/offices/center-for-clinical-studies/

---

## PROGRAM: Center for Drug Discovery (CDD)

ID: center-drug-discovery
ORGANIZATION: WashU Medicine · Center for Drug Discovery
OFFICIAL URL: https://cdd.wustl.edu/
CONTACT: Center for Drug Discovery · Ron Dolle / Maxene Ilagan
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: build-test, funding
INVENTION TYPES: therapeutics
DOMAINS: therapeutic
JOURNEY STAGES: s1, s2, s3, s6, s7
PRIORITY: unspecified
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen_program_verify_current_call
LAST VERIFIED: 2026-10-26
MODALITY LOCK: therapeutic
CONTEXT GATE: none

WHAT YOU GET:
An integrated small-molecule drug-discovery path from lead finding through lead optimization and preclinical studies. CDD capabilities include high-throughput and virtual screening, medicinal chemistry, ADME, pharmacokinetics/pharmacodynamics, in vivo pharmacology, and safety-oriented preclinical work. CDD also operates several pilot/matching funding mechanisms.

WHY AN INVESTIGATOR MIGHT CARE:
Fills the gap between a biologically interesting target and a credible therapeutic program. It can generate chemical matter and preclinical evidence before an IND-oriented program is mature enough for resources such as Needleman.

USEFUL WHEN:
- A target or assay needs small-molecule hit finding or screening
- A promising hit needs medicinal chemistry, ADME, PK/PD, or in vivo optimization
- You need preliminary drug-discovery data for follow-on grants, partnering, publication, or IP

NOT FOR (do not recommend when):
- Non-therapeutic devices or software
- A generic wet-lab core unrelated to small-molecule discovery
- Assume every CDD funding program has the same eligibility or deadline

ELIGIBILITY:
CDD services are directed at WashU drug-discovery projects. The CDD Pilot Grant and Match Grant programs state WashU faculty eligibility; the Siteman QuikSTART program additionally requires Assistant Professor-or-above status and Siteman Cancer Center membership. Verify the current funding mechanism before applying.

CAVEATS:
- Funding programs have different eligibility, cost-share, and cycle requirements.
- QuikSTART is specifically for translating cancer disease biology into small-molecule therapeutics and requires Siteman membership.

ACADEMIC RETURNS:
- screening hits and chemical starting points
- medicinal-chemistry and preclinical data
- preliminary data for grants, publications, partnering, and IP

PROBLEMS SOLVED:
- drug-discovery
- high-throughput-screening
- medicinal-chemistry
- preclinical-development
- funding

FUNDING:
CDD Pilot, Match Grant, QuikSTART and other CDD mechanisms; amounts and cycles vary. QuikSTART is $25,000 and cancer/small-molecule specific.

SOURCE URLS:
- https://cdd.wustl.edu/
- https://cdd.wustl.edu/funding/pilot-grant/
- https://cdd.wustl.edu/funding/quikstart-grant/
- https://research.washu.edu/core-facilities/high-throughput-screening-center/

---

## PROGRAM: Cortex SQ1 Ignite / Bootcamp

ID: cortex-ignite
ORGANIZATION: Cortex Innovation Community
OFFICIAL URL: https://www.cortexstl.org/learn/entrepreneur-training/sq1-ignite
CONTACT: info@cortexstl.org
LOCATION: st-louis
SCOPE: regional
NEEDS ADDRESSED: startup-support, expertise-mentorship
INVENTION TYPES: broad
DOMAINS: device, software, research-tool, therapeutic, diagnostic
JOURNEY STAGES: s4, s6, s8
PRIORITY: second
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen_program_verify_current_call
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
Ignite is a four-week concept-stage program using business-model validation, mentors, and ecosystem connections. Bootcamp is a more intensive ten-week / 50-hour program.

WHY AN INVESTIGATOR MIGHT CARE:
A low-cost way to test entrepreneurial assumptions. You do not need an investor-ready company to enter Ignite.

USEFUL WHEN:
- You want structured entrepreneurship or customer-discovery education
- You are testing whether a venture is even sensible

NOT FOR (do not recommend when):
- A substitute for OTM on a WashU invention
- Late-stage company financing

ELIGIBILITY:
Ignite prerequisites are light. Current listed fee is $50 with need-based scholarships. 2027 cohorts: Spring sessions March 1, 8, 15, 22 and Summer sessions June 7, 14, 21, 28; the page says applications open December 15 (rolling applications listed January 1 to May 31).

CAVEATS:
- Education, not capital. Confirm current cohort dates.

ACADEMIC RETURNS:
- customer-discovery practice
- a low-stakes read on founding

PROBLEMS SOLVED:
- venture-exploration
- customer-discovery
- education

SOURCE URLS:
- https://www.cortexstl.org/learn/entrepreneur-training/sq1-ignite

---

## PROGRAM: Cultivation Capital — Life Sciences & Health Tech

ID: cultivation-capital
ORGANIZATION: Cultivation Capital
OFFICIAL URL: https://cultivationcapital.com/strategies/life-sciences-health-technology/
LOCATION: st-louis
SCOPE: investor
NEEDS ADDRESSED: funding
INVENTION TYPES: therapeutics, devices-diagnostics, research-tools
DOMAINS: therapeutic, device, diagnostic, research-tool
JOURNEY STAGES: s8, s9
PRIORITY: second
COMPANY REQUIRED: yes
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
St. Louis-based venture capital. Current site describes initial checks roughly $100,000–$3.5 million and investing from seed through Series B.

WHY AN INVESTIGATOR MIGHT CARE:
Regional capital plus investor perspective — once there is an investable company, not a grant application.

USEFUL WHEN:
- A startup has a credible financing proposition in therapeutics, diagnostics, tools, devices, or health technology

NOT FOR (do not recommend when):
- A faculty grant
- An idea without a company

ELIGIBILITY:
Requires an investable company. No standardized investigator eligibility. Not a grant.

CAVEATS:
- Downstream financing. Not a general investigator service.

ACADEMIC RETURNS:
- regional venture capital — if the company is investable

PROBLEMS SOLVED:
- funding
- startup

FUNDING:
Venture investment; initial checks $250,000–$1,000,000 with follow-on potential (verify)

SOURCE URLS:
- https://cultivationcapital.com/strategies/life-sciences-health-technology/

---

## PROGRAM: Domain Expert Program (DEP)

ID: dep
ORGANIZATION: Office of Technology Management, WashU
OFFICIAL URL: https://otm.wustl.edu/items/domain-expert-program-dep/
CONTACT: Start with OTM · otm@wustl.edu
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: expertise-mentorship, industry-connections
INVENTION TYPES: broad
DOMAINS: device, diagnostic, software, research-tool, therapeutic
JOURNEY STAGES: s3, s4, s5, s6
PRIORITY: unspecified
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: yes
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
Curated sector-specific industry and investor feedback, plus actionable recommendations about commercial potential and de-risking. OTM reports DEP panels have connected projects onward to resources including the Gap Fund.

WHY AN INVESTIGATOR MIGHT CARE:
Can prevent the lab from spending scarce research time on development milestones that outsiders do not value. You do not need to already know the market or have a startup team.

USEFUL WHEN:
- The technology works scientifically, but you do not know what evidence industry would want next
- You want external judgment without founding a company

NOT FOR (do not recommend when):
- use this for general business-plan tutoring (see Skandalaris Venture Development)
- use this for founder coaching (see OTM New Ventures / EIR)

ELIGIBILITY:
OTM-mediated selection and referral. Complete researcher-facing public eligibility criteria are unspecified.

CAVEATS:
- Start with OTM. Access is mediated, not a walk-in clinic.

ACADEMIC RETURNS:
- external validation of need
- a shorter de-risking list
- possible onward path to Gap Fund

PROBLEMS SOLVED:
- external-feedback
- need-validation
- de-risking

SOURCE URLS:
- https://otm.wustl.edu/items/domain-expert-program-dep/

---

## PROGRAM: Emergency Care Research Core (ECRC)

ID: ecrc
ORGANIZATION: Washington University in St. Louis · Department of Emergency Medicine
OFFICIAL URL: https://research.washu.edu/core-facilities/ecrc/
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: build-test, expertise-mentorship
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, clinical-workflow
JOURNEY STAGES: s6, s7
PRIORITY: second
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: only when context includes emergency-care

WHAT YOU GET:
Emergency-care clinical and translational research infrastructure, including feasibility consultation plus recruitment and enrollment support for studies involving acute illness, injury, diagnostics, time-sensitive interventions, and emergency-care workflows.

WHY AN INVESTIGATOR MIGHT CARE:
Emergency-department studies have operational constraints that generic clinical research support may not solve. ECRC is a specialized execution resource when the invention must be evaluated in acute or time-sensitive care.

USEFUL WHEN:
- A device, diagnostic, intervention, or workflow must be studied in emergency care
- Recruitment or enrollment in acute/time-sensitive settings is a major feasibility risk

NOT FOR (do not recommend when):
- Clinical studies with no emergency-care component
- General commercialization strategy

ELIGIBILITY:
Service available to Washington University investigators. Contact the core for pricing and project-specific feasibility.

CAVEATS:
- Highly specialized; show only when emergency-care context is relevant.

ACADEMIC RETURNS:
- emergency-care feasibility
- patient recruitment/enrollment support
- more executable acute-care studies

PROBLEMS SOLVED:
- emergency-care
- clinical-research
- feasibility
- recruitment
- enrollment

SOURCE URLS:
- https://research.washu.edu/core-facilities/ecrc/

---

## PROGRAM: Hope Center for Neurological Disorders

ID: hope-center
ORGANIZATION: Washington University in St. Louis
OFFICIAL URL: https://hopecenter.wustl.edu/funding-awards/pilot-projects/
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: funding, expertise-mentorship
INVENTION TYPES: therapeutics, devices-diagnostics, research-tools
DOMAINS: therapeutic, device, research-tool
JOURNEY STAGES: s1, s2, s3, s4
PRIORITY: unspecified
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen_program_verify_current_call
NEXT DEADLINE: 2026-12-08 (invited full proposals; verify)
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
Translational neuroscience community and pilot opportunities. Current pilot eligibility requires the project PI to be a Hope Center faculty member; cycle-specific requirements change.

WHY AN INVESTIGATOR MIGHT CARE:
Pilot data, collaborators, and neuroscience-specific infrastructure can strengthen papers and external grant applications. Commercialization is not required.

USEFUL WHEN:
- The work addresses neurological disease
- You need collaborative pilot funding or specialized neuroscience infrastructure

NOT FOR (do not recommend when):
- Investigators seeking a general startup accelerator
- Projects with no neurological-disease connection

ELIGIBILITY:
Hope Center faculty membership required for the PI of the current pilot program; collaborator membership rules are less restrictive.

CAVEATS:
- Confirm current membership and cycle requirements before applying.

ACADEMIC RETURNS:
- pilot data
- collaborators
- grant leverage

PROBLEMS SOLVED:
- pilot-funding
- collaborators
- neuroscience

FUNDING:
Pilot awards (cycle-specific; verify current call)

SOURCE URLS:
- https://hopecenter.wustl.edu/funding-awards/pilot-projects/

---

## PROGRAM: I-Corps at NIH

ID: nih-icorps
ORGANIZATION: NIH SEED
OFFICIAL URL: https://seed.nih.gov/I-Corps-at-NIH
LOCATION: national
SCOPE: federal
NEEDS ADDRESSED: expertise-mentorship, startup-support
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, software, research-tool
JOURNEY STAGES: s8
PRIORITY: second
COMPANY REQUIRED: yes
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen
NEXT DEADLINE: 2026-12-18 (2027 cohort 1 request; verify)
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
Structured commercialization and customer-discovery program. NIH SEED describes a three-person team model and program support.

WHY AN INVESTIGATOR MIGHT CARE:
Excellent after technical feasibility when product and customer assumptions are still uncertain — and only after a qualifying Phase I award.

USEFUL WHEN:
- An NIH-funded Phase I small business needs intensive customer discovery

NOT FOR (do not recommend when):
- An unfunded academic idea
- An entry customer-discovery program for faculty without a Phase I award

ELIGIBILITY:
Generally requires an eligible recent or active NIH/CDC/FDA/ACL Phase I SBIR/STTR award and no Phase II award yet.

CAVEATS:
- Not an entry program for an unfunded academic idea. Downstream of a qualifying Phase I award.

ACADEMIC RETURNS:
- customer discovery after Phase I

PROBLEMS SOLVED:
- customer-discovery
- education

SOURCE URLS:
- https://seed.nih.gov/I-Corps-at-NIH

---

## PROGRAM: ICTS Regulatory Support Center (RSC)

ID: icts-regulatory-support
ORGANIZATION: Institute of Clinical and Translational Sciences, WashU
OFFICIAL URL: https://icts.wustl.edu/items/regulatory-support-center-rsc/
CONTACT: reg_spt_center@wusm.wustl.edu
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: expertise-mentorship, build-test
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, software, clinical-workflow
JOURNEY STAGES: s6, s7, s8
PRIORITY: unspecified
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
Hands-on regulatory support for human-subjects studies, including protocol and consent development, IRB submissions and maintenance, FDA drug/device submissions such as IND/IDE applications, monitoring, study coordination, audits, and study close-out.

WHY AN INVESTIGATOR MIGHT CARE:
Turns 'we need a regulatory plan' into concrete study and submission work. This is especially important when the next milestone depends on an FDA-regulated drug, device, or investigator-initiated clinical study.

USEFUL WHEN:
- A human study needs IRB, IND/IDE, monitoring, or regulatory planning
- You need help translating a protocol into the institutional and FDA submission path
- Regulatory execution is becoming the blocker to a clinical milestone

NOT FOR (do not recommend when):
- Patent prosecution or technology licensing
- General FDA market strategy detached from a research study

ELIGIBILITY:
Designed for ICTS investigators conducting human-subjects research. Service level and project requirements vary; request support through the RSC/CCS process.

CAVEATS:
- Regulatory support does not itself substitute for required HRPO/IRB or FDA approvals.
- Some services may carry project-specific costs or coordination requirements.

ACADEMIC RETURNS:
- a concrete regulatory execution plan
- IND/IDE and IRB submission support
- lower operational friction for investigator-initiated trials

PROBLEMS SOLVED:
- regulatory
- ind
- ide
- irb
- clinical-trial

SOURCE URLS:
- https://icts.wustl.edu/research-services/regulatory-support/
- https://icts.wustl.edu/items/regulatory-support-center-rsc/
- https://research.washu.edu/core-facilities/regulatory-support-center/

---

## PROGRAM: ICTS Research Forum + CTRFP / Just-In-Time funding

ID: icts
ORGANIZATION: Institute of Clinical and Translational Sciences, WashU
OFFICIAL URL: https://icts.wustl.edu/research-services/research-development-program/research-forum-program/
CONTACT: icts@wustl.edu · JIT@wustl.edu
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: funding, expertise-mentorship
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, clinical-workflow
JOURNEY STAGES: s1, s2, s3, s4, s6, s7
PRIORITY: unspecified
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen_program_verify_current_call
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
Year-round multidisciplinary project-development or grant-review roundtables (design, aims, methods, statistics, milestones, stakeholders). CTRFP currently provides up to $50,000 direct costs for one-year clinical/translational or community-engaged projects and up to $25,000 for biostatistics/epidemiology/research-design projects. JIT provides rapid core-service support for preliminary data or certain QA/QI work.

WHY AN INVESTIGATOR MIGHT CARE:
Particularly valuable for turning a promising invention into rigorous translational evidence and competitive grants. No commercialization plan or company is required.

USEFUL WHEN:
- You have a translational concept or grant that needs study design and critique
- Preliminary or core-services data are the immediate bottleneck

NOT FOR (do not recommend when):
- A company-formation program
- Unrestricted laboratory operating support

ELIGIBILITY:
Research Forum is available to ICTS members across career stages and partner affiliations. CTRFP PI must be an ICTS member. The 2026 CTRFP cycle closed (invited full applications were due September 14, 2026); the next cycle has not been posted as of 2026-10-25. JIT has separate rolling processes and limits.

CAVEATS:
- CTRFP is a competitive call with cycle-specific deadlines — verify current status.
- Membership is required for CTRFP.

ACADEMIC RETURNS:
- stronger aims and methods
- preliminary data
- grant competitiveness
- collaborators

PROBLEMS SOLVED:
- study-design
- funding
- grants
- translational-evidence

FUNDING:
CTRFP up to $50,000 / $25,000 by category; JIT core-service support

SOURCE URLS:
- https://icts.wustl.edu/research-services/research-development-program/research-forum-program/
- https://icts.wustl.edu/funding/ctrfp-funding-program/
- https://icts.wustl.edu/funding/just-in-time-jit/

---

## PROGRAM: Joint Research Office for Contracts (JROC)

ID: jroc
ORGANIZATION: Washington University in St. Louis
OFFICIAL URL: https://research.washu.edu/offices/jroc/
CONTACT: researchcontracts@wusm.wustl.edu · 314-747-5393
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: expertise-mentorship
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, software, research-tool, clinical-workflow
JOURNEY STAGES: s4, s5, s6, s7, s8
PRIORITY: unspecified
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: only when context includes industry-collaboration, industry-sponsored-research

WHAT YOU GET:
University-wide drafting, review, negotiation, and signature of research-related agreements, including industry-supported research agreements, industry-supported clinical trials, data transfers, service agreements, collaborations, and federal/foundation contracts and subawards.

WHY AN INVESTIGATOR MIGHT CARE:
Industry collaboration is a distinct path from licensing or founding. If an outside organization wants to fund, collaborate on, test, or exchange data around the work, JROC is often the contract path that makes that relationship executable.

USEFUL WHEN:
- A company or outside collaborator wants to sponsor research rather than license the invention
- You need a clinical-trial, collaboration, service, data-use, or sponsored-research agreement
- The scientific partnership is clear but the institutional agreement is not

NOT FOR (do not recommend when):
- Patent prosecution or licensing university IP (see OTM)
- Finding an industry partner from scratch

ELIGIBILITY:
WashU research agreements. JROC serves principal investigators, administrators, and sponsors university-wide; the required intake path depends on agreement type.

CAVEATS:
- JROC executes research-related agreements; OTM handles patent licensing and many material-transfer/IP matters.
- This is not an industry matchmaking program.

ACADEMIC RETURNS:
- an executable sponsored-research or collaboration agreement
- a compliant path for industry-funded studies and data exchange
- industry collaboration without requiring a startup or license

PROBLEMS SOLVED:
- industry-sponsored-research
- research-contracts
- clinical-trial-agreements
- data-transfer
- collaboration-agreements

SOURCE URLS:
- https://research.washu.edu/offices/jroc/
- https://research.washu.edu/topics/contracts-subagreements/

---

## PROGRAM: mHealth Research Core (mHRC)

ID: mhealth-research-core
ORGANIZATION: Institute of Clinical and Translational Sciences, WashU
OFFICIAL URL: https://icts.wustl.edu/items/mhealth-research-core/
CONTACT: Katie Keenoy · keenoyk@wustl.edu
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: build-test, expertise-mentorship
INVENTION TYPES: software-digital, devices-diagnostics
DOMAINS: software, device, clinical-workflow
JOURNEY STAGES: s1, s2, s3, s6, s7
PRIORITY: unspecified
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: only when context includes digital-health, mhealth

WHAT YOU GET:
Consultation and implementation support for mHealth and digital-health research using smartphones, websites, sensors, wearables, remote study methods, and related technology. The core also provides guidance on topics such as remote research, technology partnerships, and FDA Part 11-regulated digital workflows.

WHY AN INVESTIGATOR MIGHT CARE:
Provides a WashU-specific bridge between a digital-health idea and a fundable, executable human-research project — a gap that generic software development or clinical-study support does not fully cover.

USEFUL WHEN:
- A study uses wearables, sensors, apps, web tools, telehealth, or remote data collection
- You need to design or operationalize an mHealth research workflow
- Digital tools introduce Part 11, vendor, remote-consent, or implementation questions

NOT FOR (do not recommend when):
- General-purpose software engineering unrelated to health research
- A substitute for OTM when software IP or licensing is the question

ELIGIBILITY:
WashU/ICTS-facing research resource; consult the core for project fit and service details.

CAVEATS:
- This is a research implementation core, not a software accelerator or venture program.

ACADEMIC RETURNS:
- a fundable digital-health study plan
- remote-study and mHealth implementation support
- clearer regulatory and vendor choices for digital research

PROBLEMS SOLVED:
- digital-health
- mhealth
- remote-research
- part-11

SOURCE URLS:
- https://mhealth.wustl.edu/people/associate-director-mhrc/
- https://icts.wustl.edu/items/mhealth-research-core/
- https://research.washu.edu/part-11/

---

## PROGRAM: Missouri SBDC FAST / SBIR-STTR assistance

ID: missouri-sbdc
ORGANIZATION: Missouri Small Business Development Center
OFFICIAL URL: https://sbdc.missouri.edu/programs/technology/funding
LOCATION: regional
SCOPE: regional
NEEDS ADDRESSED: expertise-mentorship
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, software, research-tool
JOURNEY STAGES: s6, s7, s8
PRIORITY: second
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen_program_verify_current_call
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
Resources, expertise, and assistance navigating SBIR/STTR proposal strategy and submission.

WHY AN INVESTIGATOR MIGHT CARE:
Useful when you understand the science but not the federal small-business process. No venture-capital raise is required to seek advising.

USEFUL WHEN:
- A founder is considering federal SBIR/STTR
- The team needs proposal strategy or submission support

NOT FOR (do not recommend when):
- An academic laboratory that will not form or partner with a small business

ELIGIBILITY:
Targeted to small businesses and prospective SBIR/STTR applicants. Current grants and services vary by FAST cycle.

CAVEATS:
- Advising is not an award. The applicant still must be an eligible small business.

ACADEMIC RETURNS:
- proposal strategy
- local SBIR/STTR navigation

PROBLEMS SOLVED:
- funding
- small-business

SOURCE URLS:
- https://sbdc.missouri.edu/programs/technology/funding

---

## PROGRAM: Missouri Technology Corporation IDEA Fund

ID: mtc-idea
ORGANIZATION: Missouri Technology Corporation
OFFICIAL URL: https://www.missouritechnology.com/venture-capital-investments/mtc-idea-fund/
LOCATION: regional
SCOPE: regional
NEEDS ADDRESSED: funding
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, software, research-tool
JOURNEY STAGES: s8, s9
PRIORITY: second
COMPANY REQUIRED: yes
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen_program_verify_current_call
NEXT DEADLINE: 2026-11-03 (January 2027 cycle, 11:59 pm; verify)
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
Current tracks include TechLaunch (up to $250,000 for companies raising under $1M), Seed Capital (up to $1M for $1–5M raises), and a larger venture track. MTC investments require private matching capital.

WHY AN INVESTIGATOR MIGHT CARE:
Can leverage an external financing round with state-backed investment. This is equity, not an academic grant.

USEFUL WHEN:
- A Missouri technology startup is raising an institutional pre-seed, seed, or Series A round
- The company can attract matching private capital

NOT FOR (do not recommend when):
- An academic grant or proof-of-concept pilot (that earlier pilot is currently paused)
- A laboratory without a company

ELIGIBILITY:
Missouri location and growth requirements, plus matching co-investment. The earlier proof-of-concept pilot is currently paused.

CAVEATS:
- This is matching equity investment, not a faculty grant.

ACADEMIC RETURNS:
- state-backed match on a real financing round

PROBLEMS SOLVED:
- funding
- startup

FUNDING:
Equity investment with private match (track-specific; verify)

SOURCE URLS:
- https://www.missouritechnology.com/venture-capital-investments/mtc-idea-fund/

---

## PROGRAM: NCATS Small Business Programs

ID: ncats-sbir
ORGANIZATION: National Center for Advancing Translational Sciences
OFFICIAL URL: https://ncats.nih.gov/funding/small-business-programs/resources-applicants
CONTACT: NCATS-SBIRSTTR@mail.nih.gov
LOCATION: national
SCOPE: federal
NEEDS ADDRESSED: funding
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, research-tool, software
JOURNEY STAGES: s6, s7, s8
PRIORITY: second
COMPANY REQUIRED: yes
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen_program_verify_current_call
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
SBIR/STTR funding and program guidance aligned with translational science. NCATS encourages prospective applicants to discuss program fit.

WHY AN INVESTIGATOR MIGHT CARE:
Useful for platforms or tools that may not fit a single disease-oriented institute cleanly.

USEFUL WHEN:
- The technology addresses a translational-science bottleneck or broadly enabling biomedical need
- A company is being considered

NOT FOR (do not recommend when):
- An academic lab acting alone

ELIGIBILITY:
NIH small-business eligibility applies to SBIR/STTR.

CAVEATS:
- Discuss fit with NCATS before treating this as a default institute.

ACADEMIC RETURNS:
- non-dilutive funding for enabling platforms

PROBLEMS SOLVED:
- funding
- small-business

FUNDING:
NIH SBIR/STTR (verify current NOFO)

SOURCE URLS:
- https://ncats.nih.gov/funding/small-business-programs/resources-applicants

---

## PROGRAM: Needleman Program (NPIC)

ID: needleman-npic
ORGANIZATION: Needleman Program for Innovation & Commercialization, WashU
OFFICIAL URL: https://needlemanprogram.wustl.edu/
CONTACT: npic@wustl.edu
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: funding, expertise-mentorship, build-test
INVENTION TYPES: therapeutics
DOMAINS: therapeutic
JOURNEY STAGES: s5, s6, s7
PRIORITY: unspecified
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: closed_verify
LAST VERIFIED: 2026-10-26
MODALITY LOCK: therapeutic
CONTEXT GATE: none

WHAT YOU GET:
Funding plus drug-discovery and development expertise and business mentoring. NPIC’s stated objective is to move promising therapeutic candidates toward FDA investigational-new-drug status.

WHY AN INVESTIGATOR MIGHT CARE:
Provides capabilities most academic labs are not organized to execute and can preserve the PI’s focus on science. A startup is not required.

USEFUL WHEN:
- A promising WashU therapeutic candidate needs work beyond normal discovery science
- The next question is developability toward IND, not another mechanistic paper

NOT FOR (do not recommend when):
- Generic non-therapeutic devices
- Research tools or software without a therapeutic candidate
- Very early small-molecule hit finding or lead optimization where the Center for Drug Discovery is the more natural first door

ELIGIBILITY:
During open windows, PIs from any WashU school or department may apply. The public page currently says applications are closed and a future RFP is planned.

CAVEATS:
- Applications were closed as of 2026-09-04; treat this as a future milestone until a new RFP opens.

ACADEMIC RETURNS:
- drug-development expertise
- milestone-driven funding
- path toward IND without founding

PROBLEMS SOLVED:
- therapeutic-development
- funding
- ind

FUNDING:
Program funding during open RFPs (verify current call)

SOURCE URLS:
- https://needlemanprogram.wustl.edu/
- https://needlemanprogram.wustl.edu/services/
- https://needlemanprogram.wustl.edu/application-resources/
- https://needlemanprogram.wustl.edu/contact-us/

---

## PROGRAM: NEURO360 / regional neuroscience innovation network

ID: neuro360
ORGANIZATION: Washington University in St. Louis · regional partners
OFFICIAL URL: https://neuro360engine.org/
LOCATION: regional
SCOPE: regional
NEEDS ADDRESSED: industry-connections
INVENTION TYPES: therapeutics, devices-diagnostics, research-tools
DOMAINS: device, therapeutic, research-tool
JOURNEY STAGES: s4, s8
PRIORITY: second
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen_program_verify_current_call
LAST VERIFIED: 2026-09-07
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
A regional neuroscience innovation coalition of academic, industry, healthcare, and civic partners working to advance neurotechnology commercialization, workforce pathways, and ecosystem connections in the St. Louis region.

WHY AN INVESTIGATOR MIGHT CARE:
A network layer connecting academic neuroscience to regional company-building and workforce resources — not a guaranteed individual grant.

USEFUL WHEN:
- The opportunity needs regional neuroscience-industry connections or cluster-scale visibility

NOT FOR (do not recommend when):
- A standing individual-investigator application you can submit this week

ELIGIBILITY:
A standing individual-investigator application route is not publicly specified. Model this as an ecosystem/network node rather than guaranteed funding.

CAVEATS:
- Program status should be periodically re-verified. Do not treat this as a walk-in funding call or an active NSF Engines award by itself.

ACADEMIC RETURNS:
- regional visibility
- industry network

PROBLEMS SOLVED:
- network
- ecosystem

SOURCE URLS:
- https://neuro360engine.org/
- https://innovation.washu.edu/our-ecosystem/

---

## PROGRAM: Neurotech Hub

ID: neurotech-hub
ORGANIZATION: Washington University in St. Louis
OFFICIAL URL: https://neurotechhub.wustl.edu/
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: build-test, expertise-mentorship
INVENTION TYPES: devices-diagnostics, software-digital, research-tools
DOMAINS: device, software, research-tool, algorithm
JOURNEY STAGES: s0, s1, s2, s3
PRIORITY: unspecified
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
On-demand technical services and development of new technical paradigms and tools for neuroscience.

WHY AN INVESTIGATOR MIGHT CARE:
Turns a technical problem into research capability, preliminary data, prototypes, and potentially protectable inventions — before you need a commercial plan.

USEFUL WHEN:
- You have an experimental or technical problem, concept, or prototype
- You need engineering help to make the first convincing test
- You want a working tool for the lab, not a company

NOT FOR (do not recommend when):
- A substitute for clinical or regulatory strategy
- Late-stage company financing

ELIGIBILITY:
Neuroscience-oriented WashU resource. Precise project prioritization and service terms are locally managed where not publicly stated.

CAVEATS:
- Bring a problem. You do not need a commercialization plan first.

ACADEMIC RETURNS:
- prototypes and methods
- preliminary data
- trainee technical projects

PROBLEMS SOLVED:
- prototype
- engineering
- technical-development

SOURCE URLS:
- https://neurotechhub.wustl.edu/

---

## PROGRAM: NIA Small Business — Alzheimer’s / ADRD and aging

ID: nia-sbir
ORGANIZATION: National Institute on Aging
OFFICIAL URL: https://www.nia.nih.gov/research/sbir/about-nia-small-business-funding
LOCATION: national
SCOPE: federal
NEEDS ADDRESSED: funding
INVENTION TYPES: therapeutics, devices-diagnostics, research-tools
DOMAINS: therapeutic, device, diagnostic, research-tool
JOURNEY STAGES: s6, s7, s8
PRIORITY: second
COMPANY REQUIRED: yes
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen_program_verify_current_call
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
A dedicated SBIR/STTR program. NIA reports more than $140M/year in small-business support across aging and AD/ADRD areas.

WHY AN INVESTIGATOR MIGHT CARE:
Neuroscience-specific non-dilutive capital for one of WashU’s major strengths — if a small-business path is real.

USEFUL WHEN:
- An Alzheimer’s, ADRD, or aging-related diagnostic, tool, therapeutic, or service has a plausible small-business path

NOT FOR (do not recommend when):
- An academic lab acting alone

ELIGIBILITY:
Small-business program requirements apply. Specific NOFO deadlines and areas should be queried live.

CAVEATS:
- Company eligibility applies. Confirm current NOFO areas.

ACADEMIC RETURNS:
- disease-specific non-dilutive R&D funding

PROBLEMS SOLVED:
- funding
- small-business

FUNDING:
NIA SBIR/STTR (verify current)

SOURCE URLS:
- https://www.nia.nih.gov/research/sbir/about-nia-small-business-funding

---

## PROGRAM: NIH SBIR/STTR small-business funding

ID: nih-ninds-sbir
ORGANIZATION: NIH SEED
OFFICIAL URL: https://seed.nih.gov/small-business-funding/find-funding/sbir-sttr-funding-opportunities
LOCATION: national
SCOPE: federal
NEEDS ADDRESSED: funding
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, software, research-tool
JOURNEY STAGES: s6, s7, s8, s9
PRIORITY: unspecified
COMPANY REQUIRED: yes
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen_program_verify_current_call
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
NIH SBIR/STTR funding for eligible U.S. small businesses conducting biomedical R&D. The program can support scientists, engineers, prototypes, validation, and commercialization-oriented research while preserving equity; institute-specific scientific fit still matters.

WHY AN INVESTIGATOR MIGHT CARE:
A major non-dilutive funding route once product-oriented biomedical R&D belongs inside an eligible U.S. small business. Keep this card broad; use institute-specific cards such as NINDS Translational Devices when the modality and disease area justify them.

USEFUL WHEN:
- A biomedical product-oriented project has a credible small-business path
- A company needs non-dilutive R&D funding before or alongside private capital
- You need to distinguish SBIR/STTR from academic-only grant mechanisms

NOT FOR (do not recommend when):
- An academic laboratory acting alone; the applicant must be an eligible U.S. small business
- Assume this replaces institute-specific scientific fit or current NOFO review

ELIGIBILITY:
SBIR/STTR applicant must meet U.S. small-business eligibility. Universities may participate as research partners/subawardees; STTR has formal research-institution participation requirements. Confirm current NIH and institute-specific rules before submission.

CAVEATS:
- An academic lab alone is not an SBIR/STTR applicant.
- Use the separate NINDS Translational Devices card for nervous-system therapeutic/diagnostic device programs and Missouri SBDC for local proposal assistance.
- I-Corps at NIH is generally downstream of a qualifying Phase I award — not an entry program.

ACADEMIC RETURNS:
- substantial non-dilutive company R&D funding
- funded technical and translational milestones
- a bridge to later validation and commercialization work

PROBLEMS SOLVED:
- funding
- small-business

FUNDING:
NIH SBIR/STTR (verify current NOFO and institute fit)

SOURCE URLS:
- https://seed.nih.gov/small-business-funding/find-funding/sbir-sttr-funding-opportunities

---

## PROGRAM: NINDS Translational Devices + Small Business Program

ID: ninds-devices
ORGANIZATION: National Institute of Neurological Disorders and Stroke
OFFICIAL URL: https://www.ninds.nih.gov/current-research/research-funded-ninds/translational-research/translational-devices
LOCATION: national
SCOPE: federal
NEEDS ADDRESSED: funding
INVENTION TYPES: devices-diagnostics
DOMAINS: device, diagnostic
JOURNEY STAGES: s6, s7, s8
PRIORITY: second
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen_program_verify_current_call
LAST VERIFIED: 2026-10-26
MODALITY LOCK: device
CONTEXT GATE: none

WHAT YOU GET:
Support for development, optimization, translation, and first-in-human testing of therapeutic and diagnostic devices. NINDS also has dedicated small-business programs.

WHY AN INVESTIGATOR MIGHT CARE:
A neuroscience-specific route that can finance evidence R01-style projects often do not emphasize.

USEFUL WHEN:
- A device or neurotechnology addresses a nervous-system disorder
- You need milestone-driven translation, regulatory preparation, or first-in-human work

NOT FOR (do not recommend when):
- A generic assumption that every NINDS device NOFO is academic — some are small-business-only

ELIGIBILITY:
Depends on the specific NOFO. Some routes are academic; others are small-business-only. Inspect the current announcement.

CAVEATS:
- Do not infer eligibility from the program family. Read the current NOFO.

ACADEMIC RETURNS:
- device-translation milestones
- possible first-in-human support

PROBLEMS SOLVED:
- device-translation
- funding

FUNDING:
NINDS translational-device and small-business NOFOs (verify current)

SOURCE URLS:
- https://www.ninds.nih.gov/current-research/research-funded-ninds/translational-research/translational-devices
- https://www.ninds.nih.gov/funding/ninds-small-business-program

---

## PROGRAM: NSF I-Corps

ID: nsf-icorps
ORGANIZATION: National Science Foundation
OFFICIAL URL: https://www.nsf.gov/funding/initiatives/i-corps
LOCATION: national
SCOPE: federal
NEEDS ADDRESSED: expertise-mentorship, startup-support
INVENTION TYPES: devices-diagnostics, software-digital, research-tools
DOMAINS: device, software, research-tool, algorithm
JOURNEY STAGES: s4, s6, s8
PRIORITY: second
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen_program_verify_current_call
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
National I-Corps teams combine technical, entrepreneurial, and industry perspectives around customer discovery.

WHY AN INVESTIGATOR MIGHT CARE:
Useful for instrumentation, engineering, computation, and research tools where clinical-disease programs are a poor fit.

USEFUL WHEN:
- A deep-tech or scientific invention needs systematic customer discovery
- NSF’s commercialization ecosystem fits better than NIH

NOT FOR (do not recommend when):
- An assumption that every WashU invention qualifies
- A substitute for OTM on university IP

ELIGIBILITY:
Current team and award eligibility depends on the NSF route. Do not assume every WashU invention qualifies.

CAVEATS:
- Eligibility is route-specific. Confirm before planning around a cohort.

ACADEMIC RETURNS:
- customer discovery for non-clinical deep tech

PROBLEMS SOLVED:
- customer-discovery
- education

SOURCE URLS:
- https://www.nsf.gov/funding/initiatives/i-corps

---

## PROGRAM: Osage University Partners (OUP)

ID: oup
ORGANIZATION: Osage University Partners
OFFICIAL URL: https://oup.vc/
LOCATION: national
SCOPE: investor
NEEDS ADDRESSED: funding
INVENTION TYPES: therapeutics, devices-diagnostics, research-tools
DOMAINS: therapeutic, device, diagnostic, research-tool
JOURNEY STAGES: s8, s9
PRIORITY: second
COMPANY REQUIRED: yes
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
VC focused on science-driven startups from research ecosystems. Current sectors include therapeutics, medtech, diagnostics, and research tools. Current site states $1M–$20M investment size across stages.

WHY AN INVESTIGATOR MIGHT CARE:
An investor familiar with university technology-transfer and spinout issues.

USEFUL WHEN:
- University-originated science has venture-scale potential
- The company needs investors who understand academic IP

NOT FOR (do not recommend when):
- A grant or general faculty assistance program

ELIGIBILITY:
Investment opportunity required. No grant program.

CAVEATS:
- Downstream financing. Not an investigator service.

ACADEMIC RETURNS:
- university-spinout-fluent capital

PROBLEMS SOLVED:
- funding
- startup

FUNDING:
Venture investment, $1M–$20M across stages (verify)

SOURCE URLS:
- https://oup.vc/

---

## PROGRAM: OTM — invention disclosure, evaluation, IP and licensing

ID: otm-core
ORGANIZATION: Office of Technology Management, WashU
OFFICIAL URL: https://otm.wustl.edu/disclose-inventions/licensing-process/
CONTACT: otm@wustl.edu · 314-747-1794
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: ip-licensing, expertise-mentorship
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, software, research-tool
JOURNEY STAGES: s3, s4, s5, s6, s7, s8
PRIORITY: unspecified
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
Disclosure intake, evaluation, patent/IP strategy, marketing, licensing, and commercialization support. The disclosure asks for an invention description, creators, funding, and related information.

WHY AN INVESTIGATOR MIGHT CARE:
Lets you understand transfer options without deciding to become an entrepreneur. OTM evaluates WashU inventions, handles patent strategy, and files when warranted — a conversation before a talk or paper is how that process starts.

USEFUL WHEN:
- Something developed in the lab may have utility outside it
- You want to preserve transfer or commercialization options
- You are choosing among protect, license, distribute, or open-release

NOT FOR (do not recommend when):
- need this as a required first step for every research idea
- treat this as a substitute for deciding what success looks like to you

ELIGIBILITY:
WashU inventions; assignment and contact depend on academic unit. OTM’s department lookup includes neuroscience-related units.

CAVEATS:
- OTM evaluates WashU inventions and, when warranted, files and manages the patents.
- A startup is not required.

ACADEMIC RETURNS:
- clarity on transfer options
- possible protection before public disclosure
- a path to licensing without founding

PROBLEMS SOLVED:
- ip
- disclosure
- license
- transfer

SOURCE URLS:
- https://otm.wustl.edu/disclose-inventions/licensing-process/
- https://otm.wustl.edu/disclose-inventions/otm-contact-by-washu-department/

---

## PROGRAM: OTM Experts-in-Residence (XiR)

ID: xir
ORGANIZATION: Office of Technology Management, WashU
OFFICIAL URL: https://otm.wustl.edu/items/experts-in-residence/
CONTACT: Start with OTM · otm@wustl.edu
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: expertise-mentorship
INVENTION TYPES: broad
DOMAINS: device, diagnostic, software, therapeutic, research-tool
JOURNEY STAGES: s4, s5, s6
PRIORITY: unspecified
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: yes
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
Access to experienced expertise within the OTM innovation network. OTM publishes XiR eligibility for participating experts; expert participation itself is invitation-only.

WHY AN INVESTIGATOR MIGHT CARE:
You do not have to independently locate every expert. This is domain judgment, not a request that you become a founder.

USEFUL WHEN:
- The project needs experienced external judgment rather than general business instruction
- You want to define a product, technical, or milestone question

NOT FOR (do not recommend when):
- Founder coaching (see EIR / New Ventures)
- Open office hours without OTM context

ELIGIBILITY:
Researcher-facing routing criteria are unspecified publicly; access should be treated as OTM-mediated.

CAVEATS:
- Start with OTM. Do not treat XiR as a walk-in mentoring pool.

ACADEMIC RETURNS:
- targeted expert advice
- clearer next technical or product milestone

PROBLEMS SOLVED:
- expertise
- external-feedback

SOURCE URLS:
- https://otm.wustl.edu/items/experts-in-residence/

---

## PROGRAM: OTM New Ventures / Entrepreneur-in-Residence

ID: otm-eir
ORGANIZATION: Office of Technology Management, WashU
OFFICIAL URL: https://otm.wustl.edu/disclose-inventions/new-ventures/
CONTACT: OTM New Ventures · otm@wustl.edu
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: startup-support, expertise-mentorship
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, software
JOURNEY STAGES: s7, s8
PRIORITY: unspecified
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: yes
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
Founder coaching, business-case and value-proposition refinement, business-model work, and startup mentoring. The EIR program is administered through New Ventures.

WHY AN INVESTIGATOR MIGHT CARE:
Faculty can explore company formation without personally having all CEO or business-development expertise. Startup intent is relevant; this is not the default path for every disclosed invention.

USEFUL WHEN:
- A startup is becoming a plausible vehicle
- Scientific founders need experienced company-building help

NOT FOR (do not recommend when):
- Investigators who want licensing or distribution without founding
- Early ideas with no company hypothesis

ELIGIBILITY:
OTM states that the research team’s WashU patent must be foundational to the startup license; EIR connection is at New Ventures’ discretion.

CAVEATS:
- EIR placement is only for teams focused on a startup based on WashU IP; an already-incorporated company is not the stated prerequisite.
- EIR requires a patent disclosure, foundational WashU patent rights for the startup license, a pitch deck developed with New Ventures, and coachability; placement is discretionary.
- This is founder support, not general scientific mentoring.

ACADEMIC RETURNS:
- company-building coaching
- a clearer go/no-go on founding
- possible license path

PROBLEMS SOLVED:
- startup
- founder-coaching
- business-model

SOURCE URLS:
- https://otm.wustl.edu/disclose-inventions/new-ventures/
- https://otm.wustl.edu/items/entrepreneur-in-residence/

---

## PROGRAM: OTM Quick Start License

ID: quick-start-license
ORGANIZATION: Office of Technology Management, WashU
OFFICIAL URL: https://otm.wustl.edu/disclose-inventions/quick-start-license/
CONTACT: OTM New Ventures · otm@wustl.edu
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: ip-licensing, startup-support
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, software
JOURNEY STAGES: s8
PRIORITY: second
COMPANY REQUIRED: yes
DISCLOSURE TYPICALLY NEEDED: yes
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
A standardized startup license. Current public terms include no WashU equity and a fixed 2% patent royalty on product sales, with additional sublicense terms.

WHY AN INVESTIGATOR MIGHT CARE:
Can simplify license formation once a WashU-IP startup is actually the vehicle — not a reason to create one.

USEFUL WHEN:
- A qualifying WashU-IP startup is ready to license foundational university patent rights
- Standardized terms could reduce negotiation burden

NOT FOR (do not recommend when):
- Investigators who want to license to an existing company rather than found
- An early idea with no company hypothesis

ELIGIBILITY:
Qualifying startup and IP conditions apply. Contact OTM before assuming eligibility.

CAVEATS:
- This is a vehicle after startup direction is credible, not a reason to incorporate.

ACADEMIC RETURNS:
- a simpler license path once founding is justified

PROBLEMS SOLVED:
- license
- startup

SOURCE URLS:
- https://otm.wustl.edu/disclose-inventions/quick-start-license/

---

## PROGRAM: RiverVest Venture Partners

ID: rivervest
ORGANIZATION: RiverVest
OFFICIAL URL: https://rivervest.com/
CONTACT: info@rivervest.com · 314-726-6700
LOCATION: st-louis
SCOPE: investor
NEEDS ADDRESSED: funding, startup-support
INVENTION TYPES: therapeutics, devices-diagnostics
DOMAINS: therapeutic, device
JOURNEY STAGES: s8, s9
PRIORITY: second
COMPANY REQUIRED: yes
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
St. Louis-headquartered life-science VC that funds and founds biopharma and device companies and can lead financing syndicates.

WHY AN INVESTIGATOR MIGHT CARE:
Relevant when the question has moved from “is there a product?” to “is this a venture-scale company?”

USEFUL WHEN:
- A biopharma or medical-device company needs sophisticated company formation or venture financing

NOT FOR (do not recommend when):
- Academic projects
- Pre-company de-risking

ELIGIBILITY:
Company and investment diligence required; terms are opportunity-specific.

CAVEATS:
- Downstream financing. Not a faculty program.

ACADEMIC RETURNS:
- venture-scale company formation and capital

PROBLEMS SOLVED:
- funding
- startup

FUNDING:
Venture financing (deal-specific)

SOURCE URLS:
- https://rivervest.com/

---

## PROGRAM: Siteman Investment Program Research Development Awards (SIP RDA)

ID: siteman-sip-rda
ORGANIZATION: Siteman Cancer Center, WashU
OFFICIAL URL: https://siteman.washu.edu/research/funding-opportunities/
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: funding
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, software, research-tool
JOURNEY STAGES: s1, s2, s3, s6
PRIORITY: second
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen_program_verify_current_call
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: only when context includes cancer

WHAT YOU GET:
Pilot funding for pioneering cancer research intended to generate data that can leverage external peer-reviewed funding. The program spans cancer discovery, diagnosis, imaging, treatment, prevention, and translational/implementation work depending on the current cycle.

WHY AN INVESTIGATOR MIGHT CARE:
For cancer-related inventions or enabling technologies, the immediate need may be stronger scientific or translational evidence rather than a commercialization grant. SIP RDA is a major internal pilot-funding route for that work.

USEFUL WHEN:
- The project is cancer-related and needs pilot or preliminary data
- A defined experiment could unlock an NIH/NCI application or translational next step

NOT FOR (do not recommend when):
- Projects with no cancer relevance
- Assume a standing open call or fixed award amount without checking the current RFA

ELIGIBILITY:
Siteman membership and cycle-specific eligibility apply. Current RFA terms should be checked before routing an investigator to the program.

CAVEATS:
- This is cancer-research pilot funding, not a startup program.
- Eligibility and award categories change by cycle; verify the current RFA.

ACADEMIC RETURNS:
- pilot data
- external-grant leverage
- cross-disciplinary cancer collaborations

PROBLEMS SOLVED:
- pilot-funding
- preliminary-data
- cancer

FUNDING:
Pilot funding; amount and categories are cycle-specific

SOURCE URLS:
- https://siteman.washu.edu/research/funding-opportunities/

---

## PROGRAM: Skandalaris In-Residence / IdeaBounce

ID: skandalaris-ideabounce
ORGANIZATION: Skandalaris Center, WashU
OFFICIAL URL: https://skandalaris.wustl.edu/programs/
CONTACT: sc@wustl.edu
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: expertise-mentorship, industry-connections
INVENTION TYPES: broad
DOMAINS: device, software, research-tool, therapeutic, diagnostic
JOURNEY STAGES: s4, s6, s8
PRIORITY: second
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
In-Residence mentoring from experienced entrepreneurs and industry advisors, plus IdeaBounce events for pitching, feedback, and networking.

WHY AN INVESTIGATOR MIGHT CARE:
Useful before committing to a venture. You do not need a finished company or investor deck.

USEFUL WHEN:
- You want founder or industry feedback on how an idea is communicated
- You want a low-stakes venue before venture commitment

NOT FOR (do not recommend when):
- A WashU-IP faculty invention seeking the Venture Competition awards
- A substitute for OTM evaluation

ELIGIBILITY:
Skandalaris services broadly include WashU faculty, staff, students, and alumni; individual event requirements vary.

CAVEATS:
- Do not confuse this with the Skandalaris Venture Competition.

ACADEMIC RETURNS:
- early feedback
- network without a finished deck

PROBLEMS SOLVED:
- feedback
- networking
- venture-exploration

SOURCE URLS:
- https://skandalaris.wustl.edu/programs/
- https://skandalaris.wustl.edu/resource/in-residence-program/

---

## PROGRAM: Skandalaris Venture Competition (SVC)

ID: skandalaris-svc
ORGANIZATION: Skandalaris Center, WashU
OFFICIAL URL: https://skandalaris.wustl.edu/program/skandalaris-venture-competition/
CONTACT: sc@wustl.edu
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: funding, startup-support
INVENTION TYPES: broad
DOMAINS: device, software, research-tool, therapeutic, diagnostic
JOURNEY STAGES: s8
PRIORITY: second
COMPANY REQUIRED: yes
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen_program_verify_current_call
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
Competition awards. Fall 2026 materials describe an awards pool of up to $25,000, subject to limits per startup.

WHY AN INVESTIGATOR MIGHT CARE:
Can provide venture validation and money for an eligible student or recent-alumni venture that does not rely on university IP. It should normally be suppressed for a faculty WashU-IP invention.

USEFUL WHEN:
- An eligible student or recent-alumni venture does not rely on university IP

NOT FOR (do not recommend when):
- Faculty inventions that are WashU IP
- Any startup whose license is to WashU or another university’s IP

ELIGIBILITY:
Qualifying WashU student or recent alum and ownership rules apply. WashU IP is not permitted, nor is a license to IP from WashU or another university.

CAVEATS:
- Critical trap: current rules prohibit WashU / university IP and licenses to university IP.

ACADEMIC RETURNS:
- venture validation — only if you are actually eligible

PROBLEMS SOLVED:
- startup
- competition

FUNDING:
Awards pool up to $25,000 (verify current cycle)

SOURCE URLS:
- https://skandalaris.wustl.edu/program/skandalaris-venture-competition/

---

## PROGRAM: Skandalaris Venture Development

ID: skandalaris-vd
ORGANIZATION: Skandalaris Center, WashU
OFFICIAL URL: https://skandalaris.wustl.edu/resource/venture-development/
CONTACT: sc@wustl.edu
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: startup-support, expertise-mentorship
INVENTION TYPES: broad
DOMAINS: device, software, research-tool, therapeutic, diagnostic
JOURNEY STAGES: s4, s6, s7, s8
PRIORITY: unspecified
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
30-minute advising on brainstorming, business plans, financial models, pitching, and next-step guidance.

WHY AN INVESTIGATOR MIGHT CARE:
An excellent low-commitment way to ask whether entrepreneurship is even sensible. No incorporation or mature startup is required.

USEFUL WHEN:
- You want help thinking through an idea, model, or next entrepreneurial step
- You are exploring founding without committing to it

NOT FOR (do not recommend when):
- The Skandalaris Venture Competition — current rules prohibit WashU / university IP and licenses to university IP
- A substitute for OTM evaluation of a WashU invention

ELIGIBILITY:
WashU students, faculty, staff, and alumni; ventures may be at any stage.

CAVEATS:
- Do not confuse Venture Development advising with the Skandalaris Venture Competition.
- SVC currently excludes WashU IP — a common mis-route for faculty inventions.

ACADEMIC RETURNS:
- a low-stakes read on whether a company is justified
- help framing a model or pitch if you proceed

PROBLEMS SOLVED:
- venture-exploration
- business-model
- pitch

SOURCE URLS:
- https://skandalaris.wustl.edu/resource/venture-development/
- https://skandalaris.wustl.edu/programs/

---

## PROGRAM: Trial-CARE

ID: trial-care
ORGANIZATION: Center for Clinical Studies · ICTS, WashU
OFFICIAL URL: https://icts.wustl.edu/items/trial-care/
CONTACT: trialcare@wustl.edu
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: build-test, expertise-mentorship
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, software, clinical-workflow
JOURNEY STAGES: s6, s7, s8
PRIORITY: unspecified
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: only when context includes multicenter-trial

WHAT YOU GET:
Enhanced support for WashU faculty conducting investigator-initiated clinical trials, especially multi-center studies. Trial-CARE helps with startup and implementation, single-IRB and master-agreement pathways, regulatory resources, anticipated barriers, coordination, and tailored recruitment planning.

WHY AN INVESTIGATOR MIGHT CARE:
A technically ready intervention can still fail to travel because a multi-site trial is hard to start and coordinate. Trial-CARE is a concrete execution resource once the next proof requires investigator-initiated clinical testing across sites.

USEFUL WHEN:
- You are planning an investigator-initiated clinical trial
- A multi-center study needs startup, coordination, single-IRB, agreement, or recruitment support
- The evidence milestone is clinically clear but operationally difficult

NOT FOR (do not recommend when):
- A single preclinical experiment
- General commercialization or founder coaching

ELIGIBILITY:
Washington University faculty conducting investigator-initiated clinical trials. Trial-CARE advertises a free consultation; project support depends on trial needs.

CAVEATS:
- Best fit is investigator-initiated clinical-trial execution, particularly multi-center work.

ACADEMIC RETURNS:
- faster and more structured trial startup
- coordination and recruitment planning
- a path through multi-site operational barriers

PROBLEMS SOLVED:
- multicenter-trial
- trial-startup
- recruitment
- single-irb

SOURCE URLS:
- https://icts.wustl.edu/items/trial-care/
- https://icts.wustl.edu/research-services/regulatory-support/

---

## PROGRAM: VeritaScience — WashU + Deerfield

ID: veritascience
ORGANIZATION: Washington University in St. Louis · Deerfield Management
OFFICIAL URL: https://www.veritascience.com/
CONTACT: Mark Van Horn · markv@wustl.edu · Oscar Diaz Ruiz · doscar@wustl.edu (WashU Medicine business development)
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: funding, expertise-mentorship
INVENTION TYPES: therapeutics
DOMAINS: therapeutic, diagnostic
JOURNEY STAGES: s5, s6, s7
PRIORITY: second
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen_program_verify_current_call
LAST VERIFIED: 2026-10-26
MODALITY LOCK: therapeutic
CONTEXT GATE: none

WHAT YOU GET:
Deerfield committed up to $130 million over ten years. Accepted drug-discovery projects receive development plans aimed toward IND readiness and may receive further funding or support, including possible company formation.

WHY AN INVESTIGATOR MIGHT CARE:
Industry drug-development expertise and capital without requiring a pre-existing startup.

USEFUL WHEN:
- A therapeutic or diagnostic discovery needs a milestone-driven development plan
- You need specialized industry capabilities and substantial development capital

NOT FOR (do not recommend when):
- Non-drug devices or research tools
- A general faculty grant program

ELIGIBILITY:
WashU investigator proposals, accepted on a rolling basis per the NPIC partners page; project proposals can be designed around any disease indication. NPIC suggests first scheduling a consultation with its senior director (Shripad Bhagwat, PhD).

CAVEATS:
- Routing is through WashU/Deerfield scientific review, guided by OTM and WUSM business development.
- Project sourcing and evaluation questions go to the WashU Medicine business development team.

ACADEMIC RETURNS:
- industry development expertise
- IND-oriented planning
- possible later company support

PROBLEMS SOLVED:
- therapeutic-development
- funding
- ind

FUNDING:
Up to $130M over ten years across the collaboration (project-specific)

SOURCE URLS:
- https://www.veritascience.com/
- https://needlemanprogram.wustl.edu/about/partners/
- https://source.washu.edu/2024/01/washington-university-deerfield-management-launch-veritascience-to-drive-drug-discovery/

---

## PROGRAM: Washington University Gap Fund

ID: gap-fund
ORGANIZATION: Office of Technology Management, WashU
OFFICIAL URL: https://otm.wustl.edu/disclose-inventions/gap-fund/
CONTACT: OTM · otm@wustl.edu
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: funding
INVENTION TYPES: devices-diagnostics, software-digital, research-tools
DOMAINS: device, diagnostic, software, research-tool
JOURNEY STAGES: s6, s7
PRIORITY: unspecified
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: yes
STATUS: evergreen_program_verify_current_call
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
Translational funding for promising non-drug WashU technologies. Current OTM information says commitments are made in blocks up to $65,000; technically no overall maximum is stated.

WHY AN INVESTIGATOR MIGHT CARE:
Pays for work conventional academic grants may not prioritize but that can de-risk a technology. You do not need to start a company.

USEFUL WHEN:
- A specific non-drug experiment, prototype, or milestone would increase transfer value
- You have a WashU technology and a concrete de-risking experiment

NOT FOR (do not recommend when):
- Drug development / therapeutic candidates (see Needleman)
- General unfocused research support

ELIGIBILITY:
WashU researcher with an appointment covered by the IP policy; non-drug technology; proof of feasibility demonstrated; technology disclosed to OTM and properly assigned to WashU; reasonable probability of adequate IP protection. Applications/consideration are available year-round, including ad hoc proposals.

CAVEATS:
- This is not a drug-development program and does not fund startup-company expenses.
- A single award commitment is up to $65,000; larger development plans may be staged through sequential awards.
- The technology must already have proof of feasibility and be disclosed/assigned to WashU before an application.

ACADEMIC RETURNS:
- funded development work
- validation data
- possible grant and publication leverage

PROBLEMS SOLVED:
- funding
- de-risking
- prototype

FUNDING:
Commitments in blocks up to $65,000 (verify current terms)

SOURCE URLS:
- https://otm.wustl.edu/disclose-inventions/gap-fund/

---

## PROGRAM: WashU Innovation

ID: washu-innovation
ORGANIZATION: Washington University in St. Louis
OFFICIAL URL: https://innovation.washu.edu/
LOCATION: washu
SCOPE: washu
NEEDS ADDRESSED: expertise-mentorship
INVENTION TYPES: broad
DOMAINS: therapeutic, device, diagnostic, software, research-tool
JOURNEY STAGES: s0, s1
PRIORITY: second
COMPANY REQUIRED: no
DISCLOSURE TYPICALLY NEEDED: no
STATUS: evergreen
LAST VERIFIED: 2026-10-26
MODALITY LOCK: none
CONTEXT GATE: none

WHAT YOU GET:
University-wide roadmap and directory spanning commercialization, education, funding, and space. WashU describes its process as Identify → Evaluate → Connect → Support → Communicate.

WHY AN INVESTIGATOR MIGHT CARE:
Useful when you do not yet know which part of the university ecosystem is for you. No company or disclosure is required merely to explore.

USEFUL WHEN:
- You do not know where in the university ecosystem you belong
- You want an institutional map before a specific program

NOT FOR (do not recommend when):
- Investigator-specific eligibility or a next experiment
- A substitute for OTM, ICTS, or a modality-specific program

ELIGIBILITY:
General WashU ecosystem resource.

CAVEATS:
- This is orientation. Route onward into OTM, funding, or a translational program.

ACADEMIC RETURNS:
- orientation
- discovery of the right door

PROBLEMS SOLVED:
- orientation
- discovery

SOURCE URLS:
- https://innovation.washu.edu/
- https://innovation.washu.edu/our-process/
- https://innovation.washu.edu/our-ecosystem/

---

