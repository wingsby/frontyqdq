var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ShopItemInfo = (function () {
    function ShopItemInfo(list_id, gd_id, price, is_sold) {
        this.list_id = 0; // 在列表中的顺序
        this.gd_id = 0; // 货品id
        this.is_sold = false; // 是否已售出
        this.price = 0; // 最终价格
        this.list_id = list_id;
        this.gd_id = gd_id;
        this.is_sold = is_sold;
        this.price = price;
        this.entity = Template.itemgood.get(gd_id);
    }
    Object.defineProperty(ShopItemInfo.prototype, "price_orig", {
        // 获取原价
        get: function () {
            return this.entity.Price;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShopItemInfo.prototype, "is_discount", {
        // 是否打折
        get: function () {
            if (this.price_orig != this.price) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShopItemInfo.prototype, "discount", {
        // 当前折扣 0代表无打折
        get: function () {
            if (this.is_discount) {
                return this.entity.Off;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    // 获取货品Entity
    ShopItemInfo.prototype.getEntity = function () {
        return this.entity;
    };
    // 获取道具信息
    ShopItemInfo.prototype.getItemEntity = function () {
        return Template.item.get(this.getEntity().Item);
    };
    return ShopItemInfo;
}());
__reflect(ShopItemInfo.prototype, "ShopItemInfo");
//# sourceMappingURL=ShopItemInfo.js.map