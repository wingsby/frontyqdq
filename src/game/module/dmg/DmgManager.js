var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DmgManager = (function () {
    function DmgManager() {
        this.m_dmg_info = new PlayerDmgInfo();
    }
    DmgManager.prototype.onGameLoaded = function () {
        this.reqInfo();
    };
    DmgManager.prototype.getDmgInfo = function () {
        return this.m_dmg_info;
    };
    DmgManager.prototype.reqInfo = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.DMG_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.dmg;
            if (!rec) {
                return;
            }
            if (rec.success) {
                _this.getDmgInfo().setInfo(rec.max, rec.award);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, false);
    };
    DmgManager.prototype.reqReward = function (id, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.dmg = new msg.DmgMsg();
        send_msg.body.dmg.reward_id = id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.DMG_REWARD, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.dmg;
            if (!rec) {
                return;
            }
            if (rec.success) {
                _this.getDmgInfo().setRewardReceived(id);
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, rec.r_gold, rec.r_diamond, rec.r_items);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_GET_DMG_AWARD_ID);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    return DmgManager;
}());
__reflect(DmgManager.prototype, "DmgManager");
//# sourceMappingURL=DmgManager.js.map