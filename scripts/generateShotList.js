import { generateDailyContent, resolveTargetDate } from "./contentFactory.js";

const targetDate = resolveTargetDate(process.argv[2] || "tomorrow");
const pack = generateDailyContent(targetDate);

console.log(`# Shot List for ${targetDate}`);
console.log("");
for (const shot of pack.shotList) {
  console.log(`- [ ] ${shot}`);
}
