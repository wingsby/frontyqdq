/**
 * 角色数据对象
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var battle;
(function (battle) {
    var BattleSide;
    (function (BattleSide) {
        BattleSide[BattleSide["Null"] = 0] = "Null";
        BattleSide[BattleSide["Left"] = 1] = "Left";
        BattleSide[BattleSide["Right"] = 2] = "Right";
    })(BattleSide = battle.BattleSide || (battle.BattleSide = {}));
    var ActorLogic = (function () {
        /**
         * 构造函数
         */
        function ActorLogic() {
            this.m_gaming_id = 0;
            this.m_side = BattleSide.Null;
            this.m_pos = 0;
            this.m_is_alive = true;
            //场外基础计算部分=========
            /*public m_max_hp: number = 0;
            public m_atk: number = 0;
            public m_def: number = 0;
            public m_skill_atk: number = 0;
            public m_skill_def: number = 0;
            public m_crit_rate: number = 0;
            public m_crit_damage: number = 0;
            public m_damage_reduce: number = 0;
            public m_vampire: number = 0;
            public m_combo: number = 0;
            public m_sp_ignore: number = 0;
            public m_debuff_res: number = 0;*/
            //=========
            this.m_base_id = 0;
            this.m_skill_id = 0;
            this.m_r_inf = null;
            this.m_current_hp = 0;
            this.m_current_rage = 0;
            this.m_current_target = -1;
            this.m_command_list = [];
            this.m_buff_list = [];
            this.dps = 0; // 秒伤
            this.t_dmg = 0; // 总伤害
            this.d_rate = 0; // 伤害百分比，精度2，要除100
        }
        ActorLogic.prototype.HasAttackCmd = function () {
            for (var i = 0; i < this.m_command_list.length; ++i) {
                if (this.m_command_list[i].m_action_type == battle.BattleCommandType.Attack) {
                    return this.m_command_list[i];
                }
            }
            return null;
        };
        ActorLogic.prototype.AddAllSkillCmdSeachTime = function () {
            for (var i = 0; i < this.m_command_list.length; ++i) {
                if (this.m_command_list[i].m_action_type == battle.BattleCommandType.Attack) {
                    this.m_command_list[i].m_step += Template.config.addspeed;
                }
            }
        };
        ActorLogic.prototype.GetClosestCmdStep = function () {
            var mim_step = Template.config.battlelimit;
            this.m_command_list.forEach(function (c) {
                if (c.m_step < mim_step) {
                    mim_step = c.m_step;
                }
            });
            return mim_step;
        };
        ActorLogic.prototype.HasBuffSpType = function (buff_sp_type) {
            for (var i = 0; i < this.m_buff_list.length; ++i) {
                var b = this.m_buff_list[i];
                var c = Template.buff.get(b.id);
                if (c != null && c.SpecialTp == buff_sp_type) {
                    return true;
                }
            }
            return false;
        };
        ActorLogic.prototype.GetFinalAttr = function (attr_type, skill, skill_lv) {
            var log = "" + this.m_gaming_id + " " + this.m_r_inf.role_id + " GetFinalAttr attID:" + attr_type;
            var char_value = 0;
            var result = 0;
            switch (attr_type) {
                case RoleAttrType.Atk:
                    char_value = this.m_r_inf.atk;
                    log += " BasicDef:" + char_value;
                    //var b:Entity.Skill = Template.skill.get(this.m_base_id);
                    if (skill != null) {
                        var ji_neng_bei_lv = skill.DamageRate + skill.DamageLv * (skill_lv - 1);
                        log += " SpRate:" + ji_neng_bei_lv;
                        var ji_neng_jia_cheng = skill.Damage + skill.DamageLv * (skill_lv - 1);
                        log += " SpAddtion:" + ji_neng_jia_cheng;
                        result = (char_value * ji_neng_bei_lv / 1000 + ji_neng_jia_cheng) >> 0;
                    }
                    break;
                case RoleAttrType.Skill_Atk:
                    char_value = this.m_r_inf.skill_atk;
                    log += " BasicSp:" + char_value;
                    //var s:Entity.Skill = Template.skill.get(this.m_skill_id);
                    if (skill != null) {
                        var ji_neng_bei_lv = skill.DamageRate + skill.DamageLv * (skill_lv - 1);
                        log += " SpRate:" + ji_neng_bei_lv;
                        var ji_neng_jia_cheng = skill.Damage + skill.DamageLv * (skill_lv - 1);
                        log += " SpAddtion:" + ji_neng_jia_cheng;
                        result = (char_value * ji_neng_bei_lv / 1000 + ji_neng_jia_cheng) >> 0;
                    }
                    break;
                case RoleAttrType.Def:
                    char_value = this.m_r_inf.def;
                    log += " Def:" + char_value;
                    result = char_value;
                    break;
                case RoleAttrType.Skill_Def:
                    char_value = this.m_r_inf.skill_def;
                    log += " DefSp:" + char_value;
                    result = char_value;
                    break;
                case RoleAttrType.Atk_Speed:
                    char_value = this.m_r_inf.atk_speed;
                    result = char_value;
                    break;
                case RoleAttrType.Crit_Rate:
                    char_value = this.m_r_inf.crit_rate;
                    log += " CriRate:" + char_value;
                    result = char_value;
                    break;
                case RoleAttrType.Crit_Damage:
                    char_value = this.m_r_inf.crit_damage;
                    log += " CriDamage:" + char_value;
                    result = char_value;
                    break;
                case RoleAttrType.Damage_Reduce:
                    char_value = this.m_r_inf.dmg_reduce;
                    log += " DamageRes:" + char_value;
                    result = char_value;
                    break;
                case RoleAttrType.Vampire:
                    char_value = this.m_r_inf.vampire;
                    result = char_value;
                    break;
                case RoleAttrType.Combo:
                    char_value = this.m_r_inf.combo;
                    result = char_value;
                    break;
                case RoleAttrType.Sp_Ignore:
                    char_value = this.m_r_inf.sp_ignore;
                    log += " SpIgnore:" + char_value;
                    result = char_value;
                    break;
                case RoleAttrType.Debuff_Res:
                    char_value = this.m_r_inf.debuff_res;
                    log += " DebuffRes:" + char_value;
                    result = char_value;
                    break;
            }
            var temp = this.BuffCal(char_value, attr_type);
            log += " Buff:" + temp;
            console.log(log);
            result += temp;
            return result;
        };
        ActorLogic.prototype.BuffCal = function (char_value, attr_type) {
            var result = 0;
            var has_buff = false;
            //先乘法
            for (var i = 0; i < this.m_buff_list.length; ++i) {
                var b = this.m_buff_list[i];
                var c = Template.buff.get(b.id);
                if (null == c)
                    continue;
                if (c.Calculate != battle.BuffCalcType.Multiply)
                    continue;
                for (var j = 0; j < c.Property.length; ++j) {
                    if (c.Property[j] != attr_type)
                        continue;
                    has_buff = true;
                    char_value = this.BuffCalc_Multiply(char_value, c.Value[j], b.lv, c.LvValue[j], b.stack);
                }
            }
            if (has_buff)
                result += char_value;
            //后加法
            for (var i = 0; i < this.m_buff_list.length; ++i) {
                var b = this.m_buff_list[i];
                var c = Template.buff.get(b.id);
                if (null == c)
                    continue;
                if (c.Calculate != battle.BuffCalcType.Add)
                    continue;
                for (var j = 0; j < c.Property.length; ++j) {
                    if (c.Property[j] != attr_type)
                        continue;
                    result += this.BuffCalc_Add(c.Value[j], b.lv, c.LvValue[j], b.stack);
                }
            }
            return result;
        };
        //属性的乘法运算
        ActorLogic.prototype.BuffCalc_Multiply = function (char_value, buff_base, buff_lv, buff_lv_value, stack) {
            //状态加成 = 角色属性 × （基础加成 + （状态等级-1） * 等级成长） *　状态层数  /1000
            return char_value * (buff_base + (buff_lv - 1) * buff_lv_value) * stack / 1000;
        };
        //属性的加法运算
        ActorLogic.prototype.BuffCalc_Add = function (buff_base, buff_lv, buff_lv_value, stack) {
            //状态加成 =（基础加成 + （状态等级-1） * 等级成长） *　状态层数 
            return (buff_base + (buff_lv - 1) * buff_lv_value) * stack;
        };
        ActorLogic.prototype.LittleClone = function () {
            var result = new ActorLogic();
            result.m_current_hp = this.m_current_hp;
            result.m_current_target = this.m_current_rage;
            result.m_gaming_id = this.m_gaming_id;
            result.m_is_alive = this.m_is_alive;
            result.m_side = this.m_side;
            result.m_pos = this.m_pos;
            result.m_base_id = this.m_base_id;
            result.m_skill_id = this.m_skill_id;
            /*result.m_max_hp = this.m_max_hp;
            result.m_atk = this.m_atk;
            result.m_def = this.m_def;
            result.m_skill_atk = this.m_skill_atk;
            result.m_skill_def = this.m_skill_def;
            result.m_crit_rate = this.m_crit_rate;
            result.m_atk_speed = this.m_atk_speed;

            result.m_crit_damage = this.m_crit_damage;
            result.m_damage_reduce = this.m_damage_reduce;
            result.m_vampire = this.m_vampire;
            result.m_combo = this.m_combo;
            result.m_sp_ignore = this.m_sp_ignore;
            result.m_debuff_res = this.m_debuff_res;*/
            result.m_current_target = this.m_current_target;
            result.m_r_inf = this.m_r_inf.Clone();
            this.m_command_list.forEach(function (b) {
                result.m_command_list.push(b.Clone());
            });
            this.m_buff_list.forEach(function (b) {
                result.m_buff_list.push(b.Clone());
            });
            return result;
        };
        return ActorLogic;
    }());
    battle.ActorLogic = ActorLogic;
    __reflect(ActorLogic.prototype, "battle.ActorLogic");
})(battle || (battle = {}));
//# sourceMappingURL=ActorLogic.js.map