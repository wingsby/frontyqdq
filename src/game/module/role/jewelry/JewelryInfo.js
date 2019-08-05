var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var JewelryInfo = (function () {
    function JewelryInfo() {
        this.role_id = 0; // 当前角色
        this.idx = 0; // 饰品次序（饰品在角色表饰品字段中的位置）
        this.stg_lv = 0; // 强化等级
        this.evo_lv = 0; // 进阶等级
        this.evo_exp = 0; // 进阶经验
        // endregion
    }
    JewelryInfo.prototype.clone = function () {
        var new_j = new JewelryInfo();
        new_j.idx = this.idx;
        new_j.role_id = this.role_id;
        new_j.stg_lv = this.stg_lv;
        new_j.evo_lv = this.evo_lv;
        new_j.evo_exp = this.evo_exp;
        return new_j;
    };
    JewelryInfo.prototype.getJewId = function () {
        var cfg_role = Template.role.get(this.role_id);
        if (!cfg_role) {
            console.error("no role: " + this.role_id);
            return;
        }
        return cfg_role.JewelryId[this.idx];
    };
    JewelryInfo.prototype.getItemInfo = function () {
        return Template.item.get(this.getJewId());
    };
    JewelryInfo.prototype.getJewInfo = function () {
        return Template.jewelry.get(this.getJewId());
    };
    Object.defineProperty(JewelryInfo.prototype, "pos", {
        get: function () {
            return this.getJewInfo().Position;
        },
        enumerable: true,
        configurable: true
    });
    JewelryInfo.prototype.isOperAble = function () {
        return this.isStrAble() || this.isEvoAble();
    };
    // region 通用属性
    /**
     * 获取当前通用属性
     */
    JewelryInfo.prototype.getCurAttr = function () {
        var result = [];
        var cfg_jew = this.getJewInfo();
        for (var i = 0; i < cfg_jew.Basics.length; i++) {
            result.push([cfg_jew.Basics[i], this.getAttrValueCur(i)]);
        }
        return result;
    };
    /**
     * 获取饰品当前某项通用属性
     * @param idx
     */
    JewelryInfo.prototype.getAttrValueCur = function (idx, stg_offset, evo_offset) {
        if (stg_offset === void 0) { stg_offset = 0; }
        if (evo_offset === void 0) { evo_offset = 0; }
        var cfg_jup = Template.jewelryUp.get(this.getJewInfo().Advanced[this.evo_lv + evo_offset]);
        return cfg_jup.BasicsValue[idx] + (this.stg_lv + stg_offset) * cfg_jup.BasicsUp[idx];
    };
    // endregion
    // region 强化属性
    /**
     * 获取下级强化属性
     * @returns {number[][]}
     */
    JewelryInfo.prototype.getNextStrAttr = function () {
        var result = [];
        var cfg_jew = this.getJewInfo();
        for (var i = 0; i < cfg_jew.Basics.length; i++) {
            result.push([cfg_jew.Basics[i], this.getAttrValueCur(i, 1)]);
        }
        return result;
    };
    /**
     * 获取饰品强化消耗道具数量
     */
    JewelryInfo.prototype.getStrUpCost = function () {
        var cfg_eup = Template.equipup.get(this.stg_lv);
        if (!cfg_eup) {
            console.error("no equipup: " + this.stg_lv);
            return;
        }
        return cfg_eup.Ornaments;
    };
    /**
     * 是否强化满级
     */
    JewelryInfo.prototype.isStrMax = function () {
        var cost_num = this.getStrUpCost();
        return (cost_num < 0);
    };
    /**
     * 饰品强化等级条件是否满足
     */
    JewelryInfo.prototype.isStrLevel = function () {
        var team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
        return (this.stg_lv < team_lv);
    };
    /**
     * 是否可强化
     */
    JewelryInfo.prototype.isStrAble = function () {
        var cost_num = this.getStrUpCost();
        if (this.isStrMax()) {
            return false; // 达到最大等级 不可继续强化
        }
        if (!this.isStrLevel()) {
            return false; // 达到当前战队等级 升级后才能强化
        }
        var item_id = Template.config.OrnamentsItem;
        return (Singleton.Get(BagManager).hasEnough(item_id, cost_num)); // 其他情况下 有道具即可强化
    };
    // endregion
    // region 进阶属性
    /**
     * 获取下级进阶属性
     * @returns {number[][]}
     */
    JewelryInfo.prototype.getNextEvoAttr = function () {
        var result = [];
        var cfg_jew = this.getJewInfo();
        for (var i = 0; i < cfg_jew.Basics.length; i++) {
            result.push([cfg_jew.Basics[i], this.getAttrValueCur(i, 0, 1)]);
        }
        return result;
    };
    /**
     * 获取饰品进阶经验提升消耗道具数量
     */
    JewelryInfo.prototype.getEvoUpCost = function () {
        return 1;
    };
    /**
     * 获取饰品进阶消耗道具的ID
     */
    JewelryInfo.prototype.getEvoUpItem = function () {
        var cfg_jup = Template.jewelryUp.get(this.getJewInfo().Advanced[this.evo_lv]);
        return cfg_jup.Item;
    };
    /**
     * 获取饰品进阶直升一级消耗道具数量
     */
    JewelryInfo.prototype.getEvoUpOnekeyCost = function () {
        var cfg_eup = Template.equipup.get(this.evo_lv);
        if (!cfg_eup) {
            console.error("no equipup: " + this.evo_lv);
            return;
        }
        var item_exp = Template.config.JewelryItemExp;
        var need_exp = cfg_eup.JewelryExp - this.evo_exp;
        return Math.ceil(need_exp / item_exp);
    };
    /**
     * 获取饰品进阶直升一级消耗钻石数量
     */
    JewelryInfo.prototype.getEvoUpOnekeyCostDmd = function () {
        var cfg_item = Template.item.get(this.getEvoUpItem());
        if (!cfg_item) {
            console.error("no item: " + this.getEvoUpItem());
            return;
        }
        return this.getEvoUpOnekeyCost() * cfg_item.Cost;
    };
    /**
     * 饰品是否进阶满级
     */
    JewelryInfo.prototype.isEvoMax = function () {
        var cfg_eup = Template.equipup.get(this.evo_lv);
        if (!cfg_eup) {
            console.error("no equipup: " + this.evo_lv);
            return;
        }
        return (cfg_eup.JewelryExp < 0);
    };
    /**
     * 获取饰品下级进阶所需等级
     */
    JewelryInfo.prototype.getEvoLevel = function () {
        var cfg_eup = Template.equipup.get(this.evo_lv);
        if (!cfg_eup) {
            console.error("no equipup: " + this.evo_lv);
            return 0;
        }
        return cfg_eup.JewelryNeed;
    };
    /**
     * 饰品进阶等级条件是否满足
     */
    JewelryInfo.prototype.isEvoLevel = function () {
        var team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
        return (team_lv >= this.getEvoLevel());
    };
    /**
     * 是否可提升进阶经验
     */
    JewelryInfo.prototype.isEvoAble = function (show_info) {
        if (this.isEvoMax()) {
            return false; // 已达到最大进阶等级
        }
        if (!this.isEvoLevel()) {
            return false; // 进阶需求等级不足
        }
        var cfg_it = Template.item.get(this.getEvoUpItem());
        return Singleton.Get(BagManager).hasEnough(this.getEvoUpItem(), this.getEvoUpCost()) || (Singleton.Get(PlayerInfoManager).getDiamond() >= cfg_it.Cost * this.getEvoUpCost());
    };
    return JewelryInfo;
}());
__reflect(JewelryInfo.prototype, "JewelryInfo");
//# sourceMappingURL=JewelryInfo.js.map