<script setup lang="ts">
const error = useError()
const firstLesson = useFirstLesson()

const handleError = (errorCode: string) => {
  if(errorCode) {

    let redirectUrl;
    switch (parseInt(errorCode)) {
      case 404:
        redirectUrl = `${firstLesson.path}`
        break;
      case 401:
        redirectUrl = "/login"
        break;
      default:
        redirectUrl = "/"

    }

    clearError({
      redirect: redirectUrl
    })
  }

}
</script>

<template>
  <div class="misc-wrapper bg-[#232333] text-[#a3a4cc] flex flex-col justify-center items-center h-screen">

    <div v-if="error.statusCode === '404'" class="flex flex-col justify-center items-center">
      <h2 class="mb-2 mx-2">{{ error.message }} 😖</h2>
      <p class="mb-4 mx-2">Oops! 😖 The requested URL was not found on this server.</p>
      <button @click="handleError(error.statusCode)" class="px-4 py-2 bg-indigo-500 rounded-lg text-white/80 hover:text-white hover:bg-indigo-600">Back to course</button>
      <div class="mt-3">
        <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/illustrations/page-misc-error-dark.png" alt="page-misc-error-light" width="500" class="img-fluid" data-app-dark-img="illustrations/page-misc-error-dark.png" data-app-light-img="illustrations/page-misc-error-light.png">
      </div>
    </div>
    <div v-if="error.statusCode === '401'" class="flex flex-col justify-center items-center">
      <h2 class="mb-2 mx-2">{{ error.message }} 😖</h2>
      <p class="mb-4 mx-2">You do not have permission to view this page using the credentials that you have provided while login.
        Please contact your site administrator.</p>
      <button @click="handleError(error.statusCode)" class="px-4 py-2 bg-indigo-500 rounded-lg text-white/80 hover:text-white hover:bg-indigo-600">Back to login</button>
      <div class="mt-3">
        <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/illustrations/girl-with-laptop-dark.png" alt="page-misc-error-light" width="500" class="img-fluid" data-app-dark-img="illustrations/page-misc-error-dark.png" data-app-light-img="illustrations/page-misc-error-light.png">
      </div>
    </div>
    <div v-if="error.statusCode !== '401' && error.statusCode !==  '404'" class="flex flex-col justify-center items-center">
      <h2 class="mb-2 mx-2">{{ error.message }}</h2>
      <p class="mb-4 mx-2">Oops! 😖 The requested URL was not found on this server.</p>
      <button @click="handleError(error.statusCode)" class="px-4 py-2 bg-indigo-500 rounded-lg text-white/80 hover:text-white hover:bg-indigo-600">Back to home</button>
      <div class="mt-3">
        <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/illustrations/page-misc-error-dark.png" alt="page-misc-error-light" width="500" class="img-fluid" data-app-dark-img="illustrations/page-misc-error-dark.png" data-app-light-img="illustrations/page-misc-error-light.png">
      </div>
    </div>

  </div>
</template>


<style scoped>

.mb-2 {
  margin-bottom: 0.5rem !important;
}
.mx-2 {
  margin-right: 0.5rem !important;
  margin-left: 0.5rem !important;
}

  h2, .h2 {
    font-size: calc(1.325rem + 0.9vw);
  }
  h6, .h6, h5, .h5, h4, .h4, h3, .h3, h2, .h2, h1, .h1 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-weight: 500;
    line-height: 1.1;
    color: #cbcbe2;
  }
</style>