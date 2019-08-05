var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LvgiftManager = (function () {
    function LvgiftManager() {
        this.m_info = new PlayerLvgiftInfo();
    }
    LvgiftManager.prototype.getInfo = function () {
        return this.m_info;
    };
    // region 响应其他模块
    /**
     * 响应游戏加载完成
     */
    LvgiftManager.prototype.onGameLoaded = function () {
        this.reqInfoWithRefresh(function () {
            if (Singleton.Get(PrivManager).is_login_alert_closed) {
                Singleton.Get(LayerManager).getView(ui.PrivLvgiftView).tryAutoOpen();
            }
        }, this);
    };
    /**
     * 响应支付回调
     */
    LvgiftManager.prototype.onPayExec = function () {
        var _this = this;
        var last_pay_item = Singleton.Get(PlatformSDK).last_item_id;
        var gift = Template.lvgift.get(last_pay_item);
        if (gift) {
            this.getInfo().setOnsaleGiftHoding();
            var layer_1 = Singleton.Get(LayerManager);
            layer_1.getView(ui.SyncLoadingView).open();
            Singleton.Get(UpdateTimer).addAndStart(1200, function () {
                layer_1.getView(ui.SyncLoadingView).cancleOpen();
                _this.reqInfoWithRefresh();
            }, this);
        }
    };
    /**
     * 响应升级
     */
    LvgiftManager.prototype.onLevelup = function () {
        // 如果存在已激活的
        var cur_gift_id = this.getInfo().getActiveGift();
        if (cur_gift_id > 0) {
            return;
        }
        // 检查当前等级是否会解锁新的限时礼包
        var team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
        var next_gift_id = this.getInfo().getLevelGift(team_lv);
        if (next_gift_id > 0) {
            this.reqInfoWithRefresh();
        }
    };
    // endregion
    // region 网络请求
    LvgiftManager.prototype.reqInfoWithRefresh = function (callback, thisObj) {
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.SyncLoadingView).open();
        this.reqInfo(function () {
            layer.getView(ui.SyncLoadingView).cancleOpen();
            layer.getView(ui.PrivLvgiftView).refresh();
            if (callback) {
                callback.call(thisObj);
            }
        }, this);
    };
    LvgiftManager.prototype.reqInfo = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.PRIV_LVGIFT_INFO, send_msg, this, function (rec_msg) {
            var rec_priv = rec_msg.body.priv;
            if (rec_priv == undefined)
                return;
            if (rec_priv.success) {
                // 更新信息
                _this.m_info.onSync(rec_priv);
                if (callback != undefined) {
                    callback.call(thisObj);
                }
            }
        }, false);
    };
    LvgiftManager.prototype.reqReward = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.PRIV_LVGIFT_REWARD, send_msg, this, function (rec_msg) {
            var rec_priv = rec_msg.body.priv;
            if (rec_priv == undefined)
                return;
            if (rec_priv.success) {
                _this.reqInfoWithRefresh();
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, rec_priv.r_gold, rec_priv.r_diamond, rec_priv.r_items);
                if (callback != undefined) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    return LvgiftManager;
}());
__reflect(LvgiftManager.prototype, "LvgiftManager");
//# sourceMappingURL=LvgiftManager.js.map