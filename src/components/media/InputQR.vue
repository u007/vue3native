<script lang="ts" setup>
import { onMounted, ref, watch } from 'nativescript-vue';
import Button1 from '@/components/form/Button1.vue';
import { BarcodeResult, ValueType } from '@nativescript/mlkit-barcode-scanning';
import { DetectionType, DetectionEvent } from '@nativescript/mlkit-core';
import { requestPermissions } from '@nativescript/camera';
import { BarCodeType } from '@/utils/qr';

const props = defineProps<{
  title: string,
  value?: BarCodeType
  type?: string,
}>();
const $emit = defineEmits<{
  (event: 'update:value', value: BarCodeType): void

}>();

const scanning = ref(false);

const doScan = () => {
  console.log('doScan');
  scanning.value = !scanning.value;
}

watch(() => props.value, (v) => {
  console.log('value changed', v);
})

const initPermission = () => {
  requestPermissions().then(
    function success() {
      console.log('permission ok');
    },
    function failure() {
      console.error('permission photo denied');
      // permission request rejected
      // ... tell the user ...
    }
  );
}


onMounted(() => {
  // takePhoto();
  initPermission();
})

const onDetection = (e: DetectionEvent) => {
  console.log('onDetection', e)
  if (e.type === DetectionType.Barcode) {
    const barcodes: BarcodeResult[] = e.data as BarcodeResult[];
    console.log('barcode', barcodes.map((b) => ({ type: b.valueType, value: b.rawValue })));
    if (barcodes.length === 0) {
      console.log('no code?');
      return;
    }

    const firstCode = barcodes[0];
    // firstCode.rawValue -> string
    // firstCode.valueType -> Product
    // firstCode.displayValue ?
    $emit('update:value', { type: firstCode.valueType, value: firstCode.rawValue || '', display: firstCode.displayValue || '' });
    scanning.value = false;
  }
}

defineExpose({

})

</script>

<template>
  <StackLayout>
    <Label :text="value?.value" v-if="value?.value" class="my-2" />
    <MLKitView cameraPosition="back" detectionType="all" @detection="onDetection" v-if="scanning" />
    <Button1 @tap="doScan">
      {{ scanning? 'Stop': `Scan ${props.title}` }}
    </Button1>
  </StackLayout>
</template>