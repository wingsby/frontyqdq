var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DramaManager = (function () {
    function DramaManager() {
        this.flow = new DramaFlowController();
        this.dialog = new DramaDialogController();
    }
    DramaManager.prototype.getFlow = function () {
        return this.flow;
    };
    DramaManager.prototype.getDialog = function () {
        return this.dialog;
    };
    DramaManager.prototype.actDramaBattle = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.DRAMA_BATTLE, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.drama;
            if (!rec) {
                return;
            }
            if (rec.success) {
                var bat_warp = new msg.BattleResultMsg();
                bat_warp.pack = rec.script;
                Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.DRAMA, battle.E_BATTLE_FLOW.PLAYING);
                Singleton.Get(battle.RoundManager).Enter(bat_warp, function () {
                }, _this, [], function () {
                    Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.DRAMA, battle.E_BATTLE_FLOW.FINISH);
                    if (callback) {
                        callback.call(thisObj);
                    }
                }, _this);
            }
        }, false);
    };
    DramaManager.prototype.reqBattle = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.DRAMA_BATTLE, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.drama;
            if (!rec) {
                return;
            }
            if (rec.success) {
                var bat_warp = new msg.BattleResultMsg();
                bat_warp.pack = rec.script;
                Singleton.Get(battle.RoundManager).Enter(bat_warp, function () {
                }, _this, [], function () {
                    if (callback) {
                        callback.call(thisObj);
                    }
                }, _this);
            }
        }, false);
    };
    DramaManager.prototype.reqFinDialog = function (callback, thisObj) {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.DRAMA_FIN_DIALOG, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.drama;
            if (!rec) {
                return;
            }
            if (rec.success) {
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    DramaManager.prototype.reqFinBattle = function (callback, thisObj) {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.DRAMA_FIN_BATTLE, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.drama;
            if (!rec) {
                return;
            }
            if (rec.success) {
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    return DramaManager;
}());
__reflect(DramaManager.prototype, "DramaManager");
//# sourceMappingURL=DramaManager.js.map