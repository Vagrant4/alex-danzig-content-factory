import { scoreContent } from "../scoring/scoreContent.js";

function getArg(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : "";
}

const content = {
  hook: getArg("hook") || "Meeting at 6. Road by 9.",
  caption: getArg("caption") || "Business by day, road by night. Same standard.",
  cta: getArg("cta") || "Visit VAGRANT IV through the profile.",
  shotList: [
    "Watch close-up",
    "Black VAGRANT tee",
    "Bike key",
    "Glove pull",
    "Roadside final frame"
  ],
  hashtags: ["#AlexDanzig", "#VAGRANTIV", "#ForTheStrong", "#MensStyle", "#StreetwearMen", "#MotorcycleLifestyle", "#BikerStyle", "#NightRide"]
};

const score = scoreContent(content);
console.log(`Predicted engagement score: ${score.total}/100`);
console.log(JSON.stringify(score.breakdown, null, 2));
