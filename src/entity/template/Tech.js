var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    /**
     * 工会科技
     */
    var Tech = (function () {
        function Tech() {
        }
        return Tech;
    }());
    Entity.Tech = Tech;
    __reflect(Tech.prototype, "Entity.Tech");
})(Entity || (Entity = {}));
//# sourceMappingURL=Tech.js.map