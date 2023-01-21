<script lang="ts" setup>
import { onMounted, ref } from 'nativescript-vue';
import * as geolocation from '@nativescript/geolocation';
import BottomBar from '@/components/base/BottomBar.vue';
import Button1 from '@/components/form/Button1.vue';
import InputPhoto from '../media/InputPhoto.vue';
// import { android, ios } from '@nativescript/core/application';
import Ios from '@/components/platform/ios.vue';
import Android from '@/components/platform/android.vue';
import InputQR from '@/components/media/InputQR.vue';
import { BarCodeType } from '@/utils/qr';

const photoPremise = ref<string>();
const photoPerson = ref<string>();
const photoContract = ref<string>();

const photoPremiseRef = ref<any>(null)
const photoPersonRef = ref<any>(null)
const photoContractRef = ref<any>(null)
const pauseCamera = ref(false);

const qrCode1 = ref<BarCodeType>();
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

const onScanResult = (r: any) => {
  console.log('result', r);
}

const onPhotoPremise = ({ path }: { path: string }) => {
  console.log('onPhotoPremise!', path, photoPremise.value);
  // photoPremise.value = path;
}

const onPhotoPerson = ({ path }: { path: string }) => {
  console.log('onPhotPerson!', path);
  // photoPerson.value = path;
}

const onPhotoContract = ({ path }: { path: string }) => {
  console.log('onPhotoContract!', path);
  // photoContract.value = path;
}

const doCheckIn = () => {
  console.log('checkin!');
}

onMounted(() => {
  console.log("mounted");
  // interval = setInterval(() => counter.value++, 100);
  //https://www.daxima.com/geolocation-in-mobile-application/
  getLocation();
});

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
        <StackLayout class="px-2 pt-2 bg-red-100">
          <InputQR v-model:value="qrCode1" title="QR" class="my-2" />
          <InputPhoto v-model:value="photoPremise" title="Premise photo" ref="photoPremiseRef"
            :save-path-prefix="['checkin']" :save-name="'premise.jpg'" />
          <InputPhoto v-model:value="photoPerson" title="Person photo" ref="photoPersonRef"
            :save-path-prefix="['checkin']" :save-name="'premise.jpg'" />
          <InputPhoto v-model:value="photoContract" title="Contract photo" ref="photoContractRef"
            :save-path-prefix="['checkin']" :save-name="'premise.jpg'" />

          <!-- <BarcodeScanner row="1" height="300" formats="QR_CODE, EAN_13, UPC_A" beepOnScan="true"
            reportDuplicates="true" preferFrontCamera="false" :pause="pauseCamera" @scanResult="onScanResult">
          </BarcodeScanner> -->

        </StackLayout>
      </ScrollView>


    </DockLayout>

  </Page>
</template>

