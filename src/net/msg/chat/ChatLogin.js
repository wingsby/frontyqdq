var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ws;
(function (ws) {
    /**
     * 聊天
     */
    var ChatLogin = (function () {
        function ChatLogin() {
        }
        return ChatLogin;
    }());
    ws.ChatLogin = ChatLogin;
    __reflect(ChatLogin.prototype, "ws.ChatLogin");
})(ws || (ws = {}));
//# sourceMappingURL=ChatLogin.js.map