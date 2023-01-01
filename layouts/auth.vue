<script lang="ts" setup>

const { theme } = useAppConfig()

</script>

<template>
  <div :class="theme.dark ? 'dark' : ''">
    <div class="bg-gray-100 dark:bg-primary dark:text-content-light w-screen h-screen">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
