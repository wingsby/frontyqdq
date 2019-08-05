var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 商店购买方式
 */
var PayType;
(function (PayType) {
    PayType[PayType["Gold"] = 1] = "Gold";
    PayType[PayType["Diamond"] = 2] = "Diamond";
    PayType[PayType["Item"] = 3] = "Item";
})(PayType || (PayType = {}));
/**
 * 商店工具类
 */
var ShopUtil = (function () {
    function ShopUtil() {
    }
    ShopUtil.clacLastRefresh = function (itemshop_id) {
        var shop_entity = Template.itemshop.get(itemshop_id);
        if (shop_entity == null) {
            egret.error("no itemshopId: " + itemshop_id);
            return 0;
        }
        var shop_refresh_times = shop_entity.Time;
        if (shop_refresh_times[0] < 0) {
            return 0; // 固定商店
        }
        // 计算当前小时数
        var cur_time = UtilsGame.Now();
        var d = new Date(cur_time);
        d.setHours(0, 0, 0, 0);
        var today_zero = d.getTime();
        var cur_hour = UtilsGame.timeToHourNumber(cur_time - today_zero);
        // 获取比当前小时数小的shop_refresh_times最大值（刷新小时数）
        // 最终值为当天0点+1000*60*60*刷新小时数
        var max = -1;
        for (var i = 0; i < shop_refresh_times.length; i++) {
            if (max < shop_refresh_times[i]) {
                if (shop_refresh_times[i] <= cur_hour) {
                    max = shop_refresh_times[i];
                }
            }
        }
        // 上次刷新在当天
        if (max >= 0) {
            d.setHours(max, 0, 0, 0);
            return d.getTime();
        }
        // 上次刷新在昨天
        // 如果没有找到，直接找shop_refresh_times中的最大值（昨天刷新小时数）
        // 最终值为前一天0点+1000*60*60*昨天刷新小时数
        for (var i = 0; i < shop_refresh_times.length; i++) {
            if (max < shop_refresh_times[i]) {
                max = shop_refresh_times[i];
            }
        }
        return today_zero - 1000 * 60 * 60 * 24 + 1000 * 60 * 60 * max;
    };
    /**
     * 设定消耗
     * @param itemshop_entity
     * @param lab
     * @param icon
     * @param labCost
     * @param needCount
     * @returns {boolean} 是否满足购买条件
     */
    ShopUtil.setCostIconByPayType = function (itemshop_entity, lab, icon, labCost, needCount) {
        switch (itemshop_entity.Type[0]) {
            case PayType.Gold:
                var my_gold = Singleton.Get(PlayerInfoManager).getGold();
                if (lab != null)
                    lab.text = my_gold.toString();
                if (icon != null)
                    ResManager.AsyncSetTexture(icon, DEFINE.UI_ALERT_INFO.gold.resPNG);
                if (labCost != null && needCount) {
                    labCost.text = needCount.toString();
                    labCost.textColor = my_gold >= needCount ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED;
                }
                return my_gold >= needCount;
                break;
            case PayType.Diamond:
                var my_diamond = Singleton.Get(PlayerInfoManager).getDiamond();
                if (lab != null)
                    lab.text = my_diamond.toString();
                if (icon != null)
                    ResManager.AsyncSetTexture(icon, DEFINE.UI_ALERT_INFO.diamond.resPNG);
                if (labCost != null && needCount) {
                    labCost.text = needCount.toString();
                    labCost.textColor = my_diamond >= needCount ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED;
                }
                return my_diamond >= needCount;
                break;
            case PayType.Item:
                var item_info = Template.item.get(itemshop_entity.Type[1]);
                var item_count = Singleton.Get(BagManager).getItemCount(item_info.ID);
                if (lab != null)
                    lab.text = item_count.toString();
                if (icon != null)
                    ResManager.AsyncSetTexture(icon, item_info.iIcon);
                if (labCost != null && needCount) {
                    labCost.text = needCount.toString();
                    labCost.textColor = item_count >= needCount ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED;
                }
                return item_count >= needCount;
                break;
            default:
                egret.error("no itemshopId: " + itemshop_entity.Booth);
                break;
        }
    };
    /**
     * 商店是否解锁
     */
    ShopUtil.isShopUnlocked = function (shop_id) {
        var cfg_shop = Template.shop.get(shop_id);
        if (!cfg_shop) {
            return false;
        }
        if (cfg_shop.TellType != 2) {
            return true;
        }
        var my_team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
        if (my_team_lv < cfg_shop.TellPar) {
            Singleton.Get(DialogControler).showInfo(1167, this, undefined, undefined, cfg_shop.TellPar);
            return false;
        }
        else {
            return true;
        }
    };
    return ShopUtil;
}());
__reflect(ShopUtil.prototype, "ShopUtil");
//# sourceMappingURL=ShopUtil.js.map