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
    var PrivMonthView = (function (_super) {
        __extends(PrivMonthView, _super);
        function PrivMonthView() {
            var _this = _super.call(this, "yw.PrivMonthSkin") || this;
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnClose, _this);
            _this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnBuy, _this);
            return _this;
        }
        PrivMonthView.prototype.componentCreated = function () {
            this.labBuy.text = Template.getGUIText("ui_ex_priv_7");
            this.labDes.text = Template.getGUIText("ui_ex_priv_5");
            this.labMailDes.text = Template.getGUIText("ui_ex_priv_4");
        };
        PrivMonthView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBuy, this);
        };
        PrivMonthView.prototype.onUpdate = function (time) {
        };
        PrivMonthView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            Singleton.Get(RegisterUpdate).register(this);
            this.setMc();
        };
        PrivMonthView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            Singleton.Get(RegisterUpdate).unRegister(this);
            this.mcBuy.clearMovieClip();
        };
        PrivMonthView.prototype.update = function (time) {
            var info = Singleton.Get(PrivManager).getInfo();
            if (info.has_month_card) {
                var time_offset = info.mc_end - UtilsGame.Now();
                if (time_offset >= 0) {
                    this.btnBuy.visible = false;
                    this.labTime.visible = true;
                    this.labTime.text = Template.getGUIText("ui_ex_priv_8") + UtilsGame.timeToStringFullDate_MS(time_offset);
                }
                else {
                    info.has_month_card = false;
                }
                return;
            }
            this.btnBuy.visible = true;
            this.labTime.visible = false;
        };
        PrivMonthView.prototype.setMc = function () {
            this.mcBuy.setMovieClip(DEFINE.EFF_PRIV_BTN);
            this.mcBuy.gotoAndPlay(DEFINE.EFF_PRIV_BTN, -1);
        };
        PrivMonthView.prototype.onClick_btnClose = function (e) {
            this.close();
        };
        PrivMonthView.prototype.onClick_btnBuy = function (e) {
            this.close();
            Singleton.Get(LayerManager).getView(ui.PayView).open();
        };
        return PrivMonthView;
    }(PopupUI));
    ui.PrivMonthView = PrivMonthView;
    __reflect(PrivMonthView.prototype, "ui.PrivMonthView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=PrivMonthView.js.map