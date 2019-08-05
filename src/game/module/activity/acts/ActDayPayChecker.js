var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ActDayPayChecker = (function () {
    /**
     * @constructor
     */
    function ActDayPayChecker() {
    }
    /**
     * 注册日程
     */
    ActDayPayChecker.prototype.regSchedule = function (time) {
        Singleton.Get(Schedule).register(this, time);
    };
    /**
     * 执行日程
     */
    ActDayPayChecker.prototype.onSchedule = function () {
        Singleton.Get(ActivityManager).getInfo().resetAcc_DayPay();
        Singleton.Get(ActivityManager).reqInfoDelay_DayPay();
    };
    return ActDayPayChecker;
}());
__reflect(ActDayPayChecker.prototype, "ActDayPayChecker", ["ISchedule"]);
//# sourceMappingURL=ActDayPayChecker.js.map