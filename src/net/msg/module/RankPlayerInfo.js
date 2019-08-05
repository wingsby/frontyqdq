var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 排行榜玩家信息
     * Created by WYM on 2016/12/6.
     */
    var RankPlayerInfo = (function () {
        function RankPlayerInfo() {
        }
        return RankPlayerInfo;
    }());
    msg.RankPlayerInfo = RankPlayerInfo;
    __reflect(RankPlayerInfo.prototype, "msg.RankPlayerInfo");
})(msg || (msg = {}));
//# sourceMappingURL=RankPlayerInfo.js.map