<template>
    <div class="w-[462px] mx-auto mt-[122px]">
     <div class="font-semibold text-[#5c6f7f] text-center text-xm mb-3 mx-10">
        Sign up with:
     </div> 
     <div class="flex gap-8 items-center mb-5 w-[442px] mx-auto ml-[80px]">
            <button 
            @click="handleGoogleLogin"
            class=" flex items-center gap-2 bg-[#005AE2]
     w-[109px] h-[40px] border rounded text-[#5c6f7f] text-base px-3 text-white"> <GLogo />Google</button> 
    
        <button 
        class="flex items-center gap-2 bg-[#005AE2]
     w-[170px] h-[40px] border rounded text-[#5c6f7f] text-base px-3 text-white"><img src="../assets/images/social-facebook.svg" alt="Facebook Logo" class="w-[34px] h-[34px]">Facebook</button>
     </div>
     <div class="text-center wrapper pl-3 mb-5 lowercase text-sm text-[#5C6F7F] font-bold">Or</div>
     <form action="" class="">
        <div class="flex flex-col gap-4 h-full w-full">
             <label for="username"></label>
        <input type="text" name="username" placeholder="Username" class=" border-solid border-2 border-[#005AE2] rounded px-3 py-3" v-model="user.userName" />
        <small class="text-red-500 font-medium text-xs" v-if="v$.userName.$errors.length">{{
                v$.userName.$errors[0].$message  }}</small> 
            <label for="email" ></label>
        <input type="text" name="email" placeholder="Email " class=" border-solid border-2 border-[#005AE2] rounded px-3 py-3" v-model="v$.email.$model"/>
        <small class="text-red-500 font-medium text-xs" v-if="v$.email.$errors.length">{{v$.email.$errors[0].$message  }}</small>
        <label for="password" class="relative">
        <button @click.prevent="handleShow('password')" class="relative">
        <ELogo class="absolute left-[420px] top-[40px]"/>
            </button>
        </label>
        <input :type="showEye? 'text':'password'" name="password" placeholder="Password" class=" border-solid border-2 border-[#005AE2] rounded px-3 py-3 "  v-model="v$.password.$model"/>
        <small class="text-red-500 font-medium text-xs" v-if="v$.password.$errors.length">{{v$.password.$errors[0].$message}}</small>
        
        <label for="password" class="relative">
            <button @click.prevent="handleShow('confirmPassword')" class="relative">
            <ELogo class="absolute left-[420px] top-[40px]"/></button>
        </label>
        <input :type="showEyeConfirmPassword ?'text': 'password'" name="password" placeholder="Retype your password" class=" border-solid border-2 border-[#005AE2] rounded px-3 py-3 focus:border focus:border-[#005ae2]" v-model="v$.confirmPassword.$model"/>
        <small
        class="text-red-500"
        v-if="v$.confirmPassword.$errors.length"
     >{{ v$.confirmPassword.$errors[0].$message }}</small>
        </div>
    
        <div class=" font-medium text-[#A0B1C0] text-xs"></div>
        <button type="button" 
        :disabled="isSubmitting"
        :class=" {'cursor-not-allowed' : isSubmitting}"
        class="border rounded-3xl w-full bg-[#005AE2] px-3 py-3 text-white text-center mt-6" 
        @click.prevent="handleSubmit">{{isSubmitting ? 'Signing in ...' : 'Signup with Email address'}}</button>
        <div class="text-center mt-3">
            <div class="font-medium text-sm mb-5 mt-4">
            <p class="text-[#5C6F7F] mt-4">Already have an account? <routerLink to="/login-page" class="text-[#005AE2] ">Login</routerLink> </p>
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
    
    <script setup lang="ts">
    import GLogo from '@/components/svg-components/GLogo.vue'
    import Footer from '../components/footer-page.vue'
    import ELogo from '../components/svg-components/E-logo.vue';
    import {createUserWithEmailAndPassword, getAuth,signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
    import { ref, reactive, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { toast } from "vue3-toastify";
    import { useVuelidate } from "@vuelidate/core";
    import { required, email, minLength, sameAs } from "@vuelidate/validators";
    
    interface userTpye{
        userName: string;
        email: string;
        password:string;
        confirmPassword:string;
        photoURL:string
    }
    const router = useRouter();
    const showEye = ref(false)
    const showEyeConfirmPassword =ref(false);

    const user = reactive<userTpye>({
        userName: '',
        email: "",
        password: "",
       confirmPassword: "",
       });
      const isSubmitting = ref(false);
    const userRules = {
        userName:{required},
      email: { required, email },
      password: { required, minLength: minLength(8) },
      confirmPassword: {
        required,
        minLength: minLength(8),
         sameAs: sameAs(computed(() => user.password)),
      },
    };
    const v$ = useVuelidate(userRules, user);

    //signin in with google
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
    
const handleSubmit = async () => {
    const auth = getAuth();
    const isValid = await v$.value.$validate();
    
    if (!isValid) return;

    try {
        const response = await createUserWithEmailAndPassword(
            auth,
            user.email,
            user.password
        );

        if (response.user) {
            const currentUser = auth.currentUser;
            if (currentUser) {
                // Ensure currentUser is not null before updating profile
                await updateProfile(currentUser, {
                    displayName: user.userName

                });
            }

            localStorage.setItem("isLoggedIn", "true");
            router.push("/my-urls");
        }
    } catch (error:any) {
        console.log(error);
        toast.error(error.message);
    } finally {
        isSubmitting.value = false;
    }
}


       const handleShow = (word:string)=>{
        if(word === 'password'){
        showEye.value = !showEye.value}
        else if(word === 'confirmPassword'){
            showEyeConfirmPassword.value = !showEyeConfirmPassword.value
        }
       }
    </script>
    
    
    <style scoped>
    @media  (min-width:735px) and (max-width:1000px){
    
    }
    </style>