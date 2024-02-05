<template>
  <div class="grid-lines absolute inset-0"></div>
</template>

<style>
.grid-lines {
  --color: rgb(223, 223, 223);
  --length: 4rem;

  background-image: linear-gradient(to right, var(--color) 1px, transparent 1px),
    linear-gradient(to bottom, var(--color) 1px, transparent 1px);
  background-size: var(--length) var(--length);
  background-position: center center;
  mask-image: radial-gradient(100% 100% at top right, #fff, transparent);
}

.dark .grid-lines {
  --color: #20242d;
}

@media screen and (min-width: 48em) {
  .grid-lines {
    --length: 6rem;
  }
}
</style>
