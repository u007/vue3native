<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import Button1 from '@/components/form/Button1.vue';
import TextInput from '@/components/form/TextInput.vue';
import BottomBar from "@/components/base/BottomBar.vue";
const formOrientation = ref<"horizontal" | "vertical">("horizontal");
const username = ref('');
const password = ref('');

const showSocialLogin = ref(false);

const doLogin = () => {
  console.log('doLogin', username.value, password.value);
};

const doSignup = () => {
  console.log('doSignup');
};

</script>

<template>
  <Page>
    <ActionBar>
      <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
      <StackLayout orientaion="vertical">
        <StackLayout :orientation="formOrientation">
          <Image src="res://icon" width="40" height="40" verticalAlignment="center" />
          <Label text="Login" fontSize="24" verticalAlignment="center" />
        </StackLayout>
      </StackLayout>
    </ActionBar>

    <DockLayout stretchLastChild="false">
      <BottomBar dock="bottom" class="">
        <StackLayout orientation="horizontal" class="mb-2 mx-auto " align="center">
          <Label text="Don't have an account?" class="mr-1" />

          <Label text="Sign up" class="text-blue-400" @tap="doSignup" />
        </StackLayout>
      </BottomBar>

      <ScrollView orientation="vertical" class="w-full">
        <StackLayout class="px-4">
          <Image src="~/imgs/logo.png" height="100" class="mt-2 mb-2" />
          <Label text="Hello again!" class="text-center text-lg mb-4" />

          <!-- <MDTextField helper="example helper" placeholderColor="green" keyboardType="datetime" hint="i am an hint"
            returnKeyType="next" v-model:value="username" /> -->

          <TextInput label="Login ID" v-model:value="username" />
          <TextInput label="Password" v-model:value="password" :secure="true" />
          <!-- <TextField v-model:value="username" class="text-center" hint="login id" />
          <TextField v-model="password" :secure="true" class="text-center" hint="password" /> -->

          <Button1 type="primary" @tap="doLogin" class="w-full mt-2 mb-2">
            Login
          </Button1>

          <StackLayout v-if="showSocialLogin" class="border-t border-t-gray-400 mt-2 pt-4">
            <Button1 @tap="doLogin" class="w-full">
              <Image src="~/imgs/google-logo.png" width="25" height="25" />
              Login via Google
            </Button1>

          </StackLayout>
          <!-- <StackLayout class="border-b border-b-gray-400 mb-4 mt-2"></StackLayout> -->

        </StackLayout>
      </ScrollView>

    </DockLayout>
  </Page>
</template>
