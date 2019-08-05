var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WxSDK = (function () {
    /**是否在微信内部 */
    function WxSDK() {
    }
    /**
     * 初始化分享
     *
     * @static
     *
     * @author
     * @version
     */
    WxSDK.prototype.initSDK = function () {
        /**
         * 检测接口
         */
        this.checkJsApi(function (boo) {
            if (boo) {
                egret.log("Fetch WeChat signature.");
                var ln = Singleton.Get(login.LoginDataManager);
                if (ln.loginData != undefined) {
                    var logindata = Singleton.Get(login.LoginDataManager).loginData;
                    HttpClient.requestUrl(DEFINE.LOGIN_SERVER + "/wx/conf?url=" + encodeURI(location.href) + "&pid=" + logindata.pid, this, function (data) {
                        console.log(data);
                        this.wxConfig(JSON.parse(data)); //初始化微信
                    });
                }
                //检测网络类型
                wx.getNetworkType({
                    success: function (res) {
                        // 返回网络类型2g，3g，4g，wifi
                        egret.log("Network type: " + res.networkType);
                    }
                });
            }
            else {
                egret.log("Not WeChat");
            }
        }, this);
    };
    WxSDK.prototype.wxConfig = function (signPackage) {
        this.initShareUrl(signPackage.url);
        var bodyConfig = new BodyConfig();
        bodyConfig.debug = false; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        bodyConfig.appId = signPackage.appid; // 必填，公众号的唯一标识
        bodyConfig.timestamp = signPackage.timestamp; // 必填，生成签名的时间戳
        bodyConfig.nonceStr = signPackage.nonceStr; // 必填，生成签名的随机串
        bodyConfig.signature = signPackage.signature; // 必填，签名，见附录1
        bodyConfig.jsApiList = [
            // 所有要调用的 API 都要加到这个列表中
            'checkJsApi',
            'hideOptionMenu',
            'showOptionMenu',
            'hideMenuItems',
            'showMenuItems',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'chooseWXPay' //调用充值
        ];
        wx.config(bodyConfig);
        wx.ready(function () {
            var sdk = Singleton.Get(WxSDK);
            //sdk.hideMenuItems();//隐藏按钮
            sdk.getWeiXinShareTimeline(); //微信分享朋友圈
            sdk.getWeiXinShareAppMessage(); //微信分享朋友圈
            sdk.getWeiXinShareQQ(); //微信分享到QQ
            sdk.getWeiXinShareWeiBo(); //微信分享到腾讯微博
            sdk.getWeiXinShareQZone(); //微信分享QQ空间
        });
        wx.error(function (res) {
            egret.log("Exception occurred with initialization." + JSON.stringify(res));
        });
    };
    /**
     * 初始化微信分享
     *
     * @private
     * @param {string} url mydesciption
     *
     * @author Only
     * @version
     */
    WxSDK.prototype.initShareUrl = function (url) {
        var logindata = Singleton.Get(login.LoginDataManager).loginData;
        this.shareUrl = logindata.gameUrl_login.replace("state=", "state=" + "1_" + logindata.guid);
        ;
        console.log("WeChat share url: " + this.shareUrl);
    };
    /**
     * 检测微信接口
     *
     * @private
     *
     * @author
     * @version
     */
    WxSDK.prototype.checkJsApi = function (call, thisobj) {
        var checkapi = new BodyCheckJsAPISupport();
        checkapi.jsApiList = ['onMenuShareTimeline',
            'checkJsApi',
            'hideOptionMenu',
            'showOptionMenu',
            'hideMenuItems',
            'showMenuItems',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'chooseWXPay' //调用充值
        ];
        checkapi.success = function (res) {
            if (res.errMsg == "checkJsApi:ok") {
                call.call(thisobj, true);
            }
            else {
                call.call(thisobj, false);
            }
        };
        wx.checkJsApi(checkapi);
    };
    /**
    * 隐藏分享
    */
    WxSDK.prototype.hideMenuItems = function () {
        var hidemenu = new BodyMenuItems();
        hidemenu.menuList = [];
        hidemenu.menuList.push('menuItem:share:timeline'); //分享朋友圈
        hidemenu.success = function (res) {
            egret.log(JSON.stringify(res));
        };
        hidemenu.fail = function (res) {
            egret.log(JSON.stringify(res));
        };
        wx.hideMenuItems(hidemenu);
    };
    /**
     * 分享到朋友圈
     */
    WxSDK.prototype.getWeiXinShareTimeline = function () {
        var _this = this;
        var bodyMenuShareTimeline = new BodyMenuShareTimeline();
        bodyMenuShareTimeline.title = PlatformSDK.WORDS;
        bodyMenuShareTimeline.link = this.shareUrl;
        bodyMenuShareTimeline.imgUrl = PlatformSDK.PIC_URL;
        bodyMenuShareTimeline.trigger = function () {
            egret.log('用户点击分享到朋友圈');
        };
        bodyMenuShareTimeline.success = function () {
            egret.log('已分享');
            _this.execShareSuccess();
        };
        bodyMenuShareTimeline.cancel = function () {
            egret.log('已取消');
        };
        bodyMenuShareTimeline.fail = function (res) {
            egret.log(JSON.stringify(res));
        };
        wx.onMenuShareTimeline(bodyMenuShareTimeline);
    };
    /**
    * 获取微信分享到朋友
    */
    WxSDK.prototype.getWeiXinShareAppMessage = function () {
        var _this = this;
        var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyMenuShareAppMessage.title = PlatformSDK.TITLE;
        bodyMenuShareAppMessage.desc = PlatformSDK.WORDS;
        bodyMenuShareAppMessage.link = this.shareUrl;
        bodyMenuShareAppMessage.imgUrl = PlatformSDK.PIC_URL;
        bodyMenuShareAppMessage.trigger = function () {
            egret.log('用户点击发送给朋友');
        };
        bodyMenuShareAppMessage.success = function () {
            egret.log('已分享');
            _this.execShareSuccess();
        };
        bodyMenuShareAppMessage.cancel = function () {
            egret.log('已取消');
        };
        bodyMenuShareAppMessage.fail = function (res) {
            egret.log(JSON.stringify(res));
        };
        wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
    };
    /**
    * 获取微信分享到QQ
    */
    WxSDK.prototype.getWeiXinShareQQ = function () {
        var _this = this;
        var bodyMenuShareQQ = new BodyMenuShareQQ();
        bodyMenuShareQQ.title = PlatformSDK.TITLE;
        bodyMenuShareQQ.desc = PlatformSDK.WORDS;
        bodyMenuShareQQ.link = this.shareUrl;
        bodyMenuShareQQ.imgUrl = PlatformSDK.PIC_URL;
        bodyMenuShareQQ.trigger = function () {
            egret.log('用户点击分享到QQ');
        };
        bodyMenuShareQQ.complete = function (res) {
            egret.log(JSON.stringify(res));
        };
        bodyMenuShareQQ.success = function () {
            egret.log('已分享');
            _this.execShareSuccess();
        };
        bodyMenuShareQQ.cancel = function () {
            egret.log('已取消');
        };
        bodyMenuShareQQ.fail = function (res) {
            egret.log(JSON.stringify(res));
        };
        wx.onMenuShareQQ(bodyMenuShareQQ);
    };
    /**
     * 获取微信分享到腾讯微博
     */
    WxSDK.prototype.getWeiXinShareWeiBo = function () {
        var _this = this;
        var bodyMenuShareWeibo = new BodyMenuShareWeibo();
        bodyMenuShareWeibo.title = PlatformSDK.TITLE;
        bodyMenuShareWeibo.desc = PlatformSDK.WORDS;
        bodyMenuShareWeibo.link = this.shareUrl;
        bodyMenuShareWeibo.imgUrl = PlatformSDK.PIC_URL;
        bodyMenuShareWeibo.trigger = function () {
            egret.log('用户点击分享到微博');
        };
        bodyMenuShareWeibo.complete = function (res) {
            egret.log(JSON.stringify(res));
        };
        bodyMenuShareWeibo.success = function () {
            egret.log('已分享');
            _this.execShareSuccess();
        };
        bodyMenuShareWeibo.cancel = function () {
            egret.log('已取消');
        };
        bodyMenuShareWeibo.fail = function (res) {
            egret.log(JSON.stringify(res));
        };
        wx.onMenuShareWeibo(bodyMenuShareWeibo);
    };
    /**
    * 获取微信分享到QQ空间
    */
    WxSDK.prototype.getWeiXinShareQZone = function () {
        var _this = this;
        var bodyMenuShareQZone = new BodyMenuShareQZone();
        bodyMenuShareQZone.title = PlatformSDK.TITLE;
        bodyMenuShareQZone.desc = PlatformSDK.WORDS;
        bodyMenuShareQZone.link = this.shareUrl;
        bodyMenuShareQZone.imgUrl = PlatformSDK.PIC_URL;
        bodyMenuShareQZone.trigger = function () {
            egret.log('用户点击分享到QQ空间');
        };
        bodyMenuShareQZone.complete = function (res) {
            egret.log(JSON.stringify(res));
        };
        bodyMenuShareQZone.success = function () {
            egret.log('已分享');
            _this.execShareSuccess();
        };
        bodyMenuShareQZone.cancel = function () {
            egret.log('已取消');
        };
        bodyMenuShareQZone.fail = function (res) {
            egret.log(JSON.stringify(res));
        };
        wx.onMenuShareQZone(bodyMenuShareQZone);
    };
    WxSDK.prototype.onShareSuccess = function (callback) {
        this.m_share_success = callback;
    };
    WxSDK.prototype.execShareSuccess = function () {
        if (this.m_share_success) {
            this.m_share_success.call(this);
        }
    };
    return WxSDK;
}());
__reflect(WxSDK.prototype, "WxSDK");
//# sourceMappingURL=WxSDK.js.map