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
    var WishView = (function (_super) {
        __extends(WishView, _super);
        function WishView() {
            return _super.call(this, "yw.WishSkin") || this;
        }
        WishView.prototype.componentCreated = function () {
            this.tabWish.active = false;
            this.tabWish.text = Template.getGUIText("ui_wish1");
            this.labLevelupTxt.text = Template.getGUIText("ui_wish4");
            this.labChangeTxt.text = Template.getGUIText("ui_wish5");
            this.labStaminaTxt.text = Template.getGUIText("ui_wish6");
            this.labWishTxt.text = Template.getGUIText("ui_wish1");
            this.labWishOnekeyTxt.text = Template.getGUIText("ui_wish7");
            this.labTip.text = Template.getGUIText("ui_wish12");
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnLevelup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLevelup, this);
            this.btnChangeEmpty.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange, this);
            this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange, this);
            this.btnWish.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnWish, this);
            this.btnWishOnekey.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnWishOnekey, this);
        };
        WishView.prototype.onDestroy = function () {
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnLevelup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLevelup, this);
            this.btnChangeEmpty.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange, this);
            this.btnChange.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange, this);
            this.btnWish.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnWish, this);
            this.btnWishOnekey.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnWishOnekey, this);
        };
        WishView.prototype.onUpdate = function (time) {
        };
        WishView.prototype.open = function () {
            var _this = this;
            Singleton.Get(LayerManager).getView(ui.SyncLoadingView).open(DEFINE.SYNC_LOADING_DURATION);
            ResManager.getResAsync("bg_wishing_png", function () {
                var layer = Singleton.Get(LayerManager);
                layer.getView(ui.SyncLoadingView).cancleOpen();
                layer.getView(ui.MainView).showSchoolSubPanel();
                layer.getView(ui.SchoolView).close();
                layer.addView(_this);
                _this.initView();
                _this.playInitAni();
            }, this);
        };
        WishView.prototype.close = function () {
            if (Singleton.Get(LayerManager).isViewOnStage(this)) {
                Singleton.Get(LayerManager).removeView(this);
            }
        };
        WishView.prototype.refresh = function () {
            this.initView();
        };
        WishView.prototype.initView = function () {
            var info = Singleton.Get(WishManager).getInfo();
            // 许愿基本信息
            var wish_lv = info.lv; // 当前许愿等级
            var wish_chip = Template.config.WishChip; // 许愿一次能够获得的碎片数量
            // 获取许愿等级信息
            var cfg_wish = Template.wish.get(wish_lv);
            if (!cfg_wish) {
                return;
            }
            // 能量相关信息
            var cur_stamina = info.stamina; // 当前剩余能量
            var max_stamina = cfg_wish.WishMax; // 最大能量
            var stamina_prog = cur_stamina / max_stamina * 100; // 剩余能量百分比
            // 获取角色信息
            var role_id = info.role_id;
            var cfg_role = Template.role.get(role_id);
            if (cfg_role && cfg_role.Wish) {
                this.groupCard.visible = true;
                Common.fillRoleCard(role_id, this.compCard);
                this.btnChange.visible = true;
                this.btnChangeEmpty.visible = false;
                this.groupGet.visible = true;
                var stamina_cost = cfg_role.WishCost; // 许愿一次需要消耗的能量
                var stamina_cost_onekey = info.getOnekeyWishStaminaPrice(); // 一键许愿需要消耗的能量
                this.labWishCost.text = UtilsGame.stringHander(Template.getGUIText("ui_wish8"), stamina_cost);
                this.labWishCost.textColor = (cur_stamina >= stamina_cost) ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED;
                this.labWishOnekeyCost.text = UtilsGame.stringHander(Template.getGUIText("ui_wish8"), stamina_cost_onekey);
                this.labWishOnekeyCost.textColor = (cur_stamina >= stamina_cost) ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED;
            }
            else {
                this.groupCard.visible = false;
                this.btnChange.visible = false;
                this.btnChangeEmpty.visible = true;
                this.groupGet.visible = false;
                this.labWishCost.text = UtilsGame.stringHander(Template.getGUIText("ui_wish8"), 0);
                this.labWishOnekeyCost.text = UtilsGame.stringHander(Template.getGUIText("ui_wish8"), 0);
            }
            // 许愿满级时隐藏升级按钮
            this.btnLevelup.visible = !!Template.wish.get(wish_lv + 1);
            // 数据与控件关联
            this.labWishLv.text = UtilsGame.stringHander(Template.getGUIText("ui_wish9"), wish_lv);
            this.labGet.text = UtilsGame.stringHander(Template.getGUIText("ui_wish10"), wish_chip);
            this.labStamina.text = UtilsGame.stringHander(Template.getGUIText("ui_wish11"), cur_stamina, max_stamina);
            this.progStamina.value = stamina_prog;
        };
        WishView.prototype.playInitAni = function () {
            Common.playStackAni(this.btnBack, [this.tabWish]);
            this.groupWishLV.alpha = 0;
            this.groupWishLV.y = 40;
            var tw_lv = egret.Tween.get(this.groupWishLV);
            tw_lv.to({ alpha: 1, y: 20 }, 300, egret.Ease.sineOut);
            this.btnLevelup.alpha = 1;
            this.groupTip.alpha = 1;
            this.playCardAni(function () {
            }, this);
        };
        WishView.prototype.playCardAni = function (callback, thisObj) {
            this.compCard.scaleX = 1.3;
            this.compCard.scaleY = 1.3;
            var tw_card = egret.Tween.get(this.compCard);
            tw_card.to({ scaleX: 1, scaleY: 1 }, 160, egret.Ease.sineOut);
            this.btnChange.alpha = 0;
            this.btnChange.y = 320;
            var tw_change = egret.Tween.get(this.btnChange);
            tw_change.wait(160).to({ alpha: 1, y: 300 }, 300, egret.Ease.sineOut);
            this.groupGet.alpha = 0;
            this.groupGet.y = 380;
            var tw_get = egret.Tween.get(this.groupGet);
            tw_get.wait(160).to({ alpha: 1, y: 360 }, 300, egret.Ease.sineOut);
            this.groupStamina.alpha = 0;
            this.groupStamina.y = 424;
            var tw_stamina = egret.Tween.get(this.groupStamina);
            tw_stamina.wait(240).to({ alpha: 1, y: 404 }, 300, egret.Ease.sineOut);
            this.groupOper.alpha = 0;
            this.groupOper.y = 466;
            var tw_oper = egret.Tween.get(this.groupOper);
            tw_oper.wait(320).to({ alpha: 1, y: 446 }, 300, egret.Ease.sineOut).call(function () {
                if (callback) {
                    callback.call(thisObj);
                }
            }, this);
        };
        // region 按钮点击事件
        WishView.prototype.onClick_btnLevelup = function () {
            UtilsEffect.buttonEffect(this.btnLevelup, function () {
                Singleton.Get(LayerManager).getView(ui.WishLevelupView).open();
            }, this);
        };
        WishView.prototype.onClick_btnChange = function (e) {
            if (e.currentTarget != this.btnChange) {
                Singleton.Get(LayerManager).getView(ui.WishSelHeroView).open();
            }
            else {
                UtilsEffect.buttonEffect(this.btnChange, function () {
                    Singleton.Get(LayerManager).getView(ui.WishSelHeroView).open();
                }, this);
            }
        };
        WishView.prototype.onClick_btnWish = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnWish, function () {
                Singleton.Get(WishManager).reqExec(function () {
                    _this.initView();
                }, _this);
            }, this);
        };
        WishView.prototype.onClick_btnWishOnekey = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnWishOnekey, function () {
                Singleton.Get(WishManager).reqExecOnekey(function () {
                    _this.initView();
                }, _this);
            }, this);
        };
        WishView.prototype.onClick_btnBack = function () {
            Singleton.Get(LayerManager).getView(ui.SchoolSubView).close();
            Singleton.Get(LayerManager).getView(ui.MainView).showSchoolPanel();
            this.close();
        };
        return WishView;
    }(BaseUI));
    ui.WishView = WishView;
    __reflect(WishView.prototype, "ui.WishView");
})(ui || (ui = {}));
//# sourceMappingURL=WishView.js.map