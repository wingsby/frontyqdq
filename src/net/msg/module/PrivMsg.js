var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 特权消息
 * Created by WYM on 2017/1/16.
 */
var msg;
(function (msg) {
    var PrivMsg = (function () {
        function PrivMsg() {
        }
        return PrivMsg;
    }());
    msg.PrivMsg = PrivMsg;
    __reflect(PrivMsg.prototype, "msg.PrivMsg");
})(msg || (msg = {}));
//# sourceMappingURL=PrivMsg.js.map