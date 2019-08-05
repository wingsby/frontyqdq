var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 公会玩家信息
     * Created by WYM on 2017/4/24.
     */
    var GuildPlayerMsg = (function () {
        function GuildPlayerMsg() {
        }
        return GuildPlayerMsg;
    }());
    msg.GuildPlayerMsg = GuildPlayerMsg;
    __reflect(GuildPlayerMsg.prototype, "msg.GuildPlayerMsg");
})(msg || (msg = {}));
//# sourceMappingURL=GuildPlayerMsg.js.map