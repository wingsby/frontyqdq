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
    var BgView = (function (_super) {
        __extends(BgView, _super);
        function BgView() {
            return _super.call(this, "yw.BgSkin") || this;
        }
        BgView.prototype.componentCreated = function () {
        };
        BgView.prototype.onDestroy = function () {
        };
        BgView.prototype.onUpdate = function (time) {
        };
        return BgView;
    }(BaseUI));
    ui.BgView = BgView;
    __reflect(BgView.prototype, "ui.BgView");
})(ui || (ui = {}));
//# sourceMappingURL=BgView.js.map