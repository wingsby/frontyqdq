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
     * 用于UI的MovieClip
     */
    var UIMovieClip = (function (_super) {
        __extends(UIMovieClip, _super);
        /**
         * 构造函数
         */
        function UIMovieClip() {
            var _this = _super.call(this) || this;
            _this.m_clip = null;
            _this.cur_frame = ""; // 当前播放动画帧名
            _this.m_isOnStage = false;
            _this.callback = null;
            _this.callbackThisObj = null;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        /**
         * 响应添加到舞台
         * @param e
         */
        UIMovieClip.prototype.onAddToStage = function (e) {
            if (this.m_clip != null) {
                this.addChild(this.m_clip);
            }
            this.m_isOnStage = true;
            this.touchEnabled = false;
        };
        /**
         * 响应从舞台移除
         * @param e
         */
        UIMovieClip.prototype.onRemoveFromStage = function (e) {
            if (this.m_clip != null) {
                this.removeChild(this.m_clip);
            }
            this.m_isOnStage = false;
        };
        /**
         * 设置动画
         * @param mcName
         */
        UIMovieClip.prototype.setMovieClip = function (mcName) {
            this.clearMovieClip();
            if (this.m_clip == null) {
                this.m_clip = new BaseMovieClip(mcName);
                this.m_clip.addEventListener(egret.Event.COMPLETE, this.onLoopComplete, this);
            }
            else {
                this.m_clip.ReloadRes(mcName);
            }
            this.addChild(this.m_clip);
        };
        /**
         * 播放指定动画
         * @param frame
         * @param playTimes
         */
        UIMovieClip.prototype.gotoAndPlay = function (frame, playTimes) {
            if (playTimes === void 0) { playTimes = -1; }
            if (!this.m_clip) {
                return;
            }
            this.cur_frame = frame;
            this.m_clip.gotoAndPlay(frame, playTimes);
        };
        /**
         * 停止指定动画
         * @param frame
         */
        UIMovieClip.prototype.gotoAndStop = function (frame) {
            if (!this.m_clip) {
                return;
            }
            this.cur_frame = frame;
            this.m_clip.gotoAndStop(frame);
        };
        /**
         * 清理现有的动画
         */
        UIMovieClip.prototype.clearMovieClip = function () {
            if (this.m_clip != null && this.m_isOnStage) {
                this.removeChild(this.m_clip);
                this.m_clip.removeEventListener(egret.Event.COMPLETE, this.onLoopComplete, this);
                this.m_clip = null;
                this.cur_frame = "";
            }
        };
        /**
         * 响应一次播放完成
         * @param e
         */
        UIMovieClip.prototype.onLoopComplete = function (e) {
            if (this.callback != null) {
                this.callback.call(this.callbackThisObj);
            }
        };
        /**
         * 设定每次播放完成回调
         * @param callback
         * @param thisObj
         */
        UIMovieClip.prototype.setCallback = function (callback, thisObj) {
            if (thisObj === void 0) { thisObj = null; }
            this.callback = callback;
            this.callbackThisObj = thisObj;
        };
        /**
         * 析构函数（手动调用）
         */
        UIMovieClip.prototype.dispose = function () {
            this.m_clip.removeEventListener(egret.Event.COMPLETE, this.onLoopComplete, this);
            this.m_clip = null;
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        /**
         * 设定缩放
         * @param scale
         */
        UIMovieClip.prototype.setScale = function (scale) {
            this.m_clip.scaleX = scale;
            this.m_clip.scaleY = scale;
        };
        return UIMovieClip;
    }(eui.Component));
    ui.UIMovieClip = UIMovieClip;
    __reflect(UIMovieClip.prototype, "ui.UIMovieClip");
})(ui || (ui = {}));
//# sourceMappingURL=UIMovieClip.js.map