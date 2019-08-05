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
    var ShopListInnerView = (function (_super) {
        __extends(ShopListInnerView, _super);
        function ShopListInnerView() {
            var _this = _super.call(this, "yw.ShopListInnerSkin") || this;
            _this.last_refresh_update_time = 0;
            _this.cur_item_id = 0;
            return _this;
        }
        /**创建界面时执行*/
        ShopListInnerView.prototype.componentCreated = function () {
            this.btn_reflush.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_refresh, this);
            this.arry = new eui.ArrayCollection();
            this.dg_data.dataProvider = this.arry;
            this.dg_data.itemRenderer = ui.ShopListItemRenderer;
            this.scroller.viewport = this.dg_data;
            this.scroller_default_h = this.scroller.height;
            this.btn_reflush.text = "刷  新";
        };
        /**销毁界面时执行*/
        ShopListInnerView.prototype.onDestroy = function () {
            this.btn_reflush.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_refresh, this);
        };
        /**更新UI */
        ShopListInnerView.prototype.onUpdate = function (time) {
        };
        ShopListInnerView.prototype.open = function (item) {
            Singleton.Get(LayerManager).addView(this);
            Singleton.Get(ui.ShopView).close();
            Singleton.Get(LayerManager).getView(ui.MainView).showSchoolSubPanel();
            this.cur_item_id = item;
            this.initViewData();
            this.scroller.viewport.scrollV = 0;
            Singleton.Get(RegisterUpdate).register(this);
        };
        ShopListInnerView.prototype.close = function () {
            Singleton.Get(RegisterUpdate).unRegister(this);
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        /**
         * 初始化按钮
         */
        ShopListInnerView.prototype.initViewData = function () {
            this.updateView();
            this.updateFlush();
        };
        // region 界面内容
        /**
         * 更新界面
         */
        ShopListInnerView.prototype.updateView = function () {
            var _this = this;
            this.rePaintView();
            var cfg_it = Template.itemshop.get(this.cur_item_id);
            if (!cfg_it) {
                return;
            }
            this.labDes.text = Template.getGUIText(cfg_it.BoothTxt);
            Singleton.Get(ShopManager).tryReqInfo(cfg_it.Booth, function () {
                _this.updateData();
            }, this);
        };
        /**
         * 重绘界面
         */
        ShopListInnerView.prototype.rePaintView = function () {
            var cfg_it = Template.itemshop.get(this.cur_item_id);
            if (!cfg_it) {
                return;
            }
            if (cfg_it.Time.length <= 1 && cfg_it.Time[0] == -1) {
                // 无刷新
                this.scroller.height = this.g_flush.y + this.g_flush.height - this.scroller.y;
                this.g_flush.visible = false;
            }
            else {
                this.scroller.height = this.scroller_default_h;
                this.g_flush.visible = true;
            }
        };
        /**
         * 刷新数据
         */
        ShopListInnerView.prototype.updateData = function () {
            this.scroller.stopAnimation();
            var itemshop_entity = Template.itemshop.get(this.cur_item_id);
            if (!itemshop_entity) {
                egret.error("no itemshopBtn: " + this.cur_item_id);
                return;
            }
            // 消耗物品
            ShopUtil.setCostIconByPayType(itemshop_entity, this.labCostPossession, this.imgCostIcon);
            // 道具列表
            var shop = Singleton.Get(ShopManager).getShops().getShopById(itemshop_entity.Booth);
            var goods = shop.goods;
            this.arry.removeAll();
            for (var i = 0; i < goods.length; i++) {
                var cur_good = goods[i];
                this.arry.source.push({
                    good: cur_good,
                    itemshop: itemshop_entity
                });
            }
        };
        /**
         * 刷新刷新信息
         */
        ShopListInnerView.prototype.updateFlush = function () {
            var my_diamond = Singleton.Get(PlayerInfoManager).getDiamond();
            var cost = Template.config.ShopRefresh;
            this.btn_reflush.cost = UtilsGame.numberToString(cost);
            this.btn_reflush.enough = my_diamond >= cost;
            this.btn_reflush.icon = DEFINE.UI_ALERT_INFO.diamond.resPNG;
            /*
             let itemshop_entity: Entity.Itemshop = this.curMenu.itemShop;
             if(itemshop_entity == null){
             egret.error("no itemshopBtn: " + this.curMenu);
             return;
             }

             let shop: ShopInfo = Singleton.Get(ShopManager).getShops().getShopById(itemshop_entity.Booth);
             if(shop == null){
             egret.error("no itemshopId: " + itemshop_entity.Booth);
             return;
             }

             this.lb_reflush.text = shop.refresh_cnt + "/" + shop.getMyMaxRefreshChance();
             this.lb_time.text = UtilsGame.timeToString(shop.getRefreshCountdown());
             */
        };
        /**
         * 帧刷新
         * @param time
         */
        ShopListInnerView.prototype.update = function (time) {
            // 刷新保护 半秒一次
            if (UtilsGame.Now() - this.last_refresh_update_time < 500) {
                return;
            }
            this.last_refresh_update_time = UtilsGame.Now();
            var cfg_it = Template.itemshop.get(this.cur_item_id);
            if (!cfg_it) {
                return;
            }
            var itemshop_entity = Template.itemshop.get(this.cur_item_id);
            if (!itemshop_entity) {
                return;
            }
            var shop = Singleton.Get(ShopManager).getShops().getShopById(itemshop_entity.Booth);
            if (!shop) {
                return;
            }
            this.lb_time.text = UtilsGame.timeToString(shop.getRefreshCountdown());
            this.lb_reflush.text = shop.refresh_cnt + "/" + shop.getMyMaxRefreshChance();
        };
        // endregion;
        // region 响应点击事件
        ShopListInnerView.prototype.onClick_refresh = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btn_reflush);
            var itemshop_entity = Template.itemshop.get(this.cur_item_id);
            if (!itemshop_entity) {
                return;
            }
            Singleton.Get(ShopManager).reqRefresh(itemshop_entity.Booth, function () {
                _this.updateView();
            }, this);
        };
        return ShopListInnerView;
    }(BaseUI));
    ui.ShopListInnerView = ShopListInnerView;
    __reflect(ShopListInnerView.prototype, "ui.ShopListInnerView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=ShopListInnerView.js.map