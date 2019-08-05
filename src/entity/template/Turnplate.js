var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Turnplate = (function () {
        function Turnplate() {
        }
        return Turnplate;
    }());
    Entity.Turnplate = Turnplate;
    __reflect(Turnplate.prototype, "Entity.Turnplate");
})(Entity || (Entity = {}));
//# sourceMappingURL=Turnplate.js.map