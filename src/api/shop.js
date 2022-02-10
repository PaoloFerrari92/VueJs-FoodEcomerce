import axios from 'axios'


const http = axios.create(); 

export default {

  getProducts() {
    return http.get('https://ott-fogliata.github.io/vuejs-s2i-repository/cultured-meat.json').catch(e => console.log(e));
  }

}