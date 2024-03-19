<template>
  <div>
    <div>
      <div class="bg-[#1E3448] h-[390px] relative">
        <div>
          <img
            src="../assets/images/Group 2 (1).png"
            alt=""
            class="absolute right-[0px] bottom-[0px]"
          />
          <div
            class="bg-white w-[476px] mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#1E3448] rounded-md p-[48px]"
          >
            <form>
              <label for="Long Url"></label>
              <input
                type="text"
                id="longUrl"
                v-model="longUrl"
                placeholder="Paste your URL here..."
                class="w-[374px] border border-[#3284FF] rounded-md leading-[18px] pl-7 h-[45px] mb-6 focus:border-[#3284FF] focus:border-none placeholder:text-[#4991FF]"
              />
              <small v-if="linkError" class="text-red-500">{{ linkError }}</small>
              <small v-if="error" class="text-red-500">{{ error }}</small>
             
              <button
                class="bg-[#3284FF] mt-4 w-[364px] h-[45px] border rounded-full text-white flex items-center gap-3 pl-[120px]"
                @click.prevent="shorten"
              >
                Trim URLs
                <img src="../assets/images/magic wand.png" alt="magic wand" />
              </button>
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
    <div>
        <h3 class="font-bold text-4xl pl-7 pt-9 mb-4 text-center">Links</h3>
        <div class="mt-[80px] max-w-[900px] mx-auto border border-[#4991FF] pl-6 pt-8 pb-5 rounded-md mb-[100px]">
          <div v-for="(link, index) in links" :key="index">
            <div class="flex justify-items:end gap-7 pl-4 items-center text-[#4991FF] font-bold">
                <input
                class="text-xl" 
                type="text" readonly 
                :value="link.shortenedLink"
           v-if="!editMode"/>
           <input type="text" v-model="editedShortenedUrl" class="h-[54px] w-[420px] bg-[#ADD8E6] short" v-if="editMode">
           <div class="flex gap-8">
              <button
                @click="copyToClipboard"
                class="flex items-center w-[80px] px-3 py-2 rounded"
              >
                <img src="../assets/images/copy.svg" alt="copy-img" /><span
                  class=""
                  >Copy</span
                >
              </button>
              <div class="edit-items flex gap-3">
                <button
                v-if="!editMode"
                @click="handleEdit(index)"
                class="flex items-center w-[80px] px-3 py-2 rounded edit"
              >
                <img src="../assets/images/edit-2.svg" alt="edit icon" /><span class=""
                  >Edit</span
                >
              </button>
              <button 
              v-if="editMode"
              @click="saveEditedLink(index)" class="flex items-center  w-[80px] px-3 py-2 rounded save" >
  Save
</button>
              </div>
<button
@click="handleDelete(index)"
class="flex items-center w-[100px] px-3 py-2 rounded"
              >
<img src="../assets/images/trash.svg" alt="delete icon" /><span class=""
>Delete</span
>
</button>
            </div>
          </div>
          <div >
            <p class="mb-5 font-semi-bold mt-5" >{{link.longUrl }}</p>
          </div>
          <p class="mb-5 text-xl font-semi-bold" >Created at: {{ formatCreationTime }}</p> 
          <div class="flex gap-[100px] items-center">
<div>
  <button
              @click="toggleShareOptions"
              class="flex items-center px-3 py-2 bg-[#005AE2] rounded-full"
            >
              <img src="../assets/images/share.svg" alt="share-img" /><span class="text-white"
                >Share link</span
              >
            </button>
</div>
<div>
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
            
          </div>

        </div>
        <div v-if="showDBShareOptions">
          <div class="w-[300px] mx-auto -mt-[80px]">
            <span @click="toggleShareOptions" class="cursor-pointer font-bold "></span>
            <h3 class="text-xl font-bold">Share link on social media</h3>
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
            <span @click="toggleQR"> </span>
            <button @click="downloadQRCode('svg', 150)" class="pr-[100px]">Download as SVG</button>
            
           
        </div>

             
           
           
 </div>
 </div>
 
</template>

<script lang="ts">
import { ref, set, serverTimestamp, push } from 'firebase/database'
import {reactive} from 'vue'
import { generateShortUrlKey } from '@/utils/shortKey'
import { database } from '@/utils/firebase';
import { toast } from 'vue3-toastify';
import QRCode from 'qrcode-vue3';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import { getAnalytics, logEvent } from "firebase/analytics";

interface ComponentData {
  longUrl: string;
  links: { longUrl: string, shortenedLink: string, createdAt: any }[];
  error: string;
  linkError: string;
  shortenedLink: string;
  linkCollectionsRef: any; 
  showQRCode: boolean;
  showDBShareOptions: boolean;
  showQR: boolean;
  createAt: any; 
  editedShortenedUrl: string;
  editMode: boolean;
}

export default { 
  name: 'URLShortener',
  components:{
   
  },
  props:{
    createdAt:String
  },
  data(): ComponentData{ {
    return {
      longUrl: '',
      shortenedLink: '',
      links:[],
      error: '',
      linkError: '',
      linkCollectionsRef: null,
      showQRCode: false,
      showDBShareOptions: false,
      showQR: false,
      createAt: null,
      editedShortenedUrl: '',
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
    // Load links from localStorage when the component is created
    this.loadLinksFromLocalStorage();
  },
  methods: {
  async shorten() {
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

      const linkRef = push(this.linkCollectionsRef);
      const newLink:any = {
        longUrl: this.longUrl,
        shortenedLink: shortUrlKey,
        createdAt: serverTimestamp(),
      };

      // Store the new link in Firebase
      await set(linkRef, newLink);

      // Update UI with shortened link
      this.shortenedLink = `https://${shortUrlKey}`;
      this.showQRCode = true;
      toast.success('Success.');


      // Store the new link in localStorage
      this.storeLinkInLocalStorage(newLink);
    } catch (error) {
      console.error('Error storing link:', error);
      toast.error('Failed to shorten the link. Try again.');
    }
  },
  // Store the link in localStorage
  storeLinkInLocalStorage(newLink) {
    const storedLinks = localStorage.getItem('links');
    let links = storedLinks ? JSON.parse(storedLinks) : [];
    links.push(newLink);
    localStorage.setItem('links', JSON.stringify(links));
  },
  // Load links from localStorage
  loadLinksFromLocalStorage() {
    const storedLinks = localStorage.getItem('links');
    if (storedLinks) {
      // Update the links array with the links from localStorage
      this.links = JSON.parse(storedLinks);
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
    async downloadQRCode(format:string, size:number) {
  try {
    if (!this.shortenedLink) {
      toast.error('No shortened link available.');
      return;
    }

    if (format === 'svg') {
      const svgString = await QRCode.toString(this.shortenedLink, { type: 'svg', width: size, margin: 2 });
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'qr-code.svg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast.success('QR Code downloaded as SVG.');
    } else {
      toast.error('Unsupported format.');
    }
  } catch (error) {
    console.error('Error generating QR code:', error);
    toast.error('Failed to generate QR code.');
  }
},
    toggleQR() {
      if (this.showDBShareOptions) {
        this.showDBShareOptions = false
      }
      this.showQR = !this.showQR  
    },
    handleEdit(index){
this.editedShortenedUrl = this.links[index].shortenedLink
this.editMode = true;
//this.shortenedLink = editedShortenedLink;
    },
    saveEditedLink(index) {
    this.links[index].shortenedLink = this.editedShortenedUrl;
    this.editMode = false;
    this.editedShortenedUrl = '';
  },
    handleDelete(index: number) {
      this.links.splice(index, 1);
  
  localStorage.setItem('links', JSON.stringify(this.links));
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
