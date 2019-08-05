var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ShopManager = (function () {
    function ShopManager() {
        this.m_player_shops = null;
        this.m_player_shops = new PlayerShopInfo();
    }
    // region 数据操作
    /**
     * 外部获取所有商店信息
     * @returns {PlayerShopInfo}
     */
    ShopManager.prototype.getShops = function () {
        return this.m_player_shops;
    };
    // endregion
    // region 请求收发
    /**
     * 请求商店信息（如果没有过期，不请求）
     * @param itemshop_id
     * @param callback
     * @param thisObj
     */
    ShopManager.prototype.tryReqInfo = function (itemshop_id, callback, thisObj) {
        var is_expired = this.m_player_shops.checkShopExpired(itemshop_id);
        if (is_expired) {
            this.reqInfo(itemshop_id, callback, thisObj);
        }
        else {
            if (callback != null) {
                callback.call(thisObj);
            }
        }
    };
    /**
     * 请求商店信息
     * @param itemshop_id
     * @param callback
     * @param thisObj
     */
    ShopManager.prototype.reqInfo = function (itemshop_id, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.shop = new msg.ShopMsg();
        send_msg.body.shop.is_id = itemshop_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.SHOP_INFO, send_msg, this, function (rec_msg) {
            if (rec_msg.body.shop == null)
                return;
            if (rec_msg.body.shop.success) {
                _this.m_player_shops.updateShop(rec_msg.body.shop.shop_info);
                if (callback != null) {
                    callback.call(thisObj);
                }
            }
        });
    };
    /**
     * 请求刷新商店物品
     * @param itemshop_id
     * @param callback
     * @param thisObj
     */
    ShopManager.prototype.reqRefresh = function (itemshop_id, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.shop = new msg.ShopMsg();
        send_msg.body.shop.is_id = itemshop_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.SHOP_REFRESH, send_msg, this, function (rec_msg) {
            if (rec_msg.body.shop == null)
                return;
            if (rec_msg.body.shop.success) {
                _this.m_player_shops.updateShop(rec_msg.body.shop.shop_info);
                if (callback != null) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求购买货品
     * @param itemshop_id
     * @param good
     * @param is_sold
     * @param callback
     * @param thisObj
     */
    ShopManager.prototype.reqBuy = function (itemshop_id, good, is_sold, callback, thisObj) {
        var _this = this;
        if (is_sold === void 0) { is_sold = true; }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.shop = new msg.ShopMsg();
        send_msg.body.shop.is_id = itemshop_id;
        send_msg.body.shop.good_list_id = good.list_id;
        send_msg.body.shop.good_id = good.gd_id;
        send_msg.body.shop.good_price = good.price;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.SHOP_BUY, send_msg, this, function (rec_msg) {
            if (rec_msg.body.shop == null)
                return;
            if (rec_msg.body.shop.success) {
                // 获取对应的店铺信息
                var shop = _this.m_player_shops.getShopById(itemshop_id);
                if (shop == null) {
                    _this.reqInfo(itemshop_id); // 如果购买物品时本地没有商店数据，则再请求一次
                    return;
                }
                // 设定当前物品状态为已购买
                if (is_sold) {
                    shop.setGoodSold(good.list_id);
                }
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("append_64"), 0, rec_msg.body.shop.r_gold, rec_msg.body.shop.r_diamond, rec_msg.body.shop.r_items);
                if (callback != null) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    return ShopManager;
}());
__reflect(ShopManager.prototype, "ShopManager");
//# sourceMappingURL=ShopManager.js.map