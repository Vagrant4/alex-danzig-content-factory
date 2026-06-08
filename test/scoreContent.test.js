import test from "node:test";
import assert from "node:assert/strict";
import { scoreContent } from "../scoring/scoreContent.js";

test("scores a strong Alex Danzig post above 80", () => {
  const score = scoreContent({
    hook: "Meeting at 6. Road by 9.",
    caption: "Alex Danzig moves from business to motorcycle road discipline in a black VAGRANT tee, boots, gloves, and city light.",
    cta: "Save this fit and visit VAGRANT IV through the profile.",
    shotList: ["Watch close-up", "Black tee", "Bike key", "Glove pull", "Roadside final frame"],
    hashtags: ["#AlexDanzig", "#VAGRANTIV", "#ForTheStrong", "#MensStyle", "#StreetwearMen", "#MotorcycleLifestyle", "#BikerStyle", "#NightRide"]
  });

  assert.equal(score.weights.hook, 25);
  assert.ok(score.total >= 80);
});

test("keeps low-context content below strong candidate range", () => {
  const score = scoreContent({
    hook: "New post",
    caption: "Look at this.",
    cta: "Buy now!!!",
    shotList: [],
    hashtags: []
  });

  assert.ok(score.total < 75);
});
