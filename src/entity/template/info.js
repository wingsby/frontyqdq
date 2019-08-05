var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Info = (function () {
        function Info() {
        }
        return Info;
    }());
    Entity.Info = Info;
    __reflect(Info.prototype, "Entity.Info");
})(Entity || (Entity = {}));
//# sourceMappingURL=info.js.map