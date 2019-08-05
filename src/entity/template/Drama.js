var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    /**
     * 剧情战斗
     */
    var Drama = (function () {
        function Drama() {
        }
        return Drama;
    }());
    Entity.Drama = Drama;
    __reflect(Drama.prototype, "Entity.Drama");
})(Entity || (Entity = {}));
//# sourceMappingURL=Drama.js.map