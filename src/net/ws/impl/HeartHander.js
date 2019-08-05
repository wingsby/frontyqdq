var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ws;
(function (ws) {
    var HeartHander = (function () {
        function HeartHander() {
        }
        HeartHander.prototype.objectHander = function (obj) {
        };
        return HeartHander;
    }());
    ws.HeartHander = HeartHander;
    __reflect(HeartHander.prototype, "ws.HeartHander", ["I_WSHander"]);
})(ws || (ws = {}));
//# sourceMappingURL=HeartHander.js.map