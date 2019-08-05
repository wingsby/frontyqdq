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
    var BagGiftUseSwitchItemRenderer = (function (_super) {
        __extends(BagGiftUseSwitchItemRenderer, _super);
        function BagGiftUseSwitchItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.BagGiftUseSwitchItemRendererSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        BagGiftUseSwitchItemRenderer.prototype.onAddToStage = function () {
            this.groupRoot.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        BagGiftUseSwitchItemRenderer.prototype.onRemoveFromStage = function () {
            this.groupRoot.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        BagGiftUseSwitchItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.setItem(this.data.item_id, this.data.count);
            this.setSel(this.data.sel);
        };
        BagGiftUseSwitchItemRenderer.prototype.setItem = function (item_id, count) {
            var cfg_item = Template.item.get(item_id);
            if (!cfg_item) {
                this.groupRoot.visible = false;
                console.error("no item: " + item_id);
                return;
            }
            else {
                this.groupRoot.visible = true;
            }
            ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(cfg_item.iStar));
            ResManager.AsyncSetTexture(this.imgIcon, cfg_item.iIcon);
            this.imgFrag.visible = cfg_item.Synthesis > 0;
            this.labCount.text = "x" + UtilsGame.numberToString(count);
            this.labName.text = Template.getGUIText(cfg_item.iName);
            this.labName.textColor = Common.getItemNameColor(cfg_item.iStar);
        };
        BagGiftUseSwitchItemRenderer.prototype.setSel = function (is_sel) {
            if (is_sel) {
                this.imgSel.visible = true;
                this.recMask.visible = false;
            }
            else {
                this.imgSel.visible = false;
                this.recMask.visible = true;
            }
        };
        BagGiftUseSwitchItemRenderer.prototype.onClick = function () {
            Singleton.Get(ui.BagGiftUseSwitchView).setSel(this.data.idx);
        };
        return BagGiftUseSwitchItemRenderer;
    }(eui.ItemRenderer));
    ui.BagGiftUseSwitchItemRenderer = BagGiftUseSwitchItemRenderer;
    __reflect(BagGiftUseSwitchItemRenderer.prototype, "ui.BagGiftUseSwitchItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=BagGiftUseSwitchItemRenderer.js.map