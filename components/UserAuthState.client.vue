<script setup>
const user = useSupabaseUser();
</script>

<template>
  <div>
    <UserAvatar v-if="user" />
    <ButtonSignIn v-else />
    <!-- <div class="flex items-center gap-x-4">
      <ButtonSaveFile />
      <ButtonDeleteFile />
      <UModal v-model="isOpen">
        <div class="p-12 text-center">
          <p class="mb-8 text-2xl">Sign in to save your progress!</p>
          <ULink to="/login" class="bg-primary rounded p-2 text-black">
            Sign in
          </ULink>
        </div>
      </UModal>
  
    </div> -->
  </div>
</template>
