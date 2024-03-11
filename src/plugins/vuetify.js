import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme: {
        dark: false,
        colors: {
          primary: '#1976d2',
        }
      }
    }
  },

  components,
  directives
});
