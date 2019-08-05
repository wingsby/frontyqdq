var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 角色管理器
 * 用于管理战斗和索敌状态下所有角色的状态
 */
var battle;
(function (battle) {
    var ActorManager = (function () {
        /**
         * 构造函数
         */
        function ActorManager() {
        }
        return ActorManager;
    }());
    battle.ActorManager = ActorManager;
    __reflect(ActorManager.prototype, "battle.ActorManager");
})(battle || (battle = {}));
//# sourceMappingURL=ActorManager.js.map