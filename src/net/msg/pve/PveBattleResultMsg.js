var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * PVE普通战斗结果
     * Created by 协议生成器 on 2016/11/4.
     */
    var PveBattleResultMsg = (function () {
        function PveBattleResultMsg() {
        }
        return PveBattleResultMsg;
    }());
    msg.PveBattleResultMsg = PveBattleResultMsg;
    __reflect(PveBattleResultMsg.prototype, "msg.PveBattleResultMsg");
})(msg || (msg = {}));
//# sourceMappingURL=PveBattleResultMsg.js.map