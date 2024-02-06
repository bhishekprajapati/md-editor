import sampleMd from "~/sample-md";

export const useFileStore = defineStore("file", () => {
  const file = ref(null);
  const isDeleting = ref(false);
  const isLoading = ref(false); // `true` when loading file
  const isSaving = ref(false); // `true` when saving file
  const isSyncingFilename = ref(false);

  const toast = useToast();

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
      const data = await $fetch("/api/file", {
        query: {
          id,
        },
      });
      file.value = data;
    } catch (err) {
      console.error(err);
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

  async function onSaveFilename(name, callback) {
    if (!getIsNew()) {
      isSyncingFilename.value = true;
      let error;
      try {
        const data = await $fetch("/api/file", {
          method: "PATCH",
          body: {
            id: file.value.id,
            name,
          },
        });
        file.value = {
          ...file.value,
          name: data.name,
          updatedAt: data.updatedAt,
        };
      } catch (err) {
        error = err;
      } finally {
        isSyncingFilename.value = false;
        callback(error);
      }
    }
  }

  function getIsNew() {
    return !file.value?.id;
  }

  function $reset() {
    file.value = null;
    isDeleting.value = false;
    isLoading.value = false;
    isSaving.value = false;
  }

  return {
    file,
    isSaving,
    isLoading,
    isDeleting,
    isSyncingFilename,
    getIsNew,
    onNew,
    onOpen,
    onSave,
    onSaveFilename,
    onDelete,
    $reset,
  };
});
