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
    var PrivFirstPayView = (function (_super) {
        __extends(PrivFirstPayView, _super);
        function PrivFirstPayView() {
            var _this = _super.call(this, "yw.PrivFirstPaySkin") || this;
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnClose, _this);
            _this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnBuy, _this);
            _this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnReward, _this);
            return _this;
        }
        PrivFirstPayView.prototype.componentCreated = function () {
        };
        PrivFirstPayView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBuy, this);
            this.btnReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
        };
        PrivFirstPayView.prototype.onUpdate = function (time) {
        };
        PrivFirstPayView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.initView();
            this.mcItem1.scaleX = 1.14;
            this.mcItem1.scaleY = 1.14;
            this.setMc();
        };
        PrivFirstPayView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            Singleton.Get(LayerManager).getView(ui.PrivLvgiftView).tryAutoOpen();
            Singleton.Get(PrivManager).is_login_alert_closed = true;
            this.mcItem1.clearMovieClip();
            this.mcItem2.clearMovieClip();
            this.mcItem3.clearMovieClip();
            this.mcItem4.clearMovieClip();
            this.mcItem5.clearMovieClip();
            this.mcBuy.clearMovieClip();
        };
        PrivFirstPayView.prototype.setMc = function () {
            this.mcBuy.setMovieClip(DEFINE.EFF_PRIV_BTN);
            this.mcBuy.gotoAndPlay(DEFINE.EFF_PRIV_BTN, -1);
        };
        PrivFirstPayView.prototype.onClick_btnClose = function (e) {
            this.close();
        };
        PrivFirstPayView.prototype.onClick_btnBuy = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnBuy, function () {
                _this.close();
                Singleton.Get(LayerManager).getView(ui.PayView).open();
            }, this);
        };
        PrivFirstPayView.prototype.onClick_btnReward = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnReward, function () {
                Singleton.Get(PrivManager).reqFPayReward(function () {
                    _this.close();
                    Singleton.Get(ui.BattleView).setFPayAlive(false);
                }, _this);
            }, this);
        };
        PrivFirstPayView.prototype.initView = function () {
            var fp = Template.config.FPay;
            var fpq = Template.config.FPayQ;
            this.setIcon(fp[0], fpq[0], this.imgTier1, this.imgIcon1, this.labName1, this.labCount1, this.imgFrag1, this.mcItem1);
            this.setIcon(fp[1], fpq[1], this.imgTier2, this.imgIcon2, this.labName2, this.labCount2, this.imgFrag2, this.mcItem2);
            this.setIcon(fp[2], fpq[2], this.imgTier3, this.imgIcon3, this.labName3, this.labCount3, this.imgFrag3, this.mcItem3);
            this.setIcon(fp[3], fpq[3], this.imgTier4, this.imgIcon4, this.labName4, this.labCount4, this.imgFrag4, this.mcItem4);
            this.setIcon(fp[4], fpq[4], this.imgTier5, this.imgIcon5, this.labName5, this.labCount5, this.imgFrag5, this.mcItem5);
            switch (Singleton.Get(PrivManager).getInfo().first_award_status) {
                case FirstPayStatus.NOT_FIRST_BILL:
                    this.btnBuy.visible = true;
                    this.btnReward.visible = false;
                    break;
                case FirstPayStatus.NOT_GET_FRIST_AWARD:
                    this.btnBuy.visible = false;
                    this.btnReward.visible = true;
                    break;
                case FirstPayStatus.AREALY_GET_AWARD:
                    this.btnBuy.visible = false;
                    this.btnReward.visible = false;
                    break;
            }
        };
        PrivFirstPayView.prototype.setIcon = function (id, count, img_tier, img_icon, lab_name, lab_count, img_frag, mc) {
            var entity = Template.item.get(id);
            if (entity == undefined) {
                console.error("can't get item entity, item id: " + id);
                return;
            }
            ResManager.AsyncSetTexture(img_tier, Common.getItemTierBgRes(entity.iStar));
            ResManager.AsyncSetTexture(img_icon, entity.iIcon);
            lab_name.text = Template.getGUIText(entity.iName);
            lab_name.textColor = Common.getItemNameColor(entity.iStar);
            lab_count.text = "x" + count;
            img_frag.visible = Common.isItemFrag(entity.iType);
            if (mc) {
                var eff_name = Common.getItemEffName(entity.iStar);
                if (eff_name.length <= 0) {
                    mc.clearMovieClip();
                }
                else {
                    mc.setMovieClip(eff_name);
                    mc.gotoAndPlay(eff_name, -1);
                }
            }
        };
        return PrivFirstPayView;
    }(PopupUI));
    ui.PrivFirstPayView = PrivFirstPayView;
    __reflect(PrivFirstPayView.prototype, "ui.PrivFirstPayView");
})(ui || (ui = {}));
//# sourceMappingURL=PrivFirstPayView.js.map