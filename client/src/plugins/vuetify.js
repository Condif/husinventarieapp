import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const vuetify = 
new Vuetify({
    theme: {
        // dark: true,
        themes: {
          light: {
            base: '#E8DFE0',
            primary: '#DAB692',
            secondary: '#8f5b34',
            accent1: '#8A9EA7',
            accent2: '#8D9B6A',
            // info: '#DAB692',
            // error: '#FF5252',
            // success: '#8f5b34',
            // warning: '#FFC107',
            
          }
        },
      },
});

export default vuetify



