var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerFollowInfo = (function () {
    function PlayerFollowInfo() {
    }
    /**
     * 初始化
     */
    PlayerFollowInfo.prototype.init = function () {
        var rec = Singleton.Get(LoginManager).loginInfo;
        this.need_fl = rec.need_fl;
        this.fl_award = rec.fl_award;
        this.is_fl = rec.is_fl;
    };
    /**
     * 设定奖励已领取
     */
    PlayerFollowInfo.prototype.setRewardReceived = function () {
        this.fl_award = HttpBoolean.TRUE;
    };
    return PlayerFollowInfo;
}());
__reflect(PlayerFollowInfo.prototype, "PlayerFollowInfo");
//# sourceMappingURL=PlayerFollowInfo.js.map