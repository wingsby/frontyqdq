var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ws;
(function (ws) {
    var GuildChangeHander = (function () {
        function GuildChangeHander() {
        }
        GuildChangeHander.prototype.objectHander = function (msg) {
            Singleton.Get(GuildManager).reqInfo(function () {
                WsClient.sendChangeGuildMe(Singleton.Get(GuildManager).getInfo().gd_id);
            }, this);
        };
        return GuildChangeHander;
    }());
    ws.GuildChangeHander = GuildChangeHander;
    __reflect(GuildChangeHander.prototype, "ws.GuildChangeHander", ["I_WSHander"]);
})(ws || (ws = {}));
//# sourceMappingURL=GuildChangeHander.js.map