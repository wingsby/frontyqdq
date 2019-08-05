var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EquipPos;
(function (EquipPos) {
    EquipPos[EquipPos["Null"] = 0] = "Null";
    EquipPos[EquipPos["Weapon"] = 1] = "Weapon";
    EquipPos[EquipPos["Chest"] = 2] = "Chest";
    EquipPos[EquipPos["Leg"] = 3] = "Leg";
    EquipPos[EquipPos["Shoe"] = 4] = "Shoe";
    EquipPos[EquipPos["Ring"] = 5] = "Ring";
    EquipPos[EquipPos["Necklace"] = 6] = "Necklace"; // 6 项链
})(EquipPos || (EquipPos = {}));
var EquipInfo = (function () {
    function EquipInfo() {
        this.pos = 0; // 装备部位 EquipPos
        this.equip_id = 0; // 装备id
        this.stg_lv = 0; // 强化等级
        this.rfn_lv = 0; // 精炼等级
        this.item_info = null; // 道具信息
        this.equip_info = null; // 装备信息
        this.eht_breach = 0; // 装备附魔突破等级，用于读取等级上限
        this.eht_ids = [0, 0]; // 附魔列表
        this.eht_temp = [0, 0]; // 临时洗练列表
        this.eht_lvs = [0, 0]; // 附魔等级
        // endregion
    }
    EquipInfo.prototype.Clone = function () {
        var new_e = new EquipInfo();
        new_e.pos = this.pos;
        new_e.equip_id = this.equip_id;
        new_e.stg_lv = this.stg_lv;
        new_e.rfn_lv = this.rfn_lv;
        new_e.eht_breach = this.eht_breach;
        if (this.eht_ids) {
            new_e.eht_ids = [this.eht_ids[0], this.eht_ids[1]];
        }
        else {
            new_e.eht_ids = [0, 0];
        }
        if (this.eht_lvs) {
            new_e.eht_lvs = [this.eht_lvs[0], this.eht_lvs[1]];
        }
        else {
            new_e.eht_lvs = [0, 0];
        }
        if (this.eht_temp) {
            new_e.eht_temp = [this.eht_temp[0], this.eht_temp[1]];
        }
        else {
            new_e.eht_temp = [0, 0];
        }
        new_e.item_info = Template.item.get(this.equip_id);
        new_e.equip_info = Template.equip.get(this.equip_id);
        return new_e;
    };
    Object.defineProperty(EquipInfo.prototype, "str_attr", {
        /**
         * 获取当前强化属性
         * @returns {number[][]}
         */
        get: function () {
            var result = [];
            for (var i = 0; i < this.equip_info.Basics.length; i++) {
                result.push([this.equip_info.Basics[i], this.getAttrValueStr(i)]);
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "next_str_attr", {
        /**
         * 获取下级强化属性
         * @returns {number[][]}
         */
        get: function () {
            var result = [];
            for (var i = 0; i < this.equip_info.Basics.length; i++) {
                result.push([this.equip_info.Basics[i], this.getAttrValueStrNext(i)]);
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "refine_attr", {
        /**
         * 获取当前精炼属性
         * @returns {number[][]}
         */
        get: function () {
            var result = [];
            for (var i = 0; i < this.equip_info.Refine.length; i++) {
                result.push([this.equip_info.Refine[i], this.getAttrValueRefine(i)]);
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "next_refine_attr", {
        /**
         * 获取下级精炼属性
         * @returns {number[][]}
         */
        get: function () {
            var result = [];
            for (var i = 0; i < this.equip_info.Refine.length; i++) {
                result.push([this.equip_info.Refine[i], this.getAttrValueRefineNext(i)]);
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "next_attr", {
        /**
         * 获取当前总属性（不含套装） (计算有问题 弃用)
         * @returns {number[][]}
         */
        /**
        public get attr(): number[][] {
            let result: number[][] = [];
    
            for(let i: number = 0; i < this.equip_info.Basics.length; i++){
                result.push([this.equip_info.Basics[i], this.getAttrValue(i)]);
            }
    
            return result;
        }
         */
        /**
         * 获取下级总属性（不含套装）
         * @returns {number[][]}
         */
        get: function () {
            var result = [];
            for (var i = 0; i < this.equip_info.Basics.length; i++) {
                result.push([this.equip_info.Basics[i], this.getAttrValueNext(i)]);
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取装备的当前总属性（不含套装）
     * @param idx
     */
    EquipInfo.prototype.getAttrValue = function (idx) {
        return this.getAttrValueStr(idx) + this.getAttrValueRefine(idx);
    };
    /**
     * 获取装备的下级总属性（不含套装）
     * @param idx
     */
    EquipInfo.prototype.getAttrValueNext = function (idx) {
        return this.getAttrValueStrNext(idx) + this.getAttrValueRefineNext(idx);
    };
    /**
     * 获取装备当前某项强化属性
     * @param idx
     * @returns {number}
     */
    EquipInfo.prototype.getAttrValueStr = function (idx) {
        return this.equip_info.BasicsValue[idx] + this.stg_lv * this.equip_info.BasicsUp[idx];
    };
    /**
     * 获取装备下级某项强化属性
     * @param idx
     * @returns {number}
     */
    EquipInfo.prototype.getAttrValueStrNext = function (idx) {
        return this.equip_info.BasicsValue[idx] + (this.stg_lv + 1) * this.equip_info.BasicsUp[idx];
    };
    /**
     * 获取装备当前某项精炼属性
     * @param idx
     * @returns {number}
     */
    EquipInfo.prototype.getAttrValueRefine = function (idx) {
        if (this.rfn_lv <= 0) {
            return 0;
        }
        return this.equip_info.RefineValue[idx] + (this.rfn_lv - 1) * this.equip_info.RefineUp[idx];
    };
    /**
     * 获取装备下级某项精炼属性
     * @param idx
     */
    EquipInfo.prototype.getAttrValueRefineNext = function (idx) {
        return this.equip_info.RefineValue[idx] + ((this.rfn_lv - 1) + 1) * this.equip_info.RefineUp[idx];
    };
    Object.defineProperty(EquipInfo.prototype, "levelup_cost", {
        /**
         * 升级所需金币
         * @returns {number}
         */
        get: function () {
            return Template.equipup.get(this.stg_lv).BasicsGold;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "refine_cost", {
        /**
         * 精炼所需道具
         * @returns {number[][]}
         */
        get: function () {
            var result = [];
            var equip_up = Template.equipup.get(this.rfn_lv);
            for (var i = 0; i < equip_up.RefineItem.length; i++) {
                result.push([equip_up.RefineItem[i], equip_up.RefineItemNum[i]]);
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "is_str_max", {
        /**
         * 强化是否到达当前最大等级
         * @returns {boolean}
         */
        get: function () {
            var max_lv = Singleton.Get(EquipManager).getCurMaxStrengthLv();
            return this.stg_lv >= max_lv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "is_str_finally_max", {
        /**
         * 强化是否完全满级
         * @returns {boolean}
         */
        get: function () {
            var max_lv = Singleton.Get(EquipManager).getMaxStrengthLv();
            return this.stg_lv >= max_lv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "is_refine_max", {
        /**
         * 精炼是否满级
         * @returns {boolean}
         */
        get: function () {
            var max_lv = Singleton.Get(EquipManager).getMaxRefineLv();
            return this.rfn_lv >= max_lv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "eht_full_lv", {
        // region 附魔属性
        /**
         * 获取总附魔等级
         * @returns {number}
         */
        get: function () {
            return this.eht_lvs[0] + this.eht_lvs[1];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 根据附魔idx和附魔id获取属性加成数值
     */
    EquipInfo.prototype.getAttrValueEnchantBasic = function (idx, eht_id) {
        var eht_lv = this.eht_lvs[idx];
        if (eht_lv <= 0) {
            return 0;
        }
        if (eht_id <= 0) {
            return 0;
        }
        var eht_cfg = Template.enchant.get(eht_id);
        if (!eht_cfg) {
            return 0;
        }
        return eht_cfg.EnchantValue + (eht_lv - 1) * eht_cfg.EnchantUp;
    };
    /**
     * 获取附魔属性加成数值
     * @param idx
     */
    EquipInfo.prototype.getAttrValueEnchant = function (idx) {
        var eht_id = this.eht_ids[idx];
        return this.getAttrValueEnchantBasic(idx, eht_id);
    };
    /**
     * 获取附魔属性加成数值
     * @param idx
     */
    EquipInfo.prototype.getAttrValueEnchantTemp = function (idx) {
        var eht_id = this.eht_temp[idx];
        var eht_lv = this.eht_lvs[idx];
        if (eht_lv <= 0) {
            return 0;
        }
        if (eht_id <= 0) {
            return 0;
        }
        var eht_cfg = Template.enchant.get(eht_id);
        if (!eht_cfg) {
            return 0;
        }
        return eht_cfg.EnchantValue + (eht_lv - 1) * eht_cfg.EnchantUp;
    };
    /**
     * 获取附魔属性满级加成数值
     * @param idx
     */
    EquipInfo.prototype.getAttrValueEnchantMax = function (idx) {
        var eht_id = this.eht_ids[idx];
        var eht_lv = Template.config.EnchantLv[Template.config.EnchantLv.length - 1];
        if (eht_id <= 0) {
            return 0;
        }
        var eht_cfg = Template.enchant.get(eht_id);
        if (!eht_cfg) {
            return 0;
        }
        return eht_cfg.EnchantValue + (eht_lv - 1) * eht_cfg.EnchantUp;
    };
    /**
     * 获取附魔临时属性满级加成数值
     * @param idx
     */
    EquipInfo.prototype.getAttrValueEnchantTempMax = function (idx) {
        var eht_id = this.eht_temp[idx];
        var eht_lv = Template.config.EnchantLv[Template.config.EnchantLv.length - 1];
        if (eht_id <= 0) {
            return 0;
        }
        var eht_cfg = Template.enchant.get(eht_id);
        if (!eht_cfg) {
            return 0;
        }
        return eht_cfg.EnchantValue + (eht_lv - 1) * eht_cfg.EnchantUp;
    };
    Object.defineProperty(EquipInfo.prototype, "cur_enchant_max_lv", {
        /**
         * 获取当前最大附魔等级
         * @returns {number}
         */
        get: function () {
            return Template.config.EnchantLv[this.eht_breach];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "is_enchant_breachable", {
        /**
         * 当前附魔等级是否可突破
         * @returns {boolean}
         */
        get: function () {
            return this.eht_lvs[0] >= this.cur_enchant_max_lv && this.eht_lvs[1] >= this.cur_enchant_max_lv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "is_enchant_breachable_and_lv", {
        /**
         * 当前附魔等级是否可突破
         * @returns {boolean}
         */
        get: function () {
            return this.eht_lvs[0] >= this.cur_enchant_max_lv && this.eht_lvs[1] >= this.cur_enchant_max_lv && Singleton.Get(PlayerInfoManager).getTeamLv() >= this.enchant_breach_need_lv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "is_enchant_max", {
        /**
         * 当前附魔等级是否满级
         * @returns {boolean}
         */
        get: function () {
            var max_breach = Template.config.EnchantLv.length - 1;
            return this.eht_breach >= max_breach && this.is_enchant_breachable; // 已达到最大附魔突破次数 并且 可突破 视为满级
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "enchant_breach_cost", {
        /**
         * 下级附魔突破所需道具数量
         * @returns {number}
         */
        get: function () {
            return Template.config.EnchantLvNum[this.eht_breach];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "enchant_breach_cost_dmd", {
        /**
         * 下级附魔突破所需钻石数量
         * @returns {number}
         */
        get: function () {
            var cost_num = this.enchant_breach_cost;
            var cfg_it = Template.item.get(Template.config.EnchantBreach);
            if (!cfg_it) {
                console.log("no enchant breach cost item: " + Template.config.EnchantBreach);
                return;
            }
            return cost_num * cfg_it.Cost;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "enchant_breach_need_lv", {
        /**
         * 下级附魔突破所需战队等级
         * @returns {number}
         */
        get: function () {
            return Template.config.EnchantTeamLv[this.eht_breach];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "enchant_levelup_cost", {
        /**
         * 下级附魔等级提升所需道具数量
         * @returns {number}
         */
        get: function () {
            if (this.eht_lvs[0] < this.cur_enchant_max_lv) {
                return Template.equipup.get(this.eht_lvs[0]).EnchantItemNum;
            }
            else if (this.eht_lvs[1] < this.cur_enchant_max_lv) {
                return Template.equipup.get(this.eht_lvs[1]).EnchantItemNum;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "enchant_has_precious", {
        /**
         * 是否有橙色以上品质的稀有属性
         */
        get: function () {
            var eht1_cfg = Template.enchant.get(this.eht_ids[0]);
            var eht2_cfg = Template.enchant.get(this.eht_ids[1]);
            var precious_star = 5;
            if (eht1_cfg.EnchantStar >= precious_star || eht2_cfg.EnchantStar >= precious_star) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipInfo.prototype, "enchant_temp_has_precious", {
        /**
         * 是否有红色以上品质的临时稀有属性
         */
        get: function () {
            var eht1_cfg = Template.enchant.get(this.eht_temp[0]);
            var eht2_cfg = Template.enchant.get(this.eht_temp[1]);
            if (!eht1_cfg || !eht2_cfg) {
                return false;
            }
            var precious_star = 6;
            if (eht1_cfg.EnchantStar >= precious_star || eht2_cfg.EnchantStar >= precious_star) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    // endregion
    // region 提示检查
    /**
     * 装备是否可强化
     * @returns {boolean}
     */
    EquipInfo.prototype.isStrengthAble = function () {
        if (this.equip_id <= 0) {
            return false;
        }
        if (this.is_str_max) {
            return false;
        }
        var equipup_info = Template.equipup.get(this.stg_lv);
        if (!equipup_info) {
            console.error("no equipup: " + this.stg_lv);
        }
        var is_money_enough = Singleton.Get(PlayerInfoManager).getGold() >= equipup_info.BasicsGold;
        if (is_money_enough) {
            return true;
        }
        return false;
    };
    /**
     * 装备是否可精炼
     * @returns {boolean}
     */
    EquipInfo.prototype.isRefineAble = function () {
        if (!OpenManager.CheckOpen(OpenType.EquipRefine)) {
            return false;
        }
        if (this.equip_id <= 0) {
            return false;
        }
        if (this.is_refine_max) {
            return false;
        }
        var equipup_info = Template.equipup.get(this.rfn_lv);
        if (!equipup_info) {
            console.error("no equipupId: " + this.rfn_lv);
        }
        for (var i = 0; i < equipup_info.RefineItem.length; i++) {
            var my_item_enough = Singleton.Get(BagManager).hasEnough(equipup_info.RefineItem[i], equipup_info.RefineItemNum[i]);
            if (!my_item_enough) {
                return false;
            }
        }
        return true;
    };
    /**
     * 是否可附魔
     * @returns {boolean}
     */
    EquipInfo.prototype.isEnchantAble = function () {
        if (this.is_enchant_max) {
            return false;
        }
        // 如果可突破 突破道具数量
        if (this.is_enchant_breachable) {
            var need_breach_item = this.enchant_breach_cost;
            return Singleton.Get(BagManager).hasEnough(Template.config.EnchantBreach, need_breach_item);
        }
        // 如果可附魔 附魔材料数量
        return Singleton.Get(BagManager).hasEnough(Template.config.EnchantItem, this.enchant_levelup_cost);
    };
    return EquipInfo;
}());
__reflect(EquipInfo.prototype, "EquipInfo");
//# sourceMappingURL=EquipInfo.js.map