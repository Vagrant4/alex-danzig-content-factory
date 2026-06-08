# Alex Danzig Content Factory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a separate public GitHub repository that generates, scores, analyzes, and dashboards Alex Danzig Instagram content for VAGRANT IV.

**Architecture:** Use a dependency-free Node.js repository with JSON data inputs, reusable prompt Markdown, pure scoring functions, CLI scripts, generated Markdown/JSON outputs, and GitHub Actions automation. The system avoids fake analytics by requiring manual verified data in `/data`.

**Tech Stack:** Node.js 20+, built-in `node:test`, JSON data files, Markdown outputs, GitHub Actions.

---

### Task 1: Repository Foundation

**Files:**
- Create: `package.json`
- Create: `README.md`
- Create: `.gitignore`
- Create: `LICENSE`

- [x] **Step 1: Create Node repository metadata**

Create `package.json` with scripts for daily generation, weekly generation, viral analysis, scoring, dashboard refresh, and tests.

- [x] **Step 2: Document usage**

Create `README.md` explaining the split between the planning engine and this content factory, repository structure, data rules, and commands.

- [x] **Step 3: Add repository defaults**

Create MIT `LICENSE` and Node `.gitignore`.

### Task 2: Data And Prompts

**Files:**
- Create: `data/brand-profile.json`
- Create: `data/creator-watchlist.json`
- Create: `data/viral-observations.json`
- Create: `data/performance-log.json`
- Create: `prompts/alex-danzig-style-lock.md`
- Create: `prompts/daily-content-generator.md`
- Create: `prompts/viral-reel-analyzer.md`

- [x] **Step 1: Add brand profile**

Create a structured Alex Danzig and VAGRANT IV brand profile with tone, visual direction, avoid list, and 90-day content ratios.

- [x] **Step 2: Add manual watchlists**

Create creator watchlist placeholders for male fashion, biker, streetwear founder, and luxury lifestyle creators.

- [x] **Step 3: Add viral observation inputs**

Create 20 manual observation records with hooks, structures, CTAs, priorities, and verified-metric placeholders.

- [x] **Step 4: Add prompt templates**

Create reusable style lock, daily generator, and viral analyzer prompts.

### Task 3: Scoring Engine

**Files:**
- Create: `scoring/rubric.json`
- Create: `scoring/scoreContent.js`
- Create: `test/scoreContent.test.js`

- [x] **Step 1: Define weighted rubric**

Use Hook 25, Shareability 25, Saveability 20, Brand Fit 15, CTA 15.

- [x] **Step 2: Implement pure scoring functions**

Create deterministic scoring functions for hook, shareability, saveability, brand fit, and CTA.

- [x] **Step 3: Test strong and weak content**

Use Node's built-in test runner to verify strong Alex/VAGRANT IV content scores above 80 and weak generic content stays below strong-candidate range.

### Task 4: Generation Scripts

**Files:**
- Create: `scripts/contentFactory.js`
- Create: `scripts/generateDailyContent.js`
- Create: `scripts/generateWeeklyPack.js`
- Create: `scripts/generateCaption.js`
- Create: `scripts/generateHashtags.js`
- Create: `scripts/generateShotList.js`
- Create: `scripts/analyzeViralReels.js`
- Create: `scripts/scorePost.js`
- Create: `scripts/generateDashboard.js`
- Create: `test/contentFactory.test.js`

- [x] **Step 1: Implement shared content factory helpers**

Create date resolution, JSON IO, content idea selection, image prompt generation, reel prompt generation, hashtag generation, and Markdown rendering.

- [x] **Step 2: Implement daily and weekly generation**

Generate Markdown and JSON content packs under `/content`.

- [x] **Step 3: Implement dedicated caption, hashtag, and shot-list generators**

Create focused CLI scripts that output only the caption package, hashtag set, or shoot checklist for a selected date.

- [x] **Step 4: Implement viral analysis**

Extract top 20 hooks, top 20 structures, and top 20 CTA styles from manual observation data.

- [x] **Step 5: Implement dashboard refresh**

Generate a weekly dashboard from `data/performance-log.json`.

- [x] **Step 6: Test content generation**

Verify the content pack includes hook, caption, CTA, shot list, image prompt, reel prompt, hashtags, and scoring output.

### Task 5: Automation

**Files:**
- Create: `.github/workflows/content-factory.yml`

- [x] **Step 1: Add scheduled workflow**

Run daily content generation every day and weekly pack/dashboard/viral analysis every Monday.

- [x] **Step 2: Add test gate**

Run `npm test` before generated outputs are committed.

- [x] **Step 3: Commit generated outputs**

Configure GitHub Actions bot commit for `/content` and `/dashboard`.
