var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 通用消息头
     * Created by WYM on 2016/10/26.
     */
    var CommonHeaderMsg = (function () {
        function CommonHeaderMsg() {
        }
        return CommonHeaderMsg;
    }());
    msg.CommonHeaderMsg = CommonHeaderMsg;
    __reflect(CommonHeaderMsg.prototype, "msg.CommonHeaderMsg");
})(msg || (msg = {}));
//# sourceMappingURL=CommonHeaderMsg.js.map