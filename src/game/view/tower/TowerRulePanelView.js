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
    var TowerRulePanelView = (function (_super) {
        __extends(TowerRulePanelView, _super);
        function TowerRulePanelView() {
            return _super.call(this, "yw.ArenaRulePanelSkin") || this;
        }
        TowerRulePanelView.prototype.componentCreated = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.initGuiText();
        };
        TowerRulePanelView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        TowerRulePanelView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化文字内容
         */
        TowerRulePanelView.prototype.initGuiText = function () {
            this.labTitle.text = Template.getGUIText("ui_arena1");
            this.labContent.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText("ui_tower15"));
        };
        /**
         * 响应关闭按钮点击事件
         */
        TowerRulePanelView.prototype.onClick_btnClose = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.onDestroy();
        };
        return TowerRulePanelView;
    }(PopupUI));
    ui.TowerRulePanelView = TowerRulePanelView;
    __reflect(TowerRulePanelView.prototype, "ui.TowerRulePanelView");
})(ui || (ui = {}));
//# sourceMappingURL=TowerRulePanelView.js.map