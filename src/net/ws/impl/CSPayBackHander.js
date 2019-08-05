var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ws;
(function (ws) {
    var CSPayBackHandler = (function () {
        function CSPayBackHandler() {
        }
        CSPayBackHandler.prototype.objectHander = function (msg) {
            var pck = Singleton.Get(PrivPayCaller);
            if (!pck.is_checking()) {
                pck.onStartPayCheck();
            }
        };
        return CSPayBackHandler;
    }());
    ws.CSPayBackHandler = CSPayBackHandler;
    __reflect(CSPayBackHandler.prototype, "ws.CSPayBackHandler", ["I_WSHander"]);
})(ws || (ws = {}));
//# sourceMappingURL=CSPayBackHander.js.map