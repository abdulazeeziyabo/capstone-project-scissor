<template>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    mounted() {
  // Fetch analytics data from Firebase
  const analyticsData = this.getAnalyticsData(); // Implement this function to fetch data from Firebase
  
  // Render chart
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
},
methods: {
  // Function to fetch analytics data from Firebase
  getAnalyticsData() {
    // Example: Fetch analytics data from Firestore or Realtime Database
    // Replace this with your actual implementation to fetch analytics data from Firebase
    return {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      clicksPerMonth: [65, 59, 80, 81, 56, 55, 40]
    };
  }
}
})
</script>

<style scoped>

</style>