import sampleMd from "~/sample-md";
import { filenameSchema } from "~/utils/validators";

export const useFileStore = defineStore("file", () => {
  const route = useRoute();

  const error = ref(null);
  const file = ref(null);
  const isDeleting = ref(false);
  const isLoading = ref(false); // `true` when loading file
  const isSaving = ref(false); // `true` when saving file
  const isUpdatingVisibility = ref(false);
  const isSharedFile = computed(() => Object.hasOwn(route.query, "shared"));

  const toast = useToast();

  async function setFilename(name) {
    file.value.name = await filenameSchema.parseAsync(name);
  }

  async function patchFile(payload) {
    payload["id"] = file.value.id;
    const data = await filePatchSchema.parseAsync(payload);
    const updates = await $fetch("/api/file", {
      method: "PATCH",
      body: data,
    });
    file.value = {
      ...file.value,
      ...updates,
    };
  }

  // create a new local file
  async function onNew() {
    file.value = {
      name: "Readme",
      content: sampleMd,
    };
  }

  // open a remote file
  async function onOpen(id) {
    if (!id) {
      return;
    }

    try {
      isLoading.value = true;
      const url = route.query?.shared ? "/api/file?shared=true" : "/api/file";
      const data = await $fetch(url, {
        query: {
          id,
        },
      });
      file.value = data;
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  }

  // saveFile
  async function onSave() {
    isSaving.value = true;
    try {
      if (!file.value?.id) {
        // post a new file
        await $fetch("/api/file", {
          method: "POST",
          body: file.value,
        });

        return;
      }

      const data = await $fetch("/api/file", {
        method: "PATCH",
        body: file.value,
      });
      file.value = data;
      toast.add({ title: "Saved!" });
    } catch (err) {
      console.error(err);
      toast.add({ color: "red", title: "Failed to save!" });
    } finally {
      isSaving.value = false;
    }
  }

  async function onDelete() {
    isDeleting.value = true;
    try {
      await $fetch("/api/file", {
        method: "DELETE",
        query: {
          id: file.value.id,
        },
      });

      navigateTo("/editor/new");
    } catch (err) {
      console.error(err);
    } finally {
      isDeleting.value = false;
    }
  }

  async function updateVisibility(value, callback) {
    if (!getIsNew()) {
      isUpdatingVisibility.value = true;
      let error;
      try {
        const data = await $fetch("/api/file", {
          method: "PATCH",
          body: {
            id: file.value.id,
            private: !!value,
          },
        });
        file.value = {
          ...file.value,
          private: data.private,
          updatedAt: data.updatedAt,
        };
      } catch (err) {
        error = err;
      } finally {
        isUpdatingVisibility.value = false;
        callback(error);
      }
    }
  }

  function getIsNew() {
    return !file.value?.id;
  }

  function clearError() {
    error.value = null;
  }

  function $reset() {
    file.value = null;
    isDeleting.value = false;
    isLoading.value = false;
    isSaving.value = false;
  }

  return {
    error,
    file,
    isSaving,
    isLoading,
    isDeleting,
    isUpdatingVisibility,
    isSharedFile,
    getIsNew,
    onNew,
    onOpen,
    onSave,
    onDelete,
    updateVisibility,
    setFilename,
    patchFile,
    clearError,
    $reset,
  };
});
