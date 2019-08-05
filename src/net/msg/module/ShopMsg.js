var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    var ShopMsg = (function () {
        function ShopMsg() {
        }
        return ShopMsg;
    }());
    msg.ShopMsg = ShopMsg;
    __reflect(ShopMsg.prototype, "msg.ShopMsg");
})(msg || (msg = {}));
//# sourceMappingURL=ShopMsg.js.map