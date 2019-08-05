var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TowerManager = (function () {
    /**
     * @constructor
     */
    function TowerManager() {
        this.tower_info = undefined;
        this.flow_ctrl = undefined;
        this.battle_ctrl = undefined;
        this.tower_info = new PlayerTowerInfo();
        this.flow_ctrl = new TowerFlowController();
        this.battle_ctrl = new TowerBattleController();
    }
    /**
     * 响应游戏加载完成
     */
    TowerManager.prototype.onGameLoaded = function () {
        this.reqInfo();
        // Singleton.Get(BattleStateGateway).register(battle.E_BATTLE_TYPE.TOWER, undefined, this.onBattleStateExecute, this);
    };
    // region 数据操作
    /**
     * 获取玩家爬塔信息
     * @returns {PlayerTowerInfo}
     */
    TowerManager.prototype.getTowerInfo = function () {
        return this.tower_info;
    };
    /**
     * 获取爬塔流程控制器
     * @returns {TowerFlowController}
     */
    TowerManager.prototype.getFlowCtrl = function () {
        return this.flow_ctrl;
    };
    /**
     * 获取战斗控制器
     * @returns {TowerBattleController}
     */
    TowerManager.prototype.getBattleCtrl = function () {
        return this.battle_ctrl;
    };
    // endregion
    // region 网络请求
    /**
     * 请求基本信息
     */
    TowerManager.prototype.reqInfo = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.TOWER_INFO, send_msg, this, function (rec_msg) {
            var rec_tower = rec_msg.body.tower;
            if (rec_tower == undefined)
                return;
            if (rec_tower.success) {
                // 更新爬塔数据
                _this.getTowerInfo().updateData(rec_tower.info);
                _this.getFlowCtrl().init();
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_TOWER_LV);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        });
    };
    /**
     * 请求挑战小怪
     */
    TowerManager.prototype.reqBat = function (cb_win, cb_lose, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.TOWER_BAT, send_msg, this, function (rec_msg) {
            var rec_tower = rec_msg.body.tower;
            if (rec_tower == undefined)
                return;
            if (rec_tower.success) {
                if (rec_tower.is_win) {
                    // 挑战胜利
                    _this.getTowerInfo().win = true;
                    // 任务：注册任务更新
                    Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_TOWER_LV);
                    if (cb_win != undefined) {
                        cb_win.call(thisObj, args);
                    }
                }
                else {
                    // 挑战失败
                    if (cb_lose != undefined) {
                        cb_lose.call(thisObj, args);
                    }
                }
            }
        }, true);
    };
    /**
     * 切换至爬塔BOSS战斗
     */
    TowerManager.prototype.actBattleTower = function (cb_win, cb_lose, thisObj, callback, thisObjcb) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        QueuedGateway.addRequest(QueuedGatewayType.BATTLE, NetConst.TOWER_BAT_BOSS, send_msg, this, function (rec_msg) {
            var rec_tower = rec_msg.body.tower;
            if (rec_tower == undefined)
                return;
            if (!rec_tower.success) {
                Singleton.Get(battle.BattleStateMachine).reset();
                console.error("failed to enter battle.");
                return;
            }
            var battle_wrapper = new msg.BattleResultMsg();
            battle_wrapper.pack = rec_tower.battle_data;
            _this.getBattleCtrl().setExitCallback(battle_wrapper.pack.m_result == BattleResult.LEFT_WIN, cb_win, cb_lose, thisObj);
            // 记录秒伤信息
            Singleton.Get(DmgManager).getDmgInfo().saveDmg(E_DMG_STAT_TYPE.TOWER, rec_tower.battle_data);
            // 切换黑屏后加载新战斗
            Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.TOWER, battle.E_BATTLE_FLOW.PLAYING);
            var scene_id = Template.config.ArenaScene; // TODO 换成爬塔的战斗场景
            var cfg_scene = Template.scene.get(scene_id);
            if (cfg_scene) {
                Singleton.Get(LayerManager).getView(ui.SyncLoadingView).open(DEFINE.SYNC_LOADING_DURATION);
                ResManager.getResAsync(cfg_scene.bgBack, function () {
                    ResManager.getResAsync(cfg_scene.bgFront, function () {
                        Singleton.Get(LayerManager).getView(ui.SyncLoadingView).cancleOpen();
                        Singleton.Get(battle.RenderManager).setSceneDirectly(scene_id);
                        Singleton.Get(battle.RoundManager).CutScene(false, function () {
                            Singleton.Get(battle.RoundManager).Enter(battle_wrapper, function () {
                                _this.getBattleCtrl().handleBattleEnd();
                            }, _this);
                        }, _this);
                    }, _this);
                }, _this);
            }
            else {
                Singleton.Get(battle.RoundManager).Enter(battle_wrapper, function () {
                    _this.getBattleCtrl().handleBattleEnd();
                }, _this);
            }
            console.log("======== \u722C\u5854\u6218\u6597[" + UtilsGame.dateToStr(UtilsGame.Now()) + "] ========");
            console.log(rec_tower.battle_data);
            console.log("===============================================");
            // 执行回调
            if (callback) {
                callback.call(thisObjcb);
            }
            // this.getBattleCtrl().onBattleBegin(this.getTowerInfo().out_cur_lv);
            // 任务：注册任务更新
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_TOWER_LV);
        });
    };
    /**
     * 请求领取层奖励
     */
    TowerManager.prototype.reqUpstairs = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 清理废弃的奖励信息记录
        this.getFlowCtrl().clearLastReward();
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.TOWER_UPSTAIRS, send_msg, this, function (rec_msg) {
            var rec_tower = rec_msg.body.tower;
            if (rec_tower == undefined)
                return;
            if (rec_tower.success) {
                // console.log(rec_tower);
                // 提示获取奖励
                _this.getFlowCtrl().setLastReward(rec_tower.r_gold, rec_tower.r_diamond, rec_tower.r_items);
                // Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, rec_tower.r_gold, rec_tower.r_diamond, rec_tower.r_items);
                /*
                if (this.getTowerInfo().out_cur_lv % 10 === 0) {
                    Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, rec_tower.r_gold, rec_tower.r_diamond, rec_tower.r_items);
                } else {

                    if (rec_tower.r_gold > 0) {
                        Singleton.Get(DialogControler).showCommonAlert(DEFINE.UI_ALERT_INFO.gold.name, rec_tower.r_gold, DEFINE.UI_ALERT_INFO.gold.res);
                    }

                    if (rec_tower.r_diamond > 0) {
                        Singleton.Get(DialogControler).showCommonAlert(DEFINE.UI_ALERT_INFO.diamond.name, rec_tower.r_diamond, DEFINE.UI_ALERT_INFO.diamond.res);
                    }

                    for (let i = 0; i < rec_tower.r_items.length; i++) {
                        Singleton.Get(DialogControler).showAlertItem(rec_tower.r_items[i].id, rec_tower.r_items[i].count);
                    }
                }
                 */
                // 进入下一层
                _this.getTowerInfo().goNextLv();
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_TOWER_LV);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    /**
     * 请求重置进度
     */
    TowerManager.prototype.reqReset = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.TOWER_RESET, send_msg, this, function (rec_msg) {
            var rec_tower = rec_msg.body.tower;
            if (rec_tower == undefined)
                return;
            if (rec_tower.success) {
                // 响应重置完成
                _this.getTowerInfo().resetFloor();
                _this.getFlowCtrl().init();
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    /**
     * 请求扫荡
     */
    TowerManager.prototype.reqRaid = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.TOWER_RAID, send_msg, this, function (rec_msg) {
            var rec_tower = rec_msg.body.tower;
            if (rec_tower == undefined)
                return;
            if (rec_tower.success) {
                // 回到最远关
                _this.getTowerInfo().backHisFloor();
                _this.getFlowCtrl().init();
                // 提示奖励
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, rec_tower.r_gold, rec_tower.r_diamond, rec_tower.r_items);
                // 重置楼层胜利等状态
                _this.reqInfo(function () {
                    if (callback != undefined) {
                        callback.call(thisObj, args);
                    }
                }, _this);
            }
        }, true);
    };
    /**
     * 请求首通奖励
     */
    TowerManager.prototype.reqReward = function (rid, callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.tower = new msg.TowerMsg();
        send_msg.body.tower.reward_id = rid;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.TOWER_REWARD, send_msg, this, function (rec_msg) {
            var rec_tower = rec_msg.body.tower;
            if (rec_tower == undefined)
                return;
            if (rec_tower.success) {
                _this.getTowerInfo().setAwardReceived(rid);
                // 提示奖励
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, rec_tower.r_gold, rec_tower.r_diamond, rec_tower.r_items);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_GET_TOWER_AWARD_ID);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    return TowerManager;
}());
__reflect(TowerManager.prototype, "TowerManager");
//# sourceMappingURL=TowerManager.js.map