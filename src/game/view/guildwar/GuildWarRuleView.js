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
    var GuildWarRuleView = (function (_super) {
        __extends(GuildWarRuleView, _super);
        function GuildWarRuleView() {
            return _super.call(this, "yw.ArenaRulePanelSkin") || this;
        }
        GuildWarRuleView.prototype.componentCreated = function () {
        };
        GuildWarRuleView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        GuildWarRuleView.prototype.onUpdate = function (time) {
        };
        GuildWarRuleView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.labTitle.text = Template.getGUIText("ui_arena1");
            this.labContent.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText("ui_guildwar25"));
        };
        GuildWarRuleView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        GuildWarRuleView.prototype.onClick_btnClose = function () {
            this.close();
        };
        return GuildWarRuleView;
    }(PopupUI));
    ui.GuildWarRuleView = GuildWarRuleView;
    __reflect(GuildWarRuleView.prototype, "ui.GuildWarRuleView");
})(ui || (ui = {}));
//# sourceMappingURL=GuildWarRuleView.js.map