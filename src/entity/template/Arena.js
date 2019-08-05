var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Arena = (function () {
        function Arena() {
        }
        return Arena;
    }());
    Entity.Arena = Arena;
    __reflect(Arena.prototype, "Entity.Arena");
})(Entity || (Entity = {}));
//# sourceMappingURL=Arena.js.map