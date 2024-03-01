import type { FileRead } from "~/types/client";

import sampleMd from "~/sample-md";

interface Editor {
  isSynced: boolean;
  isNew: boolean;
  file: FileRead | { name: string; content: string } | null;
}

const initialEditorState = {
  isSynced: false,
  isNew: true,
  file: null,
};

export const useEditorStore = defineStore("editor", () => {
  const state: Ref<Editor> = ref(initialEditorState);

  function $createLocalFile() {
    state.value.file = {
      name: "Sample-Markdown",
      content: sampleMd as string,
    };
  }

  function $reset() {
    state.value = initialEditorState;
  }

  return {
    state,
    $createLocalFile,
    $reset,
  };
});
