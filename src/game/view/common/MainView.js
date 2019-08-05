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
    var E_MAIN_TOP;
    (function (E_MAIN_TOP) {
        E_MAIN_TOP[E_MAIN_TOP["HIDE"] = 0] = "HIDE";
        E_MAIN_TOP[E_MAIN_TOP["SHORT"] = 1] = "SHORT";
        E_MAIN_TOP[E_MAIN_TOP["FULL"] = 2] = "FULL";
    })(E_MAIN_TOP || (E_MAIN_TOP = {}));
    var E_MAIN_ICON;
    (function (E_MAIN_ICON) {
        E_MAIN_ICON[E_MAIN_ICON["MONTH_CARD"] = 1] = "MONTH_CARD";
        E_MAIN_ICON[E_MAIN_ICON["LIFETIME_CARD"] = 2] = "LIFETIME_CARD";
        E_MAIN_ICON[E_MAIN_ICON["ACT_NEW"] = 3] = "ACT_NEW";
        E_MAIN_ICON[E_MAIN_ICON["ACT_NORMAL"] = 4] = "ACT_NORMAL";
        E_MAIN_ICON[E_MAIN_ICON["ACT_TURNPLATE"] = 5] = "ACT_TURNPLATE";
        E_MAIN_ICON[E_MAIN_ICON["VIP"] = 6] = "VIP";
        E_MAIN_ICON[E_MAIN_ICON["PAY"] = 7] = "PAY";
        E_MAIN_ICON[E_MAIN_ICON["ACT_RANK"] = 8] = "ACT_RANK";
        E_MAIN_ICON[E_MAIN_ICON["MAIL"] = 9] = "MAIL";
        E_MAIN_ICON[E_MAIN_ICON["RANKLIST"] = 10] = "RANKLIST";
        E_MAIN_ICON[E_MAIN_ICON["DMG"] = 11] = "DMG";
        E_MAIN_ICON[E_MAIN_ICON["VIP_SHOP"] = 12] = "VIP_SHOP";
        E_MAIN_ICON[E_MAIN_ICON["ACT_EX_ROLE"] = 13] = "ACT_EX_ROLE";
        E_MAIN_ICON[E_MAIN_ICON["FOLLOW"] = 14] = "FOLLOW";
        E_MAIN_ICON[E_MAIN_ICON["INVITE"] = 15] = "INVITE";
        E_MAIN_ICON[E_MAIN_ICON["SHORTCUT"] = 16] = "SHORTCUT";
        E_MAIN_ICON[E_MAIN_ICON["ACT_SEVEN"] = 17] = "ACT_SEVEN"; // 永久七日登入
    })(E_MAIN_ICON = ui.E_MAIN_ICON || (ui.E_MAIN_ICON = {}));
    /**
     * 主界面
     */
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            var _this = _super.call(this, "yw.MainSkin") || this;
            _this.m_top_status = E_MAIN_TOP.FULL;
            // 战斗界面开关回调
            _this.is_bv_visible = true;
            _this.bvvl_add = undefined;
            _this.bvvl_add_this = undefined;
            _this.bvvl_remove = undefined;
            _this.bvvl_remove_this = undefined;
            // endregion
            // region 红点检查
            _this.last_tick_alarm = 0;
            _this.last_tick_icon = 0;
            _this.init();
            return _this;
        }
        /**
         * ui内容初始化
         */
        MainView.prototype.init = function () {
            this.groupRoot.touchEnabled = false;
            this.initGuiText();
            this.initEvent();
            /// play 背景音乐
            Singleton.Get(MusicManager).play(MUSICTYPE.MT_INGAME);
            // 初始化聊天提示
            this.updateChatHasNew(false);
            Singleton.Get(RegisterUpdate).register(this);
        };
        /**
         * ui文字初始化
         */
        MainView.prototype.initGuiText = function () {
        };
        /**
         * 初始化事件绑定
         */
        MainView.prototype.initEvent = function () {
            this.btnBattle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBattle, this);
            this.btnBag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBag, this);
            this.btnShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnShop, this);
            this.btnRole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRole, this);
            this.btnCastle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCastle, this);
            this.btn_chat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Chat, this);
            this.groupAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAvatar, this);
            Singleton.Get(PlayerInfoManager).addInfoListener(this.onPlayerInfoSync, this);
            this.hideAllButMe(this.imgBtnBattleActive);
            this.showBg(false);
            this.btnGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGold, this);
            this.btnSAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGold, this);
            this.btnDiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDiamond, this);
            this.btnSAddDiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDiamond, this);
            //////////////////////////////临时测试/////////////////////////////////////////
            this.groupVip.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                Singleton.Get(ui.VipView).open();
            }, this);
            // 初始化头像头像遮罩
            this.initAvatarMask();
            this.setBtnActive(true);
            this.labBtnChat.text = Template.getGUIText("ui_ex_main_16");
            this.labBtnMain1.text = Template.getGUIText("ui_ex_main_9");
            this.labBtnMain2.text = Template.getGUIText("ui_ex_main_10");
            this.labBtnMain3.text = Template.getGUIText("ui_ex_main_11");
            this.labBtnMain4.text = Template.getGUIText("ui_ex_main_12");
            this.labBtnMain5.text = Template.getGUIText("ui_ex_main_13");
        };
        MainView.prototype.initAvatarMask = function () {
            this.imgAvatar.mask = this.imgAvatarMask;
        };
        MainView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        MainView.prototype.componentCreated = function () {
            this.m_entries_menu3 = new eui.ArrayCollection();
            this.dgMenu3.itemRenderer = ui.MainSubMenuItemRenderer;
            this.dgMenu3.dataProvider = this.m_entries_menu3;
        };
        MainView.prototype.onDestroy = function () {
            this.btnBattle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBattle, this);
            this.btnBag.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBag, this);
            this.btnShop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnShop, this);
            this.btnRole.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRole, this);
            this.btnCastle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCastle, this);
            this.btn_chat.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Chat, this);
            this.groupAvatar.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAvatar, this);
            this.btnGold.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGold, this);
            this.btnSAddGold.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGold, this);
            this.btnDiamond.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDiamond, this);
            this.btnSAddDiamond.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDiamond, this);
            Singleton.Get(PlayerInfoManager).removeInfoListener(this.onPlayerInfoSync);
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        MainView.prototype.onUpdate = function (time) {
        };
        /**
         * 刷新聊天new图标
         * @author
         * @version
         */
        MainView.prototype.updateChatHasNew = function (is_new) {
            this.img_new_chat.visible = is_new;
        };
        /**
         * 隐藏主界面
         */
        MainView.prototype.hide = function () {
            this.groupRoot.visible = false;
        };
        /**
         * 显示主界面
         */
        MainView.prototype.show = function () {
            this.groupRoot.visible = true;
        };
        /**聊天 */
        MainView.prototype.onClick_Chat = function (e) {
            UtilsEffect.buttonEffect(this.btn_chat, function () {
                // 等级限制
                if (!OpenManager.CheckOpenWithInfo(OpenType.Chat)) {
                    return;
                }
                Singleton.Get(LayerManager).getView(ui.ChatView).open();
            }, this);
        };
        /**
         * 按钮点击事件
         */
        MainView.prototype.onClick_btnBattle = function (e, is_touch) {
            if (is_touch === void 0) { is_touch = true; }
            if (is_touch || e)
                UtilsEffect.buttonEffect(this.btnBattle);
            this.hideAllButMe(this.imgBtnBattleActive);
            this.showBattlePanel();
            Singleton.Get(LayerManager).getView(ui.BattleView).activateTask(true);
            Singleton.Get(LayerManager).getView(ui.PrivLvgiftView).tryAutoOpen();
        };
        MainView.prototype.onClick_btnBag = function (e) {
            if (e) {
                UtilsEffect.buttonEffect(this.btnBag);
            }
            this.hideAllButMe(this.imgBtnBagActive);
            this.showBagPanel();
        };
        MainView.prototype.onClick_btnShop = function (e) {
            var _this = this;
            if (e) {
                UtilsEffect.buttonEffect(this.btnShop);
                Singleton.Get(LayerManager).getView(ui.RoleGetFaceView).initBgTexture(function () {
                    _this.hideAllButMe(_this.imgBtnShopActive);
                    _this.showDrawCardPanel();
                }, this);
                return;
            }
            this.hideAllButMe(this.imgBtnShopActive);
            this.showDrawCardPanel();
        };
        MainView.prototype.onClick_btnRole = function (e) {
            if (e) {
                UtilsEffect.buttonEffect(this.btnRole);
            }
            this.hideAllButMe(this.imgBtnRoleActive);
            this.showRolePanel();
        };
        MainView.prototype.onClick_btnCastle = function (e) {
            if (e) {
                UtilsEffect.buttonEffect(this.btnCastle);
            }
            this.hideAllButMe(this.imgBtnCastleActive);
            this.showSchoolPanel();
        };
        /**
         * 响应完成登录
         */
        MainView.prototype.onLoginComplete = function () {
            var msg = Singleton.Get(LoginManager).loginInfo;
            this.labPlayerName.text = msg.nickname;
            this.labGold.text = UtilsGame.numberToString(msg.gold);
            this.labDiamond.text = msg.diamond.toString();
            this.labVipLevel.text = "" + msg.vip_level;
            this.labTeamLevel.text = "ч." + msg.team_lv;
            this.labBattleValue.text = "战力：" + UtilsGame.numberToString(msg.team_current_fighting);
            this.progressExp.value = msg.team_exp / Template.grade.get(msg.team_lv).LvExp;
            this.labExp.text = UtilsGame.numberToString(msg.team_exp) + "/" + UtilsGame.numberToString(Template.grade.get(msg.team_lv).LvExp);
            // 没有头像则不设置头像
            ResManager.asyncsetHeadImg(msg.icon_url, this.imgAvatar, this);
        };
        /**
         * 响应玩家信息变更
         */
        MainView.prototype.onPlayerInfoSync = function () {
            if (!this.labGold) {
                return;
            }
            // 获取玩家信息Manager
            var player_info_mgr = Singleton.Get(PlayerInfoManager);
            // 长顶栏更新
            this.labGold.text = UtilsGame.numberToString(player_info_mgr.getGold());
            this.labDiamond.text = player_info_mgr.getDiamond().toString();
            this.labTeamLevel.text = "ч." + player_info_mgr.getTeamLv() + "";
            this.progressExp.value = player_info_mgr.getTeamExp() / Template.grade.get(player_info_mgr.getTeamLv()).LvExp * 100;
            this.labBattleValue.text = player_info_mgr.getTeamCurrentFighting().toString();
            this.labVipLevel.text = "" + player_info_mgr.getVipLevel();
            if (player_info_mgr.getTeamLv() > 50) {
                this.labExp.text = UtilsGame.numberToString(player_info_mgr.getTeamExp() / Template.grade.get(player_info_mgr.getTeamLv()).LvExp * 100) + "%";
            }
            else {
                this.labExp.text = UtilsGame.numberToString(player_info_mgr.getTeamExp()) + "/" + UtilsGame.numberToString(Template.grade.get(player_info_mgr.getTeamLv()).LvExp);
            }
            // 短顶栏更新
            this.labSGold.text = UtilsGame.numberToString(player_info_mgr.getGold());
            this.labSDiamond.text = player_info_mgr.getDiamond().toString();
            this.labSFight.text = player_info_mgr.getTeamCurrentFighting() + "";
            // 通知：通知更新
            Singleton.Get(RoleManager).getRolesInfo().updateAlarm();
        };
        // region 分页切换
        /**
         * 显示角色面板
         */
        MainView.prototype.showRolePanel = function () {
            this.showBg(true);
            this.switchTopStatus(E_MAIN_TOP.SHORT);
            this.btn_chat.visible = false;
            this.groupEarning.visible = false;
            this.setBtnActive(false);
            Singleton.Get(LayerManager).getView(ui.RoleBaseView).open();
            Singleton.Get(LayerManager).setGameLayerActive(false);
        };
        MainView.prototype.closeRolePanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleBaseView).close();
        };
        /**
         * 显示主页面板
         */
        MainView.prototype.showSchoolPanel = function () {
            this.showBg(true);
            this.switchTopStatus(E_MAIN_TOP.FULL);
            this.btn_chat.visible = false;
            this.groupEarning.visible = true;
            this.setBtnActive(true);
            Singleton.Get(LayerManager).getView(ui.SchoolView).open();
            Singleton.Get(LayerManager).setGameLayerActive(false);
        };
        MainView.prototype.showSchoolSubPanel = function () {
            this.showBg(true);
            this.switchTopStatus(E_MAIN_TOP.SHORT);
            this.btn_chat.visible = false;
            this.groupEarning.visible = false;
            this.setBtnActive(false);
            Singleton.Get(LayerManager).setGameLayerActive(false);
        };
        MainView.prototype.closeSchoolPanel = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.SchoolView).close();
            layer.getView(ui.SchoolView).closeAllSubPanel();
            layer.getView(ui.RankView).close();
            layer.getView(ui.RankTowerView).close();
            layer.getView(ui.ShopView).close();
            layer.getView(ui.ShopListView).close();
            layer.getView(ui.DuelView).close();
            layer.getView(ui.DuelLineupView).close();
            layer.getView(ui.DailyTaskView).close();
            layer.getView(ui.TowerView).close();
            BossViewHandler.close();
        };
        /**
         * 显示背包面板
         */
        MainView.prototype.showBagPanel = function () {
            this.showBg(true);
            this.switchTopStatus(E_MAIN_TOP.SHORT);
            this.btn_chat.visible = false;
            this.groupEarning.visible = false;
            this.setBtnActive(false);
            Singleton.Get(LayerManager).getView(ui.BagBaseView).open();
            Singleton.Get(LayerManager).setGameLayerActive(false);
        };
        MainView.prototype.closeBagPanel = function () {
            Singleton.Get(LayerManager).getView(ui.BagBaseView).close();
        };
        /**
         * 显示抽卡面板
         */
        MainView.prototype.showDrawCardPanel = function () {
            this.showBg(true);
            this.switchTopStatus(E_MAIN_TOP.SHORT);
            this.btn_chat.visible = false;
            this.groupEarning.visible = false;
            this.setBtnActive(false);
            Singleton.Get(LayerManager).getView(ui.DrawBaseView).open();
            Singleton.Get(LayerManager).setGameLayerActive(false);
        };
        MainView.prototype.closeDrawCardPanel = function () {
            Singleton.Get(LayerManager).getView(ui.DrawBaseView).close();
        };
        /**
         * 显示战斗面板
         */
        MainView.prototype.showBattlePanel = function () {
            this.showBg(false);
            this.switchTopStatus(E_MAIN_TOP.FULL);
            this.btn_chat.visible = true;
            this.groupEarning.visible = true;
            this.setBtnActive(true);
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.BattleView).visible = true;
            layer.getView(ui.CloseupView).visible = true;
            layer.setGameLayerActive(true);
            this.is_bv_visible = true;
            if (this.bvvl_add != undefined) {
                var e = new egret.Event(egret.Event.REMOVED_FROM_STAGE);
                e.$setTarget(layer.getView(ui.BattleView));
                this.bvvl_add.call(this.bvvl_add_this, e);
            }
            // Singleton.Get(LayerManager).addView(Singleton.Get(LayerManager).getView(ui.BattleView));
        };
        /**
         * 关闭战斗面板, 关闭战斗声音
         */
        MainView.prototype.closeBattlePanel = function () {
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(layer.getView(ui.BattleView)) && layer.getView(ui.BattleView).visible == true) {
                // layer.removeView(layer.getView(ui.BattleView));
                layer.getView(ui.BattleView).visible = false;
                layer.getView(ui.CloseupView).visible = false;
                this.is_bv_visible = false;
                if (this.bvvl_remove != undefined) {
                    var e = new egret.Event(egret.Event.REMOVED_FROM_STAGE);
                    e.$setTarget(layer.getView(ui.BattleView));
                    this.bvvl_remove.call(this.bvvl_remove_this, e);
                }
            }
        };
        /**
         * 切换顶栏状态
         * @param type
         */
        MainView.prototype.switchTopStatus = function (type) {
            if (this.m_top_status == type) {
                return;
            }
            if (!this.groupTop || !this.groupTopShort) {
                return;
            }
            egret.Tween.removeTweens(this.groupTop);
            egret.Tween.removeTweens(this.groupTopShort);
            switch (type) {
                case E_MAIN_TOP.HIDE:
                    this.groupTop.visible = false;
                    this.groupTopShort.visible = false;
                    break;
                case E_MAIN_TOP.SHORT:
                    switch (this.m_top_status) {
                        case E_MAIN_TOP.FULL:
                            this.groupTop.visible = false;
                            this.groupTop.y = -this.groupTop.height;
                            this.groupTopShort.visible = true;
                            this.groupTopShort.y = 0;
                            /**
                            this.groupTop.y = 0;
                            const tw_full:  egret.Tween = egret.Tween.get(this.groupTop);
                            tw_full.to({y:  - this.groupTop.height}, 180, egret.Ease.sineOut);

                            this.groupTopShort.y = - this.groupTopShort.height;
                            const tw_short:  egret.Tween = egret.Tween.get(this.groupTopShort);
                            tw_short.to({y:  0}, 300, egret.Ease.sineOut);
                             */
                            break;
                        case E_MAIN_TOP.HIDE:
                            this.groupTop.visible = true;
                            this.groupTopShort.visible = true;
                            this.groupTop.y = -this.groupTop.height;
                            this.groupTopShort.y = 0;
                            break;
                    }
                    break;
                case E_MAIN_TOP.FULL:
                    switch (this.m_top_status) {
                        case E_MAIN_TOP.SHORT:
                            this.groupTop.visible = true;
                            this.groupTop.y = 0;
                            this.groupTopShort.visible = false;
                            this.groupTopShort.y = -this.groupTopShort.height;
                            /**
                            this.groupTop.y = - this.groupTop.height;
                            const tw_full:  egret.Tween = egret.Tween.get(this.groupTop);
                            tw_full.to({y:  0}, 300, egret.Ease.sineOut);

                            this.groupTopShort.y = 0;
                            const tw_short:  egret.Tween = egret.Tween.get(this.groupTopShort);
                            tw_short.to({y:  - this.groupTopShort.height}, 180, egret.Ease.sineOut);
                             */
                            break;
                        case E_MAIN_TOP.HIDE:
                            this.groupTop.visible = true;
                            this.groupTopShort.visible = true;
                            this.groupTop.y = 0;
                            this.groupTopShort.y = -this.groupTopShort.height;
                            break;
                    }
                    break;
            }
            this.m_top_status = type;
        };
        MainView.prototype.addBattleViewListenser = function (type, callback, thisObj) {
            switch (type) {
                case egret.Event.ADDED_TO_STAGE:
                    this.bvvl_add = callback;
                    this.bvvl_add_this = thisObj;
                    break;
                case egret.Event.REMOVED_FROM_STAGE:
                    this.bvvl_remove = callback;
                    this.bvvl_remove_this = thisObj;
                    break;
                default:
                    break;
            }
        };
        MainView.prototype.removeBattleViewListenser = function (type) {
            switch (type) {
                case egret.Event.ADDED_TO_STAGE:
                    this.bvvl_add = undefined;
                    this.bvvl_add_this = undefined;
                    break;
                case egret.Event.REMOVED_FROM_STAGE:
                    this.bvvl_remove = undefined;
                    this.bvvl_remove_this = undefined;
                    break;
                default:
                    break;
            }
        };
        /**
         * 切换按钮显示状态
         * @param me
         */
        MainView.prototype.hideAllButMe = function (me) {
            this.closeRolePanel();
            this.closeSchoolPanel();
            this.closeDrawCardPanel();
            this.closeBagPanel();
            if (this.imgBtnBattleActive != me) {
                this.closeBattlePanel();
            }
            this.imgBtnBagActive.visible = this.imgBtnBagActive == me;
            this.imgBtnBattleActive.visible = this.imgBtnBattleActive == me;
            this.imgBtnCastleActive.visible = this.imgBtnCastleActive == me;
            this.imgBtnRoleActive.visible = this.imgBtnRoleActive == me;
            this.imgBtnShopActive.visible = this.imgBtnShopActive == me;
            this.refreshBtnShopNew();
            this.refreshBtnCastleNew();
            this.refreshBtnRoleNew();
            this.refreshBtnBagNew();
            this.menu2.refreshBtnMailNew();
            // 切换关卡收益显示状态
            // this.groupEarning.visible = (this.imgBtnBattleActive == me || this.imgBtnCastleActive == me);
        };
        /**
         * 显示背景
         */
        MainView.prototype.showBg = function (showOrHide) {
            // this.groupBg.visible = showOrHide;
            // this.groupBg.visible = false;
            Singleton.Get(ui.BgView).visible = showOrHide;
            // Singleton.Get(ui.BgView).visible = true;
        };
        // endregion
        // region 红点控制
        MainView.prototype.showBtnShopNew = function (show) {
            this.img_new_btnShop.visible = show;
        };
        MainView.prototype.refreshBtnShopNew = function () {
            var info = Singleton.Get(DrawCardManager).getInfo();
            var free = true;
            if (info) {
                var sc = Singleton.Get(ScrollManager).getScroll(DrawCardManager.FREE_ITEM_SCROLL_ID);
                var item = false;
                if (sc && sc.count > 0)
                    item = true;
                free = PlayerDrawCardInfo.GetCurrentFreeDmd(info) || item;
            }
            this.showBtnShopNew(free);
        };
        MainView.prototype.showBtnCastleNew = function (show) {
            this.img_new_btnCastle.visible = show;
        };
        MainView.prototype.refreshBtnCastleNew = function () {
            var remind = Singleton.Get(SchoolManager).checkRemind();
            this.showBtnCastleNew(remind);
        };
        MainView.prototype.showBtnRoleNew = function (show) {
            this.img_new_btnRole.visible = show;
        };
        MainView.prototype.refreshBtnRoleNew = function () {
            var info = Singleton.Get(RoleManager).getRolesInfo();
            var lup_info = Singleton.Get(RoleLineupRecManager).getRecInfo();
            this.img_new_btnRole.visible = info.al_role || info.al_compose || info.al_backup || info.al_hero || lup_info.isAnyAlarm();
        };
        MainView.prototype.showBtnBagNew = function (show) {
            this.img_new_btnBag.visible = show;
        };
        MainView.prototype.refreshBtnBagNew = function () {
            this.showBtnBagNew(Singleton.Get(BagManager).getAlarm().hasAnyAlarm());
        };
        MainView.prototype.refreshBtnBattleBew = function () {
            this.img_new_btnBattle.visible = Singleton.Get(DailyTaskManager).getData().checkAnyRewardAvailable();
        };
        // endregion
        // region 特殊按钮控制
        MainView.prototype.onClick_btnAvatar = function () {
            Singleton.Get(LayerManager).getView(ui.PlayerDetailView).open();
        };
        MainView.prototype.onClick_btnGold = function () {
            Singleton.Get(ui.ShopGoldBuyPanelView).open();
        };
        MainView.prototype.onClick_btnDiamond = function () {
            Singleton.Get(ui.PayView).open();
        };
        MainView.prototype.setBtnActive = function (is_active) {
            this.menu1.visible = is_active;
            this.menu2.visible = is_active;
            this.dgMenu3.visible = is_active;
        };
        MainView.prototype.update = function (time) {
            var now = UtilsGame.Now();
            if (now - this.last_tick_alarm > DEFINE.ALARM_MAIN_UPDATE_DURATION) {
                this.last_tick_alarm = now;
                this.refreshBtnBattleBew();
                this.refreshBtnShopNew();
                this.refreshBtnCastleNew();
                this.refreshBtnRoleNew();
                this.refreshBtnBagNew();
            }
            var dura_menu = now - UtilsGame.getLoginStamp() > DEFINE.ICON_MAIN_UPDATE_DURATION ? DEFINE.ICON_MAIN_UPDATE_DURATION : DEFINE.ALARM_MAIN_UPDATE_DURATION;
            if (now - this.last_tick_icon > dura_menu) {
                this.last_tick_icon = now;
                this.initMenu3();
            }
        };
        // endregion
        // region 关卡信息
        /**
         * 设定关卡信息
         */
        MainView.prototype.setLevel = function (levelId, exp_per_hour, gold_per_hour) {
            var levelInfo = Template.level.get(levelId);
            if (!levelInfo) {
                egret.error("Can't set level info, Incorrect levelId:  " + levelId);
                return;
            }
            this.labStageName.text = Template.getGUIText(levelInfo.Name) + " " + levelId;
            this.labExpEarning.text = UtilsGame.stringHander(Template.getGUIText("ui_pve_17"), UtilsGame.numberToString(exp_per_hour));
            this.labGoldEarning.text = UtilsGame.stringHander(Template.getGUIText("ui_pve_18"), UtilsGame.numberToString(gold_per_hour));
            // 收益信息放大缩小动画
            // let tw_earning:  egret.Tween = egret.Tween.get(this.groupEarning);
            UtilsEffect.buttonEffect(this.groupEarning);
        };
        // endregion
        // region 分享关注
        /**
         * 设定第三排图标显示状态
         */
        MainView.prototype.initMenu3 = function () {
            this.dgMenu3.setLists(Template.config.SubmenuSort3);
            this.dgMenu3.refresh();
        };
        return MainView;
    }(BaseUI));
    ui.MainView = MainView;
    __reflect(MainView.prototype, "ui.MainView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=MainView.js.map