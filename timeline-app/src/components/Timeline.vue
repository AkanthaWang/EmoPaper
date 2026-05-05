<template>
  <div class="timeline">
    <YearSection
      v-for="(yearPapers, year) in groupedByYear"
      :key="year"
      :year="year"
      :papers="yearPapers"
      @select-paper="$emit('select-paper', $event)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import YearSection from './YearSection.vue';
import { usePaperTimeline } from '../composables/usePaperTimeline';

const props = defineProps({
  papers: {
    type: Array,
    default: () => [],
  },
  selectedType: {
    type: String,
    default: 'All',
  },
  selectedModality: {
    type: String,
    default: 'image',
  },
  searchTerm: {
    type: String,
    default: ''
  },
  sortOrder: {
    type: String,
    default: 'year-desc'
  },
});

defineEmits(['select-paper']);

const filterState = computed(() => ({
  selectedType: props.selectedType,
  selectedModality: props.selectedModality,
}));

// pass search (no sort — removed per request)
const { groupedByYear } = usePaperTimeline(
  computed(() => props.papers),
  computed(() => filterState.value.selectedType),
  computed(() => filterState.value.selectedModality),
  computed(() => props.searchTerm)
);
</script>

<style scoped>
.timeline {
  display: grid;
  gap: 1.5rem;
}
</style>