<script setup lang="ts">
interface Props {
  icon?: string;
  value: string;
  disabled?: boolean;
  loading?: boolean;
}

interface Emits {
  (e: "change", value: string): void;
}

const emits = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  icon: "i-heroicons-pencil-square",
  disabled: false,
  loading: false,
});

const isEditing = ref(false);
function onChange(e: Event) {
  const input = e.target as HTMLInputElement;
  if (props.value !== input.value) {
    emits("change", input.value);
  }
}
</script>

<template>
  <div>
    <div :class="{ hidden: props.loading }">
      <UInput
        v-if="isEditing"
        :modelValue="props.value"
        :disabled="props.disabled"
        autofocus
        @change="onChange"
        @blur="isEditing = false" />
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
