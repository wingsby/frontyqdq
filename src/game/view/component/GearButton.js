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
     * 旋转齿轮按钮控件
     */
    var GearButton = (function (_super) {
        __extends(GearButton, _super);
        function GearButton() {
            var _this = _super.call(this) || this;
            _this.last_tick_time = 0;
            _this.is_active = false;
            _this.skinName = "yw.comp.ButtonSkin_Gear";
            _this.labText.touchEnabled = false;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        GearButton.prototype.onAddToStage = function () {
            Singleton.Get(RegisterUpdate).register(this);
            this.setActive(this.is_active); // 更新状态
            this.setMc(); // 重设播放
        };
        GearButton.prototype.onRemoveFromStage = function () {
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        GearButton.prototype.update = function (time) {
            var delta_time = UtilsGame.Now() - this.last_tick_time;
            this.last_tick_time = UtilsGame.Now();
            if (this.is_active) {
                this.imgGear.rotation += 0.15 * delta_time;
                if (this.imgGear.rotation > 360) {
                    this.imgGear.rotation = 0;
                }
                this.imgGear.validateNow();
            }
        };
        /**
         * 设定动画状态
         * @param show
         */
        GearButton.prototype.setMc = function () {
            if (this.is_active) {
                this.mcActive.visible = true;
                this.mcActive.setMovieClip(DEFINE.GEAR_BTN_EFF);
                this.mcActive.gotoAndPlay(DEFINE.GEAR_BTN_EFF, -1);
            }
            else {
                this.mcActive.visible = false;
                this.mcActive.clearMovieClip();
            }
        };
        /**
         * 设定是否激活
         * @param active
         */
        GearButton.prototype.setActive = function (active) {
            if (this.is_active == active) {
                return;
            }
            this.is_active = active;
            this.setMc();
        };
        /**
         * 设定是否有权使用
         * @param able
         */
        GearButton.prototype.setAvailable = function (able) {
            this.labRequire.visible = !able;
        };
        /**
         * 设定条件文字
         * @param text
         */
        GearButton.prototype.setRequire = function (text) {
            this.labRequire.text = text;
        };
        /**
         * 设定按钮文字
         * @param text
         */
        GearButton.prototype.setText = function (text) {
            this.labText.text = text;
        };
        return GearButton;
    }(eui.Component));
    ui.GearButton = GearButton;
    __reflect(GearButton.prototype, "ui.GearButton", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=GearButton.js.map