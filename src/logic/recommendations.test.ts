import { describe, expect, it } from "vitest";
import { nodesForIsolatedPath } from "../components/Journey/PathView";
import {
  isGuideComplete,
  primaryDestinationFor,
  recommend,
  wantsStartup,
} from "./recommendations";
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
    const nodes = nodesForIsolatedPath(route.nodeIds, "dest-research");
    const destIds = nodes.filter((n) => n.type === "destination").map((n) => n.id);
    expect(destIds).toEqual(["dest-research"]);
    expect(nodes.some((n) => n.id === "dest-funding")).toBe(false);
  });
});
