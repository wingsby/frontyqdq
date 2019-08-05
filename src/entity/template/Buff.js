var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Buff = (function () {
        function Buff() {
        }
        return Buff;
    }());
    Entity.Buff = Buff;
    __reflect(Buff.prototype, "Entity.Buff");
})(Entity || (Entity = {}));
//# sourceMappingURL=Buff.js.map