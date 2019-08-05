var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 副本管理器
 */
var InstanceManager = (function () {
    // endregion
    // region 初始化
    /**
     * 构造函数
     */
    function InstanceManager() {
        this.reward_hash = "";
        this.init();
        MessageManager.registeSync(this.onSync, this);
    }
    /**
     * 初始化
     */
    InstanceManager.prototype.init = function () {
    };
    /**
     * 响应游戏加载完成
     */
    InstanceManager.prototype.onGameLoaded = function () {
        // Singleton.Get(BattleStateGateway).register(battle.E_BATTLE_TYPE.INSTANCE, undefined, this.onBattleStateExecute, this);
    };
    /**
     * 响应执行战斗状态变更
     */
    InstanceManager.prototype.onBattleStateExecute = function () {
    };
    /**
     * 外部获取副本信息
     * @returns {PlayerInstanceInfo}
     */
    InstanceManager.prototype.getInstanceInfo = function () {
        if (this.instance_info.last_reset_time < Common.getTodayResetTime()) {
            this.onReqInfo();
        }
        return this.instance_info;
    };
    // endregion
    // region 响应同步
    /**
     * 响应强制写入
     * @param rec_msg
     */
    InstanceManager.prototype.onSyncRewrite = function (rec_msg) {
        if (!rec_msg) {
            YWLogger.info("[Instance]无法刷新副本信息，挑战券为空", LogType.Sync);
            return;
        }
        this.instance_info = InstanceUtil.convSyncToDict(rec_msg);
        YWLogger.info("[Instance]副本信息初始化完成", LogType.Sync);
        YWLogger.info(this.instance_info, LogType.Sync);
    };
    /**
     * 响应数据同步
     * @param e
     */
    InstanceManager.prototype.onSync = function (e) {
        var _this = this;
        // 检查是否需要更新
        var rec_msg = e._instance;
        if (!rec_msg) {
            return;
        }
        var rec_info = InstanceUtil.convSyncToDict(rec_msg);
        // 更新uid信息 TODO 是否有必要？
        if (rec_info.uid) {
            this.instance_info.uid = rec_msg.uid;
        }
        if (rec_info.challenge_buy_cnt) {
            this.instance_info.challenge_buy_cnt = rec_info.challenge_buy_cnt;
        }
        if (rec_info.last_reset_time) {
            this.instance_info.last_reset_time = rec_info.last_reset_time;
        }
        if (rec_info.reward_hash) {
            this.instance_info.reward_hash = rec_info.reward_hash;
        }
        if (rec_info.reward_instance_id) {
            this.instance_info.reward_instance_id = rec_info.reward_instance_id;
        }
        if (rec_info.instance_count.size() > 0) {
            rec_info.instance_count.foreachKey(function (key) {
                _this.instance_info.instance_count.update(key, rec_info.instance_count.get(key));
            }, this);
        }
        if (rec_info.farest_id.size() > 0) {
            rec_info.farest_id.foreachKey(function (key) {
                _this.instance_info.farest_id.update(key, rec_info.farest_id.get(key));
            }, this);
        }
        if (rec_info.far_win_id.size() > 0) {
            rec_info.far_win_id.foreachKey(function (key) {
                _this.instance_info.far_win_id.update(key, rec_info.far_win_id.get(key));
            }, this);
        }
        // console.log("[Instance]副本信息更新完成");
    };
    // endregion
    // region 请求处理
    /**
     * 获取副本基本信息
     */
    InstanceManager.prototype.onReqInfo = function () {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.INSTANCE_INFO, send_msg, this, function (data) {
            // console.log("刷新了副本信息");
        }, false);
    };
    /**
     * 切换至关卡战斗
     */
    InstanceManager.prototype.actBattleInstance = function (instance_id, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.instance = new msg.InstanceMsg();
        send_msg.body.instance.instance_id = instance_id;
        // 发送请求消息
        QueuedGateway.addRequest(QueuedGatewayType.BATTLE, NetConst.INSTANCE_BATTLE, send_msg, this, function (data) {
            // 检查返回消息
            var rec_msg = data.body.instance;
            if (!rec_msg) {
                console.log("instance battle data is empty.");
                Singleton.Get(battle.BattleStateMachine).reset();
                return;
            }
            // 进入战斗不成功
            if (rec_msg.success == false) {
                console.log("enter battle failed.");
                Singleton.Get(battle.BattleStateMachine).reset();
                return;
            }
            _this.reward_hash = rec_msg.reward_hash;
            var battle_wrapper = new msg.BattleResultMsg();
            battle_wrapper.pack = rec_msg.battle_data;
            // 任务：注册任务更新
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.INSTANCE_GOLD);
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_INSTANCE_GOLD);
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.INSTANCE_EQUIP);
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_INSTANCE_EQUIP);
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.INSTANCE_HERO);
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_INSTANCE_HERO);
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.INSTANCE_MAT);
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_INSTANCE_MAT);
            // 记录秒伤信息
            Singleton.Get(DmgManager).getDmgInfo().saveDmg(E_DMG_STAT_TYPE.INS, rec_msg.battle_data);
            // 切换黑屏后加载新战斗
            Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.INSTANCE, battle.E_BATTLE_FLOW.PLAYING);
            Singleton.Get(battle.RoundManager).CutScene(false, function () {
                Singleton.Get(battle.RoundManager).Enter(battle_wrapper, _this.handleBattleEnd, _this, [rec_msg.battle_data]);
            }, _this);
            console.log("======== \u526F\u672C\u6218\u6597[" + UtilsGame.dateToStr(UtilsGame.Now()) + "] ========");
            console.log(rec_msg.battle_data);
            console.log("===============================================");
            // 执行回调
            if (callback) {
                callback.call(thisObj);
            }
        }, true);
    };
    /**
     * 请求扫荡
     */
    InstanceManager.prototype.onReqRaid = function (instance_id) {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.instance = new msg.InstanceMsg();
        send_msg.body.instance.instance_id = instance_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.INSTANCE_RAID, send_msg, this, function (data) {
            var rec_msg = data.body.instance;
            if (!rec_msg) {
                console.log("instance raid data is empty.");
                return;
            }
            if (rec_msg.success) {
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.INSTANCE_GOLD);
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_INSTANCE_GOLD);
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.INSTANCE_EQUIP);
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_INSTANCE_EQUIP);
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.INSTANCE_HERO);
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_INSTANCE_HERO);
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.INSTANCE_MAT);
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_INSTANCE_MAT);
                // 弹出胜利结算弹框
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("append_45"), rec_msg.exp, rec_msg.gold, 0, rec_msg.bag_items);
                Singleton.Get(LayerManager).getView(ui.InstanceNewListView).refresh();
            }
            console.log(data);
        }, true);
    };
    /**
     * 请求购买挑战次数
     * @param instance_id
     */
    InstanceManager.prototype.onReqBuyChance = function (instance_id) {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.instance = new msg.InstanceMsg();
        send_msg.body.instance.instance_id = instance_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.INSTANCE_BUY_CHANCE, send_msg, this, function (data) {
            var rec_msg = data.body.instance;
            if (!rec_msg) {
                console.log("scroll buy chance msg is empty.");
                return;
            }
            if (rec_msg.success) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("append_47"));
                Singleton.Get(LayerManager).getView(ui.InstanceNewListView).refresh();
            }
        }, true);
    };
    /**
     * 请求战斗结果
     */
    InstanceManager.prototype.onReqResult = function () {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.instance = new msg.InstanceMsg();
        send_msg.body.instance.reward_hash = this.reward_hash;
        // 发送请求消息
        YWLogger.log("InstanceManager onReqResult() before request", LogLevel.INFO, LogType.Instance);
        HttpClient.HandlRequestAsWait(NetConst.INSTANCE_RESULT, send_msg, this, function (data) {
            YWLogger.log("InstanceManager onReqResult() before response", LogLevel.INFO, LogType.Instance);
            var rec_msg = data.body.instance;
            if (!rec_msg || !rec_msg.success) {
                YWLogger.log("InstanceManager onReqResult() not success", LogLevel.INFO, LogType.Instance);
                _this.handleExitBattle();
                return;
            }
            YWLogger.log("InstanceManager onReqResult() before handleSuccess", LogLevel.INFO, LogType.Instance);
            _this.handleBattleSuccess(rec_msg);
        }, true);
    };
    // endregion
    // region 流程控制
    /**
     * 进入副本
     * @param ins_id
     */
    InstanceManager.prototype.onHandleGo = function (ins_id) {
        var _this = this;
        var ins_info = Singleton.Get(InstanceManager).getInstanceInfo().getInstanceInfo(ins_id);
        if (ins_info == undefined) {
            egret.error("no instance info: " + ins_info);
            return;
        }
        if (ins_info.raid_openTeamLevel) {
            // 扫荡
            Singleton.Get(InstanceManager).onReqRaid(ins_id);
        }
        else {
            // 挑战
            var cfg_ins = Template.instance.get(ins_id);
            if (!ins_id) {
                console.log("no instance: " + ins_id);
                return;
            }
            var cfg_scene_1 = Template.scene.get(cfg_ins.Scene);
            if (!cfg_scene_1) {
                console.log("no scene: " + cfg_ins.Scene);
                return;
            }
            Singleton.Get(LayerManager).getView(ui.SyncLoadingView).open(DEFINE.SYNC_LOADING_DURATION);
            ResManager.getResAsync(cfg_scene_1.bgBack, function () {
                ResManager.getResAsync(cfg_scene_1.bgFront, function () {
                    Singleton.Get(LayerManager).getView(ui.SyncLoadingView).cancleOpen();
                    Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.INSTANCE, battle.E_BATTLE_BEHAVIOR.POSITIVE, function () { }, _this, ins_id);
                }, _this);
            }, this);
        }
    };
    /**
     * 处理战斗结束
     */
    InstanceManager.prototype.handleBattleEnd = function (bat) {
        YWLogger.log("InstanceManager handleBattleEnd()", LogLevel.INFO, LogType.Instance);
        if (bat[0].m_result > 0) {
            // 胜利
            YWLogger.log("InstanceManager handleBattleEnd() victory", LogLevel.INFO, LogType.Instance);
            this.onReqResult();
        }
        else {
            // 失败
            YWLogger.log("InstanceManager handleBattleEnd() defeat", LogLevel.INFO, LogType.Instance);
            this.handleBattleFailed();
        }
    };
    /**
     * 处理战斗失败
     */
    InstanceManager.prototype.handleBattleFailed = function () {
        YWLogger.log("InstanceManager handleBattleFailed()", LogLevel.INFO, LogType.Instance);
        Singleton.Get(LayerManager).getView(ui.InstanceNewBaseView).onBattleEnd();
        // 弹出失败弹框
        Singleton.Get(DialogControler).showAlertLose();
        this.handleToPve();
    };
    /**
     * 处理战斗胜利
     */
    InstanceManager.prototype.handleBattleSuccess = function (rec_msg) {
        YWLogger.log("InstanceManager handleBattleSuccess()", LogLevel.INFO, LogType.Instance);
        Singleton.Get(LayerManager).getView(ui.InstanceNewBaseView).onBattleEnd();
        // 弹出胜利结算弹框
        Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("append_48"), rec_msg.exp, rec_msg.gold, 0, rec_msg.bag_items);
        this.handleToPve();
    };
    /**
     * 处理中途退出战斗
     */
    InstanceManager.prototype.handleExitBattle = function () {
        YWLogger.log("InstanceManager handleExitBattle() before onBattleEnd", LogLevel.INFO, LogType.Instance);
        Singleton.Get(LayerManager).getView(ui.InstanceNewBaseView).onBattleEnd();
        YWLogger.log("InstanceManager handleExitBattle() before ToPve", LogLevel.INFO, LogType.Instance);
        this.handleToPve();
    };
    /**
     * 处理返回PVE战斗
     */
    InstanceManager.prototype.handleToPve = function () {
        // 标记为播放已完成
        Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.INSTANCE, battle.E_BATTLE_FLOW.FINISH);
        // 请求下一场战斗
        Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.PVE, battle.E_BATTLE_BEHAVIOR.PASSIVE);
    };
    // endregion
    // region 通知提醒
    /**
     * 检查副本系统是否有新的提醒
     */
    InstanceManager.prototype.checkRemind = function () {
        var fbtype = Template.fbtype;
        for (var i = 0; i < fbtype.keys.length; i++) {
            // 判断是否解锁 未解锁的continue
            if (Singleton.Get(PlayerInfoManager).getTeamLv() < fbtype.get(fbtype.keys[i]).OpenLv) {
                continue;
            }
            // 判断挑战券是否有余量
            var scroll_id = fbtype.get(fbtype.keys[i]).Consume;
            var my_scroll = Singleton.Get(ScrollManager).getScrollActual(scroll_id);
            if (my_scroll[0] > 0) {
                return true;
            }
        }
        return false;
    };
    /**
     * 检查是否有剩余挑战券的副本
     * @param instance_type
     * @returns {boolean}
     */
    InstanceManager.prototype.checkInstanceRemind = function (instance_type) {
        var scroll_id = 0;
        var fbtype = Template.fbtype;
        for (var i = 0; i < fbtype.keys.length; i++) {
            if (fbtype.get(fbtype.keys[i]).Type == instance_type) {
                scroll_id = fbtype.get(fbtype.keys[i]).Consume;
                break;
            }
        }
        if (scroll_id == 0) {
            egret.error("no scroll: " + scroll_id);
            return false;
        }
        var my_scroll = Singleton.Get(ScrollManager).getScrollActual(scroll_id);
        return my_scroll[0] > 0;
    };
    return InstanceManager;
}());
__reflect(InstanceManager.prototype, "InstanceManager");
//# sourceMappingURL=InstanceManager.js.map