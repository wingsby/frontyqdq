var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerMonthcardInfo = (function () {
    function PlayerMonthcardInfo() {
        this.mc_ids = []; // 拥有的卡ID
        this.mc_end = 0; // 月卡结束时间戳，毫秒
        this.last_mail_t = 0; // 上一次发送奖励邮件的时间，时间戳毫秒
        this.first_award_status = FirstPayStatus.NOT_FIRST_BILL; // 首充奖励状态值
        this.finish_1st = []; // 已经充过首充的id
        this.spay_ids = []; // 已经激活的累计首充id列表
        this.spay_t = []; // 累计首充激活时间
        this.spay_r = [1, 2, 3]; // 已经领取的累计首充奖励
        // endregion
    }
    Object.defineProperty(PlayerMonthcardInfo.prototype, "has_month_card", {
        get: function () {
            return this.mcContains(E_PayType.MONTH);
        },
        set: function (value) {
            var has = this.mcContains(E_PayType.MONTH);
            if (has && !value) {
                for (var i = 0; i < this.mc_ids.length; i++) {
                    if (this.mc_ids[i] == E_PayType.MONTH) {
                        this.mc_ids.splice(i, 1);
                    }
                }
            }
            if (!has && value) {
                this.mc_ids.push(E_PayType.MONTH);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerMonthcardInfo.prototype, "has_lifetime_card", {
        get: function () {
            return this.mcContains(E_PayType.LIFETIME);
        },
        enumerable: true,
        configurable: true
    });
    PlayerMonthcardInfo.prototype.mcContains = function (id) {
        for (var i = 0; i < this.mc_ids.length; i++) {
            if (this.mc_ids[i] == id) {
                return true;
            }
        }
        return false;
    };
    /**
     * 某档奖励是否已经首充过
     * @param item_id
     * @returns {boolean}
     */
    PlayerMonthcardInfo.prototype.finishedFirstPay = function (item_id) {
        return UtilsArray.contains(this.finish_1st, item_id);
    };
    /**
     * 是否有任意可购买的VIP礼包
     */
    PlayerMonthcardInfo.prototype.hasAnyVipGiftAvailable = function () {
        var info_mgr = Singleton.Get(PlayerInfoManager);
        for (var i = 0; i < Template.vip.values.length; i++) {
            var vip_lv = Template.vip.values[i].ID;
            if (info_mgr.getVipLevel() >= vip_lv) {
                if (!info_mgr.checkVipGiftWasted(vip_lv)) {
                    return true;
                }
            }
        }
    };
    // region 累计首充SPay
    /**
     * 获取累计首充购买时间 如果为0则未购买
     * @param id
     * @return {number}
     */
    PlayerMonthcardInfo.prototype.getSpayActivateTime = function (id) {
        for (var i = 0; i < this.spay_ids.length; i++) {
            if (this.spay_ids[i] == id) {
                return this.spay_t[i];
            }
        }
        return 0;
    };
    /**
     * 获取已购买的首充是否双倍
     * @param id
     */
    PlayerMonthcardInfo.prototype.getPaidSpayDouble = function (id) {
        var activate_time = this.getSpayActivateTime(id);
        if (activate_time <= 0) {
            return false;
        }
        var cfg_spay = Template.spay.get(id);
        if (!cfg_spay) {
            return false;
        }
        var double_time = Singleton.Get(LoginManager).loginInfo.create_time + (cfg_spay.Ltime);
        return activate_time <= double_time;
    };
    /**
     * 检查累计首充奖励是否已领取
     * @param id
     * @return {boolean}
     */
    PlayerMonthcardInfo.prototype.isSpayRewardReceived = function (id) {
        return UtilsArray.contains(this.spay_r, id);
    };
    /**
     * 将累计首充奖励标记为已领取状态
     * @param id
     */
    PlayerMonthcardInfo.prototype.markSpayAsReceived = function (id) {
        if (!UtilsArray.contains(this.spay_r, id)) {
            this.spay_r.push(id);
        }
    };
    /**
     * 检查累计首充奖励是否可领取
     */
    PlayerMonthcardInfo.prototype.isSpayAvailable = function (id) {
        var cfg_spay = Template.spay.get(id);
        if (!cfg_spay) {
            return false;
        }
        var pay_time = this.getSpayActivateTime(id);
        if (pay_time <= 0) {
            return false;
        }
        var acc_rmb = Singleton.Get(PlayerInfoManager).getAccRmb();
        var need_pay = cfg_spay.Spay;
        return acc_rmb >= need_pay;
    };
    /**
     * 是否有首充领奖提示
     * @return {boolean}
     */
    PlayerMonthcardInfo.prototype.isSpayAlarm = function () {
        return (this.isSpayAvailable(1) && !this.isSpayRewardReceived(1)) || (this.isSpayAvailable(2) && !this.isSpayRewardReceived(2)) || (this.isSpayAvailable(3) && !this.isSpayRewardReceived(3));
    };
    /**
     * 是否有操作的首充
     */
    PlayerMonthcardInfo.prototype.isSpayActive = function () {
        var cfg_spay = Template.spay.get(3);
        if (!cfg_spay) {
            return false;
        }
        return !(this.isSpayRewardReceived(1) && this.isSpayRewardReceived(2) && this.isSpayRewardReceived(3));
    };
    return PlayerMonthcardInfo;
}());
__reflect(PlayerMonthcardInfo.prototype, "PlayerMonthcardInfo");
//# sourceMappingURL=PlayerMonthcardInfo.js.map