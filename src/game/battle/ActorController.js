var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 角色控制器
 */
var battle;
(function (battle) {
    var ActorController = (function () {
        /**
         * 构造函数
         */
        function ActorController() {
        }
        return ActorController;
    }());
    battle.ActorController = ActorController;
    __reflect(ActorController.prototype, "battle.ActorController");
})(battle || (battle = {}));
//# sourceMappingURL=ActorController.js.map