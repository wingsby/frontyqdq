var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    var SendQuestMsg = (function () {
        function SendQuestMsg() {
            this.cnt_rob = 0; // 掠夺次数
            this.cnt_be_rob = 0; // 被掠夺次数
        }
        return SendQuestMsg;
    }());
    msg.SendQuestMsg = SendQuestMsg;
    __reflect(SendQuestMsg.prototype, "msg.SendQuestMsg");
})(msg || (msg = {}));
//# sourceMappingURL=SendQuestMsg.js.map