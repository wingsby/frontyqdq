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
    var E_SPECIAL_BOX_STATUS;
    (function (E_SPECIAL_BOX_STATUS) {
        E_SPECIAL_BOX_STATUS[E_SPECIAL_BOX_STATUS["INACTIVE"] = 0] = "INACTIVE";
        E_SPECIAL_BOX_STATUS[E_SPECIAL_BOX_STATUS["SHAKE"] = 1] = "SHAKE";
        E_SPECIAL_BOX_STATUS[E_SPECIAL_BOX_STATUS["OPEN"] = 2] = "OPEN";
        E_SPECIAL_BOX_STATUS[E_SPECIAL_BOX_STATUS["OPENED"] = 3] = "OPENED";
    })(E_SPECIAL_BOX_STATUS = ui.E_SPECIAL_BOX_STATUS || (ui.E_SPECIAL_BOX_STATUS = {}));
    /**
     * 旋转齿轮按钮控件
     */
    var SpecialBoxView = (function (_super) {
        __extends(SpecialBoxView, _super);
        function SpecialBoxView() {
            var _this = _super.call(this) || this;
            _this.last_tick_time = 0;
            _this.cur_status = E_SPECIAL_BOX_STATUS.INACTIVE;
            _this.is_shake_right = false;
            _this.skinName = "yw.comp.Special_BoxSkin";
            _this.touchEnabled = false;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        SpecialBoxView.prototype.onAddToStage = function () {
            Singleton.Get(RegisterUpdate).register(this);
        };
        SpecialBoxView.prototype.onRemoveFromStage = function () {
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        SpecialBoxView.prototype.update = function (time) {
            var delta_time = UtilsGame.Now() - this.last_tick_time;
            this.last_tick_time = UtilsGame.Now();
            if (this.cur_status == E_SPECIAL_BOX_STATUS.SHAKE) {
                this.imgClose.visible = true;
                this.imgOpen.visible = false;
                this.mcEf.visible = false;
                if (this.imgClose.rotation < -8) {
                    this.is_shake_right = true;
                }
                else if (this.imgClose.rotation > 8) {
                    this.is_shake_right = false;
                }
                if (this.is_shake_right) {
                    this.imgClose.rotation += 0.3 * delta_time;
                }
                else {
                    this.imgClose.rotation -= 0.3 * delta_time;
                }
            }
            else {
                this.imgClose.rotation = 0;
            }
            if (this.cur_status == E_SPECIAL_BOX_STATUS.OPENED) {
                this.imgClose.visible = false;
                this.imgOpen.visible = true;
                this.mcEf.visible = false;
            }
            if (this.cur_status == E_SPECIAL_BOX_STATUS.INACTIVE) {
                this.imgClose.visible = true;
                this.imgOpen.visible = false;
                this.mcEf.visible = false;
            }
        };
        /**
         * 初始化
         */
        SpecialBoxView.prototype.init = function () {
            this.cur_status = E_SPECIAL_BOX_STATUS.INACTIVE;
        };
        /**
         * 播放开启
         */
        SpecialBoxView.prototype.playOpen = function (cb, thisObj) {
            var _this = this;
            this.cur_status = E_SPECIAL_BOX_STATUS.OPEN;
            this.imgClose.visible = true;
            this.imgOpen.visible = false;
            this.mcEf.visible = false;
            this.imgClose.scaleY = 1;
            this.tw_close.to({ scaleY: 0.6 }, 60, egret.Ease.sineOut).call(function () {
                _this.imgClose.scaleY = 1;
                _this.imgClose.visible = false;
                _this.imgOpen.scaleY = 0.6;
                _this.imgOpen.visible = true;
                _this.tw_open.to({ scaleY: 1 }, 80, egret.Ease.sineOut).call(function () {
                    _this.mcEf.visible = true;
                    _this.mcEf.clearMovieClip();
                    _this.mcEf.setMovieClip("baoxiang1");
                    _this.mcEf.gotoAndPlay("baoxiang1", 1);
                    _this.tw_open.wait(800).call(function () {
                        _this.cur_status = E_SPECIAL_BOX_STATUS.OPENED;
                        if (cb) {
                            cb.call(thisObj);
                        }
                    }, _this);
                }, _this);
            }, this);
        };
        /**
         * 播放震动
         */
        SpecialBoxView.prototype.playShake = function (cb, thisObj) {
            this.cur_status = E_SPECIAL_BOX_STATUS.SHAKE;
            if (cb) {
                cb.call(thisObj);
            }
        };
        Object.defineProperty(SpecialBoxView.prototype, "tw_open", {
            get: function () {
                return egret.Tween.get(this.imgOpen);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpecialBoxView.prototype, "tw_close", {
            get: function () {
                return egret.Tween.get(this.imgClose);
            },
            enumerable: true,
            configurable: true
        });
        return SpecialBoxView;
    }(eui.Component));
    ui.SpecialBoxView = SpecialBoxView;
    __reflect(SpecialBoxView.prototype, "ui.SpecialBoxView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=SpecialBoxView.js.map