var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 激活码兑换消息
     * Created by WYM on 2016/12/5.
     */
    var CDKeyMsg = (function () {
        function CDKeyMsg() {
        }
        return CDKeyMsg;
    }());
    msg.CDKeyMsg = CDKeyMsg;
    __reflect(CDKeyMsg.prototype, "msg.CDKeyMsg");
})(msg || (msg = {}));
//# sourceMappingURL=CDKeyMsg.js.map