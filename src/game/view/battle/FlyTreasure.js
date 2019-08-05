var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
// 喜从天降
var ui;
(function (ui) {
    var FlyTreasure = (function (_super) {
        __extends(FlyTreasure, _super);
        /**
         * 构造函数
         */
        function FlyTreasure() {
            var _this = _super.call(this) || this;
            // private imgBtnFlyTreasure: eui.Image;
            // private labBtnFlyTreasure: eui.Label;
            // 运动控制相关变量
            _this.m_speed = 0.05;
            _this.skinName = "yw.FlyTreasure";
            _this.touchEnabled = false; // 屏蔽下层的点击事件
            _this.btnFlyTreasure.touchEnabled = true; // 启用按钮点击
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            _this.btnFlyTreasure.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnFlyTreasure, _this);
            return _this;
        }
        /**
         * 响应子对象创建完成
         */
        FlyTreasure.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 绑定回调函数
         * @param callback
         * @param thisObj
         * @param args
         */
        FlyTreasure.prototype.bindCallback = function (callback, thisObj, args) {
            if (this.m_callback == callback) {
                return;
            }
            this.m_callback = callback;
            this.m_callback_this = thisObj;
            this.m_callback_args = args ? args : null;
        };
        /**
         * 移除回调
         */
        FlyTreasure.prototype.removeCallback = function () {
            this.m_callback = null;
            this.m_callback_this = null;
            this.m_callback_args = null;
        };
        /**
         * 响应喜从天降点击事件
         */
        FlyTreasure.prototype.onClick_btnFlyTreasure = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this);
            /// 回收当前按钮UI
            Singleton.Get(ui.BattleView).removeChild(this);
            Singleton.Get(ui.BattleView).playFTBoomEffect(this.x + 54, this.y + 94, function () {
                /// 调用回调函数
                if (_this.m_callback) {
                    _this.m_callback.call(_this.m_callback_this, _this.m_callback_args);
                }
                else {
                    egret.error("FlyTreasure error, no callback");
                }
            }, this);
        };
        /**
         * 响应添加到场景
         * @param e
         */
        FlyTreasure.prototype.onAddToStage = function (e) {
            var parentWidth = this.parent.width - this.width;
            var parentHeight = this.parent.height - this.height;
            this.x = Math.random() * this.parent.width;
            this.alpha = 0;
            this.y = Math.random() * this.parent.height;
            var finalY = Math.random() * parentHeight;
            var m_tw = egret.Tween.get(this, { loop: false });
            m_tw.to({ x: parentWidth, y: finalY, alpha: 1 }, UtilsGame.getDistance(this.x, this.y, parentWidth, finalY) / this.m_speed).
                call(this.calFlyTween, this);
        };
        FlyTreasure.prototype.calFlyTween = function () {
            var widthRange = this.parent.width - this.width;
            var heightRange = this.parent.height - this.height;
            egret.Tween.removeTweens(this);
            var m_tw = egret.Tween.get(this, { loop: false });
            var res = [[Math.random() * widthRange, 0],
                [0, Math.random() * heightRange],
                [Math.random() * widthRange, heightRange],
                [widthRange, Math.random() * heightRange]
            ];
            var time = [
                UtilsGame.getDistance(this.x, this.y, res[0][0], res[0][1]) / this.m_speed,
                UtilsGame.getDistance(res[0][0], res[0][1], res[1][0], res[1][1]) / this.m_speed,
                UtilsGame.getDistance(res[1][0], res[1][1], res[2][0], res[2][1]) / this.m_speed,
                UtilsGame.getDistance(res[2][0], res[2][1], res[3][0], res[3][1]) / this.m_speed
            ];
            m_tw.to({ x: res[0][0], y: res[0][1] }, time[0]).
                to({ x: res[1][0], y: res[1][1] }, time[1]).
                to({ x: res[2][0], y: res[2][1] }, time[2]).
                to({ x: res[3][0], y: res[3][1] }, time[3]).
                call(this.calFlyTween, this);
        };
        FlyTreasure.prototype.onRemoveFromStage = function () {
            egret.Tween.removeTweens(this);
        };
        return FlyTreasure;
    }(eui.Component));
    ui.FlyTreasure = FlyTreasure;
    __reflect(FlyTreasure.prototype, "ui.FlyTreasure");
})(ui || (ui = {}));
//# sourceMappingURL=FlyTreasure.js.map