var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ws;
(function (ws) {
    var ChatUser = (function () {
        function ChatUser() {
        }
        return ChatUser;
    }());
    ws.ChatUser = ChatUser;
    __reflect(ChatUser.prototype, "ws.ChatUser");
})(ws || (ws = {}));
//# sourceMappingURL=ChatUser.js.map