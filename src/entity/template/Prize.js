var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Prize = (function () {
        function Prize() {
        }
        return Prize;
    }());
    Entity.Prize = Prize;
    __reflect(Prize.prototype, "Entity.Prize");
})(Entity || (Entity = {}));
//# sourceMappingURL=Prize.js.map