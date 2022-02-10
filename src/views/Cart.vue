<template>

  <Nav />
  <div class="w-full h-full bg-gray-100">
    <!--  section 1  -->
    <div class="header-section flex flex-row px-8 py-3">
      <button class="flex-none">
        <span class="fa fa-chevron-left font-bold text-2xl" />
      </button>
      <div class="flex-grow text-center">
        <h2 class="font-bold text-2xl">My Cart</h2>
      </div>
    </div>
    <!-- main content   -->
    <div class="mb-12">
      <ul v-for="item in cart" :key="item.product.name" class="p-8">
        <li class="flex bg-white p-5 rounded-lg shadow-lg mb-5 ">
          <img :src="item.product.image" class="w-32" />
          <div class="flex-grow flex flex-col md:flex-row items-center justify-center md:justify-between">
            <p class="title font-semibold text-sm md:text-lg mb-5 md:mb-0 md:pl-5">{{item.product.name}}</p>
            <div class="flex">
              <!-- Dec Button -->
              <button @click="handleDecButton(item.product)" class="ml-1 bg-blue-200 fa fa-minus rounded-lg bg flex justify-center items-center p-3 z-10"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <p class="text-center text-md font-semibold p-2 rounded w-10 focus:outline-none">{{item.quantity}} </p>
              <!-- Inc Button -->
              <button @click="handleIncButton(item.product)" class="bg-blue-200 fa fa-plus rounded-lg bg flex justify-center items-center p-3 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <!-- Remove Button -->
              <button @click="handleRemoveButton(item.product) " class="bg-red-200  ml-1 fa fa-plus rounded-lg bg flex justify-center items-center p-3 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            <p class=" text-xl value font-bold mt-5 md:mt-0">€ {{item.product.price}} x {{item.quantity}} = €{{ singleItemTotal(item)}}</p>
          </div>
        </li>

      </ul>
    </div>

    <!--  checkout    -->
    <div class="header-section flex flex-row px-8 py-1 fixed bottom-0 w-full lg:w-3/5">
      <div class="mr-12">
        <p class="title font-semibold text-sm">Total</p>

        <p v-if="!discount()" class="value font-semibold text-lg font-bold">€{{total}}</p>
        <div v-if="discount()" class="value font-semibold text-lg font-bold">
          <p>€{{total}} </p>
          <p class="text-red-500"> You have got -10%! </p>
        </div>
      </div>
      <div class="flex-grow text-center">
        <button class="bg-white px-10 py-3 rounded-lg w-full">
          <span class="font-bold">Checkout</span>
          <i class="fa fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>

</template>

<script setup >
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import Nav from "../components/Nav.vue";
const store = useStore();

const cart = computed(() => store.getters["cart/cartProducts"]);

const discount = () => {
  return store.getters["cart/checkDiscount"];
};

const total = computed(() => store.getters["cart/cartTotalPrice"]);

const handleRemoveButton = (product) => {
  store.dispatch("cart/removeProduct", product);
};

const handleIncButton = (product) => {
  store.dispatch("cart/addProductToCart", { product });
};

const handleDecButton = (product) => {
  store.dispatch("cart/decProductQuantity", product);
};

const singleItemTotal = (item) => {
  computed(() => {});
  return parseFloat(item.quantity * item.product.price).toFixed(2);
};
</script>

<style>
.header-section {
  background-color: #ffc400;
}

input {
  background: #f5f5f5;
  margin: 0 -10px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>