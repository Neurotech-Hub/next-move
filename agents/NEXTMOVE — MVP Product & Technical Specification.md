# NEXTMOVE at WashU
## MVP Product & Technical Specification

**Working title:** NEXTMOVE (formerly Innovation Navigator)  
**Initial audience:** Washington University in St. Louis faculty and academic inventors, initially emphasizing neuroscience and biomedical innovation  
**Deployment target:** GitHub Pages  
**Application type:** Static, client-side web application  
**Primary experience:** Interactive visual innovation roadmap

---

# 1. Product vision

Build a beautiful, modern, exploratory web application that helps an academic inventor answer:

> **Where am I, where could this go, and what should I do next?**

NEXTMOVE should make the broader innovation landscape visible rather than hiding it behind a questionnaire or linear wizard.

An investigator may arrive without knowing:

- whether they have an "invention"
- whether they should disclose something
- whether they need a patent
- whether commercialization is relevant
- whether they want to start a company
- what resources exist
- what their next useful milestone should be

The application should let them **explore possibilities visually**, while optionally helping identify their current position and illuminating relevant routes.

The fundamental philosophy is:

> **Patents and startups are vehicles, not destinations.**

The navigator begins with the investigator's desired impact and academic motivations, then identifies possible paths and vehicles.

---

# 2. Product principles

## 2.1 Show the landscape

Do not hide the innovation process behind a wizard.

The main interface should expose the broader innovation landscape immediately.

Users should be able to see:

- where innovation can begin
- major stages of development
- possible destinations
- branching pathways
- alternate routes
- relevant resources
- their current position
- possible next steps

The map itself should teach users what is possible.

---

## 2.2 Guide without restricting

The application has two complementary behaviors:

### Explore

The user browses the innovation landscape freely.

### Guide Me

The user answers a small number of questions and the **same map responds** by highlighting:

- likely current position
- potentially relevant destinations
- recommended paths
- useful next steps

Guidance must never replace the landscape.

Unrecommended possibilities should generally become visually quieter rather than disappear.

---

# 3. Design references

## roadmap.sh — information architecture

Primary reference for presenting a large conceptual roadmap while allowing individual nodes to be explored.

Borrow:

- visible overall roadmap
- paths and branches
- clickable nodes
- obvious progression
- clear hierarchy
- progress/current-state concepts

Do not reproduce its developer-centric aesthetic.

---

## Brilliant — visual language

Primary reference for polish.

Borrow:

- restrained but warm visual design
- large typography
- generous whitespace
- friendly cards
- subtle dimensionality
- polished micro-interactions
- approachable language
- sophisticated rather than institutional tone

The result should feel closer to a modern educational/product application than a university administrative website.

---

# 4. Core UX metaphor

The interface is an **innovation landscape**.

It is not:

- a questionnaire
- a conventional flowchart
- an infinite whiteboard
- a process checklist
- a resource directory

It is a bounded two-dimensional environment containing recognizable regions, paths, milestones and destinations.

Users move through the landscape conceptually, not by dragging objects.

---

# 5. Main information architecture

The landscape should broadly progress from left to right:

**Discover → Develop → De-risk → Translate → Impact**

These are conceptual regions rather than rigid sequential stages.

Example:

```text
DISCOVER              DEVELOP              DE-RISK

Idea ───── Evidence ───── Prototype ───── Validation
  ╲                         │                  │
   Discovery                │             External
                            │              feedback
                            │                  │
                            └────── IP ────────┘


                     TRANSLATE

          ┌────────────┼─────────────┐
          │            │             │
       Research     Industry      Clinical
         use        partnership   translation
          │            │             │
          └────────────┼─────────────┘

                        IMPACT

          Scientific / Clinical / Societal
             Licensing / Venture / etc.
```

This diagram is illustrative only.

The actual map should be driven by structured application data.

---

# 6. Regions

Initial top-level regions:

1. **Discover**
2. **Develop**
3. **De-risk**
4. **Translate**
5. **Impact**

Regions should have visible spatial boundaries.

Do not render them as heavy swimlane rectangles.

Prefer:

- subtle background surfaces
- gentle gradients
- large region labels
- soft borders
- slight tonal differences
- generous padding

The user should immediately understand that nodes belong to conceptual territories.

---

# 7. Node taxonomy

Do not individually design every node.

Create a small reusable component system.

MVP should require approximately **four node types**.

## 7.1 State node

Represents the maturity/state of an innovation.

Examples:

- Observation
- Idea
- Discovery
- Initial evidence
- Proof of concept
- Working prototype
- Validated technology
- Translational asset

---

## 7.2 Milestone/action node

Represents something that can advance the innovation.

Examples:

- Validate
- Define unmet need
- Preserve IP options
- Seek external feedback
- Generate de-risking evidence
- Find development partner

---

## 7.3 Resource node

Represents a specific program or resource.

Examples might eventually include:

- OTM
- Domain Expert Program
- Gap Fund
- Needleman Program
- Skandalaris programs
- regional resources

Resource nodes should be visually subordinate to conceptual nodes.

The map should explain innovation first and institutional bureaucracy second.

---

## 7.4 Destination node

Represents an outcome the inventor may actually value.

Examples:

- Strengthen my research
- Fund the next stage
- Used by other scientists
- Industry adoption
- Clinical use
- Patient impact
- Licensed product
- Build a company

Destination nodes should be visually distinctive and inviting.

They answer:

> **What could this become?**

---

# 8. Data model

All map content must live outside the UI components.

Preferred structure:

```text
src/
  data/
    nodes.json
    edges.json
    regions.json
    resources.json
```

Alternatively, TypeScript data files may be used if preferable.

Example conceptual node:

```json
{
  "id": "working-prototype",
  "type": "state",
  "region": "develop",
  "title": "Working Prototype",
  "shortDescription": "You have something that works under at least some conditions.",
  "position": {
    "x": 720,
    "y": 340
  },
  "tags": [
    "device",
    "software",
    "research-tool"
  ],
  "details": {
    "whyItMatters": "...",
    "questions": [],
    "nextSteps": []
  }
}
```

A resource should use a standardized schema:

```json
{
  "id": "example-resource",
  "type": "resource",
  "title": "Program Name",
  "organization": "Organization",
  "url": "...",
  "internality": "washu",
  "domains": [],
  "states": [],
  "problemsSolved": [],
  "whatYouGet": "...",
  "whyYouMightCare": "...",
  "eligibility": "...",
  "requiresDisclosure": false,
  "requiresCompany": false,
  "funding": null,
  "caveats": [],
  "sourceUrls": []
}
```

The research report will eventually populate this dataset.

---

# 9. Maintainability requirement

**Adding or changing content must not require redesigning the interface.**

A maintainer should be able to:

1. add a node to the data
2. specify its region
3. connect it to existing node IDs
4. supply its content
5. optionally supply a position
6. rebuild/deploy

The application should then use existing components and styles automatically.

Do not create one-off React components for individual programs.

---

# 10. Layout strategy

For MVP, favor a **curated but constrained layout** rather than fully automatic graph generation.

The overall geography should remain predictable.

Each node may therefore have stored X/Y coordinates.

However:

- nodes cannot be dragged by users
- regions constrain where nodes appear
- common node dimensions should be standardized
- edges should route automatically
- adding nodes should require minimal adjustment

Automatic layout may later be applied per region.

Do not use a force-directed layout.

The map should feel intentionally designed rather than constantly reorganizing itself.

---

# 11. First-load experience

On load, show the landscape immediately.

Do not begin with a modal questionnaire.

Header:

# NEXTMOVE

Supporting copy:

> **Where could your idea go?**

or similar.

Below/adjacent:

**Explore the landscape**

and a prominent secondary action:

**Help me find where I am**

The user should be able to start clicking the map immediately.

---

# 12. Orientation controls

Provide a compact floating control surface.

Suggested controls:

**Explore**  
**Guide me**  
**Reset**

Potential additional controls:

- Search
- Zoom in
- Zoom out
- Fit map

Avoid diagramming-tool controls that imply the user is editing the graph.

---

# 13. Guide Me experience

Guide Me should be lightweight.

Do not create a 15-question wizard.

Ask approximately 3–5 high-information questions.

Possible questions:

### What do you have?

- An observation or problem
- An idea
- Experimental evidence
- A working prototype
- Software/algorithm
- Therapeutic candidate
- Device/diagnostic
- Research tool/reagent
- An invention already disclosed
- I'm not sure

### What would make this worth pursuing?

Allow multiple selections:

- Strengthen my research
- Generate new funding
- Support people in my lab
- Publish or create new research directions
- Get this used by other scientists
- Find an industry partner
- Reach patients
- License it without running a company
- Build a company
- I'm not sure yet

### How involved do you want to be in translation?

- Keep my focus primarily on research
- Advise/collaborate but don't run it
- Open to becoming more involved
- Interested in founding/leading something
- Not sure

Potential fourth question:

### What is the biggest uncertainty?

- Does it really work?
- Who needs it?
- Is it novel/protectable?
- How do I fund development?
- How does it reach users?
- Regulatory/clinical path
- I don't know

---

# 14. Guide Me result

Do not navigate to a results page.

The landscape transforms.

### Current position

One node receives a strong:

**YOU ARE HERE**

indicator.

### Relevant routes

Approximately 1–3 routes become emphasized.

### Relevant destinations

Likely outcomes glow or receive increased visual weight.

### Other possibilities

Remain visible but fade substantially.

Example:

> **You're likely here: Working Prototype**

> Based on what you've told us, these routes may be worth exploring.

The highlighted map itself is the recommendation.

---

# 15. Route visualization

A route is an ordered or partially ordered set of nodes/edges.

Example:

```text
Working Prototype
      ↓
Define User Need
      ↓
External Validation
      ↓
Preserve IP Options
      ↓
De-risk Technology
      ↓
Industry Partner
      ↓
License
      ↓
Broad Adoption
```

A different user with the same prototype might receive:

```text
Working Prototype
      ↓
Validation
      ↓
Research Distribution
      ↓
More Labs Using Tool
      ↓
Publications / Collaborations
```

This distinction is central to the product.

---

# 16. Route behavior

Highlighted route:

- stronger edge
- increased opacity
- subtle glow/accent
- emphasized nodes

Alternative relevant route:

- medium emphasis

Unrelated map:

- low opacity but still visible

Never completely remove the surrounding landscape unless necessary for accessibility/mobile presentation.

---

# 17. Node interaction

Clicking a node should **not navigate away from the map**.

Open a right-side detail drawer on desktop.

On mobile, use a bottom sheet/full-height drawer.

Map remains visible behind it.

---

# 18. Node detail panel

State/milestone node:

**Title**

One-sentence explanation.

### Why this matters

Plain-language explanation.

### You may be here if…

Short indicators.

### Useful next steps

2–4 options.

### Where this can lead

Linked destination/next nodes.

### Resources that can help

Relevant WashU/regional resources.

---

# 19. Resource detail panel

Every resource uses the same template:

**Program / resource**

Organization

Short description.

### Useful when

Explain the relevant situation.

### What you get

Funding, expertise, introductions, development, facilities, etc.

### Why you might care

Frame this explicitly from an academic investigator's perspective.

Examples:

- supports personnel
- generates validation data
- strengthens grant applications
- provides expertise the lab lacks
- increases likelihood of adoption
- connects to industry
- reduces development risk

### What you need first

Prerequisites.

### You do NOT necessarily need to…

Useful misconceptions.

Example:

> You do not need to start a company.

### Where this could lead

Possible subsequent states.

### Details

Eligibility, funding, timing, caveats.

### Learn more

External link to official source.

---

# 20. Progressive disclosure

The map must remain readable even with substantial content.

Use three information levels.

### Zoomed out

Show:

- regions
- major states
- destinations
- major pathways

### Normal

Show:

- state nodes
- milestone nodes
- selected major resources

### Selected/detail

Show:

- explanatory content
- resource cards
- next-step actions

Do not attempt to put detailed program descriptions directly on the map.

---

# 21. Resource visibility

Do not place every WashU program permanently on the primary landscape.

That would turn the application into an organizational chart.

Instead:

**Conceptual pathway first. Resources second.**

Example:

```text
Prototype
    ↓
Generate de-risking evidence
    ↓
Validated asset
```

Selecting:

**Generate de-risking evidence**

may reveal:

- Gap Fund
- relevant translational grants
- engineering resources
- domain-specific programs

Resources are tools available at that transition.

---

# 22. Search

MVP should include simple client-side search.

Search:

- concepts
- resources
- outcomes
- technologies

Examples:

> patent

> software

> clinical

> funding

> startup

> prototype

Results should select/highlight relevant nodes rather than navigating to a separate search-results page.

---

# 23. Technology/domain filtering

Optional for MVP, but data model must support:

- therapeutic
- medical device
- diagnostic
- software
- research tool
- reagent
- algorithm/data
- clinical workflow
- general discovery

Filters should emphasize relevant pathways rather than deleting everything else.

---

# 24. Academic motivation layer

The navigator must explicitly recognize academic returns.

Potential motivations:

- publications
- preliminary data
- new grant aims
- research funding
- personnel support
- new collaborations
- trainee opportunities
- scientific recognition
- broader research adoption
- clinical impact
- licensing income
- equity
- entrepreneurship

These should influence recommendations.

Do not frame commercial outcomes as inherently superior.

---

# 25. Language

Avoid institutional jargon whenever possible.

Bad:

> Commercialization readiness assessment

Better:

> Is this ready for someone outside your lab?

Bad:

> Entrepreneurial pathway

Better:

> Build a company around it

Bad:

> Technology transfer

Better when appropriate:

> Find a partner who can take it further

Institutional terminology may appear inside resource descriptions where necessary.

---

# 26. Visual design

Target:

**Brilliant-level friendliness + roadmap.sh-level information clarity.**

The visual design should feel:

- new
- intelligent
- calm
- scientific
- optimistic
- tactile
- premium
- approachable

Avoid:

- corporate dashboard aesthetic
- heavy WashU branding
- dense administrative UI
- neon cyberpunk
- gratuitous glassmorphism
- excessive gradients
- giant animated backgrounds
- traditional flowchart styling

---

# 27. Visual system

Use a restrained design system.

### Typography

Modern sans-serif.

Prefer an open/web-safe font with excellent readability.

Use approximately:

- Display
- H1
- H2
- Body
- Small/metadata

Avoid excessive type scales.

### Surfaces

Use:

- off-white/light neutral base
- very subtle region surfaces
- white/light cards
- soft borders
- restrained shadows
- rounded corners

### Accent

WashU red may appear as an accent/identity cue, but the interface should not become a red university website.

Use semantic route/state accents sparingly.

### Motion

Use motion to explain state changes:

- route illumination
- drawer entrance
- node selection
- map focus
- subtle hover response

Typical transition target:

150–300 ms.

No decorative looping animation.

---

# 28. Node visual states

Every node component should support:

```text
default
hover
selected
recommended
current
completed
dimmed
```

`current` / YOU ARE HERE should be unmistakable.

`recommended` should be prominent without competing with current position.

---

# 29. Responsive behavior

## Desktop

Primary target.

Large bounded map with right-side detail drawer.

## Tablet

Maintain map interaction with reduced detail.

## Mobile

Do not attempt to squeeze the entire desktop graph onto the screen.

Allow:

- pan
- zoom
- focus-on-route
- bottom-sheet details
- optional simplified route view

Mobile users should still understand that a broader landscape exists.

---

# 30. Accessibility

Minimum target: WCAG AA where practical.

Requirements:

- keyboard-selectable nodes
- visible focus states
- semantic labels
- sufficient contrast
- route meaning not encoded solely by color
- reduced-motion support
- accessible drawer
- descriptive labels for map controls

A user must be able to understand the recommended route without relying exclusively on spatial position.

---

# 31. Technical architecture

Recommended:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Flow / `@xyflow/react`
- Lucide icons
- lightweight client state only

Avoid a backend for MVP.

Do not add:

- database
- authentication
- CMS
- analytics dependency
- AI API
- server functions

unless separately requested.

---

# 32. Why React Flow

Use React Flow as a **rendering/interaction engine**, not as the visual design.

Hide/disable editing behaviors.

Needed capabilities:

- pan
- zoom
- fit view
- custom nodes
- custom edges
- groups/regions
- controlled positions
- node selection
- viewport control

Users should never feel like they are inside a diagram editor.

---

# 33. Content architecture

Separate:

```text
UI
│
├── map renderer
├── node components
├── detail drawer
├── guide interface
└── search/filter

DATA
│
├── regions
├── nodes
├── edges
├── routes
└── resources

LOGIC
│
├── recommendation rules
├── route highlighting
├── filtering
└── state management
```

Do not mix WashU program content into React components.

---

# 34. Recommendation engine

MVP does **not** require AI.

Use transparent deterministic rules.

Example:

```text
IF asset = prototype
AND motivation includes clinical-impact
AND involvement = academic-only

THEN
current_state = working-prototype

prioritize:
validation
clinical-need
de-risking
industry-partner
license

deprioritize:
founder-training
startup-formation
```

Store these rules in a dedicated configuration file.

The application should later be able to replace or supplement this logic with an AI layer without rebuilding the interface.

---

# 35. URL state

Where practical, encode selected node/route in URL query/hash state.

Examples conceptually:

```text
/#node=working-prototype
/#goal=clinical-impact
/#route=license-device
```

This allows:

- sharing
- linking directly to resources
- browser navigation
- faculty sending pathways to colleagues

Do not require a server router.

---

# 36. GitHub Pages

Application must build as a static site.

Configure Vite appropriately for project-level GitHub Pages deployment.

Provide:

```text
.github/workflows/deploy.yml
```

Deployment should occur automatically when `main` is updated.

No server-side runtime may be required.

---

# 37. Suggested repository structure

```text
next-move/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Map/
│   │   ├── Nodes/
│   │   ├── Drawer/
│   │   ├── Guide/
│   │   ├── Search/
│   │   └── UI/
│   │
│   ├── data/
│   │   ├── regions.ts
│   │   ├── nodes.ts
│   │   ├── edges.ts
│   │   ├── routes.ts
│   │   └── resources.ts
│   │
│   ├── logic/
│   │   ├── recommendations.ts
│   │   └── filters.ts
│   │
│   ├── types/
│   │   └── navigator.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── README.md
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

# 38. MVP content scope

Do not wait until the complete WashU ecosystem dataset is ready.

Build the interface using approximately:

- 5 regions
- 12–18 conceptual nodes
- 5–8 destinations
- 5–10 placeholder/initial resources
- 4–6 example routes

This is sufficient to evaluate the interaction model.

Content can then expand without redesign.

---

# 39. Example MVP routes

Include several routes specifically to prove that the graph is not simply a commercialization funnel.

### Research tool → scientific adoption

```text
Working Tool
→ Validate
→ Make Reproducible
→ Distribution Strategy
→ Other Labs Use It
→ Scientific Reach
```

### Device → license without entrepreneurship

```text
Prototype
→ Validate Need
→ Preserve Options
→ De-risk
→ Industry Interest
→ License
→ Product Adoption
```

### Therapeutic

```text
Discovery
→ Mechanistic Evidence
→ Candidate
→ Translational Validation
→ Drug Development
→ Partner / Venture
→ Clinical Development
```

### Startup

```text
Validated Asset
→ Market Need
→ Protect/Position
→ Team
→ Company
→ Financing
→ Development
```

### Strengthen research

```text
Discovery
→ New Capability
→ Preliminary Evidence
→ Collaborators
→ Grant Opportunity
→ New Research Program
```

---

# 40. Existing OTM Inventor Companion

The existing invention-disclosure interview is a **module**, not the navigator itself.

It belongs at a transition such as:

```text
Potentially valuable invention
        ↓
Preserve / understand options
        ↓
Prepare to talk with OTM
        ↓
[Invention Interview Helper]
        ↓
OTM disclosure / case-manager conversation
```

Do not reproduce the full disclosure interview inside the map.

The navigator should explain:

- why someone might disclose
- when it may be useful
- what preserving options accomplishes
- what may happen afterward

Then offer the disclosure helper as a focused tool.

---

# 41. Landing copy

Keep copy extremely short.

Possible initial structure:

**NEXTMOVE**

# Where could your idea go?

Explore the paths from discovery to scientific, clinical and real-world impact — and find the resources that can help you get there.

**[Explore the map]**  
**[Help me find where I am]**

Then immediately show the landscape.

Do not place a long institutional introduction above the map.

---

# 42. Empty/exploration state

When nothing is selected, the map should feel inviting rather than unfinished.

Consider a subtle prompt:

> **Start anywhere.**

> Select something you have, something you want, or simply explore.

Possible starting nodes and destinations may gently emphasize on first load.

---

# 43. Important conceptual distinction

The application must maintain three separate concepts:

## Motivation

**Why is this worth my time?**

Examples: scientific reach, funding, patient impact.

## Outcome

**What would success actually look like?**

Examples: other laboratories use the tool; a company manufactures the device.

## Vehicle

**How might we get there?**

Examples: patent, grant, license, industry partnership, startup.

Never present vehicles as if they are inherently the desired outcome.

---

# 44. Success criteria for MVP

A first-time faculty user should be able to answer within approximately 60 seconds:

1. **What kinds of paths exist?**
2. **Roughly where am I?**
3. **Where could this go?**
4. **What might my next useful step be?**
5. **What WashU resource might help?**

The user should not need to understand technology-transfer terminology to accomplish this.

---

# 45. MVP acceptance criteria

The MVP is complete when:

- the full innovation landscape renders on desktop
- users can pan/zoom but not rearrange it
- regions are visually recognizable
- nodes are generated from data
- clicking a node opens its detail drawer
- routes can be highlighted
- non-selected routes remain visible
- Guide Me identifies a plausible current state
- Guide Me highlights recommended routes
- reset restores the landscape
- search can locate/select a node
- resource cards support external URLs
- mobile experience is usable
- content can be changed without changing components
- application builds without a backend
- GitHub Actions successfully deploys to GitHub Pages

---

# 46. Explicit non-goals for MVP

Do not build:

- accounts
- saved projects
- confidential invention intake
- invention disclosure submission
- chatbot
- generative AI recommendations
- collaborative editing
- graph editing
- drag/drop authoring
- administrative CMS
- automated web scraping
- personalized dashboards

These can be considered later.

The first product needs to prove one thing exceptionally well:

> **Can we make the innovation ecosystem understandable by letting an investigator see where they are, explore where they could go, and understand the routes between the two?**

---

# 47. Developer priority order

Build in this order:

1. Static landscape
2. Visual design system
3. Reusable node components
4. Node detail drawer
5. Route highlighting
6. Guide Me interaction
7. Resource integration
8. Search
9. Responsive behavior
10. Polish/micro-interactions
11. GitHub Pages deployment

Do not begin by implementing every known WashU resource.

First make the **landscape interaction feel excellent**.

---

# 48. Final design test

At every design decision ask:

> **Does this help the investigator understand the landscape, or does it merely add interface?**

Prefer fewer components, fewer controls, fewer colors and fewer words.

The sophistication should come from how intelligently the map responds to the user—not from visual complexity.

The desired first reaction is:

> **“Oh—I can see where I am, and I didn't realize these were all possible paths.”**