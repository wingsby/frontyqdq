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
    var GuideHandlerView = (function (_super) {
        __extends(GuideHandlerView, _super);
        function GuideHandlerView() {
            var _this = _super.call(this) || this;
            _this.need_replay = false;
            _this.hand_orig = new egret.Point(115, 207);
            _this.hand_end = new egret.Point(90, 152);
            _this.ef_scale_orig = 1;
            _this.ef_scale_end = 1.6;
            _this.skinName = "yw.GuideHandlerSkin";
            _this.visible = false;
            _this.touchEnabled = false;
            _this.ef.touchEnabled = false;
            _this.hand.touchEnabled = false;
            return _this;
        }
        GuideHandlerView.prototype.update = function (time) {
            if (this.need_replay) {
                this.playEf();
            }
        };
        GuideHandlerView.prototype.setVisible = function (visible) {
            if (this.visible == visible) {
                return;
            }
            this.visible = visible;
            if (visible) {
                this.need_replay = true;
                this.tw_ef = egret.Tween.get(this.ef);
                this.tw_hand = egret.Tween.get(this.hand);
                Singleton.Get(RegisterUpdate).register(this);
            }
            else {
                this.need_replay = false;
                egret.Tween.removeTweens(this.ef);
                egret.Tween.removeTweens(this.tw_hand);
                this.tw_ef = null;
                this.tw_hand = null;
                Singleton.Get(RegisterUpdate).unRegister(this);
            }
        };
        GuideHandlerView.prototype.playEf = function () {
            var _this = this;
            this.tw_ef = egret.Tween.get(this.ef);
            this.tw_hand = egret.Tween.get(this.hand);
            this.ef.scaleX = this.ef_scale_orig;
            this.ef.scaleY = this.ef_scale_orig;
            this.ef.alpha = 0;
            this.tw_ef.wait(220).to({ alpha: 1 }, 0).to({ alpha: 0, scaleX: this.ef_scale_end, scaleY: this.ef_scale_end }, 333)
                .wait(110).to({ alpha: 1, scaleX: this.ef_scale_orig, scaleY: this.ef_scale_orig }, 0)
                .to({ alpha: 0, scaleX: this.ef_scale_end, scaleY: this.ef_scale_end }, 333)
                .wait(388).call(function () {
                _this.need_replay = true;
            }, this);
            this.hand.x = this.hand_orig.x;
            this.hand.y = this.hand_orig.y;
            this.tw_hand.to({ x: this.hand_end.x, y: this.hand_end.y }, 220)
                .to({ x: this.hand_orig.x, y: this.hand_orig.y }, 220)
                .to({ x: this.hand_end.x, y: this.hand_end.y }, 220)
                .to({ x: this.hand_orig.x, y: this.hand_orig.y }, 220);
            this.need_replay = false;
        };
        return GuideHandlerView;
    }(eui.Component));
    ui.GuideHandlerView = GuideHandlerView;
    __reflect(GuideHandlerView.prototype, "ui.GuideHandlerView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=GuideHandlerView.js.map