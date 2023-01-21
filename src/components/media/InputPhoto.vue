<script lang="ts" setup>
import { requestPermissions, takePicture } from '@nativescript/camera';
import { onMounted, ref, watch } from 'nativescript-vue';
import Button1 from '@/components/form/Button1.vue';
import { saveImageAsset } from '@/utils/media';

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

const asset = ref<any>(null)

const takePhoto = () => {
  requestPermissions().then(
    function success() {
      console.log('permission ok, taking photo');
      takePicture({ saveToGallery: true, keepAspectRatio: true })
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

const capturePhoto = async () => {
  console.log('capturePhoto')
  await takePhoto();
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