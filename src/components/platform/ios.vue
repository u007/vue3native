
<script lang="ts" setup>
import { isIOS } from "@nativescript/core";

</script>

<template>
  <slot v-if="isIOS" />
</template>
