var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 活动类型
var E_ACT_TYPE;
(function (E_ACT_TYPE) {
    E_ACT_TYPE[E_ACT_TYPE["BASIC"] = 1] = "BASIC";
    E_ACT_TYPE[E_ACT_TYPE["BEGIN"] = 2] = "BEGIN"; // 开服活动
})(E_ACT_TYPE || (E_ACT_TYPE = {}));
// 基本活动类型
var E_ACT_BASIC_TYPE;
(function (E_ACT_BASIC_TYPE) {
    E_ACT_BASIC_TYPE[E_ACT_BASIC_TYPE["TIME_LIMITED"] = 1] = "TIME_LIMITED";
    E_ACT_BASIC_TYPE[E_ACT_BASIC_TYPE["PERMANENT"] = 2] = "PERMANENT"; // 永久活动
})(E_ACT_BASIC_TYPE || (E_ACT_BASIC_TYPE = {}));
// 活动设计类型
var E_ACT_DESIGN_TYPE;
(function (E_ACT_DESIGN_TYPE) {
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["NULL"] = 0] = "NULL";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["Seven"] = 1] = "Seven";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["LvRank"] = 2] = "LvRank";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["PveRank"] = 3] = "PveRank";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["AccRmb"] = 4] = "AccRmb";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["LimitSeven"] = 5] = "LimitSeven";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["CheckIn"] = 6] = "CheckIn";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["LvGrow"] = 7] = "LvGrow";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["GkGrow"] = 8] = "GkGrow";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["Invest"] = 9] = "Invest";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["Turnplate"] = 10] = "Turnplate";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["Gift"] = 11] = "Gift";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["AccSpend"] = 12] = "AccSpend";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["DayPay"] = 13] = "DayPay";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["LimitGift"] = 14] = "LimitGift";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["CDkey"] = 15] = "CDkey";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["Duration"] = 16] = "Duration";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["DmdPlate"] = 17] = "DmdPlate";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["VipBenefit"] = 18] = "VipBenefit";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["VipWeekly"] = 19] = "VipWeekly";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["RoleInvest"] = 20] = "RoleInvest";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["EnchantInvest"] = 21] = "EnchantInvest";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["JewelryInvest"] = 22] = "JewelryInvest";
    E_ACT_DESIGN_TYPE[E_ACT_DESIGN_TYPE["ExRole"] = 23] = "ExRole"; // EX角色 ID 23
})(E_ACT_DESIGN_TYPE || (E_ACT_DESIGN_TYPE = {}));
// 奖励状态类型
var E_REWARD_STATUS;
(function (E_REWARD_STATUS) {
    E_REWARD_STATUS[E_REWARD_STATUS["DISABLE"] = 0] = "DISABLE";
    E_REWARD_STATUS[E_REWARD_STATUS["AVAILABLE"] = 1] = "AVAILABLE";
    E_REWARD_STATUS[E_REWARD_STATUS["RECEIVED"] = 2] = "RECEIVED"; // 已领取
})(E_REWARD_STATUS || (E_REWARD_STATUS = {}));
// 七日登入类型
var E_DRAWARD_TYPE;
(function (E_DRAWARD_TYPE) {
    E_DRAWARD_TYPE[E_DRAWARD_TYPE["NORMAL"] = 1] = "NORMAL";
    E_DRAWARD_TYPE[E_DRAWARD_TYPE["LIMIT"] = 2] = "LIMIT"; // 限时七日登入
})(E_DRAWARD_TYPE || (E_DRAWARD_TYPE = {}));
// 超值礼包类型
var E_GIFT_TYPE;
(function (E_GIFT_TYPE) {
    E_GIFT_TYPE[E_GIFT_TYPE["NORMAL"] = 1] = "NORMAL";
    E_GIFT_TYPE[E_GIFT_TYPE["LIMIT"] = 2] = "LIMIT"; // 限时超值礼包
})(E_GIFT_TYPE || (E_GIFT_TYPE = {}));
// 投资计划类型
var E_ACT_INVEST_TYPE;
(function (E_ACT_INVEST_TYPE) {
    E_ACT_INVEST_TYPE[E_ACT_INVEST_TYPE["TEAM_LV"] = 1] = "TEAM_LV";
    E_ACT_INVEST_TYPE[E_ACT_INVEST_TYPE["LOGIN"] = 2] = "LOGIN"; // 登入天数
})(E_ACT_INVEST_TYPE || (E_ACT_INVEST_TYPE = {}));
// 开服活动时间类型
var E_ACT_BEGIN_TIME;
(function (E_ACT_BEGIN_TIME) {
    E_ACT_BEGIN_TIME[E_ACT_BEGIN_TIME["SERVER"] = 0] = "SERVER";
    E_ACT_BEGIN_TIME[E_ACT_BEGIN_TIME["PLAYER"] = 1] = "PLAYER"; // 以玩家角色创建时间为准
})(E_ACT_BEGIN_TIME || (E_ACT_BEGIN_TIME = {}));
/**
 * 活动工具类
 */
var ActivityUtil = (function () {
    function ActivityUtil() {
    }
    /**
     * 检查活动是否开启
     * @param act_id
     */
    ActivityUtil.isActOpen = function (act_id) {
        var cfg_basic = Template.basicActivity.get(act_id);
        var cfg_begin = Template.beginActivity.get(act_id);
        // 活动不存在
        if (!(cfg_basic || cfg_begin)) {
            return { open: false, type: undefined };
        }
        // 永久活动必然开启
        if (cfg_basic) {
            if (cfg_basic.Type == E_ACT_BASIC_TYPE.PERMANENT && this.isActPlatformValid(cfg_basic.PlatformID)) {
                return { open: true, type: E_ACT_TYPE.BASIC };
            }
        }
        // 活动类型
        if (cfg_basic && !cfg_begin) {
            return { open: ActivityUtil.isActOpenNoMutex(act_id, E_ACT_TYPE.BASIC), type: E_ACT_TYPE.BASIC };
        }
        else if (!cfg_basic && cfg_begin) {
            return { open: ActivityUtil.isActOpenNoMutex(act_id, E_ACT_TYPE.BEGIN), type: E_ACT_TYPE.BEGIN };
        }
        else {
            var is_begin_open = ActivityUtil.isActOpenNoMutex(act_id, E_ACT_TYPE.BEGIN);
            if (is_begin_open) {
                return { open: true, type: E_ACT_TYPE.BEGIN };
            }
            else {
                return { open: ActivityUtil.isActOpenNoMutex(act_id, E_ACT_TYPE.BASIC), type: E_ACT_TYPE.BASIC };
            }
        }
    };
    /**
     * 检查活动是否满足平台需求
     * @param platforms
     * @returns {boolean}
     */
    ActivityUtil.isActPlatformValid = function (platforms) {
        var my_platform = Singleton.Get(login.LoginDataManager).loginData.pid;
        // 检查平台
        for (var i = 0; i < platforms.length; i++) {
            if (platforms[i] == my_platform) {
                return true;
            }
        }
        return false;
    };
    /**
     * 检查活动是否开启（不计算互斥）
     * @param act_id
     * @param type
     */
    ActivityUtil.isActOpenNoMutex = function (act_id, type) {
        if (ActivityUtil.isInvest(act_id) && ActivityUtil.isInvestPermanent(act_id)) {
            return !ActivityUtil.isInvestComplete(act_id);
        }
        var start_time = 0;
        var end_time = 0;
        var now_time = UtilsGame.Now();
        switch (type) {
            case E_ACT_TYPE.BASIC:
                var cfg_basic = Template.basicActivity.get(act_id);
                if (!cfg_basic) {
                    return false;
                }
                // 检查平台
                if (!this.isActPlatformValid(cfg_basic.PlatformID)) {
                    return false;
                }
                // 检查时间
                start_time = ActivityUtil.getActStartTime(act_id, E_ACT_TYPE.BASIC);
                end_time = ActivityUtil.getActEndTime(act_id, E_ACT_TYPE.BASIC);
                return (start_time <= now_time) && (end_time >= now_time);
            case E_ACT_TYPE.BEGIN:
                var cfg_begin = Template.beginActivity.get(act_id);
                if (!cfg_begin) {
                    return false;
                }
                // 检查平台
                if (!this.isActPlatformValid(cfg_begin.PlatformID)) {
                    return false;
                }
                // 检查时间
                start_time = ActivityUtil.getActStartTime(act_id, E_ACT_TYPE.BEGIN);
                end_time = ActivityUtil.getActEndTime(act_id, E_ACT_TYPE.BEGIN);
                return (start_time <= now_time) && (end_time >= now_time);
            default:
                break;
        }
        return false;
    };
    /**
     * 获取所有开放的活动
     */
    ActivityUtil.getAllOpenAct = function () {
        var basic_ids = Template.basicActivity.keys;
        var begin_ids = Template.beginActivity.keys;
        // 活动id去重
        var act_ids = [];
        for (var i = 0; i < basic_ids.length; i++) {
            if (!UtilsArray.contains(act_ids, basic_ids[i])) {
                act_ids.push(basic_ids[i]);
            }
        }
        for (var i = 0; i < begin_ids.length; i++) {
            if (!UtilsArray.contains(act_ids, begin_ids[i])) {
                act_ids.push(begin_ids[i]);
            }
        }
        // 生成结果
        var result = [];
        for (var i = 0; i < act_ids.length; i++) {
            var inf_act = ActivityUtil.isActOpen(act_ids[i]);
            if (inf_act.open) {
                result.push({
                    id: act_ids[i],
                    type: inf_act.type
                });
            }
        }
        return result;
    };
    /**
     * 检查某一类活动是否开启
     */
    ActivityUtil.isTypeOpen = function (type) {
        var all_open = ActivityUtil.getAllOpenAct();
        for (var i = 0; i < all_open.length; i++) {
            if (all_open[i].type == type) {
                return true;
            }
        }
        return false;
    };
    /**
     * 获取活动开启时间
     * @param act_id
     */
    ActivityUtil.getActStartTime = function (act_id, type) {
        switch (type) {
            case E_ACT_TYPE.BASIC:
                var cfg_basic = Template.basicActivity.get(act_id);
                if (!cfg_basic) {
                    return 0;
                }
                // 计算开启时间
                if (cfg_basic.Close > 0) {
                    var forbid_time = UtilsGame.SomeDayStart(UtilsGame.getServerStart()) + cfg_basic.Close * 24 * 60 * 60 * 1000;
                    if (UtilsGame.timeStrToStamp(cfg_basic.OpenT) < forbid_time) {
                        return forbid_time;
                    }
                    else {
                        return UtilsGame.timeStrToStamp(cfg_basic.OpenT);
                    }
                }
                else {
                    return UtilsGame.timeStrToStamp(cfg_basic.OpenT);
                }
            case E_ACT_TYPE.BEGIN:
                var cfg_begin = Template.beginActivity.get(act_id);
                if (!cfg_begin) {
                    return 0;
                }
                // 计算开启时间
                var start_base = cfg_begin.Type == E_ACT_BEGIN_TIME.PLAYER ? UtilsGame.getPlayerLifetimeStart() : UtilsGame.getServerStart();
                if (cfg_begin.DelayT <= 0) {
                    return UtilsGame.SomeDayStart(start_base);
                }
                else {
                    return UtilsGame.SomeDayStart(start_base) + cfg_begin.DelayT * 24 * 60 * 60 * 1000;
                }
            default:
                break;
        }
        return 0;
    };
    /**
     * 获取活动结束时间
     * @param act_id
     */
    ActivityUtil.getActEndTime = function (act_id, type) {
        if (ActivityUtil.isInvest(act_id) && ActivityUtil.isInvestPermanent(act_id)) {
            return 0;
        }
        switch (type) {
            case E_ACT_TYPE.BASIC:
                var cfg_basic = Template.basicActivity.get(act_id);
                if (!cfg_basic) {
                    return 0;
                }
                return UtilsGame.timeStrToStamp(cfg_basic.FinishT);
            case E_ACT_TYPE.BEGIN:
                var cfg_begin = Template.beginActivity.get(act_id);
                if (!cfg_begin) {
                    return 0;
                }
                return UtilsGame.SomeDayStart(ActivityUtil.getActStartTime(act_id, type) + cfg_begin.Time);
            default:
                break;
        }
        return 0;
    };
    /**
     * 获取成长基金所需的商品
     * @returns {any}
     */
    ActivityUtil.getInvestPayItem = function () {
        for (var i = 0; i < Template.payItem.length; i++) {
            if (Template.payItem[i].type == E_PayType.INVEST) {
                return Template.payItem[i];
            }
        }
        console.error("no invest pay item, type: " + E_PayType.INVEST);
        return undefined;
    };
    /**
     * 获取倒计时说明
     * @returns {string}
     */
    ActivityUtil.getCountdownStr = function (act_id, type) {
        if (ActivityUtil.isInvest(act_id) && ActivityUtil.isInvestPermanent(act_id)) {
            return Template.getGUIText("ui_activity19");
        }
        var cfg_basic = Template.basicActivity.get(act_id);
        if (cfg_basic && cfg_basic.Type == E_ACT_BASIC_TYPE.PERMANENT) {
            return Template.getGUIText("ui_activity19");
        }
        else {
            if (act_id == E_ACT_DESIGN_TYPE.PveRank || act_id == E_ACT_DESIGN_TYPE.LvRank) {
                var start = ActivityUtil.getActStartTime(act_id, type);
                var delta = UtilsGame.Now() - start;
                if (delta > 1000 * 60 * 60 * 24 * Template.config.ranktime[2]) {
                    return Template.getGUIText("append_154");
                }
                else if (delta > 1000 * 60 * 60 * 24 * Template.config.ranktime[1]) {
                    return UtilsGame.stringHander(Template.getGUIText("ui_activity20"), UtilsGame.timeToStringFullDate_MS((start + 1000 * 60 * 60 * 24 * Template.config.ranktime[2]) - UtilsGame.Now()));
                }
                else if (delta > 1000 * 60 * 60 * 24 * Template.config.ranktime[0]) {
                    return UtilsGame.stringHander(Template.getGUIText("ui_activity20"), UtilsGame.timeToStringFullDate_MS((start + 1000 * 60 * 60 * 24 * Template.config.ranktime[1]) - UtilsGame.Now()));
                }
                else {
                    return UtilsGame.stringHander(Template.getGUIText("ui_activity20"), UtilsGame.timeToStringFullDate_MS((start + 1000 * 60 * 60 * 24 * Template.config.ranktime[0]) - UtilsGame.Now()));
                }
            }
            else {
                var last_time = ActivityUtil.getActEndTime(act_id, type) - UtilsGame.Now();
                if (last_time >= 0) {
                    return UtilsGame.stringHander(Template.getGUIText("ui_activity20"), UtilsGame.timeToStringFullDate_MS(last_time));
                }
                else {
                    return Template.getGUIText("ui_activity21");
                }
            }
        }
    };
    /**
     * 检查是否是特殊投资活动
     */
    ActivityUtil.isInvest = function (act_id) {
        switch (act_id) {
            case E_ACT_DESIGN_TYPE.RoleInvest:
            case E_ACT_DESIGN_TYPE.EnchantInvest:
            case E_ACT_DESIGN_TYPE.JewelryInvest:
                return true;
        }
        return false;
    };
    /**
     * 检查是否是特殊开放时长的投资活动
     */
    ActivityUtil.isInvestPermanent = function (act_id) {
        var inf_act = Singleton.Get(ActivityManager).getInfo();
        switch (act_id) {
            case E_ACT_DESIGN_TYPE.RoleInvest:
                return inf_act.role_has_invest;
            case E_ACT_DESIGN_TYPE.EnchantInvest:
                return inf_act.enchant_has_invest;
            case E_ACT_DESIGN_TYPE.JewelryInvest:
                return inf_act.jewelry_has_invest;
            default:
                return false;
        }
    };
    /**
     * 检查投资活动奖励是否完全领取完毕
     */
    ActivityUtil.isInvestComplete = function (act_id) {
        var inf_act = Singleton.Get(ActivityManager).getInfo();
        switch (act_id) {
            case E_ACT_DESIGN_TYPE.RoleInvest:
                return inf_act.isAllComp_RoleInvest();
            case E_ACT_DESIGN_TYPE.EnchantInvest:
                return inf_act.isAllComp_EnchantInvest();
            case E_ACT_DESIGN_TYPE.JewelryInvest:
                return inf_act.isAllComp_JewelryInvest();
            default:
                return false;
        }
    };
    /**
     * 通用活动列表排序
     */
    ActivityUtil.sortList = function (a, b) {
        if (a.status != b.status) {
            if (a.status == E_REWARD_STATUS.RECEIVED) {
                return 1;
            }
            if (b.status == E_REWARD_STATUS.RECEIVED) {
                return -1;
            }
        }
        if (a.item_id > b.item_id) {
            return 1;
        }
        else if (a.item_id < b.item_id) {
            return -1;
        }
        return 0;
    };
    return ActivityUtil;
}());
__reflect(ActivityUtil.prototype, "ActivityUtil");
//# sourceMappingURL=ActivityUtil.js.map