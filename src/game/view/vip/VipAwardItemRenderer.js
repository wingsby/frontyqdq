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
    var VipAwardItemRenderer = (function (_super) {
        __extends(VipAwardItemRenderer, _super);
        function VipAwardItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.VipAwardItemRendererSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        VipAwardItemRenderer.prototype.onAddToStage = function () {
            this.btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        VipAwardItemRenderer.prototype.onRemoveFromStage = function () {
            this.btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        VipAwardItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        VipAwardItemRenderer.prototype.dataChanged = function () {
            this.item = this.data;
            this.mcEff.clearMovieClip();
            if (this.item.id == 0) {
                this.imgFrag.visible = false;
                ResManager.AsyncSetTexture(this.img_icon, DEFINE.UI_ALERT_INFO.diamond.resPNG);
                this.lb_name.text = DEFINE.UI_ALERT_INFO.diamond.name;
                ResManager.AsyncSetTexture(this.img_quality, Common.getItemTierBgRes(5));
                this.lb_name.textColor = Common.getItemNameColor(5);
            }
            else if (this.item.id == 1) {
                this.imgFrag.visible = false;
                ResManager.AsyncSetTexture(this.img_icon, DEFINE.UI_ALERT_INFO.gold.resPNG);
                this.lb_name.text = DEFINE.UI_ALERT_INFO.gold.name;
                ResManager.AsyncSetTexture(this.img_quality, Common.getItemTierBgRes(5));
                this.lb_name.textColor = Common.getItemNameColor(5);
            }
            else {
                var t = Template.item.get(this.item.id);
                ResManager.AsyncSetTexture(this.img_icon, t.iIcon);
                ResManager.AsyncSetTexture(this.img_quality, Common.getItemTierBgRes(t.iStar));
                this.lb_name.text = Template.getGUIText(t.iName);
                this.lb_name.textColor = Common.getItemNameColor(t.iStar);
                this.imgFrag.visible = Common.isItemFrag(t.iType);
                // 设定图标特效
                var eff_name = Common.getItemEffName(t.iStar);
                if (eff_name.length > 0) {
                    this.mcEff.setMovieClip(eff_name);
                    this.mcEff.gotoAndPlay(eff_name, -1);
                }
            }
            this.labCount.text = "x" + UtilsGame.numberToString(this.item.num);
        };
        VipAwardItemRenderer.prototype.onClick = function () {
            DropUtil.openDrop(this.item.id);
        };
        return VipAwardItemRenderer;
    }(eui.ItemRenderer));
    ui.VipAwardItemRenderer = VipAwardItemRenderer;
    __reflect(VipAwardItemRenderer.prototype, "ui.VipAwardItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=VipAwardItemRenderer.js.map