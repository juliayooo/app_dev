import Vue from 'nativescript-vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)

import App from './components/App'

new Vue({
  render: (h) => h(App),
}).$start()

export const eventHub = new Vue({});