var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Grade = (function () {
        function Grade() {
        }
        return Grade;
    }());
    Entity.Grade = Grade;
    __reflect(Grade.prototype, "Entity.Grade");
})(Entity || (Entity = {}));
//# sourceMappingURL=Grade.js.map