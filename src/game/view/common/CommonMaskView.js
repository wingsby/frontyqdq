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
    var CommonMaskView = (function (_super) {
        __extends(CommonMaskView, _super);
        function CommonMaskView() {
            return _super.call(this, "yw.CommonMaskSkin") || this;
        }
        CommonMaskView.prototype.componentCreated = function () {
        };
        CommonMaskView.prototype.onDestroy = function () {
        };
        CommonMaskView.prototype.onUpdate = function (time) {
        };
        CommonMaskView.prototype.cutMask = function (cb_enter, cb_leave, thisObj) {
            var _this = this;
            this.startMask(function () {
                if (cb_enter) {
                    cb_enter.call(thisObj);
                }
                _this.stopMask(function () {
                    if (cb_leave) {
                        cb_leave.call(thisObj);
                    }
                }, _this);
            }, this);
        };
        CommonMaskView.prototype.startMask = function (callback, thisObj) {
            this.groupRoot.alpha = 0;
            console.log("startMask: " + UtilsGame.Now());
            var tw = egret.Tween.get(this.groupRoot);
            tw.to({ alpha: 1 }, 800).call(function () {
                console.log("startMask callback: " + UtilsGame.Now());
                if (callback) {
                    callback.call(thisObj);
                }
            }, this);
        };
        CommonMaskView.prototype.stopMask = function (callback, thisObj) {
            this.alpha = 1;
            var tw = egret.Tween.get(this.groupRoot);
            tw.wait(500).to({ alpha: 0 }, 800).call(function () {
                if (callback) {
                    callback.call(thisObj);
                }
            }, this);
        };
        return CommonMaskView;
    }(BaseUI));
    ui.CommonMaskView = CommonMaskView;
    __reflect(CommonMaskView.prototype, "ui.CommonMaskView");
})(ui || (ui = {}));
//# sourceMappingURL=CommonMaskView.js.map