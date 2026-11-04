# Config-driven text on the LLM Rankings page

## TL;DR: updating the results

1. **Update the data.** Edit `models` and `updated` in [js/bare-config.js](js/bare-config.js), then push to GitHub with a short summary of what changed.
2. **Hand over the summary.** Pass it to whoever is responsible for the page.
3. **Review the messaging.** Check the wording around the numbers, plus the [figures to check by hand](#figures-to-check-by-hand). Make any changes in the Designer, and don't publish them yet.
4. **Create a GitHub release.** Use the next version, such as `v1.0.1`. This is the step that sends the data to the site, so do it only after the review.
5. **Publish any wording changes.** No Webflow publish is needed if the wording didn't change.

The chart, selector, table and calculated numbers all update from the new release, with no paste into Webflow.

**Timing:** a release isn't instant. With `@latest`, jsDelivr can take up to 12 hours to pick it up, and returning visitors can keep the old data for up to 7 days.

**Code changes:** a release only updates the config. Changes to the chart, selector, table or styles still need `node webflow/build.js` and a paste into their embeds.

## What this file covers

Almost all the text on the LLM Rankings page is plain Webflow text, edited in the Designer. This file lists the exceptions: native Webflow elements whose text is set by [js/bare-config.js](js/bare-config.js) when the page loads.

Editing these in the Designer has no lasting effect, because the script replaces them on load. Change them in the config instead.

The chart, model selector and results table are code embeds, so they aren't covered here.

## Text the config controls

These four show a placeholder in the Designer. The real text only appears on the published page.

| Where on the page | Element | Shows in the Designer | Change it in the config |
|---|---|---|---|
| Hero | Second Eyebrow Badge | `{date}` | `text.dateline`, which uses `updated` for the date |
| CTA | Heading | `{title}` | `text.ctaTitle` |
| CTA | Paragraph | `{body}` | `text.ctaBody` |
| CTA | Button | `{btn-txt}` | `text.ctaButton` |

Keep these placeholders exactly as they are in Webflow. The heading and paragraph are matched by their `data-text` attribute. The badge and button are matched by their placeholder text, so changing that text unlinks them from the config.

## Numbers the config controls

These numbers sit inside normal Webflow text. The surrounding words are yours to edit, but each number is in a tagged element, shown below in bold, that the script overwrites with a calculated value.

The Designer shows the value from the last edit, which may be out of date. The published page always shows the calculated value.

| Section | Text | `data-value` |
|---|---|---|
| Hero paragraph | BARE tests **102** AI coding tool models | `count` |
| Hero stats | **24.1**% | `top` |
| Hero stats | **102** | `count` |
| Hero stats | models tested from **11** developers | `devCount` |
| Hero stats | **8** | `nearTop` |
| Hero stats | models within **1** point of the top score | `tieBand` |
| Hero stats | **10**/20 | `chinaTop20` |
| 03 Findings, card 1 | **24.1**% | `top` |
| 03 Findings, card 1 | The leading score is **24.1**% | `top` |
| 03 Findings, card 2 | **28** | `nearTop2` |
| 03 Findings, card 3 | **78** | `genHigh` |
| 03 Findings, card 3 | of **102** return 90%+ of files | `count` |
| 04 Strategic implications, Strategy | **28** models sit within 2 points of the top score | `nearTop2` |
| 04 Strategic implications, Strategy | **10** of the top 20 come from developers headquartered in China | `chinaTop20` |
| 04 Strategic implications, Budget | Qwen3.8 27B scores **22.1**% | `score:Qwen3.8 27B` |

## Where each number comes from

All of these are worked out from `models` in the config, except `tieBand`, which is a setting.

| `data-value` | Meaning | Update it by |
|---|---|---|
| `count` | Number of models | Editing `models` |
| `top` | Highest refactoring success score | Editing `models` |
| `devCount` | Number of different AI labs | Editing `models` |
| `nearTop` | Models within `tieBand` points of the top score | Editing `models` or `tieBand` |
| `nearTop2` | Models within 2 points of the top score | Editing `models` |
| `genHigh` | Models returning 90% or more of files | Editing `models` |
| `chinaTop20` | Top 20 models from labs based in China | Editing `models` |
| `tieBand` | Points from the top score that count as the leading group | Editing `tieBand` |
| `score:Model name` | That model's success score | Editing `models` |

Three more numbers are available if you need them in new text: `chinaCount`, `openTop20` and `axisMax`.

## Editing in the Designer

- **To change a sentence:** edit the words around the number, and leave the tagged element in place.
- **To add a calculated number:** wrap the number in a Span and add a custom attribute named `data-value`, set to one of the names above. Put any `%` outside the Span.
- **If you delete and retype a number:** check the attribute is still there. Without it, the number becomes plain text and stops updating.
- **If a model is renamed:** update its `data-value` to match. A `score:` name that no longer matches anything stops updating and keeps its old number, with no error.

## Figures to check by hand

These are plain text, so the config doesn't update them. Check them at each results refresh.

| Section | Figure |
|---|---|
| Hero stats | "about 1 file in 4" |
| 03 Findings | "about 1 in 4 files", "~1 in 3", "about a third of the time" |
| 04 Strategic implications | "about 8 times", "roughly 2 points", "about 35%", "3.6%", "about 40%", "1.5%", "around 64 GPUs", "eight 8-GPU nodes" |
| 05 Method | Nine languages and seven checks |
