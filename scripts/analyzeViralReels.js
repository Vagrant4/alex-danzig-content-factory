import { readJson, writeJson, writeText } from "./contentFactory.js";

const source = readJson("data/viral-observations.json");
const observations = [...source.observations].sort((a, b) => b.priority - a.priority);

const topHooks = observations.slice(0, 20).map((item) => item.hook);
const topStructures = observations.slice(0, 20).map((item) => item.structure);
const topCtas = observations.slice(0, 20).map((item) => item.cta);

const report = {
  generatedAt: new Date().toISOString(),
  sourceNote: source.notes,
  topHooks,
  topStructures,
  topCtas
};

const markdown = `# Viral Reel Intelligence

Generated at: ${report.generatedAt}

Source note: ${report.sourceNote}

## Top 20 Viral Hooks

${topHooks.map((hook, index) => `${index + 1}. ${hook}`).join("\n")}

## Top 20 Reel Structures

${topStructures.map((structure, index) => `${index + 1}. ${structure}`).join("\n")}

## Top 20 CTA Styles

${topCtas.map((cta, index) => `${index + 1}. ${cta}`).join("\n")}

## Usage

Use these as structural inspiration only. Do not copy another creator's exact creative expression.
`;

writeJson("content/viral-reel-intelligence.json", report);
writeText("content/viral-reel-intelligence.md", markdown);

console.log("Generated viral reel intelligence report");
