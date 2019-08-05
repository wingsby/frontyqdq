var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    var BossMsg = (function () {
        function BossMsg() {
        }
        return BossMsg;
    }());
    msg.BossMsg = BossMsg;
    __reflect(BossMsg.prototype, "msg.BossMsg");
})(msg || (msg = {}));
//# sourceMappingURL=BossMsg.js.map