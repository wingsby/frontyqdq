var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    /**
     * 历练任务等级
     */
    var TaskLv = (function () {
        function TaskLv() {
        }
        return TaskLv;
    }());
    Entity.TaskLv = TaskLv;
    __reflect(TaskLv.prototype, "Entity.TaskLv");
})(Entity || (Entity = {}));
//# sourceMappingURL=TaskLv.js.map