<template>
  <main class="page">
    <header class="hero">
      <p class="eyebrow">Affective Computing Research Visualization</p>
      <h1>Emotion Paper Timeline</h1>
      <p class="intro">
        A data-driven timeline for dataset, method, and benchmark papers, built for image and future video emotion analysis.
      </p>
    </header>

    <section class="controls">
      <Tabs v-model="selectedType" />
      <ModalitySwitch v-model="selectedModality" />
      <SearchBox v-model="searchTerm" />
    </section>

    <section class="layout">
      <Timeline
        :papers="enhancedPapers"
        :selected-type="selectedType"
        :selected-modality="selectedModality"
        :search-term="searchTerm"
        @select-paper="selectedPaper = $event"
      />

      <PaperDetail :paper="selectedPaper" />
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import papers from '../data/papers.json';
import Tabs from '../components/Tabs.vue';
import ModalitySwitch from '../components/ModalitySwitch.vue';
import Timeline from '../components/Timeline.vue';
import PaperDetail from '../components/PaperDetail.vue';

import SearchBox from '../components/SearchBox.vue';

const selectedType = ref('All');
const selectedModality = ref('image');
const searchTerm = ref('');

// 在开发环境中将相对博客链接转换为本地或远程 URL。
// 优先映射到本地静态页面（由 vite 在 /public/blog/ 下直接托管），
// 这样只运行 `timeline-app` 时也能查看文章；如果未找到本地页面，回退到 Docusaurus 地址。
function getBlogUrl(slug) {
  if (!slug) return '#';
  if (slug.startsWith('http')) return slug;

  // 如果 slug 是 /blog/affectnet -> name = affectnet
  const m = slug.match(/\/blog\/(.+)$/);
  const name = m ? m[1].replace(/\/.*/, '') : slug.replace(/\//g, '');
  // 本地 viewer 页面会渲染 /blog/<name>.md
  return `/blog/viewer.html?slug=${encodeURIComponent(name)}`;
}

// 预处理所有论文，添加完整的博客 URL
const enhancedPapers = computed(() => 
  papers.map(paper => ({
    ...paper,
    blog: paper.blog ? {
      ...paper.blog,
      slug: getBlogUrl(paper.blog.slug),
    } : { enabled: false, slug: '' },
  }))
);

const selectedPaper = ref(enhancedPapers.value[0] ?? null);
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(180deg, #f8fbff 0%, #eef4fb 100%);
  color: #111827;
}

.hero {
  max-width: 960px;
  margin: 0 auto 2rem;
  text-align: center;
}

.eyebrow {
  margin: 0 0 0.6rem;
  color: #0f766e;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.78rem;
}

h1 {
  margin: 0;
  font-size: clamp(2.2rem, 5vw, 4rem);
  letter-spacing: -0.04em;
}

.intro {
  margin: 1rem auto 0;
  max-width: 60ch;
  color: #556070;
  line-height: 1.8;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(280px, 0.8fr);
  gap: 1.5rem;
  align-items: start;
  max-width: 1280px;
  margin: 0 auto;
}

@media (max-width: 980px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>