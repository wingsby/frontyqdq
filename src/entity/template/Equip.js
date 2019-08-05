var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Equip = (function () {
        function Equip() {
        }
        return Equip;
    }());
    Entity.Equip = Equip;
    __reflect(Equip.prototype, "Entity.Equip");
})(Entity || (Entity = {}));
//# sourceMappingURL=Equip.js.map