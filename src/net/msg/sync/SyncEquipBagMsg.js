var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 装备背包同步消息
     * Created by WYM on 2016/11/7.
     */
    var SyncEquipBagMsg = (function () {
        function SyncEquipBagMsg() {
        }
        return SyncEquipBagMsg;
    }());
    msg.SyncEquipBagMsg = SyncEquipBagMsg;
    __reflect(SyncEquipBagMsg.prototype, "msg.SyncEquipBagMsg");
})(msg || (msg = {}));
//# sourceMappingURL=SyncEquipBagMsg.js.map