<script setup>
import { onMounted } from "vue";
import * as monaco from "monaco-editor";
import { useThemeStore } from "../stores/useThemeStore";
import tailwindcssConfig from "../../tailwind.config";

const theme = useThemeStore();
const emits = defineEmits(["change"]);
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    default: "",
  },
});

function getEditorTheme() {
  return theme.getTheme() === "dark" ? "vs-dark" : "vs";
}

onMounted(() => {
  monaco.editor.create(document.getElementById(props.id), {
    value: props.value,
    theme: getEditorTheme(),
    language: "markdown",
    fontFamily: tailwindcssConfig.theme.fontFamily?.mono[0],
    fontSize: 16,
    automaticLayout: true,
  });

  const editorModel = monaco.editor.getModels()[0];

  editorModel.onDidChangeContent((e) => {
    emits("change", editorModel.getValue());
  });
});

theme.$subscribe(() => {
  monaco.editor.setTheme(getEditorTheme());
});
</script>

<template>
  <div class="h-full w-full pt-2 font-mono" :id="props.id"></div>
</template>

<style>
html.dark .monaco-editor {
  --vscode-editor-background: #151619;
}
.monaco-editor .view-lines {
  padding-left: 0.5rem !important;
}
</style>
