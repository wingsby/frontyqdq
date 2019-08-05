var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 白鹭登陆
 */
var NestSdk = (function () {
    function NestSdk() {
    }
    /**
     * 登陆
     * @author Only
     * @version
     */
    NestSdk.prototype.login = function () {
        var info = {};
        info.egretAppId = 91498;
        info.version = 2;
        info.debug = true;
        nest.easyuser.startup(info, function (data) {
            console.log(JSON.stringify(data));
            if (data.result == 0) {
                nest.easyuser.login({}, function (resultInfo) {
                    if (resultInfo.result == 0) {
                        var loginm = Singleton.Get(login.LoginDataManager);
                        Singleton.Get(PlatformSDK).resenduser(DEFINE.LOGIN_SERVER + "/" + loginm.loginData.pid + "/" + loginm.loginData.gid + "/ptoken?token=" + resultInfo.token + "&mkey=" + loginm.mkey, this, function (data) {
                            Singleton.Get(NestSdk).initShare();
                        });
                    }
                    else if (resultInfo.result == -3) {
                    }
                    else {
                    }
                });
            }
            else {
            }
        });
    };
    /**
     * 初始化分享
     * @author Only
     * @version
     */
    NestSdk.prototype.initShare = function () {
        nest.share.isSupport({}, function (data) {
            //获取是否支持nest.share.share接口，有该字段并且该字段值为1表示支持
            if (data.share == 1) {
                var info = {};
                info.title = PlatformSDK.TITLE;
                info.description = PlatformSDK.WORDS;
                info.url = Singleton.Get(login.LoginDataManager).loginData.gameUrl_login;
                info.image_url = PlatformSDK.PIC_URL;
                info.image_title = PlatformSDK.TITLE;
                nest.share.setDefaultData(info, function (data) {
                    if (data.result == 0) {
                    }
                    else if (data.result == -3) {
                    }
                    else {
                    }
                });
            }
        });
    };
    /**
     * 退出登陆
     * @author Only
     * @version
     */
    NestSdk.prototype.logout = function () {
        nest.easyuser.logout({}, function (resultInfo) {
            if (resultInfo.result == 0) {
                //登出成功，再次登录请使用直接按之前的登录方式登录 nest.easyuser.login
                Singleton.Get(NestSdk).login();
            }
            else if (resultInfo.result == -3) {
            }
            else {
            }
        });
    };
    /**
     * 充值
     *
     * @param {*} order mydesciption
     * @param {Function} success 充值成功回调
     *
     * @author Only
     * @version
     */
    NestSdk.prototype.pay = function (order, success) {
        nest.iap.pay(order, function (data) {
            if (data.result == 0) {
                //支付成功
                if (success)
                    success();
            }
            else if (data.result == -1) {
            }
            else if (data.result == -3) {
            }
            else {
            }
        });
    };
    return NestSdk;
}());
__reflect(NestSdk.prototype, "NestSdk");
//# sourceMappingURL=NestSdk.js.map