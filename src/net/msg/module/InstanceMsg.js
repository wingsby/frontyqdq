var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 副本通用消息
     * Created by WYM on 2016/11/23.
     */
    var InstanceMsg = (function () {
        function InstanceMsg() {
        }
        return InstanceMsg;
    }());
    msg.InstanceMsg = InstanceMsg;
    __reflect(InstanceMsg.prototype, "msg.InstanceMsg");
})(msg || (msg = {}));
//# sourceMappingURL=InstanceMsg.js.map