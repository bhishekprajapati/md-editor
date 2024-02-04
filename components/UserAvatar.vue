<script setup>
const router = useRouter();
const toast = useToast();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

async function signOut() {
  const { error } = await supabase.auth.signOut({});

  if (error) {
    toast.add({ title: "Failed to sign out!" });
    console.error(error);
    return;
  }

  router.push("/");
}

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
    <UAvatar :alt="user.email.toUpperCase()" size="md" />
  </UDropdown>
</template>
