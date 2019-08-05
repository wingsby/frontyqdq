/**
 * 角色推荐阵容
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleLineupRecManager = (function () {
    function RoleLineupRecManager() {
        this.info = new PlayerRoleLineupRecInfo();
    }
    RoleLineupRecManager.prototype.onGameLoaded = function () {
        this.reqInfo();
    };
    RoleLineupRecManager.prototype.getRecInfo = function () {
        return this.info;
    };
    RoleLineupRecManager.prototype.reqInfo = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ROLE_LINEUP_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.role_result;
            if (!rec) {
                return;
            }
            if (rec.is_success) {
                _this.getRecInfo().setAward(rec.award);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, false);
    };
    RoleLineupRecManager.prototype.reqReward = function (id, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_result = new msg.RoleResultMsg();
        send_msg.body.role_result.reward_id = id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ROLE_LINEUP_REWARD, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.role_result;
            if (!rec) {
                return;
            }
            if (rec.is_success) {
                _this.getRecInfo().setAwardReceived(id);
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, rec.r_gold, rec.r_diamond, rec.r_items);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_GET_LINEUP_AWARD_ID);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    return RoleLineupRecManager;
}());
__reflect(RoleLineupRecManager.prototype, "RoleLineupRecManager");
//# sourceMappingURL=RoleLineupRecManager.js.map