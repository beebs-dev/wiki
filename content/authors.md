---
title: "Authors"
---

# Authors

Find entries by author.

<div v-if="authors.length === 0" class="empty">
  No entries yet. Share resources in <a href="https://beebs.dev/discord">Discord</a> and we'll publish them.
</div>

<div v-else class="author-list">
  <section v-for="author in authors" :key="author.name" class="author">
    <h2>{{ author.name }}</h2>
    <ul>
      <li v-for="page in author.pages" :key="page.url">
        <a :href="page.url">{{ page.title }}</a>
        <span class="meta">{{ categoryLabel(page.category) }}</span>
        <span class="meta" v-if="page.createdAt">· {{ formatDate(page.createdAt) }}</span>
      </li>
    </ul>
  </section>
</div>

<script setup lang="ts">
import { computed } from "vue";

const CATEGORY_LABELS: Record<string, string> = {
  tools: "Tools & Software",
  learning: "Learning Resources",
  development: "Development",
  design: "Design & Creativity",
  research: "Research & Knowledge",
  building: "Building & Making",
  self: "Philosophy and Self",
  business: "Business & Strategy",
  community: "Community & Collaboration",
  misc: "Misc / Other",
};

const EXCLUDE = new Set(["/", "/index", "/categories", "/authors"]);

const pages = Object.entries(import.meta.glob("./*.md", { eager: true }))
  .map(([path, mod]) => {
    const fm = (mod as any).frontmatter || {};
    const url = path === "./index.md" ? "/" : path.replace(/^\.\//, "/").replace(/\.md$/, "");
    return {
      title: fm.title || "Untitled",
      category: fm.category || "misc",
      author: fm.author || "Unknown",
      createdAt: fm.createdAt || null,
      url,
    };
  })
  .filter((p) => !EXCLUDE.has(p.url));

const authors = computed(() => {
  const map = new Map<string, typeof pages>();
  pages.forEach((p) => {
    if (!map.has(p.author)) map.set(p.author, []);
    map.get(p.author)!.push(p);
  });

  return Array.from(map.entries())
    .map(([name, pages]) => ({
      name,
      pages: pages.sort((a, b) => a.title.localeCompare(b.title)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
});

const categoryLabel = (key: string) => CATEGORY_LABELS[key] || key;

const formatDate = (value: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<style scoped>
.author-list {
  display: grid;
  gap: 1.25rem;
}

.author h2 {
  margin-bottom: 0.5rem;
}

.author ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.35rem;
}

.meta {
  margin-left: 0.35rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.empty {
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-border);
  border-radius: 8px;
  color: var(--vp-c-text-2);
}
</style>
