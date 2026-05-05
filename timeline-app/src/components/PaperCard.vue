<template>
  <article class="paper-card" @click="$emit('select', paper)">
    <header class="paper-header">
      <div>
        <p class="type">{{ paper.type }}</p>
        <h3 class="title">{{ paper.title }}</h3>
        <p class="acronym">{{ paper.fullTitle }}</p>
        <p class="venue" v-if="paper.venue">{{ paper.venue }}</p>
      </div>
      <span class="year">{{ paper.year }}</span>
    </header>

    <div class="card-accent"></div>

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
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbfd 100%);
  border: 1px solid #dfe9f1;
  border-radius: 24px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
  padding: 1.2rem;
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.paper-card::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 5px;
  background: linear-gradient(180deg, #cf7140 0%, #f0c198 100%);
}

.paper-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(89, 55, 31, 0.14);
  border-color: #d8b093;
}

.paper-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
}

.card-accent {
  margin: 0.9rem 0 1rem;
  width: 72px;
  height: 1px;
  background: linear-gradient(90deg, #cf7140 0%, rgba(207, 113, 64, 0) 100%);
}

.type {
  margin: 0 0 0.35rem;
  color: #a16b4d;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.title {
  margin: 0;
  font-size: 1.08rem;
  line-height: 1.45;
  color: #2f1f15;
}

.acronym,
.year,
.contribution,
.footer {
  color: #6a584c;
}

.acronym {
  margin: 0.35rem 0 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.88rem;
}

.venue {
  margin: 0.25rem 0 0;
  color: #866f60;
  font-size: 0.9rem;
}

.year {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 54px;
  padding: 0.4rem 0.65rem;
  border-radius: 999px;
  background: #f8ede3;
  color: #8f5435;
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
  background: #f7ede3;
  color: #7b533b;
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
  color: #a44d22;
  font-weight: 600;
  text-decoration: none;
}
</style>
