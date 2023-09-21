<template>
  <button
    type="button"
    class="display-m rounded-md bg-orange-900 p-[0.62em] align-middle text-cream transition-all duration-500 hover:scale-105 hover:bg-orange-800 active:scale-95">
    <span>
      <span>
        <slot name="icon"></slot>
      </span>
    </span>
    <span>
      <span>
        <slot></slot>
      </span>
    </span>
  </button>
</template>
