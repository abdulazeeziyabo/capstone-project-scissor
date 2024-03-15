<template>
    <div>
      <h2>Analytics for {{ shortenedLink }}</h2>
      <p>Total Clicks: {{ totalClicks }}</p>
      <ul>
        <li v-for="click in clicks" :key="click.id">
          {{ click.timestamp }} - {{ click.location }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import {Firebase}  from '@/utils/firebase';
  import 'firebase/firestore';
  import { ref, onMounted } from 'vue';
import { database } from '@/utils/firebase';

  export default {
    data() {
      return {
        shortenedLink: '', 
        totalClicks: 0, 
        clicks: [],
        analyticsData: null, 
      }
    },
    created() {
     this.shortenedLink = this.$route.params.id
      this.fetchAnalytics();
    },
    methods: {
      fetchAnalytics() {
        const db = Firebase.firestore();
        const analyticsRef = db.collection('analytics').doc(this.shortenedLink).collection('clicks');
      }
    },
    computed: {
    formatCreationTime() {
      if (this.createdAt) {
        const creationDate = new Date(this.createdAt)
        return creationDate.toLocaleString() 
      }
      return new Date().toLocaleString()
    }
  },
  async onMounted() {
    const linkId = this.$route.params.id;
    const linkRef = ref(database, `linkCollections/${linkId}`);
    const snapshot = await linkRef.value.get();
    if (snapshot.exists()) {
      this.analyticsData = snapshot.val().analytics;
    } else {
      console.log('No analytics data found for the link.');
    }
  }
  }
  </script>
  