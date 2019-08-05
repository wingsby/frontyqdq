var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Consume = (function () {
        function Consume() {
        }
        return Consume;
    }());
    Entity.Consume = Consume;
    __reflect(Consume.prototype, "Entity.Consume");
})(Entity || (Entity = {}));
//# sourceMappingURL=Consume.js.map