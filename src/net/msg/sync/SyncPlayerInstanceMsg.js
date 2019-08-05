var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 玩家副本同步消息
     * Created by WYM on 2016/11/7.
     */
    var SyncPlayerInstanceMsg = (function () {
        function SyncPlayerInstanceMsg() {
        }
        return SyncPlayerInstanceMsg;
    }());
    msg.SyncPlayerInstanceMsg = SyncPlayerInstanceMsg;
    __reflect(SyncPlayerInstanceMsg.prototype, "msg.SyncPlayerInstanceMsg");
})(msg || (msg = {}));
//# sourceMappingURL=SyncPlayerInstanceMsg.js.map