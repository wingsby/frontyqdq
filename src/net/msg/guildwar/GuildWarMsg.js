var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    var GuildWarMsg = (function () {
        function GuildWarMsg() {
        }
        return GuildWarMsg;
    }());
    msg.GuildWarMsg = GuildWarMsg;
    __reflect(GuildWarMsg.prototype, "msg.GuildWarMsg");
})(msg || (msg = {}));
//# sourceMappingURL=GuildWarMsg.js.map