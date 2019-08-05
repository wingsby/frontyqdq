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
     * 公会
     */
    var GuildView = (function (_super) {
        __extends(GuildView, _super);
        function GuildView() {
            return _super.call(this, "yw.GuildSkin") || this;
        }
        GuildView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**创建界面时执行*/
        GuildView.prototype.componentCreated = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        /**销毁界面时执行*/
        GuildView.prototype.onDestroy = function () {
        };
        /**更新UI */
        GuildView.prototype.onUpdate = function (time) {
        };
        GuildView.prototype.onAddToStage = function () {
            this.tabTitle.text = Template.getGUIText("ui_guild1");
            this.labBtnDonation.text = Template.getGUIText("ui_guild10");
            this.labBtnShop.text = Template.getGUIText("ui_guild12");
            this.labBtnCompite.text = Template.getGUIText("ui_guild13");
            this.labBtnTech.text = Template.getGUIText("ui_guild11");
            this.labBtnTechFake.text = Template.getGUIText("ui_guild11");
            this.labTxtAnnounce.text = Template.getGUIText("ui_guild14");
            this.btnUpdateNotice.text = Template.getGUIText("ui_guild15");
            this.labTxtGold.text = Template.getGUIText("ui_guild16");
            this.labBtnDetail.text = Template.getGUIText("ui_guild17");
            this.labBtnApply.text = Template.getGUIText("ui_guild18");
            this.labBtnOther.text = Template.getGUIText("ui_guild19");
            this.tabTitle.active = false;
            this.imgBg.mask = this.rectBgMask;
            this.groupStand.mask = this.rectStandMask;
            this.inputAnnounce.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn_inputAnnounce, this);
            this.inputAnnounce.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut_inputAnnounce, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnDetail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDetail, this);
            this.btnApply.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnApply, this);
            this.btnOther.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOther, this);
            this.btnDonation.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDonation, this);
            this.btnShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnShop, this);
            this.btnTech.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTech, this);
            this.btnCompite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCompite, this);
            this.groupStand.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChest, this);
        };
        GuildView.prototype.onRemoveFromStage = function () {
            this.inputAnnounce.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut_inputAnnounce, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnDetail.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDetail, this);
            this.btnApply.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnApply, this);
            this.btnOther.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOther, this);
            this.btnDonation.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDonation, this);
            this.btnShop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnShop, this);
            this.btnTech.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTech, this);
            this.btnCompite.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCompite, this);
            this.groupStand.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChest, this);
        };
        GuildView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            this.refresh();
            Common.playStackAni(this.btnBack, [this.tabTitle]);
            this.tgOpening.stop();
            this.tgOpening.play();
        };
        GuildView.prototype.close = function () {
            Singleton.Get(LayerManager).removeView(this);
        };
        GuildView.prototype.refresh = function () {
            this.initView();
            this.initNew();
        };
        GuildView.prototype.onClick_btnClose = function () {
            GuildViewHandler.closeAfter();
            GuildViewHandler.closeAll();
        };
        GuildView.prototype.onClick_btnDetail = function () {
            UtilsEffect.buttonEffect(this.btnDetail, function () {
                GuildViewHandler.openMembers();
            }, this);
        };
        GuildView.prototype.onClick_btnApply = function () {
            UtilsEffect.buttonEffect(this.btnApply, function () {
                GuildViewHandler.openApplies();
            }, this);
        };
        GuildView.prototype.onClick_btnDonation = function () {
            UtilsEffect.buttonEffect(this.btnDonation, function () {
                GuildViewHandler.openDonation();
            }, this);
        };
        GuildView.prototype.onClick_btnTech = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnTech, function () {
                GuildViewHandler.openTech();
                _this.close();
            }, this);
        };
        GuildView.prototype.onClick_btnShop = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnShop, function () {
                if (!ShopUtil.isShopUnlocked(DEFINE.GUILD_SHOP_ID)) {
                    return;
                }
                _this.close();
                var es = Template.shop.get(DEFINE.GUILD_SHOP_ID);
                Singleton.Get(LayerManager).getView(ui.ShopListView).open(es, false, function () {
                    Singleton.Get(LayerManager).getView(ui.MainView).showSchoolSubPanel();
                    _this.open();
                }, _this);
            }, this);
        };
        GuildView.prototype.onClick_btnCompite = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnCompite, function () {
                _this.close();
                GuildWarViewHandler.openGuildWar();
            }, this);
        };
        GuildView.prototype.onClick_btnOther = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnOther, function () {
                GuildViewHandler.openGuildRank();
                _this.close();
            }, this);
        };
        GuildView.prototype.onClick_btnChest = function () {
            this.tgOpening.stop();
            this.tgChest.stop();
            this.tgChest.play();
        };
        GuildView.prototype.onFocusIn_inputAnnounce = function () {
            this.btnUpdateNotice.visible = false;
            this.rectUpdateNotice.visible = false;
        };
        GuildView.prototype.onFocusOut_inputAnnounce = function () {
            var _this = this;
            this.btnUpdateNotice.visible = true;
            this.rectUpdateNotice.visible = true;
            // 处理文字内容
            var str = UtilsGame.replaceFilter(this.inputAnnounce.text);
            if (str.length > 70) {
                str = str.substr(0, 70);
                Singleton.Get(DialogControler).showString("公会公告最长70字");
            }
            // 发送变更请求
            Singleton.Get(GuildManager).reqAnnounce(str, function () {
                _this.initView();
            }, this);
        };
        GuildView.prototype.initView = function () {
            // 设定公会基本信息
            var info = Singleton.Get(GuildManager).getMyGuild();
            this.labID.text = "ID:" + info.id;
            this.labName.text = info.name;
            this.labLv.text = info.lv.toString();
            this.labGold.text = info.funds.toString();
            this.inputAnnounce.text = info.words;
            this.labExp.text = info.exp + "/" + GuildUtil.getGuildNextExp(info.lv);
            this.progExp.value = 100 * info.exp / GuildUtil.getGuildNextExp(info.lv);
            var cfg_guild_next = Template.guild.get(info.lv + 1);
            if (!cfg_guild_next) {
                this.labExp.text = "MAX";
            }
            // 设定公告可编辑状态
            var my_place = Singleton.Get(GuildManager).getMyGuild().getMyPlace();
            if (my_place == E_GUILD_PLACE.LEADER) {
                this.inputAnnounce.touchEnabled = true;
                this.btnUpdateNotice.visible = true;
                this.rectUpdateNotice.visible = true;
            }
            else {
                this.inputAnnounce.touchEnabled = false;
                this.btnUpdateNotice.visible = false;
                this.rectUpdateNotice.visible = false;
            }
            // 设定入会申请按钮可见状态
            switch (my_place) {
                case E_GUILD_PLACE.LEADER:
                case E_GUILD_PLACE.RULER:
                    this.btnApply.visible = true;
                    break;
                default:
                    this.btnApply.visible = false;
                    break;
            }
        };
        GuildView.prototype.initNew = function () {
            var _this = this;
            Singleton.Get(GuildManager).reqInfoHrListLazy(false, function () {
                _this.imgApplyNew.visible = Singleton.Get(GuildManager).getMyGuild().hasAnyApply();
            }, this);
            Singleton.Get(GuildWarManager).checkAlarm(function (is_alarm) {
                _this.imgCompiteNew.visible = is_alarm;
            }, this);
        };
        return GuildView;
    }(BaseUI));
    ui.GuildView = GuildView;
    __reflect(GuildView.prototype, "ui.GuildView");
})(ui || (ui = {}));
//# sourceMappingURL=GuildView.js.map