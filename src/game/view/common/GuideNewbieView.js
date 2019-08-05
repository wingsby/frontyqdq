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
    var GuideNewbieView = (function (_super) {
        __extends(GuideNewbieView, _super);
        function GuideNewbieView() {
            return _super.call(this, "yw.GuideNewbieSkin") || this;
        }
        GuideNewbieView.prototype.componentCreated = function () { };
        GuideNewbieView.prototype.onDestroy = function () { };
        GuideNewbieView.prototype.onUpdate = function (time) { };
        GuideNewbieView.prototype.open = function () {
            Singleton.Get(LayerManager).GetGuideTempLayer().addChild(this);
            this.labTxtTip.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText("guide38"));
            this.groupHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_handler, this);
            this.btnGuide.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGuide, this);
        };
        GuideNewbieView.prototype.close = function () {
            Singleton.Get(LayerManager).GetGuideTempLayer().removeChild(this);
            this.groupHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_handler, this);
            this.btnGuide.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGuide, this);
        };
        GuideNewbieView.prototype.onClick_handler = function () {
            this.close();
        };
        GuideNewbieView.prototype.onClick_btnGuide = function () {
            this.close();
            Singleton.Get(GuideManager).nextGuide(Singleton.Get(GuideManager).getGuideInfo().cur_guide_id);
        };
        return GuideNewbieView;
    }(BaseUI));
    ui.GuideNewbieView = GuideNewbieView;
    __reflect(GuideNewbieView.prototype, "ui.GuideNewbieView");
})(ui || (ui = {}));
//# sourceMappingURL=GuideNewbieView.js.map