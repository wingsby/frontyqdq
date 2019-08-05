var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    var TaskMsg = (function () {
        function TaskMsg() {
        }
        return TaskMsg;
    }());
    msg.TaskMsg = TaskMsg;
    __reflect(TaskMsg.prototype, "msg.TaskMsg");
})(msg || (msg = {}));
//# sourceMappingURL=TaskMsg.js.map