var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ArenaBattleView = ui.ArenaBattleView;
var ArenaManager = (function () {
    function ArenaManager() {
        this.my_cur_rank = 0;
        this.my_history_rank = 0;
        this.m_last_enemy_refresh_time = 0;
        this.m_cur_enemies = [];
        this.m_last_reward_refresh_time = 0;
        this.m_rank_reward_status = []; // 竞技场累计排名奖励状态
        this.rank_offset = 0; // 距离上次排名变化产生的变化值
        // endregion
        // region 消息处理
        /**
         * 请求初始化
         */
        this.try_init_times = 0;
        this.init_timer = undefined;
    }
    /**
     * 响应登录完成
     */
    ArenaManager.prototype.onGameLoaded = function () {
        var _this = this;
        this.reqRank(function () {
            _this.reqRewardInfo(undefined, undefined, true);
        }, this);
        // Singleton.Get(BattleStateGateway).register(battle.E_BATTLE_TYPE.ARENA, undefined, this.onBattleStateExecute, this);
    };
    // region 外部获取竞技场信息
    /**
     * 获取玩家排行
     * @returns {number}
     */
    ArenaManager.prototype.getMyCurRank = function () {
        return this.my_cur_rank;
    };
    /**
     * 获取玩家历史排行
     */
    ArenaManager.prototype.getMyHistoryRank = function () {
        return this.my_history_rank;
    };
    ArenaManager.prototype.reqInit = function () {
        this.init_timer = new egret.Timer(800, 1); // 延迟请求
        this.init_timer.addEventListener(egret.TimerEvent.TIMER, this.execInit, this);
        this.init_timer.start();
    };
    ArenaManager.prototype.execInit = function () {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // console.log("发送竞技场init请求");
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ARENA_INIT, send_msg, this, function (rec_msg) {
            if (rec_msg.body.arena == undefined)
                return;
            // console.log("收到竞技场init请求");
            if (rec_msg.body.arena.success) {
                // console.log("请求了竞技场init: " + rec_msg.body.arena.my_cur_rank + " | " + rec_msg.body.arena.my_history_rank);
                _this.my_cur_rank = rec_msg.body.arena.my_cur_rank;
                _this.my_history_rank = rec_msg.body.arena.my_history_rank;
                _this.init_timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, _this.execInit, _this);
                _this.init_timer = undefined;
                if (_this.my_history_rank <= 0 || _this.my_cur_rank <= 0) {
                    if (_this.try_init_times > 3) {
                        MessageManager.handleDisconnect(1);
                        return;
                    }
                    _this.try_init_times++;
                    _this.reqInit(); // 如果没有竞技场信息，则请求初始化竞技场
                }
                else {
                    _this.try_init_times = 0;
                    _this.reqRewardInfo();
                }
            }
        }, false);
    };
    /**
     * 请求排行信息
     */
    ArenaManager.prototype.reqRank = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ARENA_RANK, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.arena)
                return;
            if (rec_msg.body.arena.success) {
                _this.my_cur_rank = rec_msg.body.arena.my_cur_rank;
                _this.my_history_rank = rec_msg.body.arena.my_history_rank;
                if (_this.my_history_rank <= 0 || _this.my_cur_rank <= 0) {
                    _this.reqInit(); // 如果没有竞技场信息，则请求初始化竞技场
                }
                else {
                    if (callback) {
                        callback.call(thisObj);
                    }
                }
            }
            else {
                _this.reqInit(); // 如果没有竞技场信息，则请求初始化竞技场
            }
        }, false);
    };
    /**
     * 请求对手信息
     */
    ArenaManager.prototype.reqEnemies = function (callback, thisObj, force) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 检查刷新间隔
        if (!this.checkEnemiesRefreshTime() && !force) {
            if (this.m_cur_enemies) {
                callback.call(thisObj, [this.m_cur_enemies]);
                return;
            }
        }
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ARENA_ENEMY, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.arena)
                return;
            if (rec_msg.body.arena.success) {
                _this.m_last_enemy_refresh_time = UtilsGame.Now();
                _this.m_cur_enemies = rec_msg.body.arena.enemies;
                if (callback) {
                    callback.call(thisObj, [rec_msg.body.arena.enemies]);
                }
            }
        }, true);
    };
    ArenaManager.prototype.reqChallenge = function () {
    };
    /**
     * 请求挑战
     * @param rank
     */
    ArenaManager.prototype.actBattleArena = function (enemy, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.arena = new msg.ArenaMsg();
        send_msg.body.arena.enemy_rank_id = enemy.ranking;
        // 发送请求消息
        QueuedGateway.addRequest(QueuedGatewayType.BATTLE, NetConst.ARENA_CHALLENGE, send_msg, this, function (rec_msg) {
            // 检查返回消息
            var rec_data = rec_msg.body.arena;
            if (!rec_data) {
                Singleton.Get(battle.BattleStateMachine).reset();
                console.log("arena battle data is empty.");
                return;
            }
            // 进入战斗不成功
            if (!rec_data.success) {
                Singleton.Get(battle.BattleStateMachine).reset();
                console.log("enter battle failed.");
                return;
            }
            if (rec_data.my_cur_rank > 0) {
                _this.rank_offset = _this.my_cur_rank - rec_data.my_cur_rank;
                _this.my_cur_rank = rec_data.my_cur_rank;
                _this.my_history_rank = rec_data.my_history_rank;
            }
            var battle_wrapper = new msg.BattleResultMsg();
            battle_wrapper.pack = rec_data.battle_data;
            // 记录秒伤数据
            Singleton.Get(DmgManager).getDmgInfo().saveDmg(E_DMG_STAT_TYPE.ARENA, rec_data.battle_data);
            // 切换黑屏后加载新战斗
            Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.ARENA, battle.E_BATTLE_FLOW.PLAYING);
            Singleton.Get(battle.RoundManager).CutScene(false, function () {
                Singleton.Get(battle.RoundManager).Enter(battle_wrapper, _this.handleBattleEnd, _this, [rec_data.battle_data, rec_data.r_items]);
            }, _this);
            Singleton.Get(LayerManager).getView(ArenaBattleView).setExitParams([rec_data.battle_data, rec_data.r_items]);
            // 执行回调
            if (callback) {
                callback.call(thisObj);
            }
            // 任务：注册任务更新
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.ARENA_CNT);
        }, true);
    };
    /**
     * 请求扫荡
     */
    ArenaManager.prototype.reqRaid = function (callback, thisObj) {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ARENA_RAID, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.arena)
                return;
            if (rec_msg.body.arena.success) {
                var arena_msg = rec_msg.body.arena;
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("append_30"), 0, arena_msg.r_gold, arena_msg.r_diamond, arena_msg.r_items);
                if (callback) {
                    callback.call(thisObj);
                }
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.ARENA_CNT);
            }
        }, true);
    };
    /**
     * 请求获取奖励信息
     */
    ArenaManager.prototype.reqRewardInfo = function (callback, thisObj, force) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 检查刷新间隔
        if (!this.checkRankRewardRefreshTime() && !force) {
            if (!this.m_rank_reward_status) {
                callback.call(thisObj);
                return;
            }
        }
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ARENA_REWARD_INFO, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.arena || !rec_msg.body.arena.success) {
                console.log("Arena reward info not success");
            }
            if (rec_msg.body.arena.success) {
                // 赋新的奖励信息
                if (rec_msg.body.arena.rank_reward_info) {
                    _this.m_last_reward_refresh_time = UtilsGame.Now();
                    _this.m_rank_reward_status = rec_msg.body.arena.rank_reward_info;
                }
            }
            if (callback) {
                callback.call(thisObj);
            }
        }, false);
    };
    /**
     * 请求领取排行奖励
     */
    ArenaManager.prototype.reqRankReward = function (rank_reward_id, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.arena = new msg.ArenaMsg();
        send_msg.body.arena.reward_id = rank_reward_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ARENA_RANK_REWARD, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.arena)
                return;
            if (rec_msg.body.arena.success) {
                var arena_msg = rec_msg.body.arena;
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, arena_msg.r_gold, arena_msg.r_diamond, arena_msg.r_items);
                _this.reqRewardInfo(callback, thisObj, true);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_GET_ARENA_AWARD_ID);
            }
        }, true);
    };
    // endregion
    // region 流程控制
    /**
     * 处理战斗结束
     */
    ArenaManager.prototype.handleBattleEnd = function (params) {
        // 胜利
        if (params) {
            if (params[0].m_result > 0) {
                Singleton.Get(LayerManager).getView(ui.ArenaResultAlertView).initContent(true, this.rank_offset, params[1]);
            }
            else {
                Singleton.Get(LayerManager).getView(ui.ArenaResultAlertView).initContent(false, 0, params[1]);
                // 弹出战斗失败提示框
                Singleton.Get(DialogControler).showAlertLose();
            }
        }
        // 弹出胜利结算弹框
        Singleton.Get(LayerManager).getView(ui.ArenaResultAlertView).open();
        this.handleToPve();
    };
    /**
     * 处理返回PVE战斗
     */
    ArenaManager.prototype.handleToPve = function () {
        Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.ARENA, battle.E_BATTLE_FLOW.FINISH);
        Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.PVE, battle.E_BATTLE_BEHAVIOR.PASSIVE);
    };
    /**
     * 战斗开始时打开战斗界面
     */
    ArenaManager.prototype.onBattleBegin = function (enemy) {
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.MainView).hide();
        layer.getView(ui.MainView).showBattlePanel();
        layer.getView(ui.BattleView).showArenaMode();
        layer.getView(ui.ArenaBattleView).open();
        layer.getView(ui.ArenaBattleView).initContent(enemy, battle.BattleType.ARENA);
        Singleton.Get(PveManager).cleanRewardHash();
        // 关闭已打开的界面
        Singleton.Get(LayerManager).getView(ui.ArenaBaseView).close();
    };
    // endregion
    // region 工具方法
    /**
     * 检查是否可以刷新敌人列表了
     * @returns {boolean}
     */
    ArenaManager.prototype.checkEnemiesRefreshTime = function () {
        return UtilsGame.Now() - this.m_last_enemy_refresh_time > DEFINE.ARENA_ENEMY_REFRESH_DURATION;
    };
    ArenaManager.prototype.getEnemiesRefreshTime = function () {
        var t = ((DEFINE.ARENA_ENEMY_REFRESH_DURATION - (UtilsGame.Now() - this.m_last_enemy_refresh_time)) / 1000) >> 0;
        if (t < 1)
            t = 1;
        return t;
    };
    /**
     * 检查是否可以刷新奖励列表了
     * @returns {boolean}
     */
    ArenaManager.prototype.checkRankRewardRefreshTime = function () {
        return UtilsGame.Now() - this.m_last_reward_refresh_time > DEFINE.ARENA_REWARD_REFRESH_DURATION;
    };
    /**
     * 获取排行奖励状态列表（数组中为已经获取过的奖励）
     * @returns {number[]}
     */
    ArenaManager.prototype.getRankRewardStatus = function () {
        return this.m_rank_reward_status;
    };
    /**
     * 檢查排行榜獎勵是否已經領取過
     * @param rank_reward_id
     * @returns {boolean}
     */
    ArenaManager.prototype.checkRankRewardAquired = function (rank_reward_id) {
        for (var i = 0; i < this.m_rank_reward_status.length; i++) {
            if (this.m_rank_reward_status[i] == rank_reward_id) {
                return true;
            }
        }
        return false;
    };
    /**
     * 檢查排行榜獎勵是否滿足領取條件
     * @param rank_reward_id
     * @returns {boolean}
     */
    ArenaManager.prototype.checkRankRewardAvailable = function (rank_reward_id) {
        var rank_reward_info = Template.rankaward.get(rank_reward_id);
        if (!rank_reward_info) {
            egret.error("no rankaward: " + rank_reward_id);
            return false;
        }
        return this.my_history_rank <= rank_reward_info.ID;
    };
    /**
     * 检查是否有任何奖励满足领取条件
     */
    ArenaManager.prototype.checkAnyRewardAvaliable = function () {
        if (Template.rankaward == undefined || Template.rankaward.size() <= 0) {
            return false;
        }
        var rankawards = UtilsGame.cloneObject(Template.rankaward.keys);
        rankawards.sort();
        rankawards.reverse();
        // console.log("我的排名:" + this.my_history_rank);
        for (var i = 0; i < rankawards.length; i++) {
            if (rankawards[i] < this.my_history_rank) {
                // console.log(rankawards[i] + " 低于排名，忽略。");
                continue;
            }
            if (!this.checkRankRewardAquired(rankawards[i])) {
                // console.log(rankawards[i] + " 未领取！");
                return true;
            }
        }
        return false;
    };
    /**
     * 展示购买竞技场次数
     * @param callback
     * @param thisObj
     */
    ArenaManager.prototype.showBuyScroll = function (callback, thisObj) {
        var scroll_id = Template.config.ArenaScroll;
        var scroll_info = Template.scroll.get(scroll_id);
        if (!scroll_info) {
            egret.error("no scroll: " + scroll_id);
            return;
        }
        // 获取玩家挑战券信息
        var my_vip_lv = Singleton.Get(PlayerInfoManager).getVipLevel();
        var my_scroll_base_info = Singleton.Get(ScrollManager).getScroll(scroll_id);
        var price = Singleton.Get(ScrollManager).getScrollPrice(scroll_id);
        var buy_cnt = !my_scroll_base_info ? 0 : my_scroll_base_info.buy_cnt;
        var surplus_chance = Template.scroll.get(scroll_id).BuyTime[my_vip_lv] - buy_cnt;
        // 判断挑战券购买次数
        if (surplus_chance <= 0) {
            Singleton.Get(DialogControler).showString(Template.getGUIText("append_31"));
            return;
        }
        // 弹窗确认
        Singleton.Get(DialogControler).showBuy(UtilsGame.stringHander(Template.getGUIText("ui_pve_30"), price, scroll_info.ASpurchase, Template.getGUIText(scroll_info.Name), my_vip_lv, surplus_chance), "", price, DEFINE.UI_ALERT_INFO.diamond, function () {
            Singleton.Get(ScrollManager).reqBuy(scroll_id, callback, thisObj);
        }, this);
    };
    // endregion
    // region 引导
    ArenaManager.prototype.onHandleRankReward = function (idx) {
        Singleton.Get(ArenaManager).reqRankReward(idx, function () {
            Singleton.Get(LayerManager).getView(ui.ArenaRewardPanelView).switchTabRank();
        }, this);
    };
    // endregion
    // region 红点提示
    ArenaManager.prototype.isAlarm = function () {
        return this.checkAnyRewardAvaliable();
    };
    return ArenaManager;
}());
__reflect(ArenaManager.prototype, "ArenaManager");
//# sourceMappingURL=ArenaManager.js.map