<script setup>
import copy from "copy-to-clipboard";
import markdownIt from "markdown-it";
import Shiki from "@shikijs/markdown-it";

const toast = useToast();

const md = markdownIt("commonmark", {
  html: false,
  xhtmlOut: false,
  linkify: true,
  typographer: true,
});

md.use(
  await Shiki({
    themes: {
      light: "github-light",
      dark: "night-owl",
    },
  }).catch((err) => console.error(err)),
);

const props = defineProps({
  code: {
    type: String,
    default: "",
  },
});

const markdownContainer = ref(null);
const html = computed(() => md.render(props.code));
const preList = ref([]);
const observer = ref(null);

onMounted(() => {
  const el = markdownContainer.value;
  if (el) {
    observer.value = new MutationObserver(() => {
      const pres = el.querySelectorAll("pre.shiki");
      pres &&
        (preList.value = Array.from(
          { length: pres.length },
          (_, idx) => idx + 1,
        ));
    });
    observer.value.observe(el, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    // to attach buttons on initial load
    el.removeAttribute("data-trigger");
  }
});

onUnmounted(() => {
  observer.value?.disconnect();
});

function handleCopy(selector) {
  const el = document.querySelector(selector);
  try {
    copy(el.textContent);
    toast.add({ title: "Copied!", color: "orange" });
  } catch (err) {
    toast.add({ title: "Somethin went wrong!", color: "red" });
  }
}
</script>

<template>
  <div
    ref="markdownContainer"
    class="markdown px-5 py-4 md:px-6 md:py-[1.37rem]"
    v-html="html"
    data-trigger></div>

  <div v-if="preList.length">
    <div v-for="num of preList" :key="preList.length">
      <Teleport :to="`.markdown > pre:nth-of-type(${num})`" key="num">
        <UButton
          class="absolute right-0 top-0 m-4"
          color="gray"
          icon="i-heroicons-clipboard"
          @click="() => handleCopy(`.markdown > pre:nth-of-type(${num})`)" />
      </Teleport>
    </div>
  </div>
</template>
