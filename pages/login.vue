<script lang="ts" setup>
import type {Ref} from "vue";
import {useSupabaseUser} from "#imports";

definePageMeta({
  layout: "auth"
})

const course = await useCourse()
const { query } = useRoute()
/**
 * Supabase Github login fully working
 */
const supabase = useSupabaseClient()
const user = useSupabaseUser()

watchEffect(async () => {
  if(user.value) {
    await navigateTo(query.redirectTo as string, {
      replace: true
    })
  }
})

const login = async () => {
  const redirectTo = `${window.location.origin}${query.redirectTo}`

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo },
  })

  if(error) console.log(error)
}

/**
 * Simple email login (Not yet implemented)
 */
const username = ref("")
const usernameError: Ref<string | null> = ref(null)
const password = ref("")
const passwordError: Ref<string | null> = ref(null)

const show = ref(false)
const toggleShowPassword = () => {
  show.value = !show.value
}


</script>

<template>
  <div class="flex flex-col justify-center items-center h-full">
    <div class="card p-8 shadow bg-[#2b2c40] rounded max-w-500px border border-content/10 w-full">
      <div class="card-body flex flex-col gap-4">

        <h1 class="text-center text-2xl font-semibold">NBULS STUDIO</h1>

        <div>
          <h2 class="text-lg">Welcome to NBULS STUDIO! 👋</h2>
          <p class="text-sm">Please sign-in to your account and start the adventure</p>
        </div>

        <form class="flex flex-col gap-4">
          <ns-text-field v-model="username" label="Username" placeholder="Enter email" :error-message="usernameError" />

          <ns-text-field v-model="password" label="Password" placeholder="Enter your password" :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi:eye' : 'mdi:eye-off'" @click:icon="toggleShowPassword" :error-message="passwordError" />

          <button @click.prevent class="py-2 px-4 bg-indigo-500 rounded-lg text-white hover:bg-indigo-500/80 translate-y-0 hover:translate-y-6">Sign in</button>

          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" name="" id="" class="rounded bg-transparent checked:hover:bg-indigo-500 checked:bg-indigo-500 !outline-none focus:border-transparent focus:ring-0" />
            <span class="select-none">Remember me</span>
          </label>

          <div class="w-full h-12 flex items-center gap-6">
            <div class="w-full h-1px bg-content/30 rounded"></div>
            <span class="text-sm uppercase">OR</span>
            <div class="w-full h-1px bg-content/30 rounded"></div>
          </div>
        </form>

        <div class=" flex items-center justify-center gap-4">

          <button class="group bg-blue-600/10 hover:bg-blue-600 p-2 rounded-lg w-10 h-10 duration-300">
            <Icon size="20" name="ion:social-facebook" class="text-white" />
          </button>

          <button class="group bg-red-600/10 hover:bg-red-600 p-2 rounded-lg w-10 h-10 duration-300">
            <Icon size="20" name="mdi:google" class="text-white" />
          </button>

          <button @click.prevent="login" class="group bg-gray-600/10 hover:bg-gray-700 p-2 rounded-lg w-10 h-10 duration-300">
            <Icon size="20" name="mdi:github" class="text-white" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
