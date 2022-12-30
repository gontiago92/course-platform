<script setup lang="ts">
const course = useCourse()
const route = useRoute()

const chapter = computed(() => {
  return course.chapters.find(chapter => chapter.slug === route.params.chapterSlug)
})


const lesson = computed(() => {
  return chapter.value?.lessons.find(lesson => lesson.slug === route.params.lessonSlug)
})

const title = computed(() => `${lesson.value?.title} - ${course.title}`)

useHead({
  title: title
})

const progress = useLocalStorage('progress', []);


const isLessonCompleted = computed(() => {
  if(!progress.value[chapter.value.number - 1]) {
    return false
  }

  if(!progress.value[chapter.value.number - 1][lesson.value.number - 1]) {
    return false
  }

  return progress.value[chapter.value.number - 1][lesson.value.number - 1];
})

const toggleComplete = () => {
  if(!progress.value[chapter.value.number - 1]) {
    progress.value[chapter.value.number - 1] = []
  }

  progress.value[chapter.value.number - 1][lesson.value.number - 1] = !isLessonCompleted.value
}
</script>

<template>
  <div>
    <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
      Lesson {{ chapter.number }} - {{ lesson.number }}
    </p>
    <h2 class="my-0 text-2xl font-bold">{{ lesson.title }}</h2>
    <div class="flex space-x-4 mt-2 mb-8">
      <NuxtLink
          v-if="lesson.sourceUrl"
          class="font-normal text-md text-gray-500 underline"
          :to="lesson.sourceUrl"
      >
        Download Source Code
      </NuxtLink>
      <NuxtLink
          v-if="lesson.downloadUrl"
          class="font-normal text-md text-gray-500 underline"
          :to="lesson.downloadUrl"
      >
        Download Video
      </NuxtLink>
    </div>

    <VideoPlayer v-if="lesson.videoId" :video-id="lesson.videoId" class="w-full" />

    <p class="mb-6">{{ lesson.text }}</p>

    <LessonCompleteButton :model-value="isLessonCompleted" @update:model-value="toggleComplete" />

  </div>

</template>


<style scoped>

</style>