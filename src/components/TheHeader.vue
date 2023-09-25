<script setup>
import IconSave from "./Icons/IconSave.vue";
import IconTrash from "./Icons/IconTrash.vue";
import ButtonPrimary from "./ButtonPrimary.vue";
import ButtonToggleMenu from "./ButtonToggleMenu.vue";
import ButtonToggleTheme from "./ButtonToggleTheme.vue";
import TheMarkdownFilename from "./TheMarkdownFilename.vue";
import { useMarkdownStore } from "../stores/useMarkdownStore";

const store = useMarkdownStore();
</script>

<template>
  <div class="bg-black-700">
    <div class="flex items-center">
      <ButtonToggleMenu class="mr-6" />

      <TheMarkdownFilename v-if="store.filename" />

      <ButtonToggleTheme class="ml-auto mr-16" />

      <button
        type="button"
        class="group mr-6 inline-block"
        :disabled="!store.hasChanged">
        <IconTrash />
      </button>

      <ButtonPrimary
        class="mr-2"
        :disabled="!store.hasChanged"
        @click="store.save">
        <template v-slot:icon>
          <IconSave class="mr-2 inline-block align-text-bottom" />
        </template>

        <template v-slot:default>Save Changes</template>
      </ButtonPrimary>
    </div>
  </div>
</template>
