var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 角色上阵消息
     * Created by WYM on 2016/11/11.
     */
    var RoleChangeHeroMsg = (function () {
        function RoleChangeHeroMsg() {
        }
        return RoleChangeHeroMsg;
    }());
    msg.RoleChangeHeroMsg = RoleChangeHeroMsg;
    __reflect(RoleChangeHeroMsg.prototype, "msg.RoleChangeHeroMsg");
})(msg || (msg = {}));
//# sourceMappingURL=RoleChangeHeroMsg.js.map