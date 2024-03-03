<script setup lang="ts">
const router = useRouter();
const { signout } = useAuth();
const { user } = await useUser();

const items = [
  [
    {
      label: "Files",
      icon: "i-heroicons-document-text",
      click: () => router.push(`/${user.data.value?.id}`),
    },
    {
      label: "Sign out",
      labelClass: "text-red-500",
      icon: "i-heroicons-arrow-right-start-on-rectangle",
      click: signout,
    },
  ],
];
</script>

<template>
  <UDropdown
    v-if="user.data.value"
    mode="hover"
    :items="items"
    :popper="{ placement: 'bottom-start' }">
    <UAvatar :alt="user.data.value.githubUsername.toUpperCase()" size="md" />
  </UDropdown>
</template>
