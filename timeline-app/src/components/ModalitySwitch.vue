<template>
  <div class="switch" role="group" aria-label="Modality switch">
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
    default: 'image',
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
  background: #f3f6fb;
  border: 1px solid #dbe3ef;
}

.option {
  border: 0;
  background: transparent;
  color: #4b5563;
  border-radius: 999px;
  padding: 0.65rem 1rem;
  font: inherit;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease, box-shadow 160ms ease;
}

.option.active {
  background: #ffffff;
  color: #111827;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}
</style>