<template>
  <div class="searchbox">
    <input
      type="search"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <button v-if="modelValue" @click="$emit('update:modelValue', '')">Clear</button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Search title, tag, or venue' }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.searchbox {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.searchbox input {
  width: 100%;
  min-width: 240px;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  border: 1px solid #d3e0ea;
  background: #fbfdff;
  color: #24384e;
  font: inherit;
}

.searchbox input:focus {
  outline: none;
  border-color: #7ca2be;
  box-shadow: 0 0 0 4px rgba(124, 162, 190, 0.14);
}

.searchbox button {
  padding: 0.8rem 1rem;
  border-radius: 14px;
  border: 0;
  background: #16364f;
  color: #fff;
  cursor: pointer;
  font: inherit;
}

@media (max-width: 720px) {
  .searchbox {
    flex-direction: column;
    align-items: stretch;
  }

  .searchbox input {
    min-width: 0;
  }
}
</style>
