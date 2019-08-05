var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Config = (function () {
        function Config() {
        }
        return Config;
    }());
    Entity.Config = Config;
    __reflect(Config.prototype, "Entity.Config");
})(Entity || (Entity = {}));
//# sourceMappingURL=Config.js.map