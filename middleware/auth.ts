export default defineNuxtRouteMiddleware((to, from) => {

    const user = useSupabaseUser()

    if(to.params.chapterSlug === '1-chapter-1' || user.value) {
        return;
    }

    return navigateTo(`/login?redirectTo=${to.path}`)

})
