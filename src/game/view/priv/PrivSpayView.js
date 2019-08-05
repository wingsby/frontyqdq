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
    var E_PRIV_SPAY_VIEW_ITEM;
    (function (E_PRIV_SPAY_VIEW_ITEM) {
        E_PRIV_SPAY_VIEW_ITEM[E_PRIV_SPAY_VIEW_ITEM["ITEM"] = 0] = "ITEM";
        E_PRIV_SPAY_VIEW_ITEM[E_PRIV_SPAY_VIEW_ITEM["GOLD"] = 1] = "GOLD";
        E_PRIV_SPAY_VIEW_ITEM[E_PRIV_SPAY_VIEW_ITEM["VIP"] = 2] = "VIP";
    })(E_PRIV_SPAY_VIEW_ITEM || (E_PRIV_SPAY_VIEW_ITEM = {}));
    var PrivSpayView = (function (_super) {
        __extends(PrivSpayView, _super);
        function PrivSpayView() {
            var _this = _super.call(this, "yw.PrivSpaySkin") || this;
            _this.m_spay_id = 0;
            _this.m_top_images = ["chongzhijiangli1y", "chongzhijiangli10y", "chongzhijiangli30y"];
            _this.m_item_icons = [];
            _this.initUiItems();
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnClose, _this);
            _this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnBuy, _this);
            _this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnReward, _this);
            _this.tabPage1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_tabPage1, _this);
            _this.tabPage2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_tabPage2, _this);
            _this.tabPage3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_tabPage3, _this);
            _this.m_item_icons[0].btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_item1, _this);
            _this.m_item_icons[1].btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_item2, _this);
            _this.m_item_icons[2].btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_item3, _this);
            _this.m_item_icons[3].btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_item4, _this);
            _this.m_item_icons[4].btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_item5, _this);
            return _this;
        }
        PrivSpayView.prototype.componentCreated = function () {
        };
        PrivSpayView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBuy, this);
            this.btnReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
            this.tabPage1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabPage1, this);
            this.tabPage2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabPage2, this);
            this.tabPage3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabPage3, this);
            this.m_item_icons[0].btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_item1, this);
            this.m_item_icons[1].btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_item2, this);
            this.m_item_icons[2].btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_item3, this);
            this.m_item_icons[3].btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_item4, this);
            this.m_item_icons[4].btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_item5, this);
        };
        PrivSpayView.prototype.onUpdate = function (time) {
        };
        PrivSpayView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            Singleton.Get(RegisterUpdate).register(this);
            this.m_spay_id = 1;
            this.refresh();
        };
        PrivSpayView.prototype.refresh = function () {
            this.labAlreadyGet.text = Template.getGUIText("ui_ex_priv_1");
            this.labDes.text = Template.getGUIText("ui_ex_priv_2");
            this.labReward.text = Template.getGUIText("ui_ex_priv_3");
            this.activeTab();
            this.initView();
            this.setMc();
            this.initMenu();
        };
        PrivSpayView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            Singleton.Get(RegisterUpdate).unRegister(this);
            Singleton.Get(LayerManager).getView(ui.PrivLvgiftView).tryAutoOpen();
            Singleton.Get(PrivManager).is_login_alert_closed = true;
            this.mcItem1.clearMovieClip();
            this.mcItem2.clearMovieClip();
            this.mcItem3.clearMovieClip();
            this.mcItem4.clearMovieClip();
            this.mcItem5.clearMovieClip();
            this.mcBuy.clearMovieClip();
        };
        PrivSpayView.prototype.update = function () {
            var cfg_spay = Template.spay.get(this.m_spay_id);
            if (!cfg_spay) {
                return;
            }
            var info = Singleton.Get(PrivManager).getInfo();
            var available = info.isSpayAvailable(this.m_spay_id);
            var received = info.isSpayRewardReceived(this.m_spay_id);
            if (available || received) {
                this.labCountdown.visible = false;
                var is_double = info.getPaidSpayDouble(this.m_spay_id);
                this.setDouble(is_double);
                return;
            }
            var start = UtilsGame.getPlayerLifetimeStart();
            var limit = cfg_spay.Ltime;
            var now = UtilsGame.Now();
            var delta = start + limit - now;
            if (delta >= 0) {
                this.setDouble(true);
                this.labCountdown.visible = true;
                this.labCountdown.text = UtilsGame.stringHander(Template.getGUIText("ui_spay1"), UtilsGame.timeToString(delta));
            }
            else {
                this.setDouble(false);
                this.labCountdown.visible = false;
                this.labCountdown.text = "";
            }
        };
        PrivSpayView.prototype.setDouble = function (is_double) {
            var cfg_spay = Template.spay.get(this.m_spay_id);
            if (!cfg_spay) {
                return;
            }
            for (var i = 0; i < this.m_item_icons.length; i++) {
                var tri = this.m_item_icons[i].tri;
                switch (this.m_item_icons[i].type) {
                    case E_PRIV_SPAY_VIEW_ITEM.GOLD:
                        tri.visible = is_double && (cfg_spay.GoldDouble > 1);
                        break;
                    case E_PRIV_SPAY_VIEW_ITEM.ITEM:
                        tri.visible = is_double && (this.m_item_icons[i].double > 1);
                        break;
                    case E_PRIV_SPAY_VIEW_ITEM.VIP:
                        this.m_item_icons[i].tri.visible = false;
                        break;
                }
            }
        };
        PrivSpayView.prototype.initUiItems = function () {
            this.m_item_icons = [
                {
                    tier: this.imgTier1,
                    icon: this.imgIcon1,
                    name: this.labName1,
                    count: this.labCount1,
                    frag: this.imgFrag1,
                    group: this.item1,
                    mc: this.mcItem1,
                    tri: this.imgTri1,
                    btnHandler: this.btnHandler1
                }, {
                    tier: this.imgTier2,
                    icon: this.imgIcon2,
                    name: this.labName2,
                    count: this.labCount2,
                    frag: this.imgFrag2,
                    group: this.item2,
                    mc: this.mcItem2,
                    tri: this.imgTri2,
                    btnHandler: this.btnHandler2
                }, {
                    tier: this.imgTier3,
                    icon: this.imgIcon3,
                    name: this.labName3,
                    count: this.labCount3,
                    frag: this.imgFrag3,
                    group: this.item3,
                    mc: this.mcItem3,
                    tri: this.imgTri3,
                    btnHandler: this.btnHandler3
                }, {
                    tier: this.imgTier4,
                    icon: this.imgIcon4,
                    name: this.labName4,
                    count: this.labCount4,
                    frag: this.imgFrag4,
                    group: this.item4,
                    mc: this.mcItem4,
                    tri: this.imgTri4,
                    btnHandler: this.btnHandler4
                }, {
                    tier: this.imgTier5,
                    icon: this.imgIcon5,
                    name: this.labName5,
                    count: this.labCount5,
                    frag: this.imgFrag5,
                    group: this.item5,
                    mc: this.mcItem5,
                    tri: this.imgTri5,
                    btnHandler: this.btnHandler5
                }
            ];
        };
        PrivSpayView.prototype.setMc = function () {
            this.mcBuy.setMovieClip(DEFINE.EFF_PRIV_BTN);
            this.mcBuy.gotoAndPlay(DEFINE.EFF_PRIV_BTN, -1);
        };
        PrivSpayView.prototype.onClick_btnClose = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnClose, function () {
                _this.close();
            }, this);
        };
        PrivSpayView.prototype.onClick_btnBuy = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnBuy, function () {
                _this.close();
                Singleton.Get(LayerManager).getView(ui.PayView).open();
            }, this);
        };
        PrivSpayView.prototype.onClick_btnReward = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnReward, function () {
                Singleton.Get(PrivManager).reqSpayReward(_this.m_spay_id, function () {
                    _this.initMenu();
                    _this.initView();
                }, _this);
            }, this);
        };
        PrivSpayView.prototype.initMenu = function () {
            var inf = Singleton.Get(PrivManager).getInfo();
            this.imgTabNew1.visible = inf.isSpayAvailable(1) && !inf.isSpayRewardReceived(1);
            this.imgTabNew2.visible = inf.isSpayAvailable(2) && !inf.isSpayRewardReceived(2);
            this.imgTabNew3.visible = inf.isSpayAvailable(3) && !inf.isSpayRewardReceived(3);
        };
        PrivSpayView.prototype.initView = function () {
            var cfg_spay = Template.spay.get(this.m_spay_id);
            if (!cfg_spay) {
                return;
            }
            ResManager.AsyncSetTexture(this.imgTop, this.m_top_images[cfg_spay.ID - 1] + "_png");
            // 默认显示VIP图标
            var wrap_i = 0;
            if (cfg_spay.vipicon) {
                this.m_item_icons[0].type = E_PRIV_SPAY_VIEW_ITEM.VIP;
                this.m_item_icons[0].item_id = cfg_spay.vipicon;
                this.setIcon(cfg_spay.vipicon, 0, this.m_item_icons[0].tier, this.m_item_icons[0].icon, this.m_item_icons[0].name, this.m_item_icons[0].count, this.m_item_icons[0].frag, this.m_item_icons[0].group, this.m_item_icons[0].mc);
                wrap_i++;
            }
            for (var i = 0; i < cfg_spay.Item.length; i++) {
                this.m_item_icons[wrap_i].type = E_PRIV_SPAY_VIEW_ITEM.ITEM;
                this.m_item_icons[wrap_i].double = cfg_spay.Double[i];
                this.m_item_icons[wrap_i].item_id = cfg_spay.Item[i];
                this.setIcon(cfg_spay.Item[i], cfg_spay.Counts[i], this.m_item_icons[wrap_i].tier, this.m_item_icons[wrap_i].icon, this.m_item_icons[wrap_i].name, this.m_item_icons[wrap_i].count, this.m_item_icons[wrap_i].frag, this.m_item_icons[wrap_i].group, this.m_item_icons[wrap_i].mc);
                wrap_i++;
            }
            if (this.m_item_icons[wrap_i]) {
                this.m_item_icons[wrap_i].type = E_PRIV_SPAY_VIEW_ITEM.GOLD;
                this.m_item_icons[wrap_i].item_id = -1;
                this.setIcon(-1, cfg_spay.SpayGold, this.m_item_icons[wrap_i].tier, this.m_item_icons[wrap_i].icon, this.m_item_icons[wrap_i].name, this.m_item_icons[wrap_i].count, this.m_item_icons[wrap_i].frag, this.m_item_icons[wrap_i].group, this.m_item_icons[wrap_i].mc);
                wrap_i++;
            }
            for (var i = wrap_i; i < this.m_item_icons.length; i++) {
                this.m_item_icons[wrap_i].type = E_PRIV_SPAY_VIEW_ITEM.ITEM;
                this.m_item_icons[wrap_i].double = 0;
                this.m_item_icons[wrap_i].item_id = -1;
                this.setIcon(undefined, undefined, this.m_item_icons[i].tier, this.m_item_icons[i].icon, this.m_item_icons[i].name, this.m_item_icons[i].count, this.m_item_icons[i].frag, this.m_item_icons[i].group, this.m_item_icons[i].mc);
                wrap_i++;
            }
            var available = Singleton.Get(PrivManager).getInfo().isSpayAvailable(this.m_spay_id);
            var received = Singleton.Get(PrivManager).getInfo().isSpayRewardReceived(this.m_spay_id);
            if (available) {
                if (received) {
                    this.btnBuy.visible = false;
                    this.btnReward.visible = false;
                    this.labAlreadyGet.visible = true;
                }
                else {
                    this.btnBuy.visible = false;
                    this.btnReward.visible = true;
                    this.labAlreadyGet.visible = false;
                }
            }
            else {
                this.btnBuy.visible = true;
                this.btnReward.visible = false;
                this.labAlreadyGet.visible = false;
            }
        };
        PrivSpayView.prototype.setIcon = function (id, count, img_tier, img_icon, lab_name, lab_count, img_frag, item, mc) {
            var star = 0;
            if (id == -1) {
                item.visible = true;
                ResManager.AsyncSetTexture(img_tier, Common.getItemTierBgRes(5));
                ResManager.AsyncSetTexture(img_icon, DEFINE.UI_ALERT_INFO.gold.resPNG);
                lab_name.text = DEFINE.UI_ALERT_INFO.gold.name;
                lab_name.textColor = Common.getItemNameColor(5);
                lab_count.text = "x" + UtilsGame.numberToString(count);
                img_frag.visible = false;
            }
            else {
                var entity = Template.item.get(id);
                if (entity == undefined) {
                    item.visible = false;
                    return;
                }
                item.visible = true;
                star = entity.iStar;
                ResManager.AsyncSetTexture(img_tier, Common.getItemTierBgRes(star));
                ResManager.AsyncSetTexture(img_icon, entity.iIcon);
                lab_name.text = Template.getGUIText(entity.iName);
                lab_name.textColor = Common.getItemNameColor(entity.iStar);
                lab_count.text = "x" + UtilsGame.numberToString(count);
                img_frag.visible = Common.isItemFrag(entity.iType);
            }
            if (count > 0) {
                lab_count.visible = true;
            }
            else {
                lab_count.visible = false;
            }
            if (mc) {
                var eff_name = Common.getItemEffName(star);
                if (eff_name.length <= 0) {
                    mc.clearMovieClip();
                }
                else {
                    mc.setMovieClip(eff_name);
                    mc.gotoAndPlay(eff_name, -1);
                }
            }
        };
        PrivSpayView.prototype.onClick_tabPage1 = function () {
            UtilsEffect.tabEffect(this.tabPage1);
            this.m_spay_id = 1;
            this.initView();
            this.activeTab();
            this.initMenu();
        };
        PrivSpayView.prototype.onClick_tabPage2 = function () {
            UtilsEffect.tabEffect(this.tabPage2);
            this.m_spay_id = 2;
            this.initView();
            this.activeTab();
            this.initMenu();
        };
        PrivSpayView.prototype.onClick_tabPage3 = function () {
            UtilsEffect.tabEffect(this.tabPage3);
            this.m_spay_id = 3;
            this.initView();
            this.activeTab();
            this.initMenu();
        };
        PrivSpayView.prototype.activeTab = function () {
            var cur_id = this.m_spay_id;
            if (cur_id <= 0 || cur_id > 3) {
                cur_id = 1;
            }
            var tab_res = "btn_chongzhijiangli1_png";
            var tab_res_active = "btn_chongzhijiangli2_png";
            ResManager.AsyncSetTexture(this.imgTabBg1, (cur_id == 1) ? tab_res_active : tab_res);
            ResManager.AsyncSetTexture(this.imgTabBg2, (cur_id == 2) ? tab_res_active : tab_res);
            ResManager.AsyncSetTexture(this.imgTabBg3, (cur_id == 3) ? tab_res_active : tab_res);
        };
        // region 点击图标
        PrivSpayView.prototype.onClick_item1 = function () {
            this.openItemDrop(0);
        };
        PrivSpayView.prototype.onClick_item2 = function () {
            this.openItemDrop(1);
        };
        PrivSpayView.prototype.onClick_item3 = function () {
            this.openItemDrop(2);
        };
        PrivSpayView.prototype.onClick_item4 = function () {
            this.openItemDrop(3);
        };
        PrivSpayView.prototype.onClick_item5 = function () {
            this.openItemDrop(4);
        };
        PrivSpayView.prototype.openItemDrop = function (id) {
            DropUtil.openDrop(this.m_item_icons[id].item_id);
        };
        return PrivSpayView;
    }(PopupUI));
    ui.PrivSpayView = PrivSpayView;
    __reflect(PrivSpayView.prototype, "ui.PrivSpayView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=PrivSpayView.js.map