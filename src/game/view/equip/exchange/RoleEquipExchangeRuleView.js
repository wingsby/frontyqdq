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
    var RoleEquipExchangeRuleView = (function (_super) {
        __extends(RoleEquipExchangeRuleView, _super);
        function RoleEquipExchangeRuleView() {
            var _this = _super.call(this, "yw.ArenaRulePanelSkin") || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        RoleEquipExchangeRuleView.prototype.onAddToStage = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        RoleEquipExchangeRuleView.prototype.onRemoveFromStage = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        RoleEquipExchangeRuleView.prototype.componentCreated = function () {
            this.initGuiText();
        };
        RoleEquipExchangeRuleView.prototype.onDestroy = function () { };
        RoleEquipExchangeRuleView.prototype.onUpdate = function (time) { };
        RoleEquipExchangeRuleView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
        };
        RoleEquipExchangeRuleView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        /**
         * 初始化文字内容
         */
        RoleEquipExchangeRuleView.prototype.initGuiText = function () {
            this.labTitle.text = Template.getGUIText("ui_arena1");
            this.labContent.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText("ui_huhuan2"));
        };
        /**
         * 响应关闭按钮点击事件
         */
        RoleEquipExchangeRuleView.prototype.onClick_btnClose = function () {
            this.close();
        };
        return RoleEquipExchangeRuleView;
    }(PopupUI));
    ui.RoleEquipExchangeRuleView = RoleEquipExchangeRuleView;
    __reflect(RoleEquipExchangeRuleView.prototype, "ui.RoleEquipExchangeRuleView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleEquipExchangeRuleView.js.map