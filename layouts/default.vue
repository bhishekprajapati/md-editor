<template>
  <div>
    <header class="flex items-center p-4">
      <Logo />
      <ButtonThemeToggle class="ml-auto mr-4" />
      <UserAuthState />
    </header>
    <UDivider />
    <slot></slot>
  </div>
</template>
