var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 公会信息
     * Created by WYM on 2017/4/24.
     */
    var GuildSoloMsg = (function () {
        function GuildSoloMsg() {
        }
        return GuildSoloMsg;
    }());
    msg.GuildSoloMsg = GuildSoloMsg;
    __reflect(GuildSoloMsg.prototype, "msg.GuildSoloMsg");
})(msg || (msg = {}));
//# sourceMappingURL=GuildSoloMsg.js.map