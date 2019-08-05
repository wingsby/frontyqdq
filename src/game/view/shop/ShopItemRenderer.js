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
    var ShopItemRenderer = (function (_super) {
        __extends(ShopItemRenderer, _super);
        function ShopItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ShopItemRendererSkin";
            return _this;
        }
        ShopItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dispatch_Event, this);
        };
        ShopItemRenderer.prototype.dispatch_Event = function (e) {
            this.parent.dispatchEventWith(ui.ShopView.event_shopClick, false, this.data);
        };
        ShopItemRenderer.prototype.dataChanged = function () {
            this.shop = this.data;
            this.img_icon.source = this.shop.ShopIcon + "_png";
            this.lb_Text.text = Template.getGUIText(this.shop.ShopName);
            var shops = Template.shop.keys;
            for (var i = 0; i < shops.length; i++) {
                if (this.shop.Id == shops[i]) {
                    this.groupRoot.alpha = 0;
                    this.groupRoot.y = -70;
                    this.groupRoot.scaleX = 1.8;
                    this.groupRoot.scaleY = 1.8;
                    var tw = egret.Tween.get(this.groupRoot);
                    tw.wait(60 * (i + 2)).to({ alpha: 1, y: 0, scaleX: 1, scaleY: 1 }, 120, egret.Ease.sineOut);
                    break;
                }
            }
        };
        return ShopItemRenderer;
    }(eui.ItemRenderer));
    ui.ShopItemRenderer = ShopItemRenderer;
    __reflect(ShopItemRenderer.prototype, "ui.ShopItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=ShopItemRenderer.js.map