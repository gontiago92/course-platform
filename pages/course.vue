<script lang="ts" setup>

const course = await useCourse()
const firstLesson = await useFirstLesson()

const resetError = async (error: { value: null; }) => {
  await navigateTo(firstLesson.path)
  error.value = null
}
</script>

<template>

  <div>
    fewfwefwe
    <div class="mb-4 flex justify-between items-center w-full"> <!-- should have justify between instead if center -->
      <h1 class="text-3xl">
        <span class="font-medium">
          <span class="font-bold">{{ course.title }}</span>
        </span>
      </h1>
      <UserCard />
    </div>

    <div class="flex flex-row justify-center flex-grow">
      <div
          class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[40ch] flex flex-col"
      >
        <h3 class="text-xl font-bold mb-10">Chapters</h3>

        <div
            class="space-y-1 mb-4 flex flex-col"
            v-for="chapter in course.chapters"
            :key="chapter.slug"
        >
          <h4 class="font-bold">{{ chapter.title }}</h4>
          <NuxtLink
              v-for="(lesson, index) in chapter.lessons"
              :key="lesson.slug"
              class="flex flex-row space-x-1 no-underline prose-sm font-normal py-1 px-4 -mx-4"
              :to="lesson.path"
              :class="{
              'text-gray-600':
                lesson.path !== $route.fullPath,
            }"
          >
            <span class="text-gray-500"
            >{{ index + 1 }}.</span
            >
            <span>{{ lesson.title }}</span>
          </NuxtLink>
        </div>
      </div>

      <div class="prose p-12 bg-white rounded-md w-[100ch]">
        <NuxtErrorBoundary>
          <NuxtPage />
          <template #error="{ error }">
            <p>
              Oh no, something went wrong with the lesson!
              <code>{{ error }}</code>
            </p>
            <p>
              <button
                  class="hover:cursor-pointer bg-gray-500 text-white font-bold py-1 px-3 rounded"
                  @click="resetError(error)"
              >
                Reset
              </button>
            </p>
          </template>
        </NuxtErrorBoundary>
      </div>
    </div>

  </div>

</template>

<style scoped>
.router-link-active {
  @apply text-emerald-500;
}
</style>
