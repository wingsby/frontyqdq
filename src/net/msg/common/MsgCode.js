var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 消息码定义类
     */
    var MsgCode = (function () {
        function MsgCode() {
        }
        return MsgCode;
    }());
    // 正常情况
    MsgCode.SUCCESS = 0;
    // 策划通用错误
    MsgCode.DESIGN_ERR_PVE = 101;
    MsgCode.DESIGN_ERR_ROLE = 102;
    MsgCode.DESIGN_ERR_DRAW = 103;
    MsgCode.DESIGN_ERR_SCROLL = 104; // 挑战券配表错误
    MsgCode.DESIGN_ERR_INSTANCE = 105; // 副本配表错误
    // ------ 网络错误(10001 - 10999)
    MsgCode.HTTP_INCORRECT_PARAM = 10001; // HTTP参数不正确
    MsgCode.HTTP_NO_RESPONSE = 10002; // HTTP无响应
    MsgCode.HTTP_MKEY_ERROR = 10003; // 客户端的Mkey值异常
    // ------ 消息错误(11001 - 11999)
    MsgCode.MSG_INCORRECT_PARAM = 11001; // 消息内参数不正确
    // ------ 通用错误 (20001 - 29999)
    MsgCode.BASE_LOGIN_ERROR = 20001; // 登录错误
    // ------ 游戏模块错误 (30001 - 99999)
    MsgCode.PVE_ILLEGAL = 30101; // 关卡请求不合法
    msg.MsgCode = MsgCode;
    __reflect(MsgCode.prototype, "msg.MsgCode");
})(msg || (msg = {}));
//# sourceMappingURL=MsgCode.js.map