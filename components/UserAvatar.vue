<script setup>
const router = useRouter();
const toast = useToast();
const user = await useUser();

async function signOut() {}

const items = [
  [
    {
      label: "Files",
      icon: "i-heroicons-document-text",
      click: () => router.push("/files"),
    },
    {
      label: "Sign out",
      labelClass: "text-red-500",
      icon: "i-heroicons-arrow-right-start-on-rectangle",
      click: signOut,
    },
  ],
];
</script>

<template>
  <UDropdown
    v-if="user"
    mode="hover"
    :items="items"
    :popper="{ placement: 'bottom-start' }">
    <UAvatar :alt="user.githubUsername.toUpperCase()" size="md" />
  </UDropdown>
</template>
