var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ShopInfo = (function () {
    function ShopInfo() {
        this.goods = null;
    }
    /**
     * 从ShopInfo克隆
     * @param orig
     * @returns {MailInfo}
     * @constructor
     */
    ShopInfo.Clone = function (orig) {
        var clone = new ShopInfo();
        clone.is_id = orig.is_id;
        clone.refresh_cnt = orig.refresh_cnt;
        clone.last_refresh = orig.last_refresh;
        clone.last_reset = orig.last_reset;
        clone.gd_list = orig.gd_list;
        clone.sold_out = orig.sold_out;
        clone.price_list = orig.price_list;
        clone.goods = [];
        for (var i = 0; i < orig.gd_list.length; i++) {
            var new_gd = new ShopItemInfo(i, orig.gd_list[i], orig.price_list[i], orig.sold_out[i]);
            clone.goods.push(new_gd);
        }
        return clone;
    };
    /**
     * 获取对应的Entity
     * @returns {Entity.Itemshop}
     */
    ShopInfo.prototype.getEntity = function () {
        var entity = Template.itemshop.get(this.is_id);
        return entity;
    };
    /**
     * 获取商品信息
     * @param list_id 商品在列表中的id
     * @returns {ShopItemInfo}
     */
    ShopInfo.prototype.getGood = function (list_id) {
        return this.goods[list_id];
    };
    /**
     * 设定货品状态为已出售
     * @param list_id
     */
    ShopInfo.prototype.setGoodSold = function (list_id) {
        var good = this.getGood(list_id);
        if (good == null) {
            egret.error("no itemShopId:" + this.is_id + ", listId: " + list_id);
            return;
        }
        good.is_sold = true;
    };
    /**
     * 获取玩家每日可刷新商店次数
     * @returns {number}
     */
    ShopInfo.prototype.getMyMaxRefreshChance = function () {
        var my_vip_lv = Singleton.Get(PlayerInfoManager).getVipLevel();
        var vip_info = Template.vip.get(my_vip_lv);
        if (vip_info == null) {
            console.error("no vipLv: " + my_vip_lv);
            return;
        }
        return vip_info.RefreshMax;
    };
    /**
     * 获取下次刷新时间倒计时
     * @returns {number}
     */
    ShopInfo.prototype.getRefreshCountdown = function () {
        // 计算当前小时数
        var cur_time = UtilsGame.Now();
        var d = new Date(cur_time);
        d.setHours(0, 0, 0, 0);
        var cur_hour = UtilsGame.timeToHourNumber(cur_time - d.getTime());
        var entity = this.getEntity();
        var target_time = 0;
        var next_hour = -1;
        for (var i = 0; i < entity.Time.length; i++) {
            if (next_hour < 0) {
                if (entity.Time[i] > cur_hour) {
                    next_hour = entity.Time[i];
                }
            }
            else {
                if (entity.Time[i] > cur_hour && entity.Time[i] < next_hour) {
                    next_hour = entity.Time[i];
                }
            }
        }
        if (next_hour <= 0) {
            var min = -1;
            for (var i = 0; i < entity.Time.length; i++) {
                if (min < 0) {
                    min = entity.Time[i];
                }
                else {
                    if (entity.Time[i] < min) {
                        min = entity.Time[i];
                    }
                }
            }
            next_hour = min;
            target_time = Common.getHourTimeNextDay(next_hour);
        }
        else {
            target_time = Common.getHourTimeToday(next_hour);
        }
        return target_time - cur_time;
    };
    return ShopInfo;
}());
__reflect(ShopInfo.prototype, "ShopInfo");
//# sourceMappingURL=ShopInfo.js.map