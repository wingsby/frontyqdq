var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerDuelInfo = (function () {
    /**
     * @constructor
     */
    function PlayerDuelInfo() {
        this.last_update = 0; // 上次更新时间
        this.score_awards = [];
        this.wins_awards = [];
        this.my_teams = [[], [], []];
    }
    // region 基本信息
    /**
     * 更新一骑当千基本信息
     * @param data
     * @param my_teams
     */
    PlayerDuelInfo.prototype.updateInfo = function (data) {
        if (!data) {
            console.error("can't apply player duel info, info is null.");
            return;
        }
        this.last_update = UtilsGame.Now(); // 记录最后更新时间
        this.uid = data.uid;
        this.wins = data.wins;
        this.last_reset_wins = data.last_reset_wins;
        this.max_score = data.max_score;
        this.score_awards = data.score_awards;
        this.duel_count = data.duel_count;
        this.wins_awards = data.wins_awards;
    };
    /**
     * 记录累计功勋增加值
     * @param add
     */
    PlayerDuelInfo.prototype.addMaxScore = function (add) {
        this.max_score += add;
    };
    /**
     * 获取上次更新时间点
     * @returns {number}
     */
    PlayerDuelInfo.prototype.getLastUpdate = function () {
        return this.last_update;
    };
    /**
     * 确认是否未过期
     * @returns {boolean}
     */
    PlayerDuelInfo.prototype.checkUpToDate = function () {
        return this.getLastUpdate() >= Common.getTodayResetTime();
    };
    // endregion
    // region 红点提示
    /**
     * 检查是否需要提醒
     * @returns {boolean}
     */
    PlayerDuelInfo.prototype.isAlarm = function () {
        return this.isScrollEnough() || this.isScoreOrWinsActive();
    };
    /**
     * 检查挑战券是否有剩余
     */
    PlayerDuelInfo.prototype.isScrollEnough = function () {
        var scroll_id = Template.duel.Consume;
        var cost_count = Template.duel.QuantityC;
        var my_scroll = Singleton.Get(ScrollManager).getScrollActual(scroll_id);
        if (my_scroll[0] >= cost_count) {
            return true;
        }
        return false;
    };
    /**
     * 检查是否有可领取但未领取的奖励
     * @returns {boolean}
     */
    PlayerDuelInfo.prototype.isScoreOrWinsActive = function () {
        return this.checkScoreActive() || this.checkWinsActive();
    };
    // endregion
    // region 队伍信息
    /**
     * 更新队伍数据
     * @param teams
     */
    PlayerDuelInfo.prototype.updateTeams = function (teams) {
        if (!teams) {
            // console.error("can't apply teams data, teams is null.");
            return;
        }
        this.my_teams = teams;
    };
    /**
     * 更新一支队伍的信息
     * @param tid
     * @param team
     */
    PlayerDuelInfo.prototype.updateTeam = function (tid, team) {
        if (!team) {
            console.error("can't apply team data, team is null.");
            return;
        }
        if (tid < 0 || tid > 2) {
            console.error("can't apply team data, team id < 0 or > 2");
        }
        this.my_teams[tid] = team;
    };
    /**
     * 清空一支队伍成员
     */
    PlayerDuelInfo.prototype.dropTeam = function (tid) {
        if (tid < 0 || tid > 2) {
            console.error("can't apply team data, team id < 0 or > 2");
        }
        this.my_teams[tid] = [0, 0, 0, 0, 0];
    };
    /**
     * 获取队伍
     * @param team_id
     * @returns {any}
     */
    PlayerDuelInfo.prototype.getTeam = function (team_id) {
        var team = this.my_teams[team_id];
        if (!team) {
            return [0, 0, 0, 0, 0];
        }
        var len = team.length;
        if (len < 5) {
            var off = 5 - len;
            for (var i = 0; i < off; i++) {
                team.push(0);
            }
        }
        return team;
    };
    /**
     * 获取队伍（字典结构）
     * @param team_id
     * @returns {Dictionary<number, number>}
     */
    PlayerDuelInfo.prototype.getTeamInDict = function (team_id) {
        var team = this.getTeam(team_id);
        var result = new Dictionary();
        for (var i = 0; i < team.length; i++) {
            result.add(i + 1, team[i]);
        }
        return result;
    };
    /**
     * 检查队伍是否为空
     * @param team_id
     * @returns {boolean}
     */
    PlayerDuelInfo.prototype.checkTeamEmpty = function (team_id) {
        var team = this.getTeam(team_id);
        var role_id_count = 0;
        for (var i = 0; i < team.length; i++) {
            role_id_count += team[i];
        }
        return role_id_count <= 0;
    };
    /**
     * 检查是否有空队伍
     * @returns {boolean}
     */
    PlayerDuelInfo.prototype.checkAnyTeamEmpty = function () {
        for (var i = 0; i < 3; i++) {
            if (this.checkTeamEmpty(i)) {
                return true;
            }
        }
        return false;
    };
    /**
     * 获取队伍角色
     * @param team_id
     * @param pos
     * @returns {number}
     */
    PlayerDuelInfo.prototype.getTeamRole = function (team_id, pos) {
        var team = this.getTeam(team_id);
        return team[pos - 1];
    };
    /**
     * 获取队伍战力
     * @param team_id
     * @returns {number}
     */
    PlayerDuelInfo.prototype.getTeamFighting = function (team_id) {
        var team = this.my_teams[team_id];
        if (!team) {
            return 0;
        }
        var roles = Singleton.Get(RoleManager).getRolesInfo();
        var fighting = 0;
        for (var i = 0; i < team.length; i++) {
            var role_id = team[i];
            if (role_id <= 0) {
                continue;
            }
            var my_role = roles.GetRole(role_id);
            if (my_role == null) {
                continue;
            }
            fighting += my_role.fighting;
        }
        return fighting;
    };
    /**
     * 获取队伍中第一个角色
     * @param team_id
     */
    PlayerDuelInfo.prototype.getTeamFirstHero = function (team_id) {
        if (team_id < 0 || team_id > 2) {
            console.error("can't get team first hero, incorrect team id: " + team_id);
            return;
        }
        var team = this.my_teams[team_id];
        for (var i = 0; i < team.length; i++) {
            if (team[i] > 0) {
                return team[i];
            }
        }
        return 0;
    };
    /**
     * 获取角色上阵数据
     * @param role_id
     * @returns number[] 第一个是队伍id，第二个是pos
     */
    PlayerDuelInfo.prototype.getRoleTeamPos = function (role_id) {
        var my_teams = this.my_teams;
        for (var i = 0; i < my_teams.length; i++) {
            for (var j = 0; j < my_teams[i].length; j++) {
                if (my_teams[i][j] == role_id) {
                    return [i, j + 1];
                }
            }
        }
        return [-1, 0];
    };
    /**
     * 计算队伍战斗力
     * @param team_id
     * @returns {number}
     */
    PlayerDuelInfo.prototype.clacTeamFighting = function (team_id) {
        if (team_id < 0 || team_id > 2) {
            console.error("can't get team first hero, incorrect team id: " + team_id);
            return;
        }
        var roles = Singleton.Get(RoleManager).getRolesInfo();
        var result = 0;
        var team = this.my_teams[team_id];
        for (var i = 0; i < team.length; i++) {
            if (team[i] > 0) {
                var my_role = roles.GetRole(team[i]);
                if (my_role != null) {
                    result += my_role.fighting;
                }
            }
        }
        return result;
    };
    /**
     * 计算一骑当千三队总战力
     * @returns {number}
     */
    PlayerDuelInfo.prototype.clacAllFighting = function () {
        var result = 0;
        for (var i = 0; i < 3; i++) {
            result += this.clacTeamFighting(i);
        }
        return result;
    };
    PlayerDuelInfo.prototype.getUsingRoles = function () {
        var result = [];
        for (var i = 0; i < this.my_teams.length; i++) {
            for (var j = 0; j < this.my_teams[i].length; j++) {
                var role_id = this.my_teams[i][j];
                if (role_id <= 0) {
                    continue;
                }
                result.push(role_id);
            }
        }
        return result;
    };
    /**
     * 获取按战力排序的未使用角色id列表
     * @returns {number[]}
     */
    PlayerDuelInfo.prototype.getUnusingRolesByFighting = function () {
        var role_ids = RoleUtil.genRolesByFighting();
        return DuelUtil.eliminateRolesInList(role_ids, this.getUsingRoles());
    };
    /**
     * 一键更换
     * @constructor
     */
    PlayerDuelInfo.prototype.ChangeHeroOnekey = function () {
        var role_ids = this.getUnusingRolesByFighting();
        var used_roles = 0;
        for (var i = 0; i < this.my_teams.length; i++) {
            for (var j = 0; j < this.my_teams[i].length; j++) {
                var role_id = this.my_teams[i][j];
                if (role_id <= 0) {
                    if (used_roles >= role_ids.length) {
                        break; // 可用的角色都用完了， 跳出循环
                    }
                    this.my_teams[i][j] = role_ids[used_roles];
                    used_roles++;
                }
            }
        }
        return this.my_teams;
    };
    // endregion
    // region 功勋奖励
    /**
     * 检查累计功勋奖励条件是否已达到
     * @param id
     * @returns {boolean}
     */
    PlayerDuelInfo.prototype.checkScoreRewardAvailable = function (id) {
        var maward_info = Template.maward.get(id);
        if (maward_info == null) {
            return false;
        }
        return this.max_score >= maward_info.ID;
    };
    /**
     * 检查累计功勋奖励是否已领取
     * @param id
     * @returns {boolean}
     */
    PlayerDuelInfo.prototype.checkScoreRewardReceived = function (id) {
        for (var i = 0; i < this.score_awards.length; i++) {
            if (id == this.score_awards[i])
                return true;
        }
        return false;
    };
    /**
     * 将某一功勋奖励标记为已领取
     * @param id
     */
    PlayerDuelInfo.prototype.markScoreAsReceived = function (id) {
        if (this.checkScoreRewardReceived(id)) {
            console.error("Can't mark score reward received, id is already received. MawardId: " + id);
            return;
        }
        this.score_awards.push(id);
    };
    /**
     * 检查是否有可领取的功勋奖励
     * @returns {boolean}
     */
    PlayerDuelInfo.prototype.checkScoreActive = function () {
        var conditions = Template.maward.keys;
        for (var i = 0; i < conditions.length; i++) {
            if (this.checkScoreRewardAvailable(conditions[i]) && !this.checkScoreRewardReceived(conditions[i])) {
                return true;
            }
        }
        return false;
    };
    // endregion
    // region 胜场奖励
    /**
     * 检查胜场宝箱某一阶段的条件是否已达到
     * @param id
     * @returns {boolean}
     */
    PlayerDuelInfo.prototype.checkWinsRewardAvailable = function (id) {
        var katsuji_info = Template.katsuji.get(id);
        if (katsuji_info == null) {
            return false;
        }
        return this.wins >= katsuji_info.ID;
    };
    /**
     * 检查胜场宝箱某一阶段是否已领取
     * @param id
     * @returns {boolean}
     */
    PlayerDuelInfo.prototype.checkWinsRewardReceived = function (id) {
        for (var i = 0; i < this.wins_awards.length; i++) {
            if (id == this.wins_awards[i]) {
                return true;
            }
        }
        return false;
    };
    /**
     * 将某一胜次奖励标记为已领取
     * @param id
     */
    PlayerDuelInfo.prototype.markWinsAsReceived = function (id) {
        if (this.checkWinsRewardReceived(id)) {
            console.error("Can't mark wins reward received, id is already received. KatsujiId: " + id);
            return;
        }
        this.wins_awards.push(id);
    };
    /**
     * 检查是否有可领取的胜场奖励
     * @returns {boolean}
     */
    PlayerDuelInfo.prototype.checkWinsActive = function () {
        var conditions = Template.katsuji.keys;
        for (var i = 0; i < conditions.length; i++) {
            if (this.checkWinsRewardAvailable(conditions[i]) && !this.checkWinsRewardReceived(conditions[i])) {
                return true;
            }
        }
        return false;
    };
    /**
     * 获取最新的胜场奖励ID
     */
    PlayerDuelInfo.prototype.getNewestKatsu = function () {
        var raw_wins = Template.katsuji.values;
        var win_list = [];
        for (var i = 0; i < raw_wins.length; i++) {
            win_list.push(raw_wins[i]);
        }
        win_list.sort(function (a, b) {
            if (a.ID != b.ID) {
                if (a.ID < b.ID) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            return 0;
        });
        var active_katsu = 0;
        var inf_duel = Singleton.Get(DuelManager).getDuels();
        for (var i = 0; i < win_list.length; i++) {
            var cfg_katsu = win_list[i];
            var rec = inf_duel.checkWinsRewardReceived(cfg_katsu.ID);
            // 已领取 直接下一个
            active_katsu = i;
            if (rec) {
                continue;
            }
            else {
                break;
            }
        }
        return win_list[active_katsu].ID;
    };
    return PlayerDuelInfo;
}());
__reflect(PlayerDuelInfo.prototype, "PlayerDuelInfo");
//# sourceMappingURL=PlayerDuelInfo.js.map