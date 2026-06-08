import { generateDailyContent, resolveTargetDate } from "./contentFactory.js";

const targetDate = resolveTargetDate(process.argv[2] || "tomorrow");
const pack = generateDailyContent(targetDate);

console.log(`# Caption for ${targetDate}`);
console.log("");
console.log(`Hook: ${pack.hook}`);
console.log("");
console.log(pack.caption);
console.log("");
console.log(`CTA: ${pack.cta}`);
