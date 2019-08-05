var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerActivityInfo = (function () {
    function PlayerActivityInfo() {
        this.acc_bill_rmb = 0; // 累计充值的数值
        this.acc_bill_award = []; // 累计充值奖励领取情况
        this.seven_acc = 0; // 7日登入活动的累计登陆日期
        this.seven_award = []; // 7日登入活动已经领奖的列表
        this.limit_seven_acc = 0; // 限时7日登入活动的累计登陆日期
        this.limit_seven_award = []; // 限时7日登入活动已经领奖的列表
        this.lvgrow_award = []; // 等级成长已经领奖的列表
        this.gkgrow_award = []; // 关卡成长已经领奖的列表
        this.has_invest = false; // 是否已经投资过
        this.invest_award = []; // 投资活动已经领奖的列表
        this.invest_try_time = 0; // 上次尝试购买时间
        this.check_in_date = []; // 本月已经签到的id
        this.check_in_award = []; // 本月已经领取的累计登陆奖励的id
        this.check_in_re = 0; // 当月已经补签次数 
        this.gift_ids = []; // 超值礼包已经购买的id
        this.gift_cnts = []; // 超值礼包已经购买的次数，跟id一一对应
        this.limit_gift_ids = []; // 限时超值礼包已经购买的id
        this.limit_gift_cnts = []; // 限时超值礼包已经购买的次数，跟id一一对应
        this.acc_spend = 0; // 累计消费钻石数
        this.acc_spend_award = []; // 累计消费奖励领取情况
        this.day_pay_acc = 0; // 当日充值数
        this.day_pay_award = []; // 日充值奖励领取情况
        this.duration_acc = 0; // 上次登录时的今日累计在线时间
        this.duration_award = []; // 在线奖励活动奖励领取情况
        this.dmd_plate_cnt = 0; // 一元夺宝已转动次数
        this.vip_benefit_date = 0; // 上次领取VIP福利时间
        this.vip_weekly_ids = []; // VIP周礼包已经购买的id
        this.vip_weekly_cnts = []; // VIP周礼包已经购买的次数，跟id一一对应
        this.role_has_invest = false; // 斗士-是否已经投资过
        this.role_invest_award = []; // 斗士-投资活动已经领奖的列表
        this.enchant_has_invest = false; // 附魔-是否已经投资过
        this.enchant_invest_award = []; // 附魔-投资活动已经领奖的列表
        this.jewelry_has_invest = false; // 饰品-是否已经投资过
        this.jewelry_invest_award = []; // 饰品-投资活动已经领奖的列表
        this.ex_role_ids = []; // EX角色礼包已经购买的id
        this.ex_role_cnts = []; // EX角色礼包已经购买的次数，跟id一一对应
    }
    // region 累计充值
    /**
     * 更新累计充值信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_AccRmb = function (msg) {
        this.acc_bill_rmb = msg.acc_bill_rmb;
        this.acc_bill_award = msg.acc_bill_award;
        this.onUpdate_AccRmb();
    };
    /**
     * 响应累计充值信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_AccRmb = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_AccRmb();
    };
    /**
     * 获取累计充值奖励状态
     */
    PlayerActivityInfo.prototype.getRewardStatus_AccRmb = function (id) {
        var is_received = this.arrContains(this.acc_bill_award, id);
        if (is_received) {
            return E_REWARD_STATUS.RECEIVED;
        }
        var cfg_acc = Template.accumulation.get(id);
        if (this.acc_bill_rmb >= cfg_acc.rmb) {
            return E_REWARD_STATUS.AVAILABLE;
        }
        return E_REWARD_STATUS.DISABLE;
    };
    /**
     * 设定累计充值奖励为已领取
     */
    PlayerActivityInfo.prototype.setRewardReceived_AccRmb = function (id) {
        this.arrPushUnique(this.acc_bill_award, id);
        this.onUpdate_AccRmb();
    };
    // endregion
    // region 7日登入
    /**
     * 更新7日登入信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_Seven = function (msg) {
        this.seven_acc = msg.seven_acc;
        this.seven_award = msg.seven_award;
        this.onUpdate_Seven();
    };
    /**
     * 响应7日登入信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_Seven = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_Seven();
    };
    /**
     * 获取7日登入奖励状态
     */
    PlayerActivityInfo.prototype.getRewardStatus_Seven = function (id) {
        var is_received = this.arrContains(this.seven_award, id);
        if (is_received) {
            return E_REWARD_STATUS.RECEIVED;
        }
        var cfg_dra = Template.draward.get(id);
        if (this.seven_acc >= cfg_dra.Sky) {
            return E_REWARD_STATUS.AVAILABLE;
        }
        return E_REWARD_STATUS.DISABLE;
    };
    /**
     * 设定7日登入奖励为已领取
     */
    PlayerActivityInfo.prototype.setRewardReceived_Seven = function (id) {
        this.arrPushUnique(this.seven_award, id);
        this.onUpdate_Seven();
    };
    /**
     * 是否已经领取了7日登入所有奖励
     */
    PlayerActivityInfo.prototype.isAllRewardReceived_Seven = function () {
        for (var i = 0; i < Template.draward.keys.length; i++) {
            if (Template.draward.values[i].Type == E_DRAWARD_TYPE.NORMAL) {
                var status_1 = this.getRewardStatus_Seven(Template.draward.keys[i]);
                if (status_1 != E_REWARD_STATUS.RECEIVED) {
                    return false;
                }
            }
        }
        return true;
    };
    // endregion
    // region 限时7日登入
    /**
     * 更新限时7日登入信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_LimitSeven = function (msg) {
        this.limit_seven_acc = msg.limit_seven_acc;
        this.limit_seven_award = msg.limit_seven_award;
        this.onUpdate_LimitSeven();
    };
    /**
     * 响应限时7日登入信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_LimitSeven = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_LimitSeven();
    };
    /**
     * 获取限时7日登入奖励状态
     */
    PlayerActivityInfo.prototype.getRewardStatus_LimitSeven = function (id) {
        var is_received = this.arrContains(this.limit_seven_award, id);
        if (is_received) {
            return E_REWARD_STATUS.RECEIVED;
        }
        var cfg_dra = Template.draward.get(id);
        if (this.limit_seven_acc >= cfg_dra.Sky) {
            return E_REWARD_STATUS.AVAILABLE;
        }
        return E_REWARD_STATUS.DISABLE;
    };
    /**
     * 设定限时7日登入奖励为已领取
     */
    PlayerActivityInfo.prototype.setRewardReceived_LimitSeven = function (id) {
        this.arrPushUnique(this.limit_seven_award, id);
        this.onUpdate_LimitSeven();
    };
    /**
     * 是否已经领取了限时7日登入所有奖励
     */
    PlayerActivityInfo.prototype.isAllRewardReceived_LimitSeven = function () {
        for (var i = 0; i < Template.draward.keys.length; i++) {
            if (Template.draward.values[i].Type == E_DRAWARD_TYPE.LIMIT) {
                var status_2 = this.getRewardStatus_LimitSeven(Template.draward.keys[i]);
                if (status_2 != E_REWARD_STATUS.RECEIVED) {
                    return false;
                }
            }
        }
        return true;
    };
    // endregion
    // region 等级成长
    /**
     * 更新等级成长信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_LvGrow = function (msg) {
        this.lvgrow_award = msg.lvgrow_award;
        this.onUpdate_LvGrow();
    };
    /**
     * 响应等级成长信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_LvGrow = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_LvGrow();
    };
    /**
     * 获取等级成长奖励状态
     */
    PlayerActivityInfo.prototype.getRewardStatus_LvGrow = function (id) {
        var is_received = this.arrContains(this.lvgrow_award, id);
        if (is_received) {
            return E_REWARD_STATUS.RECEIVED;
        }
        var my_team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
        var cfg_lvg = Template.lvGrow.get(id);
        if (my_team_lv >= cfg_lvg.ID) {
            return E_REWARD_STATUS.AVAILABLE;
        }
        return E_REWARD_STATUS.DISABLE;
    };
    /**
     * 设定等级成长奖励为已领取
     */
    PlayerActivityInfo.prototype.setRewardReceived_LvGrow = function (id) {
        this.arrPushUnique(this.lvgrow_award, id);
        this.onUpdate_LvGrow();
    };
    /**
     * 是否已经领取了等级成长所有奖励
     */
    PlayerActivityInfo.prototype.isAllRewardReceived_LvGrow = function () {
        for (var i = 0; i < Template.lvGrow.keys.length; i++) {
            var status_3 = this.getRewardStatus_LvGrow(Template.lvGrow.keys[i]);
            if (status_3 != E_REWARD_STATUS.RECEIVED) {
                return false;
            }
        }
        return true;
    };
    // endregion
    // region 关卡成长
    /**
     * 更新关卡成长信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_GkGrow = function (msg) {
        this.gkgrow_award = msg.gkgrow_award;
        this.onUpdate_GkGrow();
    };
    /**
     * 响应关卡成长信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_GkGrow = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_GkGrow();
    };
    /**
     * 获取关卡成长奖励状态
     */
    PlayerActivityInfo.prototype.getRewardStatus_GkGrow = function (id) {
        var is_received = this.arrContains(this.gkgrow_award, id);
        if (is_received) {
            return E_REWARD_STATUS.RECEIVED;
        }
        var my_pve_lv = Singleton.Get(PveManager).getCurLevel();
        var cfg_gkg = Template.gkGrow.get(id);
        if (my_pve_lv > cfg_gkg.ID) {
            return E_REWARD_STATUS.AVAILABLE;
        }
        return E_REWARD_STATUS.DISABLE;
    };
    /**
     * 设定关卡成长奖励为已领取
     */
    PlayerActivityInfo.prototype.setRewardReceived_GkGrow = function (id) {
        this.arrPushUnique(this.gkgrow_award, id);
        this.onUpdate_GkGrow();
    };
    /**
     * 是否已经领取了关卡成长所有奖励
     */
    PlayerActivityInfo.prototype.isAllRewardReceived_GkGrow = function () {
        for (var i = 0; i < Template.gkGrow.keys.length; i++) {
            var status_4 = this.getRewardStatus_GkGrow(Template.gkGrow.keys[i]);
            if (status_4 != E_REWARD_STATUS.RECEIVED) {
                return false;
            }
        }
        return true;
    };
    // endregion
    // region 成长基金
    /**
     * 更新成长基金信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_Invest = function (msg) {
        this.has_invest = msg.has_invest;
        this.invest_award = msg.invest_award;
        this.onUpdate_Invest();
    };
    /**
     * 响应成长基金信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_Invest = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_Invest();
    };
    /**
     * 获取成长基金奖励状态
     */
    PlayerActivityInfo.prototype.getRewardStatus_Invest = function (id) {
        // 判断玩家投资状态
        if (!this.has_invest) {
            return E_REWARD_STATUS.DISABLE;
        }
        var is_received = this.arrContains(this.invest_award, id);
        if (is_received) {
            return E_REWARD_STATUS.RECEIVED;
        }
        var my_team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
        var cfg_lvg = Template.invest.get(id);
        if (my_team_lv >= cfg_lvg.ID) {
            return E_REWARD_STATUS.AVAILABLE;
        }
        return E_REWARD_STATUS.DISABLE;
    };
    /**
     * 设定成长基金奖励为已领取
     */
    PlayerActivityInfo.prototype.setRewardReceived_Invest = function (id) {
        this.arrPushUnique(this.invest_award, id);
        this.onUpdate_Invest();
    };
    // endregion
    // region 签到
    /**
     * 更新签到信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_CheckIn = function (msg) {
        this.check_in_date = msg.check_in_date;
        this.check_in_award = msg.check_in_award;
        this.check_in_re = msg.check_in_re;
        this.onUpdate_CheckIn();
    };
    /**
     * 响应签到状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_CheckIn = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_CheckIn();
    };
    /**
     * 是否已签到
     */
    PlayerActivityInfo.prototype.isCheckIn = function (id) {
        return this.arrContains(this.check_in_date, id);
    };
    /**
     * 设定已签到
     */
    PlayerActivityInfo.prototype.setCheckIn = function (id) {
        this.arrPushUnique(this.check_in_date, id);
        this.onUpdate_CheckIn();
    };
    /**
     * 获取当月已签到天数
     */
    PlayerActivityInfo.prototype.getCheckInCount = function () {
        return this.check_in_date.length;
    };
    /**
     * 获取累计签到奖励状态
     */
    PlayerActivityInfo.prototype.getRewardStatus_CheckIn = function (id) {
        var is_received = this.arrContains(this.check_in_award, id);
        if (is_received) {
            return E_REWARD_STATUS.RECEIVED;
        }
        var day_counts = this.getCheckInCount();
        var cfg_agg = Template.aggregate.get(id);
        if (day_counts >= cfg_agg.ID) {
            return E_REWARD_STATUS.AVAILABLE;
        }
        return E_REWARD_STATUS.DISABLE;
    };
    /**
     * 设定累计签到奖励为已领取
     */
    PlayerActivityInfo.prototype.setRewardReceived_CheckIn = function (id) {
        this.arrPushUnique(this.check_in_award, id);
        this.onUpdate_CheckIn();
    };
    // endregion
    // region 超值礼包
    /**
     * 更新超值礼包信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_Gift = function (msg) {
        this.gift_ids = msg.gift_ids;
        this.gift_cnts = msg.gift_cnts;
        this.onUpdate_Gift();
    };
    /**
     * 响应超值礼包信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_Gift = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_Gift();
    };
    /**
     * 获取超值礼包购买状态
     */
    PlayerActivityInfo.prototype.getItemStatus_Gift = function (id) {
        var cfg_gift = Template.gift.get(id);
        var buy_count = this.getItemBuyCount_Gift(id);
        if (buy_count < 0) {
            if (cfg_gift.Next > 0) {
                return E_REWARD_STATUS.AVAILABLE;
            }
        }
        else {
            if (cfg_gift.Next > buy_count) {
                return E_REWARD_STATUS.AVAILABLE;
            }
        }
        return E_REWARD_STATUS.RECEIVED;
    };
    /**
     * 获取超值礼包已购买次数
     */
    PlayerActivityInfo.prototype.getItemBuyCount_Gift = function (id) {
        var arr_id = this.getArrId(this.gift_ids, id);
        if (arr_id < 0) {
            return 0;
        }
        else {
            return this.gift_cnts[arr_id];
        }
    };
    /**
     * 设定超值礼包已购买次数增加一次
     */
    PlayerActivityInfo.prototype.setItemBuy_Gift = function (id) {
        var arr_id = this.getArrId(this.gift_ids, id);
        if (arr_id >= 0) {
            this.gift_cnts[arr_id]++;
        }
        else {
            this.gift_ids.push(id);
            this.gift_cnts.push(1);
        }
        this.onUpdate_Gift();
    };
    // endregion
    // region 限时超值礼包
    /**
     * 更新限时超值礼包信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_LimitGift = function (msg) {
        this.limit_gift_ids = msg.limit_gift_ids;
        this.limit_gift_cnts = msg.limit_gift_cnts;
        this.onUpdate_LimitGift();
    };
    /**
     * 响应限时超值礼包信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_LimitGift = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_LimitGift();
    };
    /**
     * 获取限时超值礼包购买状态
     */
    PlayerActivityInfo.prototype.getItemStatus_LimitGift = function (id) {
        var cfg_gift = Template.gift.get(id);
        var buy_count = this.getItemBuyCount_LimitGift(id);
        if (buy_count < 0) {
            if (cfg_gift.Next > 0) {
                return E_REWARD_STATUS.AVAILABLE;
            }
        }
        else {
            if (cfg_gift.Next > buy_count) {
                return E_REWARD_STATUS.AVAILABLE;
            }
        }
        return E_REWARD_STATUS.RECEIVED;
    };
    /**
     * 获取限时超值礼包已购买次数
     */
    PlayerActivityInfo.prototype.getItemBuyCount_LimitGift = function (id) {
        var arr_id = this.getArrId(this.limit_gift_ids, id);
        if (arr_id < 0) {
            return 0;
        }
        else {
            return this.limit_gift_cnts[arr_id];
        }
    };
    /**
     * 设定限时超值礼包已购买次数增加一次
     */
    PlayerActivityInfo.prototype.setItemBuy_LimitGift = function (id) {
        var arr_id = this.getArrId(this.limit_gift_ids, id);
        if (arr_id >= 0) {
            this.limit_gift_cnts[arr_id]++;
        }
        else {
            this.limit_gift_ids.push(id);
            this.limit_gift_cnts.push(1);
        }
        this.onUpdate_LimitGift();
    };
    // endregion
    // region 累计消费
    /**
     * 更新累计消费信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_AccSpend = function (msg) {
        this.acc_spend = msg.acc_spend;
        this.acc_spend_award = msg.acc_spend_award;
        this.onUpdate_AccSpend();
    };
    /**
     * 响应累计消费信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_AccSpend = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_AccSpend();
    };
    /**
     * 获取累计消费奖励状态
     */
    PlayerActivityInfo.prototype.getRewardStatus_AccSpend = function (id) {
        var is_received = this.arrContains(this.acc_spend_award, id);
        if (is_received) {
            return E_REWARD_STATUS.RECEIVED;
        }
        var cfg_csm = Template.consume.get(id);
        if (this.acc_spend >= cfg_csm.limit) {
            return E_REWARD_STATUS.AVAILABLE;
        }
        return E_REWARD_STATUS.DISABLE;
    };
    /**
     * 设定累计消费奖励为已领取
     */
    PlayerActivityInfo.prototype.setRewardReceived_AccSpend = function (id) {
        this.arrPushUnique(this.acc_spend_award, id);
        this.onUpdate_AccSpend();
    };
    /**
     * 响应钻石消费
     */
    PlayerActivityInfo.prototype.onSubDiamond_AccSpend = function (count) {
        this.acc_spend += count;
        this.onUpdate_AccSpend();
    };
    // endregion
    // region 日充值
    /**
     * 更新日充值信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_DayPay = function (msg) {
        this.day_pay_acc = msg.day_pay_acc;
        this.day_pay_award = msg.day_pay_award;
        this.onUpdate_DayPay();
    };
    /**
     * 响应日充值信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_DayPay = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_DayPay();
    };
    /**
     * 获取日充值奖励状态
     */
    PlayerActivityInfo.prototype.getRewardStatus_DayPay = function (id) {
        var is_received = this.arrContains(this.day_pay_award, id);
        if (is_received) {
            return E_REWARD_STATUS.RECEIVED;
        }
        var cfg_dpay = Template.dayPay.get(id);
        if (this.day_pay_acc >= cfg_dpay.ID) {
            return E_REWARD_STATUS.AVAILABLE;
        }
        return E_REWARD_STATUS.DISABLE;
    };
    /**
     * 设定日充值奖励为已领取
     */
    PlayerActivityInfo.prototype.setRewardReceived_DayPay = function (id) {
        this.arrPushUnique(this.day_pay_award, id);
        this.onUpdate_DayPay();
    };
    /**
     * 重置日充值数量
     */
    PlayerActivityInfo.prototype.resetAcc_DayPay = function () {
        this.day_pay_acc = 0;
        this.onUpdate_DayPay();
    };
    // endregion
    // region 累计在线
    /**
     * 更新累计在线信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_Duration = function (msg) {
        this.duration_acc = msg.duration_acc;
        this.duration_award = msg.duration_award;
        this.onUpdate_Duration();
    };
    /**
     * 响应累计在线信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_Duration = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_Duration();
    };
    /**
     * 获取累计在线奖励状态
     */
    PlayerActivityInfo.prototype.getRewardStatus_Duration = function (id) {
        var is_received = this.arrContains(this.duration_award, id);
        if (is_received) {
            return E_REWARD_STATUS.RECEIVED;
        }
        var cfg_dra = Template.duration.get(id);
        if (this.duration_acc >= cfg_dra.ID) {
            return E_REWARD_STATUS.AVAILABLE;
        }
        return E_REWARD_STATUS.DISABLE;
    };
    /**
     * 设定累计在线奖励为已领取
     */
    PlayerActivityInfo.prototype.setRewardReceived_Duration = function (id) {
        this.arrPushUnique(this.duration_award, id);
        this.onUpdate_Duration();
    };
    // endregion
    // region 幸运转盘
    /**
     * 响应幸运转盘信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_Turnplate = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_Turnplate();
    };
    // endregion
    // region 一元夺宝
    /**
     * 更新一元夺宝信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_DmdPlate = function (msg) {
        this.dmd_plate_cnt = msg.dmd_plate_cnt;
        this.onUpdate_DmdPlate();
    };
    /**
     * 增加一次一元夺宝已转动次数
     */
    PlayerActivityInfo.prototype.setDmdPlateExeced = function () {
        this.dmd_plate_cnt += 1;
        this.onUpdate_DmdPlate();
    };
    /**
     * 获取一元夺宝档位钻石数
     * @param id
     */
    PlayerActivityInfo.prototype.getActualDiamond = function (id, offset) {
        if (offset === void 0) { offset = 0; }
        var cfg_dp = Template.diamondPlate.get(id);
        if (!cfg_dp) {
            console.log("no diamond plate cfg: " + id);
            return 0;
        }
        // 一元夺宝钻石档位公式
        return Math.floor(cfg_dp.Diamond + ((this.dmd_plate_cnt + offset) * cfg_dp.Add));
    };
    /**
     * 响应一元夺宝信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_DmdPlate = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_DmdPlate();
    };
    // endregion
    // region VIP福利
    /**
     * 更新VIP福利信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_VipBenefit = function (msg) {
        this.vip_benefit_date = msg.vip_benefit_date;
        this.onUpdate_VipBenefit();
    };
    /**
     * 记录领取一次VIP福利
     */
    PlayerActivityInfo.prototype.setVipBenefitExeced = function () {
        this.vip_benefit_date = UtilsGame.Now();
        this.onUpdate_VipBenefit();
    };
    /**
     * 获取今日VIP福利是否已领取过
     */
    PlayerActivityInfo.prototype.getVipBenefitExeced = function () {
        return UtilsGame.isRToday(this.vip_benefit_date);
    };
    /**
     * 响应VIP福利信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_VipBenefit = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_VipBenefit();
    };
    // endregion
    // region VIP周礼包
    /**
     * 更新VIP周礼包信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_VipWeekly = function (msg) {
        this.vip_weekly_ids = msg.gift_ids;
        this.vip_weekly_cnts = msg.gift_cnts;
        this.onUpdate_VipWeekly();
    };
    /**
     * 响应VIP周礼包信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_VipWeekly = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_VipWeekly();
    };
    /**
     * 获取VIP周礼包购买状态
     */
    PlayerActivityInfo.prototype.getItemStatus_VipWeekly = function (id) {
        var cfg_vg = Template.vipGift.get(id);
        var buy_count = this.getItemBuyCount_VipWeekly(id);
        if (buy_count < 0) {
            if (cfg_vg.Times > 0) {
                return E_REWARD_STATUS.AVAILABLE;
            }
        }
        else {
            if (cfg_vg.Times > buy_count) {
                return E_REWARD_STATUS.AVAILABLE;
            }
        }
        return E_REWARD_STATUS.RECEIVED;
    };
    /**
     * 获取VIP周礼包已购买次数
     */
    PlayerActivityInfo.prototype.getItemBuyCount_VipWeekly = function (id) {
        var arr_id = this.getArrId(this.vip_weekly_ids, id);
        if (arr_id < 0) {
            return 0;
        }
        else {
            return this.vip_weekly_cnts[arr_id];
        }
    };
    /**
     * 设定超值礼包已购买次数增加一次
     */
    PlayerActivityInfo.prototype.setItemBuy_VipWeekly = function (id) {
        var arr_id = this.getArrId(this.vip_weekly_ids, id);
        if (arr_id >= 0) {
            this.vip_weekly_cnts[arr_id]++;
        }
        else {
            this.vip_weekly_ids.push(id);
            this.vip_weekly_cnts.push(1);
        }
        this.onUpdate_VipWeekly();
    };
    // endregion
    // region 投资计划-斗士
    /**
     * 获取斗士投资计划配置信息
     */
    PlayerActivityInfo.prototype.getEntities_RoleInvest = function () {
        var range = Template.config.InvestRoleID;
        return Template.investVip.subset(this.genSetFromRange(range[0], range[1]));
    };
    /**
     * 更新斗士投资计划信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_RoleInvest = function (msg) {
        this.role_has_invest = msg.has_invest;
        this.role_invest_award = msg.invest_award;
        this.onUpdate_RoleInvest();
    };
    /**
     * 响应斗士投资计划信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_RoleInvest = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_RoleInvest();
    };
    /**
     * 获取斗士投资计划奖励状态
     */
    PlayerActivityInfo.prototype.getRewardStatus_RoleInvest = function (id) {
        // 判断玩家投资状态
        if (!this.role_has_invest) {
            return E_REWARD_STATUS.DISABLE;
        }
        var is_received = this.arrContains(this.role_invest_award, id);
        if (is_received) {
            return E_REWARD_STATUS.RECEIVED;
        }
        if (this.getInvestAvaliable(id)) {
            return E_REWARD_STATUS.AVAILABLE;
        }
        return E_REWARD_STATUS.DISABLE;
    };
    /**
     * 设定斗士投资计划奖励为已领取
     */
    PlayerActivityInfo.prototype.setRewardReceived_RoleInvest = function (id) {
        this.arrPushUnique(this.role_invest_award, id);
        this.onUpdate_RoleInvest();
    };
    /**
     * 设定已购买斗士投资计划
     */
    PlayerActivityInfo.prototype.setBuy_RoleInvest = function () {
        this.role_has_invest = true;
        this.onUpdate_RoleInvest();
    };
    /**
     * 斗士投资计划奖励是否领完
     */
    PlayerActivityInfo.prototype.isAllComp_RoleInvest = function () {
        var cfgs = this.getEntities_RoleInvest().keys;
        for (var i = 0; i < cfgs.length; i++) {
            if (this.getRewardStatus_RoleInvest(cfgs[i]) != E_REWARD_STATUS.RECEIVED) {
                return false;
            }
        }
        return true;
    };
    // endregion
    // region 投资计划-附魔
    /**
     * 获取附魔投资计划配置信息
     */
    PlayerActivityInfo.prototype.getEntities_EnchantInvest = function () {
        var range = Template.config.InvestEnchantID;
        return Template.investVip.subset(this.genSetFromRange(range[0], range[1]));
    };
    /**
     * 更新附魔投资计划信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_EnchantInvest = function (msg) {
        this.enchant_has_invest = msg.has_invest;
        this.enchant_invest_award = msg.invest_award;
        this.onUpdate_EnchantInvest();
    };
    /**
     * 响应附魔投资计划信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_EnchantInvest = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_EnchantInvest();
    };
    /**
     * 获取附魔投资计划奖励状态
     */
    PlayerActivityInfo.prototype.getRewardStatus_EnchantInvest = function (id) {
        // 判断玩家投资状态
        if (!this.enchant_has_invest) {
            return E_REWARD_STATUS.DISABLE;
        }
        var is_received = this.arrContains(this.enchant_invest_award, id);
        if (is_received) {
            return E_REWARD_STATUS.RECEIVED;
        }
        if (this.getInvestAvaliable(id)) {
            return E_REWARD_STATUS.AVAILABLE;
        }
        return E_REWARD_STATUS.DISABLE;
    };
    /**
     * 设定附魔投资计划奖励为已领取
     */
    PlayerActivityInfo.prototype.setRewardReceived_EnchantInvest = function (id) {
        this.arrPushUnique(this.enchant_invest_award, id);
        this.onUpdate_EnchantInvest();
    };
    /**
     * 设定已购买附魔投资计划
     */
    PlayerActivityInfo.prototype.setBuy_EnchantInvest = function () {
        this.enchant_has_invest = true;
        this.onUpdate_EnchantInvest();
    };
    /**
     * 附魔投资计划奖励是否领完
     */
    PlayerActivityInfo.prototype.isAllComp_EnchantInvest = function () {
        var cfgs = this.getEntities_EnchantInvest().keys;
        for (var i = 0; i < cfgs.length; i++) {
            if (this.getRewardStatus_EnchantInvest(cfgs[i]) != E_REWARD_STATUS.RECEIVED) {
                return false;
            }
        }
        return true;
    };
    // endregion
    // region 投资计划-饰品
    /**
     * 获取饰品投资计划配置信息
     */
    PlayerActivityInfo.prototype.getEntities_JewelryInvest = function () {
        var range = Template.config.InvestJewelryID;
        return Template.investVip.subset(this.genSetFromRange(range[0], range[1]));
    };
    /**
     * 更新饰品投资计划信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_JewelryInvest = function (msg) {
        this.jewelry_has_invest = msg.has_invest;
        this.jewelry_invest_award = msg.invest_award;
        this.onUpdate_JewelryInvest();
    };
    /**
     * 响应饰品投资计划信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_JewelryInvest = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_JewelryInvest();
    };
    /**
     * 获取饰品投资计划奖励状态
     */
    PlayerActivityInfo.prototype.getRewardStatus_JewelryInvest = function (id) {
        // 判断玩家投资状态
        if (!this.jewelry_has_invest) {
            return E_REWARD_STATUS.DISABLE;
        }
        var is_received = this.arrContains(this.jewelry_invest_award, id);
        if (is_received) {
            return E_REWARD_STATUS.RECEIVED;
        }
        if (this.getInvestAvaliable(id)) {
            return E_REWARD_STATUS.AVAILABLE;
        }
        return E_REWARD_STATUS.DISABLE;
    };
    /**
     * 设定饰品投资计划奖励为已领取
     */
    PlayerActivityInfo.prototype.setRewardReceived_JewelryInvest = function (id) {
        this.arrPushUnique(this.jewelry_invest_award, id);
        this.onUpdate_JewelryInvest();
    };
    /**
     * 设定已购买饰品投资计划
     */
    PlayerActivityInfo.prototype.setBuy_JewelryInvest = function () {
        this.jewelry_has_invest = true;
        this.onUpdate_JewelryInvest();
    };
    /**
     * 饰品投资计划奖励是否领完
     */
    PlayerActivityInfo.prototype.isAllComp_JewelryInvest = function () {
        var cfgs = this.getEntities_JewelryInvest().keys;
        for (var i = 0; i < cfgs.length; i++) {
            if (this.getRewardStatus_JewelryInvest(cfgs[i]) != E_REWARD_STATUS.RECEIVED) {
                return false;
            }
        }
        return true;
    };
    // endregion
    // region EX角色
    /**
     * 更新EX角色礼包信息状态
     * @param msg
     */
    PlayerActivityInfo.prototype.update_ExRole = function (msg) {
        this.ex_role_ids = msg.gift_ids;
        this.ex_role_cnts = msg.gift_cnts;
        this.onUpdate_ExRole();
    };
    /**
     * 响应EX角色礼包信息状态更新
     */
    PlayerActivityInfo.prototype.onUpdate_ExRole = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_ExRole();
    };
    /**
     * 获取EX角色礼包购买状态
     */
    PlayerActivityInfo.prototype.getItemStatus_ExRole = function (id) {
        var cfg_er = Template.exRole.get(id);
        var buy_count = this.getItemBuyCount_ExRole(id);
        if (buy_count < 0) {
            if (cfg_er.Times > 0) {
                return E_REWARD_STATUS.AVAILABLE;
            }
        }
        else {
            if (cfg_er.Times > buy_count) {
                return E_REWARD_STATUS.AVAILABLE;
            }
        }
        return E_REWARD_STATUS.RECEIVED;
    };
    /**
     * 获取EX角色礼包已购买次数
     */
    PlayerActivityInfo.prototype.getItemBuyCount_ExRole = function (id) {
        var arr_id = this.getArrId(this.ex_role_ids, id);
        if (arr_id < 0) {
            return 0;
        }
        else {
            return this.ex_role_cnts[arr_id];
        }
    };
    /**
     * 设定超值礼包已购买次数增加一次
     */
    PlayerActivityInfo.prototype.setItemBuy_ExRole = function (id) {
        var arr_id = this.getArrId(this.ex_role_ids, id);
        if (arr_id >= 0) {
            this.ex_role_cnts[arr_id]++;
        }
        else {
            this.ex_role_ids.push(id);
            this.ex_role_cnts.push(1);
        }
        this.onUpdate_ExRole();
    };
    // endregion
    // region 通用部分
    PlayerActivityInfo.prototype.arrPushUnique = function (arr, id) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == id) {
                return;
            }
        }
        arr.push(id);
        return arr;
    };
    PlayerActivityInfo.prototype.arrContains = function (arr, id) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == id) {
                return true;
            }
        }
        return false;
    };
    PlayerActivityInfo.prototype.getArrId = function (arr, id) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == id) {
                return i;
            }
        }
        return -1;
    };
    PlayerActivityInfo.prototype.genSetFromRange = function (min, max) {
        if (min > max) {
            return [];
        }
        var result = [];
        for (var i = min; i <= max; i++) {
            result.push(i);
        }
        return result;
    };
    PlayerActivityInfo.prototype.getInvestAvaliable = function (id) {
        var cfg_iv = Template.investVip.get(id);
        switch (cfg_iv.type) {
            case E_ACT_INVEST_TYPE.TEAM_LV:
                var inf_p = Singleton.Get(PlayerInfoManager);
                return inf_p.getTeamLv() >= cfg_iv.value;
            case E_ACT_INVEST_TYPE.LOGIN:
                var create_t = Singleton.Get(LoginManager).loginInfo.create_time;
                return UtilsGame.getPlayerLifetimeDays() >= (cfg_iv.value + 1);
        }
        return false;
    };
    return PlayerActivityInfo;
}());
__reflect(PlayerActivityInfo.prototype, "PlayerActivityInfo");
//# sourceMappingURL=PlayerActivityInfo.js.map