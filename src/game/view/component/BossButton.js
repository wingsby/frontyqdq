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
    var E_BTN_BOSS_STATUS;
    (function (E_BTN_BOSS_STATUS) {
        E_BTN_BOSS_STATUS[E_BTN_BOSS_STATUS["PRO_0"] = 0] = "PRO_0";
        E_BTN_BOSS_STATUS[E_BTN_BOSS_STATUS["PRO_1"] = 1] = "PRO_1";
        E_BTN_BOSS_STATUS[E_BTN_BOSS_STATUS["ACTIVE"] = 2] = "ACTIVE";
    })(E_BTN_BOSS_STATUS = ui.E_BTN_BOSS_STATUS || (ui.E_BTN_BOSS_STATUS = {}));
    /**
     * 挑战BOSS按钮控件
     */
    var BossButton = (function (_super) {
        __extends(BossButton, _super);
        function BossButton() {
            var _this = _super.call(this) || this;
            _this.last_tick_time = 0;
            _this.skinName = "yw.comp.Special_BtnBoss";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        BossButton.prototype.createMask = function () {
            var radius = 180;
            this.spMask = new egret.Shape();
            this.spMask.x = -radius;
            this.spMask.y = 45;
            this.spMask.graphics.beginFill(0x000000, 1);
            this.spMask.graphics.drawCircle(0, 0, radius);
            this.spMask.graphics.endFill();
            this.addChild(this.spMask);
            this.mcBg.mask = this.spMask;
        };
        BossButton.prototype.onAddToStage = function () {
            // 注册帧更新
            Singleton.Get(RegisterUpdate).register(this);
            // 如果没有遮罩 创建遮罩
            if (!this.spMask) {
                this.createMask();
            }
            // 背景设为灰色
            // this.imgBgBack.filters = UtilsEffect.grayFilters();
            this.mcBgBack.filters = UtilsEffect.greyFilters();
            this.setMc(); // 重设播放
        };
        BossButton.prototype.onRemoveFromStage = function () {
            // 注销帧更新
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        BossButton.prototype.update = function (time) {
            var delta_time = UtilsGame.Now() - this.last_tick_time;
            this.last_tick_time = UtilsGame.Now();
        };
        /**
         * 设定动画状态
         * @param show
         */
        BossButton.prototype.setMc = function () {
            this.mcBg.visible = true;
            this.mcBgBack.visible = true;
        };
        BossButton.prototype.playMc = function () {
            var _this = this;
            this.mcBg.setMovieClip(DEFINE.EFF_BATTLE_CHALLENGE);
            this.mcBg.setCallback(function () {
                _this.mcBg.gotoAndPlay(DEFINE.EFF_BATTLE_CHALLENGE, -1);
            }, this);
            this.mcBgBack.setMovieClip(DEFINE.EFF_BATTLE_CHALLENGE);
            this.mcBgBack.setCallback(function () {
                _this.mcBgBack.gotoAndPlay(DEFINE.EFF_BATTLE_CHALLENGE, -1);
            }, this);
            try {
                this.mcBg.gotoAndPlay(DEFINE.EFF_BATTLE_CHALLENGE, -1);
                this.mcBgBack.gotoAndPlay(DEFINE.EFF_BATTLE_CHALLENGE, -1);
            }
            catch (e) {
            }
        };
        BossButton.prototype.stopMc = function () {
            var _this = this;
            this.mcBg.setMovieClip(DEFINE.EFF_BATTLE_CHALLENGE);
            this.mcBg.setCallback(function () {
                _this.mcBg.gotoAndStop(DEFINE.EFF_BATTLE_CHALLENGE);
            }, this);
            this.mcBgBack.setMovieClip(DEFINE.EFF_BATTLE_CHALLENGE);
            this.mcBgBack.setCallback(function () {
                _this.mcBgBack.gotoAndStop(DEFINE.EFF_BATTLE_CHALLENGE);
            }, this);
            try {
                this.mcBg.gotoAndStop(DEFINE.EFF_BATTLE_CHALLENGE);
                this.mcBgBack.gotoAndStop(DEFINE.EFF_BATTLE_CHALLENGE);
            }
            catch (e) {
            }
        };
        /**
         * 设定按钮状态
         * @param status
         */
        BossButton.prototype.setProgress = function (status, callback, thisObj) {
            if (!this.spMask) {
                this.createMask();
            }
            var mask_x = 0;
            switch (status) {
                case E_BTN_BOSS_STATUS.PRO_1:
                    this.imgTxt.visible = false;
                    this.imgTxtWait.visible = true;
                    this.stopMc();
                    mask_x = 90;
                    break;
                case E_BTN_BOSS_STATUS.ACTIVE:
                    this.imgTxt.visible = true;
                    this.imgTxtWait.visible = false;
                    this.playMc();
                    mask_x = 240;
                    break;
                default:
                    this.imgTxt.visible = false;
                    this.imgTxtWait.visible = true;
                    this.stopMc();
                    mask_x = -90;
                    break;
            }
            if (this.spMask.x != (-180 + mask_x)) {
                var tw_mask = egret.Tween.get(this.spMask);
                tw_mask.to({ x: -180 + mask_x }, 1200, egret.Ease.sineOut);
                var tw_root = egret.Tween.get(this.groupRoot);
                tw_root.wait(600).call(function () {
                    if (callback) {
                        callback.call(thisObj);
                    }
                }, this);
            }
        };
        return BossButton;
    }(eui.Component));
    ui.BossButton = BossButton;
    __reflect(BossButton.prototype, "ui.BossButton", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=BossButton.js.map