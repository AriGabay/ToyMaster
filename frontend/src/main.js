import Vue from 'vue';
import app from './app.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { ValidationProvider } from 'vee-validate';
import './assets/style/main.css';
import * as VueGoogleMaps from 'vue2-google-maps';
import './styles/styles.scss';

Vue.config.productionTip = false;
Vue.component('ValidationProvider', ValidationProvider);
Vue.use(ElementUI);
Vue.use(VueGoogleMaps, {
  load: {
    // region: 'VI'
    // region: 'GB',
    // language: 'Heb',
    key: 'AIzaSyARLjLvyMPGRPBTjpwqu92ZjyJBX7sjmFk',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
});

new Vue({
  router,
  store,
  render: h => h(app),
}).$mount('#app');
