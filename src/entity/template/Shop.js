var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Shop = (function () {
        function Shop() {
        }
        return Shop;
    }());
    Entity.Shop = Shop;
    __reflect(Shop.prototype, "Entity.Shop");
})(Entity || (Entity = {}));
//# sourceMappingURL=Shop.js.map