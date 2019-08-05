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
    var ActMenuItemRenderer = (function (_super) {
        __extends(ActMenuItemRenderer, _super);
        ////////////////////////////exml2class:结束替换声明区域///////////////////////////////
        function ActMenuItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ActMenuItemRenererSkin";
            return _this;
        }
        ActMenuItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ActMenuItemRenderer.prototype.dataChanged = function () {
            var cfg_act = Template.activity.get(this.data.act_id);
            ResManager.AsyncSetTexture(this.img_icon, cfg_act.Icon + "_png");
            this.lab_title.text = Template.getGUIText(cfg_act.Name);
            this.updateStatus();
            // this.playAni();
        };
        ActMenuItemRenderer.prototype.updateStatus = function () {
            // 选中状态
            this.img_select.visible = this.data.is_sel;
            // 红点状态
            this.img_new.visible = Singleton.Get(ActivityManager).getAlarm().isAlarm(this.data.act_id);
        };
        ActMenuItemRenderer.prototype.playAni = function () {
            if (this.img_select.visible) {
                UtilsEffect.buttonEffect(this.img_icon);
                this.img_select.alpha = 0;
                this.img_select.scaleX = 1.8;
                this.img_select.scaleY = 1.8;
                var tw = egret.Tween.get(this.img_select);
                tw.to({ alpha: 1, scaleX: 1, scaleY: 1 }, 80, egret.Ease.sineOut);
            }
        };
        ActMenuItemRenderer.prototype.onClick = function () {
            Singleton.Get(LayerManager).getView(ui.ActivityView).onClick_btnMenu(this.data.act_id);
        };
        return ActMenuItemRenderer;
    }(eui.ItemRenderer));
    ui.ActMenuItemRenderer = ActMenuItemRenderer;
    __reflect(ActMenuItemRenderer.prototype, "ui.ActMenuItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=ActMenuItemRenderer.js.map