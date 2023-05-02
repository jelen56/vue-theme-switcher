import {theme} from "@/base";
import {themeKey, get, saveD} from "@/utils/localstorage";

function initTheme() {
    const themeTemp = get(themeKey);
    if (!themeTemp) {
        saveD(themeKey, theme.value);
    } else {
        theme.value = themeTemp;
    }
    selectCss();
}

function currentTheme() {
    return theme.value != null ? theme.value : get(themeKey);
}

function changeTheme() {
    const ct = currentTheme();
    if (ct == 'light') {
        theme.value = 'dark';
        saveD(themeKey, 'dark');
    } else if (ct == 'dark') {
        theme.value = 'light';
        saveD(themeKey, 'light');
    }
    selectCss();
    // callback(getCurrentThemeShot());
}

function selectCss() {
    const ct = currentTheme();
    removeCss();
    loadCss(ct);
    // document.querySelectorAll('link[href$="app.css"]').forEach(item => {
    //     item.remove()
    // });
    // await import('@/assets/css/' + ct + '/app.css');
    // await import('@/assets/css/' + ct + '/askPage.css');
    // await import('@/assets/css/' + ct + '/indexPage.css');

    // const ct = currentTheme();
    // document.querySelectorAll('link[href$="app.css"]').forEach(item => {
    //     item.remove()
    // });
    // fetch('static/'+ ct + '/app.css').then(response => response.text()).then(cssContent => {
    //         // eslint-disable-next-line no-debugger
    //         debugger
    //         const appStyle = document.createElement('style');
    //         appStyle.textContent = cssContent;
    //         appStyle.setAttribute('bookmark2page', 'b2p1');
    //         document.head.appendChild(appStyle);
    //     });
    //
    // fetch('../assets/css/' + ct + '/askPage.css').then(response => response.text()).then(cssContent => {
    //     const askPageStyle=document.createElement('style');
    //     askPageStyle.textContent = cssContent;
    //     askPageStyle.setAttribute('bookmark2page', 'b2p2');
    //     document.head.appendChild(askPageStyle);
    // });
    //
    // fetch('../assets/css/' + ct + '/indexPage.css').then(response => response.text()).then(cssContent => {
    //     const indexPageStyle = document.createElement('style');
    //     indexPageStyle.textContent = cssContent;
    //     indexPageStyle.setAttribute('bookmark2page', 'b2p3');
    //     document.head.appendChild(indexPageStyle);
    // });
}

function removeCss() {
    document.querySelectorAll('link[b2p-theme=bookmarks2page]').forEach(item => {
        item.remove()
    });
}

function loadCss(theme) {
    const link1 = document.createElement('link')
    link1.setAttribute('rel', 'stylesheet')
    link1.setAttribute('type', 'text/css')
    link1.setAttribute('b2p-theme', 'bookmarks2page')
    link1.setAttribute('href', '/css/' + theme + '/app.css')
    document.head.appendChild(link1);

    const link2 = document.createElement('link')
    link2.setAttribute('rel', 'stylesheet')
    link2.setAttribute('type', 'text/css')
    link2.setAttribute('b2p-theme', 'bookmarks2page')
    link2.setAttribute('href', '/css/' + theme + '/askPage.css')
    document.head.appendChild(link2);

    const link3 = document.createElement('link')
    link3.setAttribute('rel', 'stylesheet')
    link3.setAttribute('type', 'text/css')
    link3.setAttribute('b2p-theme', 'bookmarks2page')
    link3.setAttribute('href', '/css/' + theme + '/indexPage.css')
    document.head.appendChild(link3);
}


// function getCurrentThemeShot() {
//     if (theme.value == 'light') {
//         return '';
//     } else if (theme.value == 'en') {
//         return 'en';
//     }
//     return 'no';
// }

export {initTheme, changeTheme};
