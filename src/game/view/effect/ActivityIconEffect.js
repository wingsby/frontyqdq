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
    var ActivityIconEffect = (function (_super) {
        __extends(ActivityIconEffect, _super);
        function ActivityIconEffect() {
            var _this = _super.call(this) || this;
            _this.last_tick_time = 0;
            _this.speed = 30;
            _this.skinName = "yw.ActivityIconEffectSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        ActivityIconEffect.prototype.onAddToStage = function () {
            this.last_tick_time = UtilsGame.Now();
            Singleton.Get(RegisterUpdate).register(this);
        };
        ActivityIconEffect.prototype.onRemoveFromStage = function () {
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        ActivityIconEffect.prototype.update = function (time) {
            var delta_time = UtilsGame.Now() - this.last_tick_time;
            this.last_tick_time = UtilsGame.Now();
            this.img.rotation += this.speed * delta_time / 1000;
            if (this.img.rotation > 360) {
                this.img.rotation -= 360;
            }
        };
        return ActivityIconEffect;
    }(eui.Component));
    ui.ActivityIconEffect = ActivityIconEffect;
    __reflect(ActivityIconEffect.prototype, "ui.ActivityIconEffect", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=ActivityIconEffect.js.map