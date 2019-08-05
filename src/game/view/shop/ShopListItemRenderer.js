var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    var ShopListItemRenderer = (function (_super) {
        __extends(ShopListItemRenderer, _super);
        function ShopListItemRenderer() {
            var _this = _super.call(this) || this;
            ////////////////////////////exml2class:结束替换声明区域///////////////////////////////
            _this.is_cost_enough = false;
            _this.skinName = "yw.ShopListItemRendererSkin";
            return _this;
        }
        ShopListItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.g_lock.touchEnabled = false;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        ShopListItemRenderer.prototype.onAddToStage = function () {
            this.labBuy.text = Template.getGUIText("ui_ex_shop_1");
            this.groupHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_handler, this);
            this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBuy, this);
        };
        ShopListItemRenderer.prototype.onRemoveFromStage = function () {
            this.groupHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_handler, this);
            this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBuy, this);
        };
        ShopListItemRenderer.prototype.dataChanged = function () {
            if (this.data == null) {
                return;
            }
            var good = this.data.good;
            if (good == null) {
                egret.error("can't init shop, no good, goodId: " + good);
                return;
            }
            var entity = good.getEntity();
            if (entity == null) {
                egret.error("can't init shop, no itemgood, goodId: " + good);
                return;
            }
            var item_info = good.getItemEntity();
            if (item_info == null) {
                egret.error("can't init shop, no good item, goodId: " + good.getEntity().Id + ", itemId: " + good.getEntity().Item);
                return;
            }
            // 基本信息
            this.lb_name.text = Template.getGUIText(item_info.iName);
            ResManager.AsyncSetTexture(this.imgInfoTier, Common.getItemTierBgRes(item_info.iStar));
            ResManager.AsyncSetTexture(this.imgInfoIcon, item_info.iIcon);
            this.imgInfoFrag.visible = (item_info.iType == ItemType.RoleFragment || item_info.iType == ItemType.EquipFragment);
            // 数量
            this.lb_count.text = "x" + entity.Counts;
            // 打折
            this.g_discount.visible = good.is_discount;
            this.lb_discount.text = good.is_discount ? Template.getGUIText("ui_shop" + good.discount) : "";
            // 已购买
            this.g_lock.visible = good.is_sold;
            // TODO 找到具体的消耗道具或金币钻石
            // 消耗物品
            this.is_cost_enough = ShopUtil.setCostIconByPayType(this.data.itemshop, null, this.imgCostIcon, this.lb_price, good.price);
            // VIP等级
            var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
            this.lb_vip.text = UtilsGame.stringHander(Template.getGUIText("ui_shop33"), entity.Vip);
            if (my_vip >= entity.Vip) {
                this.groupVipBuy.visible = false;
                this.btnBuy.visible = true;
            }
            else {
                this.groupVipBuy.visible = true;
                this.btnBuy.visible = false;
            }
        };
        ShopListItemRenderer.prototype.onClick_handler = function () {
            DropUtil.openDrop(this.data.good.getItemEntity().ID);
        };
        ShopListItemRenderer.prototype.onClick_btnBuy = function (e) {
            UtilsEffect.buttonEffect(this.btnBuy);
            if (this.data.good.is_sold) {
                Singleton.Get(DialogControler).showInfo(1132);
            }
            var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
            if (my_vip < this.data.good.getEntity().Vip) {
                return;
            }
            var itemshop = this.data.itemshop;
            if (!itemshop) {
                console.error("can't fetch itemshop, itemData: " + this.data);
                return;
            }
            if (!this.is_cost_enough) {
                var cost_name = "";
                switch (itemshop.Type[0]) {
                    case PayType.Gold:
                        cost_name = DEFINE.UI_ALERT_INFO.gold.name;
                        Singleton.Get(DialogControler).showInfo(1004);
                        break;
                    case PayType.Diamond:
                        Singleton.Get(DialogControler).showInfo(1005, this, function () {
                            Singleton.Get(LayerManager).getView(ui.PayView).open();
                        });
                        break;
                    case PayType.Item:
                        Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openMaterial(itemshop.Type[1]);
                        break;
                }
                // Singleton.Get(DialogControler).showString(cost_name + "not enough");
                return;
            }
            var set_sold = itemshop.Counts >= 0;
            Singleton.Get(ShopManager).reqBuy(this.data.itemshop.Booth, this.data.good, set_sold, function () {
                Singleton.Get(LayerManager).getView(ui.ShopListInnerView).updateView();
            }, this);
        };
        return ShopListItemRenderer;
    }(eui.ItemRenderer));
    ui.ShopListItemRenderer = ShopListItemRenderer;
    __reflect(ShopListItemRenderer.prototype, "ui.ShopListItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=ShopListItemRenderer.js.map