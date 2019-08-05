/**
 * 简单序列帧动画,要求Json文件名，图名，目录名全部相同
 * 均由ActionManager来管理
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RenderOperator;
(function (RenderOperator) {
    RenderOperator[RenderOperator["gotoAndPlay"] = 0] = "gotoAndPlay";
    RenderOperator[RenderOperator["stop"] = 1] = "stop";
    RenderOperator[RenderOperator["play"] = 2] = "play";
})(RenderOperator || (RenderOperator = {}));
var BaseMovieClip = (function (_super) {
    __extends(BaseMovieClip, _super);
    /**
     * @param {string} mcName 动画名称
     * @param {string} mcJson 动画JSON
     * @param {string} textureName 动画图集
     */
    function BaseMovieClip(mcName, mcJson, textureName, callback, thisObj) {
        var _this = _super.call(this) || this;
        _this.AsyncOperatorList = [];
        _this.jsonData = null;
        _this.texName = undefined;
        _this.m_res_callback = null;
        _this.m_res_callback_this = null;
        _this.zorderAdd = 0;
        _this.m_acc_time = 0;
        //////////////////////////////////----------------------------------BLINK
        _this.m_bPlayColorFilter = false;
        _this.m_blinkFilter = null;
        _this.m_initLightValue = 1;
        _this.m_colorMatrix = [
            1, 0, 0, 0, 1,
            0, 1, 0, 0, 1,
            0, 0, 1, 0, 1,
            0, 0, 0, 1, 0
        ];
        _this.ReloadRes(mcName, mcJson, textureName, callback, thisObj);
        return _this;
    }
    BaseMovieClip.prototype.ReloadRes = function (mcName, mcJson, textureName, callback, thisObj) {
        if (mcName != undefined && mcName != "") {
            /// 清空原始的movieClipData
            this.movieClipData = null;
            this.AsyncOperatorList.length = 0;
            var jsonName = (mcJson == undefined ? mcName : mcJson) + "_json";
            this.texName = (textureName == undefined ? mcName : textureName) + "_png";
            this.name = mcName;
            ResManager.getResAsync(jsonName, this.onJsonLoadComplete, this);
            this.m_res_callback = callback;
            this.m_res_callback_this = thisObj;
        }
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    /// json异步加载回调
    BaseMovieClip.prototype.onJsonLoadComplete = function (res, jsonName) {
        this.jsonData = res;
        if (this.jsonData == null) {
            egret.error("can't get res" + jsonName);
        }
        // console.log("role json_res loaded: " + jsonName);
        ResManager.getResAsync(this.texName, this.onTexLoadComplete, this);
    };
    /// 贴图加载结束回调
    BaseMovieClip.prototype.onTexLoadComplete = function (snd, mcName) {
        this.movieClipData = (Singleton.Get(ActionResManager).getAcData(this.name));
        if (this.movieClipData != null) {
            this.processAsyncOperator();
            if (this.m_res_callback != null) {
                // console.log("role mc_res loaded: " + mcName);
                this.m_res_callback.call(this.m_res_callback_this);
            }
        }
        else {
            console.error("role mc_res no mcData: " + mcName);
        }
    };
    /// 处理渲染相关的异步操作
    BaseMovieClip.prototype.processAsyncOperator = function () {
        var _this = this;
        this.AsyncOperatorList.forEach(function (element) {
            var op = element[0];
            switch (op) {
                case RenderOperator.gotoAndPlay:
                    _super.prototype.gotoAndPlay.call(_this, element[1], element[2]);
                    break;
                case RenderOperator.stop:
                    _super.prototype.stop.call(_this);
                    break;
                case RenderOperator.play:
                    _super.prototype.play.call(_this, element[1]);
                    break;
                default:
                    break;
            }
        });
        this.AsyncOperatorList.length = 0;
    };
    /// 渲染相关的异步处理  override
    BaseMovieClip.prototype.gotoAndPlay = function (frame, playTimes) {
        if (this.movieClipData != null) {
            _super.prototype.gotoAndPlay.call(this, frame, playTimes);
        }
        else {
            this.AsyncOperatorList.push([RenderOperator.gotoAndPlay, frame, playTimes]);
        }
    };
    /// override 支持异步处理
    BaseMovieClip.prototype.stop = function () {
        if (this.movieClipData != null) {
            _super.prototype.stop.call(this);
        }
        else {
            this.AsyncOperatorList.push([RenderOperator.stop]);
        }
    };
    /// override 支持异步处理
    BaseMovieClip.prototype.play = function (playTimes) {
        if (this.movieClipData != null) {
            _super.prototype.play.call(this, playTimes);
        }
        else {
            this.AsyncOperatorList.push([RenderOperator.play, playTimes]);
        }
    };
    /**
     * 响应加入场景
     * @param e
     */
    BaseMovieClip.prototype.onAddToStage = function (e) {
        // 重置场景
        Singleton.Get(RegisterUpdate).register(this);
    };
    /**
     * 响应从场景中删除
     * @param e
     */
    BaseMovieClip.prototype.onRemoveFromStage = function (e) {
        Singleton.Get(RegisterUpdate).unRegister(this);
    };
    /////////////////////////////////////////////////////----------------------------------zorder
    /**获取zorder排序值 */
    BaseMovieClip.prototype.getZorder = function () {
        return this.zorderAdd + this.y;
    };
    BaseMovieClip.prototype.setMaskZorder = function (b) {
        if (b) {
            this.zorderAdd = SORT_CONST.ZOREDER_EFFECT_MAX;
        }
        else {
            this.zorderAdd = 0;
        }
    };
    BaseMovieClip.prototype.update = function (time) {
        if (this.m_acc_time == 0) {
            this.m_acc_time = time;
            return;
        }
        var delta_t = time - this.m_acc_time;
        this.m_acc_time = time;
        // if (this.m_pause)
        //     {
        //         return;
        //     }
        this.UpdateColorFilter(delta_t);
    };
    //////////////////////////////////////////////----------------------FADE
    BaseMovieClip.prototype.fadeIn = function (duration) {
        var tw = egret.Tween.get(this);
        tw.to({ alpha: 0 }, duration);
    };
    BaseMovieClip.prototype.fadeOut = function (duration) {
        var tw = egret.Tween.get(this);
        tw.to({ alpha: 1 }, duration);
    };
    //  redResult   = (a[0] * srcR)  + (a[1] * srcG)  + (a[2] * srcB)  + (a[3] * srcA)  + a[4];
    //  greenResult = (a[5] * srcR)  + (a[6] * srcG)  + (a[7] * srcB)  + (a[8] * srcA)  + a[9];
    //  blueResult  = (a[10] * srcR) + (a[11] * srcG) + (a[12] * srcB) + (a[13] * srcA) + a[14];
    //  alphaResult = (a[15] * srcR) + (a[16] * srcG) + (a[17] * srcB) + (a[18] * srcA) + a[19];
    BaseMovieClip.prototype.CreateBlinkColorFilter = function () {
        this.m_blinkFilter = new egret.ColorMatrixFilter(this.m_colorMatrix);
    };
    BaseMovieClip.prototype.playBlinkColorFilter = function (blinkTime, stay, unBlinkTime, maxLight) {
        if (maxLight === void 0) { maxLight = 224; }
        this.ResetPlayBlinkColorFilter();
        if (this.m_blinkFilter == null) {
            this.CreateBlinkColorFilter();
        }
        this.m_blinkFilter.matrix = this.m_colorMatrix;
        this.filters = [this.m_blinkFilter];
        /// 开始播放
        this.m_bPlayColorFilter = true;
        var tween = egret.Tween.get(this);
        tween.to({ initLightValue: maxLight }, blinkTime)
            .wait(stay)
            .to({ initLightValue: 1 }, unBlinkTime).call(this.ResetPlayBlinkColorFilter, this);
    };
    BaseMovieClip.prototype.ResetPlayBlinkColorFilter = function () {
        egret.Tween.removeTweens(this);
        this.m_bPlayColorFilter = false;
        this.m_initLightValue = 1;
        this.m_colorMatrix[4] = this.m_initLightValue;
        this.m_colorMatrix[9] = this.m_initLightValue;
        this.m_colorMatrix[14] = this.m_initLightValue;
        if (this.filters != null)
            this.filters.length = 0;
    };
    BaseMovieClip.prototype.UpdateColorFilter = function (deltatime) {
        if (this.m_bPlayColorFilter) {
            this.processMatrix();
        }
    };
    Object.defineProperty(BaseMovieClip.prototype, "initLightValue", {
        get: function () {
            return this.m_initLightValue;
        },
        set: function (value) {
            this.m_initLightValue = value;
        },
        enumerable: true,
        configurable: true
    });
    BaseMovieClip.prototype.processMatrix = function () {
        this.m_blinkFilter.matrix[4] = 100; //this.m_initLightValue;
        this.m_colorMatrix[4] = this.m_initLightValue;
        this.m_colorMatrix[9] = this.m_initLightValue;
        this.m_colorMatrix[14] = this.m_initLightValue;
        this.m_blinkFilter.matrix = this.m_colorMatrix;
    };
    return BaseMovieClip;
}(egret.MovieClip));
__reflect(BaseMovieClip.prototype, "BaseMovieClip", ["IUpdate", "ISortElement"]);
//# sourceMappingURL=BaseMovieClip.js.map