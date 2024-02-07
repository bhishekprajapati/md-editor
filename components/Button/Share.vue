<script setup>
import copy from "copy-to-clipboard";

const route = useRoute();
const toast = useToast();
const store = useFileStore();
const isOpen = ref(false);
const isPrivate = computed(() => store.file.private);

const accessTypes = [
  {
    private: true,
    label: "Restricted",
    icon: "i-heroicons-lock-closed",
    description: "Only people with access can open this link",
  },
  {
    private: false,
    label: "Anyone with link",
    icon: "i-heroicons-globe-alt",
    description: "Anyone with this link can access this file",
  },
];

const selectedAccess = computed(() =>
  accessTypes.find((access) => isPrivate.value === access.private),
);

async function handleAccessSelection(newAccess) {
  if (newAccess === selectedAccess.value.label) {
    return;
  }

  store.updateVisibility(!selectedAccess.value.private, (err) => {
    if (err) {
      toast.add({
        title: "Failed to update the access!",
        color: "red",
      });

      return;
    }

    toast.add({ title: "File access updated!", color: "green" });
  });
}

function onCopyLink() {
  const url = window.location.href;
  copy(store.file.private ? url : `${url}?shared=true`);
  toast.add({ title: "Copied!", color: "yellow" });
}
</script>

<template>
  <UButton
    color="gray"
    icon="i-heroicons-user-group"
    class="rounded-full"
    @click="isOpen = true">
    Share
  </UButton>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <h3 class="text-2xl">
          <UIcon name="i-heroicons-share" class="mr-4 align-middle" /> Share
        </h3>
      </template>

      <div class="flex items-center gap-x-4">
        <span
          class="flex items-center justify-center rounded-full bg-gray-300 p-4 dark:bg-slate-950">
          <UIcon :name="selectedAccess.icon" />
        </span>
        <div v-if="!store.isUpdatingVisibility">
          <USelectMenu
            class="mb-2"
            :model-value="selectedAccess.label"
            :options="accessTypes.map(({ label }) => label)"
            @update:model-value="handleAccessSelection" />
          <p class="text-xs text-gray-600">
            {{ selectedAccess.description }}
          </p>
        </div>
        <UProgress v-else animation="carousel" />
      </div>

      <template #footer>
        <UButton
          variant="outline"
          icon="i-heroicons-link"
          size="lg"
          :color="store.isUpdatingVisibility ? 'gray' : 'white'"
          class="rounded-full"
          :disabled="store.isUpdatingVisibility"
          @click="onCopyLink">
          Copy link
        </UButton>
      </template>
    </UCard>
  </UModal>
</template>
