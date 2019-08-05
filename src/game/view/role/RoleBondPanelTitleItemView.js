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
    var RoleBondPanelTitleItemView = (function (_super) {
        __extends(RoleBondPanelTitleItemView, _super);
        function RoleBondPanelTitleItemView(text) {
            var _this = _super.call(this) || this;
            _this.m_title = "";
            _this.skinName = "yw.RoleBondPanelTitleItemSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            _this.m_title = text;
            return _this;
        }
        RoleBondPanelTitleItemView.prototype.onAddToStage = function () {
            this.labTitle.text = this.m_title;
        };
        RoleBondPanelTitleItemView.prototype.onRemoveFromStage = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        return RoleBondPanelTitleItemView;
    }(eui.Component));
    ui.RoleBondPanelTitleItemView = RoleBondPanelTitleItemView;
    __reflect(RoleBondPanelTitleItemView.prototype, "ui.RoleBondPanelTitleItemView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleBondPanelTitleItemView.js.map