var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var battle;
(function (battle) {
    var BattleType;
    (function (BattleType) {
        BattleType[BattleType["Null"] = 0] = "Null";
        BattleType[BattleType["LEVEL_NORMAL"] = 1] = "LEVEL_NORMAL";
        BattleType[BattleType["LEVEL_BOSS"] = 2] = "LEVEL_BOSS";
        BattleType[BattleType["ARENA"] = 3] = "ARENA";
        BattleType[BattleType["DUEL"] = 4] = "DUEL";
        BattleType[BattleType["DUEL_FIRST"] = 5] = "DUEL_FIRST";
        BattleType[BattleType["GUILD"] = 6] = "GUILD";
        BattleType[BattleType["SEND_ROB"] = 7] = "SEND_ROB";
        BattleType[BattleType["SEND_LOG"] = 8] = "SEND_LOG"; // 外派日志
    })(BattleType = battle.BattleType || (battle.BattleType = {}));
    var BattleCommandType;
    (function (BattleCommandType) {
        BattleCommandType[BattleCommandType["Null"] = 0] = "Null";
        BattleCommandType[BattleCommandType["Search"] = 1] = "Search";
        BattleCommandType[BattleCommandType["Attack"] = 2] = "Attack";
        BattleCommandType[BattleCommandType["Die"] = 3] = "Die";
        BattleCommandType[BattleCommandType["GameOver"] = 4] = "GameOver";
        BattleCommandType[BattleCommandType["AddBuff"] = 5] = "AddBuff";
        BattleCommandType[BattleCommandType["RemoveBuff"] = 6] = "RemoveBuff";
        BattleCommandType[BattleCommandType["BuffHit"] = 7] = "BuffHit"; //7 持续伤害 参数格式： 0-buff的id， 1-伤害剩余次数（包括本次，扣掉本次为0的话就不生成下一次了）2-本次伤害数值
    })(BattleCommandType = battle.BattleCommandType || (battle.BattleCommandType = {}));
    var BattleCommand = (function () {
        function BattleCommand() {
            this.m_step = 0;
            this.m_action_type = BattleCommandType.Null;
            this.m_action_args = [];
        }
        BattleCommand.prototype.Clone = function () {
            var result = new BattleCommand();
            result.m_step = this.m_step;
            result.m_action_type = this.m_action_type;
            this.m_action_args.forEach(function (i) {
                result.m_action_args.push(i);
            });
            return result;
        };
        return BattleCommand;
    }());
    battle.BattleCommand = BattleCommand;
    __reflect(BattleCommand.prototype, "battle.BattleCommand");
    var ScriptElement = (function () {
        function ScriptElement() {
            this.m_gaming_id = 0;
            this.m_cmd_list = [];
        }
        return ScriptElement;
    }());
    battle.ScriptElement = ScriptElement;
    __reflect(ScriptElement.prototype, "battle.ScriptElement");
    var BattlePack = (function () {
        function BattlePack() {
            //public m_actors_data:Dictionary<number, ActorLogic> = new Dictionary<number, ActorLogic>();
            this.m_actors_data = [];
            this.m_actors_script = [];
            this.m_result = 0; // 0-左边输了， 1-左边赢了
            this.m_battle_type = 0; //战斗类型，是否boss战
            this.m_search_time = 0; //搜索时段的时长，毫秒
            this.m_max_step = 0; //战斗时长上限
            this.left_all_hp = 0;
            this.right_all_hp = 0;
            this.l_dead = 0; // 左方阵亡人数
            this.r_dead = 0; // 右方阵亡人数
        }
        ;
        return BattlePack;
    }());
    battle.BattlePack = BattlePack;
    __reflect(BattlePack.prototype, "battle.BattlePack");
    var SkillType;
    (function (SkillType) {
        SkillType[SkillType["Null"] = 0] = "Null";
        SkillType[SkillType["Active"] = 1] = "Active";
        SkillType[SkillType["Passive"] = 2] = "Passive"; //被动技能
    })(SkillType = battle.SkillType || (battle.SkillType = {}));
    var SkillTarget;
    (function (SkillTarget) {
        SkillTarget[SkillTarget["Null"] = 0] = "Null";
        SkillTarget[SkillTarget["Self"] = 1] = "Self";
        SkillTarget[SkillTarget["SingleEnemy"] = 2] = "SingleEnemy";
        SkillTarget[SkillTarget["RandomEnemy"] = 3] = "RandomEnemy";
        SkillTarget[SkillTarget["AllEnemy"] = 4] = "AllEnemy";
        SkillTarget[SkillTarget["AllFriendly"] = 5] = "AllFriendly";
        SkillTarget[SkillTarget["LowHpEnemy"] = 6] = "LowHpEnemy";
        SkillTarget[SkillTarget["Special"] = 7] = "Special";
        SkillTarget[SkillTarget["LowHpSelf"] = 8] = "LowHpSelf";
        SkillTarget[SkillTarget["ZhaoyunSkill"] = 9] = "ZhaoyunSkill";
    })(SkillTarget = battle.SkillTarget || (battle.SkillTarget = {}));
    var SkillDmgType;
    (function (SkillDmgType) {
        SkillDmgType[SkillDmgType["Null"] = 0] = "Null";
        SkillDmgType[SkillDmgType["Heal"] = 1] = "Heal";
        SkillDmgType[SkillDmgType["Base"] = 2] = "Base";
        SkillDmgType[SkillDmgType["Skill"] = 3] = "Skill";
        SkillDmgType[SkillDmgType["Fixed"] = 4] = "Fixed";
    })(SkillDmgType = battle.SkillDmgType || (battle.SkillDmgType = {}));
    var BuffInfo = (function () {
        function BuffInfo() {
            this.id = 0;
            this.end_step = 0;
            this.stack = 0;
            this.special_type = 0;
        }
        BuffInfo.prototype.Clone = function () {
            var r = new BuffInfo();
            r.id = this.id;
            r.end_step = this.end_step;
            r.stack = this.stack;
            r.special_type = this.special_type;
            r.lv = this.lv;
            return r;
        };
        return BuffInfo;
    }());
    battle.BuffInfo = BuffInfo;
    __reflect(BuffInfo.prototype, "battle.BuffInfo");
    var BuffCalcType;
    (function (BuffCalcType) {
        BuffCalcType[BuffCalcType["Null"] = 0] = "Null";
        BuffCalcType[BuffCalcType["Add"] = 1] = "Add";
        BuffCalcType[BuffCalcType["Multiply"] = 2] = "Multiply";
    })(BuffCalcType = battle.BuffCalcType || (battle.BuffCalcType = {}));
    var BuffCoverType;
    (function (BuffCoverType) {
        BuffCoverType[BuffCoverType["Null"] = 0] = "Null";
        BuffCoverType[BuffCoverType["Replace"] = 1] = "Replace";
        BuffCoverType[BuffCoverType["AddUP"] = 2] = "AddUP"; //叠加， 层数加1，但不超过上限
    })(BuffCoverType = battle.BuffCoverType || (battle.BuffCoverType = {}));
    var BuffSpType;
    (function (BuffSpType) {
        BuffSpType[BuffSpType["Null"] = 0] = "Null";
        BuffSpType[BuffSpType["Dizzy"] = 1] = "Dizzy";
        BuffSpType[BuffSpType["Silent"] = 2] = "Silent";
        BuffSpType[BuffSpType["SpecialTarget"] = 3] = "SpecialTarget";
        BuffSpType[BuffSpType["CantHeal"] = 4] = "CantHeal"; //不能回血
    })(BuffSpType = battle.BuffSpType || (battle.BuffSpType = {}));
    var DmgResult = (function () {
        function DmgResult() {
            this.is_crit = 0; // 0- 不是 ， 1-是
        }
        return DmgResult;
    }());
    __reflect(DmgResult.prototype, "DmgResult");
    var CommandCenter = (function () {
        function CommandCenter() {
        }
        CommandCenter.SubjectAddNextSearch = function (subject, old_cmd, now, sim) {
            var new_target = sim.SearchTargetGamingId(subject.m_pos, subject.m_side);
            if (new_target != -1) {
                var new_seach_cmd = new BattleCommand();
                new_seach_cmd.m_step = now + 1;
                new_seach_cmd.m_action_type = BattleCommandType.Search;
                new_seach_cmd.m_action_args = [new_target];
                subject.m_command_list.push(new_seach_cmd);
                old_cmd.m_action_args = [new_target];
                subject.m_command_list.push(old_cmd);
            }
        };
        CommandCenter.SubjectAddNextAtk = function (subject, target, now) {
            var next_atk = new BattleCommand();
            next_atk.m_step = now + subject.m_r_inf.atk_speed;
            next_atk.m_action_type = BattleCommandType.Attack;
            next_atk.m_action_args.push(target.m_gaming_id);
            subject.m_command_list.push(next_atk);
        };
        CommandCenter.ProcessCmd = function (subject, cmd, now, old_cmd, sim) {
            if (subject && subject.m_is_alive && cmd) {
                switch (cmd.m_action_type) {
                    case BattleCommandType.Search:
                        if (subject.m_current_target == cmd.m_action_args[0]) {
                            break;
                        }
                        if (subject.HasBuffSpType(BuffSpType.Dizzy))
                            break;
                        var old_atk_cmd = null;
                        subject.m_current_target = cmd.m_action_args[0];
                        old_cmd.forEach(function (o) {
                            if (o.m_action_type == BattleCommandType.Attack) {
                                old_atk_cmd = o;
                            }
                        });
                        if (!old_atk_cmd) {
                            old_atk_cmd = new BattleCommand();
                            old_atk_cmd.m_action_type = BattleCommandType.Attack;
                            old_atk_cmd.m_step = now + subject.m_r_inf.atk_speed;
                            old_atk_cmd.m_action_args.push(cmd.m_action_args[0]);
                            subject.m_command_list.push(old_atk_cmd);
                        }
                        else {
                            old_atk_cmd.m_action_args[0] = cmd.m_action_args[0];
                            old_atk_cmd.m_step += Template.config.addspeed;
                        }
                        sim.Write(subject.m_gaming_id, cmd);
                        break;
                    case BattleCommandType.Attack:
                        CommandCenter.ProcessAttackCmd(subject, cmd, now, old_cmd, sim);
                        break;
                    case BattleCommandType.Die:
                        if (subject.m_current_hp <= 0) {
                            subject.m_is_alive = false;
                            sim.Write(subject.m_gaming_id, cmd);
                        }
                        break;
                    case BattleCommandType.AddBuff:
                        CommandCenter.ProcessAddBuffCmd(subject, cmd, now, old_cmd, sim);
                        break;
                    case BattleCommandType.RemoveBuff:
                        var buff_id = cmd.m_action_args[0];
                        var buff_config = Template.buff.get(buff_id);
                        if (buff_config == null)
                            break;
                        for (var i = 0; i < subject.m_buff_list.length; ++i) {
                            if (subject.m_buff_list[i].id == buff_id) {
                                subject.m_buff_list.splice(i, 1);
                                sim.Write(subject.m_gaming_id, cmd);
                                if (buff_config.SpecialTp == BuffSpType.Dizzy
                                    && !subject.HasBuffSpType(BuffSpType.Dizzy)) {
                                    CommandCenter.FindNewTarget(subject, now, sim);
                                }
                                break;
                            }
                        }
                        break;
                    case BattleCommandType.BuffHit:
                        CommandCenter.ProcessBuffHitCmd(subject, cmd, now, sim);
                        break;
                }
            }
        };
        CommandCenter.ProcessBuffHitCmd = function (subject, cmd, now, sim) {
            var buff_id = cmd.m_action_args[0];
            var buff_config = Template.buff.get(buff_id);
            if (buff_config == null)
                return;
            var count = cmd.m_action_args[0];
            if (count <= 0)
                return;
            var found = null;
            for (var i = 0; i < subject.m_buff_list.length; ++i) {
                var b = subject.m_buff_list[i];
                if (b.id == buff_id) {
                    found = b;
                    break;
                }
            }
            if (found == null)
                return;
            //计算伤害
            var hp = (buff_config.TickDamage + (found.lv - 1) * buff_config.TickDamageLv * found.stack) >> 0;
            subject.m_current_hp -= hp;
            if (subject.m_current_hp <= 0) {
                CommandCenter.SomeOneDying(subject, now, sim);
            }
            else if (count > 1) {
                var new_cmd = cmd.Clone();
                new_cmd.m_action_args[1] = count - 1;
                new_cmd.m_step = now + buff_config.TickTime;
                subject.m_command_list.push(new_cmd);
            }
            cmd.m_action_args.push(hp);
            sim.Write(subject.m_gaming_id, cmd);
        };
        CommandCenter.ProcessAddBuffCmd = function (subject, cmd, now, old_cmd, sim) {
            var old_atk_cmd = null;
            var buff_id = cmd.m_action_args[0];
            var buff_config = Template.buff.get(buff_id);
            if (buff_config == null)
                return;
            sim.Write(subject.m_gaming_id, cmd);
            old_cmd.forEach(function (o) {
                if (o.m_action_type == BattleCommandType.RemoveBuff
                    && o.m_action_args[0] == buff_id) {
                    old_atk_cmd = o;
                }
            });
            if (old_atk_cmd == null) {
                old_atk_cmd = new BattleCommand();
                old_atk_cmd.m_action_type = BattleCommandType.RemoveBuff;
                old_atk_cmd.m_step = now + buff_config.Time;
                old_atk_cmd.m_action_args.push(buff_id);
                subject.m_command_list.push(old_atk_cmd);
            }
            else {
                old_atk_cmd.m_step = now + buff_config.Time;
            }
            var has_same = false;
            for (var i = 0; i < subject.m_buff_list.length; ++i) {
                if (subject.m_buff_list[i].id == buff_id) {
                    has_same = true;
                    subject.m_buff_list[i].lv = cmd.m_action_args[1];
                    if (buff_config.CoverTp == BuffCoverType.AddUP
                        && subject.m_buff_list[i].stack < buff_config.MaxStack) {
                        subject.m_buff_list[i].stack++;
                    }
                    break;
                }
            }
            if (!has_same) {
                var new_buff = new BuffInfo();
                new_buff.id = buff_id;
                new_buff.stack = 1;
                new_buff.lv = cmd.m_action_args[1];
                subject.m_buff_list.push(new_buff);
                //眩晕，需要清空身上的搜索和攻击指令
                if (buff_config.SpecialTp == BuffSpType.Dizzy) {
                    console.log("id " + subject.m_gaming_id + "is dizzy.");
                    subject.m_current_target = -1;
                    var cmd_list = [];
                    for (var i = 0; i < subject.m_command_list.length; ++i) {
                        var c = subject.m_command_list[i];
                        if (c.m_action_type != BattleCommandType.Search
                            && c.m_action_type != BattleCommandType.Attack) {
                            cmd_list.push(c);
                        }
                    }
                    subject.m_command_list = cmd_list;
                }
            }
        };
        CommandCenter.ProcessAttackCmd = function (subject, cmd, now, old_cmd, sim) {
            if (subject.HasBuffSpType(BuffSpType.Dizzy))
                return;
            var is_use_skill = subject.m_current_rage >= Template.config.rageMax;
            if (is_use_skill == true && subject.HasBuffSpType(BuffSpType.Silent)) {
                is_use_skill = false;
            }
            var skill = Template.skill.get(is_use_skill ? subject.m_skill_id : subject.m_base_id);
            if (skill == null)
                return;
            var main_target = sim.GetActor(cmd.m_action_args[0]);
            if (!main_target.m_is_alive) {
                CommandCenter.SubjectAddNextSearch(subject, cmd, now, sim);
                return;
            }
            //主语怒气
            if (is_use_skill) {
                subject.m_current_rage = 0;
            }
            else {
                subject.m_current_rage += Template.config.rageAtk;
                subject.m_current_rage = Math.min(subject.m_current_rage, Template.config.rageMax);
            }
            cmd.m_action_args.push(skill.ID);
            //查找击中目标
            var hit_targets = [];
            switch (skill.TargeTp) {
                case SkillTarget.Self:
                    hit_targets.push(subject);
                    break;
                case SkillTarget.RandomEnemy:
                    var random_count = skill.TargetRate;
                    var alive = [];
                    for (var i = 0; i < sim.m_all_actors_logic.values.length; ++i) {
                        var a = sim.m_all_actors_logic.values[i];
                        if (!a.m_is_alive || a.m_side == subject.m_side)
                            continue;
                        alive.push(a);
                    }
                    if (random_count > alive.length) {
                        random_count = alive.length;
                    }
                    for (var i = 0; i < random_count; ++i) {
                        var index = (Math.random() * random_count - i) >> 0;
                        hit_targets.push(alive[index]);
                        alive[index] = alive[random_count - i - 1];
                    }
                    break;
                case SkillTarget.AllEnemy:
                    for (var i = 0; i < sim.m_all_actors_logic.values.length; ++i) {
                        var a = sim.m_all_actors_logic.values[i];
                        if (!a.m_is_alive || a.m_side == subject.m_side)
                            continue;
                        hit_targets.push(a);
                    }
                    break;
                case SkillTarget.AllFriendly:
                    for (var i = 0; i < sim.m_all_actors_logic.values.length; ++i) {
                        var a = sim.m_all_actors_logic.values[i];
                        if (!a.m_is_alive || a.m_side != subject.m_side)
                            continue;
                        hit_targets.push(a);
                    }
                    break;
                case SkillTarget.SingleEnemy:
                default:
                    hit_targets.push(main_target);
                    break;
            }
            //自我加buf
            for (var i = 0; i < skill.BuffSelf.length; ++i) {
                var b = Template.buff.get(skill.BuffSelf[i]);
                if (b == null)
                    continue;
                if (b.Time <= 0)
                    continue;
                var add_cmd = new BattleCommand();
                add_cmd.m_step = now + 1;
                add_cmd.m_action_type = BattleCommandType.AddBuff;
                add_cmd.m_action_args.push(b.ID);
                add_cmd.m_action_args.push(is_use_skill ? subject.m_r_inf.skill_lv : subject.m_r_inf.base_lv);
                subject.m_command_list.push(add_cmd);
            }
            //计算伤害
            for (var i = 0; i < hit_targets.length; ++i) {
                var t = hit_targets[i];
                //todo 根据技能伤害类型和目标的数值，计算扣的血量，计算状态变化等
                //int hp = CalcDmg    
                var dmg_re = CommandCenter.CalcDmg(subject, t, skill, is_use_skill);
                cmd.m_action_args.push(t.m_gaming_id);
                cmd.m_action_args.push(dmg_re.hp);
                cmd.m_action_args.push(dmg_re.is_crit);
                t.m_current_hp -= dmg_re.hp; //加血的话hp是负数
                t.m_current_rage += Template.config.rageBehit;
                t.m_current_rage = Math.min(t.m_current_rage, Template.config.rageMax);
                if (t.m_current_hp <= 0) {
                    CommandCenter.SomeOneDying(t, now, sim);
                }
                else {
                    //对于还活着的人，状态命令的插入
                    CommandCenter.CalcAddBuff(subject, t, skill, is_use_skill, now);
                }
            }
            sim.Write(subject.m_gaming_id, cmd);
            //直接目标没死，继续打它
            if (main_target.m_current_hp > 0) {
                CommandCenter.SubjectAddNextAtk(subject, main_target, now);
            }
        };
        CommandCenter.SomeOneDying = function (t, now, sim) {
            t.m_current_hp = 0;
            var die_cmd = new BattleCommand();
            die_cmd.m_step = now + 1;
            die_cmd.m_action_type = BattleCommandType.Die;
            t.m_command_list.push(die_cmd);
            //他死了，则换所有正在打他的人的目标
            var old_enemy = sim.GetActorsAllEnemey(t.m_gaming_id);
            if (old_enemy != null && old_enemy.length > 0) {
                for (var o = 0; o < old_enemy.length; ++o) {
                    var a = old_enemy[o];
                    CommandCenter.FindNewTarget(a, now, sim);
                }
            }
        };
        CommandCenter.FindNewTarget = function (a, now, sim) {
            var new_target = sim.SearchTargetGamingId(a.m_pos, a.m_side);
            {
                if (new_target != -1) {
                    var new_seach_cmd = new BattleCommand();
                    new_seach_cmd.m_step = now + 1;
                    new_seach_cmd.m_action_type = BattleCommandType.Search;
                    new_seach_cmd.m_action_args.push(new_target);
                    a.m_command_list.push(new_seach_cmd);
                }
            }
        };
        CommandCenter.CalcDmg = function (subject, target, skill, is_skill) {
            console.log("===================begin========");
            var log = "ClacDmg: ";
            var result = new DmgResult();
            switch (skill.DamageType) {
                case SkillDmgType.Fixed:
                    log += "Fixed, ";
                    result.hp = (skill.Damage + skill.DamageLv * (is_skill ? subject.m_r_inf.skill_lv : subject.m_r_inf.base_lv)) >> 0;
                    result.hp = result.hp < 1 ? 1 : result.hp;
                    break;
                case SkillDmgType.Heal:
                    log += "Heal, ";
                    result.hp = subject.GetFinalAttr(RoleAttrType.Skill_Atk, skill, is_skill ? subject.m_r_inf.skill_lv : subject.m_r_inf.base_lv);
                    result.hp *= -1;
                    result.hp = result.hp > -1 ? -1 : result.hp;
                    break;
                case SkillDmgType.Skill:
                    log += "Skill, ";
                    var dmg = subject.GetFinalAttr(RoleAttrType.Skill_Atk, skill, is_skill ? subject.m_r_inf.skill_lv : subject.m_r_inf.base_lv);
                    result.hp = (dmg * (1000 - (target.GetFinalAttr(RoleAttrType.Skill_Def) - subject.GetFinalAttr(RoleAttrType.Sp_Ignore))) / 1000) >> 0;
                    result.hp = result.hp < 1 ? 1 : result.hp;
                    break;
                case SkillDmgType.Base:
                default:
                    log += "Base, ";
                    var is_crit = Math.random() < (subject.GetFinalAttr(RoleAttrType.Crit_Rate) / 1000.0);
                    var subject_dmg = subject.GetFinalAttr(RoleAttrType.Atk, skill, is_skill ? subject.m_r_inf.skill_lv : subject.m_r_inf.base_lv);
                    var ten_percent = Math.floor(subject_dmg * 0.1) >> 0;
                    var delta_force = subject_dmg - target.GetFinalAttr(RoleAttrType.Def);
                    if (delta_force < ten_percent) {
                        result.hp = ten_percent;
                    }
                    else {
                        var c = Template.role.get(target.m_r_inf.role_id);
                        result.hp = delta_force * (1000 - c.DamageReduce) / 1000;
                    }
                    if (is_crit) {
                        result.is_crit = 1;
                        var c = Template.role.get(subject.m_r_inf.role_id);
                        result.hp *= c.CritDamage / 1000;
                    }
                    result.hp = result.hp >> 0;
                    result.hp = result.hp < 1 ? 1 : result.hp;
                    break;
            }
            if (result.hp > 0 && target.m_current_hp - result.hp < 0) {
                result.hp = target.m_current_hp;
            }
            else if (result.hp < 0 && target.m_current_hp - result.hp > target.m_r_inf.max_hp) {
                result.hp = target.m_current_hp - target.m_r_inf.max_hp;
            }
            log += "Attacker: " + subject.m_gaming_id + " " + subject.m_r_inf.role_id + " Defender: " + target.m_gaming_id + " " + target.m_r_inf.role_id + " Skill: " + skill.ID + " Dmg: " + result;
            console.log(log);
            console.log("===================end========");
            return result;
        };
        CommandCenter.CalcAddBuff = function (subject, target, skill, is_skill, now) {
            var def = target.GetFinalAttr(RoleAttrType.Debuff_Res);
            var lv = is_skill ? subject.m_r_inf.skill_lv : subject.m_r_inf.base_lv;
            for (var i = 0; i < skill.Buff.length; ++i) {
                var hit = (skill.BuffHit[i] + (lv - 1) * skill.BuffLv[i] - def) / 1000.0;
                if (hit < Math.random())
                    continue;
                var b = Template.buff.get(skill.Buff[i]);
                if (b == null)
                    continue;
                if (b.Time <= 0)
                    continue;
                var add_cmd = new BattleCommand();
                add_cmd.m_step = now + 1;
                add_cmd.m_action_type = BattleCommandType.AddBuff;
                add_cmd.m_action_args.push(b.ID);
                add_cmd.m_action_args.push(lv);
                target.m_command_list.push(add_cmd);
                //检查是否是持续伤害
                if (b.TickDamage > 0) {
                    var hit_count = b.Time / b.TickTime;
                    if (hit_count > 0) {
                        var hit_cmd = null;
                        for (var o_i = 0; o_i < target.m_command_list.length; ++o_i) {
                            var old = target.m_command_list[o_i];
                            if (old.m_action_type == BattleCommandType.BuffHit
                                && old.m_action_args[0] == b.ID) {
                                hit_cmd = old;
                                hit_cmd.m_step = now + 1 + b.TickTime;
                                //注意，是替换次数
                                hit_cmd.m_action_args[1] = hit_count;
                                break;
                            }
                        }
                        if (hit_cmd == null) {
                            hit_cmd = new BattleCommand();
                            hit_cmd.m_step = now + 1 + b.TickTime;
                            hit_cmd.m_action_type = BattleCommandType.BuffHit;
                            hit_cmd.m_action_args.push(b.ID);
                            hit_cmd.m_action_args.push(hit_count);
                            target.m_command_list.push(hit_cmd);
                        }
                    }
                }
            }
        };
        return CommandCenter;
    }());
    battle.CommandCenter = CommandCenter;
    __reflect(CommandCenter.prototype, "battle.CommandCenter");
    var BattleSimulator = (function () {
        function BattleSimulator() {
            this.m_current_step = 0;
            this.m_all_actors_logic = new Dictionary();
            this.m_battle_type = 0; //战斗类型，是否boss战
            this.m_search_time = 0; //搜索时段的时长，毫秒
            this.m_max_step = 0;
            this.m_min_step = 0;
        }
        BattleSimulator.prototype.GetActor = function (id) {
            return this.m_all_actors_logic.get(id);
        };
        BattleSimulator.prototype.GetActorsAllEnemey = function (id) {
            var result = [];
            this.m_all_actors_logic.values.forEach(function (a) {
                if (a.m_is_alive && a.m_current_target == id) {
                    result.push(a);
                }
            });
            return result;
        };
        BattleSimulator.prototype.Exe = function () {
            var result = new BattlePack();
            this.Ready();
            result.m_battle_type = this.m_battle_type;
            result.m_max_step = this.m_max_step;
            result.m_search_time = this.m_search_time;
            this.m_all_actors_logic.values.forEach(function (a) {
                result.m_actors_data.push(a.LittleClone());
            });
            var now = Date.now();
            console.log(now);
            this.Go();
            var t = Date.now();
            console.log(t - now);
            console.log(t);
            result.m_actors_script = this.m_actor_script;
            result.m_result = 1;
            for (var i = 0; i < this.m_all_actors_logic.values.length; ++i) {
                var a = this.m_all_actors_logic.values[i];
                if (a.m_side == battle.BattleSide.Right && a.m_is_alive) {
                    result.m_result = 0;
                    break;
                }
            }
            if (this.m_current_step >= this.m_max_step) {
                result.m_result = 0;
            }
            if (this.m_current_step < this.m_min_step) {
                result.m_search_time += (this.m_min_step - this.m_current_step);
            }
            var end_cmd = new BattleCommand();
            end_cmd.m_step = this.m_current_step + 1500;
            end_cmd.m_action_type = BattleCommandType.GameOver;
            this.Write(-1, end_cmd);
            console.log("Left side is " + result.m_result);
            return result;
        };
        BattleSimulator.prototype.Ready = function () {
            var _this = this;
            this.m_battle_type = Math.random() > 0.5 ? BattleType.LEVEL_NORMAL : BattleType.LEVEL_BOSS;
            this.m_max_step = Template.config.battlelimit;
            this.m_min_step = Template.config.BCTime;
            this.m_search_time = Template.config.battletime;
            this.m_actor_script = [];
            //假装有两边
            this.m_all_actors_logic = new Dictionary();
            var ini_len = Template.config.iniPart.length;
            for (var i = 0; i < ini_len * 2; ++i) {
                var actor = new battle.ActorLogic();
                actor.m_gaming_id = i;
                actor.m_side = i < ini_len ? battle.BattleSide.Left : battle.BattleSide.Right;
                actor.m_pos = i % ini_len + 1;
                var c = Template.role.get(Template.config.iniPart[i % ini_len]);
                var r = new RoleInfo();
                r.InitByRoleConfigId(c.ID);
                /*r.role_id = c.ID;
                r.lv = c.Lv;
                r.base_lv = 1;
                r.skill_lv = 1;

                actor.m_atk = RoleAttrCalc.BaseAtk(r);
                actor.m_skill_atk = RoleAttrCalc.BaseSkillAtk(r);
                actor.m_crit_rate = c.CritRate;
                actor.m_def = RoleAttrCalc.BaseDef(r);
                actor.m_skill_def = RoleAttrCalc.BaseSkillDef(r);
                actor.m_max_hp = RoleAttrCalc.Hp(r);
                actor.m_combo = c.Combo;
                actor.m_crit_damage = c.CritDamage;
                actor.m_damage_reduce = c.DamageReduce;
                actor.m_debuff_res = c.DebuffRes;
                actor.m_sp_ignore = c.SpIgnore;
                actor.m_vampire = c.Vampire;
                actor.m_atk_speed = c.Atkspeed;*/
                actor.m_r_inf = r.Clone();
                actor.m_base_id = c.Base;
                actor.m_skill_id = c.Skill;
                actor.m_current_hp = r.max_hp;
                actor.m_current_rage = 0;
                actor.m_current_target = -1;
                this.m_all_actors_logic.add(actor.m_gaming_id, actor);
            }
            //填入初始命令
            this.m_all_actors_logic.values.forEach(function (a) {
                var search_gaming_id = _this.SearchTargetGamingId(a.m_pos, a.m_side);
                if (-1 != search_gaming_id) {
                    var cmd = new BattleCommand();
                    cmd.m_step = 0;
                    cmd.m_action_type = BattleCommandType.Search;
                    cmd.m_action_args = [search_gaming_id];
                    a.m_command_list.push(cmd);
                }
            });
        };
        BattleSimulator.prototype.SearchTargetGamingId = function (subject_pos, side) {
            var target_side = side == battle.BattleSide.Left ? battle.BattleSide.Right : battle.BattleSide.Left;
            var targets = null;
            var result = -1;
            switch (subject_pos) {
                case 1:
                    targets = Template.config.pos_1_targets;
                    break;
                case 2:
                case 4:
                    targets = Template.config.pos_2_4_targets;
                    break;
                case 3:
                case 5:
                    targets = Template.config.pos_3_5_targets;
                    break;
            }
            if (targets == null) {
                console.log("subject_id ERROR!");
                return result;
            }
            for (var i = 0; i < targets.length; ++i) {
                for (var j = 0; j < this.m_all_actors_logic.size(); ++j) {
                    var logic = this.m_all_actors_logic.values[j];
                    if (!logic.m_is_alive || logic.m_side != target_side || logic.m_current_hp <= 0) {
                        continue;
                    }
                    if (logic.m_pos == targets[i]) {
                        result = logic.m_gaming_id;
                        break;
                    }
                }
                if (result != -1) {
                    break;
                }
            }
            return result;
        };
        BattleSimulator.prototype.Go = function () {
            var _this = this;
            var all_logic = this.m_all_actors_logic;
            //var MAX_STEP = Template.config.battlelimit;
            while (true) {
                if (this.m_current_step >= this.m_max_step) {
                    break;
                }
                var alive_actor = [];
                all_logic.values.forEach(function (a) {
                    if (a.m_is_alive) {
                        alive_actor.push(a);
                    }
                });
                if (alive_actor.length <= 0) {
                    break;
                }
                var closest_cmd_step = this.m_max_step;
                alive_actor.forEach(function (alive) {
                    var a_min = alive.GetClosestCmdStep();
                    if (a_min < closest_cmd_step) {
                        closest_cmd_step = a_min;
                    }
                });
                if (closest_cmd_step == this.m_max_step) {
                    break;
                }
                //如果产生状态变化的，下一毫秒生效
                for (var i = 0; i < alive_actor.length; ++i) {
                    var old_cmd = alive_actor[i].m_command_list;
                    alive_actor[i].m_command_list = [];
                    old_cmd.forEach(function (c) {
                        if (c.m_step == closest_cmd_step) {
                            CommandCenter.ProcessCmd(alive_actor[i], c, closest_cmd_step, old_cmd, _this);
                            if (c.m_action_type == BattleCommandType.Die) {
                                return;
                            }
                        }
                        else {
                            alive_actor[i].m_command_list.push(c);
                        }
                    });
                }
                this.m_current_step = closest_cmd_step;
            }
            //console.log(JSON.stringify(this.m_actor_script));
        };
        BattleSimulator.prototype.Write = function (subject_id, cmd) {
            var found = null;
            for (var i = 0; i < this.m_actor_script.length; ++i) {
                if (this.m_actor_script[i].m_gaming_id == subject_id) {
                    found = this.m_actor_script[i];
                }
            }
            if (!found) {
                found = new ScriptElement();
                found.m_gaming_id = subject_id;
                this.m_actor_script.push(found);
            }
            found.m_cmd_list.push(cmd);
        };
        return BattleSimulator;
    }());
    battle.BattleSimulator = BattleSimulator;
    __reflect(BattleSimulator.prototype, "battle.BattleSimulator");
    var RoleAttrCalc = (function () {
        function RoleAttrCalc() {
        }
        RoleAttrCalc.Hp = function (r) {
            var c = Template.role.get(r.role_id);
            if (c != null)
                return c.Hp;
            return 0;
        };
        RoleAttrCalc.BaseAtk = function (r) {
            var c = Template.role.get(r.role_id);
            if (c != null)
                return c.Atk;
            return 0;
        };
        RoleAttrCalc.FinalAtkWithoutBuff = function (r) {
            var result = RoleAttrCalc.BaseAtk(r);
            var c = Template.role.get(r.role_id);
            var s = Template.skill.get(c.Base);
            if (c != null && s != null) {
                var ji_neng_bei_lv = s.DamageRate + s.DamageRateLv * (r.base_lv - 1);
                var ji_neng_jia_cheng = s.Damage + s.DamageLv * (r.base_lv - 1);
                result = (result * ji_neng_bei_lv / 1000 + ji_neng_jia_cheng) >> 0;
            }
            return result;
        };
        RoleAttrCalc.BaseDef = function (r) {
            var c = Template.role.get(r.role_id);
            if (c != null)
                return c.Def;
            return 0;
        };
        RoleAttrCalc.BaseSkillAtk = function (r) {
            var c = Template.role.get(r.role_id);
            if (c != null)
                return c.AtkSp;
            return 0;
        };
        RoleAttrCalc.FinalSkillAtkWithoutBuff = function (r) {
            var result = RoleAttrCalc.BaseSkillAtk(r);
            var c = Template.role.get(r.role_id);
            var s = Template.skill.get(c.Skill);
            if (c != null && s != null) {
                var ji_neng_bei_lv = s.DamageRate + s.DamageRateLv * (r.skill_lv - 1);
                var ji_neng_jia_cheng = s.Damage + s.DamageLv * (r.skill_lv - 1);
                result = (result * ji_neng_bei_lv / 1000 + ji_neng_jia_cheng) >> 0;
            }
            return result;
        };
        RoleAttrCalc.BaseSkillDef = function (r) {
            var c = Template.role.get(r.role_id);
            if (c != null)
                return c.DefSp;
            return 0;
        };
        return RoleAttrCalc;
    }());
    __reflect(RoleAttrCalc.prototype, "RoleAttrCalc");
})(battle || (battle = {}));
//# sourceMappingURL=BattleSimulater.js.map