var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SendValidator = (function () {
    function SendValidator() {
    }
    SendValidator.needQuestInfo = function () {
        if (UtilsGame.Now() - SendValidator.last_quest_info > SendValidator.duration_info) {
            SendValidator.last_quest_info = UtilsGame.Now();
            return true;
        }
        return false;
    };
    SendValidator.canQuestRefresh = function (no_scr_cb, thisObj) {
        if (!Singleton.Get(ScrollManager).checkScrollNum(SendUtil.SCROLL_QUEST_REFRESH, 1, no_scr_cb, thisObj)) {
            return false;
        }
        return true;
    };
    SendValidator.canQuestExec = function (quest_id, roles, type) {
        var quest = Singleton.Get(SendManager).getInfo().getQuest(quest_id);
        if (!quest) {
            return false;
        }
        var cfg_send = Template.send.get(quest.send_id);
        if (!cfg_send) {
            console.error("no send: " + quest.send_id);
            return false;
        }
        if (quest.getStatus() != E_SEND_STATUS.PREPARE) {
            console.warn("INFO 任务不在可开始状态");
            return false;
        }
        if (!(Singleton.Get(ScrollManager).getScrollActual(Template.config.Send)[0] >= 1)) {
            Singleton.Get(DialogControler).showInfo(1225);
            return false;
        }
        if (type == E_SEND_RUN_TYPE.EXTREME) {
            var my_dmd = Singleton.Get(PlayerInfoManager).getDiamond();
            if (my_dmd < cfg_send.VipSend) {
                Singleton.Get(DialogControler).showInfo(1004);
                return false;
            }
        }
        if (!roles || SendUtil.getValidRoles(roles).length < cfg_send.RoleNum) {
            Singleton.Get(DialogControler).showInfo(1226, this, null, null, cfg_send.RoleNum);
            return false;
        }
        return true;
    };
    SendValidator.canQuestOpinion = function (quest_id, roles) {
        var quest = Singleton.Get(SendManager).getInfo().getQuest(quest_id);
        if (!quest) {
            return false;
        }
        var cfg_send = Template.send.get(quest.send_id);
        if (!cfg_send) {
            console.error("no send: " + quest.send_id);
            return false;
        }
        if (!UtilsArray.elementEqual(SendUtil.getValidRoles(roles), SendUtil.getValidRoles(quest.roles))) {
            console.warn("INFO 不合法 布阵后的斗士和之前不一样");
            return false;
        }
        return true;
    };
    SendValidator.canQuestReward = function (quest_id) {
        var quest = Singleton.Get(SendManager).getInfo().getQuest(quest_id);
        if (!quest) {
            return false;
        }
        if (quest.getStatus() != E_SEND_STATUS.END) {
            // INFO 时间未到 不能领奖
            return false;
        }
        return true;
    };
    SendValidator.needRobTeams = function () {
        if (UtilsGame.Now() - SendValidator.last_rob_teams > SendValidator.duration) {
            SendValidator.last_rob_teams = UtilsGame.Now();
            return true;
        }
        return false;
    };
    SendValidator.canRobRefresh = function (no_scr_cb, thisObj) {
        if (!Singleton.Get(ScrollManager).checkScrollNum(SendUtil.SCROLL_ROB_REFRESH, 1, no_scr_cb, thisObj)) {
            return false;
        }
        return true;
    };
    SendValidator.needRobRevengers = function () {
        if (UtilsGame.Now() - SendValidator.last_rob_revengers > SendValidator.duration) {
            SendValidator.last_rob_revengers = UtilsGame.Now();
            return true;
        }
        return false;
    };
    SendValidator.needLogList = function () {
        if (UtilsGame.Now() - SendValidator.last_log_list > SendValidator.duration) {
            SendValidator.last_log_list = UtilsGame.Now();
            return true;
        }
        return false;
    };
    return SendValidator;
}());
SendValidator.duration_info = 60000;
SendValidator.duration = 15000;
SendValidator.last_quest_info = 0;
SendValidator.last_rob_teams = 0;
SendValidator.last_rob_revengers = 0;
SendValidator.last_log_list = 0;
__reflect(SendValidator.prototype, "SendValidator");
//# sourceMappingURL=SendValidator.js.map