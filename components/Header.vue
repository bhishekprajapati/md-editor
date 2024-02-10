<script setup>
import { ZodError } from "zod";

const toast = useToast();
const router = useRouter();
const route = useRoute();
const store = useFileStore();
const user = useUser();

const isOpen = ref(false);
const isSavingFile = ref(false);
const isSavingFilename = ref(false);
const isNewFile = computed(() => store.getIsNew());
const isIndexPath = computed(() => route.path === "/");

async function syncFilename(name) {
  isSavingFilename.value = true;

  try {
    store.getIsNew()
      ? await store.setFilename(name)
      : await store.patchFile({ name });

    !store.getIsNew() &&
      toast.add({ title: "Filename saved!", color: "green" });
  } catch (err) {
    let message;
    if (err instanceof ZodError) {
      message = err.format()._errors[0];
    }
    toast.add({ title: message ?? err?.message, color: "red" });
  } finally {
    isSavingFilename.value = false;
  }
}

async function saveFile() {
  isSavingFile.value = true;
  try {
    if (isNewFile.value) {
      const res = await store.create();
      router.push(`/editor/${res.id}`);
      return;
    }

    await store.patchFile(store.file);
    toast.add({ title: "Saved", color: "green" });
  } catch (err) {
    toast.add({
      title: err?.statusText ?? err?.message ?? "Something went wrong!",
      color: "red",
    });
  } finally {
    isSavingFile.value = false;
  }
}
</script>

<template>
  <div class="flex h-full items-center p-4">
    <UButton
      v-if="!isIndexPath"
      variant="link"
      size="xl"
      @click="isOpen = true"
      class="mr-2">
      <UIcon name="i-heroicons-bars-3" class="h-6 w-6" />
    </UButton>
    <Logo class="mr-12" />

    <ClientOnly>
      <InputButton
        v-if="store.file"
        @change="syncFilename"
        class="mr-auto"
        :loading="isSavingFilename"
        :key="route.path"
        :value="store.file?.name ?? ''"
        :disabled="store.isSharedFile" />

      <div class="ml-auto flex items-center gap-x-4">
        <div
          v-if="store.file && !store.isSharedFile"
          class="flex items-center justify-center gap-x-4">
          <MomentFromNow
            v-if="store.file?.updatedAt"
            prefix="Updated"
            :iso-string="store.file.updatedAt" />

          <UButton
            icon="i-heroicons-cloud-arrow-up"
            :color="user ? 'primary' : 'red'"
            @click="saveFile"
            :loading="isSavingFile"
            :disabled="isSavingFile">
            {{ isNewFile ? "Create" : "Save" }}
          </UButton>
        </div>
        <ButtonShare v-if="store.file && !isNewFile && !store.isSharedFile" />
        <ButtonThemeToggle />
        <UserAuthState class="hidden md:block" />
      </div>
    </ClientOnly>
    <USlideover v-model="isOpen" side="left" class="w-[15%]"> </USlideover>
  </div>
</template>
