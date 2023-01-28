<script lang="ts" setup>
import { requestPermissions, takePicture } from '@nativescript/camera';
import { onMounted, ref, watch } from 'nativescript-vue';
import Button1 from '@/components/form/Button1.vue';
import { getAssetSource, saveImageAsset } from '@/utils/media';
import { action } from '@nativescript/core';
import * as imagepicker from '@nativescript/imagepicker';

const props = defineProps<{
  title: string,
  savePathPrefix: string[],
  saveName: string,
  value?: string
}>();
const $emit = defineEmits<{
  (event: 'photo', { asset, path }: { asset: any, path: string }): void,
  (event: 'update:value', path: string): void
}>();

const imagePickerContext = imagepicker.create({
  mode: 'single' // use "multiple" for multiple selection
});

const asset = ref<any>(null)

const takePhoto = () => {
  requestPermissions().then(
    function success() {
      console.log('permission ok, taking photo');
      takePicture({ saveToGallery: true, keepAspectRatio: true, allowsEditing: true })
        .then(async (imageAsset) => {
          asset.value = imageAsset;
          // console.log("Result is an image asset instance", imageAsset);
          // var image = new Image();
          // image.src = imageAsset;
          // console.log('emitting', image)
          const res = await saveImageAsset(imageAsset, props.savePathPrefix, props.saveName);

          $emit('photo', { asset: imageAsset, path: res.filePath });
          $emit('update:value', res.filePath);
        }).catch((err) => {
          console.log("TakePicture Error:", err.message);
        });
    },
    function failure() {
      console.error('permission photo denied');
      // permission request rejected
      // ... tell the user ...
    }
  );
}

const selectPhoto = () => {
  console.log('selectPhoto');

  imagePickerContext
    .authorize()
    .then(function () {
      return imagePickerContext.present()
    })
    .then(function (selection) {
      selection.forEach(async function (selected) {
        console.log('selected', selected);
        const filePath = await getAssetSource(selected);
        $emit('photo', { asset: selected, path: filePath });
        $emit('update:value', filePath);
      });
    })
    .catch(function (e) {
      // process error
      console.error('photo select', e);
    })
}

const capturePhoto = async () => {
  console.log('capturePhoto')
  action("Select source", "Cancel", ["Camera", "Gallery"])
    .then((result: string) => {
      if (result === 'Cancel') {
        return;
      }
      console.log(result);
      if (result === 'Camera') {
        takePhoto();
      } else {
        selectPhoto();
      }
    });
}

watch(() => props.value, (v) => {
  console.log('value changed', v);
})

onMounted(() => {
  // takePhoto();
})

defineExpose({
  takePhoto
})

</script>

<template>
  <StackLayout>
    <Image src="~/imgs/photo.jpg" height="100" class="opacity-30" @tap="capturePhoto" v-if="!value" />
    <!-- <Label :text="value" v-if="value" class="border-b border-b-gray-300" /> -->
    <!-- <Label text="" class="border-b h-0.5" /> -->
    <Image :src="value" v-if="value" class="object-cover h-[250px]" />
    <!-- <Label :text="title" class="text-center" /> -->
    <Button1 type="secondary" @tap="capturePhoto" class="w-full mt-2 mb-2 uppercase">
      SELECT {{ title }}
    </Button1>
  </StackLayout>
</template>