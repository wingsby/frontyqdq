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
    var DramaBeat = (function (_super) {
        __extends(DramaBeat, _super);
        function DramaBeat() {
            var _this = _super.call(this) || this;
            _this.m_last_update = 0;
            _this.skinName = "yw.DramaBeatSkin";
            return _this;
        }
        DramaBeat.prototype.childrenCreated = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        DramaBeat.prototype.dispose = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        DramaBeat.prototype.onAddToStage = function () {
            Singleton.Get(RegisterUpdate).register(this);
        };
        DramaBeat.prototype.onRemoveFromStage = function () {
            Singleton.Get(RegisterUpdate).unRegister(this);
            egret.Tween.removeTweens(this.img);
        };
        DramaBeat.prototype.update = function (time) {
            if (UtilsGame.Now() - this.m_last_update > 1500) {
                this.m_last_update = UtilsGame.Now();
                this.playAni();
            }
        };
        DramaBeat.prototype.playAni = function () {
            egret.Tween.removeTweens(this.img);
            this.img.y = 22;
            this.img.scaleX = 1;
            this.img.scaleY = 1;
            var tw = egret.Tween.get(this.img);
            tw.to({ y: 8, scaleX: 0.95, scaleY: 1.05 }, 80, egret.Ease.sineOut).to({ y: 22, scaleX: 1, scaleY: 1 }, 120, egret.Ease.sineOut).wait(80).to({ y: 8, scaleX: 0.95, scaleY: 1.05 }, 80, egret.Ease.sineOut).to({ y: 22, scaleX: 1, scaleY: 1 }, 120, egret.Ease.sineOut);
        };
        return DramaBeat;
    }(eui.Component));
    ui.DramaBeat = DramaBeat;
    __reflect(DramaBeat.prototype, "ui.DramaBeat", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=DramaBeat.js.map