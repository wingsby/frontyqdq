var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainView = ui.MainView;
var MailManager = (function () {
    function MailManager() {
        this.last_check_time = 0; // 上次检查邮件时间
        this.last_list_time = 0; // 上次更新邮件内容时间
        this.m_player_mails = new PlayerMailsInfo();
    }
    MailManager.prototype.onGameLoaded = function () {
        // 初始化邮件检查时钟
        this.m_check_timer = new egret.Timer(DEFINE.MAIL_CHECK_DURATION, 0);
        this.m_check_timer.addEventListener(egret.TimerEvent.TIMER, this.onCheckTick, this);
        this.m_check_timer.start();
        this.reqCheck();
        this.reqList();
    };
    MailManager.prototype.onCheckTick = function () {
        this.reqCheck();
    };
    // region 数据操作
    /**
     * 外部获取所有邮件信息
     * @returns {MailInfo[]}
     */
    MailManager.prototype.getMails = function () {
        return this.m_player_mails;
    };
    /**
     * 获取是否有任何未读邮件
     * @returns {boolean}
     */
    MailManager.prototype.getIsUnread = function () {
        return this.m_player_mails.is_notify_unread || this.m_player_mails.is_gift_unread;
    };
    /**
     * 获取是否有未同步的新邮件
     * @returns {boolean}
     */
    MailManager.prototype.getIsOutOfSync = function () {
        return this.m_player_mails.out_of_sync;
    };
    /**
     * 阅读邮件
     */
    MailManager.prototype.readMail = function (mail_id) {
        var mail = this.m_player_mails.getMailById(mail_id);
        if (!mail) {
            return;
        }
        if (!mail.isRead()) {
            this.m_player_mails.setMailRead(mail_id);
            this.reqRead(mail_id);
        }
    };
    /**
     * 领取奖励邮件
     * @param mail_id
     */
    MailManager.prototype.rewardMail = function (mail_id, callback, thisObj) {
        // this.m_player_mails.removeMail(mail_id);
        this.reqReward(mail_id, callback, thisObj);
    };
    // endregion
    // region 请求收发
    /**
     * 请求检查邮件状态
     */
    MailManager.prototype.reqCheck = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.MAIL_CHECK, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.mail)
                return;
            if (rec_msg.body.mail.success) {
                // console.log(rec_msg.body.mail);
                if (_this.m_player_mails.is_notify_unread != rec_msg.body.mail.unread_notify || _this.m_player_mails.is_gift_unread != rec_msg.body.mail.unread_gift) {
                    _this.m_player_mails.out_of_sync = true;
                }
                // 更新阅读状态
                _this.m_player_mails.is_notify_unread = rec_msg.body.mail.unread_notify;
                _this.m_player_mails.is_gift_unread = rec_msg.body.mail.unread_gift;
                // 更新UI
                Singleton.Get(LayerManager).getView(MainView).menu2.refreshBtnMailNew();
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, false);
    };
    /**
     * 请求所有邮件列表（如果无更新或未过期，不更新）
     * 通常用法
     */
    MailManager.prototype.tryReqList = function (callback, thisObj) {
        if (this.getIsOutOfSync()) {
            this.reqList(callback, thisObj);
        }
        else {
            if (UtilsGame.Now() - this.last_list_time > DEFINE.MAIL_LIST_REFRESH_DURATION) {
                this.reqList(callback, thisObj);
            }
            else {
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }
    };
    /**
     * 请求所有邮件列表（必定发送请求）
     */
    MailManager.prototype.reqList = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.MAIL_LIST, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.mail)
                return;
            if (rec_msg.body.mail.success) {
                // 写入邮件列表
                _this.m_player_mails.updateMails(rec_msg.body.mail.mails);
                // 设定所有邮件已经是最新状态
                _this.m_player_mails.out_of_sync = false;
                // 记录本次请求时间
                _this.last_list_time = UtilsGame.Now();
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求阅读邮件
     * @param mail_id
     */
    MailManager.prototype.reqRead = function (mail_id, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.mail = new msg.MailMsg();
        send_msg.body.mail.mail_id = mail_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.MAIL_READ, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.mail)
                return;
            if (rec_msg.body.mail.success) {
                // 设定邮件状态为已读
                _this.m_player_mails.setMailRead(mail_id);
                // 检查新邮件状态 TODO 优化性能 查找本地计算不正确的原因
                _this.reqCheck(callback, thisObj);
            }
        }, true);
    };
    /**
     * 请求领取邮件奖励
     * @param mail_id
     */
    MailManager.prototype.reqReward = function (mail_id, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.mail = new msg.MailMsg();
        send_msg.body.mail.mail_id = mail_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.MAIL_REWARD, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.mail)
                return;
            if (rec_msg.body.mail.success) {
                // 移除领取的奖励邮件
                _this.m_player_mails.removeMail(mail_id);
                // 展示获得的奖励内容
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("append_49"), 0, rec_msg.body.mail.r_gold, rec_msg.body.mail.r_diamond, rec_msg.body.mail.r_items);
                // 检查新邮件状态 TODO 优化性能 查找本地计算不正确的原因
                _this.reqCheck(callback, thisObj);
            }
        }, true);
    };
    /**
     * 请求一键领取所有邮件奖励
     */
    MailManager.prototype.reqRewardOneKey = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.MAIL_REWARD_ONEKEY, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.mail)
                return;
            if (rec_msg.body.mail.success) {
                // 移除所有已领取的奖励邮件
                _this.m_player_mails.removeAllGiftMails();
                // 展示获得的奖励内容
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("append_49"), 0, rec_msg.body.mail.r_gold, rec_msg.body.mail.r_diamond, rec_msg.body.mail.r_items);
                // 检查新邮件状态 TODO 优化性能 查找本地计算不正确的原因
                _this.reqCheck(callback, thisObj);
            }
        }, true);
    };
    return MailManager;
}());
__reflect(MailManager.prototype, "MailManager");
//# sourceMappingURL=MailManager.js.map