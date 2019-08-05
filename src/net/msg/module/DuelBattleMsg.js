var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 一骑当千战斗消息
     * Created by WYM on 2016/12/17.
     */
    var DuelBattleMsg = (function () {
        function DuelBattleMsg() {
        }
        return DuelBattleMsg;
    }());
    msg.DuelBattleMsg = DuelBattleMsg;
    __reflect(DuelBattleMsg.prototype, "msg.DuelBattleMsg");
})(msg || (msg = {}));
//# sourceMappingURL=DuelBattleMsg.js.map