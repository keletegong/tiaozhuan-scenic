/*微信分享*/

function share_success(){

}
function share(shareData) {
    var url = window.location.href;
    /*if(url.indexOf("/open/")<0){
        return false;
    }*/
    if(url.indexOf("state=STATE")>=0) {
        var reg = /code=(.+)&/g;
        url = url.replace(reg, "");
    }
    var data = {};
    data['url'] = url;
    $.ajax({
        type: "GET",
        url: ctx + "/wap/open/common/share/config",
        data: data,
        dataType: 'json',
        async: false,
        success: function (responseData) {
            if (responseData != null) {
                var title = shareData.title;
                var desc = shareData.desc;
                var link = responseData.url;
                var imgUrl = shareData.img;

                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) != 'micromessenger') {
                    return false;
                }

                wx.config({
                    debug: false,
                    appId: responseData.appid,
                    timestamp: responseData.timestamp,
                    nonceStr: responseData.nonceStr,
                    signature: responseData.signature,
                    jsApiList: [
                        'checkJsApi', 'previewImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'hideAllNonBaseMenuItem', 'openLocation', 'getLocation', 'scanQRCode'
                    ]
                });
                wx.ready(function () {
                    wx.onMenuShareTimeline({
                        title: title,
                        desc: desc,
                        link: link,
                        imgUrl: imgUrl,
                        success: function () {
                            if (share_success != undefined) {
                                share_success();
                            }
                        },
                        cancel: function () {
                            if (share_cancel != undefined) {
                                share_cancel();
                            }
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: title,
                        desc: desc,
                        link: link,
                        imgUrl: imgUrl,
                        type: 'link',
                        dataUrl: '',
                        success: function () {
                            if (share_success != undefined) {
                                share_success();
                            }
                        },
                        cancel: function () {
                            if (share_cancel != undefined) {
                                share_cancel();
                            }
                        }
                    });

                    wx.onMenuShareQQ({
                        title: title,
                        desc: desc,
                        link: link,
                        imgUrl: imgUrl,
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            if (share_success != undefined) {
                                share_success();
                            }
                        },
                        cancel: function () {
                            if (share_cancel != undefined) {
                                share_cancel();
                            }
                        }
                    });
                });
                wx.error(function (res) {
                    console.log(res.errMsg);
                });
            }
        }
    });
}