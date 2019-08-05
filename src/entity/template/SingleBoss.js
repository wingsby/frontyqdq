var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var SingleBoss = (function () {
        function SingleBoss() {
        }
        return SingleBoss;
    }());
    Entity.SingleBoss = SingleBoss;
    __reflect(SingleBoss.prototype, "Entity.SingleBoss");
})(Entity || (Entity = {}));
//# sourceMappingURL=SingleBoss.js.map