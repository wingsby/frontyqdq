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
    var BattleLvgiftAlertView = (function (_super) {
        __extends(BattleLvgiftAlertView, _super);
        function BattleLvgiftAlertView() {
            var _this = _super.call(this) || this;
            _this.m_is_replay = false;
            _this.last_tick_time = 0;
            _this.m_elapsed = 0;
            _this.m_last_countdown_time = 0;
            _this.cur_icon_res = "";
            _this.is_blink = false;
            _this.skinName = "yw.BattleLvgiftAlertSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        BattleLvgiftAlertView.prototype.onAddToStage = function (e) {
            this.labBossTxt.text = Template.getGUIText("ui_ex_main_19");
            this.labBossTxtBlink.text = Template.getGUIText("ui_ex_main_19");
            Singleton.Get(RegisterUpdate).register(this);
        };
        BattleLvgiftAlertView.prototype.onRemoveFromStage = function (e) {
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        BattleLvgiftAlertView.prototype.update = function (time) {
            this.updateBlink(time);
            this.updateCountdown(time);
        };
        BattleLvgiftAlertView.prototype.updateCountdown = function (time) {
            var delta = time - this.m_last_countdown_time;
            if (delta < 500) {
                return;
            }
            this.m_last_countdown_time = time;
            var gift_id = Singleton.Get(LvgiftManager).getInfo().getActiveGift();
            if (!gift_id) {
                // TODO 当前不存在激活的礼包
                return;
            }
            var cfg_gift = Template.lvgift.get(gift_id);
            if (!cfg_gift) {
                return;
            }
            var res_icon = cfg_gift.GiftIcon + "_png";
            if (this.cur_icon_res != res_icon) {
                this.cur_icon_res = res_icon;
                ResManager.AsyncSetTexture(this.imgRole, res_icon);
            }
            var gift_status = Singleton.Get(LvgiftManager).getInfo().getGiftStatus(gift_id);
            var now = UtilsGame.Now();
            var expired_time = Singleton.Get(LvgiftManager).getInfo().lvgift_t;
            switch (gift_status) {
                case E_LVGIFT_STATUS.HOLDING:
                    this.labCountdown.text = Template.getGUIText("ui_ex_main_20");
                    break;
                case E_LVGIFT_STATUS.ONSALE:
                    if (!cfg_gift || cfg_gift.Time != 0) {
                        var gift_delta = expired_time - now;
                        this.labCountdown.text = UtilsGame.timeToString(gift_delta);
                    }
                    else {
                        this.labCountdown.text = Template.getGUIText("ui_ex_main_21");
                    }
                    break;
                default:
                    this.labCountdown.text = "-";
                    break;
            }
        };
        BattleLvgiftAlertView.prototype.updateBlink = function (time) {
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
        BattleLvgiftAlertView.prototype.play = function () {
            this.m_is_replay = false;
            this.m_elapsed = 0;
            this.labBossTxtBlink.alpha = 0;
            var tw = egret.Tween.get(this.imgRole);
            tw.to({ scaleY: 0.97 }, 333).to({ scaleY: 1.03 }, 333);
            var tw_txt = egret.Tween.get(this.labBossTxtBlink);
            tw_txt.to({ alpha: 0.4 }, 333).to({ alpha: 0 }, 333);
        };
        BattleLvgiftAlertView.prototype.setBlick = function (is_active) {
            this.is_blink = is_active;
            this.labBossTxt.visible = is_active;
            this.labBossTxtBlink.visible = is_active;
        };
        return BattleLvgiftAlertView;
    }(eui.Component));
    ui.BattleLvgiftAlertView = BattleLvgiftAlertView;
    __reflect(BattleLvgiftAlertView.prototype, "ui.BattleLvgiftAlertView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=BattleLvgiftAlertView.js.map