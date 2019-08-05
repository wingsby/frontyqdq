var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 玩家信息同步消息
     * Created by WYM on 2016/11/7.
     */
    var SyncPlayerRolesMsg = (function () {
        function SyncPlayerRolesMsg() {
            this.tech_ids = []; // 科技ID列表
            this.tech_lvs = []; // 科技对应等级列表,初始0级
        }
        return SyncPlayerRolesMsg;
    }());
    msg.SyncPlayerRolesMsg = SyncPlayerRolesMsg;
    __reflect(SyncPlayerRolesMsg.prototype, "msg.SyncPlayerRolesMsg");
})(msg || (msg = {}));
//# sourceMappingURL=SyncPlayerRolesMsg.js.map