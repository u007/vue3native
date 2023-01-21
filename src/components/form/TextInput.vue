<script lang="ts" setup>
import { computed, ref } from 'nativescript-vue';

const props = defineProps<{
  formOrientation?: "horizontal" | "vertical",
  label: string,
  placeholder?: string,
  value?: string | number,
  secure?: boolean,
  required?: boolean,
}>();

const inputRef = ref<any>(null);
const $emit = defineEmits<{
  'update:value': string | number,
}>();

const updateValue = (e: any) => {
  console.log('update', e);
  // $emit('update:value', e);
}

const computedOrientation = computed(() => {
  return props.formOrientation || 'vertical';
});

const focusInput = () => {
  if (!inputRef.value) return;

  inputRef.value.nativeView.focus()
}
</script>

<template>
  <StackLayout class="border border-gray-400 rounded-lg pt-2 px-2 mb-2">
    <Label :text="label" class="w-full mb-0" @tap="focusInput" />
    <TextField ref="inputRef" :placeholder="placeholder" class="w-full bg-transparent text-center border-none mb-0"
      :required="required" :secure="secure" :value="value" @update:value="updateValue" />
  </StackLayout>
</template>