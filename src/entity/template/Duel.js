var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Duel = (function () {
        function Duel() {
        }
        return Duel;
    }());
    Entity.Duel = Duel;
    __reflect(Duel.prototype, "Entity.Duel");
})(Entity || (Entity = {}));
//# sourceMappingURL=Duel.js.map