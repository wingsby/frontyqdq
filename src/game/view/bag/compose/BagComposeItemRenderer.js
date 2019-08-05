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
    var BagComposeItemRenderer = (function (_super) {
        __extends(BagComposeItemRenderer, _super);
        function BagComposeItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.BagComposeItemRenderer";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        BagComposeItemRenderer.prototype.onAddToStage = function () {
            this.btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        BagComposeItemRenderer.prototype.onRemoveFromStage = function () {
            this.btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        BagComposeItemRenderer.prototype.onClick_btnHandler = function () {
            DropUtil.openDrop(this.data.item_id);
        };
        BagComposeItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            var cfg_item = Template.item.get(this.data.item_id);
            if (!cfg_item) {
                console.error("no item: " + this.data.item_id);
                return;
            }
            this.imgTier.source = null;
            this.imgIcon.source = null;
            this.labName.text = Template.getGUIText(cfg_item.iName);
            this.labName.textColor = Common.getItemNameColor(cfg_item.iStar);
            ResManager.setTexture(this.imgTier, Common.getItemTierBgRes(cfg_item.iStar));
            ResManager.setTexture(this.imgIcon, cfg_item.iIcon);
            var my_count = Singleton.Get(BagManager).getItemCount(cfg_item.ID);
            this.labCost.text = UtilsGame.numberToString(my_count) + "/" + UtilsGame.numberToString(this.data.count);
            this.labCost.textColor = my_count >= this.data.count ? DEFINE_COLOR.OK_GREEN : DEFINE_COLOR.WARN_RED;
        };
        return BagComposeItemRenderer;
    }(eui.ItemRenderer));
    ui.BagComposeItemRenderer = BagComposeItemRenderer;
    __reflect(BagComposeItemRenderer.prototype, "ui.BagComposeItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=BagComposeItemRenderer.js.map