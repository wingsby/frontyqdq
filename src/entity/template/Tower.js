var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    /**
     * 试炼塔
     */
    var Tower = (function () {
        function Tower() {
        }
        return Tower;
    }());
    Entity.Tower = Tower;
    __reflect(Tower.prototype, "Entity.Tower");
})(Entity || (Entity = {}));
//# sourceMappingURL=Tower.js.map