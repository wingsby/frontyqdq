var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    var GuildWarLogMsg = (function () {
        function GuildWarLogMsg() {
        }
        return GuildWarLogMsg;
    }());
    msg.GuildWarLogMsg = GuildWarLogMsg;
    __reflect(GuildWarLogMsg.prototype, "msg.GuildWarLogMsg");
})(msg || (msg = {}));
//# sourceMappingURL=GuildWarLogMsg.js.map