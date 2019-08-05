var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 背包道具消息
     * Created by WYM on 2016/11/7.
     */
    var SyncBagItem = (function () {
        function SyncBagItem() {
        }
        return SyncBagItem;
    }());
    msg.SyncBagItem = SyncBagItem;
    __reflect(SyncBagItem.prototype, "msg.SyncBagItem");
})(msg || (msg = {}));
//# sourceMappingURL=SyncBagItem.js.map