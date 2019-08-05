var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var E_ROLE_LINEUP_REC_TYPE;
(function (E_ROLE_LINEUP_REC_TYPE) {
    E_ROLE_LINEUP_REC_TYPE[E_ROLE_LINEUP_REC_TYPE["ROOKIE"] = 0] = "ROOKIE";
    E_ROLE_LINEUP_REC_TYPE[E_ROLE_LINEUP_REC_TYPE["MIDDLE"] = 1] = "MIDDLE";
    E_ROLE_LINEUP_REC_TYPE[E_ROLE_LINEUP_REC_TYPE["OLDASS"] = 2] = "OLDASS";
    E_ROLE_LINEUP_REC_TYPE[E_ROLE_LINEUP_REC_TYPE["MASTER"] = 3] = "MASTER";
})(E_ROLE_LINEUP_REC_TYPE || (E_ROLE_LINEUP_REC_TYPE = {}));
var PlayerRoleLineupRecInfo = (function () {
    function PlayerRoleLineupRecInfo() {
        this.award = [];
        this.al_reward = false;
        this.m_alarm = new Dictionary();
    }
    PlayerRoleLineupRecInfo.prototype.setAward = function (award) {
        this.award = award;
        this.updateAlarm();
    };
    PlayerRoleLineupRecInfo.prototype.checkRewardAvailable = function (id) {
        var cfg_lup = Template.lineup.get(id);
        if (!cfg_lup) {
            return false;
        }
        var roles = Singleton.Get(RoleManager).getRolesInfo();
        for (var i = 0; i < cfg_lup.LineupRole.length; i++) {
            var role_id = cfg_lup.LineupRole[i];
            if (!roles.GetRole(role_id)) {
                return false;
            }
        }
        return true;
    };
    PlayerRoleLineupRecInfo.prototype.checkRewardReceived = function (id) {
        return UtilsArray.contains(this.award, id);
    };
    PlayerRoleLineupRecInfo.prototype.setAwardReceived = function (id) {
        if (!UtilsArray.contains(this.award, id)) {
            this.award.push(id);
            this.updateAlarm();
        }
    };
    PlayerRoleLineupRecInfo.prototype.hasAnyRewardReceivableByType = function (type) {
        var vals = Template.lineup.values;
        for (var i = 0; i < vals.length; i++) {
            if (vals[i].Type != (type + 1)) {
                continue;
            }
            if (this.checkRewardAvailable(vals[i].ID) && !this.checkRewardReceived(vals[i].ID)) {
                return true;
            }
        }
        return false;
    };
    PlayerRoleLineupRecInfo.prototype.hasAnyTypeCfg = function (type) {
        var vals = Template.lineup.values;
        for (var i = 0; i < vals.length; i++) {
            if (vals[i].Type == (type + 1)) {
                return true;
            }
        }
        return false;
    };
    PlayerRoleLineupRecInfo.prototype.updateAlarm = function () {
        this.m_alarm.update(E_ROLE_LINEUP_REC_TYPE.ROOKIE, this.hasAnyRewardReceivableByType(E_ROLE_LINEUP_REC_TYPE.ROOKIE));
        this.m_alarm.update(E_ROLE_LINEUP_REC_TYPE.MIDDLE, this.hasAnyRewardReceivableByType(E_ROLE_LINEUP_REC_TYPE.MIDDLE));
        this.m_alarm.update(E_ROLE_LINEUP_REC_TYPE.OLDASS, this.hasAnyRewardReceivableByType(E_ROLE_LINEUP_REC_TYPE.OLDASS));
        this.m_alarm.update(E_ROLE_LINEUP_REC_TYPE.MASTER, this.hasAnyRewardReceivableByType(E_ROLE_LINEUP_REC_TYPE.MASTER));
        this.al_reward = this.isTypeAlarm(E_ROLE_LINEUP_REC_TYPE.ROOKIE) || this.isTypeAlarm(E_ROLE_LINEUP_REC_TYPE.MIDDLE) || this.isTypeAlarm(E_ROLE_LINEUP_REC_TYPE.OLDASS) || this.isTypeAlarm(E_ROLE_LINEUP_REC_TYPE.MASTER);
    };
    PlayerRoleLineupRecInfo.prototype.isTypeAlarm = function (type) {
        return this.m_alarm.get(type);
    };
    PlayerRoleLineupRecInfo.prototype.isAnyAlarm = function () {
        return this.al_reward;
    };
    return PlayerRoleLineupRecInfo;
}());
__reflect(PlayerRoleLineupRecInfo.prototype, "PlayerRoleLineupRecInfo");
//# sourceMappingURL=PlayerRoleLineupRecInfo.js.map