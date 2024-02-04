<script setup>
import moment from "moment";
const props = defineProps(["data"]);
</script>

<template>
  <ULink class="text-left" :to="`/editor/${props.data.id}`">
    <UCard>
      <article>
        <h2 class="mb-4">
          <UIcon name="i-heroicons-document" class="mr-4 align-middle" />
          {{ props.data.name }}.md
        </h2>
        <ClientOnly>
          <ul>
            <li class="mb-2">
              <UIcon name="i-heroicons-calendar-days" class="mr-4" />Created at
              {{ moment(props.data.createdAt).format("DD MMMM YYYY") }}
            </li>
            <li class="mb-2">
              <UIcon name="i-heroicons-arrow-path" class="mr-4" />Last modified
              {{ moment(props.data.updatedAt).fromNow() }}
            </li>
          </ul>
        </ClientOnly>
        <!-- {{ props.data.id }} -->
      </article>
    </UCard>
  </ULink>
</template>
