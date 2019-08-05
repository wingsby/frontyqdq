var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    var WishMsg = (function () {
        function WishMsg() {
        }
        return WishMsg;
    }());
    msg.WishMsg = WishMsg;
    __reflect(WishMsg.prototype, "msg.WishMsg");
})(msg || (msg = {}));
//# sourceMappingURL=WishMsg.js.map