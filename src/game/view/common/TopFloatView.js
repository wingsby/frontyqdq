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
    var TopFloatView = (function (_super) {
        __extends(TopFloatView, _super);
        function TopFloatView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.TopFloatSkin";
            _this.touchEnabled = false;
            _this.visible = false;
            _this.groupNotifyEquip.visible = false;
            return _this;
        }
        TopFloatView.prototype.componentCreated = function () {
        };
        TopFloatView.prototype.onDestroy = function () {
        };
        TopFloatView.prototype.onUpdate = function (time) {
        };
        TopFloatView.prototype.showNotifyEquip = function (is_show) {
            if (is_show === void 0) { is_show = true; }
            this.labNotifyEquip.text = Template.getGUIText("ui_fenjie3");
            this.groupNotifyEquip.visible = is_show;
        };
        return TopFloatView;
    }(eui.Component));
    ui.TopFloatView = TopFloatView;
    __reflect(TopFloatView.prototype, "ui.TopFloatView");
})(ui || (ui = {}));
//# sourceMappingURL=TopFloatView.js.map