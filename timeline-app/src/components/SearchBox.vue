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
.searchbox { display:flex; gap:8px; align-items:center }
.searchbox input { padding:8px 12px; border-radius:8px; border:1px solid #d1d5db; min-width:240px }
.searchbox button { padding:8px 10px; border-radius:8px; border:0; background:#111827; color:#fff; cursor:pointer }
</style>
