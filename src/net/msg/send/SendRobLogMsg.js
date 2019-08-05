var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    var SendRobLogMsg = (function () {
        function SendRobLogMsg() {
        }
        return SendRobLogMsg;
    }());
    msg.SendRobLogMsg = SendRobLogMsg;
    __reflect(SendRobLogMsg.prototype, "msg.SendRobLogMsg");
})(msg || (msg = {}));
//# sourceMappingURL=SendRobLogMsg.js.map