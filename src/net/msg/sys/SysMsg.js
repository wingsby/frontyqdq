var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    var SysMsg = (function () {
        function SysMsg() {
        }
        return SysMsg;
    }());
    msg.SysMsg = SysMsg;
    __reflect(SysMsg.prototype, "msg.SysMsg");
})(msg || (msg = {}));
//# sourceMappingURL=SysMsg.js.map