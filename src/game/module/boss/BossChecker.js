var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BossChecker = (function () {
    function BossChecker() {
        this.m_last_tick = 0;
        Singleton.Get(RegisterUpdate).register(this);
    }
    BossChecker.prototype.update = function () {
        var now = UtilsGame.Now();
        if (now - this.m_last_tick > DEFINE.BOSS_REVIVE_CHECK_TIME) {
            this.m_last_tick = now;
            Singleton.Get(BossManager).getFullInfo().validateRevive();
        }
    };
    return BossChecker;
}());
__reflect(BossChecker.prototype, "BossChecker", ["IUpdate"]);
//# sourceMappingURL=BossChecker.js.map