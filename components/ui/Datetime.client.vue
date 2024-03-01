<script setup lang="ts">
import moment from "moment";

const props = withDefaults(
  defineProps<{
    iso: string;
  }>(),
  {
    iso: new Date().toISOString(),
  },
);
</script>

<template>
  <UiRefresh>
    <UBadge color="white" variant="solid">{{
      moment(props.iso).fromNow()
    }}</UBadge>
  </UiRefresh>
</template>
