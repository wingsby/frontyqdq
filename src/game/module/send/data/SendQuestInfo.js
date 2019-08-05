var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SendQuestInfo = (function (_super) {
    __extends(SendQuestInfo, _super);
    function SendQuestInfo() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * 使用消息体初始化任务信息
     */
    SendQuestInfo.prototype.initByMsg = function (source) {
        this.reset();
        for (var prop in source) {
            this[prop] = source[prop];
        }
    };
    /**
     * 重置外派任务
     * @param send_id 外派任务id
     */
    SendQuestInfo.prototype.reset = function (send_id) {
        this.send_id = send_id ? send_id : 0;
        this.end_t = 0;
        this.roles = SendUtil.genRoles();
        this.cnt_rob = 0;
        this.cnt_be_rob = 0;
        this.type = E_SEND_RUN_TYPE.NORMAL;
    };
    /**
     * 获取外派任务进行状态
     */
    SendQuestInfo.prototype.getStatus = function () {
        if (this.send_id <= 0 || this.end_t <= 0) {
            return E_SEND_STATUS.PREPARE;
        }
        if (this.end_t <= UtilsGame.Now()) {
            return E_SEND_STATUS.END;
        }
        return E_SEND_STATUS.ONGOING;
    };
    /**
     * 更新角色布阵
     */
    SendQuestInfo.prototype.updateOpinion = function (roles) {
        if (this.getStatus() == E_SEND_STATUS.ONGOING) {
            this.roles = roles;
        }
    };
    /**
     * 开始一个任务
     * @param roles
     * @param type
     */
    SendQuestInfo.prototype.setQuestRun = function (roles, type) {
        var cfg_send = Template.send.get(this.send_id);
        if (!cfg_send) {
            console.error("no send: " + this.send_id);
            return;
        }
        this.end_t = UtilsGame.Now() + cfg_send.Time;
        this.roles = roles;
        this.cnt_rob = 0;
        this.cnt_be_rob = 0;
        this.type = type;
    };
    /**
     * 快速完成一个任务
     */
    SendQuestInfo.prototype.setQuestQuick = function () {
        this.end_t = UtilsGame.Now();
    };
    /**
     * 获取任务剩余时间
     */
    SendQuestInfo.prototype.getLastTime = function () {
        var last = this.end_t - UtilsGame.Now();
        return last >= 0 ? last : 0;
    };
    /**
     * 获取任务剩余分钟数
     */
    SendQuestInfo.prototype.getLastMinutes = function () {
        return Math.ceil(this.getLastTime() / 1000 / 60);
    };
    /**
     * 获取剩余可掠夺次数
     */
    SendQuestInfo.prototype.getLastRobTimes = function () {
        return Template.config.Rob - this.cnt_rob;
    };
    /**
     * 设定掠夺一次
     */
    SendQuestInfo.prototype.setRobOnce = function () {
        this.cnt_rob += 1;
    };
    return SendQuestInfo;
}(msg.SendQuestMsg));
__reflect(SendQuestInfo.prototype, "SendQuestInfo");
//# sourceMappingURL=SendQuestInfo.js.map