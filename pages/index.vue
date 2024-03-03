<script setup lang="ts">
const config = useAppConfig();
const { user } = await useUser();
</script>

<template>
  <Head>
    <Title>Markdown Editor | Real time markdown editor.</Title>
  </Head>
  <div class="relative py-24 sm:py-32 md:py-40">
    <UContainer class="gap-16 sm:gap-y-24">
      <div class="text-center">
        <h1
          class="animate-text-gradient bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-400 bg-clip-text text-5xl font-bold capitalize tracking-tight text-transparent sm:text-7xl">
          Markdown editor with real-time collaborative experience!
        </h1>

        <p
          class="mb-16 mt-6 text-lg tracking-tight text-gray-600 dark:text-gray-300">
          Create, Edit, and Collaborate on Markdown documents in real-time with
          SyncWords. Effortless teamwork, anytime, anywhere
        </p>

        <ULink
          :to="
            user.data.value
              ? `/${user.data.value.id}`
              : config.auth.pages.signin
          "
          class="rounded-full bg-slate-950 p-4 text-white shadow-2xl shadow-slate-700 dark:bg-white dark:text-slate-950">
          <span class="mr-2"> Get Started </span>
          <UIcon name="i-heroicons-arrow-right" class="align-middle" />
        </ULink>
      </div>
    </UContainer>
  </div>
</template>
