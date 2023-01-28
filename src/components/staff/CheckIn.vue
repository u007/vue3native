<script lang="ts" setup>
import { $showModal, onMounted, ref } from 'nativescript-vue';
import * as geolocation from '@nativescript/geolocation';
import BottomBar from '@/components/base/BottomBar.vue';
import Button1 from '@/components/form/Button1.vue';
import InputPhoto from '../media/InputPhoto.vue';
import SelectInput from '@/components/form/SelectInput.vue';
// import { android, ios } from '@nativescript/core/application';
import Ios from '@/components/platform/ios.vue';
import Android from '@/components/platform/android.vue';
import InputQR from '@/components/media/InputQR.vue';
import { BarCodeType } from '@/utils/qr';
import Login from '@/components/auth/Login.vue';

const photoPremise = ref<string>();
const photoPerson = ref<string>();
// const photoContract = ref<string>();

const photoPremiseRef = ref<any>(null)
const photoPersonRef = ref<any>(null)
// const photoContractRef = ref<any>(null)
// const pauseCamera = ref(false);

const qrCode1 = ref<BarCodeType>();
const client = ref<string>('1-client');
const outlet = ref<string>('3-ccc');
const schedule = ref<string>('2-schedule');
const location = ref([0, 0])
// CoreTypes.Accuracy; // used to describe at what accuracy the location should be get
// const geolocation = require("nativescript-geolocation");
const getLocation = async () => {
  if (!await geolocation.isEnabled()) {
    await geolocation.enableLocationRequest().then(function () {
      console.error("Allow geolocation");
      return getLocation();
    }, function (error: any) {
      console.error("Deny geolocation: " + error);
    });
  } else {
    await geolocation.getCurrentLocation({ desiredAccuracy: 1, updateDistance: 10, minimumUpdateTime: 600000, maximumAge: 600000, timeout: 5000 })
      .then(function (loc: any) {
        const lat = loc.latitude;
        const lng = loc.longitude;
        location.value = [lat, lng];
        console.log("Location: " + lat + ", " + lng)
      }, function (e) {
        console.log("Error: " + e.message);
      });
  }
}
const doCheckIn = () => {
  console.log('checkin!');
}

const outlets = ref([
  { value: '1-aaa', label: 'aaa' },
  { value: '2-bbb', label: 'bbb' },
  { value: '3-ccc', label: 'ccc' },
]);

const clients = ref([
  { value: '1-client', label: 'client1' },
  { value: '2-client', label: 'client2' },
  { value: '3-client', label: 'client3' },
]);

const schedules = ref([
  { value: '1-schedule', label: 'schedule1' },
  { value: '2-schedule', label: 'schedule2' },
  { value: '3-schedule', label: 'schedule3' },
]);

onMounted(() => {
  console.log("mounted");
  // interval = setInterval(() => counter.value++, 100);
  //https://www.daxima.com/geolocation-in-mobile-application/
  getLocation();

  for (let c = 4; c < 1000; c++) {
    outlets.value.push({ value: `${c}-aaa`, label: `aaa${c}` });
  }
});


const testModal = () => {
  $showModal(Login);
}
</script>
<template>
  <Page>
    <ActionBar title="Check In">
      <ios>
        <NavigationButton text="Go back" ios.systemIcon="9" @tap="$navigateBack" />
      </ios>
      <android>
        <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
      </android>
    </ActionBar>

    <DockLayout stretchLastChild="false">
      <BottomBar dock="bottom" class="">
        <Button1 type="primary" @tap="doCheckIn" width="100%" horizontalAlignment="center" class="mb-2 uppercase">
          Check in
        </Button1>
      </BottomBar>
      <ScrollView orientation="vertical" class="w-full ">
        <StackLayout class="px-2 pt-2">
          <InputQR v-model:value="qrCode1" title="QR" class="my-2" />
          <SelectInput v-model:value="client" label="Chain store" :options="clients" />
          <SelectInput v-model:value="outlet" label="Outlet" :options="outlets" />
          <SelectInput v-model:value="schedule" label="Work shift" :options="schedules" />

          <InputPhoto v-model:value="photoPerson" title="Your photo" ref="photoPersonRef"
            :save-path-prefix="['checkin']" :save-name="'premise.jpg'" />
          <InputPhoto v-model:value="photoPremise" title="Store photo" ref="photoPremiseRef"
            :save-path-prefix="['checkin']" :save-name="'premise.jpg'" />

        </StackLayout>
      </ScrollView>


    </DockLayout>

  </Page>
</template>

