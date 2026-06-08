import { generateDailyContent, renderDailyMarkdown, resolveTargetDate, writeJson, writeText } from "./contentFactory.js";

const targetDate = resolveTargetDate(process.argv[2] || "tomorrow");
const pack = generateDailyContent(targetDate);

writeJson(`content/${targetDate}-content-pack.json`, pack);
writeText(`content/${targetDate}-content-pack.md`, renderDailyMarkdown(pack));

console.log(`Generated content pack for ${targetDate}`);
console.log(`Predicted engagement score: ${pack.score.total}/100`);
