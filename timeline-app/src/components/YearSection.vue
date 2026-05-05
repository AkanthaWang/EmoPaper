<template>
  <section class="year-section">
    <div class="year-marker">
      <div class="year-badge">
        <span class="dot"></span>
        <div class="year-copy">
          <p class="year-label">Year</p>
          <h2>{{ year }}</h2>
        </div>
      </div>
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
  grid-template-columns: 148px 1fr;
  gap: 1.5rem;
  padding: 0.75rem 0 1.5rem;
}

.year-section::before {
  content: '';
  position: absolute;
  left: 71px;
  top: 0;
  bottom: 0;
  width: 3px;
  border-radius: 999px;
  background: linear-gradient(180deg, #d97745 0%, #f0c7a2 48%, #eadfd2 100%);
}

.year-marker {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.year-badge {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  width: 100%;
  padding: 0.95rem 1rem;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255, 251, 247, 0.98), rgba(247, 237, 228, 0.94));
  border: 1px solid rgba(201, 161, 129, 0.24);
  box-shadow: 0 16px 32px rgba(90, 58, 35, 0.08);
}

.year-copy {
  display: grid;
  gap: 0.15rem;
}

.year-label {
  margin: 0;
  color: #ad7d62;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.72rem;
}

.year-marker h2 {
  margin: 0;
  font-size: 1.55rem;
  color: #4d2c1d;
  line-height: 1;
}

.dot {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: linear-gradient(180deg, #fff8f0 0%, #ffe0c0 100%);
  border: 4px solid #cf7140;
  box-shadow: 0 0 0 6px rgba(234, 200, 171, 0.38);
  flex: none;
}

.cards {
  display: grid;
  gap: 1rem;
  padding: 0.25rem 0 0;
}

@media (max-width: 720px) {
  .year-section {
    grid-template-columns: 1fr;
  }

  .year-section::before {
    left: 15px;
  }

  .year-marker {
    padding-left: 1.25rem;
    justify-content: flex-start;
  }

  .year-badge {
    width: auto;
    min-width: 180px;
  }
}
</style>
