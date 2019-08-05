var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    /**
     * 历练任务对话
     */
    var TaskNpc = (function () {
        function TaskNpc() {
        }
        return TaskNpc;
    }());
    Entity.TaskNpc = TaskNpc;
    __reflect(TaskNpc.prototype, "Entity.TaskNpc");
})(Entity || (Entity = {}));
//# sourceMappingURL=TaskNpc.js.map