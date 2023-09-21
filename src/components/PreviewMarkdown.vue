<script setup>
const props = defineProps(["code"]);
const markdownParser = (text) => {
  const rules = [
    //header rules
    [/#{6}\s?([^\n]+)/g, "<h6>$1</h6>"],
    [/#{5}\s?([^\n]+)/g, "<h5>$1</h5>"],
    [/#{4}\s?([^\n]+)/g, "<h4>$1</h4>"],
    [/#{3}\s?([^\n]+)/g, "<h3>$1</h3>"],
    [/#{2}\s?([^\n]+)/g, "<h2>$1</h2>"],
    [/#{1}\s?([^\n]+)/g, "<h1>$1</h1>"],

    //bold, italics and paragragh rules
    [/\*\*\s?([^\n]+)\*\*/g, "<b>$1</b>"],
    [/\*\s?([^\n]+)\*/g, "<i>$1</i>"],
    [/__([^_]+)__/g, "<b>$1</b>"],
    [/_([^_`]+)_/g, "<i>$1</i>"],
    [/([^\n]+\n?)/g, "<p>$1</p>"],
  ];

  text.trim();
  rules.forEach(([regex, template]) => {
    if (regex && template) {
      text = text.replace(regex, template);
    }
  });
  return text;
};
</script>

<template>
  <section>
    <div
      class="px-5 py-4 md:px-6 md:py-[1.37rem]"
      v-html="markdownParser(props.code)"></div>
  </section>
</template>
