<script setup>
import IconSave from "./Icons/IconSave.vue";
import IconTrash from "./Icons/IconTrash.vue";
import ButtonPrimary from "./ButtonPrimary.vue";
import ButtonToggleMenu from "./ButtonToggleMenu.vue";
import TheMarkdownFilename from "./TheMarkdownFilename.vue";
import { useMarkdownStore } from "../stores/useMarkdownStore";

const store = useMarkdownStore();
</script>

<template>
  <div class="bg-black-700">
    <div class="flex items-center">
      <ButtonToggleMenu class="mr-6" />

      <TheMarkdownFilename v-if="store.filename" />

      <button
        type="button"
        class="group ml-auto mr-6 inline-block"
        :disabled="!store.hasChanged">
        <IconTrash />
      </button>

      <ButtonPrimary
        class="mr-2 [&>:last-child]:hidden md:[&>:last-child]:inline-block"
        :disabled="!store.hasChanged"
        @click="store.save">
        <template v-slot:icon>
          <IconSave class="inline-block align-text-bottom md:mr-2" />
        </template>

        <template v-slot:default>Save Changes</template>
      </ButtonPrimary>
    </div>
  </div>
</template>
