var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 世界BOSS状态信息
     * Created by WYM on 2017/6/6.
     */
    var BossStatusMsg = (function () {
        function BossStatusMsg() {
        }
        return BossStatusMsg;
    }());
    msg.BossStatusMsg = BossStatusMsg;
    __reflect(BossStatusMsg.prototype, "msg.BossStatusMsg");
})(msg || (msg = {}));
//# sourceMappingURL=BossStatusMsg.js.map