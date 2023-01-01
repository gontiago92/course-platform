<script lang="ts" setup>

const firstLesson = await useFirstLesson()
</script>

<template>
  <div class="text-center">
    <NuxtLink :to="firstLesson.path" class="underline text-2xl font-semibold">Go to first lesson</NuxtLink>
  </div>
</template>

<style scoped></style>
