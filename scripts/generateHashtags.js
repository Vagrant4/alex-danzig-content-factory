import { generateDailyContent, resolveTargetDate } from "./contentFactory.js";

const targetDate = resolveTargetDate(process.argv[2] || "tomorrow");
const pack = generateDailyContent(targetDate);

console.log(`# Hashtags for ${targetDate}`);
console.log("");
console.log(pack.hashtags.join(" "));
