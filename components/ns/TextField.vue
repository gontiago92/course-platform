<script lang="ts" setup>


defineProps<{
  label: string;
  placeholder?: string;
  type?: string;
  prependIcon?: string;
  appendIcon?: string;
  errorMessage?: string;
  modelValue: string;
}>();

const emit = defineEmits(["click:icon", "update:modelValue"])

</script>

<template>
  <div>
    <label :for="label" class="block text-xs font-semibold text-content uppercase">{{ label }}</label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <div v-if="prependIcon || appendIcon" :class="['absolute inset-y-0 flex items-center', { 'left-0 pl-3': prependIcon, 'right-0 pr-3': appendIcon, '-top-5/12': errorMessage }]">
        <span class="text-content sm:text-sm">
            <Icon v-if="prependIcon && typeof prependIcon === 'string' || appendIcon && typeof appendIcon === 'string'" size="20" :name="prependIcon ?? appendIcon" @click="emit('click:icon')" class="hover:cursor-pointer" />
        </span>
      </div>
      <input
        :type="type ? type : 'text'"
        name="price"
        :id="label"
        :class="['block w-full rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none bg-transparent', errorMessage ? 'border-red-500' : 'border-content/50', { 'pl-7 pr-12': prependIcon, 'pr-12': appendIcon }]"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <p v-if="errorMessage" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
