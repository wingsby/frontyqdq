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
     * UI单页
     */
    var UIView = (function (_super) {
        __extends(UIView, _super);
        function UIView() {
            return _super.call(this) || this;
        }
        return UIView;
    }(eui.Component));
    ui.UIView = UIView;
    __reflect(UIView.prototype, "ui.UIView");
})(ui || (ui = {}));
//# sourceMappingURL=UIView.js.map