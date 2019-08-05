var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 聊天管理器
 */
var ChatManager = (function () {
    function ChatManager() {
        /**是否开启弹幕*/
        this.barrage = true;
        /** 最大条数*/
        this.maxChatCount = 50;
        /**信息最大长度 */
        this.maxChar = 30;
        /**发送信息间隔时间 */
        this.sendInterval = 3000;
        /**最后一次发送时间 */
        this.lastSendTime = 0;
        this.initChat();
    }
    /**初始化聊天 */
    ChatManager.prototype.initChat = function () {
        this.chatSend = ObjectPool.getPool(ws.ChatSend, 2);
        this.receiveMsg_notice = [];
        this.lastSendTime = 0;
    };
    return ChatManager;
}());
__reflect(ChatManager.prototype, "ChatManager");
//# sourceMappingURL=ChatManager.js.map