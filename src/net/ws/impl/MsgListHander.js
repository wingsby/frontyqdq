var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ws;
(function (ws) {
    var MsgListHander = (function () {
        function MsgListHander() {
        }
        MsgListHander.prototype.objectHander = function (chatls) {
            chatls.sort(function (c1, c2) {
                return c1.sendTime - c2.sendTime;
            });
            if (chatls && chatls.length > 0)
                chatls.forEach(function (chat) {
                    chat.context = UtilsGame.replaceFilter(chat.context);
                    Singleton.Get(LayerManager).getView(ui.ChatView).addChat(chat);
                });
        };
        return MsgListHander;
    }());
    ws.MsgListHander = MsgListHander;
    __reflect(MsgListHander.prototype, "ws.MsgListHander", ["I_WSHander"]);
})(ws || (ws = {}));
//# sourceMappingURL=MsgListHander.js.map