#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");
const fg = require("fast-glob");
const matter = require("gray-matter");

const ROOT = path.resolve(__dirname, "..");
const RESOURCES_DIR = path.join(ROOT, "content", "resources");
const OUTPUT_PATH = path.join(ROOT, ".vitepress", "resources.json");

async function generateResourcesJson() {
  const files = await fg(["**/*.md"], { cwd: RESOURCES_DIR, dot: false });

  const entries = [];

  for (const file of files) {
    if (/^index\.md$/i.test(path.basename(file))) continue;

    const absolutePath = path.join(RESOURCES_DIR, file);
    const raw = await fs.readFile(absolutePath, "utf8");
    const parsed = matter(raw);

    const slug = normalizeSlug(file);
    const title = parsed.data.title || slug;

    entries.push({
      title,
      path: `/resources/${slug}`,
      votes_weekly: parsed.data.votes_weekly ?? 0,
      votes_monthly: parsed.data.votes_monthly ?? 0,
      votes_all_time: parsed.data.votes_all_time ?? 0,
    });
  }

  entries.sort((a, b) => a.title.localeCompare(b.title));

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(entries, null, 2));

  return entries;
}

function normalizeSlug(file) {
  const withoutExt = file.replace(/\\/g, "/").replace(/\.md$/, "");
  return withoutExt.replace(/\/$/, "");
}

if (require.main === module) {
  generateResourcesJson().catch((error) => {
    console.error("Failed to generate resources.json", error);
    process.exitCode = 1;
  });
}

module.exports = { generateResourcesJson };
