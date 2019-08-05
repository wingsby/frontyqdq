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
    var SendRewardItemRenderer = (function (_super) {
        __extends(SendRewardItemRenderer, _super);
        function SendRewardItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.SendRewardItemRenderer";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        SendRewardItemRenderer.prototype.onAddToStage = function () {
            this.btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        SendRewardItemRenderer.prototype.onRemoveFromStage = function () {
            this.btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        SendRewardItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.compItem.data = {
                item_id: this.data.item_id,
                count: this.data.count,
                size: ui.E_COMMON_ITEM_RENDERER_SIZE.M
            };
            this.currentState = this.data.double ? SendRewardItemRenderer.STATUS_DOUBLE : SendRewardItemRenderer.STATUS_NORMAL;
        };
        SendRewardItemRenderer.prototype.onClick_btnHandler = function () {
            DropUtil.openDrop(this.data.item_id);
        };
        return SendRewardItemRenderer;
    }(eui.ItemRenderer));
    SendRewardItemRenderer.STATUS_NORMAL = "normal";
    SendRewardItemRenderer.STATUS_DOUBLE = "double";
    ui.SendRewardItemRenderer = SendRewardItemRenderer;
    __reflect(SendRewardItemRenderer.prototype, "ui.SendRewardItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=SendRewardItemRenderer.js.map