<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <UCard>
      <template #header>
        <div class="flex items-center gap-x-2">
          <UIcon
            class="h-6 w-6"
            name="i-heroicons-arrow-left-end-on-rectangle" />
          <span class="text-2xl font-medium">Sign In</span>
        </div>
      </template>

      <UButton type="submit" block to="/api/auth/signin/github" external>
        <Icon name="uil:github" color="black" /> Signin with Github
      </UButton>
    </UCard>
  </div>
</template>
