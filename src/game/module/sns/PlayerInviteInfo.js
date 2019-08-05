var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerInviteInfo = (function () {
    function PlayerInviteInfo() {
    }
    PlayerInviteInfo.prototype.init = function () {
        var rec = Singleton.Get(LoginManager).loginInfo;
        this.share_cnt = rec.share_cnt;
        this.inv_cnt = rec.inv_cnt;
        this.inv_award = rec.inv_award;
        this.m_share_t = rec.share_t;
    };
    Object.defineProperty(PlayerInviteInfo.prototype, "share_cnt", {
        get: function () {
            if (!UtilsGame.isToday(this.m_share_cnt_time)) {
                return 0;
            }
            return this.m_share_cnt;
        },
        set: function (value) {
            this.m_share_cnt = value;
            this.m_share_cnt_time = UtilsGame.Now();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerInviteInfo.prototype, "inv_cnt", {
        get: function () {
            if (!UtilsGame.isToday(this.m_inv_cnt_time)) {
                return 0;
            }
            return this.m_inv_cnt;
        },
        set: function (value) {
            this.m_inv_cnt = value;
            this.m_inv_cnt_time = UtilsGame.Now();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerInviteInfo.prototype, "inv_award", {
        get: function () {
            if (!UtilsGame.isToday(this.m_inv_award_time)) {
                return [];
            }
            return this.m_inv_award;
        },
        set: function (value) {
            this.m_inv_award = value;
            this.m_inv_award_time = UtilsGame.Now();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 记录分享一次
     */
    PlayerInviteInfo.prototype.addShareOnce = function () {
        this.share_cnt = this.share_cnt + 1;
        this.m_share_t = UtilsGame.Now();
    };
    /**
     * 设定奖励已领取
     */
    PlayerInviteInfo.prototype.setRewardRec = function (id) {
        var award = this.inv_award;
        if (!UtilsArray.contains(award, id)) {
            award.push(id);
        }
        this.inv_award = award;
    };
    /**
     * 检查奖励是否已领取
     */
    PlayerInviteInfo.prototype.isRewardRec = function (id) {
        return UtilsArray.contains(this.inv_award, id);
    };
    /**
     * 检查奖励领取条件是否满足
     */
    PlayerInviteInfo.prototype.isRewardEnable = function (id) {
        var cfg_ivt = Template.invite.get(id);
        if (!cfg_ivt) {
            console.error("no invite cfg: " + id);
            return false;
        }
        return this.m_inv_cnt >= cfg_ivt.People;
    };
    /**
     * 获取分享冷却时间
     */
    PlayerInviteInfo.prototype.getShareCD = function () {
        if (!UtilsGame.isRToday(this.m_share_t)) {
            return 0;
        }
        var elsp_t = UtilsGame.Now() - this.m_share_t;
        var cd_t = Template.config.InviteTime * 60 * 1000 - elsp_t;
        if (cd_t < 0) {
            return 0;
        }
        return cd_t;
    };
    /**
     * 获取今日剩余分享次数
     */
    PlayerInviteInfo.prototype.getLastShareToday = function () {
        return Template.config.InviteNum - this.share_cnt;
    };
    return PlayerInviteInfo;
}());
__reflect(PlayerInviteInfo.prototype, "PlayerInviteInfo");
//# sourceMappingURL=PlayerInviteInfo.js.map