<template>
  <div class="bg-[url('../assets/images/aurora.svg')] h-screen" bg-cover bg-no-repeat>
    <div v-if="!showQRCode">
      <div class="bg-[#1E3448] h-screen relative">
        <div>
          <img src="../assets/images/Group 3.png" alt="" class="absolute" />

          <img
            src="../assets/images/Group 2 (1).png"
            alt=""
            class="absolute right-[0px] bottom-[0px]"
          />
          <div
            class="bg-white w-[476px] mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#1E3448] rounded-md p-[48px]"
          >
            <form action="">
              <label for="Long Url"></label>
              <input
                type="text"
                id="longUrl"
                v-model="longUrl"
                placeholder="Paste your URL here..."
                class="w-[374px] border border-[#3284FF] rounded-md leading-[18px] pl-7 h-[45px] mb-6 focus:border-[#3284FF] focus:border-none placeholder:text-[#4991FF]"
              />
              <small v-if="error" class="text-red-500">{{ error }}</small>
              <small v-if="linkError" class="text-red-500">{{ linkError }} </small>
              <button
                class="bg-[#3284FF] mt-4 w-[364px] h-[45px] border rounded-full text-white flex items-center gap-3 pl-[120px]"
                @click.prevent="shorten"
              >
                Trim URLs
                <img src="../assets/images/magic wand.png" alt="magic wand" />
              </button>
              <a
                :href="shortenedLink"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[#4991FF] mt-6"
                >{{ shortenedLink }}</a
              >
              <p class="text-[#4991FF] text-xm mt-6">
                By clicking Trim URL, I agree to the
                <span class="font-semibold">Terms of services, Privacy Policy</span> and Use of
                Cookies.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="max-w-4xl mx-auto bg-[#1E3448]  h-[100%] border rounded-lg pt-9 ">
        <h3 class="font-bold text-4xl pl-7 pt-9 mb-4 text-center text-white">Links</h3>
        <div class="flex flex-col gap-5 mt-4 items-center  pt-9 pb-6 rounded-lg">
          <div class="flex justify-items:end gap-7 pl-4 items-center ">
           <input type="text" readonly :value="shortenedLink"
           v-if="!editMode"
           class="h-[54px] w-[420px] bg-[#1E3448] text-white short">
           <input type="text" v-model="editedShortenedUrl" class="h-[54px] w-[420px] bg-[#ADD8E6] short" v-if="editMode">
            <div class="flex gap-8">
              <button
                @click="copyToClipboard"
                class="flex items-center w-[80px] px-3 py-2 rounded"
              >
                <img src="../assets/images/copy.svg" alt="copy-img" class="tooltip" /><span
                  class="text-white"
                  >Copy</span
                >
              </button>
              <div class="edit-items flex gap-3">
                <button
                v-if="!editMode"
                @click="handleEdit"
                class="flex items-center w-[80px] px-3 py-2 rounded edit"
              >
                <img src="../assets/images/edit-2.svg" alt="edit icon" /><span class="text-white"
                  >Edit</span
                >
              </button>
              <button 
              v-if="editMode"
              @click="saveEditedLink" class="flex items-center text-white w-[80px] px-3 py-2 rounded save" >
  Save
</button>
              </div>
<button
@click="handleDelete(index)"
class="flex items-center w-[100px] px-3 py-2 rounded"
              >
<img src="../assets/images/trash.svg" alt="delete icon" /><span class="text-white"
>Delete</span
>
</button>
            </div>
          </div>
          <div>
            <p class="text-white">{{ longUrl }}</p>
          </div>
          <p class="text-white">Created at: {{ formatCreationTime }}</p>
          <div class="flex items-enter gap-6">
            <button
              @click="toggleShareOptions"
              class="flex items-center px-3 py-2 bg-[#005AE2] rounded-full"
            >
              <img src="../assets/images/share.svg" alt="share-img" /><span class="text-white"
                >Share link</span
              >
            </button>
            <button
              @click="toggleQR"
              class="flex items-center bg-[#005AE2] px-3 py-2 rounded-full"
            >
              <img src="../assets/images/qr-code-line.svg" alt="qrcode-img" /><span
                class="text-white"
                >QR code</span
              >
            </button>
          </div>
        </div>
        <div v-if="showDBShareOptions">
          <div>
            <span @click="toggleShareOptions" class="cursor-pointer font-bold mr-5"> X</span>
            <h3 class="text-white mr-5">Share link on social media</h3>
            <div class="flex gap-4 items-center">
              <button @click="shareOnSocialMedia('facebook')">
                <img src="../assets/images/social-facebook.svg" alt="facebook icon" />
              </button>
              <button @click="shareOnSocialMedia('twitter')">
                <img src="../assets/images/twitter.svg" alt="twitter icon" />
              </button>
              <button @click="shareOnSocialMedia('instagram')">
                <img src="../assets/images/instagram-fill.svg" alt="=instagram icon" />
              </button>
            </div>
          </div>
        </div>
        <div v-if="showQR">
          <div>
            <span @click="toggleQR"> </span>
            <h4 class="text-white">Download QR Code</h4>
            <QRCode
              :value="shortenedLink"
              :size="100"
              level="H"
              includeMargin
              :width="100"
              :height="100"
              :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
              :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
              :dotsOptions="{
                type: 'dots',
                color: '#26249a',
                gradient: {
                  type: 'linear',
                  rotation: 0,
                  colorStops: [
                    { offset: 0, color: '#26249a' },
                    { offset: 1, color: '#26249a' }
                  ]
                }
              }"
              :backgroundOptions="{ color: '#ffffff' }"
              :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
              :cornersDotOptions="{ type: 'square', color: '#000000' }"
              fileExt="png"
              :download="true"
              myclass="my-qur"
              imgclass="img-qr"
              downloadButton="my-button"
              :downloadOptions="{ name: 'qrcode', extension: 'svg' }"
            />
          </div>
        </div>
        <button
          @click="resetComponent"
          class="bg-[#005AE2] px-3 py-2 rounded-full text-white mt-9 ml-[400px] mb-9"
        >
          Shorten another link
        </button>
      </div>
    </div>
    <div class="max-w-4xl mx-auto bg-[#1E3448] p-4 rounded-lg mt-8 mb-8">
      <h3 class="text-white text-lg mb-6">Logged Events</h3>
      <ul>
        <li v-for="(event, index) in loggedEvents" :key="index" class="text-white">
          <span>{{ event.name }}</span>
          <span class="ml-2">{{ event.timestamp }}</span>
          <span v-if="event.platform">Platform: {{ event.platform }}</span>
        <span v-if="event.shortUrl">Shortened URL: {{ event.shortUrl }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, set, serverTimestamp, push } from 'firebase/database'
import { generateShortUrlKey } from '@/utils/shortKey'
import { database } from '@/utils/firebase';
import { toast } from 'vue3-toastify';
import QRCode from 'qrcode-vue3';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import { getAnalytics, logEvent } from "firebase/analytics";

interface ComponentData {
  longUrl: string;
  customAlias: string;
  customDomain: string;
  domains: string[];
  error: string;
  linkError: string;
  shortenedLink: string;
  linkCollectionsRef: any; 
  showQRCode: boolean;
  showDBShareOptions: boolean;
  showQR: boolean;
  createAt: any; 
  editedShortenedUrl: boolean;
  editMode: boolean;
}

export default { 
  name: 'URLShortener',
  components:{
    QRCode,
  },
  props:{
    createdAt:String
  },
  data(): ComponentData{ {
    return {
      loggedEvents: [],
      longUrl: '',
      customAlias: '',
      customDomain: 'scissor.io',
      domains: ['scissor.com', 'scisssor.org', 'scissor.store', 'scissor.net'],
      error: '',
      linkError: '',
      shortenedLink: '',
      linkCollectionsRef: null,
      showQRCode: false,
      showDBShareOptions: false,
      showQR: false,
      createAt: null,
      editedShortenedUrl: false,
      editMode: false
    }
}
  },
  created() {
    this.linkCollectionsRef = ref(database, 'linkCollections');
    const auth = getAuth(); 
     // Listen for user authentication state changes
     onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        console.log('User is signed in');
        logEvent(getAnalytics(), 'sign_in'); // Log sign-in event
      } else {
        // User is signed out.
        console.log('User is signed out');
        logEvent(getAnalytics(), 'sign_out'); // Log sign-out event
      }
    });
  },
  methods: {
    async shorten() {
      this.error = ''
      if (!this.longUrl) {
        this.error = 'Please enter a long URL to shorten.'
        return
      }

      if (!/^(http|https):\/\/[^ "]+$/.test(this.longUrl)) {
        this.error = 'Please enter a valid URL.'
        return
      }

      try {
        const shortUrlKey = generateShortUrlKey()
        if (!shortUrlKey) {
          throw new Error('Short URL key is undefined')
        }

        const linkRef = push(this.linkCollectionsRef)
        const newLink = {
          longUrl: this.longUrl,
          shortUrlKey: shortUrlKey,
          createdAt: serverTimestamp()
        }
        await set(linkRef, newLink)

        // Update UI with shortened link
        this.shortenedLink = shortUrlKey
        this.showQRCode = true
        toast.success('Success.')
         // Log URL shortening event
         logEvent(getAnalytics(), 'url_shortened', {
          longUrl: this.longUrl,
          shortUrl: this.shortenedLink
        });
      } catch (error) {
        console.error('Error storing link:', error)
        toast.error('Failed to shorten the link. Try again.')
        
      }
    },
    //copy to clipboard
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.shortenedLink)
        toast.success('Copied to clipboard!')
      } catch (error) {
        toast.error('Failed to copy!')
        console.error('Copy to clipboard failed:', error)
      }
    },
    //share on social media
    shareOnSocialMedia(platform: string): void {
      const url = encodeURIComponent(this.shortenedLink)
      let shareUrl = ''
      switch (platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=Check+out+this+link`
          break
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
          break
        case 'instagram':
          shareUrl = `https://www.instagram.com/`
          break
        default:
          return
      }
      window.open(shareUrl, '_blank')
      // Log share event
      logEvent(getAnalytics(), 'share_on_social_media', {
        platform: platform,
        shortUrl: this.shortenedLink
      });
      
    },
    toggleShareOptions() {
      if (this.showQR) {
        this.showQR = false
      }
      this.showDBShareOptions = !this.showDBShareOptions
    },
    toggleQR() {
      if (this.showDBShareOptions) {
        this.showDBShareOptions = false
      }
      this.showQR = !this.showQR
    },
    resetComponent() {
      this.longUrl = ''
      this.shortenedLink = ''
      this.customAlias = ''
      this.showQRCode = false
    },
    handleEdit(){
this.editedShortenedUrl = this.shortenedLink
this.editMode = true;
//this.shortenedLink = editedShortenedLink;
    },
    saveEditedLink() {
    this.shortenedLink = this.editedShortenedUrl;
    this.editMode = false;
    this.editedShortenedUrl = '';
  },
    handleDelete(index: number) {
      if(Array.isArray(this.shortenedLink)){
        this.shortenedLink.splice(index, 1)
      }
    },
    logEvent(eventName: string, eventData?: any) {
      // Log the event
      logEvent(getAnalytics(), eventName, eventData);

      // Add the event to the loggedEvents array for display
      const timestamp = new Date().toLocaleString();
      this.loggedEvents.unshift({ name: eventName, timestamp, ...eventData});
    }
  },
  // Computed property to format creation time
  computed: {
    formatCreationTime():string {
      if (this.createdAt) {
        const creationDate = new Date(this.createdAt)
        return creationDate.toLocaleString() // Adjust the format as needed
      }
      return new Date().toLocaleString()
    }
  }
}
</script>

<style scoped>
.short{
outline: none;
color: white;
}
.edit-items{
  font-size: 18px;
  animation-duration:0.2s
    
}
.save{
    display: flex;
  align-items: center; 
}
</style>
