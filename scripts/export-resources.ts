import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  RESOURCE_CATALOG_PATH,
  RESOURCE_CSV_PATH,
  RESOURCE_KB_DIR,
  buildResourceCatalog,
  catalogToCsv,
  resourceToMarkdown,
} from "../src/logic/exportResources";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function catalogVersion(): string {
  const pkg = JSON.parse(
    readFileSync(join(root, "package.json"), "utf8"),
  ) as { version?: string };
  return pkg.version ?? "0.0.0";
}

export function writeResourceCatalog(rootDir = root): {
  json: string;
  csv: string;
  kbDir: string;
  count: number;
} {
  const publicDir = join(rootDir, "public");
  const kbDir = join(publicDir, RESOURCE_KB_DIR);
  const catalog = buildResourceCatalog(catalogVersion());

  mkdirSync(publicDir, { recursive: true });
  rmSync(kbDir, { recursive: true, force: true });
  mkdirSync(kbDir, { recursive: true });

  const jsonPath = join(publicDir, RESOURCE_CATALOG_PATH);
  const csvPath = join(publicDir, RESOURCE_CSV_PATH);
  writeFileSync(jsonPath, `${JSON.stringify(catalog, null, 2)}\n`);
  writeFileSync(csvPath, catalogToCsv(catalog));

  for (const resource of catalog.resources) {
    writeFileSync(
      join(kbDir, `${resource.id}.md`),
      resourceToMarkdown(resource, catalog),
    );
  }

  return {
    json: jsonPath,
    csv: csvPath,
    kbDir,
    count: catalog.resourceCount,
  };
}

const invokedDirectly = /export-resources/.test(process.argv[1] ?? "");

if (invokedDirectly) {
  const written = writeResourceCatalog();
  console.log(
    `Exported ${written.count} resources → ${written.json}, ${written.csv}, ${written.kbDir}/`,
  );
}
