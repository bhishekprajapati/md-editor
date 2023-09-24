import { defineStore } from "pinia";
import { ref, watch } from "vue";

import { MarkdownFile } from "../MarkdownFile";
import sampleMarkdown from "../sampleMarkdownCode";

const SAMPLE_MD = {
  filename: "welcome",
  content: sampleMarkdown,
};

export const useMarkdownStore = defineStore("markdowns", () => {
  let activeFile;
  const filename = ref(null);
  const fileContent = ref(null);
  const hasChanged = ref(false);
  const fileList = ref(null);

  watch(filename, (current, old) => {
    if (!old) return;

    // to restore old value if user tries to clear the filename input field
    if (!current) {
      filename.value = old;
      return;
    }
    // to mark filename changes
    hasChanged.value = true;
    activeFile.filename = current;
  });

  watch(fileContent, (current, old) => {
    if (!old) return;
    hasChanged.value = true;
    activeFile.content = current;
  });

  async function save() {
    if (await activeFile.save()) {
      hasChanged.value = false;

      await refreshFileList();
    }
  }

  async function refreshFileList() {
    fileList.value = await MarkdownFile.getFileList();

    // last edited first
    fileList.value.sort(
      (file1, file2) =>
        new Date(file2.meta.createdAt) - new Date(file1.meta.createdAt),
    );
  }

  async function openFile(name) {
    const file = await MarkdownFile.findOne(name);
    filename.value = file.filename;
    fileContent.value = file.content;
    activeFile = file;
  }

  async function populate() {
    await refreshFileList();

    // open last created file
    if (fileList.value.length) {
      await openFile(fileList.value[0].filename);
      return;
    }

    // fallback: open sample markdown file
    filename.value = SAMPLE_MD.filename;
    fileContent.value = SAMPLE_MD.content;
    activeFile = new MarkdownFile(SAMPLE_MD.filename, SAMPLE_MD.content);
  }

  return {
    filename,
    fileContent,
    hasChanged,
    save,
    populate,
    fileList,
    openFile,
  };
});
