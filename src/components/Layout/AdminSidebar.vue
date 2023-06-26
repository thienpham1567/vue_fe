<template>
  <div class="flex">
    <!-- Backdrop -->
    <div :class="isOpen ? 'block' : 'hidden'" @click="isOpen = false"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"></div>
    <!-- End Backdrop -->

    <div :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <Image :src="Logo" alt="Logo" width="150" />
          <span class="mx-2 text-2xl font-semibold text-white">ATDashboard</span>
        </div>
      </div>

      <nav class="mt-10">
        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[route.name === 'Dashboard' ? activeClass : inactiveClass]" to="">
          <i class="pi pi-box" style="font-size: 2rem"></i>
          <span class="mx-4">Product</span>
        </router-link>

        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[route.name === 'CategoryAdmin' ? activeClass : inactiveClass]" to="/admin/categories">
          <i class="pi pi-sitemap" style="font-size: 2rem"></i>
          <span class="mx-4">Category</span>
        </router-link>

        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[route.name === 'BrandAdmin' ? activeClass : inactiveClass]" to="/admin/brands">
          <i class="pi pi-th-large" style="font-size: 2rem"></i>
          <span class="mx-4">Brand</span>
        </router-link>

        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[route.name === 'Forms' ? activeClass : inactiveClass]" to="/admin/orders">
          <i class="pi pi-truck" style="font-size: 2rem"></i>
          <span class="mx-4">Order</span>
        </router-link>

        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[route.name === 'ReviewAdmin' ? activeClass : inactiveClass]" to="/admin/review">
          <i class="pi pi-chart-bar" style="font-size: 2rem"></i>
          <span class="mx-4">Reviews</span>
        </router-link>

        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[route.name === 'Modal' ? activeClass : inactiveClass]" to="/admin/report">
          <i class="pi pi-chart-bar" style="font-size: 2rem"></i>
          <span class="mx-4">Report</span>
        </router-link>

        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[route.name === 'Blank' ? activeClass : inactiveClass]" to="/admin/accounts">
          <i class="pi pi-users" style="font-size: 2rem"></i>
          <span class="mx-4">Account Management</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSidebar } from '@/hooks/useSidebar';
import { useRoute } from 'vue-router';
import Logo from "@/assets/images/logo.png";

const route = useRoute();
const { isOpen } = useSidebar();
const activeClass = ref(
  'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100'
);
const inactiveClass = ref(
  'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100'
);
</script>
