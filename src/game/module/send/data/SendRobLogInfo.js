var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SendRobLogInfo = (function (_super) {
    __extends(SendRobLogInfo, _super);
    function SendRobLogInfo() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * 使用消息体初始化
     */
    SendRobLogInfo.prototype.initByMsg = function (source) {
        this.reset();
        for (var prop in source) {
            this[prop] = source[prop];
        }
    };
    /**
     * 重置掠夺日志信息
     */
    SendRobLogInfo.prototype.reset = function () {
        this.send_id = 0; // 任务id
        this.result = 0; // 战斗结果 [负0, 胜1, 平2]
        this.type = E_SEND_RUN_TYPE.NORMAL; // 探险类型
        this.atk_uid = ""; // 进攻方uid
        this.atk_name = ""; // 进攻方名字
        this.atk_zid = 0; // 进攻方区服id
        this.atk_roles = []; // 进攻方角色id列表
        this.def_uid = ""; // 防守方uid
        this.def_name = ""; // 防守方名字
        this.def_zid = 0; // 防守方区服id
        this.def_roles = []; // 防守方角色id列表
    };
    return SendRobLogInfo;
}(msg.SendRobLogMsg));
__reflect(SendRobLogInfo.prototype, "SendRobLogInfo");
//# sourceMappingURL=SendRobLogInfo.js.map