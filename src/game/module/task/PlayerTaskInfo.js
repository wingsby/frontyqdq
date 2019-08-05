var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerTaskInfo = (function () {
    function PlayerTaskInfo() {
        this.cur_id = 0; // 当前任务id
    }
    /**
     * 更新数据内容
     * @param data
     */
    PlayerTaskInfo.prototype.updateData = function (data) {
        this.cur_id = data.cur_id;
        this.is_finish = data.is_finish;
        this.arg = data.arg;
    };
    /**
     * 检查是否完成了所有任务
     * @returns {boolean}
     */
    PlayerTaskInfo.prototype.isAllFinished = function () {
        if (this.cur_id <= 0) {
            return false;
        }
        if (this.getCurEntity() == null) {
            return true;
        }
        return false;
    };
    /**
     * 获取任务当前配置表实体
     * @returns {Entity.Task}
     */
    PlayerTaskInfo.prototype.getCurEntity = function () {
        return Template.task.get(this.cur_id);
    };
    /**
     * 获取当前任务类型
     * @returns {any}
     */
    PlayerTaskInfo.prototype.getCurTaskType = function () {
        var entity = this.getCurEntity();
        if (entity) {
            return entity.Type;
        }
        return 0;
    };
    return PlayerTaskInfo;
}());
__reflect(PlayerTaskInfo.prototype, "PlayerTaskInfo");
//# sourceMappingURL=PlayerTaskInfo.js.map