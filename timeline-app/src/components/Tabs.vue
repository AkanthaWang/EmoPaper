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
      { label: 'All', value: 'All' },
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
  border: 1px solid #d7e4ef;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbfd 100%);
  color: #284158;
  border-radius: 999px;
  padding: 0.7rem 1rem;
  font: inherit;
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
}

.tab:hover,
.tab:focus-visible {
  transform: translateY(-1px);
  border-color: #89abc3;
  outline: none;
}

.tab.active {
  background: linear-gradient(135deg, #12344f 0%, #1f6671 100%);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 12px 30px rgba(18, 52, 79, 0.2);
}
</style>
