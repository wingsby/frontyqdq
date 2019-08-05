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
    var RoleGetFaceView = (function (_super) {
        __extends(RoleGetFaceView, _super);
        /**
         * 构造函数
         */
        function RoleGetFaceView() {
            var _this = _super.call(this, "yw.RoleGetFaceSkin") || this;
            _this.m_item_bg_ready = false;
            _this.m_dmd_bg_ready = false;
            _this.m_lmt_bg_ready = false;
            _this.initGuiText();
            _this.initEvent();
            return _this;
        }
        /**
         * 相应对象创建完成
         */
        RoleGetFaceView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        RoleGetFaceView.prototype.onDestroy = function () {
            this.releaseEvent();
        };
        /**
         * 帧更新
         * @param time
         */
        RoleGetFaceView.prototype.onUpdate = function (time) {
        };
        /**
         * 打开本界面
         */
        RoleGetFaceView.prototype.open = function () {
            var _this = this;
            Singleton.Get(LayerManager).addView(this);
            this.refreshAll();
            this.groupMain.visible = false;
            this.initBgTexture(function () {
                _this.groupMain.visible = true;
            });
        };
        /**
         * 关闭本界面
         */
        RoleGetFaceView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        RoleGetFaceView.prototype.refreshAll = function () {
            this.refreshItemPrice();
            this.refreshDiamondPrice();
            this.refreshLimitPrice();
        };
        RoleGetFaceView.prototype.initGuiText = function () {
            this.btn_item_one.text = Template.getGUIText("ui_card1");
            this.btn_item_ten.text = Template.getGUIText("ui_card2");
            this.btn_dmd_one.text = Template.getGUIText("ui_card1");
            this.btn_dmd_ten.text = Template.getGUIText("ui_card2");
            this.btn_lmt_one.text = Template.getGUIText("ui_card1");
            this.btn_lmt_ten.text = Template.getGUIText("ui_card2");
            this.limit_not_open.text = Template.getGUIText("ui_card13");
            this.diamond_des.text = Template.getGUIText("ui_card6");
        };
        RoleGetFaceView.prototype.initBgTexture = function (callback, thisObj) {
            var _this = this;
            Singleton.Get(LayerManager).getView(ui.SyncLoadingView).open();
            ResManager.AsyncSetTexture(this.img_item_bg, "BG_djzhaomu_png", function () {
                _this.m_item_bg_ready = true;
                _this.onBgTextureFinished(callback, thisObj);
            }, this);
            ResManager.AsyncSetTexture(this.img_dmd_bg, "BG_zszhaomu_png", function () {
                _this.m_dmd_bg_ready = true;
                _this.onBgTextureFinished(callback, thisObj);
            }, this);
            ResManager.AsyncSetTexture(this.img_lmt_bg, "BG_xlzhaomu_png", function () {
                _this.m_lmt_bg_ready = true;
                _this.onBgTextureFinished(callback, thisObj);
            }, this);
        };
        RoleGetFaceView.prototype.onBgTextureFinished = function (callback, thisObj) {
            if (this.m_item_bg_ready && this.m_dmd_bg_ready && this.m_lmt_bg_ready) {
                Singleton.Get(LayerManager).getView(ui.SyncLoadingView).cancleOpen();
                if (callback) {
                    callback.call(thisObj);
                }
            }
        };
        RoleGetFaceView.prototype.initEvent = function () {
            this.btn_item_pre.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_item_pre, this);
            this.btn_dmd_pre.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_dmd_pre, this);
            this.btn_lmt_pre.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_lmt_pre, this);
            this.btn_dmd_one.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_dmd_one, this);
            this.btn_dmd_ten.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_dmd_ten, this);
            this.btn_item_one.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_item_one, this);
            this.btn_item_ten.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_item_ten, this);
            this.btn_lmt_one.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_lmt_one, this);
            this.btn_lmt_ten.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_lmt_ten, this);
        };
        RoleGetFaceView.prototype.releaseEvent = function () {
            this.btn_item_pre.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_item_pre, this);
            this.btn_dmd_pre.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_dmd_pre, this);
            this.btn_lmt_pre.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_lmt_pre, this);
            this.btn_dmd_one.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_dmd_one, this);
            this.btn_dmd_ten.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_dmd_ten, this);
            this.btn_item_one.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_item_one, this);
            this.btn_item_ten.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_item_ten, this);
            this.btn_lmt_one.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_lmt_one, this);
            this.btn_lmt_ten.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btn_lmt_ten, this);
        };
        RoleGetFaceView.prototype.refreshItemPrice = function () {
            var current_has = Singleton.Get(BagManager).getItemCount(Template.config.CardItem[0]);
            var one_cost = Template.config.CardItem[1];
            var ten_cost = one_cost * 10;
            var item = Template.item.get(Template.config.CardItem[0]);
            var scroll_info = Singleton.Get(ScrollManager).getScroll(DrawCardManager.FREE_ITEM_SCROLL_ID);
            if (scroll_info && scroll_info.count > 0) {
                var s_cfg = Template.scroll.get(scroll_info.id);
                this.btn_item_one.cost = UtilsGame.stringHander(Template.getGUIText("append_343"), UtilsGame.numberToString(scroll_info.count), UtilsGame.numberToString(s_cfg.UpperL));
                this.btn_item_one.enough = true;
                Singleton.Get(ui.MainView).showBtnShopNew(true);
                this.img_item_free.visible = true;
            }
            else {
                this.btn_item_one.cost = UtilsGame.numberToString(current_has) + "/" + UtilsGame.numberToString(one_cost);
                this.btn_item_one.enough = current_has >= one_cost;
                this.img_item_free.visible = false;
            }
            this.btn_item_one.icon = item.iIcon;
            this.btn_item_ten.cost = UtilsGame.numberToString(current_has) + "/" + UtilsGame.numberToString(ten_cost);
            this.btn_item_ten.enough = current_has >= ten_cost;
            this.btn_item_ten.icon = item.iIcon;
        };
        RoleGetFaceView.prototype.refreshDiamondPrice = function () {
            var current_has = Singleton.Get(PlayerInfoManager).getDiamond();
            var one_cost = Template.config.CardDiamonds;
            var ten_cost = Template.config.CardDiamondsTen;
            var info = Singleton.Get(DrawCardManager).getInfo();
            var free = true;
            var ten_count = 10;
            if (info) {
                ten_count = 10 - info.dmd_draw_cnt;
                free = PlayerDrawCardInfo.GetCurrentFreeDmd(info);
            }
            var format = Template.getGUIText("ui_card7");
            this.diamond_ten_count.text = UtilsGame.stringHander(format, ten_count);
            if (free) {
                this.btn_dmd_one.enough = true;
                this.btn_dmd_one.cost = Template.getGUIText("append_342");
                this.img_dmd_free.visible = true;
            }
            else {
                this.btn_dmd_one.cost = UtilsGame.numberToString(one_cost); // current_has + "/" + one_cost;
                this.btn_dmd_one.enough = current_has >= one_cost;
                this.img_dmd_free.visible = false;
            }
            Singleton.Get(ui.MainView).showBtnShopNew(free);
            this.btn_dmd_one.icon = DEFINE.UI_ALERT_INFO.diamond.res;
            var ten_item = Template.config.CardTenItem;
            var cfg_ten_item = Template.item.get(ten_item);
            if (!cfg_ten_item) {
                console.error("no ten item: " + ten_item);
            }
            var cnt_ten_item = Singleton.Get(BagManager).getItemCount(ten_item);
            if (cnt_ten_item > 0) {
                this.btn_dmd_ten.cost = UtilsGame.numberToString(cnt_ten_item) + "/1";
                this.btn_dmd_ten.enough = true;
                this.btn_dmd_ten.icon = cfg_ten_item.iIcon;
            }
            else {
                this.btn_dmd_ten.cost = UtilsGame.numberToString(ten_cost);
                this.btn_dmd_ten.enough = current_has >= ten_cost;
                this.btn_dmd_ten.icon = DEFINE.UI_ALERT_INFO.diamond.res;
            }
        };
        RoleGetFaceView.prototype.refreshLimitPrice = function () {
            var current_has = Singleton.Get(PlayerInfoManager).getDiamond();
            var one_cost = Template.config.CardLimited;
            var ten_cost = Template.config.CardLimitedTen;
            var info = Singleton.Get(DrawCardManager).getInfo();
            var vip = Singleton.Get(PlayerInfoManager).getVipLevel();
            var vip_cfg = Template.vip.get(vip);
            var max = vip_cfg.Limited;
            var ten_count = 10;
            if (info) {
                ten_count = 10 - info.lmt_for_10_cnt;
            }
            if (max <= 0) {
                this.limit_not_open.visible = true;
                this.limit_discount_img.visible = false;
                this.limit_discount_lb.visible = false;
                this.limit_des.visible = false;
                this.btn_lmt_one.visible = false;
                this.btn_lmt_ten.visible = false;
            }
            else {
                this.limit_not_open.visible = false;
                this.limit_discount_img.visible = true;
                this.limit_discount_lb.visible = true;
                this.limit_des.visible = false;
                this.btn_lmt_one.visible = true;
                this.btn_lmt_ten.visible = true;
            }
            var format = Template.getGUIText("ui_card14");
            this.limit_ten_count.text = UtilsGame.stringHander(format, ten_count);
            if (info) {
                this.limit_des.text = UtilsGame.stringHander(Template.getGUIText("append_344"), (max - PlayerDrawCardInfo.GetTodayAlreadyLmtDrawCount(info)));
            }
            else {
                this.limit_des.text = UtilsGame.stringHander(Template.getGUIText("append_344"), max);
            }
            this.btn_lmt_one.cost = UtilsGame.numberToString(one_cost);
            this.btn_lmt_one.enough = current_has >= one_cost;
            this.btn_lmt_one.icon = DEFINE.UI_ALERT_INFO.diamond.res;
            this.btn_lmt_ten.cost = UtilsGame.numberToString(ten_cost);
            this.btn_lmt_ten.enough = current_has >= ten_cost;
            this.btn_lmt_ten.icon = DEFINE.UI_ALERT_INFO.diamond.res;
        };
        RoleGetFaceView.prototype.onClick_btn_item_pre = function () {
            ui.RoleGetPreviewAlertView.PREVIEW_TYPE = DrawCardType.Item;
            Singleton.Get(ui.RoleGetPreviewAlertView).open();
        };
        RoleGetFaceView.prototype.onClick_btn_dmd_pre = function () {
            ui.RoleGetPreviewAlertView.PREVIEW_TYPE = DrawCardType.Dmd;
            Singleton.Get(ui.RoleGetPreviewAlertView).open();
        };
        RoleGetFaceView.prototype.onClick_btn_lmt_pre = function () {
            ui.RoleGetPreviewAlertView.PREVIEW_TYPE = DrawCardType.Lmt;
            Singleton.Get(ui.RoleGetPreviewAlertView).open();
        };
        RoleGetFaceView.prototype.onClick_btn_item_one = function () {
            Singleton.Get(DrawCardManager).onReqItemOne();
        };
        RoleGetFaceView.prototype.onClick_btn_item_ten = function () {
            Singleton.Get(DrawCardManager).onReqItemTen();
        };
        RoleGetFaceView.prototype.onClick_btn_dmd_one = function () {
            Singleton.Get(DrawCardManager).onReqDmdOne();
        };
        RoleGetFaceView.prototype.onClick_btn_dmd_ten = function () {
            Singleton.Get(DrawCardManager).onReqDmdTen();
        };
        RoleGetFaceView.prototype.onClick_btn_lmt_one = function () {
            Singleton.Get(DrawCardManager).onReqLmtOne();
        };
        RoleGetFaceView.prototype.onClick_btn_lmt_ten = function () {
            Singleton.Get(DrawCardManager).onReqLmtTen();
        };
        return RoleGetFaceView;
    }(BaseUI));
    ui.RoleGetFaceView = RoleGetFaceView;
    __reflect(RoleGetFaceView.prototype, "ui.RoleGetFaceView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleGetFaceView.js.map