<template>
    <div class="flex justify-between  items-center px-9 py-5 bg-[#F2F3F4] h-[85px]">
     <div class="flex  gap-3 items-center ">
       <SLogo class="h-[34px] w-[34px] "/>
       <routerLink to="/" class="font-bold text-3xl"> Scissors</routerLink>
     </div>
     <div class="flex  gap-[60px] middle-nav justify-between items-center h-full " :class="{active: isMenuActive}">
        <routerLink to="/my-urls" class="flex items-center h-full border-b-[3px] border-[#f2f3f4] py-9">My URLs</routerLink>
    <routerLink to="/price-page" class="flex items-center h-full border-b-[3px] border-[#f2f3f4] py-9">Pricing</routerLink>
    <routerLink to="/faqs-page"  class="flex items-center h-full border-b-[3px] border-[#f2f3f4] py-9">FAQs</routerLink>
    <div class="flex gap-8 items-center left-item">
     
     <div class="container flex items-center gap-6">
        <div class="login-conatiner">
        <routerLink  
     @click = "handleLogin"
      to="/login-page" 
     class="flex items-center h-[44px] border-b-[3px] border-[#f2f3f4]  w-[130px] pl-2   cursor-pointer hover:bg-[]login">Login</routerLink>
     </div>
   <div class="signup-container">
    <routerLink to="/sign-up" class="flex items-center h-[44px]   max-w-[200px] pl-5 pr-5 border text-white border-[#005AE2] bg-[#005AE2] text-center rounded-full cursor-pointer hover:bg-[#071827] singup">Signup for free</routerLink>
   </div>
    
     </div>
    </div>
    </div>
    
    <div class="hamburger " :class="{active: isMenuActive}" @click="toggleMenu">
         <span class="bar"></span>
         <span class="bar"></span>
         <span class="bar"></span>
       </div>
   
   </div>
   </template>
   
   <script setup lang="ts">
   import SLogo from './svg-components/SLogo.vue';
   import { useRouter } from 'vue-router';
   import {ref } from 'vue';
   import {getAuth, signOut } from 'firebase/auth';
   
   const router = useRouter();
   const isMenuActive = ref(false);
   const isLoggedIn  = ref(false);
   
   //login
   const handleLogin= ()=>{
     router.push('/login-page')
   };
   // sign out
   const handleLogout = async()=>{
     try{
     const auth = getAuth();
      await signOut(auth);
      localStorage.clear();
     router.push('/login-page');
   }catch(error){
     console.log(error)
   }
   }; 
   const toggleMenu= ()=>{
   isMenuActive.value = !isMenuActive.value
   }
   //close the menu when navigating to a new route
   router.beforeEach((to, from, next)=>{
   isMenuActive.value = false;
   next();
   })
   </script>
   <style scoped>
   a.router-link-exact-active{
     color:  rebeccapurple;
     font-size: large;
     font: 30px;
   }
   .hamburger{
     display: none;
     cursor: pointer;
   }
   .bar{
     display: block;
     width: 25px;
     height: 3px;
     margin: 5px auto;
     -webkit-transition: all 0.3s ease-in-out;
     transition:all 0.3s ease-in-out;
     background-color: blue;
   }
   @media (max-width:1000px) {
     .hamburger {
       display: block;
     }
     .hamburger.active .bar:nth-child(2){
   opacity: 0;
   }
   .hamburger.active .bar:nth-child(1) {
     transform: translateY(8px) rotate(45deg);
   }
   .hamburger.active .bar:nth-child(3) {
     transform: translateY(-8px) rotate(-45deg);
   } 
   .middle-nav{
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
     .middle-nav.active{
       left: 0;
     }
       .middle-nav a{
         color: white;
         padding: 8px 0;
         margin: 0px 20px;
         text-align: center;
         transition: all .50s ease;
         
       }
       a{
       border-bottom: none;
      padding-left: 2px;
   }
   .left-item{
     display: block;
     text-align: center;
     margin-right: -90px; 
   }
   .container{
    display: block;
    align-items: center;
    margin-top: -10px;
    margin-left: 30px;
   }
   .signup-container{
    margin-top: 60px;
    margin-bottom: 20px;
    margin-right: 50px;
    padding-right: 10px;
   }
   }
   @media (max-width:720px) {
     
   }
   </style>
   