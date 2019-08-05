var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 公会消息体
     * Created by WYM on 2017/4/24.
     */
    var GuildMsg = (function () {
        function GuildMsg() {
        }
        return GuildMsg;
    }());
    msg.GuildMsg = GuildMsg;
    __reflect(GuildMsg.prototype, "msg.GuildMsg");
})(msg || (msg = {}));
//# sourceMappingURL=GuildMsg.js.map