<template>
  <section class="year-section">
    <div class="year-marker">
      <span class="dot"></span>
      <h2>{{ year }}</h2>
    </div>
    <div class="cards">
      <PaperCard
        v-for="paper in papers"
        :key="paper.id"
        :paper="paper"
        @select="$emit('select-paper', $event)"
      />
    </div>
  </section>
</template>

<script setup>
import PaperCard from './PaperCard.vue';

defineProps({
  year: {
    type: [String, Number],
    required: true,
  },
  papers: {
    type: Array,
    required: true,
  },
});

defineEmits(['select-paper']);
</script>

<style scoped>
.year-section {
  position: relative;
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1.25rem;
  padding: 0.5rem 0;
}

.year-section::before {
  content: '';
  position: absolute;
  left: 59px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #d9e2ef;
}

.year-marker {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding-top: 0.4rem;
}

.year-marker h2 {
  margin: 0;
  font-size: 1.35rem;
  color: #111827;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: #ffffff;
  border: 3px solid #111827;
  margin-top: 0.4rem;
  flex: none;
}

.cards {
  display: grid;
  gap: 1rem;
}

@media (max-width: 720px) {
  .year-section {
    grid-template-columns: 1fr;
  }

  .year-section::before {
    left: 8px;
  }

  .year-marker {
    padding-left: 1.25rem;
  }
}
</style>