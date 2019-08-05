var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 玩家信息模块
 */
var PlayerInfoManager = (function () {
    // endregion
    // region 初始化
    /**
     * 构造函数
     */
    function PlayerInfoManager() {
        this.dispatch_reqs = 0;
        this.is_game_loaded = false;
        this.init();
    }
    /**
     * 初始化
     */
    PlayerInfoManager.prototype.init = function () {
        this.attr = new msg.SyncPlayerInfoMsg();
        this.attr.exp = 0;
        this.attr.gold_buy_cnt = 0;
        this.info_listeners = [];
        MessageManager.registeSync(this.onSync, this);
    };
    /**
     * 响应游戏加载完成
     */
    PlayerInfoManager.prototype.onGameLoaded = function () {
        // 单机版
        if (Singleton.Get(MainManager).m_is_single) {
            return;
        }
        Singleton.Get(RegisterUpdate).register(this);
        this.is_game_loaded = true;
    };
    /**
     * 析构函数(手动调用)
     */
    PlayerInfoManager.prototype.dispose = function () {
        Singleton.Get(RegisterUpdate).unRegister(this);
    };
    // endregion
    // region 金币相关处理
    /**
     * 增加金币Gold
     * @param offset
     */
    PlayerInfoManager.prototype.addGold = function (offset) {
        // 没有变化则返回
        if (offset == 0) {
            return;
        }
        // 扣减时检查数量
        if (offset < 0) {
            if (!this.hasGold(offset)) {
                this.attr.gold = 0;
                return;
            }
        }
        this.attr.gold += offset;
        // 注册分发请求
        this.dispatch_reqs++;
    };
    /**
     * 是否拥有足够的金币
     * @param count
     */
    PlayerInfoManager.prototype.hasGold = function (count) {
        return this.attr.gold >= Math.abs(count);
    };
    /**
     * 获取金币数量
     */
    PlayerInfoManager.prototype.getGold = function () {
        return this.attr.gold;
    };
    // endregion
    // region 钻石相关处理
    /**
     * 设置钻石数量
     * @param v
     */
    PlayerInfoManager.prototype.setDiamond = function (v) {
        this.attr.diamond = v;
        this.dispatch_reqs++;
    };
    /**
     * 增加钻石
     * @param offset
     */
    PlayerInfoManager.prototype.addDiamond = function (offset) {
        // 没有变化则返回
        if (offset == 0) {
            return;
        }
        // 扣减时检查数量
        if (offset < 0) {
            if (!this.hasDiamond(offset)) {
                this.attr.diamond = 0;
                this.dispatch_reqs++;
                return;
            }
            Singleton.Get(ActivityManager).getInfo().onSubDiamond_AccSpend(-offset);
        }
        this.attr.diamond += offset;
        // 注册分发请求
        this.dispatch_reqs++;
    };
    /**
     * 是否拥有足够的钻石
     * @param count
     */
    PlayerInfoManager.prototype.hasDiamond = function (count) {
        return this.attr.diamond >= Math.abs(count);
    };
    /**
     * 获取钻石数量
     */
    PlayerInfoManager.prototype.getDiamond = function () {
        return this.attr.diamond;
    };
    // endregion
    // region VIP礼包
    /**
     * 检查特定等级的VIP礼包是否已经购买
     * @param vip_lv
     * @returns {boolean}
     */
    PlayerInfoManager.prototype.checkVipGiftWasted = function (vip_lv) {
        if (!this.attr.vip_award || this.attr.vip_award.length <= 0) {
            return false;
        }
        for (var i = 0; i < this.attr.vip_award.length; i++) {
            if (this.attr.vip_award[i] == vip_lv) {
                return true;
            }
        }
        return false;
    };
    /**
     * 设定特定等级VIP礼包已购买
     * @param vip_lv
     */
    PlayerInfoManager.prototype.setVipGiftWasted = function (vip_lv) {
        if (!this.checkVipGiftWasted(vip_lv)) {
            this.attr.vip_award.push(vip_lv);
        }
        this.dispatch_reqs++;
    };
    // endregion
    // region 杂项信息
    /**
     * 获取队伍等级
     * @returns {number}
     */
    PlayerInfoManager.prototype.getTeamLv = function () {
        return this.attr.team_lv;
    };
    /**
     * 获取队伍经验
     * @returns {number}
     */
    PlayerInfoManager.prototype.getTeamExp = function () {
        return this.attr.exp;
    };
    /**
     * 获取战斗力
     * @returns {number}
     */
    PlayerInfoManager.prototype.getTeamCurrentFighting = function () {
        if (!this.attr.team_current_fighting) {
            return 0;
        }
        return this.attr.team_current_fighting;
    };
    /**
     * 获取VIP等级
     * @returns {number}
     */
    PlayerInfoManager.prototype.getVipLevel = function () {
        return this.attr.vip_level;
    };
    /**
     * 获取队伍历史最高战力
     * @returns {number}
     */
    PlayerInfoManager.prototype.getTeamHistoryMaxFighting = function () {
        return this.attr.team_history_max_fighting;
    };
    /**
     * 获取累计充值金额
     * @returns {number}
     */
    PlayerInfoManager.prototype.getAccRmb = function () {
        return this.attr.acc_rmb;
    };
    /**
     * 获取金币购买上次刷新时间
     * @returns {number}
     */
    PlayerInfoManager.prototype.getLastGoldTime = function () {
        return this.attr.last_gold_time;
    };
    /**
     * 获取当天金币购买次数
     * @returns {number}
     */
    PlayerInfoManager.prototype.getGoldBuyCnt = function () {
        return this.attr.gold_buy_cnt;
    };
    // endregion
    // region 信息同步
    /**
     * 请求同步玩家角色
     */
    PlayerInfoManager.prototype.reqSyncPlayer = function (callback, thisObj) {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.PLAYER_INFO, send_msg, this, function () {
            if (callback) {
                callback.call(thisObj);
            }
        }, false);
    };
    /**
     * 注册一个玩家信息侦听器
     * @param listener
     * @param thisObj
     */
    PlayerInfoManager.prototype.addInfoListener = function (listener, thisObj) {
        for (var i = 0; i < this.info_listeners.length; i++) {
            if (this.info_listeners[i].c == listener) {
                egret.error("cant registe the listener of PlayerInfo, there is already a listener.");
                return;
            }
        }
        this.info_listeners.push(new Listeners(listener, thisObj));
    };
    /**
     * 移除一个玩家信息侦听器
     * @param listener
     */
    PlayerInfoManager.prototype.removeInfoListener = function (listener) {
        for (var i = 0; i < this.info_listeners.length; i++) {
            if (this.info_listeners[i].c == listener) {
                this.info_listeners.splice(i, 1);
                return;
            }
        }
    };
    /**
     * 分发玩家信息改变的消息
     */
    PlayerInfoManager.prototype.dispatchInfoListener = function () {
        var info_listeners = this.info_listeners;
        for (var i = 0; i < info_listeners.length; i++) {
            info_listeners[i].callFunc();
        }
    };
    /**
     * 全局更新
     * @param rec_msg
     */
    PlayerInfoManager.prototype.onSyncRewrite = function (rec_msg) {
        // 没有更新
        if (rec_msg == undefined) {
            return;
        }
        // 任务：注册任务更新
        Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_PLAYER_LEVEL);
        Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_HISTORY_FIGHT);
        if (rec_msg.team_lv != undefined) {
            this.attr.team_lv = rec_msg.team_lv;
            // 任务：注册任务更新
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_PLAYER_LEVEL);
            Singleton.Get(ActivityManager).getAlarm().onUpdate_LvGrow();
            Singleton.Get(ActivityManager).getAlarm().onUpdate_Invest();
            Singleton.Get(LvgiftManager).onLevelup();
        }
        if (rec_msg.gold != undefined) {
            this.attr.gold = rec_msg.gold;
        }
        if (rec_msg.diamond != undefined) {
            this.attr.diamond = rec_msg.diamond;
            Singleton.Get(ActivityManager).getAlarm().onUpdate_DmdPlate();
        }
        if (rec_msg.exp != undefined) {
            this.attr.exp = rec_msg.exp;
        }
        if (rec_msg.vip_level != undefined) {
            this.attr.vip_level = rec_msg.vip_level;
        }
        if (rec_msg.team_current_fighting != undefined && rec_msg.team_current_fighting != 0) {
            this.attr.team_current_fighting = rec_msg.team_current_fighting;
        }
        if (rec_msg.team_history_max_fighting != undefined && rec_msg.team_history_max_fighting != 0) {
            this.attr.team_history_max_fighting = rec_msg.team_history_max_fighting;
        }
        if (rec_msg.acc_rmb != undefined && rec_msg.acc_rmb != 0) {
            this.attr.acc_rmb = rec_msg.acc_rmb;
        }
        if (rec_msg.vip_award != undefined && rec_msg.vip_award.length > 0) {
            this.attr.vip_award = rec_msg.vip_award;
        }
        if (rec_msg.last_gold_time && rec_msg.last_gold_time > 0) {
            this.attr.last_gold_time = rec_msg.last_gold_time;
        }
        if (rec_msg.gold_buy_cnt && rec_msg.last_gold_time > 0) {
            this.attr.gold_buy_cnt = rec_msg.gold_buy_cnt;
        }
        this.dispatch_reqs++;
    };
    /**
     * 响应信息更新
     */
    PlayerInfoManager.prototype.onSync = function (e) {
        // 检查是否需要更新
        var rec_msg = e._player_info;
        if (rec_msg == undefined) {
            return;
        }
        // 玩家信息全局刷新
        if (rec_msg.is_refresh) {
            YWLogger.info("[Player]玩家信息初始化完成", LogType.Sync);
            this.onSyncRewrite(rec_msg);
            return;
        }
        // 更新金币
        if (rec_msg.gold && rec_msg.gold != 0) {
            this.addGold(rec_msg.gold);
            this.dispatch_reqs++;
        }
        // 更新钻石
        if (rec_msg.diamond && rec_msg.diamond != 0) {
            this.addDiamond(rec_msg.diamond);
            Singleton.Get(ActivityManager).getAlarm().onUpdate_DmdPlate();
            this.dispatch_reqs++;
        }
        // 更新经验值
        if (rec_msg.exp && rec_msg.exp != 0 && rec_msg.exp != undefined) {
            this.attr.exp += rec_msg.exp;
            this.dispatch_reqs++;
        }
        // 更新等级
        if (rec_msg.team_lv && rec_msg.team_lv != 0) {
            this.attr.team_lv += rec_msg.team_lv;
            this.dispatch_reqs++;
            // 任务：注册任务更新
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_PLAYER_LEVEL);
            Singleton.Get(ActivityManager).getAlarm().onUpdate_LvGrow();
            Singleton.Get(ActivityManager).getAlarm().onUpdate_Invest();
            Singleton.Get(LvgiftManager).onLevelup();
        }
        // 更新战斗力（全值）
        if (rec_msg.team_current_fighting && rec_msg.team_current_fighting != 0) {
            // 任务：注册任务更新
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_HISTORY_FIGHT);
            this.attr.team_current_fighting = rec_msg.team_current_fighting;
            this.dispatch_reqs++;
        }
        // 更新历史最高战力（全值）
        if (rec_msg.team_history_max_fighting && rec_msg.team_history_max_fighting != 0) {
            // 任务：注册任务更新
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_HISTORY_FIGHT);
            this.attr.team_history_max_fighting = rec_msg.team_history_max_fighting;
            this.dispatch_reqs++;
        }
        // 更新VIP等级（全值）
        if (rec_msg.vip_level && rec_msg.vip_level > 0) {
            this.attr.vip_level = rec_msg.vip_level;
            this.dispatch_reqs++;
        }
        // 如果当前战力大于历史最高战力，更新历史最高战力
        if (this.attr.team_current_fighting > this.attr.team_history_max_fighting) {
            this.attr.team_history_max_fighting = this.attr.team_current_fighting;
            this.dispatch_reqs++;
        }
        // 更新累计充值金额
        if (rec_msg.acc_rmb && rec_msg.acc_rmb != 0) {
            this.attr.acc_rmb = rec_msg.acc_rmb;
            this.dispatch_reqs++;
        }
        // 更新VIP奖励
        if (rec_msg.vip_award && rec_msg.vip_award.length > 0) {
            this.attr.vip_award = rec_msg.vip_award;
            this.dispatch_reqs++;
        }
        // 更新金币兑换刷新时间
        if (rec_msg.last_gold_time && rec_msg.last_gold_time > 0) {
            this.attr.last_gold_time = rec_msg.last_gold_time;
            this.dispatch_reqs++;
        }
        // 更新今日金币兑换次数
        if (rec_msg.gold_buy_cnt && rec_msg.last_gold_time > 0) {
            this.attr.gold_buy_cnt = rec_msg.gold_buy_cnt;
            this.dispatch_reqs++;
        }
    };
    // endregion
    // region 帧更新
    /**
     * 帧更新
     * @param time
     */
    PlayerInfoManager.prototype.update = function (time) {
        // 处理侦听器消息队列
        if (this.dispatch_reqs > 0 && this.info_listeners.length > 0) {
            this.dispatchInfoListener();
            this.dispatch_reqs = 0;
        }
    };
    PlayerInfoManager.prototype.engrave = function () {
        this.engrave_fighting = this.getTeamCurrentFighting();
    };
    /**
     * 释放刻下的战力
     */
    PlayerInfoManager.prototype.releaseFighting = function () {
        var fighting = this.getTeamCurrentFighting();
        var fighting_offset = fighting - this.engrave_fighting;
        if (fighting_offset > 0) {
            Singleton.Get(DialogControler).showStrength("+" + fighting_offset);
        }
    };
    return PlayerInfoManager;
}());
__reflect(PlayerInfoManager.prototype, "PlayerInfoManager", ["IUpdate"]);
var Listeners = (function () {
    function Listeners(callback, thisObj) {
        this.c = callback;
        this.t = thisObj;
    }
    Listeners.prototype.callFunc = function () {
        this.c.call(this.t);
    };
    return Listeners;
}());
__reflect(Listeners.prototype, "Listeners");
//# sourceMappingURL=PlayerInfoManager.js.map