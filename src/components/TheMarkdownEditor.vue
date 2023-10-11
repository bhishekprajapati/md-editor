<script setup>
import { onMounted } from "vue";
import * as monaco from "monaco-editor";
import tailwindcssConfig from "../../tailwind.config";

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

onMounted(() => {
  monaco.editor.create(document.getElementById(props.id), {
    value: props.value,
    theme: "vs-dark",
    language: "markdown",
    fontFamily: tailwindcssConfig.theme.fontFamily?.mono[0],
    fontSize: 16,
  });

  const editorModel = monaco.editor.getModels()[0];

  editorModel.onDidChangeContent((e) => {
    emits("change", editorModel.getValue());
  });
});
</script>

<template>
  <div class="h-full w-full pt-2 font-mono" :id="props.id"></div>
</template>

<style>
.monaco-editor .view-lines {
  padding-left: 0.5rem !important;
}
</style>
