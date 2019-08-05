var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ws;
(function (ws) {
    var WsMsgBase = (function () {
        function WsMsgBase() {
        }
        return WsMsgBase;
    }());
    ws.WsMsgBase = WsMsgBase;
    __reflect(WsMsgBase.prototype, "ws.WsMsgBase");
})(ws || (ws = {}));
//# sourceMappingURL=WsMsgBase.js.map