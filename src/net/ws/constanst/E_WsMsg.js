/**
 * Socket消息类型定义
 */
var E_WsMsg;
(function (E_WsMsg) {
    E_WsMsg[E_WsMsg["HEART"] = 0] = "HEART";
    E_WsMsg[E_WsMsg["LOGIN"] = 1] = "LOGIN";
    E_WsMsg[E_WsMsg["NOTICE"] = 2] = "NOTICE";
    E_WsMsg[E_WsMsg["MESSAGE"] = 3] = "MESSAGE";
    E_WsMsg[E_WsMsg["QUIT"] = 4] = "QUIT";
    E_WsMsg[E_WsMsg["MSGLIST"] = 5] = "MSGLIST";
    E_WsMsg[E_WsMsg["C2CS_GUILD_CHANGE_ME"] = 6] = "C2CS_GUILD_CHANGE_ME";
    E_WsMsg[E_WsMsg["C2CS_GUILD_CHANGE_OTHER"] = 7] = "C2CS_GUILD_CHANGE_OTHER";
    E_WsMsg[E_WsMsg["CS2C_PAY_CALLBACK"] = 8] = "CS2C_PAY_CALLBACK"; // 响应支付完成
})(E_WsMsg || (E_WsMsg = {}));
//# sourceMappingURL=E_WsMsg.js.map