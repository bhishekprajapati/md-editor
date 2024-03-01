<script setup lang="ts">
const router = useRouter();
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
  <ULink
    v-else
    to="/auth/sigin"
    class="rounded-full border border-slate-950 p-4 px-6 dark:border-white">
    Sign in
  </ULink>
</template>
