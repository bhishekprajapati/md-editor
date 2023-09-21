<script setup>
import ButtonPrimary from "./ButtonPrimary.vue";
import ButtonToggleMenu from "./ButtonToggleMenu.vue";

const props = defineProps({
  isMenuCollapsed: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(["menuToggle"]);
</script>

<template>
  <div class="bg-black-700">
    <div class="flex items-center">
      <ButtonToggleMenu
        class="mr-6"
        :is-active="!props.isMenuCollapsed"
        @click="() => emits('menuToggle')" />

      <img class="mr-4 inline-block" src="/icons/File.svg" alt="file-icon" />
      <span class="display-m inline-block text-white">welcome.md</span>

      <img
        class="ml-auto mr-6 inline-block"
        src="/icons/Trash.svg"
        alt="file-icon" />
      <ButtonPrimary class="mr-2 w-10">
        <template v-slot:icon>
          <img class="inline-block" src="/icons/Save.svg" alt="save-icon" />
        </template>
      </ButtonPrimary>
    </div>
  </div>
</template>
