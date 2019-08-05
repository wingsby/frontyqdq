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
    var RoleGetSingleView = (function (_super) {
        __extends(RoleGetSingleView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function RoleGetSingleView() {
            var _this = _super.call(this, "yw.RoleGetSingleSkin") || this;
            _this.cur_role_id = 0;
            _this.open_time = 0;
            _this.off_exit_time = 2500;
            _this.touchEnabled = true;
            _this.init();
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        RoleGetSingleView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        RoleGetSingleView.prototype.onDestroy = function () {
        };
        /**
         * 帧更新
         * @param time
         */
        RoleGetSingleView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化
         */
        RoleGetSingleView.prototype.init = function () {
            this.btn_close.text = Template.getGUIText("info1");
            this.btn_again.text = Template.getGUIText("ui_card4");
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn_Close, this);
            this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn_Again, this);
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        RoleGetSingleView.prototype.open = function (role_id, frag, type) {
            if (type === void 0) { type = DrawCardType.Item; }
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.draw_type = type;
            this.initRoleInfo(role_id, frag);
            // 不显示按钮
            this.btn_again.visible = false;
            this.btn_close.visible = false;
            // 初始化引导检查时钟
            this.m_check_timer = new egret.Timer(this.off_exit_time, 1);
            this.m_check_timer.addEventListener(egret.TimerEvent.TIMER, this.onCheckTick, this);
            this.m_check_timer.start();
            Singleton.Get(LayerManager).getView(ui.GuideView).visible = false;
        };
        /**
         * 关闭本界面
         */
        RoleGetSingleView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
            // 关闭引导检查时钟
            this.m_check_timer = undefined;
            Singleton.Get(LayerManager).getView(ui.GuideView).visible = true;
        };
        RoleGetSingleView.prototype.onCheckTick = function () {
            if (this.m_check_timer) {
                this.m_check_timer.stop();
                Singleton.Get(LayerManager).getView(ui.GuideView).visible = true;
                this.btn_again.visible = true;
                this.btn_close.visible = true;
            }
        };
        // endregion
        // region 填充数据
        RoleGetSingleView.prototype.initRoleInfo = function (role_id, frag) {
            Common.fillRoleCardLocked(role_id, this.compCard);
            if (frag > 0) {
                this.imgAlreadyBg.visible = true;
                this.imgAlreadyFrag.visible = true;
                this.lab_already.visible = true;
                this.lab_already.text = UtilsGame.stringHander(Template.getGUIText("ui_card"), frag);
            }
            else {
                this.imgAlreadyBg.visible = false;
                this.imgAlreadyFrag.visible = false;
                this.lab_already.visible = false;
            }
            this.cur_role_id = role_id;
            this.open_time = UtilsGame.Now();
            this.refreshAgain();
            var role_entity = Template.role.get(role_id);
            if (role_entity) {
                this.initEffect(role_entity.Star);
            }
        };
        /**
         * 初始化特效
         */
        RoleGetSingleView.prototype.initEffect = function (star) {
            // this.mcEffect1.clearMovieClip();
            // this.mcEffect1.setMovieClip("effect_card2");
            // this.mcEffect1.gotoAndPlay("effect_card2", -1);
            this.mcEffect0.clearMovieClip();
            this.mcEffect0.setMovieClip("ui_cardshow");
            this.mcEffect0.gotoAndPlay("ui_cardshow", 1);
            this.mcEffect0.setScale(3.33);
            switch (star) {
                case 1:
                    this.mcEffect0.filters = UtilsEffect.blueFilters();
                    this.imgCardBorder.filters = UtilsEffect.blueFilters();
                    break;
                case 2:
                    this.mcEffect0.filters = UtilsEffect.purpleFilters();
                    this.imgCardBorder.filters = UtilsEffect.purpleFilters();
                    break;
                case 3:
                    this.mcEffect0.filters = UtilsEffect.orangeFilters();
                    this.imgCardBorder.filters = UtilsEffect.orangeFilters();
                    break;
                case 4:
                    this.mcEffect0.filters = UtilsEffect.redFilters();
                    this.imgCardBorder.filters = UtilsEffect.redFilters();
                    break;
            }
            this.imgCardBorder.alpha = 0;
            Common.playDrawCardEffect(this.cur_role_id, this.compCard, this.imgCardBorder, this.effectKiraTama, this.imgCardBack);
        };
        RoleGetSingleView.prototype.refreshAgain = function () {
            switch (this.draw_type) {
                case DrawCardType.Item:
                    {
                        var item = Template.item.get(Template.config.CardItem[0]);
                        this.btn_again.icon = item.iIcon;
                        var scroll_info = Singleton.Get(ScrollManager).getScroll(DrawCardManager.FREE_ITEM_SCROLL_ID);
                        if (scroll_info && scroll_info.count > 0) {
                            var s_cfg = Template.scroll.get(scroll_info.id);
                            this.btn_again.cost = UtilsGame.stringHander(Template.getGUIText("append_343"), UtilsGame.numberToString(scroll_info.count), UtilsGame.numberToString(s_cfg.UpperL));
                            this.btn_again.enough = true;
                        }
                        else {
                            var current_has = Singleton.Get(BagManager).getItemCount(Template.config.CardItem[0]);
                            var one_cost = Template.config.CardItem[1];
                            this.btn_again.cost = UtilsGame.numberToString(current_has) + "/" + UtilsGame.numberToString(one_cost);
                            this.btn_again.enough = current_has >= one_cost;
                        }
                    }
                    break;
                case DrawCardType.Dmd:
                    {
                        var current_has = Singleton.Get(PlayerInfoManager).getDiamond();
                        var one_cost = Template.config.CardDiamonds;
                        var info = Singleton.Get(DrawCardManager).getInfo();
                        var free = true;
                        if (info) {
                            free = PlayerDrawCardInfo.GetCurrentFreeDmd(info);
                        }
                        if (free) {
                            this.btn_again.enough = true;
                            this.btn_again.cost = Template.getGUIText("append_342");
                        }
                        else {
                            this.btn_again.cost = UtilsGame.numberToString(one_cost);
                            this.btn_again.enough = current_has >= one_cost;
                        }
                        this.btn_again.icon = DEFINE.UI_ALERT_INFO.diamond.res;
                    }
                    break;
                case DrawCardType.Lmt:
                    {
                        var current_has = Singleton.Get(PlayerInfoManager).getDiamond();
                        var one_cost = Template.config.CardLimited;
                        this.btn_again.cost = UtilsGame.numberToString(one_cost);
                        this.btn_again.enough = current_has >= one_cost;
                        this.btn_again.icon = DEFINE.UI_ALERT_INFO.diamond.res;
                    }
                    break;
            }
        };
        RoleGetSingleView.prototype.onBtn_Again = function () {
            if (UtilsGame.Now() - this.open_time <= this.off_exit_time) {
                return;
            }
            this.close();
            switch (this.draw_type) {
                case DrawCardType.Item:
                    Singleton.Get(DrawCardManager).onReqItemOne();
                    break;
                case DrawCardType.Dmd:
                    Singleton.Get(DrawCardManager).onReqDmdOne();
                    break;
                case DrawCardType.Lmt:
                    Singleton.Get(DrawCardManager).onReqLmtOne();
                    break;
            }
        };
        RoleGetSingleView.prototype.onBtn_Close = function () {
            if (UtilsGame.Now() - this.open_time <= this.off_exit_time) {
                return;
            }
            this.close();
        };
        return RoleGetSingleView;
    }(PopupUI));
    ui.RoleGetSingleView = RoleGetSingleView;
    __reflect(RoleGetSingleView.prototype, "ui.RoleGetSingleView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleGetSingleView.js.map