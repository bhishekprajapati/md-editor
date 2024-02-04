<template>
  <div class="flex h-dvh w-dvw flex-col overflow-hidden">
    <header>
      <AppHeader class="h-full" />
    </header>
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
