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
    var RoleKiraTamaView = (function (_super) {
        __extends(RoleKiraTamaView, _super);
        function RoleKiraTamaView() {
            var _this = _super.call(this) || this;
            _this.bg_playing = false;
            _this.skinName = "yw.RoleKiraTamaSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        /**
         * 响应添加到舞台
         */
        RoleKiraTamaView.prototype.onAddToStage = function () {
        };
        /**
         * 响应从舞台移除
         */
        RoleKiraTamaView.prototype.onRemoveFromStage = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.bg_playing = false;
        };
        /**
         * 播放特效
         */
        RoleKiraTamaView.prototype.play = function (is_ex, callback, thisObj) {
            if (is_ex === void 0) { is_ex = false; }
            if (callback === void 0) { callback = null; }
            if (thisObj === void 0) { thisObj = null; }
            this.is_ex = is_ex;
            this.bg_playing = true;
            this.playTama(callback, thisObj);
            this.playEffect();
            this.playBackground();
        };
        /**
         * 播放效果
         */
        RoleKiraTamaView.prototype.playEffect = function () {
            this.mcFront.clearMovieClip();
            this.mcFront.setMovieClip("ui_gouyu");
            this.mcFront.gotoAndPlay("ui_gouyu", 1);
        };
        /**
         * 循环播放背景
         */
        RoleKiraTamaView.prototype.playBackground = function () {
            if (!this.bg_playing) {
                return;
            }
            this.imgBk.alpha = 0.5;
            var tw = egret.Tween.get(this.imgBk);
            tw.to({ alpha: 1 }, 700).to({ alpha: 0.5 }, 700).call(this.playBackground, this);
        };
        /**
         * 播放勾玉
         */
        RoleKiraTamaView.prototype.playTama = function (callback, thisObj) {
            if (callback === void 0) { callback = null; }
            if (thisObj === void 0) { thisObj = null; }
            this.groupTamas.alpha = 0;
            this.groupTamas.scaleX = 1.5;
            this.groupTamas.scaleY = 1.5;
            var tw = egret.Tween.get(this.groupTamas);
            tw.to({ alpha: 0.2, scaleX: 1.2, scaleY: 1.2 }, 50)
                .call(this.playEffect, this)
                .to({ alpha: 1, scaleX: 0.5, scaleY: 0.5 }, 100).wait(80).call(function () {
                if (callback != null) {
                    callback.call(thisObj);
                }
            }, this);
        };
        RoleKiraTamaView.prototype.reset = function () {
            this.bg_playing = false;
            egret.Tween.removeTweens(this.imgBk);
        };
        Object.defineProperty(RoleKiraTamaView.prototype, "is_ex", {
            /**
             * 设定勾玉状态
             * @param value 是否是彩色勾玉
             */
            set: function (value) {
                ResManager.AsyncSetTexture(this.imgTama, Common.getTamaSingleRes(!value));
            },
            enumerable: true,
            configurable: true
        });
        return RoleKiraTamaView;
    }(eui.Component));
    ui.RoleKiraTamaView = RoleKiraTamaView;
    __reflect(RoleKiraTamaView.prototype, "ui.RoleKiraTamaView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleKiraTamaView.js.map