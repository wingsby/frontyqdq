var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var E_GUILD_WAR_STATUS;
(function (E_GUILD_WAR_STATUS) {
    E_GUILD_WAR_STATUS[E_GUILD_WAR_STATUS["OPEN"] = 0] = "OPEN";
    E_GUILD_WAR_STATUS[E_GUILD_WAR_STATUS["NO_MAN"] = 1] = "NO_MAN";
    E_GUILD_WAR_STATUS[E_GUILD_WAR_STATUS["NO_TURN"] = 2] = "NO_TURN";
    E_GUILD_WAR_STATUS[E_GUILD_WAR_STATUS["NOT_OPEN"] = 3] = "NOT_OPEN";
    E_GUILD_WAR_STATUS[E_GUILD_WAR_STATUS["OTHER_ERR"] = 4] = "OTHER_ERR"; // 其他错误（新创建的公会）
})(E_GUILD_WAR_STATUS || (E_GUILD_WAR_STATUS = {}));
var E_GUILD_WAR_MATCH_TYPE;
(function (E_GUILD_WAR_MATCH_TYPE) {
    E_GUILD_WAR_MATCH_TYPE[E_GUILD_WAR_MATCH_TYPE["IN_SERVER"] = 0] = "IN_SERVER";
    E_GUILD_WAR_MATCH_TYPE[E_GUILD_WAR_MATCH_TYPE["CROSS_SERVER"] = 1] = "CROSS_SERVER"; // 跨服
})(E_GUILD_WAR_MATCH_TYPE || (E_GUILD_WAR_MATCH_TYPE = {}));
var GuildWarUtil = (function () {
    function GuildWarUtil() {
    }
    /**
     * 当前时间是否在活动时间内
     */
    GuildWarUtil.isWarTime = function () {
        var start_time = GuildWarUtil.getStartTime();
        var end_time = GuildWarUtil.getEndTime();
        if (UtilsGame.Now() >= start_time && UtilsGame.Now() < end_time) {
            return true;
        }
        return false;
    };
    /**
     * 获取本日公会战开始时间
     */
    GuildWarUtil.getStartTime = function () {
        return UtilsGame.TodayStart() + Template.config.GuildWar[0] * 1000 * 60 * 60;
    };
    /**
     * 获取本日公会战结束时间
     */
    GuildWarUtil.getEndTime = function () {
        return UtilsGame.TodayStart() + Template.config.GuildWar[1] * 1000 * 60 * 60;
    };
    /**
     * 获取本日公会战匹配流程开始时间
     */
    GuildWarUtil.getMatchTime = function () {
        return UtilsGame.TodayStart() + Template.config.GuildMate * 1000 * 60 * 60;
    };
    return GuildWarUtil;
}());
__reflect(GuildWarUtil.prototype, "GuildWarUtil");
//# sourceMappingURL=GuildWarUtil.js.map