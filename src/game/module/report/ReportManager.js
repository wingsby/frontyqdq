var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ReportManager = (function () {
    function ReportManager() {
        this.timeline = new Dictionary();
    }
    ReportManager.prototype.onGameLoaded = function () {
        // this.reqReportBaseInfo();
        // this.reqReportLoading();
    };
    /**
     * 基本信息上报
     */
    ReportManager.prototype.reqReportBaseInfo = function () {
        try {
            var navi = navigator;
            var obj = {
                appCodeName: navi.appCodeName,
                appName: navi.appName,
                platform: navi.platform,
                userAgent: navi.userAgent,
                language: navi.language,
                maxTouchPoints: navi.maxTouchPoints,
            };
            this.reqReportObj("PLATFORM", obj);
        }
        catch (e) {
            console.log(e);
        }
    };
    /**
     * Loading信息上报
     */
    ReportManager.prototype.reqReportLoading = function () {
        var bsl = Singleton.Get(battle.BattleResLoader);
        var obj = {
            all: bsl.rep_all_end - bsl.rep_all_st,
            ui: bsl.rep_ui_ed - bsl.rep_ui_st,
            actor: bsl.rep_actor_ed - bsl.rep_actor_st,
            battle: bsl.rep_battle_ed - bsl.rep_battle_st,
            enter_main: this.timeline.get("ENTER_MAIN") - bsl.rep_all_end
        };
        this.reqReportObj("LOADING", obj);
    };
    ReportManager.prototype.reqReportObj = function (name, obj, callback, thisObj) {
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            args[_i - 4] = arguments[_i];
        }
        if (!obj) {
            return;
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.systemMsg = new msg.SysMsg();
        send_msg.body.systemMsg.colno = 0;
        send_msg.body.systemMsg.lineno = 0;
        send_msg.body.systemMsg.filename = "[REPORT][" + (name ? name : "OBJ") + "]";
        send_msg.body.systemMsg.message = this.convObjToString(obj);
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.SYS_WINDOW_ERROR, send_msg, this, function () {
            if (callback != undefined) {
                callback.call(thisObj, args);
            }
        }, false);
    };
    ReportManager.prototype.convObjToString = function (obj) {
        var result = "";
        for (var prop in obj) {
            if (prop == "__proto__") {
                continue;
            }
            result += prop + ':"' + obj[prop] + '",';
        }
        return "{" + result + "}";
    };
    ReportManager.prototype.engrave = function (mark, time) {
        this.timeline.update(mark, time);
    };
    return ReportManager;
}());
__reflect(ReportManager.prototype, "ReportManager");
//# sourceMappingURL=ReportManager.js.map