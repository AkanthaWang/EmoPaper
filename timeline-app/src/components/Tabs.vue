<template>
  <div class="tabs" role="tablist" aria-label="Paper type tabs">
    <button
      v-for="item in options"
      :key="item.value"
      type="button"
      class="tab"
      :class="{ active: modelValue === item.value }"
      @click="$emit('update:modelValue', item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'All',
  },
  options: {
    type: Array,
    default: () => [
      { label: 'Dataset', value: 'Dataset' },
      { label: 'Method', value: 'Method' },
      { label: 'Benchmark', value: 'Benchmark' },
    ],
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tab {
  border: 1px solid #dbe3ef;
  background: #ffffff;
  color: #2d3748;
  border-radius: 999px;
  padding: 0.7rem 1rem;
  font: inherit;
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
}

.tab:hover,
.tab:focus-visible {
  transform: translateY(-1px);
  border-color: #a7b7d1;
  outline: none;
}

.tab.active {
  background: #1f2937;
  color: #ffffff;
  border-color: #1f2937;
  box-shadow: 0 12px 30px rgba(31, 41, 55, 0.16);
}
</style>