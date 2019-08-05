var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    /**
     * 历练任务
     */
    var DailyTask = (function () {
        function DailyTask() {
        }
        return DailyTask;
    }());
    Entity.DailyTask = DailyTask;
    __reflect(DailyTask.prototype, "Entity.DailyTask");
})(Entity || (Entity = {}));
//# sourceMappingURL=DailyTask.js.map