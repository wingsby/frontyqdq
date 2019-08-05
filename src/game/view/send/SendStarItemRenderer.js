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
    var SendStarItemRenderer = (function (_super) {
        __extends(SendStarItemRenderer, _super);
        function SendStarItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.SendStarItemRenderer";
            return _this;
        }
        return SendStarItemRenderer;
    }(eui.ItemRenderer));
    ui.SendStarItemRenderer = SendStarItemRenderer;
    __reflect(SendStarItemRenderer.prototype, "ui.SendStarItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=SendStarItemRenderer.js.map