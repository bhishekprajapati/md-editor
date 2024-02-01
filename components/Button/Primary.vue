<template>
  <button
    type="button"
    class="display-m rounded-md bg-orange-900 p-[0.62em] align-middle text-cream transition-all duration-500 hover:scale-105 hover:bg-orange-800 active:scale-95 disabled:pointer-events-none disabled:bg-grey-900">
    <span class="pointer-events-none">
      <span>
        <slot name="icon"></slot>
      </span>
    </span>
    <span class="pointer-events-none">
      <span>
        <slot></slot>
      </span>
    </span>
  </button>
</template>
