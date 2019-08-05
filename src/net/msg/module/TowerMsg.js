var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    var TowerMsg = (function () {
        function TowerMsg() {
        }
        return TowerMsg;
    }());
    msg.TowerMsg = TowerMsg;
    __reflect(TowerMsg.prototype, "msg.TowerMsg");
})(msg || (msg = {}));
//# sourceMappingURL=TowerMsg.js.map