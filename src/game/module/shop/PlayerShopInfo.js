var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerShopInfo = (function () {
    function PlayerShopInfo() {
        this.m_shops = null;
        this.m_shops = [];
        this.genSolidShops();
        // console.log(this.m_shops);
    }
    PlayerShopInfo.prototype.genSolidShops = function () {
        var _this = this;
        Template.itemshop.foreachValue(function (entity) {
            if (entity.Counts >= 0) {
                return;
            }
            var new_shop = new ShopInfo();
            new_shop.is_id = entity.Booth;
            new_shop.refresh_cnt = -1;
            new_shop.last_refresh = -1;
            new_shop.last_reset = -1;
            new_shop.gd_list = [];
            new_shop.price_list = [];
            new_shop.sold_out = [];
            for (var i = entity.ItemGoodId[0]; i < entity.ItemGoodId[1] + 1; i++) {
                var good_info = Template.itemgood.get(i);
                if (good_info == null) {
                    egret.error("no itemGoodId: " + i);
                    continue;
                }
                new_shop.gd_list.push(good_info.Id);
                new_shop.price_list.push(good_info.Price);
                new_shop.sold_out.push(false);
            }
            _this.updateShop(new_shop);
        }, this);
    };
    /**
     * 根据ItemShopId获取Shop信息
     * @param itemshop_id
     * @returns {any}
     */
    PlayerShopInfo.prototype.getShopById = function (itemshop_id) {
        var shops = this.m_shops;
        if (shops == null) {
            return null;
        }
        for (var i = 0; i < shops.length; i++) {
            if (shops[i].is_id == itemshop_id) {
                return shops[i];
            }
        }
        return null;
    };
    /**
     * 更新商店信息
     * @param shop_info
     */
    PlayerShopInfo.prototype.updateShop = function (shop_info) {
        var new_shop = ShopInfo.Clone(shop_info);
        for (var i = 0; i < this.m_shops.length; i++) {
            if (this.m_shops[i].is_id == new_shop.is_id) {
                this.m_shops[i] = new_shop;
                return;
            }
        }
        this.m_shops.push(new_shop);
    };
    /**
     * 商店数据是否过期
     * @param itemshop_id
     */
    PlayerShopInfo.prototype.checkShopExpired = function (itemshop_id) {
        var shop_entity = Template.itemshop.get(itemshop_id);
        if (shop_entity == null) {
            egret.error("no itemshopId: " + itemshop_id);
            return true;
        }
        var shop = this.getShopById(itemshop_id);
        if (shop == null) {
            return true;
        }
        // 小于0为固定商店 永不过期
        if (shop_entity.Counts < 0) {
            return false;
        }
        // 上次刷新时间已经超过最后理论刷新时间 是最新的
        if (shop.last_refresh >= ShopUtil.clacLastRefresh(itemshop_id)) {
            return false;
        }
        // 默认已过期（上次刷新时间小于最后理论刷新时间）
        return true;
    };
    return PlayerShopInfo;
}());
__reflect(PlayerShopInfo.prototype, "PlayerShopInfo");
//# sourceMappingURL=PlayerShopInfo.js.map