var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Instance = (function () {
        function Instance() {
        }
        return Instance;
    }());
    Entity.Instance = Instance;
    __reflect(Instance.prototype, "Entity.Instance");
})(Entity || (Entity = {}));
//# sourceMappingURL=Instance.js.map