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
    var DrawBaseView = (function (_super) {
        __extends(DrawBaseView, _super);
        function DrawBaseView() {
            var _this = _super.call(this, "yw.RoleGetBaseSkin") || this;
            _this.return_to_daily = false;
            _this.initGuiText();
            _this.initEvent();
            return _this;
        }
        /**
         * 相应对象创建完成
         */
        DrawBaseView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        DrawBaseView.prototype.onDestroy = function () {
            this.releaseEvent();
        };
        /**
         * 帧更新
         * @param time
         */
        DrawBaseView.prototype.onUpdate = function (time) {
        };
        /**
         * 打开本界面
         */
        DrawBaseView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            Singleton.Get(LayerManager).getView(ui.RoleGetFaceView).open();
            Common.playStackAni(this.btnBack, [this.btn_tab_0, this.btn_tab_1]);
            this.btn_tab_0.active = true;
            this.btn_tab_1.active = false;
        };
        /**
         * 关闭本界面
         */
        DrawBaseView.prototype.close = function () {
            this.return_to_daily = false;
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
            Singleton.Get(LayerManager).getView(ui.RoleGetFaceView).close();
            Singleton.Get(LayerManager).getView(ui.ShopListInnerView).close();
        };
        DrawBaseView.prototype.initGuiText = function () {
            this.btn_tab_0.text = Template.getGUIText("ui_card1");
            this.btn_tab_1.text = Template.getGUIText("ui_card8");
        };
        DrawBaseView.prototype.initEvent = function () {
            this.btnBack.touchEnabled = true;
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtn, this);
            this.btn_tab_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabDraw, this);
            this.btn_tab_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabShop, this);
        };
        DrawBaseView.prototype.releaseEvent = function () {
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtn, this);
            this.btn_tab_0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabDraw, this);
            this.btn_tab_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabShop, this);
        };
        DrawBaseView.prototype.onBackBtn = function () {
            if (this.return_to_daily) {
                Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnBattle(undefined, false);
                Singleton.Get(LayerManager).getView(ui.DailyTaskView).open();
                this.close();
                return;
            }
            this.return_to_daily = false;
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
            Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnBattle(undefined, false);
        };
        DrawBaseView.prototype.onClick_btnTabDraw = function () {
            UtilsEffect.tabEffect(this.btn_tab_0);
            this.btn_tab_0.active = true;
            this.btn_tab_1.active = false;
            Singleton.Get(LayerManager).getView(ui.ShopListInnerView).close();
            Singleton.Get(LayerManager).getView(ui.RoleGetFaceView).open();
        };
        DrawBaseView.prototype.onClick_btnTabShop = function () {
            UtilsEffect.tabEffect(this.btn_tab_1);
            this.btn_tab_0.active = false;
            this.btn_tab_1.active = true;
            Singleton.Get(LayerManager).getView(ui.RoleGetFaceView).close();
            Singleton.Get(LayerManager).getView(ui.ShopListInnerView).open(5);
        };
        return DrawBaseView;
    }(BaseUI));
    ui.DrawBaseView = DrawBaseView;
    __reflect(DrawBaseView.prototype, "ui.DrawBaseView");
})(ui || (ui = {}));
//# sourceMappingURL=DrawBaseView.js.map