var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 角色操作通用返回消息
     * Created by WYM on 2016/11/15.
     */
    var RoleResultMsg = (function () {
        function RoleResultMsg() {
        }
        return RoleResultMsg;
    }());
    msg.RoleResultMsg = RoleResultMsg;
    __reflect(RoleResultMsg.prototype, "msg.RoleResultMsg");
})(msg || (msg = {}));
//# sourceMappingURL=RoleResultMsg.js.map