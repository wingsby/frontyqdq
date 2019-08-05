var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 玩家邮件信息
 */
var PlayerMailsInfo = (function () {
    function PlayerMailsInfo() {
        // 邮件数据本体
        this.m_mails = undefined;
        // 邮件阅读状态
        this.is_notify_unread = false;
        this.is_gift_unread = false;
        // 是否有同步的新邮件
        this.out_of_sync = true;
        this.m_mails = [];
    }
    /**
     * 根据邮件id获取邮件Info
     * @param mail_id
     */
    PlayerMailsInfo.prototype.getMailById = function (mail_id) {
        if (!this.m_mails || this.m_mails.length <= 0) {
            return undefined;
        }
        for (var i = 0; i < this.m_mails.length; i++) {
            if (this.m_mails[i].m_id == mail_id) {
                return this.m_mails[i];
            }
        }
        return undefined;
    };
    /**
     * 根据类型获取邮件列表
     * @param type
     * @returns {MailInfo[]}
     */
    PlayerMailsInfo.prototype.getMailsByTypes = function (type) {
        var new_mails = [];
        for (var i = 0; i < this.m_mails.length; i++) {
            for (var j = 0; j < type.length; j++) {
                if (this.m_mails[i].getMailType() == type[j]) {
                    new_mails.push(this.m_mails[i]);
                    break;
                }
            }
        }
        return new_mails;
    };
    /**
     * 更新所有邮件
     * @param mails
     */
    PlayerMailsInfo.prototype.updateMails = function (mails) {
        if (!mails) {
            return;
        }
        this.m_mails = [];
        for (var i = 0; i < mails.length; i++) {
            this.m_mails.push(MailInfo.Clone(mails[i]));
        }
        this.clacAllUnread();
    };
    /**
     * 设定邮件本地已读状态
     * @param mail_id
     */
    PlayerMailsInfo.prototype.setMailRead = function (mail_id) {
        var my_mail = this.getMailById(mail_id);
        if (!my_mail) {
            return;
        }
        my_mail.m_read = true;
        this.clacAllUnread();
    };
    /**
     * 移除邮件
     * @param mail_id
     */
    PlayerMailsInfo.prototype.removeMail = function (mail_id) {
        if (!this.m_mails || this.m_mails.length <= 0) {
            return;
        }
        for (var i = 0; i < this.m_mails.length; i++) {
            if (this.m_mails[i].m_id == mail_id) {
                this.m_mails.splice(i, 1);
                return;
            }
        }
        this.clacAllUnread();
    };
    /**
     * 移除所有奖励邮件
     */
    PlayerMailsInfo.prototype.removeAllGiftMails = function () {
        var new_mails = [];
        for (var i = 0; i < this.m_mails.length; i++) {
            if (this.m_mails[i].getMailType() != MailType.GIFT && this.m_mails[i].getMailType() != MailType.CUSTOM_GIFT) {
                new_mails.push(this.m_mails[i]);
            }
        }
        this.m_mails = new_mails;
        this.clacGiftUnread();
    };
    /**
     * 计算所有邮件未读情况
     */
    PlayerMailsInfo.prototype.clacAllUnread = function () {
        this.clacGiftUnread();
        this.clacNotifyUnread();
    };
    /**
     * 计算未读礼物
     */
    PlayerMailsInfo.prototype.clacGiftUnread = function () {
        // 如果已过期，则不进行计算
        // if (this.out_of_sync) {
        //     return;
        // }
        var has_unread = false;
        for (var i = 0; i < this.m_mails.length; i++) {
            if (this.m_mails[i].getMailType() == MailType.GIFT || this.m_mails[i].getMailType() == MailType.CUSTOM_GIFT) {
                has_unread = true;
                break;
            }
        }
        this.is_gift_unread = has_unread;
    };
    /**
     * 计算未读通知
     */
    PlayerMailsInfo.prototype.clacNotifyUnread = function () {
        // 如果已过期，则不进行计算
        // if (this.out_of_sync) {
        //     return;
        // }
        var has_unread = false;
        for (var i = 0; i < this.m_mails.length; i++) {
            if (this.m_mails[i].getMailType() == MailType.NOTIFY || this.m_mails[i].getMailType() == MailType.CUSTOM_NOTIFY) {
                if (!this.m_mails[i].isRead()) {
                    has_unread = true;
                }
            }
        }
        this.is_notify_unread = has_unread;
    };
    return PlayerMailsInfo;
}());
__reflect(PlayerMailsInfo.prototype, "PlayerMailsInfo");
//# sourceMappingURL=PlayerMailsInfo.js.map