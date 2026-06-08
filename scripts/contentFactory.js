import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { scoreContent } from "../scoring/scoreContent.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");

export const paths = {
  root: repoRoot,
  data: join(repoRoot, "data"),
  content: join(repoRoot, "content"),
  dashboard: join(repoRoot, "dashboard")
};

export function readJson(relativePath) {
  return JSON.parse(readFileSync(join(repoRoot, relativePath), "utf8"));
}

export function writeText(relativePath, value) {
  const target = join(repoRoot, relativePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, value);
  return target;
}

export function writeJson(relativePath, value) {
  return writeText(relativePath, `${JSON.stringify(value, null, 2)}\n`);
}

export function toIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

export function resolveTargetDate(input = "tomorrow") {
  const now = new Date();
  if (input === "today") return toIsoDate(now);
  if (input === "tomorrow") {
    const tomorrow = new Date(now);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    return toIsoDate(tomorrow);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return input;
  throw new Error(`Unsupported date input: ${input}`);
}

const contentCycle = [
  {
    type: "Motorcycle reel",
    primaryPillar: "Motorcycle / biker lifestyle",
    secondaryPillar: "VAGRANT IV streetwear fits",
    hook: "Meeting at 6. Road by 9.",
    caption: "Business by day, road by night. The uniform stays honest: black tee, cargos, boots, gloves, and enough control to let the city do the talking.",
    cta: "Follow for controlled streetwear and road discipline.",
    shotList: [
      "Watch close-up leaving a meeting",
      "Black VAGRANT tee under blazer",
      "Bike key in hand",
      "Glove pull beside motorcycle",
      "Roadside final frame under city light"
    ]
  },
  {
    type: "Founder/business clip",
    primaryPillar: "Founder journey",
    secondaryPillar: "Businessman off-duty",
    hook: "Build the brand. Wear the brand.",
    caption: "The standard starts before the camera turns on: samples, fit checks, edits, and the discipline to reject anything soft.",
    cta: "Follow the build behind VAGRANT IV.",
    shotList: [
      "Laptop with product notes",
      "Garment sample on table",
      "Alex checking fit in mirror",
      "Camera setup detail",
      "Final editorial frame"
    ]
  },
  {
    type: "Streetwear fit check",
    primaryPillar: "Streetwear fits",
    secondaryPillar: "Mature male fashion",
    hook: "40 is not old. It is edited.",
    caption: "Mature streetwear is not about dressing younger. It is about removing noise until only shape, weight, and posture are left.",
    cta: "Save this before your next black tee fit.",
    shotList: [
      "Front fit check",
      "Side profile",
      "Tee drape close-up",
      "Boot detail",
      "Final walk away"
    ]
  },
  {
    type: "Lifestyle/editorial photo",
    primaryPillar: "Singapore / Manila urban grit",
    secondaryPillar: "Lifestyle editorial",
    hook: "Rain makes the fit honest.",
    caption: "Wet pavement. Heavy boots. Black tee. No costume, no performance, just a city uniform that holds up.",
    cta: "Singapore rain or Manila concrete?",
    shotList: [
      "Wet pavement reflection",
      "Boot step under streetlight",
      "Black tee texture",
      "Silver hair rim light",
      "Portrait beside concrete wall"
    ]
  },
  {
    type: "VAGRANT IV product post",
    primaryPillar: "Product support",
    secondaryPillar: "Streetwear fits",
    hook: "This is not a graphic tee. It is a uniform.",
    caption: "The piece works because it does not beg. It carries weight, shape, and a message that belongs on the road.",
    cta: "Visit the VAGRANT IV link in bio.",
    shotList: [
      "Fabric close-up",
      "Shoulder fit",
      "Logo or graphic detail",
      "Full outfit with boots",
      "Profile-link story frame"
    ]
  },
  {
    type: "Motivational discipline content",
    primaryPillar: "Discipline, survival, ambition",
    secondaryPillar: "Founder journey",
    hook: "Ambition gets cleaner when you stop performing it.",
    caption: "No announcement. No noise. Just the work, the road, and the standard you come back to every day.",
    cta: "Send this to someone rebuilding.",
    shotList: [
      "Desk note in low light",
      "Helmet on table",
      "Black tee laid out",
      "Door exit",
      "Quiet road frame"
    ]
  }
];

export function selectContentIdea(targetDate) {
  const dayIndex = Math.floor(Date.parse(`${targetDate}T00:00:00Z`) / 86400000);
  return contentCycle[dayIndex % contentCycle.length];
}

export function buildImagePrompt(idea, brandProfile) {
  return [
    "Ultra-realistic editorial street photography of Alex Danzig,",
    `${brandProfile.person.age}-year-old Singaporean businessman-model,`,
    "silver or bleached wavy hair, mature sharp face, rugged premium streetwear and biker energy,",
    "visible neck tattoo with 4 when natural,",
    idea.shotList.join(", "),
    "black VAGRANT oversized tee, denim or black cargo pants, Timberland yellow boots, gloves,",
    "Singapore or Manila night city grit, cinematic controlled masculine mood"
  ].join(" ");
}

export function buildReelPrompt(idea) {
  return `Create a 20-second Instagram reel for Alex Danzig using the hook "${idea.hook}". Structure the reel around these shots: ${idea.shotList.join(" -> ")}. Keep the tone premium, masculine, controlled, cinematic, gritty, and confident. End with this CTA: "${idea.cta}"`;
}

export function buildHashtags(idea) {
  const common = ["#AlexDanzig", "#VAGRANTIV", "#ForTheStrong", "#MensStyle", "#StreetwearMen"];
  const byPillar = {
    "Motorcycle / biker lifestyle": ["#MotorcycleLifestyle", "#BikerStyle", "#NightRide"],
    "Founder journey": ["#FounderLife", "#BuildTheBrand", "#EntrepreneurStyle"],
    "Streetwear fits": ["#StreetwearFit", "#DarkStreetwear", "#OversizedTee"],
    "Singapore / Manila urban grit": ["#SingaporeStreetwear", "#ManilaStreetwear", "#UrbanMenswear"],
    "Product support": ["#VagrantStreetwear", "#StreetUniform", "#UtilityWear"],
    "Discipline, survival, ambition": ["#Discipline", "#Ambition", "#MasculineStyle"]
  };
  return [...common, ...(byPillar[idea.primaryPillar] || [])];
}

export function generateDailyContent(targetDate) {
  const brandProfile = readJson("data/brand-profile.json");
  const idea = selectContentIdea(targetDate);
  const pack = {
    date: targetDate,
    contentType: idea.type,
    primaryPillar: idea.primaryPillar,
    secondaryPillar: idea.secondaryPillar,
    hook: idea.hook,
    caption: idea.caption,
    cta: idea.cta,
    shotList: idea.shotList,
    imagePrompt: buildImagePrompt(idea, brandProfile),
    reelPrompt: buildReelPrompt(idea),
    hashtags: buildHashtags(idea)
  };
  return {
    ...pack,
    score: scoreContent(pack)
  };
}

export function renderDailyMarkdown(pack) {
  return `# Alex Danzig Daily Content Pack: ${pack.date}

## Content

- Type: ${pack.contentType}
- Primary pillar: ${pack.primaryPillar}
- Secondary pillar: ${pack.secondaryPillar}
- Predicted engagement score: ${pack.score.total}/100

## Hook

${pack.hook}

## Caption

${pack.caption}

## CTA

${pack.cta}

## Shot List

${pack.shotList.map((shot) => `- [ ] ${shot}`).join("\n")}

## Image Prompt

${pack.imagePrompt}

## Reel Prompt

${pack.reelPrompt}

## Hashtags

${pack.hashtags.join(" ")}

## Score Breakdown

| Metric | Score | Weight |
| --- | ---: | ---: |
| Hook | ${pack.score.breakdown.hook} | 25 |
| Shareability | ${pack.score.breakdown.shareability} | 25 |
| Saveability | ${pack.score.breakdown.saveability} | 20 |
| Brand fit | ${pack.score.breakdown.brandFit} | 15 |
| CTA | ${pack.score.breakdown.cta} | 15 |

## Notes

No analytics are assumed. Add real performance data after publishing.
`;
}
