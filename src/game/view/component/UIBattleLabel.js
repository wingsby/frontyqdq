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
    /**
     * 战斗中弹出的伤害数字
     */
    var UIBattleLabel = (function (_super) {
        __extends(UIBattleLabel, _super);
        /**
         * 构造函数
         */
        function UIBattleLabel(text) {
            var _this = _super.call(this, text) || this;
            _this.scaleX = 0;
            _this.scaleY = 0;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        /**
         * 响应添加到舞台
         * @param e
         */
        UIBattleLabel.prototype.onAddToStage = function (e) {
            this.x = this.offX;
            this.y = this.offY;
            this.alpha = this.offAlpha;
            // 文字垂直居中，用于对齐BitmapFont中文字大小不一致的部分
            this.verticalAlign = "center";
            this.textAlign = "center";
            this.width = 580;
            this.anchorOffsetX = this.width / 2;
        };
        /**
         * 弹出数字
         * @param x
         * @param y
         * @param text
         * @param callback
         * @param thisObj
         */
        UIBattleLabel.prototype.pop = function (x, y, text, callback, thisObj) {
            if (callback === void 0) { callback = null; }
            this.text = text;
            this.offX = x - 10; // TODO 临时修复对不上角色坐标的问题
            this.offY = y - 40;
            this.offAlpha = 0;
            this.playPopTween(callback, thisObj);
        };
        /**
         * 播放弹出动画
         */
        UIBattleLabel.prototype.playPopTween = function (callback, thisObj) {
            if (callback) {
                callback(thisObj);
            }
        };
        return UIBattleLabel;
    }(eui.BitmapLabel));
    ui.UIBattleLabel = UIBattleLabel;
    __reflect(UIBattleLabel.prototype, "ui.UIBattleLabel");
})(ui || (ui = {}));
//# sourceMappingURL=UIBattleLabel.js.map