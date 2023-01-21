<script lang="ts" setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  $navigateTo,
  watch,
} from "nativescript-vue";
import BottomBar from "./base/BottomBar.vue";
import Button1 from "./form/Button1.vue";
import SideBar from "./base/SideBar.vue";

import Login from "./auth/Login.vue";
import Details from "./Details.vue";
import CheckIn from "./staff/CheckIn.vue";
import { android, ios } from '@nativescript/core/application';

// const drawerState = ref<boolean | 'left' | 'right' | 'top' | 'bottom'>(false);
const counter = ref(0);
const isLoadedImage = ref(false);
const drawerState = ref(false);
const message = computed(() => {
  return `App: ${counter.value}`;
});

function logMessage() {
  console.log("You have tapped the message!");
}

// let interval: any;
onMounted(() => {
  console.log("mounted");
  // interval = setInterval(() => counter.value++, 100);

});

onUnmounted(() => {
  console.log("unmounted");
  // clearInterval(interval);
});

watch(() => drawerState, (e) => {
  console.log('drawerState!', e)
})

const toggleMenu = (e: any) => {
  console.log('toggleMenu', drawerState.value)
  // drawerState.value = !drawerState.value ? 'left' : false;
  drawerState.value = !drawerState.value;
};
console.log('ok');
</script>

<template>
  <Frame>
    <Page>
      <ActionBar title="Home">
        <ios>
          <ActionItem @tap="toggleMenu" ios.systemIcon="9" ios.position="left" />
        </ios>
        <android>
          <ActionItem @tap="toggleMenu" android.systemIcon="ic_menu_share" android.position="actionBar" />
        </android>
      </ActionBar>

      <SideBar :shown="drawerState" @shown="drawerState = $event" />

      <DockLayout stretchLastChild="false" backgroundColor="#3c495e">
        <BottomBar dock="bottom" class="">
          <Button1 @tap="$navigateTo(Login)" width="100%" horizontalAlignment="center" class="mb-2">
            Login
          </Button1>
          <Button1 @tap="$navigateTo(CheckIn)" width="100%" horizontalAlignment="center">
            Check in
          </Button1>
        </BottomBar>

        <ScrollView orientation="vertical" class="w-full">
          <GridLayout class="px-4 w-full" rows="*, auto, auto, *">
            <Label row="1" class="text-xl align-middle text-center text-gray-500" :text="message" @tap="logMessage" />
            <Button row="2" @tap="$navigateTo(Details)"
              class="mt-4 px-4 py-2 bg-white border-2 border-blue-400 rounded-xl" horizontalAlignment="center">
              View Details
            </Button>
          </GridLayout>
        </ScrollView>

      </DockLayout>

    </Page>
  </Frame>
</template>

<style>
/* .info {
    font-size: 20;
  } */
</style>
