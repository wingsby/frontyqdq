var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    /**
     * 爬塔玩家角色坐标枚举
     */
    var E_TOWER_PLAYER_POS;
    (function (E_TOWER_PLAYER_POS) {
        E_TOWER_PLAYER_POS[E_TOWER_PLAYER_POS["LEFT_OUT"] = 0] = "LEFT_OUT";
        E_TOWER_PLAYER_POS[E_TOWER_PLAYER_POS["WAIT"] = 1] = "WAIT";
        E_TOWER_PLAYER_POS[E_TOWER_PLAYER_POS["BATTLE"] = 2] = "BATTLE";
        E_TOWER_PLAYER_POS[E_TOWER_PLAYER_POS["REWARD"] = 3] = "REWARD";
        E_TOWER_PLAYER_POS[E_TOWER_PLAYER_POS["RIGHT_OUT"] = 4] = "RIGHT_OUT"; // 右侧屏幕外
    })(E_TOWER_PLAYER_POS = ui.E_TOWER_PLAYER_POS || (ui.E_TOWER_PLAYER_POS = {}));
    /**
     * 爬塔单层
     */
    var TowerStageView = (function (_super) {
        __extends(TowerStageView, _super);
        function TowerStageView() {
            var _this = _super.call(this) || this;
            _this.cfg_player_x = [-80, 118, 260, 280, 560]; // 玩家角色坐标
            _this.cfg_speed = 3; // 玩家移动速度倍率
            _this.cb_attack_win = true;
            _this.cb_attack_boss = false; // TODO 添加BOSS层表现
            _this.skinName = "yw.TowerStageSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        TowerStageView.prototype.componentCreated = function () {
            this.groupMask.visible = true;
        };
        TowerStageView.prototype.onDestroy = function () {
        };
        TowerStageView.prototype.update = function (time) {
            var player_c = this.ar_player.x + this.ar_player.width / 2;
            var enemy_c = this.ar_enemy.x + this.ar_enemy.width / 2;
            this.sh_player.x = player_c;
            this.sh_player.alpha = this.ar_player.alpha;
            this.sh_player.visible = this.ar_player.visible;
            this.sh_enemy.x = enemy_c;
            this.sh_enemy.alpha = this.ar_enemy.alpha;
            this.sh_enemy.visible = this.ar_enemy.visible;
            this.imgBossBg.x = enemy_c;
            this.spBox.anchorOffsetX = this.spBox.width / 2;
            this.spBox.x = enemy_c;
            this.mcBoss.anchorOffsetX = this.mcBoss.width / 2;
            this.mcBoss.x = enemy_c;
            this.btnBox.showIcon(false);
            this.btnBox.setText(Template.getGUIText("ui_tower9"));
            this.ft_player.x = player_c - this.ft_player.width / 2;
            this.ft_enemy.x = enemy_c - this.ft_enemy.width / 2;
        };
        TowerStageView.prototype.onAddToStage = function () {
            Singleton.Get(RegisterUpdate).register(this);
        };
        TowerStageView.prototype.onRemoveFromStage = function () {
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        // region 战斗表现
        /**
         * 初始化战斗
         * 小怪战斗流程：init() -> playEnter() -> playAttack() -> playWin()/playLose()[AUTO] -> playBox();
         * BOSS战斗流程：init() -> playEnter() -> playAttack() -> playWin()/playLose()[AUTO] -> playBox();
         */
        TowerStageView.prototype.init = function (ene_res) {
            // 清理当前的Tween
            egret.Tween.removeTweens(this.ar_player);
            // 玩家角色
            var roles = Singleton.Get(RoleManager).getRolesInfo();
            var my_role_id = 0;
            for (var i = 0; i < roles.pve_team.keys.length; i++) {
                var pos = roles.pve_team.keys[i];
                var role_id = roles.pve_team.get(pos);
                if (role_id > 0) {
                    my_role_id = role_id;
                    break;
                }
            }
            var cfg_role_player = Template.role.get(my_role_id);
            // 重置宝箱状态
            this.setTreasureOpen(false);
            this.spBox.visible = false;
            this.btnBox.visible = false;
            // 重置玩家角色
            this.ar_player.clearMovieClip();
            this.ar_player.setMovieClip(cfg_role_player.Res);
            this.ar_player.gotoAndPlay(DEFINE.g_ActionTypeName[battle.ActionType.AT_wait], -1);
            this.ar_player.alpha = 1;
            this.ar_player.x = this.cfg_player_x[E_TOWER_PLAYER_POS.LEFT_OUT];
            // 重置敌人角色
            this.ar_enemy.clearMovieClip();
            if (ene_res) {
                this.ar_enemy.setMovieClip(ene_res);
                this.ar_enemy.gotoAndPlay(DEFINE.g_ActionTypeName[battle.ActionType.AT_wait], -1);
            }
            this.setEnemyAlive(true);
            this.ar_enemy.alpha = 1;
            this.ar_enemy.scaleX = -1;
        };
        /**
         * 播放玩家入场
         */
        TowerStageView.prototype.playEnter = function (callback, thisObj) {
            var _this = this;
            // 重置玩家、敌人、宝箱显示状态
            this.ar_player.alpha = 1;
            this.ar_enemy.alpha = 1;
            this.setTreasureOpen(false);
            // 角色入场、待机
            this.ar_player.gotoAndPlay(DEFINE.g_ActionTypeName[battle.ActionType.AT_move], -1);
            this.ar_player.x = this.cfg_player_x[E_TOWER_PLAYER_POS.LEFT_OUT];
            this.tw_player.to({ x: this.cfg_player_x[E_TOWER_PLAYER_POS.WAIT] }, (this.cfg_player_x[E_TOWER_PLAYER_POS.WAIT] - this.ar_player.x) * this.cfg_speed).call(function () {
                // 玩家待机 (自动挑战情况下则不进入待机状态)
                if (!Singleton.Get(TowerManager).getFlowCtrl().is_auto) {
                    _this.ar_player.gotoAndPlay(DEFINE.g_ActionTypeName[battle.ActionType.AT_wait], -1);
                }
                if (callback) {
                    callback.call(thisObj);
                }
            });
        };
        TowerStageView.prototype.playAttack = function (is_win, callback, thisObj) {
            var _this = this;
            // 角色移动遇敌 (已在移动状态则不变化)
            if (this.ar_player.cur_frame != DEFINE.g_ActionTypeName[battle.ActionType.AT_move]) {
                this.ar_player.gotoAndPlay(DEFINE.g_ActionTypeName[battle.ActionType.AT_move], -1);
            }
            this.tw_player.to({ x: this.cfg_player_x[E_TOWER_PLAYER_POS.BATTLE] }, (this.cfg_player_x[E_TOWER_PLAYER_POS.BATTLE] - this.ar_player.x) * this.cfg_speed).call(function () {
                // 播放攻击动作
                _this.ar_player.gotoAndPlay(DEFINE.g_ActionTypeName[battle.ActionType.AT_attack], 1);
                _this.ar_enemy.gotoAndPlay(DEFINE.g_ActionTypeName[battle.ActionType.AT_attack], 1);
                // 注册回调
                _this.ar_player.m_clip.addEventListener(egret.Event.COMPLETE, _this.onActionCompleted, _this);
                _this.cb_attack = callback;
                _this.cb_attack_this = thisObj;
                _this.cb_attack_win = is_win;
            }, this);
        };
        /**
         * 响应攻击完成
         */
        TowerStageView.prototype.onActionCompleted = function () {
            // 移除回调
            this.ar_player.m_clip.removeEventListener(egret.Event.COMPLETE, this.onActionCompleted, this);
            // 角色回归待机状态
            this.ar_player.gotoAndPlay(DEFINE.g_ActionTypeName[battle.ActionType.AT_wait], -1);
            this.ar_enemy.gotoAndPlay(DEFINE.g_ActionTypeName[battle.ActionType.AT_wait], -1);
            // 处理胜负
            this.cb_attack_win ? this.playWin() : this.playLose();
        };
        /**
         * 播放玩家胜利
         */
        TowerStageView.prototype.playWin = function () {
            var _this = this;
            // 敌人消灭
            this.ar_enemy.alpha = 1;
            this.playBoxShow(200);
            this.tw_enemy.wait(80).to({ alpha: 0 }, 260).wait(200).call(function () {
                // 设定敌人状态为已被消灭
                _this.setEnemyAlive(false);
                // 玩家走至宝箱
                _this.ar_player.gotoAndPlay(DEFINE.g_ActionTypeName[battle.ActionType.AT_move], -1);
                _this.tw_player.to({ x: _this.cfg_player_x[E_TOWER_PLAYER_POS.REWARD] }, (_this.cfg_player_x[E_TOWER_PLAYER_POS.REWARD] - _this.ar_player.x) * _this.cfg_speed).call(function () {
                    // 玩家待机
                    _this.ar_player.gotoAndPlay(DEFINE.g_ActionTypeName[battle.ActionType.AT_wait], -1);
                    // 触发并移除攻击回调
                    if (_this.cb_attack) {
                        _this.cb_attack.call(_this.cb_attack_this);
                        _this.cb_attack = undefined;
                        _this.cb_attack_this = undefined;
                    }
                }, _this);
            });
        };
        /**
         * 播放玩家失败
         */
        TowerStageView.prototype.playLose = function () {
            var _this = this;
            this.ar_player.alpha = 1;
            this.tw_player.wait(80).to({ alpha: 0 }, 400).wait(200).call(function () {
                _this.playEnter();
                // 触发并移除攻击回调
                if (_this.cb_attack) {
                    _this.cb_attack.call(_this.cb_attack_this);
                    _this.cb_attack = undefined;
                    _this.cb_attack_this = undefined;
                }
            });
        };
        /**
         * 播放领取宝箱
         */
        TowerStageView.prototype.playBox = function (callback, thisObj) {
            var _this = this;
            // 设置宝箱状态
            this.btnBox.visible = false;
            this.setTreasureOpen(true);
            this.spBox.playOpen(function () {
                // 飘字提示收益
                // Singleton.Get(DialogControler).showCommonAlert(DEFINE.UI_ALERT_INFO.gold.name, 300, DEFINE.UI_ALERT_INFO.gold.res);
                // Singleton.Get(DialogControler).showCommonAlert(DEFINE.UI_ALERT_INFO.diamond.name, 300, DEFINE.UI_ALERT_INFO.diamond.res);
                // 提示收益
                var reward_info = Singleton.Get(TowerManager).getFlowCtrl().last_reward;
                if (reward_info != undefined) {
                    if (Singleton.Get(TowerManager).getFlowCtrl().is_auto) {
                        // 自动挑战飘字提示
                        if (reward_info.gold > 0) {
                            Singleton.Get(DialogControler).showCommonAlert(DEFINE.UI_ALERT_INFO.gold.name, reward_info.gold, DEFINE.UI_ALERT_INFO.gold.res);
                        }
                        if (reward_info.diamond > 0) {
                            Singleton.Get(DialogControler).showCommonAlert(DEFINE.UI_ALERT_INFO.diamond.name, reward_info.diamond, DEFINE.UI_ALERT_INFO.diamond.res);
                        }
                        for (var i = 0; i < reward_info.items.length; i++) {
                            Singleton.Get(DialogControler).showAlertItem(reward_info.items[i].id, reward_info.items[i].count);
                        }
                    }
                    else {
                        // 非自动挑战弹框提示
                        // Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, reward_info.gold, reward_info.diamond, reward_info.items);
                        // 非自动挑战
                        if (!_this.imgBossBg.visible) {
                            // 非BOSS层飘字提示
                            if (reward_info.gold > 0) {
                                Singleton.Get(DialogControler).showCommonAlert(DEFINE.UI_ALERT_INFO.gold.name, reward_info.gold, DEFINE.UI_ALERT_INFO.gold.res);
                            }
                            if (reward_info.diamond > 0) {
                                Singleton.Get(DialogControler).showCommonAlert(DEFINE.UI_ALERT_INFO.diamond.name, reward_info.diamond, DEFINE.UI_ALERT_INFO.diamond.res);
                            }
                            for (var i = 0; i < reward_info.items.length; i++) {
                                Singleton.Get(DialogControler).showAlertItem(reward_info.items[i].id, reward_info.items[i].count);
                            }
                        }
                        else {
                            // BOSS层弹框提示
                            Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, reward_info.gold, reward_info.diamond, reward_info.items);
                        }
                    }
                    Singleton.Get(TowerManager).getFlowCtrl().clearLastReward();
                }
                // 角色移出场景 (已在移动状态则不变化)
                if (_this.ar_player.cur_frame != DEFINE.g_ActionTypeName[battle.ActionType.AT_move]) {
                    _this.ar_player.gotoAndPlay(DEFINE.g_ActionTypeName[battle.ActionType.AT_move], -1);
                }
                _this.tw_player.to({ x: _this.cfg_player_x[E_TOWER_PLAYER_POS.RIGHT_OUT] }, (_this.cfg_player_x[E_TOWER_PLAYER_POS.RIGHT_OUT] - _this.ar_player.x) * _this.cfg_speed).call(function () {
                    if (callback) {
                        callback.call(thisObj);
                    }
                }, _this);
            }, this);
        };
        /**
         * 播放刷出宝箱
         */
        TowerStageView.prototype.playBoxShow = function (wait, callback, thisObj) {
            var _this = this;
            var tw_box = egret.Tween.get(this.spBox);
            this.spBox.visible = true;
            this.spBox.scaleX = 0;
            this.spBox.scaleY = 0;
            this.spBox.alpha = 0.4;
            tw_box.wait(wait).to({ alpha: 1, scaleX: 1.2, scaleY: 1.2 }, 60, egret.Ease.sineOut).to({ scaleX: 0.9, scaleY: 0.9 }, 60, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 80, egret.Ease.sineOut).call(function () {
                // 非自动挑战时提示领取
                if (!Singleton.Get(TowerManager).getFlowCtrl().is_auto) {
                    _this.spBox.playShake();
                    _this.btnBox.visible = true;
                }
                if (callback) {
                    callback.call(thisObj);
                }
            }, this);
        };
        /**
         * 测试用自动战斗
         */
        TowerStageView.prototype.goto = function (i) {
            switch (i) {
                case 0:
                    // this.init();
                    this.playEnter();
                    break;
                case 1:
                    this.playAttack(true);
                    break;
                case 2:
                    this.playBox();
                    break;
            }
            return i < 2 ? i + 1 : 0;
        };
        // endregion
        // region 状态切换
        /**
         * 设定当前层数
         */
        TowerStageView.prototype.setFloor = function (floor, flow) {
            var cfg_floor = TowerUtil.getFloorCfg(floor);
            // 不存在塔信息
            if (!cfg_floor) {
                this.ar_enemy.visible = false;
                this.ar_player.visible = false;
                this.spBox.visible = false;
                this.groupName.visible = false;
                this.groupBossTitle.visible = false;
                this.mcBoss.visible = false;
                this.ft_enemy.text = "";
                this.ft_player.text = "";
                if (floor <= 0) {
                    // 塔基以下
                    ResManager.AsyncSetTexture(this.imgBg, "bg_pata1_png"); // TODO 改为正式资源
                }
                else {
                    // 塔顶以上
                    ResManager.AsyncSetTexture(this.imgBg, "bg_pata1_png"); // TODO 改为正式资源
                }
                this.init(undefined);
                return;
            }
            else {
                this.ar_enemy.visible = true;
                this.ar_player.visible = true;
                this.spBox.visible = true;
                this.groupName.visible = true;
                this.ft_player.text = Template.getGUIText("ui_ex_tower_6") + Singleton.Get(PlayerInfoManager).getTeamCurrentFighting();
                // BOSS关判断
                if (floor % 10 === 0) {
                    this.ft_enemy.text = "";
                    ResManager.AsyncSetTexture(this.imgBg, "bg_pata3_png"); // TODO 缺少资源
                    this.groupBossTitle.visible = true;
                    this.imgBossBg.visible = true;
                    this.mcBoss.visible = true;
                    this.init(cfg_floor.boss_res);
                }
                else {
                    this.ft_enemy.text = Template.getGUIText("ui_ex_tower_6") + cfg_floor.mon_fighting;
                    if (floor % 2 === 0) {
                        ResManager.AsyncSetTexture(this.imgBg, "bg_pata2_png");
                    }
                    else {
                        ResManager.AsyncSetTexture(this.imgBg, "bg_pata1_png");
                    }
                    this.groupBossTitle.visible = false;
                    this.imgBossBg.visible = false;
                    this.mcBoss.visible = false;
                    this.init(cfg_floor.mon);
                }
            }
            this.labFloor.text = UtilsGame.stringHander(Template.getGUIText("ui_tower7"), floor);
            this.setFlow(flow);
        };
        /**
         * 设定流程状态
         */
        TowerStageView.prototype.setFlow = function (flow) {
            switch (flow) {
                case E_TOWER_FLOW.BATTLE: // 当前层 战斗
                case E_TOWER_FLOW.WAIT:
                    this.spBox.visible = false;
                    this.btnBox.visible = false;
                    this.setTreasureOpen(false);
                    this.setEnemyAlive(true);
                    this.setPlayerPos(E_TOWER_PLAYER_POS.WAIT);
                    break;
                case E_TOWER_FLOW.REWARD:
                    this.spBox.visible = true;
                    this.btnBox.visible = true;
                    this.setTreasureOpen(false);
                    this.setEnemyAlive(false);
                    this.setPlayerPos(E_TOWER_PLAYER_POS.REWARD);
                    break;
                case E_TOWER_FLOW.COMPLETED:
                    this.spBox.visible = false;
                    this.btnBox.visible = false;
                    this.setTreasureOpen(true);
                    this.setEnemyAlive(false);
                    this.setPlayerPos(E_TOWER_PLAYER_POS.RIGHT_OUT);
                    break;
                case E_TOWER_FLOW.FUTURE:
                    this.spBox.visible = false;
                    this.btnBox.visible = false;
                    this.setTreasureOpen(false);
                    this.setEnemyAlive(true);
                    this.setPlayerPos(E_TOWER_PLAYER_POS.LEFT_OUT);
                    break;
            }
        };
        /**
         * 设定宝箱是否已开启
         */
        TowerStageView.prototype.setTreasureOpen = function (open) {
            if (!open) {
                this.spBox.init();
            }
            else {
                this.spBox.cur_status = ui.E_SPECIAL_BOX_STATUS.OPENED;
            }
        };
        /**
         * 设定敌人是否存活
         */
        TowerStageView.prototype.setEnemyAlive = function (alive) {
            this.ar_enemy.visible = alive;
            this.setBossEffect(alive);
        };
        /**
         * 设定玩家位置
         */
        TowerStageView.prototype.setPlayerPos = function (pos) {
            this.ar_player.x = this.cfg_player_x[pos];
        };
        /**
         * 设定BOSS特效
         * @param show
         */
        TowerStageView.prototype.setBossEffect = function (show) {
            if (show) {
                this.mcBoss.alpha = 1;
                this.mcBoss.clearMovieClip();
                this.mcBoss.setMovieClip(DEFINE.EFF_JINGJI1);
                this.mcBoss.gotoAndPlay(DEFINE.EFF_JINGJI1, -1);
            }
            else {
                this.mcBoss.alpha = 0;
                this.mcBoss.clearMovieClip();
            }
        };
        /**
         * 设定当前楼层是否激活
         */
        TowerStageView.prototype.setFloorActive = function (active, dynamic) {
            var _this = this;
            if (dynamic === void 0) { dynamic = false; }
            if (this.groupMask.visible == !active) {
                return;
            }
            if (!dynamic) {
                this.groupMask.visible = !active;
                this.groupMask.alpha = active ? 0 : 1;
                return;
            }
            this.groupMask.visible = true;
            this.groupMask.alpha = active ? 1 : 0;
            var tw_mask = egret.Tween.get(this.groupMask);
            tw_mask.to({ alpha: active ? 0 : 1 }, 500, egret.Ease.sineOut).call(function () {
                _this.groupMask.visible = !active;
            }, this);
        };
        Object.defineProperty(TowerStageView.prototype, "tw_player", {
            // endregion
            // region 获取对象
            /**
             * 玩家角色Tween对象
             */
            get: function () {
                return egret.Tween.get(this.ar_player);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TowerStageView.prototype, "tw_enemy", {
            /**
             * 敌人角色Tween对象
             */
            get: function () {
                return egret.Tween.get(this.ar_enemy);
            },
            enumerable: true,
            configurable: true
        });
        return TowerStageView;
    }(eui.Component));
    ui.TowerStageView = TowerStageView;
    __reflect(TowerStageView.prototype, "ui.TowerStageView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=TowerStageView.js.map