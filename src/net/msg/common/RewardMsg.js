var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    var RewardMsg = (function () {
        function RewardMsg() {
        }
        return RewardMsg;
    }());
    msg.RewardMsg = RewardMsg;
    __reflect(RewardMsg.prototype, "msg.RewardMsg");
})(msg || (msg = {}));
//# sourceMappingURL=RewardMsg.js.map