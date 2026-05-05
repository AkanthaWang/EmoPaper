<template>
  <aside v-if="paper" class="detail">
    <p class="label">Focused Entry</p>
    <h3>{{ paper.title }}</h3>
    <p class="subtitle">{{ paper.fullTitle }}</p>
    <p class="body">{{ paper.contribution }}</p>
    <div class="tags" v-if="paper.tags?.length">
      <span v-for="tag in paper.tags" :key="tag" class="tag">#{{ tag }}</span>
    </div>
    <dl>
      <div><dt>Year</dt><dd>{{ paper.year }}</dd></div>
      <div><dt>Type</dt><dd>{{ paper.type }}</dd></div>
      <div><dt>Modality</dt><dd>{{ paper.modality }}</dd></div>
      <div v-if="paper.venue"><dt>Venue</dt><dd>{{ paper.venue }}</dd></div>
    </dl>
    <p class="footnote">当前筛选视图共 {{ resultCount }} 条数据，右侧详情会随左侧时间线选择实时更新。</p>
    <a
      v-if="paper.blog?.enabled && paper.blog?.slug"
      class="analysis"
      :href="paper.blog.slug"
      target="_blank"
      rel="noopener noreferrer"
    >
      Read Analysis
    </a>
  </aside>

  <aside v-else class="detail empty">
    <p class="label">Focused Entry</p>
    <h3>暂无选中条目</h3>
    <p class="body">当前筛选条件下没有可展示的数据，放宽筛选后这里会自动展示第一条结果的详细信息。</p>
  </aside>
</template>

<script setup>
defineProps({
  paper: {
    type: Object,
    default: null,
  },
  resultCount: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped>
.detail {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(244, 249, 252, 0.94) 100%);
  border-radius: 28px;
  border: 1px solid #dce7f0;
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.08);
  padding: 22px;
  position: sticky;
  top: 1rem;
}

.label {
  margin: 0 0 0.4rem;
  color: #6a7d92;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.78rem;
}

h3 {
  margin: 0;
  color: #10233d;
}

.subtitle,
.body,
dd {
  color: #4e6278;
}

.subtitle {
  margin: 0.5rem 0 0;
  line-height: 1.6;
}

.body {
  margin: 1rem 0;
  line-height: 1.7;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  padding: 0.36rem 0.7rem;
  border-radius: 999px;
  background: #eef5f9;
  color: #29445a;
  font-size: 0.82rem;
}

dl {
  display: grid;
  gap: 0.7rem;
  margin: 0;
}

dl > div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.7rem 0;
  border-bottom: 1px solid #e7eef5;
}

dt {
  color: #6a7d92;
}

dd {
  margin: 0;
  font-weight: 600;
}

.footnote {
  margin: 1rem 0 0;
  color: #658098;
  line-height: 1.7;
  font-size: 0.92rem;
}

.analysis {
  display: inline-flex;
  margin-top: 1rem;
  color: #0f766e;
  font-weight: 700;
  text-decoration: none;
}

.empty {
  position: static;
}
</style>
