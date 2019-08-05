var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 角色装备返回消息
     * Created by WYM on 2016/11/15.
     */
    var RoleEquipMsg = (function () {
        function RoleEquipMsg() {
        }
        return RoleEquipMsg;
    }());
    msg.RoleEquipMsg = RoleEquipMsg;
    __reflect(RoleEquipMsg.prototype, "msg.RoleEquipMsg");
})(msg || (msg = {}));
//# sourceMappingURL=RoleEquipMsg.js.map