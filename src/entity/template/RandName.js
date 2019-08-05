var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    /**
     * 玩家随机名字表
     */
    var RandName = (function () {
        function RandName() {
        }
        return RandName;
    }());
    Entity.RandName = RandName;
    __reflect(RandName.prototype, "Entity.RandName");
})(Entity || (Entity = {}));
//# sourceMappingURL=RandName.js.map