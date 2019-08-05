var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Spay = (function () {
        function Spay() {
        }
        return Spay;
    }());
    Entity.Spay = Spay;
    __reflect(Spay.prototype, "Entity.Spay");
})(Entity || (Entity = {}));
//# sourceMappingURL=Spay.js.map