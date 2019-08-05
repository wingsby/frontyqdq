var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ws;
(function (ws) {
    var LoginHander = (function () {
        function LoginHander() {
        }
        LoginHander.prototype.objectHander = function (obj) {
        };
        return LoginHander;
    }());
    ws.LoginHander = LoginHander;
    __reflect(LoginHander.prototype, "ws.LoginHander", ["I_WSHander"]);
})(ws || (ws = {}));
//# sourceMappingURL=LoginHander.js.map