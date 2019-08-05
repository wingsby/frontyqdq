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
    var UISkillLabel = (function (_super) {
        __extends(UISkillLabel, _super);
        /**
         * 构造函数
         */
        function UISkillLabel() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.UISkillLabelSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        Object.defineProperty(UISkillLabel.prototype, "text", {
            /**
             * 设定文字
             * @param text
             */
            set: function (text) {
                ResManager.AsyncSetTexture(this.imgText, text + "_png");
            },
            enumerable: true,
            configurable: true
        });
        UISkillLabel.prototype.onAddToStage = function () {
            this.x = this.offX;
            this.y = this.offY;
            this.anchorOffsetX = this.width / 2;
            Singleton.Get(RegisterUpdate).register(this);
        };
        UISkillLabel.prototype.onRemoveFromStage = function () {
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        UISkillLabel.prototype.update = function () {
            this.imgText.x = (this.width - this.imgText.width * this.imgText.scaleX) / 2;
            this.imgText.y = (this.height - this.imgText.height * this.imgText.scaleY) / 2;
            this.imgBg.x = (this.width - this.imgBg.width * this.imgBg.scaleX) / 2;
            this.imgBg.y = (this.height - this.imgBg.height * this.imgBg.scaleY) / 2;
        };
        /**
         * 弹出数字
         * @param x
         * @param y
         * @param text
         * @param callback
         * @param thisObj
         */
        UISkillLabel.prototype.pop = function (x, y, text, callback, thisObj) {
            this.text = text;
            this.offX = x - 10;
            this.offY = y - 130;
            this.playPopTween(callback, thisObj);
        };
        /**
         * 播放弹出动画
         */
        UISkillLabel.prototype.playPopTween = function (callback, thisObj) {
            var _this = this;
            // 本体
            this.alpha = 1;
            this.x = this.offX;
            this.y = this.offY;
            egret.Tween.removeTweens(this);
            var tw = egret.Tween.get(this);
            tw.wait(700).to({ y: this.offY - 35, alpha: 0 }, 120).call(function () {
                // 触发回调参数
                if (callback) {
                    callback(thisObj);
                }
                ObjectPool.getPool(UISkillLabel).recycleObject(_this);
            }, this);
            // 文字
            this.imgText.scaleX = 1.95;
            this.imgText.scaleY = 1.64;
            this.imgText.alpha = 0.8;
            egret.Tween.removeTweens(this.imgText);
            var tw_text = egret.Tween.get(this.imgText);
            tw_text.to({ scaleX: 1, scaleY: 1, alpha: 1 }, 160);
            // 背景
            this.imgBg.alpha = 0;
            this.imgBg.scaleX = 0;
            this.imgBg.scaleY = 0;
            egret.Tween.removeTweens(this.imgBg);
            var tw_bg = egret.Tween.get(this.imgBg);
            tw_bg.to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200);
        };
        return UISkillLabel;
    }(eui.Component));
    ui.UISkillLabel = UISkillLabel;
    __reflect(UISkillLabel.prototype, "ui.UISkillLabel", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=UISkillLabel.js.map