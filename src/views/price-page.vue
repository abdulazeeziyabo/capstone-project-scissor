<template>
    <div class="pl-7 px-7 price-container">
        <div class="w-[600px] mx-auto">
            <p class="flex items-center text-4xl font-bold gap-3 mt-9 "><img src="../assets/images/Line 70.png">A <span class="text-[#005AE2] tracking-[1.5]">price perfect</span> for your needs.</p>
            <p class="mt-3">From catering for your personal, business, event, socials needs, you can be rest assured we have you in mind in
                our
                pricing.</p>
        </div>
        <div class="flex justify-between mt-[200px] w-[930px] mx-auto relative border border-[#005AE2] border-[0.4px] rounded h-[440px] mb-9 wrapper ">
            <div class="py-2">
                <p>Basic</p>
                <h4>Free</h4>
                <p>Free plan for all users</p>
                <p class="flex items-center gap-2 "><BlueCheck class='w-[18px] h-[18px]'/>Unlimited URL Shortening</p>
                <p class="flex items-center gap-2"><BlueCheck class='w-[18px] h-[18px]'/>Basic Link Analytics</p>
                <p class="flex items-center gap-2"><BlueCheck class='w-[18px] h-[18px]'/>Customizable Short Links</p>
                <p class="flex items-center gap-2"><BlueCheck class='w-[18px] h-[18px]'/>Standard Support</p>
                <p class="flex items-center gap-2"><BlueCheck class='w-[18px] h-[18px]'/>Ad-supported</p>
            </div>
            <div class="bg-[#1E3448] text-white border border-rounded professional">
                <p>Professional</p>
                <h4 class="font-bold text-3xl">{{!isYearly?'$15/month':'$35/year'}}</h4>
                <p>Ideal for business creators</p>
                <p class="flex gap-2"><img src="../assets/images/check-circle2.svg">Team Enhanced Link Analytics</p>
                <p class="flex gap-2"><img src="../assets/images/check-circle2.svg">Custom Branded Domains</p>
                <p class="flex gap-3"><img src="../assets/images/check-circle2.svg">Advanced Link Customization</p>
                <p class="flex gap-2"><img src="../assets/images/check-circle2.svg">Priority Support</p>
                <p class="flex gap-2"><img src="../assets/images/check-circle2.svg">Ad-free Experience</p>
            </div>
            <div class="basic-wrapper teams" id="teams">
                <p>Teams</p>
                <h4 >{{!isYearly?'$25/month':'$55/year'}}</h4>
                <p>Share with up to 10 users</p>
                <div class="flex items-center gap-2">
                    <BlueCheck class='w-[18px] h-[18px]' /><p>Team Collaboration</p>

                </div>
                <p class="flex items-center gap-2"><BlueCheck class='w-[18px] h-[18px]'/> User Roles and Permissions</p>
                <p class="flex items-center gap-2"><BlueCheck class='w-[18px] h-[18px]'/>Enhanced Security</p>
                <p class="flex items-center gap-2"><BlueCheck class='w-[18px] h-[18px]'/>API Access</p>
                <p class="flex items-center gap-2"><BlueCheck class='w-[18px] h-[18px]'/> Dedicated Account Manager</p>
            </div>

        </div>

        <div class="flex items-center w-[400px] mx-auto mt-[170px] gap-[60px] mb-9">
            <button class="border border-[#005AE2] px-5 py-3 rounded-full text-[#005AE2]" @click="handleTogglePlan(false)">Monthly Plan</button>
            <button class="border bg-[#005AE2] px-5 py-3 rounded-full text-white" @click="handleTogglePlan(true)">Annual Plan
            </button>
        </div>
    </div>
</template>

<script>
import BlueCheck from '@/components/svg-components/Blue-check.vue';

export default {
    components: {
        BlueCheck,
    },
    data() {
        return {
            isYearly: false,
        };
    },
    methods: {
        handleTogglePlan(yearly) {
            this.isYearly = yearly;
        },
    },
};
</script>


<style scoped>
.professional {
  width: 400px;
  height: 620px;
  color: #fff;
  padding: 30px;
  border-radius: 12px;
 text-align: center;
 margin-top: -120px;
 line-height: 60px;
 
}
.wrapper{
    padding: 20px;
 line-height: 50px;
  
}
@media (max-width: 1000px) {
  .price-container{
    display: block;
  } 
}
</style>
