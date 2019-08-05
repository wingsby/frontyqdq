var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    /**
     * 历练任务等级奖励
     */
    var TaskLvReward = (function () {
        function TaskLvReward() {
        }
        return TaskLvReward;
    }());
    Entity.TaskLvReward = TaskLvReward;
    __reflect(TaskLvReward.prototype, "Entity.TaskLvReward");
})(Entity || (Entity = {}));
//# sourceMappingURL=TaskLvReward.js.map