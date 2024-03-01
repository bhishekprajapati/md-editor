<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    refreshInterval: number;
  }>(),
  {
    refreshInterval: 60 * 1000,
  },
);

const refreshKey = ref(Date.now());
const timerId: Ref<null | ReturnType<typeof setInterval>> = ref(null);

onMounted(() => {
  timerId.value = setInterval(
    () => (refreshKey.value = Date.now()),
    props.refreshInterval,
  );
});

onUnmounted(() => {
  timerId.value && clearInterval(timerId.value);
});
</script>

<template>
  <slot :key="refreshKey" />
</template>
