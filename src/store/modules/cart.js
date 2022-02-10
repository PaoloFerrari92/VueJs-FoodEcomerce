// initial state
const state = {
    items: [],
    discount: false
}

// getters
const getters = {
    cartProducts: (state, getters) => {
        return state.items;
    },

    cartTotalPrice: (state) => {
        let sum = 0;
        state.discount = false; 
        for (let i = 0; i < state.items.length; i++) {
            sum += state.items[i].product.price * state.items[i].quantity;
        }
        if (state.items.length > 2) {
            state.discount = true;
            let disc = sum / 10;
            sum -= disc;
        }

        return parseFloat(sum).toFixed(2);
    },

    checkDiscount: (state) => {
        return state.discount; 
    }, 
    cartItemCount: (state) => {
        return state.items.length;
    },
    checkProductInCart: (state) => (product) => {
        for (let i = 0; i < state.items.length; i++) {
            if (state.items[i].product.name === product.name)
                return true;
        }

        return false;

    },
}

// actions
const actions = {

    addProductToCart({ commit }, { product, quantity = 0 }) {
        commit('ADD_TO_CART', { product, quantity })
    },

    removeProduct({ state, commit }, product) {
        commit('REMOVE_FROM_CART', product)

    },
    discount({ commit }) {
        commit("SET_DISCOUNT", false); 
        console.log(state.discount);
        if (state.items.length > 2) {
            commit("SET_DISCOUNT", true);
        }

    },
    changeDiscount({ commit }, value) {
        commit('SET_DISCOUNT', value)

    },
    decProductQuantity({ state, commit }, product) {
        commit('DEC_PRODUCT_QUANTITY', product)

    },

    checkInCart({ commit }, product) {
        return false;
    }
}

// mutations
const mutations = {

    SET_DISCOUNT(state, value) {
        state.discount = value;
    },
    ADD_TO_CART(state, { product, quantity }) {

        let productInCart = state.items.find(item => {
            return item.product.name === product.name;
        })

        if (productInCart) {
            productInCart.quantity++;
            return;
        }

        state.items.push({
            product,
            quantity,
        });

    },

    REMOVE_FROM_CART(state, product) {
        for (let i = 0; i < state.items.length; i++) {
            if (state.items[i].product.name == product.name) {

                state.items.splice(i, 1);
            }
        }
    },

    DEC_PRODUCT_QUANTITY(state, product) {
        for (let i = 0; i < state.items.length; i++) {
            if (state.items[i].product.name == product.name) {
                if (state.items[i].quantity > 1) {
                    state.items[i].quantity--;
                    return
                }
                state.items.splice(i, 1);
            }
        }
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
