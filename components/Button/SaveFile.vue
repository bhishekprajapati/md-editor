<script setup>
import moment from "moment";

const user = useSupabaseUser();
const store = useFileStore();

const openSignInModal = inject("openSignInModal");

async function handleClick() {
  user.value ? store.onSave() : openSignInModal;
}
</script>

<template>
  <div class="flex items-center justify-center gap-x-4">
    <UBadge color="white" variant="solid">
      Updated {{ moment(store.file?.updatedAt).fromNow() }}
    </UBadge>

    <UButton
      icon="i-heroicons-cloud-arrow-up"
      :color="user ? 'primary' : 'red'"
      @click="handleClick"
      :loading="store.isSaving"
      :disabled="store.isSaving || store.isLoading">
      Save
    </UButton>
  </div>
</template>
