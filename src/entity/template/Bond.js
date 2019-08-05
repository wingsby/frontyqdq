var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Bond = (function () {
        function Bond() {
        }
        return Bond;
    }());
    Entity.Bond = Bond;
    __reflect(Bond.prototype, "Entity.Bond");
})(Entity || (Entity = {}));
//# sourceMappingURL=Bond.js.map