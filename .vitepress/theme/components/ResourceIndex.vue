<template>
  <div class="resource-index">
    <div class="header">
      <h1 class="title">Resources</h1>
      <div class="meta" v-if="sorted.length">
        <span>{{ sorted.length }} total</span>
      </div>
    </div>

    <div class="filters">
      <label>
        Category
        <select v-model="activeCategory">
          <option value="">All categories</option>
          <option v-for="cat in categories" :key="cat.key" :value="cat.key">{{ cat.label }}</option>
        </select>
      </label>

      <label>
        Author
        <select v-model="activeAuthor">
          <option value="">All authors</option>
          <option v-for="author in authors" :key="author" :value="author">{{ author || "Unknown" }}</option>
        </select>
      </label>
    </div>

    <ul v-if="sorted.length" class="resource-list">
      <li v-for="item in sorted" :key="item.path" class="resource-row">
        <a :href="link(item.path)" class="resource-link">
          <img class="thumb" :src="thumbUrl(item)" :alt="`Thumbnail for ${item.title}`" @error="onThumbError($event)" />
          <div class="content">
            <div class="title-line">
              <span class="title">{{ item.title }}</span>
              <span class="score">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M13 3a3 3 0 0 1 2.995 2.824l.005 .176v4h2a3 3 0 0 1 2.98 2.65l.015 .174l.005 .176l-.02 .196l-1.006 5.032c-.381 1.626 -1.502 2.796 -2.81 2.78l-.164 -.008h-8a1 1 0 0 1 -.993 -.883l-.007 -.117l.001 -9.536a1 1 0 0 1 .5 -.865a2.998 2.998 0 0 0 1.492 -2.397l.007 -.202v-1a3 3 0 0 1 3 -3z" />
                  <path
                    d="M5 10a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-1a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-7a2 2 0 0 1 1.85 -1.995l.15 -.005h1z" />
                </svg>
                {{ displayScore(item) }}
              </span>
            </div>
            <div class="meta-row">
              <span>{{ categoryLabel(item.category) }}</span>
              <span v-if="item.author">· {{ item.author }}</span>
            </div>
            <div class="votes-row">
              <span class="pill">Weekly {{ item.votes_weekly ?? 0 }}</span>
              <span class="pill">Monthly {{ item.votes_monthly ?? 0 }}</span>
              <span class="pill">All-time {{ item.votes_all_time ?? 0 }}</span>
            </div>
          </div>
        </a>
      </li>
    </ul>

    <div v-else class="empty">No resources yet.</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { withBase } from "vitepress";
import resourcesData from "../../resources.json";

const CATEGORY_LABELS: Record<string, string> = {
  tools: "Tools & Software",
  learning: "Learning Resources",
  development: "Development",
  design: "Design & Creativity",
  research: "Research & Knowledge",
  building: "Building & Making",
  self: "Philosophy & Self",
  business: "Business & Strategy",
  community: "Community & Collaboration",
  misc: "Misc / Other",
};

type ResourceEntry = {
  title: string;
  path: string;
  category?: string | null;
  author?: string | null;
  createdAt?: string | null;
  link?: string | null;
  thumb?: string | null;
  votes_weekly?: number;
  votes_monthly?: number;
  votes_all_time?: number;
  discord_thread_id?: string | null;
};

type ResourcesPayload = { items: ResourceEntry[]; __meta?: { generated_at?: string; count?: number } };

const payload = (resourcesData as ResourcesPayload) || { items: [] };
const resources = ref<ResourceEntry[]>(Array.isArray(payload) ? (payload as any) : payload.items || []);
const activeCategory = ref("");
const activeAuthor = ref("");

const lastUpdated = payload.__meta?.generated_at
  ? new Date(payload.__meta.generated_at).toLocaleString()
  : null;

const categories = computed(() =>
  Array.from(new Set(resources.value.map((r) => r.category).filter(Boolean)))
    .map((key) => ({ key, label: CATEGORY_LABELS[key!] || key || "" }))
    .sort((a, b) => a.label.localeCompare(b.label))
);

const authors = computed(() =>
  Array.from(new Set(resources.value.map((r) => r.author).filter(Boolean))).sort()
);

const filtered = computed(() =>
  resources.value.filter(
    (r) =>
      (!activeCategory.value || r.category === activeCategory.value) &&
      (!activeAuthor.value || r.author === activeAuthor.value)
  )
);

const sorted = computed(() =>
  [...filtered.value].sort((a, b) => (b.votes_all_time ?? 0) - (a.votes_all_time ?? 0) || a.title.localeCompare(b.title))
);

const link = (path: string) => withBase(path);
const displayScore = (item: ResourceEntry) => item.votes_all_time ?? 0;
const categoryLabel = (key?: string | null) => (key ? CATEGORY_LABELS[key] || key : "");

function thumbUrl(item: ResourceEntry) {
  if (item.thumb) return item.thumb;
  if (item.link) return `https://v1.opengraph.11ty.dev/${encodeURIComponent(item.link)}/small/`;
  return "";
}

function onThumbError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = "";
  img.style.backgroundColor = "var(--vp-c-bg-soft)";
}
</script>

<style scoped>
.resource-index {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.title {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
}

.meta {
  display: inline-flex;
  gap: 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  font-weight: 500;
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}

.filters label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-weight: 600;
  font-size: 0.95rem;
}

.filters select {
  padding: 0.5rem 0.6rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  font-size: 1rem;
  font-weight: 500;
}

.resource-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.resource-row {
  padding: 0.8rem 0.95rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.resource-link {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 0.85rem;
  text-decoration: none;
  color: inherit;
  align-items: flex-start;
}

.thumb {
  width: 72px;
  height: 72px;
  border-radius: 10px;
  object-fit: contain;
  background-color: var(--vp-c-bg-soft);
  border: none;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.title-line {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
}

.title-line .title {
  font-weight: 700;
  font-size: 1.05rem;
}

.score {
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-2);
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.votes-row {
  display: flex;
  gap: 0.4rem;
  margin-top: 0.1rem;
}

.pill {
  padding: 0.18rem 0.45rem;
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.empty {
  padding: 0.75rem 1rem;
  border: 1px dashed var(--vp-c-border);
  border-radius: 10px;
  color: var(--vp-c-text-2);
}
</style>
