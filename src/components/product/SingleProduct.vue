<template>
  <div @click="handleClose" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-4xl font-bold text-center leading-6  text-gray-900" id="modal-title">
                {{product.name}}
              </h3>
              <div class="mt-4">
                <img :src="product.image" class="w-full object-cover object-center" />
              </div>
              <div class="mt-2">
                <p class="text-lg text-black-500">
                  {{product.description}}
                </p>

              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex justify-center">
          <p class="text-4xl font-bold inline-flex justify-center">
            €{{product.price}}
          </p>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-center">

          <button type="button" v-if="!checkInCart(product)" @click="handleAddToCartButton(product)" :disabled="checkInCart(product)" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
            Add To Cart
          </button>
          <button type="button" v-if="checkInCart(product)" @click="handleAddToCartButton(product)" :disabled="checkInCart(product)" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
            Already in Cart
          </button>
          <button type="button" @click="handleClose" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Close
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

const store = useStore();

const product = computed(() => {
  return store.getters["products/getProduct"];
});

const handleClose = (product) => {
  store.dispatch("products/setShowProduct", {
    product: null,
    value: false,
  });
};

const checkInCart = (product) => {
  return store.getters["cart/checkProductInCart"](product);
};

const handleAddToCartButton = (product) => {
  store.dispatch("cart/addProductToCart", {
    product: product,
    quantity: 1,
  });
};
</script>

<style>
</style>