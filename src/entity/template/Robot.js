var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Robot = (function () {
        function Robot() {
        }
        return Robot;
    }());
    Entity.Robot = Robot;
    __reflect(Robot.prototype, "Entity.Robot");
})(Entity || (Entity = {}));
//# sourceMappingURL=Robot.js.map