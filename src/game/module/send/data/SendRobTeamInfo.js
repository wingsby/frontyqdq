var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SendRobTeamInfo = (function (_super) {
    __extends(SendRobTeamInfo, _super);
    function SendRobTeamInfo() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * 使用消息体初始化
     */
    SendRobTeamInfo.prototype.initByMsg = function (source) {
        this.reset();
        for (var prop in source) {
            this[prop] = source[prop];
        }
        this.quest = new SendQuestInfo();
        this.quest.initByMsg(source.quest);
    };
    /**
     * 重置掠夺队伍
     */
    SendRobTeamInfo.prototype.reset = function () {
        this.uid = "";
        this.zid = 0;
        this.username = "";
        this.vip = 0;
        this.team_lv = 0;
        this.quest_id = -1;
        this.fighting = 0;
        this.quest = null;
    };
    return SendRobTeamInfo;
}(msg.SendRobTeamMsg));
__reflect(SendRobTeamInfo.prototype, "SendRobTeamInfo");
//# sourceMappingURL=SendRobTeamInfo.js.map