var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerSendInfo = (function () {
    function PlayerSendInfo() {
        this.quests = [];
        for (var i = 0; i < Template.config.SendIdNum; i++) {
            this.quests.push(new SendQuestInfo());
        }
        this.rob_teams = [];
        this.rev_teams = [];
        this.rob_logs = [];
    }
    // region 队伍
    /**
     * 获取某个任务信息
     * @param quest_id
     */
    PlayerSendInfo.prototype.getQuest = function (quest_id) {
        if (quest_id < 0 || quest_id >= this.quests.length) {
            console.error("no quest id: " + quest_id);
            return;
        }
        return this.quests[quest_id];
    };
    /**
     * 更新全体任务信息
     * @param quests
     */
    PlayerSendInfo.prototype.updateQuests = function (quests) {
        for (var i = 0; i < quests.length; i++) {
            this.getQuest(i).initByMsg(quests[i]);
        }
    };
    /**
     * 获取所有未出战的任务
     */
    PlayerSendInfo.prototype.getPrepareQuests = function () {
        var result = [];
        for (var i = 0; i < this.quests.length; i++) {
            if (this.quests[i].getStatus() == E_SEND_STATUS.PREPARE) {
                result.push(i);
            }
        }
        return result;
    };
    /**
     * 获取已被占用的斗士
     */
    PlayerSendInfo.prototype.occupiedRoles = function () {
        var result = [];
        for (var _i = 0, _a = this.quests; _i < _a.length; _i++) {
            var quest = _a[_i];
            var roles = quest.roles;
            if (quest.getStatus() != E_SEND_STATUS.PREPARE) {
                for (var _b = 0, roles_1 = roles; _b < roles_1.length; _b++) {
                    var role_id = roles_1[_b];
                    result.push(role_id);
                }
            }
        }
        return result;
    };
    /**
     * 斗士是否被占用
     */
    PlayerSendInfo.prototype.isRoleOccupied = function (role_id) {
        return this.roleInQuest(role_id) >= 0;
    };
    /**
     * 斗士当前在执行的任务id
     */
    PlayerSendInfo.prototype.roleInQuest = function (target_id) {
        for (var i = 0; i < this.quests.length; i++) {
            var quest = this.quests[i];
            var roles = quest.roles;
            if (quest.getStatus() != E_SEND_STATUS.PREPARE) {
                for (var _i = 0, roles_2 = roles; _i < roles_2.length; _i++) {
                    var role_id = roles_2[_i];
                    if (role_id == target_id) {
                        return i;
                    }
                }
            }
        }
        return -1;
    };
    // endregion
    // region 掠夺复仇
    /**
     * 获取可掠夺队伍信息
     * @param id
     */
    PlayerSendInfo.prototype.getRobTeam = function (id) {
        if (id < 0 || id >= this.rob_teams.length) {
            console.error("no rob team: " + id);
            return;
        }
        return this.rob_teams[id];
    };
    /**
     * 更新全体可掠夺队伍信息
     * @param teams
     */
    PlayerSendInfo.prototype.updateRobTeam = function (teams) {
        for (var _i = 0, _a = this.rob_teams; _i < _a.length; _i++) {
            var rob_team = _a[_i];
            rob_team.reset();
        }
        this.rob_teams = [];
        for (var _b = 0, teams_1 = teams; _b < teams_1.length; _b++) {
            var team = teams_1[_b];
            var new_team = new SendRobTeamInfo();
            new_team.initByMsg(team);
            this.rob_teams.push(new_team);
        }
    };
    /**
     * 获取可复仇队伍信息
     * @param id
     */
    PlayerSendInfo.prototype.getRevTeam = function (id) {
        if (id < 0 || id >= this.rev_teams.length) {
            console.error("no rev team: " + id);
            return;
        }
        return this.rev_teams[id];
    };
    /**
     * 更新全体可复仇队伍信息
     * @param teams
     */
    PlayerSendInfo.prototype.updateRevTeam = function (teams) {
        for (var i = 0; i < this.rev_teams.length; i++) {
            this.rev_teams[i].reset();
        }
        this.rev_teams = [];
        for (var i = 0; i < teams.length; i++) {
            var new_team = new SendRobTeamInfo();
            new_team.initByMsg(teams[i]);
            this.rev_teams.push(new_team);
        }
    };
    // endregion
    // region 战斗日志
    PlayerSendInfo.prototype.getRobLog = function (id) {
        if (id < 0 || id >= this.rob_logs.length) {
            console.error("no rob log: " + id);
            return;
        }
        return this.rob_logs[id];
    };
    PlayerSendInfo.prototype.updateRobLog = function (logs) {
        for (var i = 0; i < this.rob_logs.length; i++) {
            this.rob_logs[i].reset();
        }
        this.rob_logs = [];
        for (var i = 0; i < logs.length; i++) {
            var new_log = new SendRobLogInfo();
            new_log.initByMsg(logs[i]);
            this.rob_logs.push(new_log);
        }
    };
    return PlayerSendInfo;
}());
__reflect(PlayerSendInfo.prototype, "PlayerSendInfo");
//# sourceMappingURL=PlayerSendInfo.js.map