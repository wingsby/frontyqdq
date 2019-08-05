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
    var DramaSkipButton = (function (_super) {
        __extends(DramaSkipButton, _super);
        function DramaSkipButton() {
            var _this = _super.call(this) || this;
            _this.m_last_update = 0;
            _this.skinName = "yw.DramaSkipButtonSkin";
            return _this;
        }
        DramaSkipButton.prototype.childrenCreated = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        DramaSkipButton.prototype.dispose = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        DramaSkipButton.prototype.onAddToStage = function () {
            this.groupRoot.alpha = 0;
            Singleton.Get(RegisterUpdate).register(this);
        };
        DramaSkipButton.prototype.onRemoveFromStage = function () {
            Singleton.Get(RegisterUpdate).unRegister(this);
            egret.Tween.removeTweens(this.groupRoot);
        };
        DramaSkipButton.prototype.update = function (time) {
            if (!this.visible) {
                return;
            }
            if (UtilsGame.Now() - this.m_last_update > 2200) {
                this.m_last_update = UtilsGame.Now();
                this.playAni();
            }
        };
        DramaSkipButton.prototype.playAni = function () {
            egret.Tween.removeTweens(this.groupRoot);
            this.groupRoot.alpha = 0;
            var tw = egret.Tween.get(this.groupRoot);
            tw.wait(500).to({ alpha: 1 }, 600).wait(500).to({ alpha: 0 }, 600);
        };
        return DramaSkipButton;
    }(eui.Component));
    ui.DramaSkipButton = DramaSkipButton;
    __reflect(DramaSkipButton.prototype, "ui.DramaSkipButton", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=DramaSkipButton.js.map