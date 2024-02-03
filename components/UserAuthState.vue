<script setup>
const isOpen = ref(false);
provide("openSignInModal", () => (isOpen.value = true));
</script>

<template>
  <div class="flex items-center gap-x-4">
    <ButtonSaveFile />
    <UModal v-model="isOpen">
      <div class="p-12 text-center">
        <p class="mb-8 text-2xl">Sign in to save your progress!</p>
        <ULink to="/login" class="bg-primary rounded p-2 text-black"
          >Sign in</ULink
        >
      </div>
    </UModal>
    <UserAvatar />
  </div>
</template>
