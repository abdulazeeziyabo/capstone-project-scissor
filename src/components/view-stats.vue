<template>
    <Line :data="data" :options="options" />
  </template>
  
  <script lang="ts">
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
  import {Line } from 'vue-chartjs'
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,LineElement, PointElement)
  
  export default {
    name: 'App',
    components: {
 Line
    },
    data() {
      return {
        data: {
          labels: ['January', 'February', 'March'],
          datasets: [{ data: [3, 3, 2] }]
        },
        options: {
          responsive: true
        }
      }
    }
  }
  </script>