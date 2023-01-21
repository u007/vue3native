<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  backgroundColor?: string,
  type?: 'default' | 'primary' | 'secondary',
  class?: string,
  width?: string,
  horizontalAlignment?: 'left' | 'center' | 'right',
}>();

const $emit = defineEmits<{
  (event: 'tap', ...args: any[]): void
}>();

const computedWidth = computed(() => {
  return props.width || '100%';
});

const computedClass = computed(() => {
  let extraClass = "";
  if (computedType.value === 'default') {

  }
  if (computedType.value === 'primary') {
    extraClass = "text-white primary";
  }
  if (computedType.value === 'secondary') {
    extraClass = "text-white secondary";
  }

  return `px-4 py-2 bg-white border-2 rounded-lg font-medium ${extraClass} ${props.class}`;
});

const computedHorizontalAlign = computed(() => {
  return props.horizontalAlignment || 'center';
});

const computedType = computed(() => {
  return props.type || 'default';
});

const computedBackgroundColor = computed(() => {
  if (props.backgroundColor) return props.backgroundColor;

  if (computedType.value === 'default') {
    return '#ffffff';
  }
  if (computedType.value === 'primary') {
    return '#3b82f6';
  }
  if (computedType.value === 'secondary') {
    return '#6b7280';
  }
});
</script>

<template>
  <Button :backgroundColor="computedBackgroundColor" @tap="(e: any) => $emit('tap', e)" :width="computedWidth"
    :class="computedClass" :horizontalAlignment="computedHorizontalAlign">
    <slot />
  </Button>
</template>