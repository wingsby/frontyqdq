var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Enchant = (function () {
        function Enchant() {
        }
        return Enchant;
    }());
    Entity.Enchant = Enchant;
    __reflect(Enchant.prototype, "Entity.Enchant");
})(Entity || (Entity = {}));
//# sourceMappingURL=Enchant.js.map