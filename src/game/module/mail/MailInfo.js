var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 邮件信息
 * Created by WYM 2016/12/12
 */
var MailInfo = (function () {
    function MailInfo() {
    }
    /**
     * 从MailInfo克隆
     * @param orig
     * @returns {MailInfo}
     * @constructor
     */
    MailInfo.Clone = function (orig) {
        var clone = new MailInfo();
        clone.m_id = orig.m_id;
        clone.m_mid = orig.m_mid;
        clone.m_last = orig.m_last;
        clone.m_read = orig.m_read;
        clone.m_args = orig.m_args;
        clone.title = orig.title;
        clone.word = orig.word;
        clone.gold = orig.gold;
        clone.dmd = orig.dmd;
        clone.ids = orig.ids;
        clone.cnt = orig.cnt;
        return clone;
    };
    /**
     * 是否已读
     * @returns {boolean}
     */
    MailInfo.prototype.isRead = function () {
        return this.m_read;
    };
    /**
     * 获取邮件Entity
     * @returns {Entity.Mail}
     */
    MailInfo.prototype.getMailEntity = function () {
        return Template.mail.get(this.m_mid);
    };
    /**
     * 获取过期剩余时间
     * @returns {number}
     */
    MailInfo.prototype.getRemainingTime = function () {
        return this.m_last - UtilsGame.Now();
    };
    /**
     * 是否过期
     * @returns {boolean}
     */
    MailInfo.prototype.isExpired = function () {
        return this.getRemainingTime() <= 0;
    };
    /**
     * 获取邮件标题
     */
    MailInfo.prototype.getMailTitle = function () {
        var entity = this.getMailEntity();
        if (!entity) {
            return undefined;
        }
        switch (entity.mType) {
            case MailType.GIFT:
            case MailType.NOTIFY:
                return entity.mTitle == "0" ? "" : Template.getGUIText(entity.mTitle);
            case MailType.CUSTOM_GIFT:
            case MailType.CUSTOM_NOTIFY:
                return this.title;
        }
        return "";
    };
    /**
     * 获取邮件内容
     * @returns {string}
     */
    MailInfo.prototype.getMailContent = function () {
        var entity = this.getMailEntity();
        if (!entity) {
            return undefined;
        }
        switch (entity.mType) {
            case MailType.GIFT:
            case MailType.NOTIFY:
                return entity.mTxt == "0" ? "" : UtilsGame.stringHanderEx(Template.getGUIText(entity.mTxt), this.m_args);
            case MailType.CUSTOM_GIFT:
            case MailType.CUSTOM_NOTIFY:
                return UtilsGame.stringHanderEx(this.word, this.m_args);
        }
        return "";
    };
    /**
     * 获取邮件类型
     */
    MailInfo.prototype.getMailType = function () {
        var entity = this.getMailEntity();
        if (!entity) {
            return 0;
        }
        return entity.mType;
    };
    return MailInfo;
}());
__reflect(MailInfo.prototype, "MailInfo");
//# sourceMappingURL=MailInfo.js.map