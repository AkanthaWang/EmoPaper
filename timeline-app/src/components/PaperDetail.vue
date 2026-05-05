<template>
  <aside v-if="paper" class="detail">
    <p class="label">Selected Paper</p>
    <h3>{{ paper.title }}</h3>
    <p class="subtitle">{{ paper.fullTitle }}</p>
    <p class="body">{{ paper.contribution }}</p>
    <dl>
      <div><dt>Year</dt><dd>{{ paper.year }}</dd></div>
      <div><dt>Type</dt><dd>{{ paper.type }}</dd></div>
      <div><dt>Modality</dt><dd>{{ paper.modality }}</dd></div>
      <div v-if="paper.venue"><dt>Venue</dt><dd>{{ paper.venue }}</dd></div>
    </dl>
    <a v-if="paper.blog?.enabled && paper.blog?.slug" class="analysis" :href="paper.blog.slug" target="_blank" rel="noopener noreferrer">Read Analysis</a>
  </aside>
</template>

<script setup>
defineProps({
  paper: {
    type: Object,
    default: null,
  },
});
</script>

<style scoped>
.detail {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #e6ebf3;
  box-shadow: 0 12px 34px rgba(15, 23, 42, 0.08);
  padding: 1.25rem;
}

.label {
  margin: 0 0 0.4rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
}

h3 {
  margin: 0;
  color: #111827;
}

.subtitle,
.body,
dd {
  color: #4b5563;
}

.subtitle {
  margin: 0.5rem 0 0;
  line-height: 1.6;
}

.body {
  margin: 1rem 0;
  line-height: 1.7;
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
  border-bottom: 1px solid #eef2f7;
}

dt {
  color: #6b7280;
}

dd {
  margin: 0;
  font-weight: 600;
}

.analysis {
  display: inline-flex;
  margin-top: 1rem;
  color: #0f766e;
  font-weight: 700;
  text-decoration: none;
}
</style>