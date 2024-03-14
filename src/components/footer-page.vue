<template>
    <div>
    <div class="mt-[200px] mx-auto w-[544px] flex">
      <div class="flex flex-col gap-6 items-center">
        <div class="">
          <img src="../assets/images/Logo.png">
        </div>
        <div class="flex gap-3 items-center">
          <a href=""><img src="../assets/facebook-logo.svg" alt=" FaceBook Logo" class="w-[54px] h-[34px] cursor-pointer"></a>
          <a href=""><img src="../assets/images/linkedin-logo.svg" alt="LinkedIn Logo" class="w-[34px] h-[34px] cursor-pointer" ></a>
          <a href=""><img src="../assets/Xlogo.svg" alt="X Logo" class="w-[54px] h-[44px]"></a>
        </div>
        </div>
    </div>
    <div class="flex gap-3  mt-[20px]  mb-0 justify-end px-5 relative">
        <p class="text-end ">Created by Abdulazeez Iyabo</p>
        <p class="border-l-2 border-[#5C6F7F] pl-4">Scissor 2024</p>
       
    </div>
    <div class="relative">
      <img src="../assets/images/Group-3.png" class="absolute -mt-[350px]">
      <img src="../assets/images/Group-2.png"
        class="absolute -mt-[170px] mx-[900px]" >
    </div>
    </div>
</template>

<script setup lang="ts">
import XLogo from '@/components/svg-components/twitterLogo.vue';
import VLogo from '@/components/svg-components/VLogo.vue';
</script>

<style scoped>

</style>