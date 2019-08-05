var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PrivManager = (function () {
    /**
     * @constructor
     */
    function PrivManager() {
        // endregion
        // region 支付禁止
        this.last_pay_click = 0;
        // endregion
        // region 登录弹窗
        /**
         * 未首充用户 当天首次登录弹出首充界面
         */
        this.is_login_alert_closed = false;
        this.m_info = new PlayerMonthcardInfo();
    }
    /**
     * 响应登录完成
     */
    PrivManager.prototype.onGameLoaded = function () {
        var _this = this;
        this.reqMail(function (success) {
            if (success) {
                _this.reqInfo(_this.refreshActive, _this);
            }
            else {
                _this.refreshActive();
            }
        }, this);
        Singleton.Get(Schedule).register(this, UtilsGame.getRandomInt(0, 1000 * 30 * 1));
    };
    /**
     * 刷新UI状态
     */
    PrivManager.prototype.refreshActive = function () {
        Singleton.Get(LayerManager).getView(ui.MainView).menu1.setMonthActive(!this.m_info.has_month_card);
        Singleton.Get(LayerManager).getView(ui.MainView).menu1.setLifetimeActive(!this.m_info.has_lifetime_card);
        // Singleton.Get(LayerManager).getView(ui.MainView).setFPayActive(this.m_info.first_award_status != FirstPayStatus.AREALY_GET_AWARD);
        // Singleton.Get(LayerManager).getView(ui.MainView).setFPayAlive(this.m_info.first_award_status != FirstPayStatus.AREALY_GET_AWARD);
        Singleton.Get(LayerManager).getView(ui.BattleView).setFPayActive(this.m_info.first_award_status != FirstPayStatus.AREALY_GET_AWARD);
        Singleton.Get(LayerManager).getView(ui.BattleView).setFPayAlive(this.m_info.first_award_status != FirstPayStatus.AREALY_GET_AWARD);
        Singleton.Get(LayerManager).getView(ui.MainView).menu1.setPayActive(true);
        // Singleton.Get(LayerManager).getView(ui.MainView).setActActive(true);
        var pve = Singleton.Get(PveManager);
        Singleton.Get(LayerManager).getView(ui.MainView).setLevel(pve.getPveInfo().cur_level, pve.getPveInfo().exp_per_hour, pve.getPveInfo().gold_per_hour);
    };
    /**
     * 获取特权信息
     */
    PrivManager.prototype.getInfo = function () {
        return this.m_info;
    };
    /**
     * 更新状态
     * @param info
     */
    PrivManager.prototype.onSync = function (info) {
        this.m_info.mc_ids = info.mc_ids;
        this.m_info.mc_end = info.mc_end;
        this.m_info.last_mail_t = info.last_mail_t;
        this.m_info.first_award_status = info.first_award_status;
        this.m_info.finish_1st = info.finish_1st;
        this.m_info.spay_ids = info.spay_ids; // 已经激活的累计首充id列表
        this.m_info.spay_t = info.spay_t; // 累计首充激活时间
        this.m_info.spay_r = info.spay_r; // 已经领取的累计首充奖励
    };
    /**
     * 响应支付完成
     */
    PrivManager.prototype.onPay = function (res) {
        // 开启支付检查
        Singleton.Get(PrivPayCaller).onStartPayCheck();
    };
    // region 每日更新
    PrivManager.prototype.onSchedule = function () {
        this.reqMail();
    };
    // endregion
    // region 网络请求
    /**
     * 请求特权基本信息
     * @param callback
     * @param thisObj
     * @param args
     */
    PrivManager.prototype.reqInfo = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.PRIV_INFO, send_msg, this, function (rec_msg) {
            var rec_priv = rec_msg.body.priv;
            if (rec_priv == undefined)
                return;
            if (rec_priv.success) {
                // 更新特权信息
                // console.log(rec_priv);
                _this.onSync(rec_priv.card);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        });
    };
    /**
     * 请求支付回调
     * @param callback
     * @param thisObj
     * @param args
     */
    PrivManager.prototype.reqPayback = function (callback, thisObj) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 请求前的VIP等级
        var vip_lv_before = Singleton.Get(PlayerInfoManager).getVipLevel();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.PRIV_PAYBACK, send_msg, this, function (rec_msg) {
            var rec_priv = rec_msg.body.priv;
            if (rec_priv == undefined)
                return;
            if (rec_priv.success) {
                // 设定当前钻石数量
                Singleton.Get(PlayerInfoManager).setDiamond(rec_msg.body.priv.p_diamond);
                // 停止支付回调检查
                Singleton.Get(PrivPayCaller).onStopPayCheck();
                // 若VIP升级打开VIP界面
                var vip_lv_after = Singleton.Get(PlayerInfoManager).getVipLevel();
                if (vip_lv_after > vip_lv_before) {
                    Singleton.Get(LayerManager).getView(ui.VipView).open();
                }
                // 获取特权基本信息并刷新图标状态
                Singleton.Get(PrivManager).reqInfo(function () {
                    Singleton.Get(PrivManager).onGameLoaded();
                    var layer = Singleton.Get(LayerManager);
                    layer.getView(ui.PayView).refresh();
                    layer.getView(ui.PrivSpayView).refresh();
                    // 其他模块的充值回调
                    Singleton.Get(ActivityManager).onPayExec();
                }, Singleton.Get(PrivManager));
                // 限时礼包回调
                Singleton.Get(LvgiftManager).onPayExec();
                // 提示充值成功
                if (!rec_msg.body.priv.off_diamond || rec_msg.body.priv.off_diamond <= 0) {
                    Singleton.Get(DialogControler).showString(Template.getGUIText("append_50"));
                }
                else {
                    Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("append_50"), 0, 0, rec_msg.body.priv.off_diamond, []);
                }
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        });
    };
    /**
     * 请求领取首冲奖励
     * @param callback
     * @param thisObj
     * @param args
     */
    PrivManager.prototype.reqFPayReward = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.PRIV_FPAY, send_msg, this, function (rec_msg) {
            var rec_priv = rec_msg.body.priv;
            if (rec_priv == undefined)
                return;
            // console.log(rec_msg);
            if (rec_priv.success) {
                // 弹出获取物品提示
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("append_51"), 0, rec_priv.r_gold, rec_priv.r_diamond, rec_priv.r_items);
                _this.m_info.first_award_status = FirstPayStatus.AREALY_GET_AWARD;
                Singleton.Get(LayerManager).getView(ui.BattleView).setFPayActive(_this.m_info.first_award_status != FirstPayStatus.AREALY_GET_AWARD);
                Singleton.Get(LayerManager).getView(ui.BattleView).setFPayAlive(_this.m_info.first_award_status != FirstPayStatus.AREALY_GET_AWARD);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    /**
     * 请求邮件
     * @param callback
     * @param thisObj
     * @param args
     */
    PrivManager.prototype.reqMail = function (callback, thisObj) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.PRIV_CARD_MAIL, send_msg, this, function (rec_msg) {
            var rec_priv = rec_msg.body.priv;
            // console.log(rec_msg);
            if (rec_priv == undefined)
                return;
            if (rec_priv.success) {
                Singleton.Get(MailManager).reqCheck(); // 请求一次邮件更新
            }
            if (callback != undefined) {
                callback.call(thisObj, rec_priv.success, args);
            }
        });
    };
    /**
     * 请求购买VIP礼包
     * @param callback
     * @param thisObj
     * @param args
     */
    PrivManager.prototype.reqVipGift = function (vip_lv, callback, thisObj) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.priv = new msg.PrivMsg();
        send_msg.body.priv.vip_id = vip_lv;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.PRIV_VIP_GIFT, send_msg, this, function (rec_msg) {
            var rec_priv = rec_msg.body.priv;
            if (rec_priv == undefined)
                return;
            if (rec_priv.success) {
                Singleton.Get(PlayerInfoManager).setVipGiftWasted(vip_lv);
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("append_52"), 0, rec_priv.r_gold, rec_priv.r_diamond, rec_priv.r_items);
                if (callback) {
                    callback.call(thisObj, rec_priv.success, args);
                }
            }
        }, true);
    };
    /**
     * 请求领取累计首充奖励
     * @param spay_id
     * @param callback
     * @param thisObj
     * @param args
     */
    PrivManager.prototype.reqSpayReward = function (spay_id, callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.priv = new msg.PrivMsg();
        send_msg.body.priv.reward_id = spay_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.PRIV_SPAY_REWARD, send_msg, this, function (rec_msg) {
            var rec_priv = rec_msg.body.priv;
            if (rec_priv == undefined)
                return;
            if (rec_priv.success) {
                _this.getInfo().markSpayAsReceived(spay_id);
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, rec_priv.r_gold, rec_priv.r_diamond, rec_priv.r_items);
                if (callback) {
                    callback.call(thisObj, rec_priv.success, args);
                }
            }
        }, true);
    };
    PrivManager.prototype.getLastPayClick = function () {
        return this.last_pay_click;
    };
    PrivManager.prototype.setLastPayClick = function () {
        this.last_pay_click = UtilsGame.Now();
    };
    PrivManager.prototype.isClickEnable = function () {
        return UtilsGame.Now() - this.last_pay_click > 1000;
    };
    PrivManager.prototype.tryShowLoginAlert = function () {
        var login_msg = Singleton.Get(LoginManager).loginInfo;
        if (!login_msg || !login_msg.login_1st || login_msg.is_new || login_msg.need_create) {
            Singleton.Get(LayerManager).getView(ui.PrivLvgiftView).tryAutoOpen();
            this.is_login_alert_closed = true;
            return;
        }
        if (Template.config.FPaySwitch) {
            if (this.getInfo() && this.getInfo().first_award_status != FirstPayStatus.AREALY_GET_AWARD) {
                Singleton.Get(ui.PrivFirstPayView).open();
            }
            else {
                this.is_login_alert_closed = true;
            }
        }
        else {
            if (this.getInfo() && this.getInfo().isSpayActive()) {
                Singleton.Get(ui.PrivSpayView).open();
            }
            else {
                this.is_login_alert_closed = true;
            }
        }
    };
    return PrivManager;
}());
__reflect(PrivManager.prototype, "PrivManager", ["ISchedule"]);
//# sourceMappingURL=PrivManager.js.map