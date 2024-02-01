<template>
  <div class="flex h-dvh w-dvw flex-col overflow-hidden">
    <header>
      <TheHeader class="h-full" />
    </header>
    <main class="flex-1">
      <ClientOnly placeholder="loading...">
        <TheMarkdown class="h-full" />
      </ClientOnly>
    </main>
  </div>
</template>
