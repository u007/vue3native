
<script lang="ts" setup>
import { isAndroid } from "@nativescript/core";

</script>

<template>
  <slot v-if="isAndroid" />
</template>
