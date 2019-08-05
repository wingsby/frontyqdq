var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerDrawCardInfo = (function () {
    function PlayerDrawCardInfo() {
    }
    PlayerDrawCardInfo.GetCurrentFreeDmd = function (thisObj) {
        var free = thisObj.dmd_is_free == 1;
        var today_0 = UtilsGame.TodayStart();
        for (var i = 0; i < Template.config.CardTime.length; ++i) {
            var reset = today_0 + Template.config.CardTime[i] * 60 * 60 * 1000;
            if (reset > thisObj.last_free_time && UtilsGame.Now() > reset) {
                free = true;
                break;
            }
        }
        return free;
    };
    PlayerDrawCardInfo.GetTodayAlreadyLmtDrawCount = function (thisObj) {
        var cnt = thisObj.lmt_draw_cnt;
        var today_0 = UtilsGame.TodayStart();
        var lmt_rest_time = Template.config.RTime * 60 * 60 * 1000 + today_0;
        if (lmt_rest_time > thisObj.last_reset_lmt_time && UtilsGame.Now() > lmt_rest_time) {
            cnt = 0;
        }
        return cnt;
    };
    return PlayerDrawCardInfo;
}());
__reflect(PlayerDrawCardInfo.prototype, "PlayerDrawCardInfo");
//# sourceMappingURL=PlayerDrawCardInfo.js.map