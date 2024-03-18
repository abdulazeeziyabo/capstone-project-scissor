<template>
  <aside :class="`view-stats-sidebar ${stats ? 'active' : ''}`" v-if="linkData">
    <div class="sidebar-header">
      <h2>Link statistics</h2>
      <button @click="onClose">
        <img src="../assets/images/close-button.svg" alt="close icon" />
      </button>
    </div>

    <div class="stats-thumbnail">
      <div class="stats-thumbnail-top">
        <img src="../assets/images/thumbnail placeholder.svg" alt="Thumbnail" />
        <p>{{ linkData.shortenedLink }}</p>
      </div>
      <div class="stats-thumbnail-bottom">
        <p>{{ linkData.longUrl }}</p>
      </div>
    </div>

    <div class="divider"></div>

    <div class="stats-cards-container">
      <div v-for="(value, key) in stats" :key="key" class="stat-card">
        <div class="date-range">
          <select v-model="dateRange">
            <option value="last7Days">Last 7 days</option>
            <option value="last30Days">Last 30 days</option>
            <option value="last60Days">Last 60 days</option>
            <option value="last90Days">Last 90 days</option>
          </select>
        </div>
        <h3>{{ key }}</h3>
        <p>{{ value.count }}</p>
        <span :class="`change ${value.change > 0 ? 'increase' : 'decrease'}`">
          {{ value.change > 0 ? '+' : '' }}{{ value.change }}%
        </span>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import {Firebase} from '@/utils/firebase';
import {auth} from '@/utils/firebase'
import { ref, onValue } from 'firebase/database';
import {database} from '@/utils/firebase'

export default {
  props: {
    onClose: Function
  },
  data() {
    return {
      stats: null,
      dateRange: 'last7Days',
      linkData:{shortenedLink: '', longUrl: ''}
    };
  },
  computed: {
    currentUser() {
      // Access currentUser using your authentication mechanism
      return auth.currentUser;
    }
  },
  watch: {
    linkData(newValue) {
      if (newValue) {
        // Implement Firebase logic to fetch stats based on linkData
        this.fetchStats();
      }
    }
  },
  created() {
    // Fetch stats data here based on currentUser and linkData
    if (this.currentUser && this.linkData) {
      this.fetchStats();
    }
  },
  methods: {
    fetchStats() {
      const statsRef = ref(database(), `users/${this.currentUser.uid}/links/${this.linkData.linkId}/stats`);
      onValue(statsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Update stats state with fetched data
          this.stats = data;
        }
      }, (error) => {
        console.error('Error fetching stats:', error);
      });
    }
  }
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>
