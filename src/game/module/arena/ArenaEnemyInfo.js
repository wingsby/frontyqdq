var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ArenaEnemyInfo = (function () {
    function ArenaEnemyInfo() {
        this.type = ArenaPlayerType.Player; // ArenaPlayerType，1为玩家，2为机器人
        this.uid = ""; // 玩家uid，如果是机器人，则为机器人id
    }
    Object.defineProperty(ArenaEnemyInfo.prototype, "has_month_card", {
        get: function () {
            return this.mcContains(E_PayType.MONTH);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArenaEnemyInfo.prototype, "has_lifetime_card", {
        get: function () {
            return this.mcContains(E_PayType.LIFETIME);
        },
        enumerable: true,
        configurable: true
    });
    ArenaEnemyInfo.prototype.mcContains = function (id) {
        for (var i = 0; i < this.mc_ids.length; i++) {
            if (this.mc_ids[i] == id) {
                return true;
            }
        }
        return false;
    };
    return ArenaEnemyInfo;
}());
__reflect(ArenaEnemyInfo.prototype, "ArenaEnemyInfo");
//# sourceMappingURL=ArenaEnemyInfo.js.map