var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 通用消息体
     * Created by WYM on 2016/10/26.
     */
    var CommonBodyMsg = (function () {
        function CommonBodyMsg() {
        }
        return CommonBodyMsg;
    }());
    msg.CommonBodyMsg = CommonBodyMsg;
    __reflect(CommonBodyMsg.prototype, "msg.CommonBodyMsg");
})(msg || (msg = {}));
//# sourceMappingURL=CommonBodyMsg.js.map