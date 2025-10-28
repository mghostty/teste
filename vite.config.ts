import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ui from '@nuxt/ui/vite';
import navigationMenu from './src/utils/styles/navigation-menu';
import pageHeader from './src/utils/styles/page-header';
import dashboardPanel from './src/utils/styles/dashboard-panel';
import dashboardSidebar from './src/utils/styles/dashboard-sidebar';
import modal from './src/utils/styles/modal';
import container from './src/utils/styles/container';
import tabs from './src/utils/styles/tabs';
import colors from './src/utils/styles/colors';
import main from './src/utils/styles/main';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ui({
      ui: {
        colors,
        navigationMenu,
        pageHeader,
        dashboardPanel,
        dashboardSidebar,
        modal,
        container,
        tabs,
        main
      },
    }),
  ],
});
