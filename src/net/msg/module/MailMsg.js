var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    var MailMsg = (function () {
        function MailMsg() {
        }
        return MailMsg;
    }());
    msg.MailMsg = MailMsg;
    __reflect(MailMsg.prototype, "msg.MailMsg");
})(msg || (msg = {}));
//# sourceMappingURL=MailMsg.js.map