var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerDailyTaskInfo = (function () {
    /**
     * @constructor
     */
    function PlayerDailyTaskInfo() {
        this.m_last_update = 0;
        this.tasks = [];
        this.rewards = [];
    }
    /**
     * 更新数据
     * @param data
     */
    PlayerDailyTaskInfo.prototype.updateInfo = function (data) {
        if (!data) {
            console.error("can't apply player duel info, info is null.");
            return;
        }
        this.m_last_update = UtilsGame.Now(); // 记录最后更新时间
        this.uid = data.uid;
        this.last_reset_time = data.last_reset_time;
        this.rewards = data.rewards;
        this.tasks = [];
        for (var i = 0; i < data.tasks.length; i++) {
            this.tasks.push(DailyTaskInfo.Clone(data.tasks[i]));
        }
    };
    /**
     * 确认是否未过期
     * @returns {boolean}
     */
    PlayerDailyTaskInfo.prototype.checkUpToDate = function () {
        return this.m_last_update >= Common.getTodayResetTime();
    };
    // region 任务数据
    /**
     * 获取任务数据
     * @param id
     * @returns {any}
     */
    PlayerDailyTaskInfo.prototype.getTask = function (id) {
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id == id) {
                return this.tasks[i];
            }
        }
        return null;
    };
    /**
     * 获取今日完成历炼任务总次数
     * @returns {number}
     */
    PlayerDailyTaskInfo.prototype.getTodayCompleteCount = function () {
        var result = 0;
        for (var i = 0; i < this.tasks.length; i++) {
            result += this.tasks[i].cnt;
        }
        return result;
    };
    // endregion
    // region 魅力等级奖励
    /**
     * 获取当前魅力等级
     * @returns {number}
     */
    PlayerDailyTaskInfo.prototype.getCharmLv = function () {
        return Singleton.Get(RoleManager).getRolesInfo().m_mei_li_lv;
    };
    /**
     * 获取当前魅力等级对应的Entity
     * @returns {Entity.TaskLv}
     */
    PlayerDailyTaskInfo.prototype.getCharmEntity = function () {
        return Template.taskLv.get(this.getCharmLv());
    };
    /**
     * 获取当前魅力点
     * @returns {number}
     */
    PlayerDailyTaskInfo.prototype.getCharmPoint = function () {
        return Singleton.Get(BagManager).getItemCount(Template.config.CharmItem);
    };
    /**
     * 检查魅力等级是否满级
     * @returns {boolean}
     */
    PlayerDailyTaskInfo.prototype.checkCharmLvMax = function () {
        return Template.taskLv.get(this.getCharmLv() + 1) == null;
    };
    /**
     * 检查魅力等级是否可提升
     * @returns {boolean}
     */
    PlayerDailyTaskInfo.prototype.checkCharmLvUpgrade = function () {
        // 已达满级 不可再升级
        if (this.checkCharmLvMax()) {
            return false;
        }
        var entity = this.getCharmEntity();
        return this.getCharmPoint() >= entity.Exp;
    };
    /**
     * 检查是否存在未领取的可领取奖励
     * @returns {boolean}
     */
    PlayerDailyTaskInfo.prototype.checkAnyRewardAvailable = function () {
        var reward_ids = Template.taskLvReward.keys;
        for (var i = 0; i < reward_ids.length; i++) {
            if (this.checkRewardAvailable(reward_ids[i]) && !this.checkRewardReceived(reward_ids[i])) {
                return true;
            }
        }
        return false;
    };
    /**
     * 检查是否满足奖励领取条件
     * @param id
     * @returns {boolean}
     */
    PlayerDailyTaskInfo.prototype.checkRewardAvailable = function (id) {
        var task_lr_info = Template.taskLvReward.get(id);
        if (task_lr_info == null) {
            return false;
        }
        return this.getCharmLv() >= task_lr_info.Lv;
    };
    /**
     * 检查奖励是否已领取
     * @param id
     * @returns {boolean}
     */
    PlayerDailyTaskInfo.prototype.checkRewardReceived = function (id) {
        for (var i = 0; i < this.rewards.length; i++) {
            if (id == this.rewards[i]) {
                return true;
            }
        }
        return false;
    };
    /**
     * 将奖励标记为已领取
     * @param id
     */
    PlayerDailyTaskInfo.prototype.markRewardAsReceived = function (id) {
        for (var i = 0; i < this.rewards.length; i++) {
            if (this.rewards[i] == id) {
                return;
            }
        }
        this.rewards.push(id);
    };
    return PlayerDailyTaskInfo;
}());
__reflect(PlayerDailyTaskInfo.prototype, "PlayerDailyTaskInfo");
//# sourceMappingURL=PlayerDailyTaskInfo.js.map