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
    var ShopView = (function (_super) {
        __extends(ShopView, _super);
        function ShopView() {
            return _super.call(this, "yw.ShopSkin") || this;
        }
        /**创建界面时执行*/
        ShopView.prototype.componentCreated = function () {
            this.verticalCenter = 26;
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.imgChest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playWobbler, this);
            this.dg.addEventListener(ShopView.event_shopClick, this.clickHander, this);
        };
        ShopView.prototype.initView = function () {
            this.arry = new eui.ArrayCollection();
            this.dg.dataProvider = this.arry;
            this.dg.itemRenderer = ui.ShopItemRenderer;
            this.scroller.viewport = this.dg;
            this.arry.source = Template.shop.values;
        };
        ShopView.prototype.clickHander = function (e) {
            switch (e.data.Id) {
                case 3:
                    if (false == OpenManager.CheckOpenWithInfo(OpenType.Arena))
                        return;
                    break;
                case 5:
                    if (false == OpenManager.CheckOpenWithInfo(OpenType.Duel))
                        return;
                    break;
            }
            switch (e.data.TellType) {
                case 1:
                    var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
                    if (my_vip < e.data.TellPar) {
                        Singleton.Get(DialogControler).showString("VIP" + e.data.TellPar + "\u89E3\u9501\u8BE5\u5546\u5E97");
                        return;
                    }
                    break;
                case 2:
                    if (!ShopUtil.isShopUnlocked(e.data.Id)) {
                        return;
                    }
                    break;
            }
            Singleton.Get(ui.ShopListView).open(e.data, true);
        };
        ShopView.prototype.open = function (callback, thisObj) {
            var layerManager = Singleton.Get(LayerManager);
            layerManager.addView(this);
            layerManager.getView(ui.MainView).showSchoolPanel();
            layerManager.getView(ui.SchoolView).close();
            layerManager.getView(ui.SchoolSubView).open();
            this.playAni();
            this.playWobbler();
            this.initView();
            this.exit_cb = callback;
            this.exit_this = thisObj;
        };
        ShopView.prototype.onClose = function (type) {
            var _this = this;
            if (type === void 0) { type = 0; }
            this.playAniExit(function () {
                Singleton.Get(LayerManager).getView(ui.SchoolSubView).close();
                Singleton.Get(LayerManager).getView(ui.MainView).showSchoolPanel();
                _this.close();
            }, this);
        };
        ShopView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
            if (this.exit_cb) {
                this.exit_cb.call(this.exit_this);
                this.exit_cb = undefined;
                this.exit_this = undefined;
            }
        };
        ShopView.prototype.playWobbler = function (e) {
            var tw = egret.Tween.get(this.imgChest);
            tw.to({ scaleX: 1.1, scaleY: 1.1 }, 80);
            tw.to({ scaleX: 1, scaleY: 1 }, 80).call(function (obj) { if (obj)
                egret.Tween.removeTweens(obj), obj; });
        };
        ShopView.prototype.playAni = function () {
            this.imgStand.x = -442;
            var tw_stand = egret.Tween.get(this.imgStand);
            tw_stand.to({ x: -42 }, 220, egret.Ease.sineOut);
            this.imgChest.x = -212.5;
            var tw_chest = egret.Tween.get(this.imgChest);
            tw_chest.to({ x: -187.5 }, 220, egret.Ease.sineOut);
            this.groupMenu.x = 500;
            this.groupMenu.alpha = 0;
            var tw_menu = egret.Tween.get(this.groupMenu);
            tw_menu.to({ x: 214, alpha: 1 }, 220, egret.Ease.sineOut);
        };
        ShopView.prototype.playAniExit = function (callback, thisObj) {
            this.imgStand.x = -42;
            var tw_stand = egret.Tween.get(this.imgStand);
            tw_stand.to({ x: 480 }, 150, egret.Ease.sineOut);
            this.imgChest.x = -187.5;
            var tw_chest = egret.Tween.get(this.imgChest);
            tw_chest.to({ x: 625.5 }, 150, egret.Ease.sineOut);
            this.groupMenu.x = 214;
            this.groupMenu.alpha = 1;
            var tw_menu = egret.Tween.get(this.groupMenu);
            tw_menu.to({ x: -this.groupMenu.width, alpha: 0 }, 150, egret.Ease.sineOut).call(function () {
                if (callback) {
                    callback.call(thisObj);
                }
            }, this);
        };
        /**销毁界面时执行*/
        ShopView.prototype.onDestroy = function () {
            this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.dg.removeEventListener(ShopView.event_shopClick, this.clickHander, this);
            this.imgChest.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.playWobbler, this);
        };
        /**更新UI */
        ShopView.prototype.onUpdate = function (time) { };
        return ShopView;
    }(BaseUI));
    ////////////////////////////exml2class:结束替换声明区域///////////////////////////////
    ShopView.event_shopClick = "event_shopClick";
    ui.ShopView = ShopView;
    __reflect(ShopView.prototype, "ui.ShopView");
})(ui || (ui = {}));
//# sourceMappingURL=ShopView.js.map