var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ws;
(function (ws) {
    /**
     * 聊天
     */
    var ChatMsg = (function () {
        function ChatMsg() {
        }
        return ChatMsg;
    }());
    ws.ChatMsg = ChatMsg;
    __reflect(ChatMsg.prototype, "ws.ChatMsg");
})(ws || (ws = {}));
//# sourceMappingURL=ChatMsg.js.map