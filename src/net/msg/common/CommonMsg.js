var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 通用消息体
     * Created by WYM on 2016/10/26.
     */
    var CommonMsg = (function () {
        /**
         * 构造函数
         * @param rtCode 消息响应码
         */
        function CommonMsg(rtCode) {
            if (rtCode === void 0) { rtCode = 0; }
            this.header = new msg.CommonHeaderMsg();
            this.body = new msg.CommonBodyMsg();
            this.header.rt = rtCode;
            if (Singleton.Get(LoginManager).isLogin) {
                this.header.uid = Singleton.Get(LoginManager).uid;
                this.header.mkey = Singleton.Get(login.LoginDataManager).mkey;
            }
        }
        return CommonMsg;
    }());
    msg.CommonMsg = CommonMsg;
    __reflect(CommonMsg.prototype, "msg.CommonMsg");
})(msg || (msg = {}));
//# sourceMappingURL=CommonMsg.js.map