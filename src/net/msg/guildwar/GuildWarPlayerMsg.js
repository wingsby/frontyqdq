var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    var GuildWarPlayerMsg = (function () {
        function GuildWarPlayerMsg() {
        }
        return GuildWarPlayerMsg;
    }());
    msg.GuildWarPlayerMsg = GuildWarPlayerMsg;
    __reflect(GuildWarPlayerMsg.prototype, "msg.GuildWarPlayerMsg");
})(msg || (msg = {}));
//# sourceMappingURL=GuildWarPlayerMsg.js.map