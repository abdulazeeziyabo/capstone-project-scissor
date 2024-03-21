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
      <div
        class="mt-[80px] max-w-[900px] mx-auto "
      >
        <div class="border border-[#4991FF] pl-6 pt-8 pb-5 rounded-md mb-[100px]"  >
          <div class="flex justify-items:end gap-7 pl-4 items-center text-[#4991FF] font-bold">
            <input class="text-xl" type="text" readonly :value="shortenedLink" v-if="!editMode" 
            @click="handleClick"
            />
            <input
              type="text"
              v-model="editedShortenedUrl"
              class="h-[54px] w-[420px] bg-[#ADD8E6] short"
              v-if="editMode"
            />
            <div class="flex gap-8">
              <button @click="copyToClipboard" class="flex items-center w-[80px] px-3 py-2 rounded">
                <img src="../assets/images/copy.svg" alt="copy-img" /><span class="">Copy</span>
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
                  @click="saveEditedLink()"
                  class="flex items-center w-[80px] px-3 py-2 rounded save"
                >
                  Save
                </button>
              </div>
              <button
                @click="handleDelete()"
                class="flex items-center w-[100px] px-3 py-2 rounded"
              >
                <img src="../assets/images/trash.svg" alt="delete icon" /><span class=""
                  >Delete</span
                >
              </button>
            </div>
          </div>
          <div>
            <p class="mb-5 font-semi-bold mt-5">{{ longUrl }}</p>
          </div>
          <p class="mb-5 text-xl font-semi-bold">Created at: {{ formatCreationTime }}</p>
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
            <div>
            <button @click="handleStats" class=" bg-[#005AE2] px-3 py-2 rounded-full">View Stats</button>
          </div>
            <div class="text-xl font-bold">Clicks: {{ (views || 0) }}</div>
          </div>
          
        </div>
      </div>
      <div v-if="showDBShareOptions">
        <div class="w-[300px] mx-auto -mt-[80px]">
          <span @click="toggleShareOptions" class="cursor-pointer font-bold"></span>
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
        <QRCodeVue3
          :width="150"
          :height="150"
          :value="shortenedLink"
          :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
          :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
          :dotsOptions="{
            type: 'square',
            color: '#000000',
            gradient: {
              type: 'linear',
              rotation: 0,
              colorStops: [
                { offset: 0, color: '#000000' },
                { offset: 1, color: '#000000' }
              ]
            }
          }"
          :backgroundOptions="{ color: '#ffffff' }"
          :cornersSquareOptions="{ type: 'square', color: '#000000' }"
          :cornersDotOptions="{ type: undefined, color: '#000000' }"
          fileExt="png"
          :download="true"
          myclass="my-qur"
          imgclass="img-qr"
          downloadButton="my-button"
          :downloadOptions="{ name: 'vqr', extension: 'svg' }"
          class="ml-9"
        />
        
      </div>
     
    </div>
  </div>
</template>

<script lang="ts">
import { ref, set, serverTimestamp, push, get, getDatabase, runTransaction} from 'firebase/database'
import { generateShortUrlKey } from '@/utils/shortKey'
import { database } from '@/utils/firebase'
import { toast } from 'vue3-toastify'
import QRCodeVue3 from 'qrcode-vue3';
import {useRouter} from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getAnalytics, logEvent } from 'firebase/analytics'

interface ComponentProps {
  createdAt: string
}
interface ComponentMethods {
  formatCreationTime: () => string
}

interface ComponentData {
  longUrl: string
  error: string;
  linkError: string;
  error: string;
  linkError: string;
  shortenedLink: string
  linkCollectionsRef: any
  shortenedLinks: string[]
  showDBShareOptions: boolean
  showQR: boolean
  createAt: any
  editedShortenedUrl: string
  editMode: boolean
}

export default {
  name: 'URLShortener',
  components: {
    QRCodeVue3
  },
  props: {
    createdAt: String
  },
  setup(){
   const router = useRouter();
   const handleStats =  ()=>{
    console.log('i was clicked')
      router.push(`my-urls/:id`)
    }
return {handleStats}
  },
  data(): ComponentData {
    {
      return {
        longUrl: '',
        error: '',
        linkError: '',
        shortenedLink: '',
        linkCollectionsRef: null,
        shortenedLinks: [],
        showQRCode: false,
        showDBShareOptions: false,
        showQR: false,
        createAt: null,
        editedShortenedUrl: '',
        editMode: false,
        views: 0,
      
      }
    }
  },
  created() {
    this.linkCollectionsRef = ref(database, 'linkCollections')
  //   // Retrieve stored shortened link when the component is created
  const storedShortenedLink = localStorage.getItem('shortenedLink');
  if (storedShortenedLink) {
    this.shortenedLink = storedShortenedLink;
  }
  
  },
  methods: {
    async shorten() {
      // Validate URL
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
        // Store new shortened link in Firebase
        const linkRef = push(this.linkCollectionsRef) // Create a reference to a new child nod
        const newLink = {
          longUrl: this.longUrl,
          shortUrlKey: shortUrlKey,
          createdAt: serverTimestamp(),
          views:0,
          clicks:{location: '', totalClicks: ''}
        }
        await set(linkRef, newLink)

        const analytics = getAnalytics()
        logEvent(analytics, 'url_shortened', { longUrl: this.longUrl })
        // Update UI with shortened link
        this.shortenedLink = `https://${shortUrlKey}`

        //store in local stroage
        localStorage.setItem('shortenedLink', this.shortenedLink); 
        

        toast.success('Success.')
      } catch (error) {
        console.error('Error storing link:', error)
        toast.error('Failed to shorten the link. Try again.')
      }
    },
    //handle clicks on shortened url
    async handleClick() {
      // Increment view count
      const viewsRef = ref(database, `linkCollect/${this.shortUrlKey}/analytics/views`);
      try {
        await runTransaction(viewsRef, (currentViews) => {
          // Increment view count by 1
          return (currentViews || 0) + 1;
        });
      } catch (error) {
        console.error('Error updating view count:', error);
        toast.error('Error updating view count')
        return;
      }

      // Retrieve long URL
      const longUrlRef = ref(database, `linkCollect/${this.shortUrlKey}/longUrl`);
      let longUrl;
      try {
        const snapshot = await get(longUrlRef);
        longUrl = snapshot.val();
      } catch (error) {
        console.error('Error retrieving long URL:', error);
        return;
      }

      // Redirect user to long URL
      window.location.href = longUrl;
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
      })
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
    handleEdit() {
      this.editedShortenedUrl = this.shortenedLink
      this.editMode = true
      //this.shortenedLink = editedShortenedLink;
    },
    saveEditedLink() {
      this.shortenedLink = this.editedShortenedUrl
      this.editMode = false
      this.editedShortenedUrl = ''
    },
    handleDelete() {
      this.shortenedLink = '';

      // localStorage.setItem('links', JSON.stringify(this.links))
    },
    logEvent(eventName: string, eventData?: any) {
      // Log the event
      logEvent(getAnalytics(), eventName, eventData)

      // Add the event to the loggedEvents array for display
      const timestamp = new Date().toLocaleString()
      this.loggedEvents.unshift({ name: eventName, timestamp, ...eventData })
    },
    
  },
  // Computed property to format creation time
  computed: {
    formatCreationTime(): string {
      if (this.createdAt) {
        const creationDate = new Date(this.createdAt)
        return creationDate.toLocaleString() 
      }
      return new Date().toLocaleString()
    }
  }
}

</script>

<style scoped>
.short {
  outline: none;
  color: white;
}
.edit-items {
  font-size: 18px;
  animation-duration: 0.2s;
}
.save {
  display: flex;
  align-items: center;
}
.my-qur {
  margin-right: 100px;
}
</style>
