var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    /**
     * 工会科技升级
     */
    var TechUp = (function () {
        function TechUp() {
        }
        return TechUp;
    }());
    Entity.TechUp = TechUp;
    __reflect(TechUp.prototype, "Entity.TechUp");
})(Entity || (Entity = {}));
//# sourceMappingURL=TechUp.js.map