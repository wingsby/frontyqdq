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
     * 普通活动界面
     */
    var ActivityView = (function (_super) {
        __extends(ActivityView, _super);
        function ActivityView() {
            var _this = _super.call(this, "yw.ActivitySkin") || this;
            _this.arr_menu = new eui.ArrayCollection();
            _this.cur_act = 0;
            _this.cur_type = E_ACT_TYPE.BASIC; // 当前界面展示的活动类型
            _this.has_rank_opened = false; // 本次打开界面是否跳转过排行榜
            _this.back_to_school = false;
            // endregion
            // region 页面切换
            _this.tab_cur_open = E_ACT_DESIGN_TYPE.NULL;
            return _this;
        }
        ActivityView.prototype.componentCreated = function () {
            this.dgMenu.itemRenderer = ui.ActMenuItemRenderer;
            this.dgMenu.dataProvider = this.arr_menu;
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnSpInvest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSpInvest, this);
            this.groupGoto.touchEnabled = true;
            this.groupGoto.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_groupGoto, this);
        };
        ActivityView.prototype.onDestroy = function () {
            this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnSpInvest.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSpInvest, this);
            this.groupGoto.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_groupGoto, this);
        };
        ActivityView.prototype.onUpdate = function (time) {
        };
        // region 显示控制
        ActivityView.prototype.open = function (type, custom_menu) {
            Singleton.Get(PopupManager).addPopup(this);
            if (type) {
                this.cur_type = type;
            }
            if (custom_menu) {
                this.m_custom_menu = [];
                for (var i = 0; i < custom_menu.length; i++) {
                    this.m_custom_menu.push({
                        act_id: custom_menu[i],
                        type: type
                    });
                }
            }
            else {
                this.m_custom_menu = undefined;
            }
            this.initMenu();
            this.initView();
            Singleton.Get(RegisterUpdate).register(this);
            if (Singleton.Get(LayerManager).isViewOnStage(Singleton.Get(LayerManager).getView(ui.SchoolView))) {
                this.back_to_school = true;
            }
            // 重置滚动条
            this.scrMenu.viewport.scrollH = 0;
        };
        ActivityView.prototype.close = function () {
            Singleton.Get(PopupManager).removePopup(this);
            Singleton.Get(RegisterUpdate).unRegister(this);
            this.has_rank_opened = false;
            this.back_to_school = false;
        };
        ActivityView.prototype.refresh = function () {
            this.initView();
        };
        ActivityView.prototype.update = function (time) {
            this.initCountdown();
        };
        // endregion
        // region 数据初始化
        /**
         * 初始化菜单
         */
        ActivityView.prototype.initMenu = function () {
            var arr = [];
            // 初始化内容
            if (this.m_custom_menu) {
                for (var i = 0; i < this.m_custom_menu.length; i++) {
                    arr.push({
                        act_id: this.m_custom_menu[i].act_id,
                        type: this.m_custom_menu[i].type
                    });
                }
            }
            else {
                var inf_acts = ActivityUtil.getAllOpenAct();
                for (var i = 0; i < inf_acts.length; i++) {
                    if (inf_acts[i].type != this.cur_type) {
                        continue;
                    }
                    arr.push({
                        act_id: inf_acts[i].id,
                        type: inf_acts[i].type
                    });
                }
                // 非定制菜单模式隐藏一些活动
                for (var i = 0; i < arr.length; i++) {
                    switch (arr[i].act_id) {
                        case E_ACT_DESIGN_TYPE.LvRank:
                        case E_ACT_DESIGN_TYPE.PveRank:
                        case E_ACT_DESIGN_TYPE.DmdPlate:
                        case E_ACT_DESIGN_TYPE.ExRole:
                            arr.splice(i, 1);
                            i -= 1;
                    }
                }
            }
            // 剔除不应该显示的内容
            var info = Singleton.Get(ActivityManager).getInfo();
            for (var i = 0; i < arr.length; i++) {
                switch (arr[i].act_id) {
                    case E_ACT_DESIGN_TYPE.Seven:
                        // 隐藏七日登入
                        arr.splice(i, 1);
                        i -= 1;
                        break;
                    case E_ACT_DESIGN_TYPE.LvGrow:
                        if (info.isAllRewardReceived_LvGrow()) {
                            arr.splice(i, 1);
                            i -= 1;
                        }
                        break;
                    case E_ACT_DESIGN_TYPE.GkGrow:
                        if (info.isAllRewardReceived_GkGrow()) {
                            arr.splice(i, 1);
                            i -= 1;
                        }
                        break;
                }
            }
            arr.sort(this.sortMenu);
            if (arr[0]) {
                this.cur_act = arr[0].act_id;
            }
            if (arr.length <= 0) {
                this.groupContent.visible = false;
                this.groupSpInvest.visible = false;
                this.groupTip.visible = false;
            }
            else {
                this.groupContent.visible = true;
            }
            this.arr_menu.source = arr;
            this.setEmpty();
        };
        /**
         * 刷新菜单状态
         */
        ActivityView.prototype.refreshMenu = function () {
            var scr_h = this.scrMenu.viewport.scrollH;
            var new_source = [];
            for (var i = 0; i < this.dgMenu.dataProvider.length; i++) {
                var ori_src = this.arr_menu.source[i];
                new_source.push({
                    act_id: ori_src.act_id,
                    type: ori_src.type,
                    is_sel: (this.cur_act == ori_src.act_id)
                });
            }
            this.arr_menu.source = new_source;
            this.scrMenu.validateNow();
            this.scrMenu.viewport.scrollH = scr_h;
        };
        /**
         * 初始化内页
         */
        ActivityView.prototype.initView = function () {
            var _this = this;
            if (this.arr_menu.length <= 0) {
                this.lb_title.text = "没有已开启的活动";
                return;
            }
            var info = this.getCurInfo();
            var cfg_act = Template.activity.get(info.act_id);
            if (!cfg_act) {
                console.log("no activity: " + info.act_id);
                return;
            }
            this.lb_title.text = Template.getGUIText(cfg_act.Name);
            this.lb_explain.text = Template.getGUIText(cfg_act.Introduce);
            switch (info.act_id) {
                case E_ACT_DESIGN_TYPE.LvRank:
                    this.groupTip.visible = false;
                    this.groupGoto.visible = true;
                    // this.labTip.textFlow = new egret.HtmlTextParser().parse(Template.getGUIText("ui_activity22"));
                    this.labGoto.text = "我的排行";
                    Singleton.Get(RankManager).getRank(RankListType.TEAM_LV, function () {
                        var my_rank = Singleton.Get(RankManager).getMyRank(RankListType.TEAM_LV);
                        if (my_rank > 0) {
                            _this.labGotoR.text = my_rank.toString();
                        }
                        else {
                            _this.labGotoR.text = "未上榜";
                        }
                        _this.initShips(info.act_id);
                    }, this);
                    break;
                case E_ACT_DESIGN_TYPE.PveRank:
                    this.groupTip.visible = false;
                    this.groupGoto.visible = true;
                    // this.labTip.textFlow = new egret.HtmlTextParser().parse(Template.getGUIText("ui_activity22"));
                    this.labGoto.text = "我的排行";
                    Singleton.Get(RankManager).getRank(RankListType.PVE, function () {
                        var my_rank = Singleton.Get(RankManager).getMyRank(RankListType.PVE);
                        if (my_rank > 0) {
                            _this.labGotoR.text = my_rank.toString();
                        }
                        else {
                            _this.labGotoR.text = "未上榜";
                        }
                        _this.initShips(info.act_id);
                    }, this);
                    break;
                default:
                    this.groupTip.visible = false;
                    this.groupGoto.visible = false;
                    this.initShips(info.act_id);
                    break;
            }
        };
        ActivityView.prototype.initShips = function (act_id) {
            // 切换至指定分页
            this.switchTabs(act_id);
            // 切换特殊元素显示状态
            this.closeAllSp();
            this.initSp(act_id);
            // 显示选中框
            this.refreshMenu();
        };
        /**
         * 更新倒计时
         */
        ActivityView.prototype.initCountdown = function () {
            if (this.arr_menu.length <= 0) {
                this.lb_lessTime.text = Template.getGUIText("ui_activity18");
                return;
            }
            var info = this.getCurInfo();
            this.lb_lessTime.text = ActivityUtil.getCountdownStr(this.cur_act, info.type);
        };
        /**
         * 获取当前活动Info
         */
        ActivityView.prototype.getCurInfo = function () {
            for (var i = 0; i < this.arr_menu.source.length; i++) {
                if (this.arr_menu.source[i].act_id == this.cur_act) {
                    return this.arr_menu.source[i];
                }
            }
            return undefined;
        };
        /**
         * 菜单排序
         */
        ActivityView.prototype.sortMenu = function (a, b) {
            var rank_a = 0;
            var rank_b = 0;
            switch (Singleton.Get(LayerManager).getView(ActivityView).cur_type) {
                case E_ACT_TYPE.BASIC:
                    rank_a = Template.basicActivity.get(a.act_id).Rank;
                    rank_b = Template.basicActivity.get(b.act_id).Rank;
                    break;
                case E_ACT_TYPE.BEGIN:
                    rank_a = Template.beginActivity.get(a.act_id).Rank;
                    rank_b = Template.beginActivity.get(b.act_id).Rank;
                    break;
            }
            if (rank_a > rank_b) {
                return 1;
            }
            else if (rank_a < rank_b) {
                return -1;
            }
            return 0;
        };
        /**
         * 初始化特殊子页
         */
        ActivityView.prototype.initSp = function (act_id) {
            switch (act_id) {
                case E_ACT_DESIGN_TYPE.Invest:
                    var inf_act = Singleton.Get(ActivityManager).getInfo();
                    this.groupSpInvest.visible = true;
                    this.btnSpInvest.visible = !inf_act.has_invest;
                    this.imgSpInvestComp.visible = inf_act.has_invest;
                    break;
            }
        };
        /**
         * 关闭所有特殊子页
         */
        ActivityView.prototype.closeAllSp = function () {
            this.groupSpInvest.visible = false;
        };
        // endregion
        // region 点击响应
        /**
         * 响应关闭
         */
        ActivityView.prototype.onClick_btnClose = function () {
            if (this.has_rank_opened) {
                if (Singleton.Get(LayerManager).isViewOnStage(Singleton.Get(LayerManager).getView(ui.SchoolView))) {
                    Singleton.Get(ui.MainView).onClick_btnCastle(undefined);
                }
                else {
                    Singleton.Get(ui.MainView).onClick_btnBattle(undefined, false);
                }
            }
            this.close();
        };
        /**
         * 响应点击菜单
         */
        ActivityView.prototype.onClick_btnMenu = function (act_id) {
            this.cur_act = act_id;
            this.initView();
        };
        /**
         * 响应点击Goto按钮
         */
        ActivityView.prototype.onClick_groupGoto = function () {
            var _this = this;
            UtilsEffect.tabEffect(this.groupGoto, function () {
                if (!OpenManager.CheckOpenWithInfo(OpenType.Rank)) {
                    return;
                }
                _this.close();
                var rank_view = Singleton.Get(LayerManager).getView(ui.RankView);
                rank_view.return_to_activity = true;
                switch (_this.cur_act) {
                    case E_ACT_DESIGN_TYPE.LvRank:
                        rank_view.open(RankListType.TEAM_LV);
                        _this.has_rank_opened = true;
                        break;
                    case E_ACT_DESIGN_TYPE.PveRank:
                        _this.groupTip.visible = true;
                        rank_view.open(RankListType.PVE);
                        _this.has_rank_opened = true;
                        break;
                }
            }, this);
        };
        /**
         * 响应成长基金购买按钮点击事件
         */
        ActivityView.prototype.onClick_btnSpInvest = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnSpInvest, function () {
                var priv = Singleton.Get(PrivManager);
                if (priv.isClickEnable()) {
                    priv.setLastPayClick();
                    var cfg_pit_1 = ActivityUtil.getInvestPayItem();
                    if (!cfg_pit_1) {
                        return;
                    }
                    var inf_act = Singleton.Get(ActivityManager).getInfo();
                    if (UtilsGame.Now() - inf_act.invest_try_time < 3000) {
                        return;
                    }
                    var lgm = Singleton.Get(login.LoginDataManager);
                    if (lgm.loginData) {
                        inf_act.invest_try_time = UtilsGame.Now();
                        switch (lgm.loginData.pid) {
                            case I_Platform.p_wanba:
                                Singleton.Get(DialogControler).showInfo(1217, _this, function () {
                                    Singleton.Get(PlatformSDK).Pay(cfg_pit_1.itemId);
                                }, function () { }, cfg_pit_1.monetaryAmount * 10);
                                break;
                            default:
                                Singleton.Get(PlatformSDK).Pay(cfg_pit_1.itemId);
                                break;
                        }
                    }
                }
            }, this);
        };
        /**
         * 切换页面
         */
        ActivityView.prototype.switchTabs = function (type) {
            this.clearTabs();
            var target_view = this.getInnerByType(type);
            // console.log(target_view);
            if (target_view) {
                this.groupContent.addChild(target_view);
                switch (type) {
                    case E_ACT_DESIGN_TYPE.Turnplate:
                    case E_ACT_DESIGN_TYPE.DmdPlate:
                        this.groupInfo.visible = false;
                        this.groupContent.y = 152;
                        break;
                    default:
                        this.groupInfo.visible = true;
                        this.groupContent.y = 214;
                        break;
                }
            }
            this.tab_cur_open = type;
        };
        /**
         * 清空已打开的子界面
         */
        ActivityView.prototype.clearTabs = function () {
            if (this.tab_cur_open != E_ACT_DESIGN_TYPE.NULL) {
                var target_view = this.getInnerByType(this.tab_cur_open);
                if (target_view) {
                    this.groupContent.removeChild(target_view);
                }
            }
            this.tab_cur_open = E_ACT_DESIGN_TYPE.NULL;
        };
        /**
         * 根据活动类型获取内页视图对象
         */
        ActivityView.prototype.getInnerByType = function (type) {
            var layer = Singleton.Get(LayerManager);
            switch (type) {
                case E_ACT_DESIGN_TYPE.Seven:
                    return layer.getView(ui.ActSevenInnerView);
                case E_ACT_DESIGN_TYPE.LvRank:
                    return layer.getView(ui.ActLvRankInnerView);
                case E_ACT_DESIGN_TYPE.PveRank:
                    return layer.getView(ui.ActPveRankInnerView);
                case E_ACT_DESIGN_TYPE.AccRmb:
                    return layer.getView(ui.ActAccRmbInnerView);
                case E_ACT_DESIGN_TYPE.LimitSeven:
                    return layer.getView(ui.ActLimitSevenInnerView);
                case E_ACT_DESIGN_TYPE.LvGrow:
                    return layer.getView(ui.ActLvGrowInnerView);
                case E_ACT_DESIGN_TYPE.GkGrow:
                    return layer.getView(ui.ActGkGrowInnerView);
                case E_ACT_DESIGN_TYPE.Invest:
                    return layer.getView(ui.ActInvestInnerView);
                case E_ACT_DESIGN_TYPE.CheckIn:
                    return layer.getView(ui.ActCheckInInnerView);
                case E_ACT_DESIGN_TYPE.Gift:
                    return layer.getView(ui.ActGiftInnerView);
                case E_ACT_DESIGN_TYPE.LimitGift:
                    return layer.getView(ui.ActLimitGiftInnerView);
                case E_ACT_DESIGN_TYPE.AccSpend:
                    return layer.getView(ui.ActAccSpendInnerView);
                case E_ACT_DESIGN_TYPE.DayPay:
                    return layer.getView(ui.ActDayPayInnerView);
                case E_ACT_DESIGN_TYPE.Turnplate:
                    return layer.getView(ui.ActTurnplateInnerView);
                case E_ACT_DESIGN_TYPE.CDkey:
                    return layer.getView(ui.ActCDKeyInnerView);
                case E_ACT_DESIGN_TYPE.Duration:
                    return layer.getView(ui.ActDurationInnerView);
                case E_ACT_DESIGN_TYPE.DmdPlate:
                    return layer.getView(ui.ActDmdPlateInnerView);
                case E_ACT_DESIGN_TYPE.VipBenefit:
                    return layer.getView(ui.ActVipBenefitInnerView);
                case E_ACT_DESIGN_TYPE.VipWeekly:
                    return layer.getView(ui.ActVipWeeklyInnerView);
                case E_ACT_DESIGN_TYPE.RoleInvest:
                    return layer.getView(ui.ActRoleInvestInnerView);
                case E_ACT_DESIGN_TYPE.EnchantInvest:
                    return layer.getView(ui.ActEnchantInvestInnerView);
                case E_ACT_DESIGN_TYPE.JewelryInvest:
                    return layer.getView(ui.ActJewelryInvestInnerView);
            }
            return undefined;
        };
        // endregion
        // region 空页面控制
        ActivityView.prototype.setEmpty = function () {
            if (this.arr_menu.length <= 0) {
                this.compEmpty.text = Template.getGUIText("ui_activity25");
                this.compEmpty.visible = true;
                this.compEmpty.playAni();
            }
            else {
                this.compEmpty.visible = false;
            }
        };
        return ActivityView;
    }(PopupUI));
    ui.ActivityView = ActivityView;
    __reflect(ActivityView.prototype, "ui.ActivityView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=ActivityView.js.map