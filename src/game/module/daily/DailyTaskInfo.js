var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DailyTaskInfo = (function () {
    function DailyTaskInfo() {
    }
    /**
     * 复制一个新的DailyTaskInfo
     * @param orig
     * @returns {any}
     * @constructor
     */
    DailyTaskInfo.Clone = function (orig) {
        if (orig == null) {
            return;
        }
        var new_info = new DailyTaskInfo();
        for (var prop in orig) {
            if (prop == "__proto__") {
                continue;
            }
            new_info[prop] = orig[prop];
        }
        return new_info;
    };
    /**
     * 获取任务对应的Entity信息
     * @returns {Entity.DailyTask}
     */
    DailyTaskInfo.prototype.getEntity = function () {
        var entity = Template.dailyTask.get(this.id);
        if (entity == null) {
            egret.error("can't get daily task entity, daily task id: " + this.id);
        }
        return entity;
    };
    /**
     * 检查该任务今天是否已完成过一次
     * @returns {boolean}
     */
    DailyTaskInfo.prototype.checkCompletedOnce = function () {
        if (this.cnt > 0) {
            return true;
        }
        return false;
    };
    /**
     * 检查该任务今天是否已完成了最大次数
     * @returns {boolean}
     */
    DailyTaskInfo.prototype.checkCompletedMax = function () {
        var entity = this.getEntity();
        if (this.cnt >= entity.MaxNumber) {
            return true;
        }
        return false;
    };
    /**
     * 获取奖励的魅力值数量
     * @returns {number}
     */
    DailyTaskInfo.prototype.getRewardPoint = function () {
        return this.getEntity().TaskReward;
    };
    return DailyTaskInfo;
}());
__reflect(DailyTaskInfo.prototype, "DailyTaskInfo");
//# sourceMappingURL=DailyTaskInfo.js.map