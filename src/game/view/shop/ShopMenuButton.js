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
    var ShopMenuButton = (function (_super) {
        __extends(ShopMenuButton, _super);
        function ShopMenuButton() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.comp.ButtonSkin_RoleTab";
            return _this;
        }
        ShopMenuButton.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.width = 110;
            this.height = 38;
            this.text = Template.getGUIText(this.itemShop.BoothName);
        };
        return ShopMenuButton;
    }(ui.ExButton));
    ui.ShopMenuButton = ShopMenuButton;
    __reflect(ShopMenuButton.prototype, "ui.ShopMenuButton");
})(ui || (ui = {}));
//# sourceMappingURL=ShopMenuButton.js.map