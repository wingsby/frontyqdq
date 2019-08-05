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
    var BattleBossAlertView = (function (_super) {
        __extends(BattleBossAlertView, _super);
        function BattleBossAlertView() {
            var _this = _super.call(this) || this;
            _this.m_is_replay = false;
            _this.last_tick_time = 0;
            _this.m_elapsed = 0;
            _this.is_img1_ok = false;
            _this.is_img2_ok = false;
            _this.is_img3_ok = false;
            _this.is_blink = false;
            _this.skinName = "yw.BattleBossAlertSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        BattleBossAlertView.prototype.onAddToStage = function (e) {
            this.labBossTxt.text = Template.getGUIText("ui_ex_main_14");
            this.labBossTxtBlink.text = Template.getGUIText("ui_ex_main_14");
            Singleton.Get(RegisterUpdate).register(this);
        };
        BattleBossAlertView.prototype.onRemoveFromStage = function (e) {
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        BattleBossAlertView.prototype.update = function (time) {
            if (!this.is_blink) {
                return;
            }
            var delta = time - this.last_tick_time;
            this.last_tick_time = time;
            if (delta > DEFINE.FRAME_TIME_TOLERANCE_LIMIT) {
                delta = DEFINE.FRAME_TIME_TOLERANCE_REPLACE;
            }
            if (this.m_is_replay) {
                this.play();
            }
            this.m_elapsed = this.m_elapsed + delta;
            if (this.m_elapsed > 666) {
                this.m_is_replay = true;
            }
        };
        BattleBossAlertView.prototype.play = function () {
            this.m_is_replay = false;
            this.m_elapsed = 0;
            this.is_img1_ok = false;
            this.is_img2_ok = false;
            this.is_img3_ok = false;
            this.labBossTxtBlink.alpha = 0;
            var tw = egret.Tween.get(this.imgRole);
            tw.to({ scaleY: 0.97 }, 333).to({ scaleY: 1.03 }, 333);
            var tw_alert = egret.Tween.get(this.groupAlert);
            tw_alert.to({ scaleX: 0.88, scaleY: 0.88 }, 333).to({ scaleX: 1, scaleY: 1 }, 333);
            var tw_txt = egret.Tween.get(this.labBossTxtBlink);
            tw_txt.to({ alpha: 0.4 }, 333).to({ alpha: 0 }, 333);
        };
        BattleBossAlertView.prototype.setBlick = function (is_active) {
            this.is_blink = is_active;
            this.img1.visible = is_active;
            this.img2.visible = is_active;
            this.img3.visible = is_active;
            this.labBossTxt.visible = is_active;
            this.labBossTxtBlink.visible = is_active;
            // this.labBossTxtInactive.visible = !is_active;
        };
        return BattleBossAlertView;
    }(eui.Component));
    ui.BattleBossAlertView = BattleBossAlertView;
    __reflect(BattleBossAlertView.prototype, "ui.BattleBossAlertView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=BattleBossAlertView.js.map