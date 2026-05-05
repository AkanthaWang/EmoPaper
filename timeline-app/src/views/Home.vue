<template>
  <main class="page">
    <section class="hero-shell">
      <header class="hero">
        <div class="hero-copy">
          <p class="eyebrow">Affective Computing Intelligence Hub</p>
          <h1>情感计算研究全景总览</h1>
          <p class="intro">
            以更清晰的视觉层次整合数据集、方法与基准论文，用统一入口完成全量浏览、趋势感知、重点定位与条目联动分析。
          </p>

          <div class="hero-actions">
            <div class="hero-pill">
              <span class="pill-label"><strong>{{ totalCount }}</strong>  全量条目</span>
              
            </div>
            <div class="hero-pill">
              <span class="pill-label"><strong>{{ filteredCount }}</strong>  当前可见</span>
              
            </div>
            <div class="hero-pill">
              <span class="pill-label"><strong>{{ latestYear }}</strong>  最新年份</span>
            </div>
          </div>
        </div>

        <div class="hero-stage">
          <div class="signal-card lead">
            <p class="signal-kicker">What You Can Do</p>
            <strong>全量浏览</strong>
            <span>从数据集、方法到基准结果，统一放进一个连续的研究视图里。</span>
          </div>
          <div class="signal-card">
            <p class="signal-kicker">Why It Helps</p>
            <strong>趋势感知</strong>
            <span>沿时间线快速捕捉研究重心如何迁移和扩展。</span>
          </div>
          <div class="signal-card">
            <p class="signal-kicker">Interaction</p>
            <strong>联动阅读</strong>
            <span>筛选、点击与详情面板实时同步，减少反复跳转。</span>
          </div>
          <div class="constellation">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
    </section>

    <section class="dashboard-strip">
      <article class="insight-card feature-card">
        <p class="section-kicker">Reading Guide</p>
        <h2>先建立全局，再进入筛选与时间线细读</h2>
        <p>
          这一屏不再重复罗列相同指标，而是把“理解研究版图”和“进入具体条目”分成两步：先看全局摘要，再用筛选和时间线缩小范围。
        </p>
      </article>

      <article class="insight-card stat-card" v-for="metric in heroMetrics" :key="metric.label">
        <p class="metric-label">{{ metric.label }}</p>
        <strong class="metric-value">{{ metric.value }}</strong>
        <span class="metric-note">{{ metric.note }}</span>
      </article>
    </section>

    <section class="filters-panel">
      <div class="filters-head">
        <div>
          <p class="section-kicker">Filter Console</p>
          <h2>筛选控制台</h2>
        </div>
        <p class="filters-summary">{{ activeFilterSummary }}</p>
      </div>

      <div class="filters-grid">
        <div class="control-card">
          <span class="control-label">论文类型</span>
          <Tabs v-model="selectedType" />
        </div>
        <div class="control-card">
          <span class="control-label">数据模态</span>
          <ModalitySwitch v-model="selectedModality" />
        </div>
        <div class="control-card search-card">
          <span class="control-label">关键词检索</span>
          <SearchBox v-model="searchTerm" />
        </div>
      </div>
    </section>

    <section class="story-grid">
      <aside class="rail-card distribution-card">
        <div class="rail-head">
          <p class="section-kicker">Distribution</p>
          <h2>数据分布</h2>
        </div>

        <div class="stack-group">
          <div class="stack-block">
            <span class="stack-title">类型构成</span>
            <div class="distribution-list">
              <div v-for="item in typeDistribution" :key="item.label" class="distribution-item">
                <div>
                  <strong>{{ item.label }}</strong>
                  <span>{{ item.ratio }}</span>
                </div>
                <b>{{ item.value }}</b>
              </div>
            </div>
          </div>

          <div class="stack-block">
            <span class="stack-title">模态覆盖</span>
            <div class="distribution-list">
              <div v-for="item in modalityDistribution" :key="item.label" class="distribution-item">
                <div>
                  <strong>{{ item.label }}</strong>
                  <span>{{ item.ratio }}</span>
                </div>
                <b>{{ item.value }}</b>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div class="timeline-panel">
        <div class="panel-head">
          <div>
            <p class="section-kicker">Timeline View</p>
            <h2>研究演进时间线</h2>
          </div>
          <p class="panel-note">按年份查看关键研究条目，点击卡片可联动右侧详情</p>
        </div>

        <Timeline
          :papers="enhancedPapers"
          :selected-type="selectedType"
          :selected-modality="selectedModality"
          :search-term="searchTerm"
          sort-order="year-desc"
          @select-paper="selectedPaper = $event"
        />
      </div>

      <PaperDetail :paper="selectedPaper" :result-count="filteredCount" />
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import papers from '../data/papers.json';
import Tabs from '../components/Tabs.vue';
import ModalitySwitch from '../components/ModalitySwitch.vue';
import Timeline from '../components/Timeline.vue';
import PaperDetail from '../components/PaperDetail.vue';
import SearchBox from '../components/SearchBox.vue';
import { usePaperTimeline } from '../composables/usePaperTimeline';

const selectedType = ref('All');
const selectedModality = ref('All');
const searchTerm = ref('');

function getBlogUrl(slug) {
  if (!slug) return '#';
  if (slug.startsWith('http')) return slug;

  const match = slug.match(/\/blog\/(.+)$/);
  const name = match ? match[1].replace(/\/.*/, '') : slug.replace(/\//g, '');
  return `/blog/viewer.html?slug=${encodeURIComponent(name)}`;
}

const enhancedPapers = computed(() =>
  papers.map((paper) => ({
    ...paper,
    blog: paper.blog
      ? {
          ...paper.blog,
          slug: getBlogUrl(paper.blog.slug),
        }
      : { enabled: false, slug: '' },
  }))
);

const { filteredPapers } = usePaperTimeline(
  enhancedPapers,
  selectedType,
  selectedModality,
  searchTerm,
  computed(() => 'year-desc')
);

const totalCount = computed(() => enhancedPapers.value.length);
const filteredCount = computed(() => filteredPapers.value.length);

function buildDistribution(getKey) {
  const counts = enhancedPapers.value.reduce((accumulator, paper) => {
    const key = getKey(paper);
    accumulator[key] = (accumulator[key] || 0) + 1;
    return accumulator;
  }, {});

  return Object.entries(counts).map(([label, value]) => ({
    label,
    value,
    ratio: `${Math.round((value / totalCount.value) * 100)}%`,
  }));
}

const typeDistribution = computed(() => buildDistribution((paper) => paper.type));
const modalityDistribution = computed(() => buildDistribution((paper) => paper.modality));
const typeCount = computed(() => typeDistribution.value.length);
const modalityCount = computed(() => modalityDistribution.value.length);
const latestYear = computed(() => Math.max(...enhancedPapers.value.map((paper) => paper.year)));
const primaryType = computed(() => {
  const [first] = [...typeDistribution.value].sort((a, b) => b.value - a.value);
  return first?.label ?? '-';
});
const primaryModality = computed(() => {
  const [first] = [...modalityDistribution.value].sort((a, b) => b.value - a.value);
  return first?.label ?? '-';
});

const heroMetrics = computed(() => [
  { label: 'Total Items', value: totalCount.value, note: '统一管理的研究条目' },
  { label: 'Primary Type', value: primaryType.value, note: `${typeCount.value} 类研究对象` },
  { label: 'Primary Modality', value: primaryModality.value, note: `${modalityCount.value} 种模态入口` },
]);

const activeFilterSummary = computed(() => {
  const typeLabel = selectedType.value === 'All' ? '全部类型' : selectedType.value;
  const modalityLabel = selectedModality.value === 'All' ? '全部模态' : selectedModality.value;
  const keywordLabel = searchTerm.value.trim() ? `关键词“${searchTerm.value.trim()}”` : '无关键词';
  return `当前为 ${typeLabel} / ${modalityLabel} / ${keywordLabel}，共匹配 ${filteredCount.value} 条`;
});

const selectedPaper = ref(filteredPapers.value[0] ?? enhancedPapers.value[0] ?? null);

watch(
  filteredPapers,
  (papersInView) => {
    if (!papersInView.length) {
      selectedPaper.value = null;
      return;
    }

    const currentId = selectedPaper.value?.id;
    selectedPaper.value = papersInView.find((paper) => paper.id === currentId) ?? papersInView[0];
  },
  { immediate: true }
);
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 18px;
  background:
    radial-gradient(circle at top left, rgba(255, 196, 118, 0.24), transparent 26%),
    radial-gradient(circle at 85% 12%, rgba(225, 109, 73, 0.16), transparent 22%),
    linear-gradient(180deg, #f7efe5 0%, #efe4d5 46%, #e8ddd2 100%);
  color: #24170f;
}

.hero-shell,
.dashboard-strip,
.filters-panel,
.timeline-panel,
.rail-card {
  max-width: 1520px;
  margin-left: auto;
  margin-right: auto;
}

.hero {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.85fr);
  gap: 20px;
  padding: 28px;
  border-radius: 36px;
  background:
    linear-gradient(135deg, rgba(34, 20, 12, 0.96), rgba(88, 39, 18, 0.92)),
    linear-gradient(180deg, #2d1b11 0%, #4b2617 100%);
  box-shadow: 0 30px 80px rgba(74, 34, 18, 0.22);
}

.hero::after {
  content: '';
  position: absolute;
  inset: auto -120px -120px auto;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 181, 96, 0.32) 0%, transparent 68%);
}

.hero-copy {
  position: relative;
  z-index: 1;
  padding: 12px 8px;
}

.eyebrow,
.section-kicker,
.control-label,
.filters-summary,
.panel-note,
.signal-kicker,
.metric-label {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.75rem;
}

.eyebrow {
  color: #ffcf97;
}

h1 {
  margin: 14px 0 0;
  max-width: 11ch;
  color: #fff7ef;
  font-size: clamp(2.8rem, 6vw, 5.4rem);
  line-height: 0.96;
  letter-spacing: -0.05em;
}

.intro {
  margin: 20px 0 0;
  max-width: 56ch;
  color: rgba(255, 241, 228, 0.78);
  font-size: 1rem;
  line-height: 1.9;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 28px;
}

.hero-pill {
  display: grid;
  gap: 4px;
  min-width: 120px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 217, 178, 0.18);
  backdrop-filter: blur(10px);
}

.pill-label {
  color: rgba(255, 223, 191, 0.72);
  font-size: 0.78rem;
}

.hero-pill strong {
  color: #fff6ed;
  font-size: 1.4rem;
}

.hero-stage {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  align-content: start;
  z-index: 1;
}

.signal-card {
  display: grid;
  gap: 8px;
  padding: 18px;
  min-height: 128px;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255, 247, 238, 0.14), rgba(255, 225, 198, 0.08));
  border: 1px solid rgba(255, 214, 174, 0.2);
  color: #fff1e1;
}

.signal-card strong {
  font-size: 2rem;
  line-height: 1;
}

.signal-card span,
.metric-note {
  color: rgba(255, 234, 214, 0.72);
}

.lead {
  grid-column: span 2;
  min-height: 172px;
}

.constellation {
  position: absolute;
  inset: 18px 18px auto auto;
  width: 120px;
  height: 120px;
  pointer-events: none;
}

.constellation span {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ffd6a4;
  box-shadow: 0 0 18px rgba(255, 214, 164, 0.8);
}

.constellation span:nth-child(1) {
  top: 8px;
  right: 12px;
}

.constellation span:nth-child(2) {
  top: 34px;
  right: 56px;
}

.constellation span:nth-child(3) {
  top: 72px;
  right: 22px;
}

.constellation span:nth-child(4) {
  top: 92px;
  right: 80px;
}

.dashboard-strip {
  display: grid;
  grid-template-columns: 1.4fr repeat(3, minmax(0, 0.62fr));
  gap: 16px;
  margin-top: 18px;
}

.insight-card,
.filters-panel,
.timeline-panel,
:deep(.detail),
.rail-card {
  border: 1px solid rgba(123, 88, 61, 0.12);
  box-shadow: 0 20px 60px rgba(70, 43, 24, 0.08);
}

.insight-card {
  padding: 20px;
  border-radius: 28px;
  background: rgba(255, 251, 246, 0.82);
  backdrop-filter: blur(14px);
}

.feature-card {
  background:
    radial-gradient(circle at top right, rgba(224, 121, 77, 0.16), transparent 22%),
    rgba(255, 250, 244, 0.88);
}

.feature-card h2,
.filters-head h2,
.rail-head h2,
.panel-head h2 {
  margin: 10px 0 0;
  font-size: 1.7rem;
  line-height: 1.08;
  letter-spacing: -0.03em;
}

.feature-card p:last-child {
  margin: 14px 0 0;
  color: #6a5142;
  line-height: 1.8;
}

.stat-card {
  display: grid;
  align-content: start;
  gap: 10px;
}

.metric-label {
  color: #876754;
}

.metric-value {
  font-size: 2rem;
  line-height: 1;
  color: #2d1c13;
}

.metric-note {
  color: #8c6f5e;
}

.filters-panel {
  margin-top: 18px;
  padding: 22px;
  border-radius: 32px;
  background: rgba(255, 250, 244, 0.82);
  backdrop-filter: blur(14px);
}

.filters-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: end;
  margin-bottom: 18px;
}

.filters-summary,
.panel-note {
  color: #8b6a57;
  line-height: 1.7;
}

.filters-grid {
  display: grid;
  grid-template-columns: 1fr 0.82fr 1.1fr;
  gap: 14px;
}

.control-card {
  display: grid;
  gap: 10px;
  padding: 16px;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 239, 230, 0.94));
  border: 1px solid rgba(191, 153, 124, 0.16);
}

.control-label,
.section-kicker {
  color: #98735d;
}

.story-grid {
  max-width: 1520px;
  margin: 18px auto 0;
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr) 320px;
  gap: 16px;
  align-items: start;
}

.rail-card,
.timeline-panel {
  border-radius: 30px;
  background: rgba(255, 251, 247, 0.84);
  backdrop-filter: blur(14px);
}

.rail-card {
  padding: 22px;
}

.rail-head {
  margin-bottom: 20px;
}

.stack-group {
  display: grid;
  gap: 18px;
}

.stack-block {
  display: grid;
  gap: 12px;
}

.stack-title {
  color: #6f5342;
  font-weight: 700;
}

.distribution-list {
  display: grid;
  gap: 10px;
}

.distribution-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  padding: 14px 16px;
  border-radius: 18px;
  background: linear-gradient(180deg, #fffdfa 0%, #f6ede4 100%);
  color: #3a2619;
}

.distribution-item div {
  display: grid;
  gap: 4px;
}

.distribution-item span {
  color: #8b6c5b;
  font-size: 0.85rem;
}

.distribution-item b {
  font-size: 1.1rem;
}

.timeline-panel {
  padding: 22px;
}

.panel-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: end;
  margin-bottom: 20px;
}

@media (max-width: 1180px) {
  .dashboard-strip,
  .filters-grid,
  .story-grid,
  .hero {
    grid-template-columns: 1fr;
  }

  .lead {
    grid-column: auto;
  }

  .hero-stage {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 980px) {
  .filters-head,
  .panel-head {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 720px) {
  .page {
    padding: 12px;
  }

  .hero,
  .filters-panel,
  .timeline-panel,
  .rail-card,
  .insight-card,
  :deep(.detail) {
    border-radius: 24px;
  }

  h1 {
    max-width: none;
    font-size: 2.9rem;
  }

  .hero-actions {
    flex-direction: column;
  }
}
</style>
