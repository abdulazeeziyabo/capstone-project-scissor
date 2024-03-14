<template>
  <router-view />
</template>

<script setup lang="ts">
  import { getAuth, onAuthStateChanged } from "firebase/auth"; import { useUserStore } from "@/stores/user";

  const userStore = useUserStore();
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // userStore.isLoggedIn = true;
      // //localStorage.setItem("isLoggedIn", `${true}`);
      // const userDetails = { isLoggedIn: true, ...user };
      // userStore.user = userDetails;
      // // login page --> dashboard (product-page)
    } else {
      // User is signed out ...
      console.log("User should be signed out");
    }
  });
</script>

<style scoped></style>