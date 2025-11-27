<template>
  <div class="resource-index">
    <div class="controls">
      <label for="resource-sort">Sort by</label>
      <select id="resource-sort" v-model="mode">
        <option value="alpha">A–Z</option>
        <option value="weekly">Top Weekly</option>
        <option value="monthly">Top Monthly</option>
        <option value="all">Top All-Time</option>
      </select>
    </div>

    <ul v-if="sorted.length" class="resource-list">
      <li v-for="item in sorted" :key="item.path" class="resource-row">
        <a :href="link(item.path)" class="resource-link">
          <span class="title">{{ item.title }}</span>
          <span class="score">⭐ {{ displayScore(item) }}</span>
        </a>
        <div class="meta">
          <span>Weekly {{ item.votes_weekly ?? 0 }}</span>
          <span>Monthly {{ item.votes_monthly ?? 0 }}</span>
          <span>All-time {{ item.votes_all_time ?? 0 }}</span>
        </div>
      </li>
    </ul>

    <div v-else class="empty">No resources yet.</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { withBase } from "vitepress";
import resourcesData from "../../resources.json";

type ResourceEntry = {
  title: string;
  path: string;
  votes_weekly?: number;
  votes_monthly?: number;
  votes_all_time?: number;
};

const mode = ref<"alpha" | "weekly" | "monthly" | "all">("alpha");
const resources = ref<ResourceEntry[]>(resourcesData as ResourceEntry[]);

const sorted = computed(() => {
  const items = [...resources.value];
  switch (mode.value) {
    case "weekly":
      return items.sort(byNumber("votes_weekly"));
    case "monthly":
      return items.sort(byNumber("votes_monthly"));
    case "all":
      return items.sort(byNumber("votes_all_time"));
    default:
      return items.sort((a, b) => a.title.localeCompare(b.title));
  }
});

const link = (path: string) => withBase(path);
const displayScore = (item: ResourceEntry) => item.votes_all_time ?? 0;

function byNumber<K extends keyof ResourceEntry>(key: K) {
  return (a: ResourceEntry, b: ResourceEntry) => (b[key] ?? 0) - (a[key] ?? 0) || a.title.localeCompare(b.title);
}
</script>

<style scoped>
.resource-index {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.controls {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

select {
  padding: 0.45rem 0.65rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
}

.resource-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.resource-row {
  padding: 0.85rem 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.resource-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.score {
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-2);
}

.meta {
  margin-top: 0.35rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.empty {
  padding: 0.75rem 1rem;
  border: 1px dashed var(--vp-c-border);
  border-radius: 10px;
  color: var(--vp-c-text-2);
}
</style>
