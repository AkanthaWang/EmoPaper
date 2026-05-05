<template>
  <article class="paper-card" @click="$emit('select', paper)">
    <header class="paper-header">
      <div>
        <p class="type">{{ paper.type }}</p>
        <h3 class="title">{{ paper.title }}</h3>
        <p class="acronym">{{ paper.acronym }}</p>
        <p class="venue" v-if="paper.venue">{{ paper.venue }}</p>
      </div>
      <span class="year">{{ paper.year }}</span>
    </header>

    <p class="contribution">{{ paper.contribution }}</p>

    <div class="tags">
      <span v-for="tag in paper.tags" :key="tag" class="tag">#{{ tag }}</span>
    </div>

    <footer class="footer">
      <span>{{ paper.modality }}</span>
      <a v-if="paper.blog?.enabled && paper.blog?.slug" class="read-more" :href="paper.blog.slug" @click.stop>
        Read More
      </a>
    </footer>
  </article>
</template>

<script setup>
defineProps({
  paper: {
    type: Object,
    required: true,
  },
});

defineEmits(['select']);
</script>

<style scoped>
.paper-card {
  background: #ffffff;
  border: 1px solid #e6ebf3;
  border-radius: 18px;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
  padding: 1.15rem;
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.paper-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.12);
  border-color: #c8d2e2;
}

.paper-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
}

.type {
  margin: 0 0 0.35rem;
  color: #64748b;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.title {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.45;
  color: #111827;
}

.acronym,
.year,
.contribution,
.footer {
  color: #5b6474;
}

.acronym {
  margin: 0.35rem 0 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.88rem;
}

.venue {
  margin: 0.25rem 0 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.year {
  font-weight: 700;
}

.contribution {
  margin: 0.9rem 0;
  line-height: 1.7;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: #f4f7fb;
  color: #374151;
  font-size: 0.8rem;
}

.footer {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  font-size: 0.88rem;
}

.read-more {
  color: #0f766e;
  font-weight: 600;
  text-decoration: none;
}
</style>