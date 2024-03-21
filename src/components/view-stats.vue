  <template>
    <div>
      <button class="flex items-center gap-3 tracking-[1.8px] text-[#59636E] text-xs font-bold uppercase pt-9 pl-9 cursor-pointer mb-5" @click="$router.go(-1)">
        <Back /> Back
      </button>
      <div class="text-2xl font-bold text-center mt-8">Total Clicks: {{ totalClicks }}</div>
      <Line :data="data" :options="options" v-if="Object.keys(data).length > 0" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { getDatabase, ref as dbRef, onValue } from 'firebase/database'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
  } from 'chart.js'
  import { Line } from 'vue-chartjs';
  import Back from '@/components/back-page.vue'
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement)
  
  export default {
    name: 'ViewStats',
    components: {
      Line,
      Back,
    },
    data() {
      return {
        totalClicks: 0,
        clickLocations: {}, // Store click statistics by location
        data: {
          labels: [],
          datasets: [{
            label: 'Clicks by Location',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      }
    },
    mounted() {
      this.fetchClickStats()
    },
    methods: {
      fetchClickStats() {
  const db = getDatabase();
  const clicksRef = dbRef(db, 'clicks');

  // Fetch click statistics by location
  onValue(clicksRef, (snapshot) => {
    const clickStatsByLocation = snapshot.val();
    if (clickStatsByLocation) {
      // Process click statistics by location
      // Assuming each location has its own node in the database
      Object.keys(clickStatsByLocation).forEach(location => {
        const locationStats = clickStatsByLocation[location];
        // Do something with locationStats, such as updating the UI or storing in component data
        console.log(`Clicks at ${location}: ${locationStats.totalClicks}`);
      });
    }
  });
}
,
      updateChartData() {
        // Extract labels (locations) and data (click counts) from clickLocations object
        const labels = Object.keys(this.clickLocations)
        const data = Object.values(this.clickLocations)
  
        // Update chart data
        this.data.labels = labels
        this.data.datasets[0].data = data
      }
    }
  }
  </script>
  
  <style>
  /* Add your CSS styles here */
  </style>
  