var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleAlarmInfo = (function () {
    function RoleAlarmInfo(role_id, role_info) {
        this.m_role_id = 0;
        this.m_al_role = false;
        this.m_al_breach = false;
        this.m_al_talent = false;
        this.m_al_awaken = false;
        this.m_role_id = role_id;
        this.role_info = role_info;
    }
    RoleAlarmInfo.prototype.getRoleId = function () {
        return this.m_role_id;
    };
    Object.defineProperty(RoleAlarmInfo.prototype, "al_role", {
        get: function () {
            return this.m_al_role;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleAlarmInfo.prototype, "al_breach", {
        get: function () {
            return this.m_al_breach;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleAlarmInfo.prototype, "al_talent", {
        get: function () {
            return this.m_al_talent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleAlarmInfo.prototype, "al_awaken", {
        get: function () {
            return this.m_al_awaken;
        },
        enumerable: true,
        configurable: true
    });
    RoleAlarmInfo.prototype.refresh = function () {
        return this.clacRole();
    };
    /**
     * 计算角色有提醒
     * @returns {boolean}
     */
    RoleAlarmInfo.prototype.clacRole = function () {
        this.m_al_breach = this.clacBreach();
        this.m_al_talent = this.clacTalent();
        this.m_al_awaken = this.clacAwaken();
        this.m_al_role = this.m_al_breach || this.m_al_talent || this.m_al_awaken;
        return this.m_al_role;
    };
    /**
     * 计算可突破
     * @returns {boolean}
     */
    RoleAlarmInfo.prototype.clacBreach = function () {
        if (!OpenManager.CheckOpen(OpenType.RoleBreach)) {
            return false;
        }
        var info_mgr = Singleton.Get(PlayerInfoManager);
        var bag_mgr = Singleton.Get(BagManager);
        var next_breach = Template.breach.get(this.role_info.GetNextBreachId());
        var role_entity = Template.role.get(this.m_role_id);
        // 已经突破满级 不可突破
        if (!next_breach) {
            return false;
        }
        // 检查突破所需等级
        var need_lv = next_breach.RoleLv;
        if (this.role_info.lv < need_lv) {
            return false;
        }
        // 检查道具足够
        for (var i = 0; i < next_breach.BreachItem.length; i++) {
            if (!bag_mgr.hasEnough(next_breach.BreachItem[i], next_breach.BreachCounts[i])) {
                return false;
            }
        }
        // 检查角色碎片足够 2017/02/10新增
        var need_frag = next_breach.FragmentNum;
        if (!bag_mgr.hasEnough(role_entity.Fragment, need_frag)) {
            return false;
        }
        // 检查金币足够
        if (!info_mgr.hasGold(next_breach.BreachMoney)) {
            return false;
        }
        return true;
    };
    /**
     * 计算可进阶
     * @returns {boolean}
     */
    RoleAlarmInfo.prototype.clacTalent = function () {
        if (!OpenManager.CheckOpen(OpenType.RoleTalent)) {
            return false;
        }
        var info_mgr = Singleton.Get(PlayerInfoManager);
        var bag_mgr = Singleton.Get(BagManager);
        // 已经进阶满级 不可进阶
        var next_talent = Template.talent.get(this.role_info.talent + 1);
        if (!next_talent) {
            return false;
        }
        var cfg_talent = Template.talent.get(this.role_info.talent);
        // 检查道具足够
        for (var i = 0; i < cfg_talent.TalentItem.length; i++) {
            if (!bag_mgr.hasEnough(cfg_talent.TalentItem[i], cfg_talent.TalentCounts[i])) {
                return false;
            }
        }
        // 检查金币足够
        if (!info_mgr.hasGold(cfg_talent.TalentMoney)) {
            return false;
        }
        return true;
    };
    /**
     * 计算可觉醒
     * @returns {boolean}
     */
    RoleAlarmInfo.prototype.clacAwaken = function () {
        var info_mgr = Singleton.Get(PlayerInfoManager);
        var bag_mgr = Singleton.Get(BagManager);
        var awaken_info = Template.awaken.get(this.role_info.awaken);
        var role_entity = Template.role.get(this.m_role_id);
        // 已经觉醒满级 不可觉醒
        if (this.role_info.awaken >= role_entity.AwakenMax) {
            return false;
        }
        // 检查道具足够
        if (!bag_mgr.hasEnough(role_entity.Fragment, RoleUtil.getAwakenFragment(awaken_info, role_entity.ID))) {
            return false;
        }
        // 检查金币足够
        if (!info_mgr.hasGold(awaken_info.AwakenMoney)) {
            return false;
        }
        return true;
    };
    return RoleAlarmInfo;
}());
__reflect(RoleAlarmInfo.prototype, "RoleAlarmInfo");
//# sourceMappingURL=RoleAlarmInfo.js.map