var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 场外单个角色数据集合，也是数据库里保存的数据
 */
var RoleInfo = (function () {
    function RoleInfo() {
        this.role_id = 0; // 角色配置表id
        this.lv = 0; // 角色等级
        this.breach = 0; // 角色突破等级
        this.talent = 0; // 角色资质
        this.awaken = 0; // 觉醒等级（该值 - role_entity.AwakenID = 觉醒次数）
        this.base_lv = 0; // 普通攻击技能等级
        this.skill_lv = 0; // 特技技能等级
        this.max_hp = 0; // 血量上限
        this.atk = 0; // 物理攻击
        this.def = 0; // 物理防御
        this.skill_atk = 0; // 技能攻击
        this.skill_def = 0; // 技能防御
        this.atk_speed = 0; // 攻击速度
        this.crit_rate = 0; // 暴击率
        this.crit_damage = 0; // 暴击伤害
        this.dmg_reduce = 0; // 伤害减免
        this.vampire = 0; // 吸血
        this.combo = 0; // 连击
        this.sp_ignore = 0; // 穿透
        this.debuff_res = 0; // buff抗性
        this.en = 0; // 怒气
        this.en_recover = 0; // 普通攻击怒气恢复
        this.en_hit = 0; // 怒气受击恢复
        this.combo_dam = 0; // 追击伤害
        this.crit_res = 0; // 暴击抵抗
        this.fighting = 0; // 战力
        this.equips = []; // 装备列表
        this.jewelries = []; // 饰品列表
    }
    /**
     * 根据消息发来的RoleInfo克隆出本地RoleInfo
     * @param msg_role
     * @returns {any}
     */
    RoleInfo.CloneByMsgRole = function (msg_role) {
        if (!msg_role) {
            return;
        }
        var new_role = new RoleInfo();
        for (var prop in msg_role) {
            if (prop == "__proto__") {
                continue;
            }
            new_role[prop] = msg_role[prop];
        }
        new_role.alarm = new RoleAlarmInfo(new_role.role_id, new_role);
        new_role.alarm.refresh();
        return new_role;
    };
    /**
     * 复制一个属性完全相同的RoleInfo
     * @returns {RoleInfo}
     */
    RoleInfo.prototype.Clone = function () {
        var new_r = new RoleInfo();
        new_r.role_id = this.role_id;
        new_r.lv = this.lv;
        new_r.breach = this.breach;
        new_r.talent = this.talent;
        new_r.awaken = this.awaken;
        new_r.base_lv = this.base_lv;
        new_r.skill_lv = this.skill_lv;
        new_r.max_hp = this.max_hp;
        new_r.atk = this.atk;
        new_r.def = this.def;
        new_r.skill_atk = this.skill_atk;
        new_r.skill_def = this.skill_def;
        new_r.atk_speed = this.atk_speed;
        new_r.crit_rate = this.crit_rate;
        new_r.crit_damage = this.crit_damage;
        new_r.dmg_reduce = this.dmg_reduce;
        new_r.vampire = this.vampire;
        new_r.combo = this.combo;
        new_r.sp_ignore = this.sp_ignore;
        new_r.debuff_res = this.debuff_res;
        new_r.en = this.en;
        new_r.en_recover = this.en_recover;
        new_r.en_hit = this.en_hit;
        new_r.combo_dam = this.combo_dam;
        new_r.crit_res = this.crit_res;
        new_r.fighting = this.fighting;
        new_r.alarm = new RoleAlarmInfo(new_r.role_id, new_r);
        new_r.alarm.refresh();
        for (var i = 0; i < this.equips.length; ++i) {
            new_r.equips.push(this.equips[i].Clone());
        }
        for (var i = 0; i < this.jewelries.length; ++i) {
            this.jewelries[i].role_id = this.role_id;
            new_r.jewelries.push(this.jewelries[i].clone());
        }
        return new_r;
    };
    /**
     * 初始化斗士属性
     * @param id 斗士id
     */
    RoleInfo.prototype.InitByRoleConfigId = function (id) {
        var c = Template.role.get(id);
        if (!c) {
            return;
        }
        this.role_id = id;
        this.lv = c.Lv;
        this.breach = 0;
        this.talent = 0;
        this.awaken = c.AwakenID;
        this.base_lv = 1;
        this.skill_lv = 1;
        this.max_hp = c.Hp;
        this.atk = c.Atk;
        this.def = c.Def;
        this.skill_atk = c.AtkSp;
        this.skill_def = c.DefSp;
        this.atk_speed = c.Atkspeed;
        this.crit_rate = c.CritRate;
        this.crit_damage = c.CritDamage;
        this.dmg_reduce = c.DamageReduce;
        this.vampire = c.Vampire;
        this.combo = c.Combo;
        this.sp_ignore = c.SpIgnore;
        this.debuff_res = c.DebuffRes;
        this.en = c.En;
        this.en_recover = c.EnRecover;
        this.en_hit = c.EnHit;
        this.combo_dam = c.ComboDam;
        this.crit_res = c.CritRes;
        this.fighting = this.CalcFighting();
        for (var e_p = EquipPos.Weapon; e_p <= EquipPos.Shoe; ++e_p) {
            var e = new EquipInfo();
            e.equip_id = 0;
            e.stg_lv = 0;
            e.rfn_lv = 0;
            e.pos = e_p;
            this.equips.push(e);
        }
        this.alarm = new RoleAlarmInfo(this.role_id, this);
        this.alarm.refresh();
    };
    /**
     * 初始化指定等级的斗士属性
     * @param id 斗士id
     * @param lv 斗士等级
     */
    RoleInfo.prototype.InitByRoleConfigIdAndLv = function (id, lv) {
        this.InitByRoleConfigId(id);
        this.lv = lv;
        var c = Template.role.get(id);
        if (!c) {
            return;
        }
        var this_awaken_idx = this.awaken - c.AwakenID;
        if (this_awaken_idx < 0)
            this_awaken_idx = 0;
        var lv_arg = this.lv - 1;
        this.max_hp += (c.Talent * lv_arg * (c.HpGrowth / 1000) + this.max_hp * c.AwakenRate[this_awaken_idx] / 1000) >> 0;
        this.atk += (c.Talent * lv_arg * (c.AtkGrowth / 1000) + this.atk * c.AwakenRate[this_awaken_idx] / 1000) >> 0;
        this.def += (c.Talent * lv_arg * (c.DefGrowth / 1000) + this.def * c.AwakenRate[this_awaken_idx] / 1000) >> 0;
        this.skill_atk += (c.Talent * lv_arg * (c.AtkSpGrowth / 1000) + this.skill_atk * c.AwakenRate[this_awaken_idx] / 1000) >> 0;
        this.skill_def += (c.Talent * lv_arg * (c.DefSpGrowth / 1000) + this.skill_def * c.AwakenRate[this_awaken_idx] / 1000) >> 0;
        this.fighting = this.CalcFighting();
    };
    RoleInfo.prototype.CalcFighting = function () {
        return (this.max_hp * 0.1 + (this.atk + this.def) * 0.6 + (this.skill_atk + this.skill_def) * 0.5 + ((this.crit_rate - 50) + this.crit_res + this.debuff_res + this.en - 300) * 2.4
            + (this.vampire + this.combo + this.combo_dam) * 2.0 + (this.en_recover + this.en_hit - 250) * 8.0 + (this.crit_damage - 1500 + this.sp_ignore) * 0.8 + this.dmg_reduce * 4.0) >> 0;
    };
    /**
     * 获取某个斗士的升级价格，add_level只能填1或者5
     * @param team_level
     * @param add_level
     * @returns {number}
     */
    RoleInfo.prototype.GetLevelupPrice = function (team_level, add_level) {
        var role_config = Template.role.get(this.role_id);
        if (!role_config) {
            console.log("GetLevelupPrice role_id error" + this.role_id);
            return -1;
        }
        // var max = Math.min(team_level, role_config.LvMax);
        var max = role_config.LvMax;
        if (this.lv >= max) {
            return -1;
        }
        var actual_add_level = 0;
        if (add_level == 1) {
            actual_add_level = add_level;
        }
        else if (add_level == 5) {
            if (add_level + this.lv > max) {
                actual_add_level = max - this.lv;
            }
            else {
                actual_add_level = add_level;
            }
        }
        else {
            return -1;
        }
        var gold_rate = role_config.Gold; // 倍率
        var current_lv = this.lv;
        var total_cost = 0;
        for (var i = 0; i < actual_add_level; ++i) {
            var g = Template.grade.get(current_lv);
            if (!g) {
                return -1;
            }
            // 所需金币计算：角色配置表里的金币倍率Gold字段里填写的值/1000再根据等级乘以升级配置表里LvGold字段填写的金币数量
            total_cost += (gold_rate / 1000) * g.LvGold;
            current_lv++;
        }
        return (total_cost) >> 0;
    };
    /**
     * 获取升级后的某项斗士属性
     * @param attr_id
     * @returns {number}
     */
    RoleInfo.prototype.GetShengJiShuXing = function (attr_id) {
        var role_config = Template.role.get(this.role_id);
        if (!role_config) {
            console.log("GetShengJiShuXing role_id error" + this.role_id);
            return -1;
        }
        var basic = 0;
        var basic_grow = 0;
        switch (attr_id) {
            case RoleAttrType.Max_HP:
                basic = role_config.Hp;
                basic_grow = role_config.HpGrowth;
                break;
            case RoleAttrType.Atk:
                basic = role_config.Atk;
                basic_grow = role_config.AtkGrowth;
                break;
            case RoleAttrType.Def:
                basic = role_config.Def;
                basic_grow = role_config.DefGrowth;
                break;
            case RoleAttrType.Skill_Atk:
                basic = role_config.AtkSp;
                basic_grow = role_config.AtkSpGrowth;
                break;
            case RoleAttrType.Skill_Def:
                basic = role_config.DefSp;
                basic_grow = role_config.DefSpGrowth;
                break;
            default:
                return -1;
        }
        var t_cfg = Template.talent.get(this.talent);
        return basic + ((this.lv - 1) / 1000) * basic_grow * t_cfg.TalentNum;
    };
    // region 突破相关属性计算
    /**
     * 获取当前等级突破ID
     * @returns {number}
     */
    RoleInfo.prototype.GetCurBreachId = function () {
        return this.GetBreachId(this.breach - 1);
    };
    /**
     * 获取下级突破ID
     * @returns {number}
     */
    RoleInfo.prototype.GetNextBreachId = function () {
        return this.GetBreachId(this.breach);
    };
    /**
     * 根据数组索引获取突破id
     * @param arr_id
     */
    RoleInfo.prototype.GetBreachId = function (arr_id) {
        var role_config = Template.role.get(this.role_id);
        if (!role_config) {
            console.log("GetBreachId role_id error" + this.role_id);
            return;
        }
        if (arr_id >= role_config.BreachId.length) {
            return;
        }
        return role_config.BreachId[arr_id];
    };
    /**
     * 获取当前突破属性加成
     */
    RoleInfo.prototype.GetCurAllBreachAddition = function () {
        var res_attr = { hp: 0, atk: 0, def: 0, atk_sp: 0, def_sp: 0 };
        var breach_ids = this.GetAllActiveBreachId();
        if (!breach_ids) {
            return res_attr;
        }
        for (var i = 0; i < breach_ids.length; i++) {
            var attr = this.GetBreachAddition(breach_ids[i]);
            if (!attr) {
                continue;
            }
            for (var prop in attr) {
                res_attr[prop] += attr[prop];
            }
        }
        return res_attr;
    };
    /**
     * 获取当前突破属性加成
     */
    RoleInfo.prototype.GetCurBreachAddition = function () {
        return this.GetBreachAddition(this.GetCurBreachId());
    };
    /**
     * 获取下级突破属性加成
     */
    RoleInfo.prototype.GetNextBreachAddition = function () {
        return this.GetBreachAddition(this.GetNextBreachId());
    };
    /**
     * 获取指定突破ID的突破属性加成
     * @param breach_id
     */
    RoleInfo.prototype.GetBreachAddition = function (breach_id) {
        var ept_attr = { hp: 0, atk: 0, def: 0, atk_sp: 0, def_sp: 0 };
        var cfg_breach = Template.breach.get(breach_id);
        if (!cfg_breach) {
            return ept_attr;
        }
        var cfg_role = Template.role.get(this.role_id);
        if (!cfg_role) {
            return ept_attr;
        }
        var attr_ids = {
            hp: RoleAttrType.Max_HP,
            atk: RoleAttrType.Atk,
            def: RoleAttrType.Def,
            atk_sp: RoleAttrType.Skill_Atk,
            def_sp: RoleAttrType.Skill_Def
        };
        var attr_base = {
            hp: cfg_role.Hp,
            atk: cfg_role.Atk,
            def: cfg_role.Def,
            atk_sp: cfg_role.AtkSp,
            def_sp: cfg_role.DefSp
        };
        var result = {};
        for (var prop in attr_ids) {
            result[prop] = cfg_breach.BreachRate * attr_base[prop] / 1000;
        }
        return result;
    };
    /**
     * 获取所有已激活过的突破ID
     * 2017/3/24 突破属性由当前条目计算 无需累加
     * @returns {Array}
     * @deprecated
     */
    RoleInfo.prototype.GetAllActiveBreachId = function () {
        var role_config = Template.role.get(this.role_id);
        if (!role_config) {
            console.log("GetAllActiveBreachId role_id error" + this.role_id);
            return;
        }
        if (this.breach >= role_config.BreachId.length) {
            return;
        }
        var result = [];
        for (var i = 0; i < this.breach; ++i) {
            result.push(role_config.BreachId[i]);
        }
        return result;
    };
    /**
     * 获取角色突破属性成长差值
     * @returns {any}
     */
    RoleInfo.prototype.GetNextBreachAttrDelta = function () {
        var cur_attr = this.GetCurBreachAddition();
        var next_attr = this.GetNextBreachAddition();
        if (!cur_attr) {
            return undefined;
        }
        var result = {};
        for (var prop in cur_attr) {
            if (!next_attr || !next_attr[prop]) {
                result[prop] = 0;
                continue;
            }
            result[prop] = next_attr[prop] - cur_attr[prop];
        }
        return result;
        /*var this_rate = 0;

         var breach_list = this.GetAllActiveBreachId();
         if (breach_list != null)
         {
         if (breach_list.length > 0)
         {
         var this_config = Template.breach.get(breach_list[breach_list.length - 1]);
         if (null == this_config)
         return null;

         this_rate = this_config.BreachRate;
         }
         }
         else
         {
         egret.error("GetNextBreachAttrDelta error");
         return null;
         }*/
        /*
         const next_config = Template.breach.get(this.GetNextBreachId());
         if (!next_config) {
         return;
         }

         const role_config = Template.role.get(this.role_id);
         if (!role_config) {
         return;
         }

         const attr_id = [RoleAttrType.Max_HP, RoleAttrType.Atk, RoleAttrType.Def, RoleAttrType.Skill_Atk, RoleAttrType.Skill_Def];
         const attr_base = [role_config.Hp, role_config.Atk, role_config.Def, role_config.AtkSp, role_config.DefSp];
         const result = [];
         for (let a = 0; a < attr_id.length; ++a) {
         const attr = next_config.BreachRate * attr_base[a] / 1000;
         for (let j = 0; j < next_config.BreachAtt.length; ++j) {
         if (next_config.BreachAtt[j] == attr_id[a]) {
         // attr += next_config.BreachAttvalue[j];
         }
         }
         result.push((attr) >> 0);
         }

         return result;
         */
    };
    // endregion
    // 返回副将加成属性列表，key为-1的时候是战力部分，其他key为属性id
    RoleInfo.prototype.GetBackupAddAttr = function (max) {
        if (max === void 0) { max = false; }
        var role_config = Template.role.get(this.role_id);
        if (!role_config) {
            console.log("GetBackupAddAttr role_id error" + this.role_id);
            return undefined;
        }
        var result = new Dictionary();
        for (var i = 0; i < role_config.BackupForce.length; ++i) {
            if (!max) {
                if (this.fighting < role_config.BackupForce[i]) {
                    break;
                }
            }
            var backup_config = Template.backup.get(role_config.BackupId[i]);
            if (!backup_config) {
                continue;
            }
            for (var j = 0; j < backup_config.BackupAtt.length; ++j) {
                if (!result.containsKey(backup_config.BackupAtt[j])) {
                    result.add(backup_config.BackupAtt[j], 0);
                }
                result.update(backup_config.BackupAtt[j], result.get(backup_config.BackupAtt[j]) + backup_config.BackupAttvalue[j]);
            }
        }
        var hp = result.get(RoleAttrType.Max_HP);
        hp = hp == undefined ? 0 : hp;
        var atk = result.get(RoleAttrType.Atk);
        atk = atk == undefined ? 0 : atk;
        var def = result.get(RoleAttrType.Def);
        def = def == undefined ? 0 : def;
        var sp_def = result.get(RoleAttrType.Skill_Def);
        sp_def = sp_def == undefined ? 0 : sp_def;
        var sp_atk = result.get(RoleAttrType.Skill_Atk);
        sp_atk = sp_atk == undefined ? 0 : sp_atk;
        // //斗士战斗力(部分) = 生命值 * 0.1 + ( 物理攻击+物理防御 ) * 0.6 + (特技攻击 + 特技防御 ) * 0.5
        var add_fight = hp * 0.1 + (atk + def) * 0.6 + (sp_atk + sp_def) * 0.5;
        result.add(-1, add_fight);
        return result;
    };
    // region 进阶相关属性
    // 进阶升级预算， 按照 血，攻，防，技能攻，防， 战力的顺序
    RoleInfo.prototype.GetNextTalentLevelAttrDeltaList = function () {
        var this_talent_num = 0;
        var this_config = Template.talent.get(this.talent);
        if (this_config) {
            this_talent_num = this_config.TalentNum;
        }
        var next_config = Template.talent.get(this.talent + 1);
        if (!next_config) {
            return;
        }
        var cfg_role = Template.role.get(this.role_id);
        if (!cfg_role) {
            return;
        }
        var attr_grow = [cfg_role.HpGrowth, cfg_role.AtkGrowth, cfg_role.DefGrowth, cfg_role.AtkSpGrowth, cfg_role.DefSpGrowth];
        var result = [];
        for (var i = 0; i < attr_grow.length; ++i) {
            result.push((((this.lv - 1) / 1000) * attr_grow[i] * (next_config.TalentNum - this_talent_num)) >> 0);
        }
        result.push(RoleInfo.CalcFightingDelta({
            hp: result[0],
            atk: result[1],
            def: result[2],
            atk_sp: result[3],
            def_sp: result[4]
        }));
        return result;
    };
    // 进阶当前级， 按照 血，攻，防，技能攻，防， 战力的顺序
    RoleInfo.prototype.GetCurTalentLevelAttrDeltaList = function () {
        var this_talent_num = 0;
        var cfg_talent = Template.talent.get(this.talent);
        if (cfg_talent) {
            this_talent_num = cfg_talent.TalentNum;
        }
        var cfg_role = Template.role.get(this.role_id);
        if (!cfg_role) {
            return;
        }
        var attr_grow = [cfg_role.HpGrowth, cfg_role.AtkGrowth, cfg_role.DefGrowth, cfg_role.AtkSpGrowth, cfg_role.DefSpGrowth];
        var result = [];
        for (var i = 0; i < attr_grow.length; ++i) {
            result.push((((this.lv - 1) / 1000) * attr_grow[i] * this_talent_num) >> 0);
        }
        result.push(result[0], result[1], result[2], result[3], result[4]);
        return result;
    };
    /**
     * 获取当前属性加成
     * @returns {RoleBaseAttr}
     * @constructor
     */
    RoleInfo.prototype.GetCurTalentAddition = function () {
        return this.GetTalentAddition(this.talent);
    };
    /**
     * 获取下级属性加成
     * @returns {{}}
     * @constructor
     */
    RoleInfo.prototype.GetNextTalentAddition = function () {
        return this.GetTalentAddition(this.talent + 1);
    };
    /**
     * 计算指定进阶ID的属性加成
     * @param talent
     * @returns {RoleBaseAttr}
     * @constructor
     */
    RoleInfo.prototype.GetTalentAddition = function (talent) {
        var ept_attr = { hp: 0, atk: 0, def: 0, atk_sp: 0, def_sp: 0 };
        var cfg_role = Template.role.get(this.role_id);
        if (!cfg_role) {
            return ept_attr;
        }
        var cfg_talent = Template.talent.get(talent);
        if (!cfg_talent) {
            return ept_attr;
        }
        var basic_grow = {
            hp: cfg_role.HpGrowth,
            atk: cfg_role.AtkGrowth,
            def: cfg_role.DefGrowth,
            atk_sp: cfg_role.AtkSpGrowth,
            def_sp: cfg_role.DefSpGrowth
        };
        var result = {};
        for (var prop in basic_grow) {
            result[prop] = (((this.lv - 1) / 1000.0) * basic_grow[prop] * (cfg_talent.TalentNum + cfg_role.Talent)) >> 0;
        }
        return result;
    };
    // endregion
    //预算觉醒属性delta 按照 血攻防技能攻防的顺序
    RoleInfo.prototype.GetNextAwakenAttrDeltaList = function () {
        /*var this_awaken_config = Template.awaken.get(this.awaken);
        if (this_awaken_config == null)
        {
            return null;
        }

        var next_config = Template.awaken.get(this.awaken + 1);
        if (next_config == null)
            return null;*/
        var role_config = Template.role.get(this.role_id);
        if (role_config == null)
            return null;
        var this_awaken_idx = this.awaken - role_config.AwakenID;
        var next_awaken_idx = this_awaken_idx + 1;
        if (this_awaken_idx < 0)
            this_awaken_idx = 0;
        if (next_awaken_idx >= role_config.AwakenRate.length)
            next_awaken_idx = role_config.AwakenRate.length - 1;
        var attr_id = [RoleAttrType.Max_HP, RoleAttrType.Atk, RoleAttrType.Def, RoleAttrType.Skill_Atk, RoleAttrType.Skill_Def];
        var attr_base = [role_config.Hp, role_config.Atk, role_config.Def, role_config.AtkSp, role_config.DefSp];
        var result = [];
        var delta_rate = role_config.AwakenRate[next_awaken_idx] - role_config.AwakenRate[this_awaken_idx];
        for (var i = 0; i < attr_id.length; ++i) {
            result.push((attr_base[i] * delta_rate / 1000) >> 0);
        }
        return result;
    };
    //当前觉醒属性delta 按照 血攻防技能攻防的顺序
    RoleInfo.prototype.GetCurAwakenAttrDeltaList = function () {
        /*var this_awaken_config = Template.awaken.get(this.awaken);
        if (this_awaken_config == null)
        {
            return null;
        }*/
        var role_config = Template.role.get(this.role_id);
        if (role_config == null)
            return null;
        var this_awaken_idx = this.awaken - role_config.AwakenID;
        if (this_awaken_idx < 0)
            this_awaken_idx = 0;
        if (this_awaken_idx >= role_config.AwakenRate.length)
            this_awaken_idx = role_config.AwakenRate.length - 1;
        var attr_id = [RoleAttrType.Max_HP, RoleAttrType.Atk, RoleAttrType.Def, RoleAttrType.Skill_Atk, RoleAttrType.Skill_Def];
        var attr_base = [role_config.Hp, role_config.Atk, role_config.Def, role_config.AtkSp, role_config.DefSp];
        var result = [];
        var cur_rate = role_config.AwakenRate[this_awaken_idx];
        for (var i = 0; i < attr_id.length; ++i) {
            result.push((attr_base[i] * cur_rate / 1000) >> 0);
        }
        return result;
    };
    /**
     * 计算战力差值
     * @param attr
     * @returns {number}
     */
    RoleInfo.CalcFightingDelta = function (attr) {
        if (!attr) {
            return 0;
        }
        // //斗士战斗力(部分) = 生命值 * 0.1 + ( 物理攻击+物理防御 ) * 0.6 + (特技攻击 + 特技防御 ) * 0.5
        return attr.hp * 0.1 + (attr.atk + attr.def) * 0.6 + (attr.atk_sp + attr.def_sp) * 0.5;
    };
    /**
     * 根据装备槽位获取角色装备
     * @param pos
     * @returns {null}
     */
    RoleInfo.prototype.getEquipByPos = function (pos) {
        for (var i = 0; i < this.equips.length; i++) {
            if (this.equips[i].pos == pos) {
                return this.equips[i];
            }
        }
        return;
    };
    /**
     * 根据装备Id获取角色装备
     * @param equip_id
     * @returns {any}
     */
    RoleInfo.prototype.getEquipById = function (equip_id) {
        for (var i = 0; i < this.equips.length; i++) {
            if (this.equips[i].equip_id == equip_id) {
                return this.equips[i];
            }
        }
        return;
    };
    /**
     * 获取某装备的已装备套装件数
     * @param equip_id
     * @returns {number}
     */
    RoleInfo.prototype.getSuitCount = function (equip_id) {
        var equip_info = Template.equip.get(equip_id);
        var count = 0;
        for (var i = 0; i < this.equips.length; i++) {
            for (var j = 0; j < equip_info.EquipSuit.length; j++) {
                if (this.equips[i].equip_id == equip_info.EquipSuit[j]) {
                    count++;
                    break;
                }
            }
        }
        return count;
    };
    /**
     * 检查是否可穿更好的装备
     * @returns {boolean}
     */
    RoleInfo.prototype.checkHasBetterEquip = function () {
        var equips = Singleton.Get(BagManager).m_equip_bag;
        for (var i = 0; i < equips.length; i++) {
            var item_info = Template.item.get(equips[i]);
            if (!item_info) {
                egret.error("no itemId: " + equips[i]);
                continue;
            }
            if (item_info.iType != ItemType.Equip) {
                continue;
            }
            var equip_info = Template.equip.get(equips[i]);
            if (!equip_info) {
                egret.error("no equipId: " + equips[i]);
                continue;
            }
            // 跳过首饰
            if (equip_info.Position < EquipPos.Weapon || equip_info.Position > EquipPos.Shoe) {
                continue;
            }
            var my_equip = this.getEquipByPos(equip_info.Position);
            if (!my_equip.equip_info) {
                return true;
            }
            var my_star = my_equip.item_info.iStar > 100 ? my_equip.item_info.iStar - 100 : my_equip.item_info.iStar;
            var new_star = item_info.iStar > 100 ? item_info.iStar - 100 : item_info.iStar;
            if (my_star != new_star) {
                if (my_star < new_star) {
                    return true;
                }
            }
            else {
                if (my_equip.item_info.iStar < item_info.iStar) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 检查是否有任意装备位空闲
     */
    RoleInfo.prototype.checkAnyEquipPosEmpty = function () {
        return this.checkEquipPosEmpty(EquipPos.Chest) || this.checkEquipPosEmpty(EquipPos.Leg) || this.checkEquipPosEmpty(EquipPos.Weapon) || this.checkEquipPosEmpty(EquipPos.Shoe);
    };
    /**
     * 检查装备位是否空闲
     */
    RoleInfo.prototype.checkEquipPosEmpty = function (pos) {
        var equip = this.getEquipByPos(pos);
        if (!equip || equip.equip_id <= 0) {
            return true; // 装备位空闲
        }
        return false; // 该位置上已经有装备了
    };
    /**
     * 检查空闲装备位是否可装备
     */
    RoleInfo.prototype.checkEmptyEquipChangable = function (pos) {
        if (!this.checkEquipPosEmpty(pos)) {
            return false; // 该位置上已经有装备了
        }
        var bag = Singleton.Get(BagManager);
        var pos_bag = bag.getEquipBagByPos(pos);
        if (!pos_bag || pos_bag.length <= 0) {
            return false; // 虽然该位置没有装备 但背包里也没有符合条件的装备
        }
        return;
    };
    /**
     * 检查装备是否可强化或精炼或附魔
     */
    RoleInfo.prototype.checkEquipUpAble = function () {
        return this.checkEquipStrengthAble() || this.checkEquipRefineAble() || this.checkEquipEnchantAble();
    };
    /**
     * 检查是否有装备可强化
     * @returns {boolean}
     */
    RoleInfo.prototype.checkEquipStrengthAble = function () {
        for (var i = 0; i < this.equips.length; i++) {
            var my_equip = this.equips[i];
            if (my_equip.equip_id <= 0) {
                continue;
            }
            if (this.equips[i].is_str_max) {
                continue;
            }
            var equipup_info = Template.equipup.get(my_equip.stg_lv);
            if (!equipup_info) {
                egret.error("no equipupId: " + my_equip.stg_lv);
            }
            var is_money_enough = Singleton.Get(PlayerInfoManager).getGold() >= equipup_info.BasicsGold;
            if (is_money_enough) {
                return true;
            }
        }
        return false;
    };
    /**
     * 检查是否有装备可精炼
     * @returns {boolean}
     */
    RoleInfo.prototype.checkEquipRefineAble = function () {
        if (!OpenManager.CheckOpen(OpenType.EquipRefine)) {
            return false;
        }
        for (var i = 0; i < this.equips.length; i++) {
            var my_equip = this.equips[i];
            if (my_equip.equip_id <= 0) {
                continue;
            }
            if (my_equip.is_refine_max) {
                continue;
            }
            var equipup_info = Template.equipup.get(my_equip.rfn_lv);
            if (!equipup_info) {
                egret.error("no equipupId: " + my_equip.rfn_lv);
            }
            var is_item_enough = true;
            for (var i_1 = 0; i_1 < equipup_info.RefineItem.length; i_1++) {
                var my_item_enough = Singleton.Get(BagManager).hasEnough(equipup_info.RefineItem[i_1], equipup_info.RefineItemNum[i_1]);
                if (!my_item_enough) {
                    is_item_enough = false;
                }
            }
            if (is_item_enough) {
                return true;
            }
        }
        return false;
    };
    /**
     * 检查是否有装备可附魔
     * @returns {boolean}
     */
    RoleInfo.prototype.checkEquipEnchantAble = function () {
        // 检查附魔是否开启
        if (!OpenManager.CheckOpen(OpenType.EquipEnchant)) {
            return false;
        }
        for (var i = 0; i < this.equips.length; i++) {
            // 是否有未附魔到满级的装备
            var my_equip = this.equips[i];
            if (!my_equip.is_enchant_max) {
                // 检查是否可突破 突破道具数量和等級
                if (my_equip.is_enchant_breachable) {
                    var need_breach_item = my_equip.enchant_breach_cost;
                    return Singleton.Get(BagManager).hasEnough(Template.config.EnchantBreach, need_breach_item) && my_equip.is_enchant_breachable_and_lv;
                }
                // 检查附魔材料 附魔材料数量
                if (Singleton.Get(BagManager).hasEnough(Template.config.EnchantItem, my_equip.enchant_levelup_cost)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 检查角色是否已装备任何装备
     */
    RoleInfo.prototype.hasAnyEquip = function () {
        if (!this.equips || this.equips.length <= 0) {
            return false;
        }
        for (var i = 0; i < this.equips.length; i++) {
            if (this.equips[i].equip_id > 0) {
                return true;
            }
        }
        return false;
    };
    // region 饰品
    RoleInfo.prototype.getJewelryByPos = function (pos) {
        for (var i = 0; i < this.jewelries.length; i++) {
            if (pos == this.jewelries[i].pos) {
                return this.jewelries[i];
            }
        }
        return undefined;
    };
    RoleInfo.prototype.checkJewelryAlarm = function () {
        return this.checkJewelryStrAble() || this.checkJewelryEvoAble();
    };
    RoleInfo.prototype.checkJewelryStrAble = function () {
        for (var i = 0; i < this.jewelries.length; i++) {
            if (this.jewelries[i].isStrAble()) {
                return true;
            }
        }
        return false;
    };
    RoleInfo.prototype.checkJewelryEvoAble = function () {
        for (var i = 0; i < this.jewelries.length; i++) {
            if (this.jewelries[i].isEvoAble()) {
                return true;
            }
        }
        return false;
    };
    // endregion
    RoleInfo.prototype.getTalentInfo = function () {
        return Template.talent.get(this.talent);
    };
    RoleInfo.prototype.getTalentNextInfo = function () {
        var res = Template.talent.get(this.talent + 1);
        if (!res) {
            return this.getTalentInfo();
        }
        return res;
    };
    RoleInfo.prototype.getAwakenInfo = function () {
        return Template.awaken.get(this.awaken);
    };
    RoleInfo.prototype.getBreachInfo = function () {
        return Template.breach.get(this.breach);
    };
    RoleInfo.prototype.getAwakenStar = function () {
        var role_info = Template.role.get(this.role_id);
        var awaken_info = Template.awaken.get(role_info.AwakenID);
        return awaken_info.AwakenStar;
    };
    RoleInfo.prototype.getAwakenActiveStar = function () {
        var role_info = Template.role.get(this.role_id);
        return Math.floor(this.getAwakenTimes() / 5);
    };
    RoleInfo.prototype.getAwakenTimes = function () {
        var role_entity = Template.role.get(this.role_id);
        return this.awaken - role_entity.AwakenID;
    };
    /**
     * 获取最终资质数值
     */
    RoleInfo.prototype.getTalentNum = function () {
        var role_info = Template.role.get(this.role_id);
        return role_info.Talent + this.getTalentInfo().TalentNum;
    };
    /**
     * 获取下级最终资质数值
     * @return {number}
     */
    RoleInfo.prototype.getTalentNumNext = function () {
        var role_info = Template.role.get(this.role_id);
        return role_info.Talent + this.getTalentNextInfo().TalentNum;
    };
    // region 装备饰品总等级
    RoleInfo.prototype.getAllEquipStr = function () {
        var count = 0;
        var equips = this.equips;
        for (var i = 0; i < this.equips.length; i++) {
            count += equips[i].stg_lv;
        }
        return count;
    };
    RoleInfo.prototype.getAllEquipRefine = function () {
        var count = 0;
        var equips = this.equips;
        for (var i = 0; i < this.equips.length; i++) {
            count += equips[i].rfn_lv;
        }
        return count;
    };
    RoleInfo.prototype.getAllEquipEnchant = function () {
        var count = 0;
        var equips = this.equips;
        for (var i = 0; i < this.equips.length; i++) {
            var lvs = equips[i].eht_lvs;
            for (var i_2 = 0; i_2 < lvs.length; i_2++) {
                count += lvs[i_2];
            }
        }
        return count;
    };
    // endregion
    // region 红点提示
    /**
     * 是否有可优化装备
     */
    RoleInfo.prototype.isEquipable = function () {
        return this.checkEquipUpAble() || this.checkHasBetterEquip();
    };
    // endregion
    // region 显示相关
    /**
     * 获取角色品质
     * @returns {number}
     */
    RoleInfo.prototype.getTier = function () {
        var role_info = Template.role.get(this.role_id);
        return role_info.Star;
    };
    return RoleInfo;
}());
__reflect(RoleInfo.prototype, "RoleInfo");
//# sourceMappingURL=RoleInfo.js.map