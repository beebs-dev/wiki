# Knowledge Base

VitePress site that lists Discord-submitted resources. Resource markdown lives in `content/resources/*.md` with frontmatter fields for `discord_thread_id` and vote counts.

- Auto index: `npm run generate:resources` builds `.vitepress/resources.json` for the `ResourceIndex` Vue component.
- Votes history: `data/votes.json` is written by the Discord updater in `../discord-resources/scripts/updateVotes.js`.
- Build: `npm run build` (runs the generator first via `prebuild`).

To add a new resource manually, drop a markdown file under `content/resources/` with the required frontmatter and re-run the generator.
