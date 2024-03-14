<template>
    <div class="w-[462px] mx-auto mt-[122px]">
     <div class="font-semibold text-[#5c6f7f] text-center text-xm mb-3 mx-10">
        Login with:
     </div> 
     <div class="flex gap-8 items-center mb-5 w-[242px] mx-auto">
            <button 
            @click="handleGoogleLogin"
            class=" flex items-center gap-2 bg-[#005AE2]
     w-[109px] h-[40px] border rounded text-[#5c6f7f] text-base px-3 text-white"> <GLogo class=""/>Google</button> 
    
        <button 
        @click="handleLoginWithApple"
        class="flex items-center gap-2 bg-[#005AE2]
     w-[109px] h-[40px] border rounded text-[#5c6f7f] text-base px-3 text-white"><img src="../assets/images/appleLogo.png" alt="Apple Logo" class="w-[34px] h-[34px]">Apple</button>
     </div>
     <div class="text-center wrapper pl-3 mb-5 lowercase text-sm text-[#5C6F7F] font-bold">Or</div>
     <form action="" class="">
        <div class="flex flex-col gap-4 h-full w-full">
        <label for="email" ></label>
        <input type="text" 
        name="email" 
        placeholder="Enter your email address " 
        class=" border-solid border-2 border-[#005AE2] rounded px-3 py-3" v-model="v$.email.$model"/>
        <small class="text-red-500" v-if="v$.email.$errors.length">{{
            v$.email.$errors[0].$message
          }}</small>
        <label for="password" class="relative">
        <button @click.prevent="handleShow()" 
        class="relative">
        <ELogo class="absolute left-[420px] top-[40px]"/>
            </button>
        </label>
        <input :type="showEye? 'text':'password'" name="password" placeholder="Password" class=" border-solid border-2 border-[#005AE2] rounded px-3 py-3 "  v-model="v$.password.$model"/>
        <small class="text-red-500 font-medium text-xs" v-if="v$.password.$errors.length">{{
            v$.password.$errors[0].$message  }}</small>
        </div>
        <button type="button" class="border rounded-3xl w-full bg-[#005AE2] px-3 py-3 text-white text-center mt-6" @click.prevent="handleLogin">Login </button>
        <div class="text-center mt-3">
            <div class="font-medium text-sm mb-5">
    <p class="text-[#5C6F7F]">Don't have an account? <routerLink to="/sign-up" class="text-[#005AE2] ">Sign up</routerLink> </p>
    </div>
        <div class="mb-6">
            <p class="text-[#A0B1C0] leading-4 font-medium text-sm">
            By signing in with an account, you agree to Scissors <span class="text-[#5C6F7F]">Terms of Service, Privacy Policy </span> and <span class="text-[#5C6F7F]">Acceptable Use Policy.</span>
        </p></div>
        </div>
     </form>
    </div>
    <Footer />
    </template>

<script setup lang="ts" >
import {signInWithEmailAndPassword, getAuth,signInWithPopup, GoogleAuthProvider, OAuthProvider} from 'firebase/auth';
import { useRouter } from 'vue-router';
import {reactive, ref} from 'vue';
import { toast } from "vue3-toastify";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import GLogo from '@/components/svg-components/GLogo.vue';
import Footer from '../components/footer-page.vue';
import ELogo from '../components/svg-components/E-logo.vue';


const router = useRouter();
   const showEye = ref(false)
   const user = reactive({
    email: '',
    password: ''
   });

   //login in with google
const provider = new GoogleAuthProvider();
const auth = getAuth();
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log(user);
    if(user){
        router.push("/my-urls")
    }
  } catch (error) {
    console.error('Error loggin:', error);
        toast.error('Failed to login with google. Try again.');
  }
};
//login with apple
const handleLoginWithApple = async () => {
    const provider = new OAuthProvider('apple.com')
    try {
        // Use signInWithPopup with AppleAuthProvider
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user);
        if(user){
            router.push('/my-url')
        }
    } catch (error) {
        console.error('Error logging in with Apple:', error);
        toast.error('Failed to login with Apple. Try again.');
    }
};

   //vuelidate
   const userRules = {
  email: { required, email },
  password: { required, minLength: minLength(8) },
};
const v$ = useVuelidate(userRules, user);
   //handle Login
   const handleLogin = async ()=>{
    const isValid = await v$.value.$validate();
  if (!isValid) return;
      try{
        const auth = getAuth();
const response = await signInWithEmailAndPassword(auth, user.email, user.password)
console.log(response);
if(response.user){
    localStorage.setItem("isLoggedIn", "true");
 router.push("/my-urls")
}
}catch(error:any){
   console.log (error.message);
   toast.error(error.message)
}
} 

const handleShow = ()=>{
    showEye.value = !showEye.value
}
</script>

<style>
/* .wrapper{
    border-bottom: 2px solid #A0B1C0 ;
    
    color: #5C6F7F;

} */
</style>