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
    var DamageLabel = (function (_super) {
        __extends(DamageLabel, _super);
        /**
         * 构造函数
         */
        function DamageLabel(text) {
            var _this = _super.call(this, text) || this;
            _this._tweenParam = [
                [0, 1, 0, 0, 1.694, 1.694],
                [200, 1, 0, 0, 0.5903187721369539, 0.5903187721369539],
                [133.33333333333334, 1, 0, 0, 0.5903187721369539, 0.5903187721369539],
                [266.6666666666667, 0, 0, -41.25, 0.5903187721369539, 0.5903187721369539],
            ];
            ResManager.getResAsync("damage_fnt", function (res) { _this.font = res; }, _this);
            return _this;
        }
        /**
         * 播放弹出动画
         */
        DamageLabel.prototype.playPopTween = function (callback, thisObj) {
            var _this = this;
            this.text = "-" + this.text;
            this.alpha = 0;
            this.x = this.offX;
            this.y = this.offY;
            var randX = (Math.random() - 0.5) * 40;
            var tw = egret.Tween.get(this);
            /// 初始
            this.alpha = this._tweenParam[0][1];
            this.scaleX = this._tweenParam[1][4];
            this.scaleY = this._tweenParam[1][5];
            tw
                .to({
                x: this.offX + this._tweenParam[2][2], y: this.offY + this._tweenParam[2][3],
                scaleX: this._tweenParam[2][4], scaleY: this._tweenParam[2][5],
                alpha: this._tweenParam[2][1],
            }, this._tweenParam[2][0])
                .to({
                x: this.offX + this._tweenParam[3][2], y: this.offY + this._tweenParam[3][3],
                scaleX: this._tweenParam[3][4], scaleY: this._tweenParam[3][5],
                alpha: this._tweenParam[3][1],
            }, this._tweenParam[3][0])
                .call(function () {
                // 触发回调参数
                if (callback) {
                    callback(thisObj);
                }
                ObjectPool.getPool(DamageLabel).recycleObject(_this);
            }, this);
        };
        return DamageLabel;
    }(ui.UIBattleLabel));
    ui.DamageLabel = DamageLabel;
    __reflect(DamageLabel.prototype, "ui.DamageLabel");
})(ui || (ui = {}));
//# sourceMappingURL=DamageLabel.js.map