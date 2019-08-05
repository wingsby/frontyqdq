var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 上海统计学消息体
     */
    var DmgMsg = (function () {
        function DmgMsg() {
        }
        return DmgMsg;
    }());
    msg.DmgMsg = DmgMsg;
    __reflect(DmgMsg.prototype, "msg.DmgMsg");
})(msg || (msg = {}));
//# sourceMappingURL=DmgMsg.js.map