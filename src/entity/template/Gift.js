var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Gift = (function () {
        function Gift() {
        }
        return Gift;
    }());
    Entity.Gift = Gift;
    __reflect(Gift.prototype, "Entity.Gift");
})(Entity || (Entity = {}));
//# sourceMappingURL=Gift.js.map