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
    var ShopGoldBuyPanelView = (function (_super) {
        __extends(ShopGoldBuyPanelView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function ShopGoldBuyPanelView() {
            var _this = _super.call(this, "yw.ShopGoldBuyPanelSkin") || this;
            _this.touchEnabled = false;
            _this.init();
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        ShopGoldBuyPanelView.prototype.componentCreated = function () {
            this.labBuy.text = Template.getGUIText("ui_ex_shop_1");
            this.labTitle.text = Template.getGUIText("ui_ex_shop_2");
            this.labNoChance.text = Template.getGUIText("ui_ex_shop_4");
            this.labVipPriv.text = Template.getGUIText("ui_ex_shop_4");
        };
        /**
         * 帧更新
         * @param time
         */
        ShopGoldBuyPanelView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化
         */
        ShopGoldBuyPanelView.prototype.init = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBuy, this);
            this.btnVip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnVip, this);
        };
        /**
         * 响应销毁
         */
        ShopGoldBuyPanelView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBuy, this);
            this.btnVip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnVip, this);
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        ShopGoldBuyPanelView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.initView();
        };
        /**
         * 关闭本界面
         */
        ShopGoldBuyPanelView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
        };
        /**
         * 刷新界面
         */
        ShopGoldBuyPanelView.prototype.refresh = function () {
            this.initView();
        };
        // endregion
        // region 内容更新
        ShopGoldBuyPanelView.prototype.initView = function () {
            this.labDes.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText("ui_pve_47"));
            var cur_count = Singleton.Get(PlayerInfoManager).getGoldBuyCnt();
            var daily_count = Template.vip.get(Singleton.Get(PlayerInfoManager).getVipLevel()).GoldBuy;
            this.labCount.text = Template.getGUIText("ui_ex_shop_3") + (daily_count - cur_count) + "/" + daily_count;
            var team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
            this.labGet.text = UtilsGame.numberToString((team_lv * team_lv * Template.config.BuyGoldC));
            this.labCost.text = UtilsGame.numberToString(Template.config.GoldBuy);
            if ((daily_count - cur_count) <= 0) {
                this.btnBuy.visible = false;
                this.groupNoChance.visible = true;
                this.labNoChance.text = Template.getGUIText("ui_pve_50");
            }
            else {
                this.btnBuy.visible = true;
                this.groupNoChance.visible = false;
            }
        };
        // endregion
        // region 响应点击事件
        /**
         * 响应关闭按钮点击事件
         */
        ShopGoldBuyPanelView.prototype.onClick_btnClose = function () {
            this.close();
        };
        /**
         * 响应购买金币
         */
        ShopGoldBuyPanelView.prototype.onClick_btnBuy = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnBuy, function () {
                Singleton.Get(GoldBuyManager).reqBuyGold(function () {
                    _this.refresh();
                }, _this);
            }, this);
        };
        /**
         * 响应点击VIP按钮
         */
        ShopGoldBuyPanelView.prototype.onClick_btnVip = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnVip, function () {
                _this.close();
                Singleton.Get(LayerManager).getView(ui.VipView).open();
            }, this);
        };
        return ShopGoldBuyPanelView;
    }(PopupUI));
    ui.ShopGoldBuyPanelView = ShopGoldBuyPanelView;
    __reflect(ShopGoldBuyPanelView.prototype, "ui.ShopGoldBuyPanelView");
})(ui || (ui = {}));
//# sourceMappingURL=ShopGoldBuyPanelView.js.map