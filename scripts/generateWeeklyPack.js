import { generateDailyContent, renderDailyMarkdown, writeJson, writeText } from "./contentFactory.js";

const start = new Date();
const packs = [];

for (let index = 0; index < 7; index += 1) {
  const date = new Date(start);
  date.setUTCDate(date.getUTCDate() + index + 1);
  const targetDate = date.toISOString().slice(0, 10);
  packs.push(generateDailyContent(targetDate));
}

const weekStart = packs[0].date;
const weekEnd = packs[packs.length - 1].date;
const averageScore = Math.round(packs.reduce((sum, pack) => sum + pack.score.total, 0) / packs.length);

const markdown = `# Alex Danzig Weekly Content Pack

Week: ${weekStart} to ${weekEnd}

Average predicted engagement score: ${averageScore}/100

${packs.map((pack, index) => `## Day ${index + 1}: ${pack.date}

${renderDailyMarkdown(pack).replace(/^# .+\n\n/, "")}`).join("\n")}
`;

writeJson(`content/weekly-pack-${weekStart}.json`, { weekStart, weekEnd, averageScore, packs });
writeText(`content/weekly-pack-${weekStart}.md`, markdown);

console.log(`Generated weekly content pack for ${weekStart} to ${weekEnd}`);
