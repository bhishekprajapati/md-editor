<script setup>
const user = useSupabaseUser();
const store = useFileStore();
const updatedAt = ref(store.file?.updatedAt ?? "");

watch(store, ({ file }) => (updatedAt.value = file.updatedAt));

async function handleClick() {
  store.onSave();
}
</script>

<template>
  <div class="flex items-center justify-center gap-x-4">
    <MomentFromNow prefix="Updated" :iso-string="updatedAt" />

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
