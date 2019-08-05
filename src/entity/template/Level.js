var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Level = (function () {
        function Level() {
        }
        return Level;
    }());
    Entity.Level = Level;
    __reflect(Level.prototype, "Entity.Level");
})(Entity || (Entity = {}));
//# sourceMappingURL=Level.js.map