<template>
  <div class="bg-[#ADD8E6] h-screen">
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
      <div class="max-w-4xl mx-auto">
        <h3 class="font-bold text-4xl pl-7 pt-9 mb-4 text-center">Links</h3>
        <div class="flex flex-col gap-5 mt-4 items-center bg-[#1E3448] pt-9 pb-6 rounded-lg">
          <div class="flex justify-items:end gap-9 items-center">
            <p class="text-white">{{ shortenedLink }}</p>
            <div class="flex gap-8">
              <button
                @click="copyToClipboard"
                class="flex items-center bg-[#005AE2] w-[80px] px-3 py-2 rounded"
              >
                <img src="../assets/images/copy.svg" alt="copy-img" class="tooltip" /><span
                  class="text-white"
                  >Copy</span
                >
              </button>
              <button
                @click="handleEdit"
                class="flex items-center bg-[#005AE2] w-[80px] px-3 py-2 rounded"
              >
                <img src="../assets/images/edit-2.svg" alt="edit icon" /><span class="text-white"
                  >Edit</span
                >
              </button>
              <button
                @click="handleDelete(index)"
                class="flex items-center bg-[#005AE2] w-[100px] px-3 py-2 rounded"
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
              class="flex items-center bg-[#005AE2]border border px-3 py-2 rounded-full"
            >
              <img src="../assets/images/share.svg" alt="share-img" /><span class="text-white"
                >Share link</span
              >
            </button>
            <button
              @click="toggleQR"
              class="flex items-center bg-[#005AE2]border border px-3 py-2 rounded-full"
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
            <span @click="toggleShareOptions" class="cursor-pointer font-bold"> X</span>
            <h3>Share link on social media</h3>
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
            <h4>Download QR Code</h4>
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
              :cornersDotOptions="{ type: undefined, color: '#000000' }"
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
          class="bg-[#1E3448] border border px-3 py-2 rounded-full text-white mt-9 ml-[400px]"
        >
          Shorten another link
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, set, serverTimestamp, push } from 'firebase/database'
import { generateShortUrlKey } from '@/utils/shortKey'
import { database } from '@/utils/firebase'
import { toast } from 'vue3-toastify'
import QRCode from 'qrcode-vue3'

export default {
  name: 'URLShortener',
  components: {
    QRCode
  },
  data() {
    return {
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
      editedShortenedUrl: '',
      editMode: false
    }
  },
  created() {
    this.linkCollectionsRef = ref(database, 'linkCollections')
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
        await set(linkRef, newLink) // Set the data at the new child node

        // Update UI with shortened link
        this.shortenedLink = shortUrlKey
        this.showQRCode = true
        toast.success('Success.')
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
    shareOnSocialMedia(platform: string) {
      const shortenedLink = ''
      const url = encodeURIComponent(shortenedLink.value)
      const text = encodeURIComponent('Check out this link')
      let shareUrl = ''
      switch (platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/`
          break
        case 'facebook':
          shareUrl = `https://www.facebook.com`
          break
        case 'instagram':
          shareUrl = `https://instagram.com`
          break
        default:
          return
      }
      window.open(shareUrl, '_blank')
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
    toggleEditMode() {
      // Toggle edit mode
      this.editMode = !this.editMode
      // If entering edit mode, store the original value for potential cancelation
      if (this.editMode) {
        this.editedShortenedUrl = this.shortenedLink
      }
    },
    saveChanges() {
      // Save the changes to the shortened URL
      this.shortenedLink = this.editedShortenedUrl
      // Exit edit mode
      this.editMode = false
      // Here you can update the shortened URL in the database if needed
    },
    handleDelete(index: any) {
      this.shortenedLink.splice(index, 1)
    }
  },
  computed: {
    // Computed property to format creation time
    formatCreationTime() {
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
a.router-link-exact-active {
  color: #005ae2;
}
.hamburger {
  display: none;
  cursor: pointer;
}
.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: blue;
}
@media (max-width: 1000px) {
  .hamburger {
    display: block;
  }
  .hamburger.active .bar:nth-child(2) {
    opacity: 0;
  }
  .hamburger.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  .hamburger.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
  .middle-nav {
    position: absolute;
    left: -120%;
    top: 70px;
    gap: 0;
    flex-direction: column;
    background-color: #071827;
    width: 100%;
    text-align: center;
    transition: 0.3s;
  }
  .middle-nav.active {
    left: 0;
  }
  .middle-nav a {
    color: white;
    padding: 6px 0;
    margin: 0px 20px;
    text-align: center;
    transition: all 0.5s ease;
  }
  a {
    border-bottom: none;
    padding-left: 2px;
  }
}
</style>
