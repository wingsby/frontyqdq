var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Guild = (function () {
        function Guild() {
        }
        return Guild;
    }());
    Entity.Guild = Guild;
    __reflect(Guild.prototype, "Entity.Guild");
})(Entity || (Entity = {}));
//# sourceMappingURL=Guild.js.map