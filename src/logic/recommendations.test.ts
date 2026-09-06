import { describe, expect, it } from "vitest";
import { nodesForIsolatedPath, stepsForRegion } from "../components/Journey/PathView";
import {
  isGuideComplete,
  primaryDestinationFor,
  recommend,
  wantsStartup,
} from "./recommendations";
import {
  formatNotNeeded,
  nextMovesForDestination,
  rankResourcesForAnswers,
  resolveChecklistResource,
  resourceFitsAsset,
  routeForDestination,
} from "./nextMoves";
import {
  shouldShowVehicleBridge,
  VEHICLE_BRIDGE_ID,
} from "./vehicleBridge";
import type { GuideAnswers, Route } from "../types/navigator";
import { resourceById, routes } from "../data";

function answers(partial: Partial<GuideAnswers>): GuideAnswers {
  return {
    destinations: ["research-impact"],
    motivations: ["papers"],
    asset: "idea",
    involvement: "research-focus",
    ...partial,
  };
}

describe("isGuideComplete", () => {
  it("requires all four answers", () => {
    expect(
      isGuideComplete({
        destinations: ["funding"],
        motivations: ["grants"],
        asset: "idea",
      }),
    ).toBe(false);
    expect(
      isGuideComplete({
        destinations: ["funding"],
        motivations: ["grants"],
        asset: "idea",
        involvement: "advise",
      }),
    ).toBe(true);
  });
});

describe("recommend", () => {
  it("uses destination answers for the primary endpoint", () => {
    const research = recommend(
      answers({
        destinations: ["research-impact"],
        motivations: ["papers", "collaborators"],
        asset: "evidence",
        involvement: "research-focus",
      }),
    );
    const funding = recommend(
      answers({
        destinations: ["funding"],
        motivations: ["grants"],
        asset: "evidence",
        involvement: "research-focus",
      }),
    );

    expect(research.destinationIds[0]).toBe("dest-research");
    expect(funding.destinationIds[0]).toBe("dest-funding");
    expect(research.routeIds[0]).toBe("strengthen-research");
    expect(funding.routeIds[0]).toBe("strengthen-research");
  });

  it("uses asset answers for current stage", () => {
    const early = recommend(answers({ asset: "observation" }));
    const disclosed = recommend(answers({ asset: "disclosed" }));

    expect(early.currentStateId).toBe("s0");
    expect(disclosed.currentStateId).toBe("s5");
  });

  it("uses motivations to favor distribution when reach is primary", () => {
    const reach = recommend(
      answers({
        destinations: ["distribution"],
        motivations: ["reach"],
        asset: "research-tool",
        involvement: "advise",
      }),
    );
    expect(reach.routeIds[0]).toBe("research-tool-adoption");
    expect(reach.destinationIds[0]).toBe("dest-distribution");
  });

  it("uses involvement to suppress startup when the user wants research focus", () => {
    const founder = recommend(
      answers({
        destinations: ["startup"],
        motivations: ["financial"],
        asset: "prototype",
        involvement: "founder",
      }),
    );
    const stayFaculty = recommend(
      answers({
        destinations: ["startup", "licensing"],
        motivations: ["low-time", "patients"],
        asset: "device",
        involvement: "research-focus",
      }),
    );

    expect(founder.routeIds[0]).toBe("startup");
    expect(wantsStartup(["startup"], "research-focus")).toBe(false);
    expect(stayFaculty.routeIds[0]).not.toBe("startup");
    expect(stayFaculty.destinationIds[0]).toBe("dest-licensing");
  });

  it("uses the answers to choose and explain resources, not the first stage resource", () => {
    const therapeutic = recommend(
      answers({
        destinations: ["clinical-use"],
        motivations: ["patients", "grants"],
        asset: "therapeutic",
        involvement: "advise",
      }),
    );
    const firstMove = therapeutic.nextMoves[0];
    const resource = firstMove?.resourceId
      ? resourceById[firstMove.resourceId]
      : undefined;

    expect(resource?.id).not.toBe("neurotech-hub");
    expect(resource?.domains).toContain("therapeutic");
    expect(firstMove?.resourceReason).toContain("Matched to your answers");
    expect(resource?.companyRequired).toBe(false);
    const resourceIds = therapeutic.nextMoves
      .map((move) => move.resourceId)
      .filter(Boolean);
    expect(new Set(resourceIds).size).toBe(resourceIds.length);
  });
});

describe("primaryDestinationFor", () => {
  it("prefers the user's destination on multi-endpoint routes", () => {
    const route = routes.find((item) => item.id === "strengthen-research")!;
    expect(
      primaryDestinationFor(route, answers({ destinations: ["research-impact"] })),
    ).toBe("dest-research");
    expect(
      primaryDestinationFor(route, answers({ destinations: ["funding"] })),
    ).toBe("dest-funding");
  });
});

describe("nodesForIsolatedPath", () => {
  it("keeps only the focused destination", () => {
    const route = routes.find((item) => item.id === "strengthen-research") as Route;
    const pathNodes = nodesForIsolatedPath(route.nodeIds, "dest-research");
    const destIds = pathNodes
      .filter((n) => n.type === "destination")
      .map((n) => n.id);
    expect(destIds).toEqual(["dest-research"]);
    expect(pathNodes.some((n) => n.id === "dest-funding")).toBe(false);
  });
});

const pathWithBridge = ["s7", VEHICLE_BRIDGE_ID, "s8", "dest-startup"];

describe("vehicle bridge visibility", () => {
  it("hides the bridge when startup or licensing already answers the vehicle question", () => {
    expect(shouldShowVehicleBridge("dest-startup")).toBe(false);
    expect(shouldShowVehicleBridge("dest-licensing")).toBe(false);
    expect(
      nodesForIsolatedPath(pathWithBridge, "dest-startup").map((n) => n.id),
    ).toEqual(["s7", "s8", "dest-startup"]);
    expect(
      nodesForIsolatedPath(
        ["s7", VEHICLE_BRIDGE_ID, "s8", "dest-licensing"],
        "dest-licensing",
      ).map((n) => n.id),
    ).toEqual(["s7", "s8", "dest-licensing"]);
  });

  it("retains the bridge for distribution (vehicle still unresolved)", () => {
    expect(shouldShowVehicleBridge("dest-distribution")).toBe(true);
    expect(
      nodesForIsolatedPath(
        ["s7", VEHICLE_BRIDGE_ID, "s8", "dest-distribution"],
        "dest-distribution",
      ).map((n) => n.id),
    ).toEqual(["s7", VEHICLE_BRIDGE_ID, "s8", "dest-distribution"]);
  });

  it("startup and device-license routes highlight the spine, not the fork", () => {
    const startup = routes.find((r) => r.id === "startup") as Route;
    expect(startup.nodeIds).not.toContain(VEHICLE_BRIDGE_ID);
    expect(startup.nodeIds).toEqual(["s7", "s8", "dest-startup"]);
    expect(startup.edgeIds).toContain("e-s7-s8");
    expect(startup.edgeIds).not.toContain("e-s7-vehicle");

    const license = routes.find((r) => r.id === "device-license") as Route;
    expect(license.nodeIds).not.toContain(VEHICLE_BRIDGE_ID);
    expect(license.edgeIds).toContain("e-s7-s8");
    expect(license.edgeIds).not.toContain("e-s7-vehicle");
    expect(license.edgeIds).not.toContain("e-vehicle-s8");
  });
});

describe("stepsForRegion", () => {
  it("keeps Choose how it reaches users out of De-risk (not under s7)", () => {
    const items = stepsForRegion("de-risk");
    const ids = items.map((item) => item.node.id);
    expect(ids).toContain("s7");
    expect(ids).not.toContain("ms-license-vs-startup");
  });

  it("places the vehicle bridge in Translate before Path to users defined (full journey)", () => {
    const items = stepsForRegion("translate");
    expect(items.map((item) => item.node.id)).toEqual([
      "ms-license-vs-startup",
      "s8",
    ]);
    expect(items[0]?.bridge).toBe(true);
    expect(items[0]?.indented).toBe(false);
    expect(items[1]?.indented).toBe(false);
  });

  it("places optional milestones under the states they branch from", () => {
    const items = stepsForRegion("develop");
    const ids = items.map((item) => item.node.id);
    expect(ids.indexOf("ms-validate-need")).toBe(ids.indexOf("s3") + 1);
    expect(ids.indexOf("ms-preserve-ip")).toBe(ids.indexOf("s3") + 2);
  });
});

describe("checklist resource integration", () => {
  it("hides Needleman when the invention is not a therapeutic", () => {
    expect(
      resourceFitsAsset(resourceById["needleman-npic"]!, "device"),
    ).toBe(false);
    expect(
      resourceFitsAsset(resourceById["ninds-devices"]!, "therapeutic"),
    ).toBe(false);
    expect(
      resourceFitsAsset(resourceById["needleman-npic"]!, "therapeutic"),
    ).toBe(true);
  });

  it("overrides modality-locked clinical fallbacks for device inventors", () => {
    const moves = nextMovesForDestination(
      "dest-clinical",
      answers({
        destinations: ["clinical-use"],
        asset: "device",
        motivations: ["patients"],
      }),
    );
    const resourceIds = moves.map((move) => move.resourceId);
    expect(resourceIds).not.toContain("needleman-npic");
    // NINDS Devices may fit a device inventor; Needleman must not.
    for (const id of resourceIds) {
      if (!id) continue;
      expect(resourceFitsAsset(resourceById[id]!, "device")).toBe(true);
    }
  });

  it("does not suggest NINDS Devices for software inventors", () => {
    const moves = nextMovesForDestination(
      "dest-clinical",
      answers({
        destinations: ["clinical-use"],
        asset: "software",
        motivations: ["patients"],
      }),
    );
    expect(moves.map((move) => move.resourceId)).not.toContain("ninds-devices");
    expect(moves.map((move) => move.resourceId)).not.toContain("needleman-npic");
  });

  it("keeps the checklist fallback when no invention type is known", () => {
    const resolved = resolveChecklistResource(
      "needleman-npic",
      undefined,
      new Set(),
    );
    expect(resolved.resourceId).toBe("needleman-npic");
    expect(resolved.overridden).toBe(false);
  });

  it("selects clinical routes from invention type rather than the therapeutic default", () => {
    expect(
      routeForDestination(
        "dest-clinical",
        answers({ destinations: ["clinical-use"], asset: "device" }),
      )?.id,
    ).toBe("device-license");
    expect(
      routeForDestination(
        "dest-clinical",
        answers({ destinations: ["clinical-use"], asset: "therapeutic" }),
      )?.id,
    ).toBe("therapeutic");
  });

  it("formats notNeeded as You don’t / You don’t need to", () => {
    expect(formatNotNeeded("need a company first.")).toBe(
      "You don’t need a company first.",
    );
    expect(formatNotNeeded("form a startup solely because an invention exists.")).toBe(
      "You don’t need to form a startup solely because an invention exists.",
    );
  });
});

const NEW_SUPPORT_IDS = [
  "center-drug-discovery",
  "center-clinical-studies",
  "icts-regulatory-support",
  "trial-care",
  "mhealth-research-core",
  "jroc",
  "healthcare-innovation-lab",
  "siteman-sip-rda",
  "ecrc",
] as const;

const GATED_SPECIALISTS = [
  "trial-care",
  "mhealth-research-core",
  "healthcare-innovation-lab",
  "jroc",
  "siteman-sip-rda",
  "ecrc",
] as const;

describe("contextual support doors", () => {
  it("registers the new resource IDs without new destination nodes", () => {
    for (const id of NEW_SUPPORT_IDS) {
      expect(resourceById[id]?.type).toBe("resource");
    }
  });

  it("locks CDD to therapeutics", () => {
    expect(
      resourceFitsAsset(resourceById["center-drug-discovery"]!, "device"),
    ).toBe(false);
    expect(
      resourceFitsAsset(resourceById["center-drug-discovery"]!, "therapeutic"),
    ).toBe(true);
  });

  it("does not treat Needleman or NINDS as generic clinical checklist fallbacks", () => {
    const moves = nextMovesForDestination(
      "dest-clinical",
      undefined,
      "s6",
    );
    expect(moves.map((move) => move.resourceId)).toEqual([
      "center-clinical-studies",
      "icts-regulatory-support",
      "icts",
    ]);
  });

  it("produces different resource sets for therapeutic, device, digital-health, multicenter-trial, industry-collaboration, cancer, and emergency-care", () => {
    const clinical: Pick<GuideAnswers, "destinations" | "motivations" | "involvement"> = {
      destinations: ["clinical-use"],
      motivations: ["patients"],
      involvement: "advise",
    };

    const therapeutic = rankResourcesForAnswers(
      answers({ ...clinical, asset: "therapeutic" }),
      "s6",
    );
    const device = rankResourcesForAnswers(
      answers({ ...clinical, asset: "device" }),
      "s6",
    );
    const digital = rankResourcesForAnswers(
      answers({
        ...clinical,
        asset: "software",
        researchContexts: ["digital-health"],
      }),
      "s6",
    );
    const multicenter = rankResourcesForAnswers(
      answers({
        ...clinical,
        asset: "therapeutic",
        researchContexts: ["multicenter-trial"],
      }),
      "s6",
    );
    const industry = rankResourcesForAnswers(
      answers({
        ...clinical,
        asset: "device",
        researchContexts: ["industry-collaboration"],
      }),
      "s4",
    );
    const cancer = rankResourcesForAnswers(
      answers({
        ...clinical,
        asset: "therapeutic",
        researchContexts: ["cancer"],
      }),
      "s6",
    );
    const emergency = rankResourcesForAnswers(
      answers({
        ...clinical,
        asset: "device",
        researchContexts: ["emergency-care"],
      }),
      "s6",
    );

    expect(therapeutic).toContain("center-drug-discovery");
    expect(therapeutic).not.toEqual(expect.arrayContaining(["ecrc"]));
    expect(therapeutic).not.toEqual(
      expect.arrayContaining(["siteman-sip-rda", "trial-care", "mhealth-research-core"]),
    );

    expect(device).not.toContain("center-drug-discovery");
    expect(device).not.toContain("needleman-npic");
    expect(device.some((id) =>
      ["center-clinical-studies", "icts-regulatory-support", "ninds-devices"].includes(id),
    )).toBe(true);

    expect(digital).toContain("mhealth-research-core");
    expect(digital).not.toContain("center-drug-discovery");
    expect(digital).not.toContain("ecrc");

    expect(multicenter).toContain("trial-care");
    expect(industry).toContain("jroc");
    expect(cancer).toContain("siteman-sip-rda");
    expect(emergency).toContain("ecrc");

    const signatures = [
      therapeutic,
      device,
      digital,
      multicenter,
      industry,
      cancer,
      emergency,
    ].map((ids) => ids.join("|"));
    expect(new Set(signatures).size).toBe(signatures.length);
  });

  it("does not dump every specialized clinical core onto a generic s6 therapeutic inventor", () => {
    const ranked = rankResourcesForAnswers(
      answers({
        destinations: ["clinical-use"],
        asset: "therapeutic",
        motivations: ["patients"],
        involvement: "advise",
      }),
      "s6",
    );
    const gatedHits = GATED_SPECIALISTS.filter((id) => ranked.includes(id));
    expect(gatedHits).toEqual([]);
  });
});
