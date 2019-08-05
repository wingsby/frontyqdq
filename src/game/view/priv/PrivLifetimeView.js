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
    var PrivLifetimeView = (function (_super) {
        __extends(PrivLifetimeView, _super);
        function PrivLifetimeView() {
            var _this = _super.call(this, "yw.PrivLifetimeSkin") || this;
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnClose, _this);
            _this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnBuy, _this);
            _this.labPrivSp.touchEnabled = true;
            _this.labPrivSp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_labPrivSp, _this);
            return _this;
        }
        PrivLifetimeView.prototype.componentCreated = function () {
            this.labBuy.text = Template.getGUIText("ui_ex_priv_7");
            this.labDes.text = Template.getGUIText("ui_ex_priv_6");
            this.labMailDes.text = Template.getGUIText("ui_ex_priv_4");
        };
        PrivLifetimeView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBuy, this);
            this.labPrivSp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_labPrivSp, this);
        };
        PrivLifetimeView.prototype.onUpdate = function (time) {
        };
        PrivLifetimeView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            Singleton.Get(LayerManager).getView(ui.GuideView).visible = false;
            if (Singleton.Get(PrivManager).getInfo().has_lifetime_card) {
                this.labTime.visible = true;
                this.btnBuy.visible = false;
            }
            else {
                this.labTime.visible = false;
                this.btnBuy.visible = true;
                this.setMc();
            }
            var entity = Template.monthcard.get(E_PayType.LIFETIME);
            var item = Template.item.get(entity.icon);
            this.labPrivSp.textFlow = new egret.HtmlTextParser().parser(UtilsGame.stringHander(Template.getGUIText(entity.des), '<font color="#' + Common.getItemNameColor(item.iStar).toString(16).toUpperCase() + '">' + Template.getGUIText(item.iName) + "</font>"));
        };
        PrivLifetimeView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            Singleton.Get(LayerManager).getView(ui.GuideView).visible = true;
            this.mcBuy.clearMovieClip();
        };
        PrivLifetimeView.prototype.setMc = function () {
            this.mcBuy.setMovieClip(DEFINE.EFF_PRIV_BTN);
            this.mcBuy.gotoAndPlay(DEFINE.EFF_PRIV_BTN, -1);
        };
        PrivLifetimeView.prototype.onClick_btnClose = function (e) {
            this.close();
        };
        PrivLifetimeView.prototype.onClick_btnBuy = function (e) {
            this.close();
            Singleton.Get(LayerManager).getView(ui.PayView).open();
        };
        PrivLifetimeView.prototype.onClick_labPrivSp = function () {
            var entity = Template.monthcard.get(E_PayType.LIFETIME);
            Singleton.Get(ui.BagEquipDetailPanelView).open(entity.icon);
        };
        return PrivLifetimeView;
    }(PopupUI));
    ui.PrivLifetimeView = PrivLifetimeView;
    __reflect(PrivLifetimeView.prototype, "ui.PrivLifetimeView");
})(ui || (ui = {}));
//# sourceMappingURL=PrivLifetimeView.js.map