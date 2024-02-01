<script setup>
const isOpen = ref(false);
</script>

<template>
  <div class="flex items-center p-4">
    <UButton variant="ghost" size="xl" @click="isOpen = true">
      <UIcon name="i-heroicons-bars-3" />
    </UButton>
    <span class="font-bold uppercase">markdown</span>
    <USlideover v-model="isOpen" :overlay="false" side="left" class="w-[15%]">
    </USlideover>
  </div>
  <UDivider />
</template>
