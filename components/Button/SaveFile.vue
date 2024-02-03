<script setup>
const user = useSupabaseUser();
const toast = useToast();
const isLoading = ref(false);

const openSignInModal = inject("openSignInModal");

async function onSave() {
  if (!user.value) {
    return openSignInModal();
  }

  isLoading.value = true;
  try {
    const res = await $fetch("/api/file", {
      method: "POST",
      body: {
        content: "Markdown code 2",
      },
    });

    toast.add({ title: "Saved!" });
  } catch (err) {
    toast.add({ title: `${err.message}` });
  }
  isLoading.value = false;
}
</script>

<template>
  <UButton
    icon="i-heroicons-cloud-arrow-up"
    :color="user ? 'primary' : 'red'"
    @click="onSave"
    :loading="isLoading"
    :disabled="isLoading"
    >Save</UButton
  >
</template>
