var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 活动通用消息
     * Created by WYM on 2016/02/18.
     */
    var ActivityMsg = (function () {
        function ActivityMsg() {
        }
        return ActivityMsg;
    }());
    msg.ActivityMsg = ActivityMsg;
    __reflect(ActivityMsg.prototype, "msg.ActivityMsg");
})(msg || (msg = {}));
//# sourceMappingURL=ActivityMsg.js.map