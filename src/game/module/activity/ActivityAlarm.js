var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ActivityAlarm = (function () {
    /**
     * @constructor
     */
    function ActivityAlarm() {
        this.als = new Dictionary();
    }
    /**
     * 检查是否有通知
     */
    ActivityAlarm.prototype.isAlarm = function (type) {
        var result = this.als.get(type);
        if (result == undefined) {
            return false;
        }
        // console.log("[CHECK ALARM] type: " + type + ", status: " + result);
        return result;
    };
    /**
     * 检查是否存在任意通知
     */
    ActivityAlarm.prototype.hasAnyAlarm = function () {
        for (var i = 0; i < this.als.values.length; i++) {
            if (this.als.values[i]) {
                return true;
            }
        }
        return false;
    };
    /**
     * 检查开服活动或普通活动是否存在任意通知
     */
    ActivityAlarm.prototype.hasTypeAlarm = function (type, except) {
        var inf_acts = ActivityUtil.getAllOpenAct();
        // console.log("==========");
        for (var i = 0; i < inf_acts.length; i++) {
            // console.log((inf_acts[i].type != E_ACT_TYPE.BASIC ? "开服" : "基本") + "活动: " + inf_acts[i].id + ", 红点: " + this.als.get(inf_acts[i].id));
            if (inf_acts[i].type != type) {
                continue;
            }
            if (except) {
                if (except.indexOf(inf_acts[i].id) >= 0) {
                    continue;
                }
            }
            if (this.als.get(inf_acts[i].id)) {
                if (this.alarmFilter(inf_acts[i].id, type)) {
                    return true;
                }
            }
        }
        // console.log("==========");
        return false;
    };
    /**
     * 提醒过滤器
     * 用于判断该活动通知是否应计算在常规活动内
     * @param id
     * @param type
     */
    ActivityAlarm.prototype.alarmFilter = function (id, type) {
        switch (type) {
            case E_ACT_TYPE.BASIC:
                switch (id) {
                    case E_ACT_DESIGN_TYPE.DmdPlate:
                        return false;
                }
                break;
            case E_ACT_TYPE.BEGIN:
                switch (id) {
                    case E_ACT_DESIGN_TYPE.LvRank:
                    case E_ACT_DESIGN_TYPE.PveRank:
                        return false;
                }
                break;
            default:
                break;
        }
        return true;
    };
    /**
     * 响应任意通知更新
     */
    ActivityAlarm.prototype.onUpdate_Any = function () {
        Singleton.Get(ActivityManager).refreshActive();
    };
    /**
     * 响应累计充值数据更新
     */
    ActivityAlarm.prototype.onUpdate_AccRmb = function () {
        var info = Singleton.Get(ActivityManager).getInfo();
        for (var i = 0; i < Template.accumulation.keys.length; i++) {
            if (info.getRewardStatus_AccRmb(Template.accumulation.keys[i]) == E_REWARD_STATUS.AVAILABLE) {
                this.als.update(E_ACT_DESIGN_TYPE.AccRmb, true);
                this.onUpdate_Any();
                return;
            }
        }
        this.als.update(E_ACT_DESIGN_TYPE.AccRmb, false);
        this.onUpdate_Any();
    };
    /**
     * 响应7日登入数据更新
     */
    ActivityAlarm.prototype.onUpdate_Seven = function () {
        var info = Singleton.Get(ActivityManager).getInfo();
        for (var i = 0; i < Template.draward.keys.length; i++) {
            if (Template.draward.values[i].Type == E_DRAWARD_TYPE.NORMAL) {
                if (info.getRewardStatus_Seven(Template.draward.keys[i]) == E_REWARD_STATUS.AVAILABLE) {
                    this.als.update(E_ACT_DESIGN_TYPE.Seven, true);
                    this.onUpdate_Any();
                    return;
                }
            }
        }
        this.als.update(E_ACT_DESIGN_TYPE.Seven, false);
        this.onUpdate_Any();
    };
    /**
     * 响应限时7日登入数据更新
     */
    ActivityAlarm.prototype.onUpdate_LimitSeven = function () {
        var info = Singleton.Get(ActivityManager).getInfo();
        for (var i = 0; i < Template.draward.keys.length; i++) {
            if (Template.draward.values[i].Type == E_DRAWARD_TYPE.LIMIT) {
                if (info.getRewardStatus_LimitSeven(Template.draward.keys[i]) == E_REWARD_STATUS.AVAILABLE) {
                    this.als.update(E_ACT_DESIGN_TYPE.LimitSeven, true);
                    this.onUpdate_Any();
                    return;
                }
            }
        }
        this.als.update(E_ACT_DESIGN_TYPE.LimitSeven, false);
        this.onUpdate_Any();
    };
    /**
     * 响应等级成长数据更新
     */
    ActivityAlarm.prototype.onUpdate_LvGrow = function () {
        var info = Singleton.Get(ActivityManager).getInfo();
        for (var i = 0; i < Template.lvGrow.keys.length; i++) {
            if (info.getRewardStatus_LvGrow(Template.lvGrow.keys[i]) == E_REWARD_STATUS.AVAILABLE) {
                this.als.update(E_ACT_DESIGN_TYPE.LvGrow, true);
                this.onUpdate_Any();
                return;
            }
        }
        this.als.update(E_ACT_DESIGN_TYPE.LvGrow, false);
        this.onUpdate_Any();
    };
    /**
     * 响应关卡成长数据更新
     */
    ActivityAlarm.prototype.onUpdate_GkGrow = function () {
        var info = Singleton.Get(ActivityManager).getInfo();
        for (var i = 0; i < Template.gkGrow.keys.length; i++) {
            if (info.getRewardStatus_GkGrow(Template.gkGrow.keys[i]) == E_REWARD_STATUS.AVAILABLE) {
                this.als.update(E_ACT_DESIGN_TYPE.GkGrow, true);
                this.onUpdate_Any();
                return;
            }
        }
        this.als.update(E_ACT_DESIGN_TYPE.GkGrow, false);
        this.onUpdate_Any();
    };
    /**
     * 响应成长基金数据更新
     */
    ActivityAlarm.prototype.onUpdate_Invest = function () {
        var info = Singleton.Get(ActivityManager).getInfo();
        for (var i = 0; i < Template.invest.keys.length; i++) {
            if (info.getRewardStatus_Invest(Template.invest.keys[i]) == E_REWARD_STATUS.AVAILABLE) {
                this.als.update(E_ACT_DESIGN_TYPE.Invest, true);
                this.onUpdate_Any();
                return;
            }
        }
        this.als.update(E_ACT_DESIGN_TYPE.Invest, false);
        this.onUpdate_Any();
    };
    /**
     * 响应签到数据更新
     */
    ActivityAlarm.prototype.onUpdate_CheckIn = function () {
        var info = Singleton.Get(ActivityManager).getInfo();
        // 检查当日是否可签到
        var date = UtilsGame.getNowDate();
        var date_id = date.m * 100 + date.d;
        if (!info.isCheckIn(date_id)) {
            this.als.update(E_ACT_DESIGN_TYPE.CheckIn, true);
            this.onUpdate_Any();
            return;
        }
        // 检查是否有未领取的累计签到奖励
        var agg_ids = Template.aggregate.keys;
        for (var i = 0; i < agg_ids.length; i++) {
            if (info.getRewardStatus_CheckIn(agg_ids[i]) == E_REWARD_STATUS.AVAILABLE) {
                this.als.update(E_ACT_DESIGN_TYPE.CheckIn, true);
                this.onUpdate_Any();
                return;
            }
        }
        this.als.update(E_ACT_DESIGN_TYPE.CheckIn, false);
        this.onUpdate_Any();
    };
    /**
     * 响应超值礼包数据更新
     */
    ActivityAlarm.prototype.onUpdate_Gift = function () {
        this.als.update(E_ACT_DESIGN_TYPE.Gift, false);
        this.onUpdate_Any();
    };
    /**
     * 响应限时超值礼包数据更新
     */
    ActivityAlarm.prototype.onUpdate_LimitGift = function () {
        this.als.update(E_ACT_DESIGN_TYPE.LimitGift, false);
        this.onUpdate_Any();
    };
    /**
     * 响应累计消费数据更新
     */
    ActivityAlarm.prototype.onUpdate_AccSpend = function () {
        var info = Singleton.Get(ActivityManager).getInfo();
        for (var i = 0; i < Template.consume.keys.length; i++) {
            if (info.getRewardStatus_AccSpend(Template.consume.keys[i]) == E_REWARD_STATUS.AVAILABLE) {
                this.als.update(E_ACT_DESIGN_TYPE.AccSpend, true);
                this.onUpdate_Any();
                return;
            }
        }
        this.als.update(E_ACT_DESIGN_TYPE.AccSpend, false);
        this.onUpdate_Any();
    };
    /**
     * 响应日充值数据更新
     */
    ActivityAlarm.prototype.onUpdate_DayPay = function () {
        var info = Singleton.Get(ActivityManager).getInfo();
        for (var i = 0; i < Template.dayPay.keys.length; i++) {
            if (info.getRewardStatus_DayPay(Template.dayPay.keys[i]) == E_REWARD_STATUS.AVAILABLE) {
                this.als.update(E_ACT_DESIGN_TYPE.DayPay, true);
                this.onUpdate_Any();
                return;
            }
        }
        this.als.update(E_ACT_DESIGN_TYPE.DayPay, false);
        this.onUpdate_Any();
    };
    /**
     * 响应幸运转盘数据更新
     */
    ActivityAlarm.prototype.onUpdate_Turnplate = function () {
        var bag = Singleton.Get(BagManager);
        if (bag.getItemCount(Template.config.DialItem) > 0) {
            this.als.update(E_ACT_DESIGN_TYPE.Turnplate, true);
            this.onUpdate_Any();
            return;
        }
        this.als.update(E_ACT_DESIGN_TYPE.Turnplate, false);
        this.onUpdate_Any();
    };
    /**
     * 响应7日登入数据更新
     */
    ActivityAlarm.prototype.onUpdate_Duration = function () {
        var info = Singleton.Get(ActivityManager).getInfo();
        for (var i = 0; i < Template.duration.keys.length; i++) {
            if (info.getRewardStatus_Duration(Template.duration.keys[i]) == E_REWARD_STATUS.AVAILABLE) {
                this.als.update(E_ACT_DESIGN_TYPE.Duration, true);
                this.onUpdate_Any();
                return;
            }
        }
        this.als.update(E_ACT_DESIGN_TYPE.Duration, false);
        this.onUpdate_Any();
    };
    /**
     * 响应一元夺宝数据更新
     */
    ActivityAlarm.prototype.onUpdate_DmdPlate = function () {
        var my_diamond = Singleton.Get(PlayerInfoManager).getDiamond();
        var cost = Template.config.DialDiamond;
        if (cost > my_diamond) {
            this.als.update(E_ACT_DESIGN_TYPE.DmdPlate, false);
            this.onUpdate_Any();
            return;
        }
        var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
        var cfg_vip = Template.vip.get(my_vip);
        if (!cfg_vip) {
            this.als.update(E_ACT_DESIGN_TYPE.DmdPlate, false);
            this.onUpdate_Any();
            return;
        }
        if (Singleton.Get(ActivityManager).getInfo().dmd_plate_cnt >= cfg_vip.Plate) {
            this.als.update(E_ACT_DESIGN_TYPE.DmdPlate, false);
            this.onUpdate_Any();
            return;
        }
        this.als.update(E_ACT_DESIGN_TYPE.DmdPlate, true);
        this.onUpdate_Any();
    };
    /**
     * 响应VIP福利数据更新
     */
    ActivityAlarm.prototype.onUpdate_VipBenefit = function () {
        var info = Singleton.Get(ActivityManager).getInfo();
        if (!info.getVipBenefitExeced()) {
            this.als.update(E_ACT_DESIGN_TYPE.VipBenefit, true);
            return;
        }
        this.als.update(E_ACT_DESIGN_TYPE.VipBenefit, false);
        this.onUpdate_Any();
    };
    /**
     * 响应VIP周礼包数据更新
     */
    ActivityAlarm.prototype.onUpdate_VipWeekly = function () {
        this.als.update(E_ACT_DESIGN_TYPE.VipWeekly, false);
        this.onUpdate_Any();
    };
    /**
     * 响应斗士投资数据更新
     */
    ActivityAlarm.prototype.onUpdate_RoleInvest = function () {
        var info = Singleton.Get(ActivityManager).getInfo();
        if (info.role_has_invest) {
            var entities = info.getEntities_RoleInvest();
            for (var i = 0; i < entities.keys.length; i++) {
                if (info.getRewardStatus_RoleInvest(entities.keys[i]) == E_REWARD_STATUS.AVAILABLE) {
                    this.als.update(E_ACT_DESIGN_TYPE.RoleInvest, true);
                    this.onUpdate_Any();
                    return;
                }
            }
        }
        this.als.update(E_ACT_DESIGN_TYPE.RoleInvest, false);
        this.onUpdate_Any();
    };
    /**
     * 响应附魔投资数据更新
     */
    ActivityAlarm.prototype.onUpdate_EnchantInvest = function () {
        var info = Singleton.Get(ActivityManager).getInfo();
        if (info.enchant_has_invest) {
            var entities = info.getEntities_EnchantInvest();
            for (var i = 0; i < entities.keys.length; i++) {
                if (info.getRewardStatus_EnchantInvest(entities.keys[i]) == E_REWARD_STATUS.AVAILABLE) {
                    this.als.update(E_ACT_DESIGN_TYPE.EnchantInvest, true);
                    this.onUpdate_Any();
                    return;
                }
            }
        }
        this.als.update(E_ACT_DESIGN_TYPE.EnchantInvest, false);
        this.onUpdate_Any();
    };
    /**
     * 响应饰品投资数据更新
     */
    ActivityAlarm.prototype.onUpdate_JewelryInvest = function () {
        var info = Singleton.Get(ActivityManager).getInfo();
        if (info.jewelry_has_invest) {
            var entities = info.getEntities_JewelryInvest();
            for (var i = 0; i < entities.keys.length; i++) {
                if (info.getRewardStatus_JewelryInvest(entities.keys[i]) == E_REWARD_STATUS.AVAILABLE) {
                    this.als.update(E_ACT_DESIGN_TYPE.JewelryInvest, true);
                    this.onUpdate_Any();
                    return;
                }
            }
        }
        this.als.update(E_ACT_DESIGN_TYPE.JewelryInvest, false);
        this.onUpdate_Any();
    };
    /**
     * 响应EX角色礼包数据更新
     */
    ActivityAlarm.prototype.onUpdate_ExRole = function () {
        this.als.update(E_ACT_DESIGN_TYPE.ExRole, false);
        this.onUpdate_Any();
    };
    return ActivityAlarm;
}());
__reflect(ActivityAlarm.prototype, "ActivityAlarm");
//# sourceMappingURL=ActivityAlarm.js.map