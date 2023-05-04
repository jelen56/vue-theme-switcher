import { createApp } from 'vue'
import App from './App.vue'
// import '/public/css/base.css'
import {initTheme, theme} from "@/utils/theme/themeswitcher";
//initTheme
function renderApp() {
    const app = createApp(App);
    initTheme({
        localCssBasePath: '/css',
        // remoteCssBaseUrl:'https://google.com/css',
        defaultTheme: theme.light,
        baseCss: ['base.css'],
        themeCss: ['app.css', 'hello-world.css']
    })
    app.mount('#app');
}
renderApp();
export {renderApp}
