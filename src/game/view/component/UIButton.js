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
    /**
     * Group式按钮
     */
    var UIButton = (function (_super) {
        __extends(UIButton, _super);
        function UIButton() {
            return _super.call(this) || this;
        }
        return UIButton;
    }(eui.Group));
    ui.UIButton = UIButton;
    __reflect(UIButton.prototype, "ui.UIButton");
})(ui || (ui = {}));
//# sourceMappingURL=UIButton.js.map