var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 战斗播放管理器
 * 用于管理战斗的播放
 */
var battle;
(function (battle) {
    var PlayElement = (function () {
        function PlayElement() {
            this.m_gaming_id = 0;
            this.m_cmd = null;
        }
        PlayElement.Sort = function (a, b) {
            if (a == null && b != null) {
                return -1;
            }
            if (a != null && b == null) {
                return 1;
            }
            if (a == null && b == null) {
                return 0;
            }
            if (a.m_cmd.m_step < b.m_cmd.m_step) {
                return -1;
            }
            if (a.m_cmd.m_step == b.m_cmd.m_step) {
                return 0;
            }
            return 1;
        };
        return PlayElement;
    }());
    __reflect(PlayElement.prototype, "PlayElement");
    var ScriptManager = (function () {
        /**
        * 构造函数
        */
        function ScriptManager() {
            this.m_current_step = 0;
            this.m_playing = false;
            this.m_pause = false;
            this.m_drama_pause = false;
            this.m_acc_time = 0;
            Singleton.Get(RegisterUpdate).register(this);
            ScriptManager.m_buff_effect_list = new Dictionary();
        }
        // 手动析构
        ScriptManager.prototype.OnRelease = function () {
            Singleton.Get(RegisterUpdate).unRegister(this);
            var rm = Singleton.Get(battle.RenderManager);
            for (var i = 0; i < ScriptManager.m_buff_effect_list.keys.length; ++i) {
                var a = rm.getBattle().getActor(ScriptManager.m_buff_effect_list.keys[i]);
                if (a) {
                    for (var j = 0; j < ScriptManager.m_buff_effect_list.values[i].values.length; ++j) {
                        a.ReleaseEffect(ScriptManager.m_buff_effect_list.values[i].values[j]);
                    }
                }
            }
            ScriptManager.m_buff_effect_list = null;
        };
        ScriptManager.prototype.Init = function (script) {
            this.m_actors_script = script;
        };
        ScriptManager.prototype.Replay = function () {
            this.m_current_step = 0;
            this.m_playing = true;
            this.Pause(false);
            this.DramaPause(false);
        };
        ScriptManager.prototype.update = function (time) {
            if (this.m_acc_time == 0) {
                this.m_acc_time = time;
                return;
            }
            var delta_t = time - this.m_acc_time;
            this.m_acc_time = time;
            if (this.m_pause || this.m_drama_pause) {
                return;
            }
            this.PlayScript(delta_t);
        };
        ScriptManager.prototype.Pause = function (p) {
            YWLogger.info("At Time: " + this.m_current_step + " Paused " + p, LogType.Battle);
            this.m_pause = p;
        };
        ScriptManager.prototype.DramaPause = function (p) {
            this.m_drama_pause = p;
        };
        ScriptManager.prototype.PlayScript = function (delta_t) {
            if (!this.m_playing) {
                return;
            }
            Singleton.Get(battle.RoundManager).UpdateTimerBar(this.m_current_step);
            var this_frame_begin = this.m_current_step;
            var this_frame_end = this.m_current_step + delta_t;
            var cmd_list = [];
            this.m_actors_script.forEach(function (e) {
                e.m_cmd_list.forEach(function (c) {
                    if (c.m_step >= this_frame_begin && c.m_step < this_frame_end) {
                        var p = new PlayElement();
                        p.m_cmd = c;
                        p.m_gaming_id = e.m_gaming_id;
                        cmd_list.push(p);
                    }
                });
            });
            cmd_list.sort(PlayElement.Sort);
            for (var i = 0; i < cmd_list.length; ++i) {
                var cmd = cmd_list[i];
                //console.log("step: " + cmd.m_cmd.m_step + " gid: " + cmd.m_gaming_id + " cmd_type: " + cmd.m_cmd.m_action_type + " cmd_args: " + cmd.m_cmd.m_action_args);
                //this.LogBattle(cmd);
                if (cmd.m_gaming_id == -1 && cmd.m_cmd.m_action_type == battle.BattleCommandType.GameOver) {
                    /*var left:boolean = false;
                    var right:boolean = false;
                    var round = Singleton.Get(RoundManager);
                    var all_logic = round.All();
                    for (var j = 0; j < all_logic.values.length; ++j)
                    {
                        var logic = all_logic.values[j];
                        if (logic.m_is_alive)
                        {
                            if (logic.m_side == BattleSide.Left)
                                left = true;
                            if (logic.m_side == BattleSide.Right)
                                right = true;
                        }
                    }
                    if (!left)
                        Singleton.Get(LayerManager).getView(ui.ArenaBattleView).setPlayerHpPct(0);
                    if (!right)
                    {
                        Singleton.Get(LayerManager).getView(ui.ArenaBattleView).setEnemyHpPct(0);
                        Singleton.Get(LayerManager).getView(ui.BattleView).setBossHpPct(0);
                    }*/
                    this.m_playing = false;
                    Singleton.Get(battle.RoundManager).BattleEnd();
                    return;
                }
                this.ExecuteElement(cmd);
            }
            this.m_current_step += delta_t;
        };
        ScriptManager.prototype.LogBattle = function (p) {
            var subject_id = p.m_gaming_id;
            var line = "At Time: " + p.m_cmd.m_step + ", ";
            switch (p.m_cmd.m_action_type) {
                case battle.BattleCommandType.Search:
                    line += " Role" + subject_id + " RunTo Role" + p.m_cmd.m_action_args[0];
                    break;
                case battle.BattleCommandType.Attack:
                    line += " Role" + subject_id + " CastSkillTo Role" + p.m_cmd.m_action_args[0]
                        + p.m_cmd.m_action_args[1] + "ENup" + p.m_cmd.m_action_args[2] + "Vampire: " + p.m_cmd.m_action_args[3]
                        + " Combo: " + p.m_cmd.m_action_args[4] + " ComboDmg: " + p.m_cmd.m_action_args[5];
                    for (var i = 6; i < p.m_cmd.m_action_args.length; i += 4) {
                        line += ", To Role" + p.m_cmd.m_action_args[i] + " ApplyDmg" + p.m_cmd.m_action_args[i + 1]
                            + "Crit " + p.m_cmd.m_action_args[i + 2] + " ENup " + p.m_cmd.m_action_args[i + 3];
                    }
                    break;
                case battle.BattleCommandType.Die:
                    line += " Role" + subject_id + " Dead!";
                    break;
                case battle.BattleCommandType.GameOver:
                    line += " GameOver!!!";
                    break;
                case battle.BattleCommandType.AddBuff:
                    line += " Role" + subject_id + " AddBuff id=" + p.m_cmd.m_action_args[0] + " SkillLv " + p.m_cmd.m_action_args[1];
                    break;
                case battle.BattleCommandType.RemoveBuff:
                    line += " Role" + subject_id + " RemoveBuff id=" + p.m_cmd.m_action_args[0];
                    break;
                case battle.BattleCommandType.BuffHit:
                    line += " Role" + subject_id + " BuffHit Buff id=" + p.m_cmd.m_action_args[0] + " Rest " + p.m_cmd.m_action_args[1] + "(current hit included.)"
                        + " Dmg " + p.m_cmd.m_action_args[2];
                    break;
            }
            YWLogger.info(line, LogType.Battle);
        };
        /// 播放特写：
        ScriptManager.prototype.playCloseup = function (skill, br) {
            if (!Singleton.Get(battle.RoundManager).m_can_closeup)
                return;
            Singleton.Get(LayerManager).playCloseup(skill.ID, function (x) { }, this, [br]);
        };
        ScriptManager.prototype.ExecuteElementPause = function (b, br) {
            if (this.m_drama_pause)
                return;
            br.Pause(b);
            this.Pause(b);
        };
        ScriptManager.prototype.PlayBlinkAndScale = function (subject_render, deltaTime, subject) {
            /// Role亮起
            subject_render.getActorRender().playBlinkColorFilter(deltaTime * 6, deltaTime * 0, deltaTime * 1.9, 150);
            /// 播放亮起特效
            var pEffect = subject_render.PlayEffect(DEFINE.ROLE_AFTERCLOSEUP_EFF, DEFINE.ROLE_AFTERCLOSEUP_EFF, battle.EffectCastPosition.ECP_CENTER, subject.m_side);
        };
        /// zorder排序控制，显示遮罩
        ScriptManager.prototype.OnCloseUp = function (b, br, subject_render) {
            if (b) {
                br.setCloseUpMaskVisible(true);
                subject_render.setMaskZorder(true);
            }
            else {
                br.setCloseUpMaskVisible(false);
                subject_render.setMaskZorder(false);
            }
        };
        ScriptManager.prototype.ExecuteElement = function (p) {
            var rm = Singleton.Get(battle.RenderManager);
            var round = Singleton.Get(battle.RoundManager);
            var subject = round.ActorLogic(p.m_gaming_id);
            var br = rm.getBattle();
            var subject_render = br.getActor(p.m_gaming_id);
            if (null == subject_render)
                return;
            switch (p.m_cmd.m_action_type) {
                case battle.BattleCommandType.Attack:
                    //if (subject.HasBuffSpType(BuffSpType.Dizzy))
                    //    break;
                    var main_target_id = p.m_cmd.m_action_args[0];
                    var skill_id = p.m_cmd.m_action_args[1];
                    /*if (subject.m_base_id == skill_id)
                    {
                        subject.m_current_rage += subject.GetFinalAttr;
                        subject.m_current_rage = Math.min(subject.m_current_rage, Template.config.rageMax);
                    }
                    else
                    {
                        subject.m_current_rage = 0;
                    }*/
                    subject.m_current_rage += p.m_cmd.m_action_args[2];
                    subject.m_current_rage = Math.min(subject.m_current_rage, Template.config.rageMax);
                    subject.m_current_rage = Math.max(subject.m_current_rage, 0);
                    if (subject_render) {
                        subject_render.HpBar.setMp(subject_render.HpBar.cur_mp + p.m_cmd.m_action_args[2], Template.config.rageMax);
                    }
                    var ap = new battle.AttackParam();
                    var args = [skill_id]; //格式 0-技能id - 1-吸血值 2-主语id 3-追击次数 4-追击伤害 循环 （收到攻击的目标id-hp变更-怒气变更-伤害值-是否暴击） 
                    //吸血
                    if (p.m_cmd.m_action_args[3] > 0) {
                        subject.m_current_hp += p.m_cmd.m_action_args[3];
                        subject.m_current_hp = Math.min(subject.m_current_hp, subject.m_r_inf.max_hp);
                        args.push(p.m_cmd.m_action_args[3]);
                        args.push(subject.m_gaming_id);
                    }
                    else {
                        args.push(0);
                        args.push(subject.m_gaming_id);
                    }
                    //追击
                    args.push(p.m_cmd.m_action_args[4]);
                    args.push(p.m_cmd.m_action_args[5]);
                    for (var i = 6; i < p.m_cmd.m_action_args.length; i += 4) {
                        var target = round.ActorLogic(p.m_cmd.m_action_args[i]);
                        if (target) {
                            args.push(p.m_cmd.m_action_args[i]);
                            var old_hp = target.m_current_hp;
                            target.m_current_hp -= p.m_cmd.m_action_args[i + 1];
                            //target.m_current_hp -= p.m_cmd.m_action_args[4] * p.m_cmd.m_action_args[5];
                            target.m_current_hp = Math.max(target.m_current_hp, 0);
                            args.push(p.m_cmd.m_action_args[i + 1]); // + p.m_cmd.m_action_args[4] * p.m_cmd.m_action_args[5]);
                            var old_rage = target.m_current_rage;
                            target.m_current_rage += p.m_cmd.m_action_args[i + 3];
                            target.m_current_rage = Math.min(target.m_current_rage, Template.config.rageMax);
                            target.m_current_rage = Math.max(target.m_current_rage, 0);
                            args.push(p.m_cmd.m_action_args[i + 3]);
                            args.push(p.m_cmd.m_action_args[i + 1]);
                            args.push(p.m_cmd.m_action_args[i + 2]); //暴击
                            ap.behitTarget.push(p.m_cmd.m_action_args[i]);
                        }
                    }
                    var target_render = br.getActor(p.m_cmd.m_action_args[0]);
                    if (target_render) {
                        var skill = Template.skill.get(p.m_cmd.m_action_args[1]);
                        var skill_type = skill.Action == "attack" ? battle.ActionType.AT_attack : battle.ActionType.AT_skill;
                        ap.attacktarget = p.m_cmd.m_action_args[0];
                        ap.skillID = skill.ID;
                        if (skill.TargeTp == battle.SkillTarget.ZhaoyunSkill)
                            ap.delayTime = skill.DamTime;
                        var fun_type = skill.Action == "attack" ? battle.ActionEvent.AE_attack_hit : battle.ActionEvent.AE_skill_hit;
                        ap.m_attackFunc[fun_type] = new battle.AttackFuntionStruct();
                        ap.m_attackFunc[fun_type].m_attackFunc = this.OnAtkHit;
                        ap.m_attackFunc[fun_type].thisObj = this;
                        ap.m_attackFunc[fun_type].args = args;
                        //console.log("push " + args.length);     
                        /////瞬移背后的技能
                        if (skill.TargeTp == battle.SkillTarget.Special) {
                            var move_to_target = br.getActor(p.m_cmd.m_action_args[6]); //第一个伤害Role
                            if (move_to_target) {
                                var offset = 0;
                                if (subject_render.x < move_to_target.x) {
                                    subject_render.SetDirection(battle.BattleSide.Right);
                                    offset = 65;
                                }
                                else {
                                    subject_render.SetDirection(battle.BattleSide.Left);
                                    offset = -65;
                                }
                                subject_render.x = move_to_target.x + offset;
                                subject_render.y = move_to_target.y;
                            }
                        }
                        if (skill_type == battle.ActionType.AT_skill && subject.m_side == battle.BattleSide.Left) {
                            rm.addSkillFloatLabel(subject_render.x, subject_render.y, skill.ID); // TODO 测试代码
                        }
                        /// 无特写时，直接播放技能动画，有特写时，解暂停时播放技能动画 
                        if (skill_type == battle.ActionType.AT_skill && skill.RoleRes.length > 1 && subject.m_side == battle.BattleSide.Left) {
                            /// 可播特写，满足特写条件，百分之二十几率播放特写。11.18修改，解决特写太多的问题  &&  Math.random() < 0.9 
                            /// 1、Role亮起播放待机帧
                            subject_render.DoAction(battle.ActionType.AT_wait);
                            var deltaTime = 100;
                            var twAll = egret.Tween.get(this);
                            twAll
                                .call(this.ExecuteElementPause, this, [true, br])
                                .call(this.PlayBlinkAndScale, this, [subject_render, deltaTime, subject])
                                .wait(deltaTime * 5)
                                .call(this.OnCloseUp, this, [true, br, subject_render])
                                .call(this.playCloseup, this, [skill, br])
                                .wait(deltaTime * 10)
                                .call(this.OnCloseUp, this, [false, br, subject_render])
                                .wait(deltaTime * 0.5)
                                .call(this.ExecuteElementPause, this, [false, br])
                                .call(function () { subject_render.DoAction(skill_type, ap); }, this);
                        }
                        else {
                            subject_render.DoAction(skill_type, ap);
                        }
                    }
                    break;
                case battle.BattleCommandType.Search:
                    //if (subject.HasBuffSpType(BuffSpType.Dizzy))
                    //    break;
                    subject.m_current_target = p.m_cmd.m_action_args[0];
                    var target = round.ActorLogic(p.m_cmd.m_action_args[0]);
                    var target_render = br.getActor(p.m_cmd.m_action_args[0]);
                    if (target_render) {
                        /// 在范围内时不再索敌
                        var config = Template.role.get(subject.m_r_inf.role_id);
                        if (subject_render.followActor(target_render, config.Range, config.Move))
                            subject_render.DoAction(battle.ActionType.AT_move);
                    }
                    break;
                case battle.BattleCommandType.Die:
                    subject.m_current_hp = 0;
                    subject.m_is_alive = false;
                    break;
                case battle.BattleCommandType.AddBuff:
                    var buff_id = p.m_cmd.m_action_args[0];
                    var has_same = false;
                    var buff_config = Template.buff.get(buff_id);
                    if (buff_config == null)
                        break;
                    for (var i = 0; i < subject.m_buff_list.length; ++i) {
                        if (subject.m_buff_list[i].id == buff_id) {
                            has_same = true;
                            subject.m_buff_list[i].lv = p.m_cmd.m_action_args[1];
                            if (buff_config.CoverTp == battle.BuffCoverType.AddUP
                                && subject.m_buff_list[i].stack < buff_config.MaxStack) {
                                subject.m_buff_list[i].stack++;
                            }
                            break;
                        }
                    }
                    if (!has_same) {
                        var new_buff = new battle.BuffInfo();
                        new_buff.id = buff_id;
                        new_buff.stack = 1;
                        new_buff.lv = p.m_cmd.m_action_args[1];
                        subject.m_buff_list.push(new_buff);
                        if (buff_config.SpecialTp == battle.BuffSpType.Dizzy) {
                            //console.log("" + subject.m_gaming_id + "is Dizzy.");
                            subject_render.DoAction(battle.ActionType.AT_wait);
                        }
                    }
                    if (buff_config.Effect.length != 2)
                        break;
                    if (!ScriptManager.m_buff_effect_list.containsKey(subject.m_gaming_id)) {
                        ScriptManager.m_buff_effect_list.add(subject.m_gaming_id, new Dictionary());
                    }
                    if (!ScriptManager.m_buff_effect_list.get(subject.m_gaming_id).containsKey(buff_id)) {
                        ScriptManager.m_buff_effect_list.get(subject.m_gaming_id)
                            .add(buff_id, null); //subject_render.PlayEffect(buff_config.Effect[0], buff_config.Effect[1], buff_config.Pos, subject.m_side, -1));
                    }
                    break;
                case battle.BattleCommandType.RemoveBuff:
                    var buff_id = p.m_cmd.m_action_args[0];
                    for (var i = 0; i < subject.m_buff_list.length; ++i) {
                        if (subject.m_buff_list[i].id == buff_id) {
                            subject.m_buff_list.splice(i, 1);
                            break;
                        }
                    }
                    if (!ScriptManager.m_buff_effect_list.containsKey(subject.m_gaming_id)) {
                        break;
                    }
                    if (!ScriptManager.m_buff_effect_list.get(subject.m_gaming_id).containsKey(buff_id)) {
                        break;
                    }
                    subject_render.ReleaseEffect(ScriptManager.m_buff_effect_list.get(subject.m_gaming_id).get(buff_id));
                    ScriptManager.m_buff_effect_list.get(subject.m_gaming_id).remove(buff_id);
                    break;
                case battle.BattleCommandType.BuffHit:
                    subject.m_current_hp -= p.m_cmd.m_action_args[2];
                    subject.m_current_hp = Math.max(subject.m_current_hp, 0);
                    var float_type = void 0;
                    if (p.m_cmd.m_action_args[2] < 0) {
                        float_type = ui.FloatLabelType.Heal;
                    }
                    else {
                        float_type = subject.m_side == battle.BattleSide.Left ? ui.FloatLabelType.Damage : ui.FloatLabelType.Attack;
                    }
                    if (p.m_cmd.m_action_args[2] != 0)
                        rm.addFloatLabel(subject_render.x, subject_render.y, Math.abs(p.m_cmd.m_action_args[2]).toString(), float_type);
                    if (battle.BattleSide.Right) {
                        round.SetBossHpDelta(p.m_cmd.m_action_args[2]);
                    }
                    else {
                        round.SetMyHpDelta(p.m_cmd.m_action_args[2]);
                    }
                    if (subject.m_current_hp <= 0) {
                        ScriptManager.DieAni(subject_render, subject.m_gaming_id);
                    }
                    else {
                        subject_render.HpBar.show();
                        subject_render.HpBar.setHp(subject_render.HpBar.cur_hp - p.m_cmd.m_action_args[2], subject.m_r_inf.max_hp);
                    }
                    break;
            }
        };
        ScriptManager.prototype.OnAtkHit = function (args) {
            var rm = Singleton.Get(battle.RenderManager);
            var round = Singleton.Get(battle.RoundManager);
            var skill = Template.skill.get(args[0]);
            var zhaoyun_delay = skill.TargeTp == battle.SkillTarget.ZhaoyunSkill ? skill.DamTime : 0;
            //console.log("len " + args.length);
            var vampire = args[1];
            var subject_id = args[2];
            var subject_logic = round.ActorLogic(subject_id);
            if (vampire > 0) {
                var subject_render = rm.getBattle().getActor(subject_id);
                if (subject_render) {
                    rm.addFloatLabel(subject_render.x, subject_render.y, vampire.toString(), ui.FloatLabelType.Heal);
                    subject_render.HpBar.show();
                    subject_render.HpBar.setHp(subject_render.HpBar.cur_hp + vampire, round.ActorLogic(subject_id).m_r_inf.max_hp);
                    if (subject_logic.m_side == battle.BattleSide.Left) {
                        round.SetMyHpDelta(-vampire);
                    }
                    else {
                        round.SetBossHpDelta(-vampire);
                    }
                }
            }
            //追击
            var combo_count = args[3];
            var combo_dmg = args[4];
            //如果是技能，则震动
            if (subject_logic.m_skill_id == args[0]) {
                UtilsEffect.shakeDisplayObject(Singleton.Get(battle.RenderManager).getBackground(), 5, 10, 0, DEFINE.SCENE_BG_TOP);
            }
            var dl = 0;
            for (var i = 5; i < args.length; i += 5) {
                var uiLable_type = ui.FloatLabelType.Heal;
                var is_crit = args[i + 4] == 1 ? true : false;
                var target_logic = round.ActorLogic(args[i]);
                var delay = zhaoyun_delay * dl++;
                if (skill.DamageType != battle.SkillDmgType.Heal) {
                    if (target_logic.m_side == battle.BattleSide.Left) {
                        uiLable_type = is_crit ? ui.FloatLabelType.Critical : ui.FloatLabelType.Damage;
                    }
                    else {
                        if (is_crit) {
                            uiLable_type = ui.FloatLabelType.Critical;
                        }
                        else {
                            uiLable_type = subject_logic.m_skill_id == args[0] ? ui.FloatLabelType.Skill : ui.FloatLabelType.Attack;
                        }
                    }
                }
                var target_render = rm.getBattle().getActor(args[i]);
                if (target_render) {
                    var tw = egret.Tween.get(target_render);
                    //拆分
                    for (var d = 0; d < skill.DamDivide.length; ++d) {
                        if (args[i + 3] == 0)
                            continue;
                        tw = tw.wait(delay + d * skill.DamTime).call(function (rm, x, y, dmg, ui) {
                            rm.addFloatLabel(x, y, dmg.toString(), ui);
                        }, this, [rm, target_render.x, target_render.y, Math.abs((args[i + 3] * skill.DamDivide[d] / 1000) >> 0), uiLable_type]);
                    }
                    //追击  11.23
                    for (var d = 0; d < combo_count; ++d) {
                        // tw = tw.wait((d + 1) * skill.DamTime).call(
                        //     (rm: RenderManager, x: number, y: number, dmg: number, ui: ui.FloatLabelType) => {
                        //         rm.addFloatLabel(x, y, dmg.toString(), ui);
                        //     }
                        //     , this
                        //     , [rm, target_render.x, target_render.y, combo_dmg, ui.FloatLabelType.Pursued]);
                        rm.addPursuedFloatLabel(target_render.x, target_render.y, combo_dmg.toString(), ui.FloatLabelType.Pursued, d + 1);
                    }
                    //rm.addFloatLabel(target_render.x, target_render.y, args[i + 3].toString(), uiLable_type);
                    if (!target_logic.m_is_alive) {
                        //top_hp_bar_delta = target_render.HpBar.cur_hp;
                        ScriptManager.DieAni(target_render, args[i]);
                        var end = true;
                        var now_hp = 0;
                        for (var ri = 0; ri < round.All().values.length; ++ri) {
                            if (round.All().values[ri].m_side == target_logic.m_side && round.All().values[ri].m_is_alive) {
                                end = false;
                                //now_hp += round.All().values[ri].m_current_hp;
                                var actor = rm.getBattle().getActor(round.All().values[ri].m_gaming_id);
                                if (actor) {
                                    now_hp += actor.HpBar.cur_hp;
                                }
                            }
                        }
                        if (end) {
                            if (target_logic.m_side == battle.BattleSide.Left)
                                round.SetMyHp(0);
                            else
                                round.SetBossHp(0);
                        }
                        else {
                            if (target_logic.m_side == battle.BattleSide.Left)
                                round.SetMyHp(now_hp);
                            else
                                round.SetBossHp(now_hp);
                        }
                    }
                    else {
                        target_render.HpBar.show();
                        target_render.HpBar.setHp(target_render.HpBar.cur_hp - args[i + 1], target_logic.m_r_inf.max_hp);
                        target_render.HpBar.setMp(target_render.HpBar.cur_mp + args[i + 2], Template.config.rageMax);
                        for (var e = 0; e < ScriptManager.m_buff_effect_list.keys.length; ++e) {
                            if (target_logic.m_gaming_id == ScriptManager.m_buff_effect_list.keys[e]) {
                                for (var j = 0; j < ScriptManager.m_buff_effect_list.values[e].values.length; ++j) {
                                    if (!ScriptManager.m_buff_effect_list.values[e].values[j]) {
                                        var buff_config = Template.buff.get(ScriptManager.m_buff_effect_list.values[e].keys[j]);
                                        ScriptManager.m_buff_effect_list.values[e].values[j]
                                            = target_render.PlayEffect(buff_config.Effect[0], buff_config.Effect[1], buff_config.Pos, target_logic.m_side, -1);
                                    }
                                }
                            }
                        }
                        var top_hp_bar_delta = args[i + 1];
                        if (target_logic.m_side == battle.BattleSide.Left) {
                            round.SetMyHpDelta(top_hp_bar_delta);
                        }
                        else {
                            round.SetBossHpDelta(top_hp_bar_delta);
                        }
                    }
                }
            }
        };
        ScriptManager.DieAni = function (target_render, gamming_id) {
            target_render.HpBar.hide();
            var t = egret.Tween.get(target_render);
            t.to({ alpha: 0 }, 500)
                .wait(300)
                .call(function (x) {
                var r = Singleton.Get(battle.RenderManager).getBattle().getActor(x);
                if (!r || (r && !r.parent))
                    return;
                Singleton.Get(battle.RenderManager).getBattle().removeActor(x);
            }, ScriptManager, [gamming_id]);
        };
        return ScriptManager;
    }());
    battle.ScriptManager = ScriptManager;
    __reflect(ScriptManager.prototype, "battle.ScriptManager", ["IUpdate"]);
})(battle || (battle = {}));
//# sourceMappingURL=ScriptManager.js.map