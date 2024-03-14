<template>
    <div v-if="!isLoading" >
     <div class="bg-[url('../assets/images/aurora.svg')]  h-[100%]bg-cover bg-no-repeat">
         <div class="max-w-md md:max-w-[620px] mx-auto ">
             <h1 class="font-bold text-3xl py-[100px] leading-[60px]">Optimize Your Online Experience with Our Advanced <span class="relative text-[#005AE2]">URL Shortening
             <img
         src="@/assets/images/Vector3.png" alt="Vector Image" width="164px" class="absolute right-9"/>
         </span>Solution</h1>
         
       <p class="font-semibold leading-[30px] -mt-9 text-base text-[#5C6F7F] mb-[50px]">Personalize your shortened URLs to align with your brand identity. Utilize custom slugs, branded links, and
         domain
         customization options to reinforce your brand presence and enhance user engagement. Sign up to use this service.</p>
         <div class="flex  items-center gap-9 -mt-[8px] mb-[50px] pb-[180px]">
       <button @click = "handleClick" class="bg-[#005AE2] border rounded-full text-white hover:text-black w-[140px] h-[44px] focus:text-white focus:bg-[#005AE2] focus:border-none">Sign Up</button>
       <button class="text-[#005AE2]">Learn more</button>
     </div>
         </div>
         
     </div>
     <div class="flex justify-between items-center  bg-[#f9fbfd] cover h-[115px] desktop-header -mt-[50px] ">
        <div class="pl-[80px] pr-[80px]  ">
         <p class="font-bold text-3xl stop">One Stop. <br>Four <span class="text-[#005AE2]">Possibilities</span>.</p>
        </div>
         <div class="flex justify-between gap-5 pl-[80px] pr-[80px] ">
           <p class="font-bold">3M <br><span class="font-medium">Active users</span></p>
         <p class="font-bold">60M <br><span class="font-medium">Links & QR codes created</span></p>
         <p class="font-bold">1M <br><span class="font-medium">Clicked & Scanned connections</span></p>
         <p class="font-bold">300K <br><span class="font-medium">App Integrations</span></p>
         </div>
       </div>
    <div class="flex mt-[70px] px-8 desktop-container">
     <div>
       <h2 class="flex gap-3 text-3xl font-bold">
         <img src="../assets/images/Line 70.png" alt="A line image">Why choose
         <strong class="text-[#005AE2]">Scissors</strong>
       </h2>
       <p class="choose-body">Scissors is the hub of everything that has to do with your link management. We shorten your
         URLs, allow you creating
         custom ones for your personal, business, event usage. Our swift QR code creation, management and usage tracking
         with
         advance analytics for all of these is second to none.</p>
     </div>
     <div class=" scissor-container">
       <div class="relative">
         <routerLink to="/my-urls">
           <Ellipse class="cursor-pointer"/>
         <img
           src="../assets/images/link-2.png" class="w-[34px] absolute top-3 left-3"/>
         </routerLink>
         
         <h3 class="text-3xl font-bold mt-4 mb-4">URL Shortening</h3>
         <p>Scissor allows you to shorten URLs of your business, events. Shorten your URL at scale, URL redirects.</p>
       </div>
 
       <div class="relative">
        <routerLink to="/my-urls">
         <Ellipse class="cursor-pointer"/>
          <img src="../assets/images/edit.png" alt="Edit Logo"
         class="absolute top-3 left-4">
        </routerLink>
         <h3 class="text-3xl font-bold mt-4 mb-4">Custom URLs</h3>
         <p>With Scissor, you can create custom URLs, with the length you want! A solution for socials and businesses.
         </p>
       </div>
       <div class="relative">
        <routerLink to="/my-urls">
         <Ellipse class="cursor-ponter"/>
       <img src="../assets/images/grid.png" alt=""
           class="absolute top-4 left-4">
        </routerLink>
         <h3 class="text-3xl font-bold mt-4 mb-4">QR Codes</h3>
         <p>Generate QR codes to your business, events. Bring your audience and customers to your doorstep with this scan
           and go
           solution.</p>
       </div>
       <div class="relative">
         <routerLink to="/my-urls">
           <Ellipse class="cursor-pointer"/>
     <img src="../assets/images/activity.png" alt=""
           class="absolute top-4 left-4">
         </routerLink>
         <h3 class="text-3xl font-bold mt-4 mb-4">Data Analytics</h3>
         <p>Receive data on the usage of either your shortened URL, custom URLs or generated QR codes. Embedded to
           monitor progress.</p>
       </div>
       <Footer/>
    </div>
     </div>
    </div> 
     <div v-else>
       <LoadingMockup/>
     </div>
 </template>
 
 <script setup lang="ts">
 import Ellipse from "@/components/svg-components/Ellipse-page.vue"
 import LoadingMockup from "@/components/loading-mockup.vue";
 import Footer from '../components/footer-page.vue'
 import { ref } from "vue";
 import { useRouter } from "vue-router";
 const router = useRouter()
 const handleClick =()=>{
   router.push('/sign-up')
 }
 const isLoading = ref(true) //initially set to true to show loading state
 setTimeout(()=>{
 isLoading.value = false // set isLoading to false to hide loading state
 }, 2000); //to delay loading for 2seconds
 
 </script>
 
 <style scoped>
 .desktop-header{
   width: 100%;
 }
 .scissor-container {
   display: grid;
   grid-template-columns: 300px 300px;
   grid-template-rows: 300px 300px;
   margin-left: 200px;
   gap: 20px;
   
 }
 @media (max-width:1000px) {
   .stop{
     font-size: 20px;
     line-height: 1;
     margin-bottom: 10px;
     margin-left: 1px;
   }
   .desktop-header {
     width: 100%;
    display: block;
     height: fit-content;
     font-size: 12px;
     margin-top: -50px;
 }
   .desktop-container {
     display: grid;
     grid-template-columns: 100px 1fr;
     gap: 10px;
     display: block;
     }
   .scissor-container {
     margin-top: 70px;
     margin-left: 10px;
   }
 
 }
 @media (max-width:470px) {
   .desktop-container{
    
   }
 }
 </style>