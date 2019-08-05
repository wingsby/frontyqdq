var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    var DrawCardMsg = (function () {
        function DrawCardMsg() {
        }
        return DrawCardMsg;
    }());
    msg.DrawCardMsg = DrawCardMsg;
    __reflect(DrawCardMsg.prototype, "msg.DrawCardMsg");
})(msg || (msg = {}));
var DrawCardMsgType;
(function (DrawCardMsgType) {
    DrawCardMsgType[DrawCardMsgType["Item"] = 0] = "Item";
    DrawCardMsgType[DrawCardMsgType["Role"] = 1] = "Role";
    DrawCardMsgType[DrawCardMsgType["RoleFrag"] = 2] = "RoleFrag"; //角色转碎片
})(DrawCardMsgType || (DrawCardMsgType = {}));
//# sourceMappingURL=DrawCardMsg.js.map