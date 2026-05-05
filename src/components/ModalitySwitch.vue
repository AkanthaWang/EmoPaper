<template>
  <div class="switch" role="group" aria-label="Modality switch">
    <button
      type="button"
      class="option"
      :class="{ active: modelValue === 'All' }"
      @click="$emit('update:modelValue', 'All')"
    >
      All
    </button>
    <button
      type="button"
      class="option"
      :class="{ active: modelValue === 'image' }"
      @click="$emit('update:modelValue', 'image')"
    >
      Image
    </button>
    <button
      type="button"
      class="option"
      :class="{ active: modelValue === 'video' }"
      @click="$emit('update:modelValue', 'video')"
    >
      Video
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'All',
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.switch {
  display: inline-flex;
  gap: 0.5rem;
  padding: 0.35rem;
  border-radius: 999px;
  background: #f2f7fa;
  border: 1px solid #d8e5ed;
  width: fit-content;
}

.option {
  border: 0;
  background: transparent;
  color: #4f6479;
  border-radius: 999px;
  padding: 0.65rem 1rem;
  font: inherit;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease, box-shadow 160ms ease;
}

.option.active {
  background: linear-gradient(135deg, #ffffff 0%, #eef7f8 100%);
  color: #16364f;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}
</style>
