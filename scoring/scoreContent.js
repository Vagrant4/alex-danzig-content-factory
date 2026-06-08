const weights = {
  hook: 25,
  shareability: 25,
  saveability: 20,
  brandFit: 15,
  cta: 15
};

function includesAny(text, terms) {
  const normalized = text.toLowerCase();
  return terms.some((term) => normalized.includes(term.toLowerCase()));
}

function clampScore(score) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function scoreHook(content) {
  const hook = content.hook || "";
  let score = 45;
  if (hook.length >= 12 && hook.length <= 70) score += 20;
  if (/[.!?]$/.test(hook)) score += 5;
  if (includesAny(hook, ["meeting", "road", "40", "uniform", "rain", "ambition", "strong"])) score += 20;
  if (hook.split(" ").length <= 10) score += 10;
  return clampScore(score);
}

export function scoreShareability(content) {
  const text = `${content.hook || ""} ${content.caption || ""} ${content.cta || ""}`;
  let score = 40;
  if (includesAny(text, ["send this", "comment", "which", "road", "rain", "meeting", "city"])) score += 25;
  if (includesAny(text, ["control", "discipline", "ambition", "standard", "pressure"])) score += 20;
  if ((content.shotList || []).length >= 5) score += 15;
  return clampScore(score);
}

export function scoreSaveability(content) {
  const text = `${content.hook || ""} ${content.caption || ""} ${content.cta || ""}`;
  let score = 35;
  if (includesAny(text, ["save", "fit", "guide", "breakdown", "rule", "uniform"])) score += 35;
  if ((content.shotList || []).length >= 5) score += 15;
  if ((content.hashtags || []).length >= 8) score += 15;
  return clampScore(score);
}

export function scoreBrandFit(content) {
  const text = `${content.hook || ""} ${content.caption || ""} ${content.cta || ""} ${(content.shotList || []).join(" ")}`;
  let score = 35;
  if (includesAny(text, ["Alex", "Danzig", "VAGRANT", "For the strong"])) score += 20;
  if (includesAny(text, ["black tee", "motorcycle", "boots", "gloves", "road", "city", "silver hair"])) score += 30;
  if (includesAny(text, ["premium", "controlled", "gritty", "standard", "uniform"])) score += 15;
  return clampScore(score);
}

export function scoreCta(content) {
  const cta = content.cta || "";
  let score = 30;
  if (cta.length >= 10 && cta.length <= 90) score += 20;
  if (includesAny(cta, ["follow", "save", "comment", "visit", "profile", "link", "send"])) score += 35;
  if (!includesAny(cta, ["buy now!!!", "limited time", "viral", "guaranteed"])) score += 15;
  return clampScore(score);
}

export function scoreContent(content) {
  const breakdown = {
    hook: scoreHook(content),
    shareability: scoreShareability(content),
    saveability: scoreSaveability(content),
    brandFit: scoreBrandFit(content),
    cta: scoreCta(content)
  };

  const total = Object.entries(weights).reduce((sum, [key, weight]) => {
    return sum + breakdown[key] * (weight / 100);
  }, 0);

  return {
    total: clampScore(total),
    breakdown,
    weights
  };
}
