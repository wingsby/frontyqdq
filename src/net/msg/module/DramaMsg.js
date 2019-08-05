var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 剧情通用消息
     * Created by WYM on 2017/3/22.
     */
    var DramaMsg = (function () {
        function DramaMsg() {
        }
        return DramaMsg;
    }());
    msg.DramaMsg = DramaMsg;
    __reflect(DramaMsg.prototype, "msg.DramaMsg");
})(msg || (msg = {}));
//# sourceMappingURL=DramaMsg.js.map