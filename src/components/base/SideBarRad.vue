<script lang="ts" setup>
import { ref, watch } from 'nativescript-vue';

const props = defineProps<{
  shown: boolean;
}>();

const drawer = ref<any>(null);

watch(() => props.shown, (v) => {
  if (!drawer.value) {
    return;
  }
  if (v) {
    drawer.value.showDrawer();
  } else {
    drawer.value.closeDrawer();
  }
})

const $emit = defineEmits<{
  (event: "shown", ...args: any[]): void;
}>();

const onCloseDrawerTap = () => {
  $emit("shown", false);
}

const onOpenDrawerTap = () => {
  $emit("shown", true);
}

const onToggleDrawerTap = () => {
  $emit("shown", !props.shown);
}

</script>
<template>
  <RadSideDrawer ref="drawer">
    <StackLayout ~drawerContent class="sideStackLayout">
      <StackLayout class="sideTitleStackLayout">
        <Label text="Navigation Menu"></Label>
      </StackLayout>
      <StackLayout class="sideStackLayout">
        <Label text="Primary" class="sideLabel sideLightGrayLabel"></Label>
        <Label text="Social" class="sideLabel"></Label>
        <Label text="Promotions" class="sideLabel"></Label>
        <Label text="Labels" class="sideLabel sideLightGrayLabel"></Label>
        <Label text="Important" class="sideLabel"></Label>
        <Label text="Starred" class="sideLabel"></Label>
        <Label text="Sent Mail" class="sideLabel"></Label>
        <Label text="Drafts" class="sideLabel"></Label>
      </StackLayout>
      <Label text="Close Drawer" color="lightgray" padding="10" style="horizontal-align: center"
        @tap="onCloseDrawerTap"></Label>
    </StackLayout>
    <StackLayout ~mainContent>
      <Label textWrap="true" class="drawerContentText"></Label>
      <StackLayout orientation="Horizontal">
        <Button text="OPEN DRAWER" @tap="onOpenDrawerTap()" class="drawerContentButton"></Button>
        <Button text="TOGGLE DRAWER" @tap="onToggleDrawerTap()" class="drawerContentButton"></Button>
      </StackLayout>
    </StackLayout>
  </RadSideDrawer>
</template>