import axios from 'axios'
import shop from '../../api/shop'
// initial state
const state = {
    all: [],
    product: null,
    showProduct: false
}

// getters
const getters = {
    getShowProduct(state) {
        return state.showProduct;
    },
    getProduct(state) {
        return state.product
    }
}

// actions
const actions = {
    getAllProducts({ commit }) {
        // try {
        //     axios.get('https://ott-fogliata.github.io/vuejs-s2i-repository/cultured-meat.json')
        //         .then(response => {
        //             commit('SET_PRODUCTS', response.data);
        //         });
        // } catch (err) {
        //     console.log(err);
        // }

        shop.getProducts().then( ({data}) => {
            commit('SET_PRODUCTS', data);
        }); 
      
    },
    setShowProduct({ commit }, { product, value }) {
        commit('SET_SHOW_PRODUCT', { product, value });
    }
}

// mutations
const mutations = {
    SET_PRODUCTS(state, products) {
        state.all = products
    },
    SET_SHOW_PRODUCT(state, { product, value }) {
        state.product = product;
        state.showProduct = value;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}