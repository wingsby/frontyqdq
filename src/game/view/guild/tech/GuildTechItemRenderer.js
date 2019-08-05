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
    var GuildTechItemRenderer = (function (_super) {
        __extends(GuildTechItemRenderer, _super);
        function GuildTechItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.GuildTechItemRendererSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        GuildTechItemRenderer.prototype.onAddToStage = function () {
        };
        GuildTechItemRenderer.prototype.onRemoveFromStage = function () {
        };
        GuildTechItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.setInfo(this.data.tech_id);
        };
        GuildTechItemRenderer.prototype.setInfo = function (tech_id) {
            var cfg_tech = Template.tech.get(tech_id);
            if (!cfg_tech) {
                console.error("no tech: " + tech_id);
                return;
            }
            this.imgIcon.source = undefined;
            ResManager.AsyncSetTexture(this.imgIcon, cfg_tech.Icon + "_png");
            this.labTitle.text = Template.getGUIText(cfg_tech.Name);
        };
        return GuildTechItemRenderer;
    }(eui.ItemRenderer));
    ui.GuildTechItemRenderer = GuildTechItemRenderer;
    __reflect(GuildTechItemRenderer.prototype, "ui.GuildTechItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=GuildTechItemRenderer.js.map