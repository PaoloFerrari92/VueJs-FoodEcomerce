<template>
  <nav id="store" class="w-full z-30 top-0 px-6 py-1">
    <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
      <!-- Home -->
      <router-link :to="{ name: 'Home' }" class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl ">
        Store
      </router-link>

      <div class="flex items-center">
        <p class="font-bold">{{cartItemCount}}</p>
        <!-- Cart -->
        <router-link :to="{ name: 'Cart' }" class="pl-3 inline-block no-underline hover:text-black">
          <svg class="h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </router-link>

        <!-- Logout -->
        <a v-if="isLoggedIn" @click="logout" href="#" class="pl-3 inline-block no-underline hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const cartItemCount = computed(() => store.getters["cart/cartItemCount"]);
const logout = () => {
  store.dispatch("auth/logout").then(() => {
    router.push("/login");
  });
};
const isLoggedIn = computed(() => store.getters["auth/isLoggedIn"]);
</script>
