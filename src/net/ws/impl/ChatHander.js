var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ws;
(function (ws) {
    var ChatHander = (function () {
        function ChatHander() {
            this.manager = Singleton.Get(ChatManager);
        }
        ChatHander.prototype.objectHander = function (msg) {
            msg.context = UtilsGame.replaceFilter(msg.context);
            switch (msg.channel) {
                case E_ChatChannel.ALL:
                case E_ChatChannel.AREEA:
                case E_ChatChannel.GUILD:
                    Singleton.Get(LayerManager).getView(ui.ChatView).addChat(msg);
                    if (this.manager.barrage)
                        Singleton.Get(ChatAlertManger).addMsg(msg);
                    break;
                case E_ChatChannel.FRIEND:
                    break;
                default:
                    break;
            }
        };
        return ChatHander;
    }());
    ws.ChatHander = ChatHander;
    __reflect(ChatHander.prototype, "ws.ChatHander", ["I_WSHander"]);
})(ws || (ws = {}));
//# sourceMappingURL=ChatHander.js.map