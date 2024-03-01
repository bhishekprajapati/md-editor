<script setup lang="ts">
const emits = defineEmits(["change"]);
const props = withDefaults(
  defineProps<{
    icon: string;
    value: string;
    disabled: boolean;
    loading: boolean;
  }>(),
  {
    value: "",
    icon: "i-heroicons-pencil-square",
    disabled: false,
    loading: false,
  },
);

const fieldValue = ref(props.value);
const isEditing = ref(false);

function notify() {
  isEditing.value = false;

  // if have local modifications
  if (props.value !== fieldValue.value) {
    emits("change", fieldValue.value);
  }
}
</script>

<template>
  <div>
    <div :class="{ hidden: props.loading }">
      <UInput
        v-if="isEditing"
        v-model="fieldValue"
        @blur="notify"
        :disabled="props.disabled"
        autofocus />
      <UButton
        v-else
        @click="isEditing = true"
        color="white"
        variant="ghost"
        :icon="props.disabled ? '' : props.icon"
        :disabled="props.disabled">
        {{ `${props.value}.md` }}
      </UButton>
    </div>
    <USkeleton class="h-8 w-32" :class="{ hidden: !props.loading }" />
  </div>
</template>
