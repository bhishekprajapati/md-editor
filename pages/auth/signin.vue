<script setup lang="ts">
const signin = () => $fetch("/api/auth/signin/github");
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <UCard>
      <UButton type="submit" block @click="signin">
        <Icon name="uil:github" color="black" /> Signin with Github
      </UButton>
    </UCard>
  </div>
</template>
