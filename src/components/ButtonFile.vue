<script setup>
import IconFile from "./Icons/IconFile.vue";
import { formatToLocaleDate } from "../utils";
const props = defineProps(["timestamp", "filename"]);
</script>

<template>
  <button
    type="button"
    class="w-full rounded-lg p-3 text-left transition-colors transition-transform duration-500 hover:bg-black-700 active:scale-95 active:bg-black-600 active:opacity-95">
    <div class="pointer-events-none flex items-center gap-x-4">
      <IconFile />
      <div>
        <span class="text-body text-grey-800">{{
          formatToLocaleDate(props.timestamp)
        }}</span>
        <h4 class="display-m text-cream">{{ props.filename }}</h4>
      </div>
    </div>
  </button>
</template>
