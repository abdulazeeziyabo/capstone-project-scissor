<template>
    <div class="bg-[#1E3448] h-screen relative">
      <div>
        <img src="../assets/images/Group 3.png" alt="" class="absolute" />
        <img src="../assets/images/Group 2 (1).png" alt="" class="absolute right-[0px] bottom-[0px]" />
        <div class="bg-white w-[476px] mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#1E3448] rounded-md p-[48px]">
          <form action="">
            <label for="longUrl"></label>
            <input
              type="text"
              id="longUrl"
              v-model="longUrl"
              placeholder="Paste your URL here..."
              class="w-[374px] border border-[#3284FF] rounded-md leading-[18px] pl-7 h-[45px] mb-6 focus:border-[#3284FF] focus:border-none placeholder:text-[#4991FF]"
            />
            <small v-if="error" class="text-red-500">{{ error }}</small>
            <small v-if="linkError" class="text-red-500">{{ linkError }}</small>
            <button
              class="bg-[#3284FF] mt-4 w-[364px] h-[45px] border rounded-full text-white flex items-center gap-3 pl-[120px]"
              @click.prevent="shorten"
            >
              Trim URLs
              <img src="../assets/images/magic wand.png" alt="magic wand" />
            </button>
            <a :href="shortenedLink" target="_blank" rel="noopener noreferrer" class="text-[#4991FF] mt-6">{{ shortenedLink }}</a>
            <p class="text-[#4991FF] text-xm mt-6">
              By clicking Trim URL, I agree to the <span class="font-semibold">Terms of services, Privacy Policy</span> and Use of Cookies.
            </p>
          </form>
          <h2>Analytics Dashboard</h2>
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  import { logEvent } from 'firebase/analytics';
  import { analytics } from '@/utils/firebase';
  import { toast } from 'vue3-toastify';
  import { getDatabase, ref as dbRef, set, serverTimestamp, push } from 'firebase/database';
  import { generateShortUrlKey } from '@/utils/shortKey';
  import { database } from '@/utils/firebase';
  import Chart from 'chart.js/auto';
  import { getAnalyticsData } from '@/utils/analyticsData';
  
  export default {
    data() {
      return {
        longUrl: '',
        error: '',
        linkError: '',
        shortenedLink: '',
        linkCollectionsRef: null,
      };
    },
    created() {
      this.linkCollectionsRef = dbRef(database, 'linkCollections');
    },
    methods: {
      async shorten() {
        try {
          this.error = '';
          if (!this.longUrl) {
            this.error = 'Please enter a long URL to shorten.';
            return;
          }
          
          if (!/^(http|https):\/\/[^ "]+$/.test(this.longUrl)) {
            this.error = 'Please enter a valid URL.';
            return;
          }
  
          const shortUrlKey = generateShortUrlKey();
          if (!shortUrlKey) {
            throw new Error('Short URL key is undefined');
          }
  
          const linkRef = push(this.linkCollectionsRef);
          const newLink = {
            longUrl: this.longUrl,
            shortUrlKey: shortUrlKey,
            createdAt: serverTimestamp(),
          };
          await set(linkRef, newLink);
  
          // Update UI with shortened link
          this.shortenedLink = `https://scissors-project-iyabo.netlify.app/#${shortUrlKey}`;
  
          // Log event for URL shortening
          logEvent(analytics, 'url_shortened', {
            longUrl: this.longUrl,
            shortUrlKey: shortUrlKey,
          });
  
          toast.success('Success.');
        } catch (error) {
          console.error('Error storing link:', error);
          toast.error('Failed to shorten the link. Try again.');
        }
      },
      async renderAnalyticsChart() {
        try {
          const analyticsData = await getAnalyticsData(); 
          const chartCanvas = this.$refs.chartCanvas;
          const ctx = chartCanvas.getContext('2d');
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: analyticsData.labels,
              datasets: [
                {
                  label: 'Clicks per month',
                  data: analyticsData.clicksPerMonth,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1
                }
              ]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        } catch (error) {
          console.error('Error rendering analytics chart:', error);
          // Handle error
        }
      }
    },
    mounted() {
      this.renderAnalyticsChart();
    }
  };
  </script>
  
  <style scoped>

</style>
  