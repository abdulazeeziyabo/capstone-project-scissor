<template>
    <div class="bg-[url('../assets/images/aurora.svg')]  h-screen bg-cover">
        <div class="max-w-md md:max-w-[620px] mx-auto ">
            <h1 class="font-bold text-3xl py-[100px] leading-[60px]"><span class="relative text-[#005AE2] animate-pulse">
            <img
        src="" alt="Vector Image" width="164px" class="absolute right-9 animate-pulse"/>
        </span> </h1>
        
      <p class="font-semibold tracking-tight -mt-9 text-xl text-[#5C6F7F] animate-pulse"></p>
        <div class="flex  items-center gap-9 mt-[80px] ">
      <routerLink to="/sign-up"><button class="bg-[#005AE2] border rounded-full text-white hover:text-black w-[140px] h-[44px] focus:text-white focus:bg-[#005AE2] focus:border-none animate-pulse"></button></routerLink>
      <button class="text-[#005AE2] animate-pulse"></button>
    </div>
        </div>
        
    </div>
     <div class="flex justify-between items-center px-5 bg-[#f9fbfd] h-[115px] desktop-header animate-pulse">
        <p class="font-bold text-3xl"> <br><span class="text-[#005AE2]"></span></p>
        <p class="font-bold"> <br><span class="font-medium"></span></p>
        <p class="font-bold"> <br><span class="font-medium"></span></p>
        <p class="font-bold"> <br><span class="font-medium"></span></p>
        <p class="font-bold"><br><span class="font-medium"></span></p>
      </div>
   <div class="flex mt-[70px] px-8 desktop-container animate-pulse">
    <div>
      <h2 class="flex gap-3 text-3xl font-bold">
        <img src="../assets/images/Line 70.png" alt="A line image" class="line">
        <strong class="text-[#005AE2]"></strong>
      </h2>
      <p class="choose-body"></p>
    </div>
    <div class=" scissor-container">
      <div class="relative">
        <routerLink to="/shortening-urls">
          <Ellipse class="cursor-pointer"/>
        <img
          src="../assets/images/link-2.png" class="w-[34px] absolute top-3 left-3"/>
        </routerLink>
        
        <h3 class="text-3xl font-bold mt-4 mb-4"></h3>
        <p></p>
      </div>

      <div class="relative">
       <routerLink to="/custom-urls">
        <Ellipse class="cursor-pointer"/>
         <img src="../assets/images/edit.png" alt="Edit Logo"
        class="absolute top-3 left-4">
       </routerLink>
        <h3 class="text-3xl font-bold mt-4 mb-4"></h3>
        <p>
        </p>
      </div>
      <div class="relative">
       <routerLink to="/qrcode-generator">
        <Ellipse class="cursor-ponter"/>
      <img src="../assets/images/grid.png" alt=""
          class="absolute top-4 left-4">
       </routerLink>
        <h3 class="text-3xl font-bold mt-4 mb-4"></h3>
        <p></p>
      </div>
      <div class="relative">
        <routerLink to="/analytics-page">
          <Ellipse class="cursor-pointer"/>
    <img src="../assets/images/activity.png" alt=""
          class="absolute top-4 left-4">
        </routerLink>
        <h3 class="text-3xl font-bold mt-4 mb-4"></h3>
        <p></p>
      </div>
   </div> 
     </div> 
    
</template>

<script setup lang="ts">
import Ellipse from "@/components/svg-components/Ellipse-page.vue"
</script>

<style scoped>
.scissor-container {
  display: grid;
  grid-template-columns: 300px 300px;
  grid-template-rows: 300px 300px;
  margin-left: 200px;
  gap: 20px;
}
@media (max-width:1000px) {
  .desktop-header {
    width: 100%;
    margin-top: 130px;
}
  .desktop-container {
    display: grid;
    grid-template-columns: 100px 100px;
    gap: 10px;
    display: block;
    }
  .scissor-container {
    margin-top: 70px;
    margin-left: 90px;
  }

}
</style>