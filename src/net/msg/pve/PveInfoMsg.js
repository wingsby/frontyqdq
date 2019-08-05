var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * PVE基本信息
     * Created by WYM on 2016/11/6.
     */
    var PveInfoMsg = (function () {
        function PveInfoMsg() {
        }
        return PveInfoMsg;
    }());
    msg.PveInfoMsg = PveInfoMsg;
    __reflect(PveInfoMsg.prototype, "msg.PveInfoMsg");
})(msg || (msg = {}));
//# sourceMappingURL=PveInfoMsg.js.map