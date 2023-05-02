import {isNumber} from "ant-design-vue/es/_util/hooks/_vueuse/is";

const languageKey = 'language';
const themeKey = 'theme';
const storageKey = 'sessionStorage';//or localStorage
const defaultExpireTime = 6 * 1000;//6s

function saveD(key, value) {
    save(key, value, defaultExpireTime);
}

/**
 * @param key
 * @param value 过期时限
 * @param expireTime 保存的时间
 */
function save(key, value, expireTime) {
    if (isNumber(expireTime)) {
        const item = {
            value,
            expireTime,
            time: new Date(),
        };
        try {
            window[storageKey].setItem(key, encodeURIComponent(JSON.stringify(item)));
        }catch (e){
            console.error(e);
        }
        return;
    }
    throw 'expireTime should be number';
}

function get(key) {
    try {
        const target = window[storageKey].getItem(key);
        const jsonTarget = JSON.parse(decodeURIComponent(target));
        const {
            value,
            expireTime,
            time
        } = jsonTarget;
        const leftTime = new Date().getTime() - (new Date(time).getTime());
        if(expireTime<leftTime){
            window[storageKey].removeItem(key);
            return null;
        }
        return value;
    }catch (e){
        console.error(e);
        return null;
    }
}

export {languageKey, themeKey, saveD, save, get};