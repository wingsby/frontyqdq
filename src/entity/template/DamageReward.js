var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    /**
     * 伤害统计奖励
     */
    var DamageReward = (function () {
        function DamageReward() {
        }
        return DamageReward;
    }());
    Entity.DamageReward = DamageReward;
    __reflect(DamageReward.prototype, "Entity.DamageReward");
})(Entity || (Entity = {}));
//# sourceMappingURL=DamageReward.js.map