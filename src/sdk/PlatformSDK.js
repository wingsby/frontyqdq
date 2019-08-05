var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlatformSDK = (function () {
    function PlatformSDK() {
        this.last_item_id = 0; // 上次充值的商品id
    }
    Object.defineProperty(PlatformSDK, "PIC_URL", {
        get: function () {
            return "http://cdn.wannaplay.cn/image/shareicon.png" + UtilsGame.getVersionPostfix();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化SDK
     *
     * @param {string} gameId 游戏ID
     *
     * @author Only
     * @version
     */
    PlatformSDK.prototype.init_SDK = function (plat, gameId, extend) {
        this.platform = plat;
        Plugin_XJ.init();
        switch (this.platform) {
            case I_Platform.p_dev:
                break;
            case I_Platform.p_wanbei:
                Singleton.Get(WxSDK).initSDK();
                Singleton.Get(WxSDK).onShareSuccess(this.shareSuccess);
                break;
            case I_Platform.p_wannaplay:
                Singleton.Get(WxSDK).initSDK();
                Singleton.Get(WxSDK).onShareSuccess(this.shareSuccess);
                Plugin_XJ.initback();
                break;
            /**爱微游 */
            case "AWY":
                loadJs(this.platform, "http://cdn.11h5.com/static/js/sdk.min.js", function () {
                    SDK_awy.config(gameId, this.shareSuccess, this.paySuccess);
                });
                break;
            case I_Platform.p_qh:
                loadJs(this.platform, "//m.qunhei.com/game/qhjssdk", function () {
                    var param = JSON.parse(extend);
                    var username = param.username;
                    SDK_qh.init(username, "3441");
                    SDK_qh.share(Singleton.Get(PlatformSDK).shareSuccess);
                });
                break;
            case I_Platform.p_i1758:
                loadJs(this.platform, "http://wx.1758.com/static/common/js/1758sdk.js", function () {
                    SDK_i1758.load(extend);
                });
                break;
            case I_Platform.p_9g:
                loadJs(this.platform, "https://game.9g.com/js/lib.v2.js", function () {
                    var param = JSON.parse(extend);
                    SDK9g.init(param.gameid, param.channel, param.token);
                    SDK9g.ready();
                });
                break;
            case I_Platform.p_hhw:
                break;
            case I_Platform.p_jyw:
                break;
            case I_Platform.p_ayx:
                loadJs(this.platform, "http://h5.play.cn/static/js/charge/egame-2.0.js", function () {
                    SDK_agame.init(PlatformSDK.TITLE, PlatformSDK.PIC_URL);
                    console.log("AYX inited.");
                });
                break;
            case I_Platform.p_nest:
                Singleton.Get(NestSdk).login();
                break;
            case I_Platform.p_4177:
                loadJs(this.platform, "http://passport.4177.com/game/h5sdk", function () {
                    var param = JSON.parse(extend);
                    SDK_4177.init(param.app_id, param.open_id, param.channel);
                    //特殊处理
                    egret.localStorage.setItem(PlatformSDK.yqdq_4177_open, param.open_id);
                });
                break;
            case I_Platform.p_lbw:
                loadJs(this.platform, "http://m.59yx.com/Public/jssdk/js/jssdk.js", function () {
                    SDK_lbw.init();
                    SDK_lbw.onshare = Singleton.Get(PlatformSDK).shareSuccess;
                });
                break;
            case I_Platform.p_wy:
                loadJs(this.platform, "http://www.5you.cc/Public/WYSDK_New.js", function () {
                    SDK_wy.init(function () { });
                    SDK_wy.login(function (user) {
                        var loginm = Singleton.Get(login.LoginDataManager);
                        Singleton.Get(PlatformSDK).resenduser(DEFINE.LOGIN_SERVER + "/" + loginm.loginData.pid + "/" + loginm.loginData.gid + "/ptoken?token=" + user.token + "&uid=" + user.uid + "&mkey=" + loginm.mkey, this, function (data) {
                            //异常
                        });
                    });
                });
                break;
            case I_Platform.p_3500:
                loadJs(this.platform, "http://www.3500.com/statics/js/lib.v1.js", function () {
                    var param = JSON.parse(extend);
                    SDK_3500.init(param.uid, param.token);
                });
                break;
            case I_Platform.p_xq:
                loadJs(this.platform, "https://www.x7sy.com/loadx7sdk/x7js_sdk_v20170510.js", function () {
                    SDK_xq.init();
                    SDK_xq.share(PlatformSDK.PIC_URL, PlatformSDK.TITLE, PlatformSDK.WORDS, Singleton.Get(PlatformSDK).shareSuccess);
                });
                break;
            case I_Platform.p_chw:
                loadJs(this.platform, "http://juhe.newgame.com/m/static/sdk/juhe.js", function () {
                    var p = extend.split("|");
                    SDK_chw.init(p[0], p[1]);
                });
                break;
            case I_Platform.p_yxjb:
                SDK_yxjb.load(null);
                break;
            case I_Platform.p_laya:
                var param = new egret.URLVariables(location.search);
                SDK_laya.init(parseInt(param.variables["openId"]), param.variables["openKey"]);
                loadJs(this.platform, window.location.protocol + "//layamarket.layabox.com/layaboxmarket.v2.js", function () {
                    SDK_laya.login(function (param) {
                        var loginInfo = JSON.parse(param);
                        if (loginInfo.result != 0) {
                        }
                        else {
                            var loginm = Singleton.Get(login.LoginDataManager);
                            Singleton.Get(PlatformSDK).resenduser(DEFINE.LOGIN_SERVER + "/" + loginm.loginData.pid + "/" + loginm.loginData.gid + "/ptoken?extend=" + param + "&mkey=" + loginm.mkey, this, function (data) {
                                var share = {};
                                share.imgsrc = share.icon = PlatformSDK.PIC_URL;
                                share.desc = share.custxt = PlatformSDK.WORDS;
                                share.link = Singleton.Get(login.LoginDataManager).loginData.gameUrl_login;
                                share.title = PlatformSDK.TITLE;
                                SDK_laya.share(JSON.stringify(share), function (shareback) {
                                    if (shareback.result == 0) {
                                        Singleton.Get(PlatformSDK).shareSuccess();
                                    }
                                });
                            });
                        }
                    });
                });
                break;
            case I_Platform.p_360:
                loadJs(this.platform, "http://api.h5.u.360.cn/tool/config/sdk?v=1", function () {
                    SDK_360.init();
                });
                break;
            case I_Platform.p_hdhd:
                loadJs(this.platform, "//d.hgame.com/loadsdk", function () {
                    SDK_hdhd.init(Singleton.Get(login.LoginDataManager).extend, function () {
                        egret.log("Initialization completed.");
                        SDK_hdhd.getPlatform(function (data) {
                            console.log(data);
                        });
                    });
                });
                break;
            case I_Platform.p_wanba:
                SDK_wanba.init(function (data) {
                    var p_sdk = Singleton.Get(PlatformSDK);
                    p_sdk.wanbaData = data;
                    var wData = {};
                    wData.pf = data.pf;
                    wData.appid = data.appid;
                    wData.openid = data.openid;
                    wData.openkey = data.openkey;
                    var loginm = Singleton.Get(login.LoginDataManager);
                    var loginUrl = DEFINE.LOGIN_SERVER + "/" + loginm.loginData.pid + "/" + loginm.loginData.gid + "/ptoken?extend=" + JSON.stringify(wData) + "&mkey=" + loginm.mkey;
                    if (p_sdk.invitID && p_sdk.invitID != "") {
                        loginUrl += "&fuid=" + p_sdk.invitID;
                    }
                    Singleton.Get(PlatformSDK).resenduser(loginUrl, this, function (resData) {
                        if (resData.rt == 0) {
                            SDK_wanba.initShare(PlatformSDK.TITLE, PlatformSDK.WORDS, p_sdk.wanbaData.shareurl, PlatformSDK.PIC_URL, Singleton.Get(PlatformSDK).shareSuccess);
                        }
                        else {
                            SDK_wanba.showDialog(resData.msg, false);
                        }
                        Singleton.Get(WanbaChecker).run();
                    });
                });
                break;
            case I_Platform.p_7724:
                loadJs(this.platform, "http://i.7724.com/sdk/qqessdkclient.js", null);
                break;
            case I_Platform.p_hww:
                loadJs(this.platform, "http://g.hwwh5.com/js/hww_sdk_sub.js", null);
                break;
            case I_Platform.p_yswl:
                loadJs(this.platform, "https://ysscdn.jygame.net/yssdk/ysoutsdk.js", function () {
                    SDK_yswl.init(function (data) {
                        var loginm = Singleton.Get(login.LoginDataManager);
                        var loginUrl = DEFINE.LOGIN_SERVER + "/" + loginm.loginData.pid + "/" + loginm.loginData.gid + "/ptoken?extend=" + data.token + "&mkey=" + loginm.mkey;
                        Singleton.Get(PlatformSDK).resenduser(loginUrl, this, function (resData) {
                            if (resData.rt == 0) {
                                SDK_yswl.share(PlatformSDK.WORDS, function (code) {
                                    if (code == 0) {
                                        Singleton.Get(PlatformSDK).shareSuccess();
                                    }
                                });
                            }
                            else {
                                DialogControler.getinstance().showAlertMsg(resData.msg, this, function () {
                                    Singleton.Get(LoginManager).reload();
                                });
                            }
                        });
                    }, false);
                });
                break;
        }
    };
    /**
     * 回传 登陆 创建用户信息
     *
     * @private
     * @param {string} loginUrl
     * @param {Function} fnback
     * @param {*} thisobj mydesciption
     *
     * @author Only
     * @version
     */
    PlatformSDK.prototype.resenduser = function (loginUrl, thisobj, fnback) {
        HttpClient.requestUrl(loginUrl, this, function (data) {
            var resData = JSON.parse(data);
            if (resData.rt == 0) {
                var loginM = Singleton.Get(login.LoginDataManager);
                if (resData.msg) {
                    if (resData.msg.lastZid)
                        loginM.loginData.lastZid = resData.msg.lastZid;
                    if (resData.msg.logZid)
                        loginM.loginData.logZid = resData.msg.logZid;
                }
                Singleton.Get(ui.LoginNewView).updateSelSerInfo();
                fnback.call(thisobj, resData);
            }
            else {
                DialogControler.getinstance().showAlertMsg(resData.msg, this, function () {
                    Singleton.Get(LoginManager).reload();
                });
            }
        });
    };
    /**分享成功 */
    PlatformSDK.prototype.shareSuccess = function () {
        console.log("\u5206\u4EAB\u6210\u529F\uFF01(" + this.platform + ")");
        switch (this.platform) {
            case I_Platform.p_wanba:
                SDK_wanba.showDialog("分享成功！", false);
                break;
        }
        Singleton.Get(SnsInviteManager).reqOnce();
    };
    /**分享接口 */
    PlatformSDK.prototype.share = function () {
        switch (this.platform) {
            case I_Platform.p_4177:
                SDK_4177.share(Singleton.Get(PlatformSDK).shareSuccess);
                break;
            case I_Platform.p_9g:
                SDK9g.share(PlatformSDK.TITLE, PlatformSDK.WORDS);
                SDK9g.onShareOK(function () {
                    Singleton.Get(PlatformSDK).shareSuccess();
                });
                break;
            case I_Platform.p_7724:
                var extend = Singleton.Get(login.LoginDataManager).extend;
                var param = JSON.parse(extend);
                SDK_7724.share(param.appkey, Singleton.Get(PlatformSDK).shareSuccess);
                break;
            default:
                break;
        }
    };
    /**
     * 收藏成功
     */
    PlatformSDK.prototype.favorite = function () {
        switch (this.platform) {
            case I_Platform.p_4177:
                var extend = Singleton.Get(login.LoginDataManager).extend;
                var param = JSON.parse(extend);
                SDK_4177.favorite(Singleton.Get(PlatformSDK).favorite);
                break;
            default:
                break;
        }
    };
    /**充值成功 */
    PlatformSDK.prototype.paySuccess = function () {
        // todo 向游服同步钻石变化和充值情况，最好延时几秒
        Singleton.Get(PrivManager).onPay(undefined);
    };
    /**
     * 充值
     * @param itemId
     */
    PlatformSDK.prototype.Pay = function (itemId) {
        var loginM = Singleton.Get(login.LoginDataManager);
        if (this.platform == I_Platform.p_baidu) {
            Plugin_Pay.showPay(function (paytype) {
                Singleton.Get(PlatformSDK).excPay(itemId, paytype);
            });
        }
        else {
            var extend = "";
            switch (this.platform) {
                case I_Platform.p_i1758:
                    extend = SDK_i1758.getHLMY_GW(loginM.extend);
                    break;
                case I_Platform.p_jyw:
                case I_Platform.p_xx:
                case I_Platform.p_zywl:
                case I_Platform.p_mwyx:
                case I_Platform.p_hzxh:
                case I_Platform.p_chw:
                case I_Platform.p_yxjb:
                case I_Platform.p_lhh:
                case I_Platform.p_7724:
                case I_Platform.p_xjh5:
                    extend = loginM.extend;
                    break;
                case I_Platform.p_4177:
                    extend = JSON.parse(loginM.extend).access_token;
                    break;
                case I_Platform.p_wanba:
                    var wData = {};
                    wData.pf = this.wanbaData.pf;
                    wData.appid = this.wanbaData.appid;
                    wData.openid = this.wanbaData.openid;
                    wData.openkey = this.wanbaData.openkey;
                    wData.zoneid = this.wanbaData.platform;
                    extend = JSON.stringify(wData);
                    break;
            }
            this.excPay(itemId, extend);
        }
    };
    PlatformSDK.prototype.excPay = function (itemId, extend) {
        var loginM = Singleton.Get(login.LoginDataManager);
        // 记录本次购买的商品id
        Singleton.Get(PlatformSDK).last_item_id = itemId;
        var lm = Singleton.Get(LoginManager);
        HttpClient.requestUrl(loginM.loginData.gameUrl_pay + "?zid=" + loginM.zid + "&pid=" + this.platform + "&guid=" + lm.loginInfo.guid + "&uid=" + lm.loginInfo._id + "&itemId=" + itemId + "&paytype=JSAPI" + "&extend=" + extend, this, function (data) {
            switch (this.platform) {
                case I_Platform.p_wanbei: // 玩贝公众号
                case I_Platform.p_wannaplay:
                    ////////////////充值一///////////////////////////////
                    var pay = new BodyPay();
                    if (!data) {
                        console.error("[PAY] Empty Pay Data.");
                    }
                    else {
                        var serobj = JSON.parse(data);
                        //noinspection ReservedWordAsName
                        pay.package = serobj["prepay_id"];
                        pay.paySign = serobj["sign"];
                        pay.nonceStr = serobj["nonce_str"];
                        pay.signType = serobj["trade_type"];
                        pay.timestamp = pay.timeStamp = serobj["timeStamp"];
                    }
                    pay.success = function (res) {
                        // egret.log("pay success" + JSON.parse(res));
                        Singleton.Get(PlatformSDK).paySuccess();
                    };
                    pay.complete = function (res) {
                        if (res) {
                            egret.log(JSON.parse(res));
                        }
                    };
                    wx.chooseWXPay(pay);
                    ///////////////充值二////////////////////////////////
                    // onBridgeReady(serobj, () => {
                    //     egret.log("pay success");
                    // });
                    break;
                case "AWY":
                    SDK_awy.pay(0, "", "");
                    break;
                case I_Platform.p_qh:
                    var or = JSON.parse(data);
                    SDK_qh.pay(or, function (code, msg) {
                        if (code == 1) {
                            Singleton.Get(PlatformSDK).paySuccess();
                        }
                        else {
                            console.log(msg);
                        }
                    });
                    break;
                case I_Platform.p_i1758:
                    var or1758 = JSON.parse(data);
                    SDK_i1758.pay(or1758, loginM.extend);
                    break;
                case I_Platform.p_9g:
                    var g9 = JSON.parse(data);
                    g9.onPayCallback = function (data) {
                        Singleton.Get(PlatformSDK).paySuccess();
                        if (data.status == 1) {
                            console.log("pay success.");
                        }
                        else {
                            console.log("pay failed.");
                        }
                    };
                    g9.onPayCancel = function () {
                        console.log("pay cancled.");
                    };
                    SDK9g.pay(g9);
                    break;
                case I_Platform.p_hhw:
                    var order_hhw = JSON.parse(data);
                    SDK_hhw.pay(order_hhw, null);
                    break;
                case I_Platform.p_jyw:
                    var order_jyw = JSON.parse(data);
                    SDK_jyw.pay(order_jyw, null);
                    break;
                case I_Platform.p_xx:
                    var order_xx = JSON.parse(data);
                    SDK_xx.pay(order_xx, null);
                    break;
                case I_Platform.p_ayx:
                    var order_agame = JSON.parse(data);
                    SDK_agame.pay(order_agame);
                    break;
                case I_Platform.p_nest:
                    Singleton.Get(NestSdk).pay(JSON.parse(data), this.paySuccess);
                    break;
                case I_Platform.p_iqy:
                    var order_iqy = JSON.parse(data);
                    SDK_iqy.pay(order_iqy.game_id, order_iqy.user_id, order_iqy.server_id, order_iqy.money, order_iqy.extra_param);
                    break;
                case I_Platform.p_4177:
                    var order_4177 = JSON.parse(data);
                    SDK_4177.pay(order_4177, this.paySuccess);
                    break;
                case I_Platform.p_zywl:
                    var order_zywl = JSON.parse(data);
                    SDK_zywl.pay(order_zywl, null);
                    break;
                case I_Platform.p_mwyx:
                    var order_mwyx = JSON.parse(data);
                    SDK_mwyx.pay(order_mwyx, null);
                    break;
                case I_Platform.p_lbw:
                    var order_lbw = JSON.parse(data);
                    SDK_lbw.pay(order_lbw, this.paySuccess);
                    break;
                case I_Platform.p_lhh:
                    SDK_lhh.pay(data);
                    break;
                case I_Platform.p_hzxh:
                    var order_hzxh = JSON.parse(data);
                    SDK_hzxh.pay(order_hzxh, null);
                    break;
                case I_Platform.p_wy:
                    var order_wy = JSON.parse(data);
                    order_wy.callback = this.paySuccess;
                    SDK_wy.pay(order_wy);
                    break;
                case I_Platform.p_3500:
                    var order_3500 = JSON.parse(data);
                    order_3500.onPayCancel = this.paySuccess;
                    order_3500.onPayCancel = function () { console.log("pay canceled."); };
                    SDK_3500.pay(order_3500);
                    break;
                case I_Platform.p_xq:
                    SDK_xq.pay(data, this.paySuccess, loginM.extend);
                    break;
                case I_Platform.p_chw:
                    var d_obj = JSON.parse(data);
                    SDK_chw.pay(d_obj, null);
                    break;
                case I_Platform.p_yxjb:
                    var yxjb_obj = JSON.parse(data);
                    SDK_yxjb.pay(yxjb_obj, function () {
                        Singleton.Get(PlatformSDK).paySuccess();
                    });
                    break;
                case I_Platform.p_laya:
                    SDK_laya.pay(data, this.paySuccess);
                    break;
                case I_Platform.p_360:
                    SDK_360.pay(data, this.paySuccess);
                    break;
                case I_Platform.p_baidu:
                    var baidupay = JSON.parse(data);
                    window.location.href = baidupay.url;
                    break;
                case I_Platform.p_hdhd:
                    SDK_hdhd.pay(JSON.parse(data), "", this.paySuccess);
                    break;
                case I_Platform.p_wanba:
                    var pay_wanba = JSON.parse(data);
                    if (pay_wanba.code == 0) {
                        Singleton.Get(PlatformSDK).paySuccess();
                        SDK_wanba.showDialog(Template.getGUIText("ui_qq1"));
                    }
                    else if (pay_wanba.code == 1004) {
                        var item_pay_1;
                        Template.payItem.forEach(function (item) {
                            if (item.itemId == itemId) {
                                item_pay_1 = item;
                            }
                        });
                        if (item_pay_1 == null) {
                            SDK_wanba.showDialog(Template.getGUIText("ui_qq2"));
                            //SDK_wanba.showDialog("Incorrect PayItem, pay failed.");
                            return;
                        }
                        SDK_wanba.pay(item_pay_1.monetaryAmount * 10, this.wanbaData.appid, function (code) {
                            if (code == 0) {
                                // SDK_wanba.showDialog(Template.getGUIText("ui_qq3"));
                                //SDK_wanba.showDialog("Wanba pay success.");
                                Singleton.Get(PlatformSDK).Pay(Singleton.Get(PlatformSDK).last_item_id);
                            }
                            else if (code == 1) {
                                SDK_wanba.showDialog(Template.getGUIText("ui_qq5"));
                            }
                            else if (code == 2) {
                                SDK_wanba.showDialog(Template.getGUIText("ui_qq4"));
                            }
                        });
                    }
                    else {
                        SDK_wanba.showDialog(pay_wanba.message);
                    }
                    break;
                case I_Platform.p_7724:
                    window.top.location.href = data;
                    break;
                case I_Platform.p_hww:
                    var hww_obj = JSON.parse(data);
                    SDK_hww.pay(hww_obj, null);
                    break;
                case I_Platform.p_xjh5:
                    var xjh5obj = JSON.parse(data);
                    SDK_xjh5.pay(xjh5obj, function (data) {
                        console.log(data);
                    });
                    break;
                case I_Platform.p_yswl:
                    var yswlobj = JSON.parse(data);
                    SDK_yswl.pay(yswlobj);
                    break;
            }
        });
    };
    /**
     * 邀请
     */
    PlatformSDK.prototype.inviteFun = function (callback, thisObj) {
        switch (this.platform) {
            case I_Platform.p_wanba:
                var p_sdk = Singleton.Get(PlatformSDK);
                SDK_wanba.invite(PlatformSDK.TITLE, PlatformSDK.WORDS, p_sdk.wanbaData.shareurl + "&fuid=" + p_sdk.wanbaData.openid, PlatformSDK.PIC_URL, function (res) {
                    if (res.retCode == 0) {
                        //邀请成功
                        Singleton.Get(SnsInviteManager).reqOnce(callback, thisObj);
                    }
                    else {
                    }
                });
                break;
            default:
                Injection.showShare();
                break;
        }
    };
    /**选区日志 */
    PlatformSDK.prototype.selectServer = function (ser) {
        switch (this.platform) {
            case I_Platform.p_9g:
                SDK9g.selectServer(ser.zid, ser.name);
                break;
            case I_Platform.p_4177:
                SDK_4177.selectServer(ser.zid.toString(), ser.name);
                break;
        }
    };
    /**创建角色日志 */
    PlatformSDK.prototype.createRole = function (roleId, nickName, server_id, server_name) {
        switch (this.platform) {
            case I_Platform.p_9g:
                SDK9g.createRole(roleId, nickName, server_id, server_name);
                break;
            case I_Platform.p_4177:
                SDK_4177.createRole(server_id.toString(), server_name, roleId, nickName);
                break;
            case I_Platform.p_yswl:
                SDK_yswl.createrole(server_id, server_name, nickName);
                break;
            case I_Platform.p_chw:
                SDK_chw.report(server_name, "create_role");
                break;
        }
    };
    /**
     * 登陆
     */
    PlatformSDK.prototype.loginRole = function (roleId, nickName, server_id, server_name) {
        switch (this.platform) {
            case I_Platform.p_yswl:
                SDK_yswl.roleLogin(server_id, server_name, nickName);
                break;
            case I_Platform.p_chw:
                SDK_chw.report(server_name, "login");
                break;
        }
    };
    /**
     * 显示关注
     */
    PlatformSDK.prototype.showfocus = function () {
        switch (this.platform) {
            case I_Platform.p_yswl:
                SDK_yswl.focus();
                break;
        }
    };
    return PlatformSDK;
}());
PlatformSDK.TITLE = "一骑当千";
PlatformSDK.WORDS = "慎入，自从玩了这个游戏，营养跟不上了！";
__reflect(PlatformSDK.prototype, "PlatformSDK");
/**
 * 1758分享回调
 *
 *
 * @author Only
 * @version
 */
function onShareTimeline() {
    Singleton.Get(PlatformSDK).shareSuccess();
}
//# sourceMappingURL=PlatformSDK.js.map