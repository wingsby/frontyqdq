var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DailyTaskDialogType;
(function (DailyTaskDialogType) {
    DailyTaskDialogType[DailyTaskDialogType["Click"] = 1] = "Click";
    DailyTaskDialogType[DailyTaskDialogType["Upgrade"] = 2] = "Upgrade";
    DailyTaskDialogType[DailyTaskDialogType["Complete"] = 3] = "Complete"; // 今日历练完成次数
})(DailyTaskDialogType || (DailyTaskDialogType = {}));
var DailyTaskNpcInfo = (function () {
    /**
     * @constructor
     */
    function DailyTaskNpcInfo() {
        this.m_click_entity = null;
        this.m_upgrade_entity = null;
        this.m_completed_entity_ids = [];
        this.initData();
    }
    /**
     * 初始化NPC对话数据
     */
    DailyTaskNpcInfo.prototype.initData = function () {
        var npc_info = UtilsGame.cloneObject(Template.taskNpc.values);
        for (var i = 0; i < npc_info.length; i++) {
            switch (npc_info[i].TalkType[0]) {
                case DailyTaskDialogType.Click:
                    this.m_click_entity = npc_info[i];
                    break;
                case DailyTaskDialogType.Upgrade:
                    this.m_upgrade_entity = npc_info[i];
                    break;
                case DailyTaskDialogType.Complete:
                    this.m_completed_entity_ids.push(npc_info[i]);
                    break;
            }
        }
        this.m_completed_entity_ids.sort(function (a, b) {
            if (a.TalkType[1] > b.TalkType[1]) {
                return 1;
            }
            else if (a.TalkType[1] < b.TalkType[1]) {
                return -1;
            }
            else {
                return 0;
            }
        });
    };
    DailyTaskNpcInfo.prototype.getTalk = function (type, param) {
        if (param === void 0) { param = 0; }
        switch (type) {
            case DailyTaskDialogType.Click:
                return this.getClickTalk();
            case DailyTaskDialogType.Upgrade:
                return this.getUpgradeTalk();
            case DailyTaskDialogType.Complete:
                return this.getCompleteTalk(param);
        }
        return null;
    };
    DailyTaskNpcInfo.prototype.getClickTalk = function () {
        return this.m_click_entity.Talk[UtilsGame.getRandomInt(0, this.m_click_entity.Talk.length - 1)];
    };
    DailyTaskNpcInfo.prototype.getUpgradeTalk = function () {
        return this.m_upgrade_entity.Talk[UtilsGame.getRandomInt(0, this.m_upgrade_entity.Talk.length - 1)];
    };
    DailyTaskNpcInfo.prototype.getCompleteTalk = function (cur_lv) {
        var result_idx = 0;
        for (var i = 0; i < this.m_completed_entity_ids.length; i++) {
            if (this.m_completed_entity_ids[i].TalkType[1] <= cur_lv) {
                result_idx = i;
            }
            else {
                break;
            }
        }
        var entity = this.m_completed_entity_ids[result_idx];
        return entity.Talk[UtilsGame.getRandomInt(0, entity.Talk.length - 1)];
    };
    return DailyTaskNpcInfo;
}());
__reflect(DailyTaskNpcInfo.prototype, "DailyTaskNpcInfo");
//# sourceMappingURL=DailyTaskNpcInfo.js.map