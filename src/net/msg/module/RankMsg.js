var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 排行榜信息
     * Created by WYM on 2016/11/23.
     */
    var RankMsg = (function () {
        function RankMsg() {
        }
        return RankMsg;
    }());
    msg.RankMsg = RankMsg;
    __reflect(RankMsg.prototype, "msg.RankMsg");
})(msg || (msg = {}));
//# sourceMappingURL=RankMsg.js.map