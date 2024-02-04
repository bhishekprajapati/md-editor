<script setup>
const isOpen = ref(false);
const store = useFileStore();
</script>

<template>
  <div class="flex items-center p-4">
    <UButton variant="ghost" size="xl" @click="isOpen = true">
      <UIcon name="i-heroicons-bars-3" />
    </UButton>
    <Logo class="mr-12" />

    <ClientOnly>
      <Filename class="mr-auto" />

      <div class="flex items-center gap-x-4">
        <ButtonSaveFile v-if="store.file" />
        <ButtonDeleteFile v-if="store.file" class="mr-8" />
        <ButtonThemeToggle />
        <UserAuthState />
      </div>
    </ClientOnly>
    <USlideover v-model="isOpen" side="left" class="w-[15%]"> </USlideover>
  </div>
  <UDivider />
</template>
