import { readJson, writeText } from "./contentFactory.js";

const log = readJson("data/performance-log.json");
const latest = log.weeks[log.weeks.length - 1];

function value(metric) {
  return metric === null || metric === undefined ? "[enter actual]" : String(metric);
}

const markdown = `# Alex Danzig Growth Dashboard

Last refreshed: ${new Date().toISOString()}

Data rule: no fake analytics. Placeholder values must be replaced only with verified Instagram, Meta Business Suite, or website analytics data.

## Current Week

- Week start: ${latest.weekStart}
- Followers: ${value(latest.followers)}
- Reach: ${value(latest.reach)}
- Profile visits: ${value(latest.profileVisits)}
- Website clicks: ${value(latest.websiteClicks)}
- VAGRANT IV conversions: ${value(latest.vagrantIvConversions)}

## Reel Performance

${latest.reelPerformance.length === 0 ? "- [enter real reel performance]" : latest.reelPerformance.map((reel) => `- ${reel.title}: ${value(reel.views)} views, ${value(reel.saves)} saves, ${value(reel.shares)} shares`).join("\n")}

## Best Post

${value(latest.bestPost)}

## Worst Post

${value(latest.worstPost)}

## Notes

${latest.notes}
`;

writeText("dashboard/weekly-performance-dashboard.md", markdown);
console.log("Generated weekly performance dashboard");
