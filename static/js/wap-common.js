function ValidateInt(e) {
    var val = $(e).val();
    if (!/^\d+$/.test(val)) {
        var newValue = /^\d+/.exec(val);
        var curValue = newValue ? newValue : '';
        $(e).val(curValue);
    }
    return false;
}

function validate(e) {
    var val = $(e).val();
    if (!/^\d+[xX]?$/.test(val)) {
        var newValue = /^\d+/.exec(val);
        var curValue = newValue ? newValue : '';
        $(e).val(curValue);
    }
    return false;
}

function telRuleCheck(string) {
    var pattern = /^1[3456789]\d{9}$/;
    if (pattern.test(string)) {
        return true;
    }
    return false;
}

function cardRuleCheck(string) {
    var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (pattern.test(string)) {
        return true;
    }
    return false;
}

Utils = {
    val: function (elementId) {
        return $.trim($('#' + elementId).val());
    },

    isBlank: function (elementId) {
        return $.trim($('#' + elementId).val()) == '';
    },

    errorMsg: function (msg) {
        layer.msg(msg, {icon: 2, time: 2500})
    },

    okMsg: function (msg) {
        layer.msg(msg, {icon: 1, time: 1500})
    },

    // 加载进度条遮罩
    blockUI: function () {
        // $("body").append('<div class="loading-box"><div class="loading-con">处理中，请稍后...</div></div>');
        layer.load(1);
    },

    // 去掉进度条遮罩
    unblockUI: function () {
        // $(".loading-box").remove();
        layer.closeAll('loading');
    },

    disableBtn: function (id) {
        $('#' + id).attr("disabled", true);
    },

    enableBtn: function (id) {
        $('#' + id).attr("disabled", false);
    },

    go2: function (url) {
        window.location.href = url;
    },

    reload: function () {
        window.location.reload()
    },

    uuid: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    }
};

/**
 * 加载进度条遮罩
 */
function blockUI() {
    Utils.blockUI();
}

/**
 * 去掉进度条遮罩
 */
function unblockUI() {
    Utils.unblockUI();
}

/**
 * 打开一个url encode的url地址
 * @param encodeUrl
 */
function openEncodeUrl(encodeUrl) {
    var url = decodeURIComponent(encodeUrl);
    window.open(url);
}

/**
 * layer ui 打开iframe
 * @param url
 * @param area
 * @param endFunction
 */
function openLayer(url, height, width, title, endFunction) {
    layer.open({
        type: 2,
        title: title,
        closeBtn: 1, //显示关闭按钮
        shade: [0],
        area: [height + 'px', width + 'px'],
        offset: 'auto', //右下角弹出
        anim: 3,
        end: endFunction,
        // content: [url, 'no'] //iframe的url，no代表不显示滚动条
        content: [url]
    });
}

/**
 * 关闭layer iframe
 */
function closeLayer() {
    layer.closeAll();
}

/**
 * 关闭父窗口layer iframe
 */
function closeParentLayer() {
    parent.layer.closeAll();
}


function checkPhone(phone) {
    if (phone != "") {
        var pattern = /^(\+)?(\d(\d)*)(-\d(\d)*)*$/;
        return pattern.test(phone);
    }
    return true;
}

function checkTel(phone) {
    if (phone != "") {
        var pattern = /^(0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8})|(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/;
        return pattern.test(phone);

    }
    return true;
}

function checkEmail(email) {
    if (email != "") {
        var pattern = /^([a-zA-Z0-9_\.-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        return pattern.test(email);
    }
    return true;
}

function checkQQ(qq) {
    if (qq != "") {
        var pattern = /^[1-9]\d{4,}$/;
        return pattern.test(qq);
    }
    return true;
}

function checkMobileFormat(mobile) {
    mobile = mobile.replace(/\s+/g, "");
    if (mobile != '') {
        return mobile.length == 11 && mobile.match(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/);
    } else {
        return true;
    }
}

function checkUserName(username) {
    if (username != '') {
        var pattern = /^([a-zA-Z_——0-9]+)$/;
        return pattern.test(username);
    } else
        return true;
}

function checkMobile(mobile) {
    mobile = mobile.replace(/\s+/g, "");
    if (mobile != '') {
        return mobile.length == 11 && mobile.match(/^((1[0-9]{2})+\d{8})$/);
    } else
        return true;
}

function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}