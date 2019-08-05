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
    var PrivLvgiftView = (function (_super) {
        __extends(PrivLvgiftView, _super);
        function PrivLvgiftView() {
            var _this = _super.call(this, "yw.PrivLvgiftSkin") || this;
            _this.m_items = [];
            _this.m_cur_id = 0;
            _this.m_last_tick_time = 0;
            _this.initItems();
            return _this;
        }
        PrivLvgiftView.prototype.componentCreated = function () {
            this.labDes.text = Template.getGUIText("ui_ex_priv_9");
            this.labReward.text = Template.getGUIText("ui_ex_priv_10");
            this.labBuy.text = Template.getGUIText("ui_ex_priv_7");
        };
        PrivLvgiftView.prototype.onDestroy = function () {
        };
        PrivLvgiftView.prototype.onUpdate = function (time) {
        };
        PrivLvgiftView.prototype.update = function () {
            if (UtilsGame.Now() - this.m_last_tick_time < 500) {
                return;
            }
            this.m_last_tick_time = UtilsGame.Now();
            var gift_id = Singleton.Get(LvgiftManager).getInfo().getActiveGift();
            if (!gift_id) {
                this.btnBuy.visible = false;
                this.btnReward.visible = false;
                this.labLastTime.text = Template.getGUIText("ui_ex_priv_11");
                return;
            }
            var gift_status = Singleton.Get(LvgiftManager).getInfo().getGiftStatus(gift_id);
            var now = UtilsGame.Now();
            var expired_time = Singleton.Get(LvgiftManager).getInfo().lvgift_t;
            switch (gift_status) {
                case E_LVGIFT_STATUS.ONSALE:
                    var cfg_gift = Template.lvgift.get(gift_id);
                    if (!cfg_gift || cfg_gift.Time != 0) {
                        var gift_delta = expired_time - now;
                        this.labLastTime.text = Template.getGUIText("ui_ex_priv_12") + UtilsGame.timeToString(gift_delta);
                    }
                    else {
                        this.labLastTime.text = Template.getGUIText("ui_ex_priv_12") + Template.getGUIText("ui_ex_priv_13");
                    }
                    this.btnBuy.visible = true;
                    this.btnReward.visible = false;
                    break;
                case E_LVGIFT_STATUS.HOLDING:
                    this.btnBuy.visible = false;
                    this.btnReward.visible = true;
                    this.labLastTime.text = Template.getGUIText("ui_ex_priv_14");
                    break;
                default:
                    this.btnBuy.visible = false;
                    this.btnReward.visible = false;
                    this.labLastTime.text = Template.getGUIText("ui_ex_priv_11");
                    break;
            }
        };
        PrivLvgiftView.prototype.tryAutoOpen = function () {
            var info = Singleton.Get(LvgiftManager).getInfo();
            if (!info.is_inited) {
                return;
            }
            var cur_gift_id = info.getActiveGift();
            if (cur_gift_id > 0) {
                if (!info.checkGiftOpened(cur_gift_id)) {
                    var view_battle = Singleton.Get(LayerManager).getView(ui.BattleView);
                    if (view_battle.cur_mode == ui.E_BATTLE_VIEW_MODE.PVE && view_battle.visible) {
                        this.open(cur_gift_id);
                    }
                }
            }
        };
        PrivLvgiftView.prototype.open = function (id) {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            Singleton.Get(RegisterUpdate).register(this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBuy, this);
            this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
            if (!id) {
                id = Singleton.Get(LvgiftManager).getInfo().getActiveGift();
            }
            this.m_cur_id = id;
            Singleton.Get(LvgiftManager).getInfo().markGiftOpened(id);
            this.initView();
            this.setMc();
        };
        PrivLvgiftView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            Singleton.Get(RegisterUpdate).unRegister(this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBuy, this);
            this.btnReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
        };
        PrivLvgiftView.prototype.refresh = function () {
            this.m_cur_id = Singleton.Get(LvgiftManager).getInfo().getActiveGift();
            this.initView();
            this.setMc();
        };
        PrivLvgiftView.prototype.setMc = function () {
            this.mcBuy.setMovieClip(DEFINE.EFF_PRIV_BTN);
            this.mcBuy.gotoAndPlay(DEFINE.EFF_PRIV_BTN, -1);
        };
        PrivLvgiftView.prototype.initView = function () {
            if (!this.m_cur_id) {
                return;
            }
            var cfg_lvgift = Template.lvgift.get(this.m_cur_id);
            if (!cfg_lvgift) {
                console.log("no lvgift cfg: " + this.m_cur_id);
                return;
            }
            // 初始化道具
            this.initItemsView(cfg_lvgift);
            // 初始化背景图
            ResManager.AsyncSetTexture(this.imgBg, cfg_lvgift.GiftUi + "_png");
            // 初始化按钮状态
            var cfg_pit = Singleton.Get(LvgiftManager).getInfo().getGiftPayItem(this.m_cur_id);
            if (!cfg_pit) {
                this.labBuy.text = Template.getGUIText("ui_activity15");
            }
            else {
                this.labBuy.text = UtilsGame.stringHander(Template.getGUIText("ui_activity4"), cfg_pit.monetaryAmount);
            }
        };
        PrivLvgiftView.prototype.initItemsView = function (cfg_lvgift) {
            var cur_index = 0;
            // 道具图标
            for (var i = 0; i < cfg_lvgift.Item.length; i++) {
                if (cur_index >= 4) {
                    break;
                }
                var cfg_item = Template.item.get(cfg_lvgift.Item[i]);
                if (!cfg_item) {
                    console.log("no item: " + cfg_lvgift.Item[i]);
                    continue;
                }
                cur_index++;
                var cur_item = this.m_items[cur_index - 1];
                cur_item.item.visible = true;
                cur_item.labName.text = Template.getGUIText(cfg_item.iName);
                cur_item.labName.textColor = Common.getItemNameColor(cfg_item.iStar);
                ResManager.AsyncSetTexture(cur_item.imgTier, Common.getItemTierBgRes(cfg_item.iStar));
                ResManager.AsyncSetTexture(cur_item.imgIcon, cfg_item.iIcon);
                cur_item.labCount.text = "x" + UtilsGame.numberToString(cfg_lvgift.Quantity[i]);
                cur_item.imgFrag.visible = cfg_item.Synthesis > 0;
                var eff_name = Common.getItemEffName(cfg_item.iStar);
                if (eff_name.length > 0) {
                    cur_item.mcItem.visible = true;
                    cur_item.mcItem.setMovieClip(eff_name);
                    cur_item.mcItem.gotoAndPlay(eff_name, -1);
                }
                else {
                    cur_item.mcItem.visible = false;
                    cur_item.mcItem.clearMovieClip();
                }
            }
            // 金币
            if (cfg_lvgift.Gold > 0) {
                cur_index++;
                var cur_item = this.m_items[cur_index - 1];
                cur_item.item.visible = true;
                cur_item.labName.text = DEFINE.UI_ALERT_INFO.gold.name;
                cur_item.labName.textColor = Common.getItemNameColor(5);
                ResManager.AsyncSetTexture(cur_item.imgTier, Common.getItemTierBgRes(5));
                ResManager.AsyncSetTexture(cur_item.imgIcon, DEFINE.UI_ALERT_INFO.gold.resPNG);
                cur_item.labCount.text = "x" + UtilsGame.numberToString(cfg_lvgift.Gold);
                cur_item.imgFrag.visible = false;
                cur_item.mcItem.visible = false;
                cur_item.mcItem.clearMovieClip();
            }
            // 钻石
            if (cfg_lvgift.Jewel > 0) {
                cur_index++;
                var cur_item = this.m_items[cur_index - 1];
                cur_item.item.visible = true;
                cur_item.labName.text = DEFINE.UI_ALERT_INFO.diamond.name;
                cur_item.labName.textColor = Common.getItemNameColor(5);
                ResManager.AsyncSetTexture(cur_item.imgTier, Common.getItemTierBgRes(5));
                ResManager.AsyncSetTexture(cur_item.imgIcon, DEFINE.UI_ALERT_INFO.diamond.resPNG);
                cur_item.labCount.text = "x" + UtilsGame.numberToString(cfg_lvgift.Jewel);
                cur_item.imgFrag.visible = false;
                cur_item.mcItem.visible = false;
                cur_item.mcItem.clearMovieClip();
            }
            // 隐藏多余的道具图标
            for (var i = cur_index; i < 4; i++) {
                if (i <= 0) {
                    continue;
                }
                this.m_items[i - 1].item.visible = false;
            }
        };
        // region 点击事件
        PrivLvgiftView.prototype.onClick_btnClose = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnClose, function () {
                _this.close();
            }, this);
        };
        PrivLvgiftView.prototype.onClick_btnBuy = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnBuy, function () {
                var priv = Singleton.Get(PrivManager);
                if (priv.isClickEnable()) {
                    priv.setLastPayClick();
                    var lgm = Singleton.Get(login.LoginDataManager);
                    if (lgm.loginData) {
                        // 判断平台
                        switch (lgm.loginData.pid) {
                            case I_Platform.p_wanba:
                                var cost = 0;
                                for (var i = 0; i < Template.payItem.length; i++) {
                                    if (Template.payItem[i].itemId == _this.m_cur_id) {
                                        cost = Template.payItem[i].monetaryAmount;
                                    }
                                }
                                Singleton.Get(DialogControler).showInfo(1218, _this, function () {
                                    Singleton.Get(PlatformSDK).Pay(_this.m_cur_id);
                                }, function () { }, cost * 10);
                                break;
                            default:
                                Singleton.Get(PlatformSDK).Pay(_this.m_cur_id);
                                break;
                        }
                    }
                }
                else {
                }
            }, this);
        };
        PrivLvgiftView.prototype.onClick_btnReward = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnReward, function () {
                Singleton.Get(LvgiftManager).reqReward(function () {
                    _this.close();
                }, _this);
            }, this);
        };
        // endregion
        // region 初始化
        PrivLvgiftView.prototype.initItems = function () {
            this.m_items = [
                {
                    item: this.item0,
                    imgTier: this.imgTier0,
                    imgIcon: this.imgIcon0,
                    labName: this.labName0,
                    labCount: this.labCount0,
                    imgFrag: this.imgFrag0,
                    mcItem: this.mcItem0
                },
                {
                    item: this.item1,
                    imgTier: this.imgTier1,
                    imgIcon: this.imgIcon1,
                    labName: this.labName1,
                    labCount: this.labCount1,
                    imgFrag: this.imgFrag1,
                    mcItem: this.mcItem1
                },
                {
                    item: this.item2,
                    imgTier: this.imgTier2,
                    imgIcon: this.imgIcon2,
                    labName: this.labName2,
                    labCount: this.labCount2,
                    imgFrag: this.imgFrag2,
                    mcItem: this.mcItem2
                },
                {
                    item: this.item3,
                    imgTier: this.imgTier3,
                    imgIcon: this.imgIcon3,
                    labName: this.labName3,
                    labCount: this.labCount3,
                    imgFrag: this.imgFrag3,
                    mcItem: this.mcItem3
                },
            ];
        };
        return PrivLvgiftView;
    }(PopupUI));
    ui.PrivLvgiftView = PrivLvgiftView;
    __reflect(PrivLvgiftView.prototype, "ui.PrivLvgiftView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=PrivLvgiftView.js.map