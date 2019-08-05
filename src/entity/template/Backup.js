var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Backup = (function () {
        function Backup() {
        }
        return Backup;
    }());
    Entity.Backup = Backup;
    __reflect(Backup.prototype, "Entity.Backup");
})(Entity || (Entity = {}));
//# sourceMappingURL=Backup.js.map