<template>
  <router-view />
</template>

<script setup lang="ts">
  import { getAuth, onAuthStateChanged } from "firebase/auth"; import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties     // https://firebase.google.com/docs/reference/js/auth.user

    const uid = user.uid;
     userStore.isLoggedIn = true;
   localStorage.setItem("isLoggedIn", `${true}`);

     console.log("----=====>", user);

interface User{
   isLoggedIn: boolean;
}
     userStore.user = { isLoggedin:true, ...user };

// // login page --> dashboard (product-page)
   } else {
// //     // User is signed out ...
    console.log("User should be signed out");
 }
 });
</script>

<style scoped></style>