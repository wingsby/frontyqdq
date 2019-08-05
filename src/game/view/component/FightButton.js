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
    var FightButton = (function (_super) {
        __extends(FightButton, _super);
        function FightButton() {
            var _this = _super.call(this) || this;
            _this.need_replay = false;
            _this.ef_scale_orig = 1;
            _this.ef_scale_end = 1.6;
            _this.skinName = "yw.comp.ButtonSkin_Fight";
            _this.ef.touchEnabled = false;
            _this.labText.touchEnabled = false;
            _this.need_replay = true;
            _this.showIcon(true);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        FightButton.prototype.onAddToStage = function () {
            Singleton.Get(RegisterUpdate).register(this);
        };
        FightButton.prototype.onRemoveFromStage = function () {
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        FightButton.prototype.update = function (time) {
            if (this.need_replay) {
                this.playEf();
            }
        };
        FightButton.prototype.playEf = function () {
            var _this = this;
            this.ef.scaleX = this.ef_scale_orig;
            this.ef.scaleY = this.ef_scale_orig;
            this.ef.alpha = 0;
            this.tw_ef.wait(220).to({ alpha: 1 }, 0).to({ alpha: 0, scaleX: this.ef_scale_end, scaleY: this.ef_scale_end }, 333)
                .wait(110).to({ alpha: 1, scaleX: this.ef_scale_orig, scaleY: this.ef_scale_orig }, 0)
                .to({ alpha: 0, scaleX: this.ef_scale_end, scaleY: this.ef_scale_end }, 333)
                .wait(388).call(function () {
                _this.need_replay = true;
            }, this);
            this.need_replay = false;
        };
        Object.defineProperty(FightButton.prototype, "tw_ef", {
            get: function () {
                return egret.Tween.get(this.ef);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设定按钮文字
         * @param text
         */
        FightButton.prototype.setText = function (text) {
            this.labText.text = text;
        };
        /**
         * 设定是否显示icon
         * @param show
         */
        FightButton.prototype.showIcon = function (show) {
            this.imgIcon.visible = show;
            this.labText.verticalCenter = show ? 15 : 0;
        };
        return FightButton;
    }(eui.Component));
    ui.FightButton = FightButton;
    __reflect(FightButton.prototype, "ui.FightButton", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=FightButton.js.map