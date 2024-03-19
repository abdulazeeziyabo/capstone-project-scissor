<template>
  <div class="flex justify-between items-center px-9 py-5 bg-[#F2F3F4] h-[75px]">
    <div class="flex gap-3 items-center">
      <SLogo class="h-[34px] w-[34px] mt-2" />
      <routerLink to="/my-urls" class="font-bold text-3xl">Products</routerLink>
    </div>
    <div
      class="flex gap-[80px] middle-nav justify-between items-center h-full"
      :class="{ active: isMenuActive }"
    >
      <routerLink
        to="/my-urls"
        class="flex items-center h-full border-b-[3px] border-[#f2f3f4] py-9 cursor-pointer"
        >Shorten your URLs</routerLink
      >
      <routerLink
        to="/custom-url"
        class="flex items-center h-full border-b-[3px] border-[#f2f3f4] py-9 cursor-pointer"
        >Customize your URLs
      </routerLink>
      <routerLink
        to="/profile-page"
        class="flex items-center h-full border-b-[3px] border-[#f2f3f4] py-9 cursor-pointer"
        >Profile
      </routerLink>
    </div>
    <div class="flex gap-8 items-center">
      <div class="mt-9 rounded-full mx-auto mb-10 cursor-pointer flex items-center gap-2">
        <span class="text-bold text-xl">{{ profile.displayName }}</span>
        <span class="text-2xl font-semibold text-gray-400" v-if="!profile.photoUrl"></span>

        <img
          :src="profile.photoUrl"
          alt="photo-url"
          class="h-[70px] w-[70px] object-cover rounded-full"
          v-else
        />
      </div>

      <button
        type="button"
        @click="handleLogout"
        class="flex items-center h-full border-[#f2f3f4] py-6 cursor-pointer"
      >
        SignOut
      </button>
      <div class="hamburger" :class="{ active: isMenuActive }" @click="toggleMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SLogo from './svg-components/SLogo.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { reactive } from 'vue'
interface UserProfile {
  email: string
  displayName: string
  photoUrl: string
}
const router = useRouter()
const isMenuActive = ref<boolean>(false)

const profile = reactive<UserProfile>({
  email: '',
  displayName: '',
  photoUrl: ''
})

//handle sign out
const handleLogout = async () => {
  try {
    const auth = getAuth()
    await signOut(auth)
    localStorage.clear()
    router.push('/login-page')
  } catch (error) {
    console.log(error)
  }
}
const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value
}
//close the menu when navigating to a new route
router.beforeEach((to, from, next) => {
  isMenuActive.value = false
  next()
})
//Listen for user authentication state change
const auth = getAuth()
onAuthStateChanged(auth, (user) => {
  if (user) {
    //user is sign in
    profile.displayName = user.displayName || ''
    profile.email = user.email || ''
    profile.photoUrl = user.photoURL || ''
  } else {
    //user is signed out
    profile.displayName = ''
    profile.email = ''
    profile.photoUrl = ''
  }
})
</script>
<style scoped>
a.router-link-exact-active {
  color: #005ae2;
}
.hamburger {
  display: none;
  cursor: pointer;
}
.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: blue;
}
@media (max-width: 1000px) {
  .hamburger {
    display: block;
  }
  .hamburger.active .bar:nth-child(2) {
    opacity: 0;
  }
  .hamburger.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  .hamburger.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
  .middle-nav {
    position: absolute;
    left: -120%;
    top: 70px;
    gap: 0;
    flex-direction: column;
    background-color: #071827;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    z-index: 100;
  }
  .middle-nav.active {
    left: 0;
  }
  .middle-nav a {
    color: white;
    padding: 6px 0;
    margin: 0px 20px;
    text-align: center;
    transition: all 0.5s ease;
  }
  a {
    border-bottom: none;
    padding-left: 2px;
  }
}
</style>
