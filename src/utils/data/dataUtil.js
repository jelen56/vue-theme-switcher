function isEmpty(target) {
    if (target == null | typeof (target) == 'undefined' | target == '') {
        return true;
    }
    if (target instanceof Array) {
        return target.length == 0;
    }
    return false;
}

function contain(ob, target) {
    return Object.prototype.hasOwnProperty.call(ob, target);
}

export {isEmpty, contain}