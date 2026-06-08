# Alex Danzig Content Factory

This repository is the Phase 2 content generation engine for Alex Danzig and VAGRANT IV.

It complements `Vagrant4/alex-danzig-instagram-engine`:

- `alex-danzig-instagram-engine`: strategy, planning, templates, weekly operations.
- `alex-danzig-content-factory`: generation, scoring, scripts, dashboards, and automation.

## What It Builds

- Daily content packs for Alex Danzig.
- Viral reel intelligence summaries from manual observations.
- Predictive content scores using a transparent weighted rubric.
- Captions, hashtags, image prompts, reel prompts, CTAs, and shot lists.
- Weekly Markdown dashboard from manually entered performance data.
- GitHub Actions automation for daily generation and weekly dashboard refresh.

## Brand Rule

Alex Danzig content should be 80% Alex personal brand and 20% VAGRANT IV product support.

Tone: premium, masculine, controlled, cinematic, gritty, confident.

Avoid fake analytics, fake scarcity, scraping claims, cringe influencer language, and Gen Z slang overload.

## Repository Structure

```text
/content
  Generated daily and weekly content packs.
/prompts
  Reusable prompt templates and style locks.
/scoring
  Rubric and scoring engine.
/scripts
  CLI scripts for generation, analysis, scoring, and dashboards.
/dashboard
  Weekly dashboard output.
/data
  Manual data inputs: brand profile, watchlists, observations, performance logs.
.github/workflows
  Daily and weekly automation.
```

## Quick Start

Run the test suite:

```bash
npm test
```

Generate tomorrow's content pack:

```bash
npm run generate:daily
```

Generate a weekly content pack:

```bash
npm run generate:weekly
```

Generate only the caption, hashtags, or shot list:

```bash
npm run generate:caption
npm run generate:hashtags
npm run generate:shot-list
```

Analyze viral reel observations:

```bash
npm run analyze:viral
```

Refresh the weekly dashboard:

```bash
npm run dashboard
```

Score a custom post:

```bash
node scripts/scorePost.js --hook "Meeting at 6. Road by 9." --caption "Business by day, road by night. Same standard." --cta "Visit VAGRANT IV through the profile."
```

## Data Inputs

All analytics are manual until real API integrations are approved.

- Edit `data/performance-log.json` with real Instagram and website metrics.
- Edit `data/viral-observations.json` with manually observed reel patterns.
- Edit `data/creator-watchlist.json` with creators to monitor.
- Edit `data/brand-profile.json` if Alex or VAGRANT IV positioning changes.

## Automation

The workflow `.github/workflows/content-factory.yml` runs:

- Daily content generation every day at 01:30 UTC.
- Viral analysis and dashboard refresh every Monday at 02:00 UTC.
- Manual runs through `workflow_dispatch`.

Generated files are committed back into the repository by GitHub Actions.
