const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const AUTH_ERROR = "AUTH_ERROR";

// initial state
const state = {
  status: "",
  token: localStorage.getItem("token") || "",
  user: {}
}

// getters
const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status
}

// actions
const actions = {

  login: ({ commit }, creds) => {
    commit(LOGIN);

    return new Promise(resolve => {
      setTimeout(() => {
        if (creds.email.value == "user@user.it" && creds.password.value == "user") {
          let token = "JWT";
          let user = {
            name: creds.email,
            password: creds.password
          }
          localStorage.setItem("token", token);
          commit("LOGIN_SUCCESS", { token: token, user: user });
        } else {
          commit("AUTH_ERROR");
          localStorage.removeItem("token");
        }

        resolve();
      }, 1000);
    });
  },

  logout: ({ commit }) => {
    commit(LOGOUT);
    localStorage.removeItem("token");
  }

}

// mutations
const mutations = {
  [LOGIN](state) {
    state.status = 'pending';
  },

  [LOGIN_SUCCESS](state, data) {
    state.status = "success";
    state.token = data.token;
    state.user = data.user;
  },
  [AUTH_ERROR](state) {
    state.status = "error";
  },
  [LOGOUT](state) {
    state.status = " ";
    state.token = "";
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
