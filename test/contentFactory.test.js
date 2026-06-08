import test from "node:test";
import assert from "node:assert/strict";
import { generateDailyContent, resolveTargetDate } from "../scripts/contentFactory.js";

test("resolves explicit dates", () => {
  assert.equal(resolveTargetDate("2026-06-09"), "2026-06-09");
});

test("generates a complete daily content pack", () => {
  const pack = generateDailyContent("2026-06-09");

  assert.ok(pack.hook.length > 0);
  assert.ok(pack.caption.length > 0);
  assert.ok(pack.cta.length > 0);
  assert.ok(pack.shotList.length >= 5);
  assert.ok(pack.imagePrompt.includes("Alex Danzig"));
  assert.ok(pack.reelPrompt.includes(pack.hook));
  assert.ok(pack.hashtags.includes("#AlexDanzig"));
  assert.ok(pack.score.total > 0);
});
