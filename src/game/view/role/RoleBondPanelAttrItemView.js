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
    var RoleBondPanelAttrItemView = (function (_super) {
        __extends(RoleBondPanelAttrItemView, _super);
        function RoleBondPanelAttrItemView(name, attr) {
            var _this = _super.call(this) || this;
            _this.m_is_on_stage = false;
            _this.m_name = "";
            _this.m_attr = "";
            _this.m_is_active = false;
            _this.skinName = "yw.RoleBondPanelAttrItemSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            _this.m_name = name;
            _this.m_attr = attr;
            return _this;
        }
        RoleBondPanelAttrItemView.prototype.setActive = function (isActive) {
            if (this.m_is_on_stage) {
                this.labName.textColor = isActive ? DEFINE_COLOR.TEXT_ORANGE : DEFINE_COLOR.TEXT_GRAY;
                this.labAttr.textColor = isActive ? DEFINE_COLOR.TEXT_ORANGE : DEFINE_COLOR.TEXT_GRAY;
            }
            else {
                this.m_is_active = isActive;
            }
        };
        RoleBondPanelAttrItemView.prototype.onAddToStage = function () {
            this.m_is_on_stage = true;
            this.labName.text = this.m_name;
            this.labAttr.text = this.m_attr;
            this.setActive(this.m_is_active);
        };
        RoleBondPanelAttrItemView.prototype.onRemoveFromStage = function () {
            this.m_is_on_stage = false;
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        return RoleBondPanelAttrItemView;
    }(eui.Component));
    ui.RoleBondPanelAttrItemView = RoleBondPanelAttrItemView;
    __reflect(RoleBondPanelAttrItemView.prototype, "ui.RoleBondPanelAttrItemView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleBondPanelAttrItemView.js.map