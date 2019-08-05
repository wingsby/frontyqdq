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
    var BagComposeListItemRenderer = (function (_super) {
        __extends(BagComposeListItemRenderer, _super);
        function BagComposeListItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.BagComposeListItemRenderer";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        BagComposeListItemRenderer.prototype.onAddToStage = function () {
            this.labTxtCompose.text = "合成";
            this.btnCompose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCompose, this);
        };
        BagComposeListItemRenderer.prototype.onRemoveFromStage = function () {
            this.btnCompose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCompose, this);
        };
        BagComposeListItemRenderer.prototype.onClick_btnCompose = function () {
            Singleton.Get(LayerManager).getView(ui.BagComposeView).open(this.data.comp_id);
        };
        BagComposeListItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            var cfg_craft = Template.craft.get(this.data.comp_id);
            if (!cfg_craft) {
                console.error("no craft: " + this.data.comp_id);
                return;
            }
            var cfg_item = Template.item.get(cfg_craft.Icon);
            if (!cfg_item) {
                console.error("no item: " + cfg_craft.Icon);
                return;
            }
            this.imgTier.source = null;
            this.imgIcon.source = null;
            this.labName.text = Template.getGUIText(cfg_item.iName);
            this.labName.textColor = Common.getItemNameColor(cfg_item.iStar);
            this.labDes.text = Template.getGUIText(cfg_item.itemTxt);
            ResManager.setTexture(this.imgTier, Common.getItemTierBgRes(cfg_item.iStar));
            ResManager.setTexture(this.imgIcon, cfg_item.iIcon);
        };
        return BagComposeListItemRenderer;
    }(eui.ItemRenderer));
    ui.BagComposeListItemRenderer = BagComposeListItemRenderer;
    __reflect(BagComposeListItemRenderer.prototype, "ui.BagComposeListItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=BagComposeListItemRenderer.js.map