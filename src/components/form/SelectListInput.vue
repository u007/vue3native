<script lang="ts" setup>
import { computed } from 'nativescript-vue';
import Button1 from './Button1.vue';

const props = defineProps<{
  value?: string | number | null,
  options: { value: string | number | null, label: string | number }[],
}>();

const selectedIndex = computed(() => {
  return props.options.findIndex((o) => o.value === props.value);
});

const $emit = defineEmits<{
  (e: 'update:value', v: string | number | null): void,
  (e: 'close'): void
}>();

const updateIndex = (v: any) => {
  console.log('updateIndex', v.value);
  $emit('update:value', props.options[v.value].value);
}

const closeModal = () => {
  console.log('closeModal');
  $emit('close');
}

</script>

<template>
  <StackLayout>
    <ListPicker :items="options.map((o) => o.label)" :selectedIndex="selectedIndex" @selectedIndexChange="updateIndex"
      ref="inputRef" class="" />
    <Button1 @tap="closeModal">
      Ok
    </Button1>
  </StackLayout>
</template>