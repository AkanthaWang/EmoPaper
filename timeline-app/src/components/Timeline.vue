<template>
  <div class="timeline">
    <div v-if="!sortedYearGroups.length" class="empty-state">
      <h3>暂无匹配结果</h3>
      <p>可以切换类型、模态，或者尝试更短的关键词来查看全量数据。</p>
    </div>
    <YearSection
      v-for="[year, yearPapers] in sortedYearGroups"
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
    default: 'All',
  },
  searchTerm: {
    type: String,
    default: '',
  },
  sortOrder: {
    type: String,
    default: 'year-desc',
  },
});

defineEmits(['select-paper']);

const { sortedYearGroups } = usePaperTimeline(
  computed(() => props.papers),
  computed(() => props.selectedType),
  computed(() => props.selectedModality),
  computed(() => props.searchTerm),
  computed(() => props.sortOrder)
);
</script>

<style scoped>
.timeline {
  display: grid;
  gap: 1.5rem;
}

.empty-state {
  padding: 2.5rem 1.5rem;
  border-radius: 24px;
  border: 1px dashed #c4d5e3;
  background: linear-gradient(180deg, #f8fbfd 0%, #f2f7fa 100%);
  text-align: center;
  color: #5b7086;
}

.empty-state h3 {
  margin: 0 0 0.5rem;
  color: #16364f;
}

.empty-state p {
  margin: 0;
}
</style>
