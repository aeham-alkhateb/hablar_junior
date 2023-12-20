import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import "echarts"


import VueFriendlyIframe from 'vue-friendly-iframe';

Vue.use(VueFriendlyIframe);
Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#4AA9F5",
                secondary: "#64BCE0",
                theme:"64BCE0",
                accent: "3D87E4",
                edit:"ff934c",
                pistachioColor: "b0cb6b"
            }
        }
    }
});
