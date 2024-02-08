<script setup>
import moment from "moment";

const props = defineProps({
  prefix: {
    type: String,
    default: "",
  },
  isoString: {
    type: String,
    default: new Date().toISOString(),
  },
  refreshInterval: {
    type: Number,
    default: 60 * 1000, // every 1 min,
  },
});

const datetime = ref(props.isoString);
const refreshKey = ref(Date.now());
const timerId = ref(null);

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
  <UBadge color="white" variant="solid" :key="refreshKey">
    {{ `${props.prefix} ${moment(datetime).fromNow()}` }}
  </UBadge>
</template>
