var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 一骑当千通用消息
     * Created by WYM on 2016/12/17.
     */
    var DuelMsg = (function () {
        function DuelMsg() {
        }
        return DuelMsg;
    }());
    msg.DuelMsg = DuelMsg;
    __reflect(DuelMsg.prototype, "msg.DuelMsg");
})(msg || (msg = {}));
//# sourceMappingURL=DuelMsg.js.map