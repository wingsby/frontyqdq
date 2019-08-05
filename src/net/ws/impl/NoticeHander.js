var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ws;
(function (ws) {
    var NoticeHander = (function () {
        function NoticeHander() {
        }
        NoticeHander.prototype.objectHander = function (msg) {
            Singleton.Get(NoticeProcessor).process(msg.context);
        };
        return NoticeHander;
    }());
    ws.NoticeHander = NoticeHander;
    __reflect(NoticeHander.prototype, "ws.NoticeHander", ["I_WSHander"]);
})(ws || (ws = {}));
//# sourceMappingURL=NoticeHander.js.map