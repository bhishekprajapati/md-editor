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
    if (await activeFile.save()) hasChanged.value = false;
  }

  async function populate() {
    const storedFiles = await MarkdownFile.getFileList();

    if (!storedFiles.length) {
      filename.value = SAMPLE_MD.filename;
      fileContent.value = SAMPLE_MD.content;
      activeFile = new MarkdownFile(SAMPLE_MD.filename, SAMPLE_MD.content);
    }
    // load last edited
    storedFiles.sort(
      (file1, file2) =>
        new Date(file2.meta.createdAt) - new Date(file1.meta.createdAt),
    );

    // updating refs for loaded file
    const lastEditedFile = await MarkdownFile.findOne(storedFiles[0].filename);
    filename.value = lastEditedFile.filename;
    fileContent.value = lastEditedFile.content;
    activeFile = lastEditedFile;
  }
  return {
    filename,
    fileContent,
    hasChanged,
    save,
    populate,
  };
});
