<template>
    <div>
    </div>
        <div class="bg-[#1E3448] h-screen relative ">
            <div>
          <button  class="flex items-center gap-3 tracking-[1.8px] text-[#59636E] text-xs font-bold uppercase pt-9 pl-9 cursor-pointer" @click="$router.go(-1)">
              <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 11.7L6.66667 13L0 6.5L6.66667 0L8 1.3L2.70833 6.5L8 11.7Z"
                fill="#59636E"
              />
            </svg>
            Back
          </button>
          <img src="../assets/images/Group 3.png" alt="" class="absolute">
          
          <img src="../assets/images/Group 2 (1).png" alt="" class="absolute right-[0px] bottom-[0px]">
          <div class="bg-white w-[476px] mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#1E3448] rounded-md p-[48px]">
           <form action="">
        <label for="Long Url"></label>
          <input type="text" 
          id="longUrl" 
          v-model="longUrl" 
          placeholder="Paste your URL here..." class="w-[374px] border border-[#3284FF] rounded-md leading-[18px] pl-7 h-[45px] mb-6 focus:border-[#3284FF] focus:border-none placeholder:text-[#4991FF] " />
          <small v-if = "linkError" class="text-red-500">{{ linkError }} </small>
          <label for="domain" class="text-base flex flex-col text-[#4991FF]  ">Choose domain: </label>
          <div class="flex gap-2 -ml-[8px]">
          <select id="domain" v-model="customDomain" placeholder="Choose Domain" class="w-[272px] border border-[#3284FF] rounded-md h-[45px]">
            <option v-for=" domain in domains" :key="domain"
            :value="domain">{{ domain }}</option>
          </select>
      
          <label for="customAlias"></label>
          <input 
          type="text" 
          id="customAlias" 
          v-model="customAlias" placeholder="Type Alias here (Optional)" class="w-[272px] border border-[#3284FF] rounded-md h-[45px] pl-5 placeholder:text-[#4991FF] " />
          </div>
          <small v-if="error" class="text-red-500">{{ error }}</small>
            <button
          class="bg-[#3284FF] mt-6 w-[364px] h-[45px] border rounded-full text-white flex items-center gap-3 pl-[120px]"
           @click.prevent="shorten">Trim URLs
           <img src="../assets/images/magic wand.png" alt="magic wand">
          </button>
          <div v-if="shortenedLinks.length > 0" class="mt-4">
        <ul>
          <li v-for="shortenedLink in shortenedLinks" :key="shortenedLink.id" class="text-[#4991FF] font-semibold text-xl">
            <div>
                <!-- Display shortened link -->
            <a :href="shortenedLink.shortenedUrl">Shortened URL: {{ shortenedLink.shortenedUrl }}</a>
            <!-- Display analytics data -->
           <p> Visits: {{ shortenedLink.analytics.visits }}</p>
            </div>
            <!-- Display referral sources -->
            <ul v-if="shortenedLink.analytics.referrers.length > 0">
              <li v-for="referrer in shortenedLink.analytics.referrers" :key="referrer">
                Referrer: {{ referrer }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
          <p class="text-[#4991FF] text-xm mt-6">
              By clicking Trim URL, I agree to the <span class="font-semibold">Terms of services, Privacy Policy</span> and Use of Cookies.
          </p>
          
      </form> 
          </div>
      </div> 
        </div>
        
      </template>
      
      <script lang="ts">
    import { getDatabase, ref, set, serverTimestamp, push } from 'firebase/database';
    import { generateShortUrlKey } from '@/utils/shortKey';
    import { database } from '@/utils/firebase';
    import { toast } from 'vue3-toastify';
    
    export default {
      name: 'URLShortener',
      data() {
        return {
          longUrl: '',
          customAlias: '',
          customDomain: 'Choose your domain',
          domains: ['scissor.com', 'scisssor.org', 'scissor.store', 'scissor.net'],
          error: '',
          linkError: '',
          shortenedLinks: [],
          linkCollectionsRef: null, 
        };
      },
      created() {
        this.linkCollectionsRef = ref(database, 'linkCollections');
        this.fetchShortenedLinks();
      },
      methods: {
        async shorten() {
             // Validate URL
          this.error = '';
          if (!this.longUrl) {
            this.error = 'Please enter a long URL to shorten.';
            return;
          }
    
          if (!/^(http|https):\/\/[^ "]+$/.test(this.longUrl)) {
            this.error = 'Please enter a valid URL.';
            return;
          }
    
          try {
            const shortUrlKey = generateShortUrlKey();
            if (!shortUrlKey) {
              throw new Error('Short URL key is undefined');
            }
     // Store new shortened link in Firebase
            const linkRef = push(this.linkCollectionsRef); // Create a reference to a new child nod
           const newLink = {
              longUrl: this.longUrl,
              shortUrlKey: shortUrlKey,
              createdAt: serverTimestamp(),
              analytics: { visits: 0, referrers:[] },
            };
            await set(linkRef, newLink); // Set the data at the new child node
    
            // Update UI with shortened link
            this.shortenedLinks.push({ id: linkRef.key, shortenedUrl: `https://${shortUrlKey}/${domain.value}/${customAlias.value}`, analytics: newLink.analytics });
            toast.success('Success.');
          } catch (error) {
            console.error('Error storing link:', error);
            toast.error('Failed to shorten the link. Try again.');
          }
        },
        async fetchShortenedLinks() {
      try {
        const snapshot = await ref(this.linkCollectionsRef).get();
        if (snapshot.exists()) {
          const data = snapshot.val();
          Object.keys(data).forEach((key) => {
            this.shortenedLinks.push({ id: key, shortenedUrl: `https://${data[key].shortUrlKey}`, analytics: data[key].analytics });
          });
        }
      }  catch (error) {
        console.error('Error fetching shortened links:', error);

      // Handle any errors that occur during the process
    }
  }
      },
    };
    </script>
      <style scoped>
     
      </style>

<!-- <template>
    <div class="bg-[#1E3448] h-screen relative">
      <div>
        < Your existing HTML -->
        <!-- <form @submit.prevent="shorten">
          <! Input fields for URL and domain selection -->
        <!-- </form>
        <div v-if="shortenedLinks.length > 0">
          <ul>
            <li v-for="shortenedLink in shortenedLinks" :key="shortenedLink.id">
              <!Display shortened link -->
              <!-- Shortened URL: {{ shortenedLink.shortenedUrl }} -->
              <!-- Display analytics data -->
              <!-- Visits: {{ shortenedLink.analytics.visits }} -->
              <!-- Display referral sources -->
              <!-- <ul v-if="shortenedLink.analytics.referrers.length > 0">
                <li v-for="referrer in shortenedLink.analytics.referrers" :key="referrer">
                  Referrer: {{ referrer }}
                </li>
              </ul>
            <! </li> --> 
          <!-- </ul>
        </div>
      </div>
    </div>
  </template> -->
  
  <!-- <script lang="ts">
  import { ref, set, serverTimestamp, push } from 'firebase/database';
  import { generateShortUrlKey } from '@/utils/shortKey';
  import { database } from '@/utils/firebase';
  import { toast } from 'vue3-toastify';
  
  export  -->