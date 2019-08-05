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
    var ShopListView = (function (_super) {
        __extends(ShopListView, _super);
        function ShopListView() {
            var _this = _super.call(this, "yw.ShopListSkin") || this;
            _this.entrance_is_menu = false; // 是否由商店菜单入口进入
            return _this;
        }
        /**创建界面时执行*/
        ShopListView.prototype.componentCreated = function () {
            this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_close, this);
        };
        /**销毁界面时执行*/
        ShopListView.prototype.onDestroy = function () {
            this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_close, this);
        };
        /**更新UI */
        ShopListView.prototype.onUpdate = function (time) {
        };
        ShopListView.prototype.open = function (shop, entrance_is_menu, callback, thisObj) {
            if (entrance_is_menu === void 0) { entrance_is_menu = false; }
            Singleton.Get(LayerManager).addView(this);
            Singleton.Get(ui.ShopView).close();
            Singleton.Get(LayerManager).getView(ui.MainView).showSchoolSubPanel();
            this.entrance_is_menu = entrance_is_menu;
            this.shop = shop;
            this.initViewData();
            this.back_callback = callback;
            this.back_callback_thisobj = thisObj;
        };
        ShopListView.prototype.close = function () {
            this.clearMenus();
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.ShopListInnerView).close();
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        /**
         * 初始化按钮
         */
        ShopListView.prototype.initViewData = function () {
            this.clearMenus();
            // 初始化按钮
            this.shop.Booth.forEach(function (id) { this.createButton(id); }, this);
            this.g_menu.validateNow();
            this.updateView();
        };
        // region 菜单生成
        /**
         * 创建菜单
         */
        ShopListView.prototype.createButton = function (id) {
            var itemShop = Template.itemshop.get(id);
            var button = new ui.ShopMenuButton();
            button.itemShop = itemShop;
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuClickHander, this);
            this.g_menu.addChild(button);
            this.menus.push(button);
            if (!this.curMenu)
                this.curMenu = button;
        };
        /**
         * 清除菜单
         */
        ShopListView.prototype.clearMenus = function () {
            if (!this.g_menu) {
                return;
            }
            while (this.g_menu.numChildren) {
                var child = this.g_menu.removeChildAt(0);
                if (!child) {
                    var button = child;
                    button.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.menuClickHander, this);
                }
            }
            this.menus = [];
            this.curMenu = undefined;
        };
        /**
         * 菜单点击
         */
        ShopListView.prototype.menuClickHander = function (e) {
            this.curMenu = e.currentTarget;
            this.updateView();
        };
        // endregion
        // region 界面内容
        /**
         * 更新界面
         */
        ShopListView.prototype.updateView = function () {
            var _this = this;
            this.updateMenuStatus();
            Singleton.Get(ShopManager).tryReqInfo(this.curMenu.itemShop.Booth, function () {
                Singleton.Get(LayerManager).getView(ui.ShopListInnerView).open(_this.curMenu.itemShop.Booth);
                Singleton.Get(LayerManager).getView(ui.ShopListInnerView).updateData();
            }, this);
        };
        /**
        * 更新按钮状态
        */
        ShopListView.prototype.updateMenuStatus = function () {
            if (this.menus.length > 0) {
                this.menus.forEach(function (tempMenu) {
                    tempMenu.active = this.curMenu == tempMenu;
                }, this);
            }
        };
        // endregion;
        // region 响应点击事件
        ShopListView.prototype.onClick_close = function () {
            Singleton.Get(LayerManager).getView(ui.MainView).showSchoolPanel();
            if (this.entrance_is_menu) {
                Singleton.Get(ui.ShopView).open();
            }
            if (this.back_callback) {
                this.back_callback.call(this.back_callback_thisobj);
                this.back_callback = undefined;
                this.back_callback_thisobj = undefined;
            }
            this.close();
        };
        return ShopListView;
    }(BaseUI));
    ui.ShopListView = ShopListView;
    __reflect(ShopListView.prototype, "ui.ShopListView");
})(ui || (ui = {}));
//# sourceMappingURL=ShopListView.js.map