<script lang="ts" setup>
import { $showModal, computed, ref } from 'nativescript-vue';
// import SelectListInput from './SelectListInput.vue';
import Button1 from './Button1.vue';
import { action } from '@nativescript/core';

const props = defineProps<{
  formOrientation?: "horizontal" | "vertical",
  label: string,
  placeholder?: string,
  value?: string | number | null,
  required?: boolean,
  options: { value: string | number | null, label: string | number }[],
}>();

let modal: any = null;
const inputRef = ref<any>(null);
const $emit = defineEmits<{
  (e: 'update:value', v: string | number | null): void
}>();

const computedOrientation = computed(() => {
  return props.formOrientation || 'vertical';
});

const focusInput = () => {
  if (!inputRef.value) return;

  inputRef.value.nativeView.focus()
}

const update = (v: string | null) => {
  console.log('update', v);
  $emit('update:value', v);
}

const closeModal = () => {
  console.log('closing', modal);
  if (modal) {
    modal.close();
  }
}

const showList = () => {
  // modal = $showModal(SelectListInput, { props: { options: props.options, value: props.value, '@update:value': update, '@close': closeModal } });
  action(props.label, "Cancel", props.options.map(o => o.label.toString()))
    .then(result => {
      if (result === 'Cancel') {
        // update(null);
        return;
      }
      update(result);
    });

}
</script>

<template>
  <StackLayout class="border border-gray-400 rounded-lg pt-2 px-2 mb-2">
    <Label :text="label" class="w-full mb-0" @tap="showList" />
    <Button1 @tap="showList" class="mb-2">
      {{ value }}
    </Button1>
  </StackLayout>
</template>