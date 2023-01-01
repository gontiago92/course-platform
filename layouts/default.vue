<script lang="ts" setup>
const { theme } = useAppConfig()
</script>

<template>
  <div :class="theme.dark ? 'dark' : ''">
    <div class="p-12 bg-gray-100 dark:bg-primary dark:text-content-light w-full h-full min-h-screen flex flex-col">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
