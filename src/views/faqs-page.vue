<template>
    <div class="max-w-[800px] mx-auto mt-9">
    <h2 class="text-3xl font-bold mb-9 flex gap-2 items-center">
      <img src="../assets/images/Line 70.png" alt="A line image" class="h-[44px]">FAQ</h2>
    <div class="">
      <div v-for="(list, index) in lists" :key="index" class="">
        <div class="leading-[28px] text-base">
          <div class="flex justify-between items-center cursor-pointer" @click="toggleDetails(index)">
            <h3 class="font-semibold mt-6">{{ list.question }}</h3>
            <FontAwesomeIcon :icon="openIndex === index ? faMinus : faPlus" />
          </div>
        </div>
        <div class="leading-[28px] text-base" v-show="openIndex === index">
          <p>{{ list.answer }}</p>
        </div>
        <div class="border-b border-[#D9D6D6]"></div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
  
  const openIndex = ref(null);
  
  const toggleDetails = (index:any) => {
    openIndex.value = openIndex.value === index ? null : index;
  };
  
  const lists = [
    {
      question: "How does URL shortening work?",
      answer: "URL shortening works by taking a long URL and creating a shorter, condensed version that redirects to the original URL. When a user clicks on the shortened link, they are redirected to the intended destination."
    },
    {
      question: 'Is it necessary to create an account to use the URL shortening service',
      answer: 'Yes it is necessary to sign-up to use the URL shortening services'
          
    },
    {
      question:'Are the shortened links permanent? Will they expire?',
        answer:'Yes shorten links are permanent, so long as user is signed up to the URL shorten services.'},
        { question:' Are there any limitations on the number of URLs I can shorten?',
         answer: 'Yes, there might be limitations on the number of URLs you can shorten depending. Users can shorten  total number of  twenty URLs per month  per account for free.'},
         {
          question:'Can I customize the shortened URLs to reflect my brand or content?',
          answer:'Yes, this URL shortening services offer customization options that allow you to personalize the shortened URLs to reflect your brand or content.'
         },
         {
          question:' Can I track the performance of my shortened URLs?',
          answer: 'Yes, this URL shortening services offer analytics and tracking features that allow you to monitor the performance of your shortened URLs.'
         },
        {
          question:'How secure is the URL shortening service? Are the shortened links protected against spam or malicious activity?',
          answer:'  The security of this URL shortening service is secure to protect against spam or malicious activity.'
        },
        {
          question:'What is a QR code and what can it do',
          answer:'A QR code, short for Quick Response code, is a type of two-dimensional barcode that contains information encoded in a pattern of black squares arranged on a white background. QR codes can store various types of data, including text, URLs, contact information, and more.'
        },
        {
          question:'Is there an API available for integrating the URL shortening service into my own applications or websites?',
          answer:'Yes, many URL shortening services provide APIs (Application Programming Interfaces) that allow developers to integrate URL shortening functionality into their own applications or websites. These APIs typically offer endpoints that enable users to programmatically shorten URLs, retrieve shortened URLs, and perform other related tasks.'
        }
  
  ];
  
  </script>
  
  <style scoped>

  </style>
  