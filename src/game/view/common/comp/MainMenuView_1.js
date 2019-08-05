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
    var MainMenuView_1 = (function (_super) {
        __extends(MainMenuView_1, _super);
        function MainMenuView_1() {
            var _this = _super.call(this) || this;
            _this.m_last_tick = 0;
            _this.m_last_tick_icon = 0;
            _this.m_btns = [];
            _this.m_efs = [];
            _this.m_sort = [];
            _this.skinName = "yw.comp.MainSubMenu_1";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        MainMenuView_1.prototype.onAddToStage = function () {
            this.labBtn1.text = Template.getGUIText(Template.iconBtn.get(ui.E_MAIN_ICON.MONTH_CARD).Name);
            this.labBtn2.text = Template.getGUIText(Template.iconBtn.get(ui.E_MAIN_ICON.LIFETIME_CARD).Name);
            this.labBtn3.text = Template.getGUIText(Template.iconBtn.get(ui.E_MAIN_ICON.ACT_NEW).Name);
            this.labBtn4.text = Template.getGUIText(Template.iconBtn.get(ui.E_MAIN_ICON.ACT_NORMAL).Name);
            this.labBtn5.text = Template.getGUIText(Template.iconBtn.get(ui.E_MAIN_ICON.ACT_TURNPLATE).Name);
            this.labBtn6.text = Template.getGUIText(Template.iconBtn.get(ui.E_MAIN_ICON.VIP).Name);
            this.labBtn7.text = Template.getGUIText(Template.iconBtn.get(ui.E_MAIN_ICON.ACT_RANK).Name);
            this.labBtn8.text = Template.getGUIText(Template.iconBtn.get(ui.E_MAIN_ICON.PAY).Name);
            this.m_sort = Template.config.SubmenuSort1;
            this.m_btns = [this.btnMonth, this.btnLifetime, this.btnActEx, this.btnAct, this.btnTurnplate, this.btnVipSp, this.btnPay, this.btnActRank];
            this.m_efs = [this.btnMonthEf, this.btnLifetimeEf, this.btnActExEf, this.btnActEf, undefined, undefined, this.btnPayEf, undefined];
            this.btnMonth.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnMonth, this);
            this.btnLifetime.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLifetime, this);
            this.btnActEx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnActEx, this);
            this.btnAct.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAct, this);
            this.btnTurnplate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTurnplate, this);
            this.btnVipSp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnVipSp, this);
            this.btnPay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnPay, this);
            this.btnActRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnActRank, this);
            Singleton.Get(RegisterUpdate).register(this);
        };
        MainMenuView_1.prototype.onRemoveFromStage = function () {
            this.btnMonth.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnMonth, this);
            this.btnLifetime.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLifetime, this);
            this.btnActEx.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnActEx, this);
            this.btnAct.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAct, this);
            this.btnTurnplate.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTurnplate, this);
            this.btnVipSp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnVipSp, this);
            this.btnPay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnPay, this);
            this.btnActRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnActRank, this);
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        MainMenuView_1.prototype.update = function () {
            var now = UtilsGame.Now();
            var is_icon_refresh = (now - this.m_last_tick_icon > DEFINE.ICON_MAIN_UPDATE_DURATION);
            if (now - UtilsGame.server_now < DEFINE.ICON_MAIN_UPDATE_DURATION * 20) {
                is_icon_refresh = (now - this.m_last_tick_icon > DEFINE.ICON_MAIN_UPDATE_DURATION / 20);
            }
            if (is_icon_refresh) {
                this.m_last_tick_icon = now;
                this.validateActivity();
                this.refreshBtnVipSpNew();
                this.sortIcons();
            }
        };
        // region 状态设置
        MainMenuView_1.prototype.setMonthActive = function (is_active) {
            if (is_active) {
                this.mcMonth.scaleX = 0.8;
                this.mcMonth.scaleY = 0.8;
                this.mcMonth.clearMovieClip();
                this.mcMonth.setMovieClip("ui_month");
                this.mcMonth.gotoAndPlay("ui_month", -1);
            }
            else {
                this.mcMonth.clearMovieClip();
            }
            this.efMonth.visible = is_active;
        };
        MainMenuView_1.prototype.setLifetimeActive = function (is_active) {
            if (is_active) {
                this.mcLifetime.scaleX = 0.8;
                this.mcLifetime.scaleY = 0.8;
                this.mcLifetime.clearMovieClip();
                this.mcLifetime.setMovieClip("ui_month");
                this.mcLifetime.gotoAndPlay("ui_month", -1);
            }
            else {
                this.mcLifetime.clearMovieClip();
            }
            this.efLifetime.visible = is_active;
        };
        MainMenuView_1.prototype.setActActive = function (is_active) {
            if (is_active) {
                this.mcAct.scaleX = 0.8;
                this.mcAct.scaleY = 0.8;
                this.mcAct.clearMovieClip();
                this.mcAct.setMovieClip("ui_month");
                this.mcAct.gotoAndPlay("ui_month", -1);
            }
            else {
                this.mcAct.clearMovieClip();
            }
            this.efAct.visible = is_active;
        };
        MainMenuView_1.prototype.setActNew = function (is_new) {
            this.imgActNew.visible = is_new;
        };
        MainMenuView_1.prototype.setActExActive = function (is_active) {
            if (is_active) {
                this.mcActEx.scaleX = 0.8;
                this.mcActEx.scaleY = 0.8;
                this.mcActEx.clearMovieClip();
                this.mcActEx.setMovieClip("ui_month");
                this.mcActEx.gotoAndPlay("ui_month", -1);
            }
            else {
                this.mcActEx.clearMovieClip();
            }
            this.efActEx.visible = is_active;
        };
        MainMenuView_1.prototype.setActExNew = function (is_new) {
            this.imgActExNew.visible = is_new;
        };
        MainMenuView_1.prototype.refreshBtnVipSpNew = function () {
            this.imgVipSpNew.visible = Singleton.Get(PrivManager).getInfo().hasAnyVipGiftAvailable();
        };
        MainMenuView_1.prototype.setPayActive = function (is_active) {
            if (is_active) {
                this.mcPay.scaleX = 0.8;
                this.mcPay.scaleY = 0.8;
                this.mcPay.clearMovieClip();
                this.mcPay.setMovieClip("ui_month");
                this.mcPay.gotoAndPlay("ui_month", -1);
            }
            else {
                this.mcPay.clearMovieClip();
            }
            this.efPay.visible = is_active;
        };
        // endregion
        MainMenuView_1.prototype.onClick_btnMonth = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnMonth, function () {
                Singleton.Get(ui.PrivMonthView).open();
                _this.setMonthActive(false);
            }, this);
        };
        MainMenuView_1.prototype.onClick_btnLifetime = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnLifetime, function () {
                Singleton.Get(ui.PrivLifetimeView).open();
                _this.setLifetimeActive(false);
            }, this);
        };
        MainMenuView_1.prototype.onClick_btnAct = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnAct, function () {
                Singleton.Get(ui.ActivityView).open(E_ACT_TYPE.BASIC);
                _this.setActActive(false);
            }, this);
        };
        MainMenuView_1.prototype.onClick_btnActEx = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnActEx, function () {
                Singleton.Get(ui.ActivityView).open(E_ACT_TYPE.BEGIN);
                _this.setActExActive(false);
            }, this);
        };
        MainMenuView_1.prototype.onClick_btnVipSp = function () {
            UtilsEffect.buttonEffect(this.btnVipSp, function () {
                Singleton.Get(LayerManager).getView(ui.VipView).open();
            }, this);
        };
        MainMenuView_1.prototype.onClick_btnTurnplate = function () {
            UtilsEffect.buttonEffect(this.btnTurnplate, function () {
                Singleton.Get(ui.ActivityView).open(E_ACT_TYPE.BASIC, [E_ACT_DESIGN_TYPE.DmdPlate]);
            }, this);
        };
        MainMenuView_1.prototype.onClick_btnPay = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnPay, function () {
                Singleton.Get(ui.PayView).open();
                _this.setPayActive(false);
            }, this);
        };
        MainMenuView_1.prototype.onClick_btnActRank = function () {
            UtilsEffect.buttonEffect(this.btnActRank, function () {
                Singleton.Get(ui.ActivityView).open(E_ACT_TYPE.BEGIN, [E_ACT_DESIGN_TYPE.LvRank, E_ACT_DESIGN_TYPE.PveRank]);
            }, this);
        };
        /**
         * 根据活动开启情况显示活动图标
         */
        MainMenuView_1.prototype.validateActivity = function () {
            if (ActivityUtil.isTypeOpen(E_ACT_TYPE.BEGIN)) {
                this.btnActEx.visible = true;
            }
            else {
                this.btnActEx.visible = false;
                this.btnActExEf.visible = false;
            }
            if (ActivityUtil.isTypeOpen(E_ACT_TYPE.BASIC)) {
                this.btnAct.visible = true;
            }
            else {
                this.btnAct.visible = true;
                this.btnActEf.visible = false;
            }
            if (ActivityUtil.isActOpen(E_ACT_DESIGN_TYPE.LvRank).open || ActivityUtil.isActOpen(E_ACT_DESIGN_TYPE.PveRank).open) {
                this.btnActRank.visible = true;
            }
            else {
                this.btnActRank.visible = false;
            }
            if (ActivityUtil.isActOpen(E_ACT_DESIGN_TYPE.DmdPlate).open) {
                this.btnTurnplate.visible = true;
                this.imgTurnplateNew.visible = Singleton.Get(ActivityManager).getAlarm().isAlarm(E_ACT_DESIGN_TYPE.DmdPlate);
            }
            else {
                this.btnTurnplate.visible = false;
            }
        };
        MainMenuView_1.prototype.sortIcons = function () {
            var rule = this.m_sort;
            if (rule.length != this.m_btns.length) {
                console.error("can't sort icons, rule is illegal.");
                return;
            }
            var order = 0;
            for (var i = 0; i < this.m_btns.length; i++) {
                var idx = this.getBtnIdx(rule[i]);
                if (idx < 0 || idx > this.m_btns.length - 1) {
                    continue;
                }
                var target = this.m_btns[idx];
                if (!target.visible) {
                    continue;
                }
                target.x = 29 + 58 * order;
                var target_ef = this.m_efs[idx];
                if (target_ef) {
                    target_ef.x = target.x;
                }
                order++;
            }
        };
        MainMenuView_1.prototype.getBtnIdx = function (type) {
            return type - 1;
        };
        return MainMenuView_1;
    }(eui.Component));
    ui.MainMenuView_1 = MainMenuView_1;
    __reflect(MainMenuView_1.prototype, "ui.MainMenuView_1", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=MainMenuView_1.js.map