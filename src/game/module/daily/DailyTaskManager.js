var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DailyTaskManager = (function () {
    /**
     * @constructor
     */
    function DailyTaskManager() {
        this.m_daily = null;
        this.m_npc = null;
        this.m_daily = new PlayerDailyTaskInfo();
        this.m_npc = new DailyTaskNpcInfo();
    }
    DailyTaskManager.prototype.onGameLoaded = function () {
        this.reqInfo();
    };
    // region 数据操作
    /**
     * 获取历练数据
     * @returns {PlayerDailyTaskInfo}
     */
    DailyTaskManager.prototype.getData = function () {
        return this.m_daily;
    };
    /**
     * 获取NPC对话数据
     * @returns {DailyTaskNpcInfo}
     */
    DailyTaskManager.prototype.getNpc = function () {
        return this.m_npc;
    };
    // endregion
    // region 网络请求
    /**
     * 请求历练基本信息
     * @param callback
     * @param thisObj
     * @param args
     */
    DailyTaskManager.prototype.reqInfo = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.DAILY_TASK_INFO, send_msg, this, function (rec_msg) {
            var rec_daily = rec_msg.body.daily_task;
            if (rec_daily == null)
                return;
            if (rec_daily.success) {
                // 更新消息
                _this.getData().updateInfo(rec_daily.my_info);
                if (callback != null) {
                    callback.call(thisObj, args);
                }
            }
        }, false);
    };
    /**
     * 请求提升魅力等级
     * @param callback
     * @param thisObj
     */
    DailyTaskManager.prototype.reqUpgrade = function (callback, thisObj) {
        // info 1139 charm lv max
        var _this = this;
        // 如果基本信息过期 则先请求更新Info
        if (!this.getData().checkUpToDate()) {
            this.reqInfo(this.reqUpgrade, this, callback, thisObj);
            return;
        }
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.DAILY_TASK_UPGRADE, send_msg, this, function (rec_msg) {
            var rec_daily = rec_msg.body.daily_task;
            if (rec_daily == null)
                return;
            if (rec_daily.success) {
                // 更新信息
                Singleton.Get(RoleManager).getRolesInfo().updateCharmLv(rec_daily.charm_lv);
                // 奖励道具列表为空时自动构造 防错
                if (rec_daily.r_items == null) {
                    rec_daily.r_items = [];
                }
                if (callback != null) {
                    callback.call(thisObj, function () {
                        // 提示升级奖励
                        if (rec_daily.r_gold > 0 || rec_daily.r_diamond > 0 || rec_daily.r_items.length > 0) {
                            Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_dailytask15"), 0, rec_daily.r_gold, rec_daily.r_diamond, rec_daily.r_items);
                        }
                        //else {
                        //    Singleton.Get(DialogControler).showString(Template.getGUIText("append_33"));
                        //}
                        var charm_entity = _this.getData().getCharmEntity();
                        var charm_entity_prev = Template.taskLv.get(charm_entity.Lv - 1);
                        var delta_hp = charm_entity.Hp - charm_entity_prev.Hp;
                        var delta_atk = charm_entity.Atk - charm_entity_prev.Atk;
                        var delta_atk_sp = charm_entity.AtkSp - charm_entity_prev.AtkSp;
                        if (delta_hp != 0) {
                            Singleton.Get(DialogControler).showString("生  命" + ((delta_hp > 0) ? "+" : "-") + Math.abs(delta_hp));
                        }
                        if (delta_atk != 0) {
                            Singleton.Get(DialogControler).showString("物理攻击" + ((delta_atk > 0) ? "+" : "-") + Math.abs(delta_atk));
                        }
                        if (delta_atk_sp != 0) {
                            Singleton.Get(DialogControler).showString("特技攻击" + ((delta_atk_sp > 0) ? "+" : "-") + Math.abs(delta_atk_sp));
                        }
                        // 任务：注册任务更新
                        Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_CHARM_LV);
                    }, _this);
                }
            }
        }, true);
    };
    /**
     * 请求领取魅力等级奖励
     * @param callback
     * @param thisObj
     */
    DailyTaskManager.prototype.reqReward = function (reward_id, callback, thisObj) {
        var _this = this;
        // 如果基本信息过期 则先请求更新Info
        if (!this.getData().checkUpToDate()) {
            this.reqInfo(this.reqReward, this, reward_id, callback, thisObj);
            return;
        }
        var send_msg = new msg.CommonMsg();
        send_msg.body.daily_task = new msg.DailyTaskMsg();
        send_msg.body.daily_task.reward_id = reward_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.DAILY_TASK_REWARD, send_msg, this, function (rec_msg) {
            var rec_daily = rec_msg.body.daily_task;
            if (rec_daily == null)
                return;
            if (rec_daily.success) {
                // 更新信息
                _this.getData().markRewardAsReceived(reward_id);
                // 提示升级奖励
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, rec_daily.r_gold, rec_daily.r_diamond, rec_daily.r_items);
                if (callback != null) {
                    callback.call(thisObj);
                }
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_GET_CHARM_LV_AWARD_ID);
            }
        }, true);
    };
    return DailyTaskManager;
}());
__reflect(DailyTaskManager.prototype, "DailyTaskManager");
//# sourceMappingURL=DailyTaskManager.js.map