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
    var CloseupBossView = (function (_super) {
        __extends(CloseupBossView, _super);
        /**
         * 构造函数
         */
        function CloseupBossView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.CloseupBossSkin";
            _this.touchEnabled = true; // 释放技能时屏蔽下层的点击事件
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        /**
         * 响应子对象创建完成
         */
        CloseupBossView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 响应添加到场景
         * @param e
         */
        CloseupBossView.prototype.onAddToStage = function (e) {
            this._endEffectHeight = this.groupEffect.height;
            this._endLeftX = this.imgLeft.x;
            this._endRightX = this.imgRight.x;
            this._endCenterHeight = this.imgCenter.height;
            this._endCenterWidth = this.imgCenter.width;
        };
        /**
         * 播放动画
         */
        CloseupBossView.prototype.play = function (callback, thisObj, params) {
            // 重置动画参数
            this.reset();
            var twRectBg = egret.Tween.get(this.rectBg);
            twRectBg.to({ alpha: 1 }, 100);
            var twEffect = egret.Tween.get(this.groupEffect);
            twEffect.to({ height: this._endEffectHeight, alpha: 1 }, 150).wait(900).to({ height: 0 }, 100);
            var twLeft = egret.Tween.get(this.imgLeft);
            twLeft.to({ x: this._endLeftX - 15, alpha: 1 }, 200).to({ x: this._endLeftX + 15 }, 800).to({ x: this._endLeftX + 600 }, 200);
            var twRight = egret.Tween.get(this.imgRight);
            twRight.to({ x: this._endRightX + 15, alpha: 1 }, 200).to({ x: this._endRightX - 15 }, 800).to({ x: this._endRightX - 600 }, 200);
            var twCenter = egret.Tween.get(this.imgCenter);
            twCenter.to({ width: this._endCenterWidth, height: this._endCenterHeight }, 200).to({ width: this._endCenterWidth * 1.1, height: this._endCenterWidth * 1.1 }, 800).to({ width: 0, height: 0 }, 200);
            var twAll = egret.Tween.get(this);
            if (callback) {
                twAll.wait(1300).call(callback, thisObj, params).to({ alpha: 0 }, 100);
            }
            else {
                twAll.wait(1300).to({ alpha: 0 }, 100);
            }
        };
        /**
         * 重置资源位置
         */
        CloseupBossView.prototype.reset = function () {
            this.alpha = 1;
            this.rectBg.alpha = 0;
            this.groupEffect.height = this.hookEffect.height;
            this.groupEffect.alpha = 0;
            this.imgLeft.x = this.hookLeft.x;
            this.imgLeft.alpha = 0;
            this.imgRight.x = this.hookRight.x;
            this.imgRight.alpha = 0;
            this.imgCenter.width = this.hookCenter.width;
            this.imgCenter.height = this.hookCenter.height;
        };
        return CloseupBossView;
    }(eui.Component));
    ui.CloseupBossView = CloseupBossView;
    __reflect(CloseupBossView.prototype, "ui.CloseupBossView");
})(ui || (ui = {}));
//# sourceMappingURL=CloseupBossView.js.map