var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 竞技场通用消息
     * Created by WYM on 2016/12/5.
     */
    var ArenaMsg = (function () {
        function ArenaMsg() {
        }
        return ArenaMsg;
    }());
    msg.ArenaMsg = ArenaMsg;
    __reflect(ArenaMsg.prototype, "msg.ArenaMsg");
})(msg || (msg = {}));
//# sourceMappingURL=ArenaMsg.js.map