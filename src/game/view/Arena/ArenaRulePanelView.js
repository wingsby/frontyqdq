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
    var ArenaRulePanelView = (function (_super) {
        __extends(ArenaRulePanelView, _super);
        function ArenaRulePanelView() {
            return _super.call(this, "yw.ArenaRulePanelSkin") || this;
        }
        ArenaRulePanelView.prototype.componentCreated = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.initGuiText();
        };
        ArenaRulePanelView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        ArenaRulePanelView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化文字内容
         */
        ArenaRulePanelView.prototype.initGuiText = function () {
            this.labTitle.text = Template.getGUIText("ui_arena1");
            this.labContent.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText("ui_arena2"));
        };
        /**
         * 响应关闭按钮点击事件
         */
        ArenaRulePanelView.prototype.onClick_btnClose = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.onDestroy();
        };
        return ArenaRulePanelView;
    }(PopupUI));
    ui.ArenaRulePanelView = ArenaRulePanelView;
    __reflect(ArenaRulePanelView.prototype, "ui.ArenaRulePanelView");
})(ui || (ui = {}));
//# sourceMappingURL=ArenaRulePanelView.js.map