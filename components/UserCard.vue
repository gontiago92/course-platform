<script lang="ts" setup>

const user = useSupabaseUser()

const name = computed(() => user.value?.user_metadata.full_name)
const profile = computed(() => user.value?.user_metadata.avatar_url)

const { auth } = useSupabaseClient()

const logout = async () => {
  console.log("Logging out...")
  const { error } = await auth.signOut()

  if(error) {
    console.log(error)
    return
  }

  try {
    await $fetch('/api/_supabase/session', {
      method: 'POST',
      body: { event: 'SIGNED_OUT', session: null }
    })

    user.value = null;
  } catch (e) {
    console.error(e)
  }

  await navigateTo("/login")
}


console.log(user.value)

const open = ref(false)


const toggleOpen = () => {
  open.value = !open.value
}

const target = ref(null)
onClickOutside(target, (event) => {
  event.stopPropagation()
  open.value = false
})
</script>

<template>
  <div v-if="user" class="avatar-menu relative w-56">

    <button @click="toggleOpen" id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatarName" :class="['p-1 flex items-center text-sm font-medium rounded-full hover:text-white md:mr-0', open ? 'text-white' : ' text-white/70' ]" type="button">
      <span class="sr-only">Open user menu</span>
      <img class="mr-2 w-8 h-8 rounded-full" :src="profile ? profile : 'https://fr.vnmod.net/wp-content/uploads/2022/12/021220221669944023.png'" alt="user photo">
      {{ name }}
      <svg class="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>

    <!-- Dropdown menu -->
    <div v-if="open" ref="target" id="dropdownAvatarName" class="absolute top-full right-0 py-2 px-3 mt-4 z-10 w-56 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
      <div class="py-3 px-4 text-sm text-gray-900 dark:text-white">
        <div class="font-medium ">Pro User</div>
        <div class="truncate">bonnie@flowbite.com</div>
      </div>
      <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
        <li>
          <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Work hours</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Toggler</a>
        </li>
      </ul>
      <div class="py-1">
        <a @click.prevent="logout" class="flex items-center gap-2 bg-red-500/80 py-2 px-4 text-sm text-white rounded-lg hover:bg-red-600 cursor-pointer">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>

          <span>Sign out</span>
        </a>
      </div>
    </div>

  </div>
</template>

<style scoped></style>
