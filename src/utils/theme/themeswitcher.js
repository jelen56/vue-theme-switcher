import {saveD, themeKey, get} from "@/utils/local/localstorage";
import {contain, isEmpty} from "@/utils/data/dataUtil";

const theme = {
    light: 'light',
    dark: 'dark'
}
const tagLinkCss = {
    normal: 'theme',
    base: 'base'
}
//default config
const themeConfig = {
    localCssBasePath: '/css',
    remoteCssBaseUrl: '',
    targetTheme: theme.light,
    baseCss: ['base.css'],
    themeCss: ['app.css', 'hello-world.css']
}

function initTheme({localCssBasePath, remoteCssBaseUrl, defaultTheme, baseCss, themeCss}) {
    initConfig({localCssBasePath, remoteCssBaseUrl, defaultTheme, baseCss, themeCss});
    const themeTemp = get(themeKey);
    if (isEmpty(themeTemp)) {
        saveD(themeKey, themeConfig.targetTheme);
    } else {
        themeConfig.targetTheme = themeTemp;
    }
    initBaseCss();
}

function currentTheme() {
    return themeConfig.targetTheme != null ? themeConfig.targetTheme : get(themeKey);
}

function isLegal(target) {
    if (isEmpty(target) || typeof (target) != 'string') {
        return false;
    }
    return !!contain(theme, target);

}

function initConfig({localCssBasePath, remoteCssBaseUrl, defaultTheme, baseCss, themeCss}) {
    let result;
    if (!isEmpty(localCssBasePath)) {
        themeConfig.localCssBasePath = localCssBasePath;
        result=true;
    }
    if (!isEmpty(remoteCssBaseUrl)) {
        themeConfig.remoteCssBaseUrl = remoteCssBaseUrl;
        result=true;
    }
    if (result&&isLegal(defaultTheme)) {
        themeConfig.targetTheme = defaultTheme;
    }
    if (!isEmpty(baseCss)) {
        themeConfig.baseCss = baseCss;
    }
    if (!isEmpty((themeCss))) {
        themeConfig.themeCss = themeCss;
    }
    if(!result){
        throw 'initConfig parameters error'
    }
}



function changeTheme(startChangeHandler, endChangeHandler) {
    const ct = currentTheme();
    switch (ct) {
        case theme.light:
            themeConfig.targetTheme = theme.dark;
            saveD(themeKey, theme.dark);
            break;
        case theme.dark:
            themeConfig.targetTheme = theme.light;
            saveD(themeKey, theme.light);
            break;
        default:
            throw 'sorry,no this theme';
    }
    if (startChangeHandler) {
        startChangeHandler();
    }
    removeNormalCss(startChangeHandler);
    selectCss(endChangeHandler);
}

function initBaseCss() {
    clearCss();
    for (const item of themeConfig.baseCss) {
        document.head.appendChild(createLinkElementByPath(baseUri() + item, tagLinkCss.base));
    }
    selectCss();
}

function selectCss(endChangeHandler) {
    loadCss(currentTheme());
    if (endChangeHandler) {
        endChangeHandler();
    }
}

function clearCss() {
    removeNormalCss();
    removeBaseCss();
}

function removeBaseCss() {
    document.querySelectorAll("link[vue-theme-switcher=" + tagLinkCss.base + "]").forEach(item => {
        item.remove()
    });

}

function removeNormalCss() {
    doTransitionAction();
    document.querySelectorAll("link[vue-theme-switcher=" + tagLinkCss.normal + "]").forEach(item => {
        item.remove();
    });
}

function doTransitionAction() {
    document.body.style.display = 'none';
}

function closeTransitionAction() {
    if (document.body.style.display === 'none') {
        document.body.style.display = 'block';
    }
}

function loadCss(theme) {
    for (const item of themeConfig.themeCss) {
        document.head.appendChild(createLinkElementByCssName(theme, item));
    }
}

function baseUri() {
    return (isEmpty(themeConfig.remoteCssBaseUrl) ? themeConfig.localCssBasePath : themeConfig.remoteCssBaseUrl) + "/";
}

function createLinkElementByCssName(theme, cssName) {
    const path = baseUri() + theme + '/' + cssName;
    return createLinkElementByPath(path, tagLinkCss.normal);
}

function createLinkElementByPath(path, tag) {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('vue-theme-switcher', tag)
    link.setAttribute('href', path);
    link.onload = () => {
        closeTransitionAction();
    };
    return link;
}

export {theme, initTheme, changeTheme};
