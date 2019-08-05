var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by user on 2016/10/26.
 */
var msg;
(function (msg) {
    var PlayerLoginMsg = (function () {
        function PlayerLoginMsg() {
            this.last_gold_time = undefined; // 上一次回复金币购买次数的时间
            this.gold_buy_cnt = undefined; // 当天金币已经购买次数
        }
        return PlayerLoginMsg;
    }());
    msg.PlayerLoginMsg = PlayerLoginMsg;
    __reflect(PlayerLoginMsg.prototype, "msg.PlayerLoginMsg");
})(msg || (msg = {}));
//# sourceMappingURL=PlayerLoginMsg.js.map