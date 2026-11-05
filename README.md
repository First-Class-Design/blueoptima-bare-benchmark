![BlueOptima BARE Benchmark](GitHub_bare-2026.png)

# BARE benchmark

The LLM Rankings page on [blueoptima.com](https://www.blueoptima.com/resources/llm-rankings). It shows how AI models perform at refactoring real production code.

Most of the page is native Webflow content. This repo holds the custom code: the chart, model selector and results table, plus the data behind them.

## Folder structure

| Path | Purpose |
| --- | --- |
| `bare-benchmark.html` | Local preview of the page |
| `css/` | Page styles and theme overrides |
| `js/` | Results config, page script and theme toggle |
| `webflow/` | Build script and generated embed snippets |
| `dev/` | Webflow CSS for the local preview only |
| `legacy/` | Original standalone page |

## Updating the results

Edit [js/bare-config.js](js/bare-config.js), then create a GitHub release with the next version number. The page loads the config from the latest release through jsDelivr:

```
https://cdn.jsdelivr.net/gh/First-Class-Design/blueoptima-bare-benchmark@latest/js/bare-config.js
```

The full process is in [WEBFLOW-CONFIG-TEXT.md](WEBFLOW-CONFIG-TEXT.md).

## Changing the code

Edit the files in `css`, `js` and `bare-benchmark.html`, run `node webflow/build.js`, then paste the changed snippets from `webflow` into their embeds on the page.
