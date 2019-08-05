var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 对局管理器
 * 用于管理战斗的发起、结束
 */
var battle;
(function (battle_1) {
    var RoundManager = (function () {
        /**
         * 构造函数
         */
        function RoundManager() {
            //server
            this.m_battle_simulater = null;
            //client
            this.m_all_actors_logic = new Dictionary();
            this.m_script_manager = null;
            this.m_battle_result = null;
            this.m_all_right_hp = 0;
            this.m_all_left_hp = 0;
            this.end_call = null;
            this.end_call_obj = null;
            this.end_call_ars = null;
            this.drama_call = null;
            this.drama_call_obj = null;
            this.drama_call_ars = null;
            this.drama_call_once = false;
            this.m_timer_list = [];
            this.m_timer_call = [];
            this.m_can_closeup = false;
        }
        RoundManager.prototype.All = function () {
            return this.m_all_actors_logic;
        };
        // 手动析构
        RoundManager.prototype.OnRelease = function () {
            if (this.m_script_manager != null) {
                /// 调用析构
                this.m_script_manager.OnRelease();
                /// 解除引用
                this.m_script_manager = null;
            }
            this.m_timer_list = [];
            this.m_timer_call = [];
            this.m_all_actors_logic.clear();
            this.m_all_actors_logic = null;
            this.m_battle_simulater = null;
        };
        RoundManager.prototype.Enter = function (result, end_call, thisobject, args, drama_call, drama_call_obj, drama_call_ars) {
            var _this = this;
            this.end_call = null;
            this.end_call_ars = null;
            this.end_call_obj = null;
            this.end_call = end_call;
            this.end_call_ars = args;
            this.end_call_obj = thisobject;
            this.drama_call = null;
            this.drama_call_ars = null;
            this.drama_call_obj = null;
            this.drama_call = drama_call;
            this.drama_call_ars = drama_call_ars;
            this.drama_call_obj = drama_call_obj;
            this.drama_call_once = false;
            this.m_battle_result = result;
            this.OnRelease();
            this.m_battle_simulater = new battle_1.BattleSimulator();
            this.m_can_closeup = true;
            this.m_all_actors_logic = new Dictionary();
            var left_hp_current = 0;
            var right_hp_current = 0;
            result.pack.m_actors_data.forEach(function (d) {
                _this.m_all_actors_logic.add(d.m_gaming_id, d);
                if (d.m_side == battle_1.BattleSide.Left) {
                    left_hp_current += d.m_current_hp;
                }
                else if (d.m_side == battle_1.BattleSide.Right) {
                    right_hp_current += d.m_current_hp;
                }
            });
            if (!this.m_script_manager)
                this.m_script_manager = new battle_1.ScriptManager();
            this.m_script_manager.Pause(true);
            this.m_script_manager.Init(result.pack.m_actors_script);
            var br = Singleton.Get(battle_1.RenderManager).getBattle();
            br.Pause(false);
            //Singleton.Get(RenderManager).getBackground().stop();
            Singleton.Get(battle_1.RenderManager).getBackground().play();
            var old_actor_res = [];
            for (var i = 1; i <= 5; ++i) {
                var old_actor = br.getActorByPos(battle_1.BattleSide.Left, i);
                if (old_actor) {
                    old_actor_res.push(old_actor.getActorRender().name);
                }
                else {
                    old_actor_res.push("");
                }
            }
            YWLogger.info("Enter!!!", LogType.Battle);
            br.removeAllActorRender();
            this.m_all_actors_logic.values.forEach(function (a) {
                if (a.m_side != battle_1.BattleSide.Left)
                    return;
                var r = br.addActor(a);
                r.m_logic_pos = a.m_pos;
                r.m_logic_side = a.m_side;
                r.x = battle_1.RenderManager.getConfigPosX(a.m_pos, a.m_side);
                r.y = battle_1.RenderManager.getConfigPosY(a.m_pos, a.m_side);
                //r.HpBar.setHpPct(100);
                r.HpBar.setHp(a.m_current_hp, a.m_r_inf.max_hp);
                r.HpBar.setMp(a.m_current_rage, Template.config.rageMax);
                r.HpBar.isEnemy = false;
                if (a.m_current_hp < a.m_r_inf.max_hp)
                    r.HpBar.show();
                else
                    r.HpBar.hide();
                r.SetDirection(a.m_side);
                var name_ui = new eui.Label();
                name_ui.y = -20;
                name_ui.x = -10;
                name_ui.textColor = a.m_side == battle_1.BattleSide.Left ? 0x00ff00 : 0xff0000;
                //name_ui.text = "id:" + a.m_gaming_id.toString();
                //name_ui.text = "Role:" + a.m_r_inf.role_id;
                //name_ui.text = "Pos:" + a.m_pos;
                name_ui.text = "hp:" + a.m_r_inf.max_hp;
                name_ui.textAlign = egret.HorizontalAlign.CENTER;
                //r.addChild(name_ui);
                if (old_actor_res[a.m_pos - 1] == r.getActorRender().name) {
                    egret.Tween.get(r).wait(0).call(function (x) {
                        x.DoAction(battle_1.ActionType.AT_move);
                    }, _this, [r]);
                    return;
                }
                r.PlayEffect(DEFINE.ROLE_SHOW_EFF, DEFINE.ROLE_SHOW_EFF, battle_1.EffectCastPosition.ECP_Bottom, a.m_side);
                r.alpha = 0;
                egret.Tween.get(r).call(function (x) {
                    x.DoAction(battle_1.ActionType.AT_move);
                }, _this, [r]).to({ alpha: 1 }, 500);
            });
            this.m_all_right_hp = 0;
            this.m_all_left_hp = 0;
            this.m_all_actors_logic.values.forEach(function (a) {
                if (a.m_side == battle_1.BattleSide.Right) {
                    _this.m_all_right_hp += a.m_r_inf.max_hp;
                }
                else {
                    _this.m_all_left_hp += a.m_r_inf.max_hp;
                }
            });
            battle_1.StateAgent.setBossCountdown(0, result.pack.m_max_step);
            var all_hp = this.m_all_right_hp;
            if (undefined != result.pack.right_all_hp)
                all_hp = result.pack.right_all_hp;
            battle_1.StateAgent.setEnemyHpMax(all_hp);
            battle_1.StateAgent.setEnemyHp(right_hp_current);
            all_hp = this.m_all_left_hp;
            if (undefined != result.pack.left_all_hp)
                all_hp = result.pack.left_all_hp;
            battle_1.StateAgent.setPlayerHpMax(all_hp);
            battle_1.StateAgent.setPlayerHp(left_hp_current);
            this.ShowBossHpAndTimeBar(false);
            var t = new egret.Timer(600, 1);
            t.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.EnterComplete, this);
            t.start();
            this.m_timer_list.push(t);
            this.m_timer_call.push(this.EnterComplete);
        };
        RoundManager.prototype.ActorLogic = function (gaming_id) {
            return this.m_all_actors_logic.get(gaming_id);
        };
        RoundManager.prototype.BattleEnd = function () {
            var _this = this;
            YWLogger.info("BattleEnd()", LogType.Battle);
            var br = Singleton.Get(battle_1.RenderManager).getBattle();
            br.onBattleEnd();
            var right_alive = false;
            for (var i = 0; i < this.m_all_actors_logic.values.length; ++i) {
                var logic = this.m_all_actors_logic.values[i];
                if (logic.m_is_alive && logic.m_side == battle_1.BattleSide.Right) {
                    right_alive = true;
                    break;
                }
            }
            this.m_all_actors_logic.values.forEach(function (a) {
                if (a.m_is_alive) {
                    var r = br.getActor(a.m_gaming_id);
                    if (!r)
                        return;
                    if (a.m_side == battle_1.BattleSide.Right) {
                        var t = egret.Tween.get(r);
                        t.to({ alpha: 0 }, 500).wait(100).call(function (id, r_alive) {
                            Singleton.Get(battle_1.RenderManager).getBattle().removeActor(id);
                            if (r_alive)
                                Singleton.Get(battle_1.RenderManager).getBackground().play();
                        }, _this, [a.m_gaming_id, right_alive]);
                    }
                    else {
                        var n_x = battle_1.RenderManager.getConfigPosX(a.m_pos, a.m_side);
                        var n_y = battle_1.RenderManager.getConfigPosY(a.m_pos, a.m_side);
                        r.HpBar.hide();
                        r.DoAction(battle_1.ActionType.AT_move);
                        //r.SetDirection(a.m_side);
                        var t = egret.Tween.get(r);
                        //t.to({x:n_x, y:n_y}, 600);
                        var f = new battle_1.FunctionStruct();
                        f.m_fun = _this.MoveBackEnd;
                        f.thisobject = _this;
                        f.argu = [a];
                        var config = Template.role.get(a.m_r_inf.role_id);
                        r.moveTo(n_x, n_y, config.Move, f);
                        r.SetDirection(a.m_side);
                    }
                }
            });
            this.ShowBossHpAndTimeBar(false);
            if (!right_alive)
                Singleton.Get(battle_1.RenderManager).getBackground().play();
            var t = new egret.Timer(1500, 1);
            //var p = Singleton.Get(PveManager);
            //t.addEventListener(egret.TimerEvent.TIMER_COMPLETE, p.TestSendPveBattleReq, p);
            t.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.EndCall, this);
            t.start();
            this.m_timer_list.push(t);
            this.m_timer_call.push(this.EndCall);
        };
        RoundManager.prototype.EndCall = function () {
            YWLogger.info("EndCall()", LogType.Battle);
            if (this.end_call) {
                this.end_call.call(this.end_call_obj, this.end_call_ars);
            }
        };
        RoundManager.prototype.EnterComplete = function () {
            //console.log("run");
            //Singleton.Get(RenderManager).getBackground().play();
            var _this = this;
            //if (this.m_battle_result.pack.m_battle_type == BattleType.LEVEL_BOSS) {
            //    Singleton.Get(battle.RenderManager).playCloseupBoss();
            //}
            Singleton.Get(battle.RenderManager).playCloseupBoss(this.m_battle_result.pack.m_battle_type);
            var front_speed = Singleton.Get(battle_1.RenderManager).getBackground().frontSpeed();
            var br = Singleton.Get(battle_1.RenderManager).getBattle();
            this.m_all_actors_logic.values.forEach(function (a) {
                if (a.m_side == battle_1.BattleSide.Left)
                    return;
                YWLogger.info("ReceiveBattleReqComplete right", LogType.Battle);
                var r = br.addActor(a);
                r.m_logic_pos = a.m_pos;
                r.m_logic_side = a.m_side;
                var final_x = battle_1.RenderManager.getConfigPosX(a.m_pos, a.m_side);
                r.x = final_x + front_speed * (_this.m_battle_result.pack.m_search_time / 1000);
                r.y = battle_1.RenderManager.getConfigPosY(a.m_pos, a.m_side);
                r.HpBar.setHp(a.m_current_hp, a.m_r_inf.max_hp);
                r.HpBar.setMp(a.m_current_rage, Template.config.rageMax);
                r.HpBar.isEnemy = true;
                if (a.m_current_hp < a.m_r_inf.max_hp)
                    r.HpBar.show();
                else
                    r.HpBar.hide();
                r.SetDirection(a.m_side);
                var name_ui = new eui.Label();
                name_ui.y = -20;
                name_ui.x = -10;
                name_ui.textColor = 0xff0000; //a.m_side == BattleSide.Left ? 0x00ff00 : 0xff0000;
                //name_ui.text = "id:" + a.m_gaming_id.toString();
                //name_ui.text = "Role:" + a.m_r_inf.role_id;
                name_ui.text = "hp:" + a.m_r_inf.max_hp;
                name_ui.textAlign = egret.HorizontalAlign.CENTER;
                //r.addChild(name_ui);
                //r.PlayEffect(DEFINE.ROLE_SHOW_EFF, DEFINE.ROLE_SHOW_EFF, EffectCastPosition.ECP_Bottom, a.m_side);
                //r.alpha = 0;
                egret.Tween.get(r).to({ x: final_x }, _this.m_battle_result.pack.m_search_time);
            });
            var t = new egret.Timer(this.m_battle_result.pack.m_search_time, 1);
            t.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.ReceiveBattleReqComplete, this);
            t.start();
            this.m_timer_list.push(t);
            this.m_timer_call.push(this.ReceiveBattleReqComplete);
        };
        RoundManager.prototype.ReceiveBattleReqComplete = function () {
            var br = Singleton.Get(battle_1.RenderManager).getBattle();
            this.m_all_actors_logic.values.forEach(function (a) {
                var r = br.getActor(a.m_gaming_id);
                if (null == r)
                    return;
                r.DoAction(battle_1.ActionType.AT_wait);
            });
            YWLogger.info("RunEnd", LogType.Battle);
            Singleton.Get(battle_1.RenderManager).getBackground().stop();
            Singleton.Get(battle.RenderManager).hideCloseupBoss();
            /*var br = Singleton.Get(RenderManager).getBattle();
            this.m_all_actors_logic.values.forEach(a => {

                if (a.m_side == BattleSide.Left)
                    return;
                console.log("ReceiveBattleReqComplete right");
                var r: Actor = br.addActor(a);
                r.m_logic_pos = a.m_pos;
                r.m_logic_side = a.m_side;
                r.x = RenderManager.getConfigPosX(a.m_pos, a.m_side);
                r.y = RenderManager.getConfigPosY(a.m_pos, a.m_side);
                r.HpBar.setHp(a.m_r_inf.max_hp, a.m_r_inf.max_hp);
                r.HpBar.setMp(a.m_r_inf.en, Template.config.rageMax);
                r.HpBar.isEnemy = true;
                r.HpBar.hide();
                r.SetDirection(a.m_side);

                var name_ui = new eui.Label();
                name_ui.y = -20;
                name_ui.x = -10;
                name_ui.textColor = a.m_side == BattleSide.Left ? 0x00ff00 : 0xff0000;
                //name_ui.text = "id:" + a.m_gaming_id.toString();
                name_ui.text = "Role:" + a.m_r_inf.role_id;
                name_ui.textAlign = egret.HorizontalAlign.CENTER;
                //r.addChild(name_ui);

                //todo
                r.PlayEffect(DEFINE.ROLE_SHOW_EFF, DEFINE.ROLE_SHOW_EFF, EffectCastPosition.ECP_Bottom, a.m_side);
                r.alpha = 0;
                egret.Tween.get(r).to({ alpha: 1 }, 500);
            });*/
            //todo 要判断实际类型
            if (this.m_battle_result.pack.m_battle_type == battle_1.BattleType.LEVEL_BOSS) {
                this.ShowBossHpAndTimeBar(true);
            }
            var t = new egret.Timer(500, 1);
            t.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.ReadyComplete, this);
            t.start();
            this.m_timer_list.push(t);
            this.m_timer_call.push(this.ReadyComplete);
        };
        RoundManager.prototype.ReadyComplete = function () {
            YWLogger.info("ReadyComplete()", LogType.Battle);
            this.m_script_manager.Replay();
        };
        RoundManager.prototype.MoveBackEnd = function (args) {
            // var r = Singleton.Get(RenderManager).getBattle().getActor(args[0].m_gaming_id);
            /// 使用tween
            var r = Singleton.Get(battle_1.RenderManager).getBattle().getActor(args.m_gaming_id);
            if (r) {
                //r.DoAction(ActionType.AT_wait);
                r.SetDirection(args.m_side);
            }
        };
        RoundManager.prototype.ShowBossHpAndTimeBar = function (show) {
            Singleton.Get(LayerManager).getView(ui.BattleView).showBossHpBar(show);
        };
        //如果是加血，delta是负数
        RoundManager.prototype.SetBossHpDelta = function (delta) {
            var cur = battle_1.StateAgent.enemy_cur;
            battle_1.StateAgent.setEnemyHp(cur - delta);
            /*var sum = 0;
            for (var i = 0; i < this.m_all_actors_logic.size(); ++i)
            {
                if (this.m_all_actors_logic.values[i].m_side == BattleSide.Right)
                {
                    console.log(this.m_all_actors_logic.values[i].m_current_hp);
                    sum += this.m_all_actors_logic.values[i].m_current_hp;
                }
            }
            console.log("sum " + sum);*/
            this.DramaTest();
        };
        RoundManager.prototype.SetBossHp = function (cur) {
            battle_1.StateAgent.setEnemyHp(cur);
            this.DramaTest();
        };
        RoundManager.prototype.DramaTest = function () {
            if (this.drama_call != null) {
                if (battle_1.StateAgent.getBossHpPct() <= 0.05
                    && !this.drama_call_once) {
                    this.drama_call_once = true;
                    this.m_script_manager.DramaPause(true);
                    Singleton.Get(battle_1.BattleRender).Pause(true);
                    this.drama_call.call(this.drama_call_obj, this.drama_call_ars);
                }
            }
        };
        RoundManager.prototype.SetMyHpDelta = function (delta) {
            battle_1.StateAgent.setPlayerHp(battle_1.StateAgent.player_cur - delta);
        };
        RoundManager.prototype.SetMyHp = function (cur) {
            battle_1.StateAgent.setPlayerHp(cur);
        };
        RoundManager.prototype.UpdateTimerBar = function (current) {
            Singleton.Get(LayerManager).getView(ui.BattleView)
                .setBossCountdown(current, this.m_battle_result.pack.m_max_step);
        };
        //todo 过了Boss后换场景的工作流程
        RoundManager.prototype.ChangeStage = function (scene_id, end_call, thisobject) {
            var r = Singleton.Get(battle_1.RenderManager).setSceneByLevel(scene_id);
            var t = new egret.Timer(1500, 1);
            //var p = Singleton.Get(PveManager);
            //t.addEventListener(egret.TimerEvent.TIMER_COMPLETE, p.TestSendPveBattleReq, p);
            t.addEventListener(egret.TimerEvent.TIMER_COMPLETE, end_call, thisobject);
            t.start();
            //this.m_timer_list.push(t);
            //this.m_timer_call.push(end_call);
        };
        RoundManager.prototype.CutScene = function (fade, end_call, thisObject, args) {
            var _this = this;
            this.m_can_closeup = false;
            Singleton.Get(LayerManager).getView(ui.CloseupView).reset();
            var r = Singleton.Get(battle_1.RenderManager);
            if (fade) {
                r.cutBlackMask(function (battle, c, t, a) {
                    battle.removeAllActorRender();
                    YWLogger.info("fade clean~~~~~~~~~", LogType.Battle);
                    _this.CleanAllTimer();
                    c.call(t, a);
                }, this, [Singleton.Get(battle_1.BattleRender), end_call, thisObject, args]);
            }
            else {
                Singleton.Get(battle_1.BattleRender).removeAllActorRender();
                YWLogger.info("no-fade clean~~~~~~~~~", LogType.Battle);
                this.CleanAllTimer();
                end_call.call(thisObject, args);
            }
        };
        RoundManager.prototype.CleanAllTimer = function () {
            for (var i = 0; i < this.m_timer_list.length; ++i) {
                this.m_timer_list[i].stop();
                this.m_timer_list[i].removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.m_timer_call[i], this);
            }
            this.m_timer_list = [];
            this.m_timer_call = [];
        };
        return RoundManager;
    }());
    battle_1.RoundManager = RoundManager;
    __reflect(RoundManager.prototype, "battle.RoundManager");
})(battle || (battle = {}));
//# sourceMappingURL=RoundManager.js.map