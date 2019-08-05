var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GoldBuyManager = (function () {
    /**
     * @constructor
     */
    function GoldBuyManager() {
    }
    /**
     * 响应游戏载入
     */
    GoldBuyManager.prototype.onGameLoaded = function () {
        Singleton.Get(Schedule).register(this, 0);
    };
    /**
     * 响应日程刷新
     */
    GoldBuyManager.prototype.onSchedule = function () {
        this.reqInfo(function () {
            console.log("[DailyRefresh] GoldBuyInfo Updated at " + new Date(UtilsGame.Now()).toLocaleDateString() + ".");
        });
    };
    // region 网络请求
    /**
     * 请求金币购买基本信息
     * @param callback
     * @param thisObj
     * @param args
     */
    GoldBuyManager.prototype.reqInfo = function (callback, thisObj) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.SHOP_GOLD_BUY_INFO, send_msg, this, function (rec_msg) {
            if (callback != undefined) {
                callback.call(thisObj, args);
            }
        });
    };
    /**
     * 请求购买金币
     * @param callback
     * @param thisObj
     * @param args
     */
    GoldBuyManager.prototype.reqBuyGold = function (callback, thisObj) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.SHOP_GOLD_BUY, send_msg, this, function (rec_msg) {
            var rec_shop = rec_msg.body.shop;
            if (rec_shop == undefined)
                return;
            if (rec_shop.success) {
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("append_63"), 0, rec_shop.r_gold, rec_shop.r_diamond, undefined);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.GOLD_BUY_CNT);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    return GoldBuyManager;
}());
__reflect(GoldBuyManager.prototype, "GoldBuyManager", ["ISchedule"]);
//# sourceMappingURL=GoldBuyManager.js.map