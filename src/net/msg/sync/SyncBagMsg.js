var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 背包同步消息
     * Created by WYM on 2016/11/7.
     */
    var SyncBagMsg = (function () {
        function SyncBagMsg() {
            this.items = {}; // 道具内容
        }
        return SyncBagMsg;
    }());
    msg.SyncBagMsg = SyncBagMsg;
    __reflect(SyncBagMsg.prototype, "msg.SyncBagMsg");
})(msg || (msg = {}));
//# sourceMappingURL=SyncBagMsg.js.map