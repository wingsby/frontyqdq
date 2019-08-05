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
     * 捐献
     */
    var GuildDonationView = (function (_super) {
        __extends(GuildDonationView, _super);
        function GuildDonationView() {
            var _this = _super.call(this, "yw.GuildDonationSkin") || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        GuildDonationView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**创建界面时执行*/
        GuildDonationView.prototype.componentCreated = function () {
        };
        /**销毁界面时执行*/
        GuildDonationView.prototype.onDestroy = function () {
        };
        /**更新UI */
        GuildDonationView.prototype.onUpdate = function (time) {
        };
        GuildDonationView.prototype.onAddToStage = function () {
            this.tabTitle.text = Template.getGUIText("ui_guild10");
            this.labTxtGold.text = Template.getGUIText("ui_guild23");
            this.labTxtDmd.text = Template.getGUIText("ui_guild24");
            this.tabTitle.active = false;
            this.imgBg.mask = this.rectBgMask;
            this.btnDonateGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDonateGold, this);
            this.btnDonateDmd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDonateDmd, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.imgStandChest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChest, this);
            this.tgOpening.addEventListener(egret.Event.COMPLETE, this.onComplete_tgOpening, this);
            this.tgChest.addEventListener(egret.Event.COMPLETE, this.onComplete_tgChest, this);
        };
        GuildDonationView.prototype.onRemoveFromStage = function () {
            this.btnDonateGold.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDonateGold, this);
            this.btnDonateDmd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDonateDmd, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.imgStandChest.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChest, this);
            this.tgOpening.removeEventListener(egret.Event.COMPLETE, this.onComplete_tgOpening, this);
            this.tgChest.removeEventListener(egret.Event.COMPLETE, this.onComplete_tgChest, this);
        };
        GuildDonationView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            this.refresh();
            Common.playStackAni(this.btnBack, [this.tabTitle]);
            this.tgOpening.play();
        };
        GuildDonationView.prototype.close = function () {
            Singleton.Get(LayerManager).removeView(this);
            this.groupStand.alpha = 0;
        };
        GuildDonationView.prototype.refresh = function () {
            this.initView();
        };
        GuildDonationView.prototype.initView = function () {
            // 捐献收益
            this.labExpGold.text = UtilsGame.stringHander(Template.getGUIText("ui_guild25"), Template.config.DonateExp1);
            this.labFundGold.text = UtilsGame.stringHander(Template.getGUIText("ui_tech6"), Template.config.MoneyCapital);
            this.labDotGold.text = UtilsGame.stringHander(Template.getGUIText("ui_guild26"), Template.config.DonateNum1);
            this.labExpDmd.text = UtilsGame.stringHander(Template.getGUIText("ui_guild25"), Template.config.DonateExp2);
            this.labFundDmd.text = UtilsGame.stringHander(Template.getGUIText("ui_tech6"), Template.config.DiamondsCapital);
            this.labDotDmd.text = UtilsGame.stringHander(Template.getGUIText("ui_guild26"), Template.config.DonateNum2);
            // 捐献次数
            var inf_guild = Singleton.Get(GuildManager).getInfo();
            var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
            var cfg_vip = Template.vip.get(my_vip);
            if (!cfg_vip) {
                return;
            }
            var str = Template.getGUIText("ui_guild27");
            var cnt_gold = inf_guild.getGoldDntCnt();
            var max_gold = cfg_vip.VipDonate1;
            var eng_gold = max_gold > cnt_gold;
            var cost_gold = Template.config.DonateMoney;
            var my_gold = Singleton.Get(PlayerInfoManager).getGold();
            this.labCountGold.text = UtilsGame.stringHander(str, max_gold - cnt_gold, max_gold);
            this.btnDonateGold.visible = eng_gold;
            this.imgDonateGoldComp.visible = !eng_gold;
            this.btnDonateGold.text = Template.getGUIText("ui_guild23");
            this.btnDonateDmd.icon = DEFINE.UI_ALERT_INFO.gold.resPNG;
            this.btnDonateGold.cost = UtilsGame.numberToString(cost_gold);
            this.btnDonateGold.enough = my_gold >= cost_gold;
            var cnt_dmd = inf_guild.getDmdDntCnt();
            var max_dmd = cfg_vip.VipDonate2;
            var eng_dmd = max_dmd > cnt_dmd;
            var cost_dmd = Template.config.DonateDiamonds;
            var my_dmd = Singleton.Get(PlayerInfoManager).getDiamond();
            this.labCountDmd.text = UtilsGame.stringHander(str, max_dmd - cnt_dmd, max_dmd);
            this.btnDonateDmd.text = Template.getGUIText("ui_guild24");
            this.btnDonateDmd.icon = DEFINE.UI_ALERT_INFO.diamond.resPNG;
            this.btnDonateDmd.cost = UtilsGame.numberToString(cost_dmd);
            this.btnDonateDmd.enough = my_dmd >= cost_dmd;
            if (max_dmd <= 0) {
                this.btnDonateDmd.visible = false;
                this.imgDonateDmdComp.visible = false;
                this.labDmdVip.visible = true;
            }
            else {
                this.btnDonateDmd.visible = eng_dmd;
                this.imgDonateDmdComp.visible = !eng_dmd;
                this.labDmdVip.visible = false;
            }
        };
        GuildDonationView.prototype.onClick_btnClose = function () {
            this.close();
            GuildViewHandler.openMain();
            this.tgOpening.stop();
        };
        GuildDonationView.prototype.onClick_btnDonateGold = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnDonateGold, function () {
                Singleton.Get(GuildManager).reqDntGold(function () {
                    _this.refresh();
                    _this.tgChest.stop();
                    _this.tgChest.play();
                }, _this);
            }, this);
        };
        GuildDonationView.prototype.onClick_btnDonateDmd = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnDonateDmd, function () {
                Singleton.Get(GuildManager).reqDntDmd(function () {
                    _this.refresh();
                    _this.tgChest.stop();
                    _this.tgChest.play();
                }, _this);
            }, this);
        };
        GuildDonationView.prototype.onClick_btnChest = function () {
            this.tgChest.stop();
            this.tgChest.play();
        };
        GuildDonationView.prototype.onComplete_tgOpening = function () {
            this.tgChest.stop();
        };
        GuildDonationView.prototype.onComplete_tgChest = function () {
        };
        return GuildDonationView;
    }(BaseUI));
    ui.GuildDonationView = GuildDonationView;
    __reflect(GuildDonationView.prototype, "ui.GuildDonationView");
})(ui || (ui = {}));
//# sourceMappingURL=GuildDonationView.js.map