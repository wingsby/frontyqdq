var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 世界BOSS单个玩家信息
     * Created by WYM on 2017/6/6.
     */
    var BossPlayerMsg = (function () {
        function BossPlayerMsg() {
        }
        return BossPlayerMsg;
    }());
    msg.BossPlayerMsg = BossPlayerMsg;
    __reflect(BossPlayerMsg.prototype, "msg.BossPlayerMsg");
})(msg || (msg = {}));
//# sourceMappingURL=BossPlayerMsg.js.map