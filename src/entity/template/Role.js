var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Role = (function () {
        function Role() {
        }
        return Role;
    }());
    Entity.Role = Role;
    __reflect(Role.prototype, "Entity.Role");
})(Entity || (Entity = {}));
//# sourceMappingURL=Role.js.map