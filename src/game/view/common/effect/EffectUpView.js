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
    var EffectUpView = (function (_super) {
        __extends(EffectUpView, _super);
        function EffectUpView() {
            var _this = _super.call(this, "yw.EffectUpSkin") || this;
            _this.m_playing = false;
            return _this;
        }
        EffectUpView.prototype.componentCreated = function () {
            this.mcBg.scaleX = 1.5;
            this.mcBg.scaleY = 1.5;
        };
        EffectUpView.prototype.onDestroy = function () { };
        EffectUpView.prototype.onUpdate = function (time) { };
        EffectUpView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
        };
        EffectUpView.prototype.close = function () {
            this.labText.text = "";
            Singleton.Get(LayerManager).removeView(this);
        };
        EffectUpView.prototype.play = function (text) {
            this.labText.text = text;
            this.mcBg.setMovieClip("chenggong");
            this.mcBg.gotoAndPlay("chenggong", 1);
            this.m_playing = true;
            this.tgText.play();
            this.tgText.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        };
        EffectUpView.prototype.onComplete = function () {
            this.m_playing = false;
            this.tgText.stop();
            this.tgText.removeEventListener(egret.Event.COMPLETE, this.onComplete, this);
            this.close();
        };
        return EffectUpView;
    }(BaseUI));
    ui.EffectUpView = EffectUpView;
    __reflect(EffectUpView.prototype, "ui.EffectUpView");
})(ui || (ui = {}));
//# sourceMappingURL=EffectUpView.js.map