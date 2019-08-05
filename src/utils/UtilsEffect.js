var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var UtilsEffect = (function () {
    function UtilsEffect() {
    }
    /**
     * 按钮效果（Async）
     */
    UtilsEffect.buttonEffectAsync = function (obj, callback, thisObj, offset) {
        var _this = this;
        if (offset === void 0) { offset = 1; }
        return new Promise(function (resolve, reject) {
            UtilsEffect.buttonEffect(obj, function () {
                resolve();
            }, _this, offset);
        });
    };
    /**
     * 按钮效果
     */
    UtilsEffect.buttonEffect = function (obj, callback, thisObj, offset) {
        if (offset === void 0) { offset = 1; }
        var tw = egret.Tween.get(obj);
        tw.to({ scaleX: 1.12 * offset, scaleY: 1.12 * offset }, 80, egret.Ease.sineOut)
            .to({ scaleX: 0.94 * offset, scaleY: 0.94 * offset }, 80, egret.Ease.sineOut)
            .to({ scaleX: 1 * offset, scaleY: 1 * offset }, 80, egret.Ease.sineOut).call(function (obj) {
            if (obj) {
                egret.Tween.removeTweens(obj);
            }
        }, obj);
        if (callback) {
            callback.call(thisObj);
        }
    };
    /**
     * 多按钮同时触发效果
     */
    UtilsEffect.buttonEffects = function (objs, callback, thisObj) {
        if (!objs) {
            return;
        }
        for (var i = 0; i < objs.length - 1; i++) {
            UtilsEffect.buttonEffect(objs[i]);
        }
        UtilsEffect.buttonEffect(objs[objs.length - 1], callback, thisObj);
    };
    /**
     * Tab按钮效果（Async）
     */
    UtilsEffect.tabEffectAsync = function (obj, callback, thisObj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            UtilsEffect.tabEffect(obj, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * Tab按钮效果
     */
    UtilsEffect.tabEffect = function (obj, callback, thisObj) {
        var tw = egret.Tween.get(obj);
        tw.to({ scaleY: 1.1 }, 80);
        tw.to({ scaleY: 0.9 }, 80);
        tw.to({ scaleY: 1 }, 80).call(function (obj) {
            if (obj != null)
                egret.Tween.removeTweens(obj);
        }, obj);
        if (callback) {
            callback.call(thisObj);
        }
    };
    /**
     * 抖动
     * @param view 抖动对象
     * @param shakeCount 抖动次数
     * @param shakeStength 抖动强度
     */
    UtilsEffect.shakeDisplayObject = function (view, shakeCount, shakeStength, view_x, view_y) {
        if (shakeCount === void 0) { shakeCount = 10; }
        if (shakeStength === void 0) { shakeStength = 5; }
        var _a = [view.x, view.y], preX = _a[0], preY = _a[1];
        if (view_x != undefined) {
            preX = view_x;
        }
        if (view_y != undefined) {
            preY = view_y;
        }
        var strength = shakeStength;
        var count = shakeCount;
        move();
        function move() {
            if (count <= 0) {
                egret.Tween.get(view).to({ x: preX, y: preY }, 10).call(function () {
                    view.x = preX;
                    view.y = preY;
                });
                return;
            }
            count--;
            var rx = Math.random() > 0.5 ? strength : -strength;
            var ry = Math.random() > 0.5 ? strength : -strength;
            egret.Tween.get(view).to({ x: preX + rx, y: preY + ry }, 10).call(move);
        }
    };
    /**
     * 正常滤镜
     */
    UtilsEffect.noFilters = function () {
        var colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        return [new egret.ColorMatrixFilter(colorMatrix)];
    };
    /**
     * 灰色滤镜
     * (webgl生效)
     * 2017/2/8 已经支持Canvas
     */
    UtilsEffect.grayFilters = function () {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        return [new egret.ColorMatrixFilter(colorMatrix)];
    };
    /**
     * 灰色滤镜
     * (webgl生效)
     * 2017/2/8 已经支持Canvas
     */
    UtilsEffect.greyFilters = function () {
        var colorMatrix = [
            0.15, 0.3, 0, 0, 0,
            0.15, 0.3, 0, 0, 0,
            0.15, 0.3, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        return [new egret.ColorMatrixFilter(colorMatrix)];
    };
    /**
     * 橙色滤镜
     */
    UtilsEffect.orangeFilters = function () {
        var colorMatrix = [
            1.45, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        return [new egret.ColorMatrixFilter(colorMatrix)];
    };
    /**
     * 紫色滤镜
     */
    UtilsEffect.purpleFilters = function () {
        var colorMatrix = [
            1.45, 0, 0, 0, 0,
            0, 0.38, 0, 0, 0,
            0, 0, 2.5, 0, 0,
            0, 0, 0, 1, 0
        ];
        return [new egret.ColorMatrixFilter(colorMatrix)];
    };
    /**
     * 红色滤镜
     */
    UtilsEffect.redFilters = function () {
        var colorMatrix = [
            1.8, 0, 0, 0, 120,
            0, 0.25, 0, 0, 0,
            0, 0, 0.3, 0, 0,
            0, 0, 0, 1, 0
        ];
        return [new egret.ColorMatrixFilter(colorMatrix)];
    };
    /**
     * 蓝色滤镜
     */
    UtilsEffect.blueFilters = function () {
        var colorMatrix = [
            0, 0, 0, 0, 0,
            0, 0.7, 0, 0, 0,
            0, 0, 11.5, 0, 20,
            0, 0, 0, 1, 0
        ];
        return [new egret.ColorMatrixFilter(colorMatrix)];
    };
    /**
     * 黑色滤镜
     */
    UtilsEffect.blackFilters = function () {
        var colorMatrix = [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        return [new egret.ColorMatrixFilter(colorMatrix)];
    };
    /**
     * 模糊滤镜
     * (webgl生效)
     * 2017/2/8 已经支持Canvas
     */
    UtilsEffect.BlurFilter = function () {
        return [new egret.BlurFilter(1, 1)];
    };
    // /// frame, alpha， width， height, scale
    // private _initData: any[] = [
    //     [1, 1, 293.35, -15.55, 38, 21],
    //     [1, 1, 293.35, -15.55, 118.45, 35.60],
    //     [4, 1, 313.60, -16.30, 69.95, 21.00],
    //     [6, 1, 313.60, -16.30, 69.95, 21.00],
    //     [10, 0, 313.60, -56.30, 69.95, 21.00]];
    /// 导出flash数据计算为tween的参数
    UtilsEffect.calcFlash = function (_initData) {
        var resArray = [];
        var initData = _initData[0];
        for (var frame = 1; frame < _initData.length; ++frame) {
            var thisdata = _initData[frame];
            var lastdata = _initData[frame - 1];
            var frameArray = [];
            frameArray.push((thisdata[0] - lastdata[0]) * 1000 / 15);
            frameArray.push((thisdata[1]));
            frameArray.push((thisdata[2] - initData[2]));
            frameArray.push((thisdata[3] - initData[3]));
            frameArray.push((thisdata[4] / initData[4]));
            frameArray.push((thisdata[5] / initData[5]));
            resArray.push(frameArray);
            console.log(frameArray);
        }
        console.log(resArray);
    };
    return UtilsEffect;
}());
__reflect(UtilsEffect.prototype, "UtilsEffect");
//# sourceMappingURL=UtilsEffect.js.map