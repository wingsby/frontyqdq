var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ws;
(function (ws) {
    var QuitHander = (function () {
        function QuitHander() {
        }
        QuitHander.prototype.objectHander = function (msg) {
            DialogControler.getinstance().showAlertMsg(msg.context, this, function () {
                Singleton.Get(LoginManager).reload();
            });
        };
        return QuitHander;
    }());
    ws.QuitHander = QuitHander;
    __reflect(QuitHander.prototype, "ws.QuitHander", ["I_WSHander"]);
})(ws || (ws = {}));
//# sourceMappingURL=QuitHander.js.map