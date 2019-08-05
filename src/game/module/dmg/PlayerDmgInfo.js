var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerDmgInfo = (function () {
    function PlayerDmgInfo() {
        this.m_dmg_max = 0;
        this.m_rewards = [];
        this.al_rewards = false;
        this.m_dmg_data = new Dictionary();
    }
    PlayerDmgInfo.prototype.setInfo = function (max, rewards) {
        this.m_dmg_max = max;
        this.m_rewards = rewards;
        this.updateAlarm();
    };
    PlayerDmgInfo.prototype.saveDmg = function (type, pack) {
        if (!pack || !pack.m_actors_data) {
            return;
        }
        var result = [];
        var actors = pack.m_actors_data;
        for (var i = 0; i < actors.length; i++) {
            if (actors[i].m_side != battle.BattleSide.Left) {
                continue;
            }
            result.push(RoleDmgInfo.createByActor(actors[i]));
            this.updateMax(actors[i].dps);
        }
        this.m_dmg_data.update(type, result);
    };
    PlayerDmgInfo.prototype.getDmg = function (type) {
        return this.m_dmg_data.get(type);
    };
    PlayerDmgInfo.prototype.setRewardReceived = function (id) {
        if (!UtilsArray.contains(this.m_rewards, id)) {
            this.m_rewards.push(id);
            this.updateAlarm();
        }
    };
    PlayerDmgInfo.prototype.checkRewardReceived = function (id) {
        return UtilsArray.contains(this.m_rewards, id);
    };
    PlayerDmgInfo.prototype.checkRewardAvailable = function (id) {
        var r_info = Template.damageReward.get(id);
        if (!r_info) {
            return false;
        }
        return this.getDmgMax() >= r_info.Damage;
    };
    PlayerDmgInfo.prototype.getDmgMax = function () {
        return this.m_dmg_max;
    };
    PlayerDmgInfo.prototype.updateMax = function (dmg) {
        if (dmg > this.m_dmg_max) {
            this.m_dmg_max = dmg;
            this.updateAlarm();
        }
    };
    PlayerDmgInfo.prototype.hasAnyActiveReward = function () {
        var r_infos = Template.damageReward.keys;
        for (var i = 0; i < r_infos.length; i++) {
            if (!this.checkRewardReceived(r_infos[i]) && this.checkRewardAvailable(r_infos[i])) {
                return true;
            }
        }
        return false;
    };
    PlayerDmgInfo.prototype.updateAlarm = function () {
        this.al_rewards = this.hasAnyActiveReward();
    };
    return PlayerDmgInfo;
}());
__reflect(PlayerDmgInfo.prototype, "PlayerDmgInfo");
var RoleDmgInfo = (function () {
    function RoleDmgInfo() {
        this.idx = 0;
        this.role_id = 0; // 角色id
        this.dps = 0; // 秒伤
        this.t_dmg = 0; // 总伤害
        this.d_rate = 0; // 伤害百分比，精度2，要除100
    }
    RoleDmgInfo.create = function (role_id, dps, t_dmg, d_rate) {
        var result = new RoleDmgInfo();
        result.role_id = role_id;
        result.dps = dps;
        result.t_dmg = t_dmg;
        result.d_rate = d_rate;
        return result;
    };
    RoleDmgInfo.createByActor = function (actor) {
        if (!actor) {
            return;
        }
        return RoleDmgInfo.create(actor.m_r_inf.role_id, actor.dps, actor.t_dmg, actor.d_rate);
    };
    return RoleDmgInfo;
}());
__reflect(RoleDmgInfo.prototype, "RoleDmgInfo");
var E_DMG_STAT_TYPE;
(function (E_DMG_STAT_TYPE) {
    E_DMG_STAT_TYPE[E_DMG_STAT_TYPE["BOSS"] = 0] = "BOSS";
    E_DMG_STAT_TYPE[E_DMG_STAT_TYPE["INS"] = 1] = "INS";
    E_DMG_STAT_TYPE[E_DMG_STAT_TYPE["TOWER"] = 2] = "TOWER";
    E_DMG_STAT_TYPE[E_DMG_STAT_TYPE["ARENA"] = 3] = "ARENA";
    E_DMG_STAT_TYPE[E_DMG_STAT_TYPE["WORLD"] = 4] = "WORLD";
})(E_DMG_STAT_TYPE || (E_DMG_STAT_TYPE = {}));
//# sourceMappingURL=PlayerDmgInfo.js.map