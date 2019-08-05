var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ws;
(function (ws) {
    /**
     * 聊天
     */
    var ChatGuild = (function () {
        function ChatGuild() {
        }
        return ChatGuild;
    }());
    ws.ChatGuild = ChatGuild;
    __reflect(ChatGuild.prototype, "ws.ChatGuild");
})(ws || (ws = {}));
//# sourceMappingURL=ChatGuild.js.map