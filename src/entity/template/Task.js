var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Task = (function () {
        function Task() {
        }
        return Task;
    }());
    Entity.Task = Task;
    __reflect(Task.prototype, "Entity.Task");
})(Entity || (Entity = {}));
//# sourceMappingURL=Task.js.map