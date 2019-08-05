var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * PVE离线收益消息
     * Created by WYM on 2016/11/6.
     */
    var PveOfflineMsg = (function () {
        function PveOfflineMsg() {
        }
        return PveOfflineMsg;
    }());
    msg.PveOfflineMsg = PveOfflineMsg;
    __reflect(PveOfflineMsg.prototype, "msg.PveOfflineMsg");
})(msg || (msg = {}));
//# sourceMappingURL=PveOfflineMsg.js.map