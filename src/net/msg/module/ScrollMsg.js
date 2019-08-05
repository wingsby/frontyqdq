var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 挑战券通用消息
     * Created by WYM on 2016/11/23.
     */
    var ScrollMsg = (function () {
        function ScrollMsg() {
        }
        return ScrollMsg;
    }());
    msg.ScrollMsg = ScrollMsg;
    __reflect(ScrollMsg.prototype, "msg.ScrollMsg");
})(msg || (msg = {}));
//# sourceMappingURL=ScrollMsg.js.map