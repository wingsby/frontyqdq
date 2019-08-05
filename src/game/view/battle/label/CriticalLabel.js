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
    var CriticalLabel = (function (_super) {
        __extends(CriticalLabel, _super);
        /**
         * 构造函数
         */
        function CriticalLabel(text) {
            var _this = _super.call(this, text) || this;
            //         /// flash 关键帧数据   ：frame, alpha， width， height, scale
            // private _initData: any[] = [
            //     [1, 1, 293.35, -15.55, 38, 21],
            //     [1, 1, 293.35, -15.55, 118.45, 35.60],
            //     [4, 1, 313.60, -16.30, 69.95, 21.00],
            //     [6, 1, 313.60, -16.30, 69.95, 21.00],
            //     [10, 0, 313.60, -56.30, 69.95, 21.00]];
            //// 暴击效果三阶段
            // time, alpha, , x, y, scalx, scaly
            _this._tweenParam = [
                [0, 1, 0, 0, 1.694, 1.694],
                [200, 1, 20.25, -0.75, 0.5903187721369539, 0.5903187721369539],
                [133.33333333333334, 1, 20.25, -0.75, 0.5903187721369539, 0.5903187721369539],
                [266.6666666666667, 0, 20.25, -40.75, 0.5903187721369539, 0.5903187721369539],
            ];
            _this.text = "c" + text;
            ResManager.getResAsync("critical_fnt", function (res) { _this.font = res; }, _this);
            return _this;
        }
        /**
         * 播放弹出动画
         */
        CriticalLabel.prototype.playPopTween = function (callback, thisObj) {
            var _this = this;
            this.text = "c" + this.text;
            this.alpha = 0;
            this.x = this.offX;
            this.y = this.offY;
            var randX = (Math.random() - 0.5) * 40;
            var tw = egret.Tween.get(this);
            /// 初始
            this.alpha = this._tweenParam[0][1];
            this.scaleX = this._tweenParam[0][4];
            this.scaleY = this._tweenParam[0][5];
            tw.to({
                x: this.offX + this._tweenParam[1][2], y: this.offY + this._tweenParam[1][3],
                scaleX: this._tweenParam[1][4], scaleY: this._tweenParam[1][5],
                alpha: this._tweenParam[1][1],
            }, this._tweenParam[1][0])
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
                ObjectPool.getPool(CriticalLabel).recycleObject(_this);
            }, this);
        };
        return CriticalLabel;
    }(ui.UIBattleLabel));
    ui.CriticalLabel = CriticalLabel;
    __reflect(CriticalLabel.prototype, "ui.CriticalLabel");
})(ui || (ui = {}));
//# sourceMappingURL=CriticalLabel.js.map