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
    var RoleGetNewView = (function (_super) {
        __extends(RoleGetNewView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function RoleGetNewView() {
            var _this = _super.call(this, "yw.RoleGetNewSkin") || this;
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
        RoleGetNewView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        RoleGetNewView.prototype.onDestroy = function () {
        };
        /**
         * 帧更新
         * @param time
         */
        RoleGetNewView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化
         */
        RoleGetNewView.prototype.init = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_this, this);
            var lab = [this.labWordClose];
            for (var i = 0; i < lab.length; ++i) {
                lab[i].text = Template.getGUIText(lab[i].text);
            }
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        RoleGetNewView.prototype.open = function (role_id, frag, close_fun, callObj, arg, d_type) {
            if (frag === void 0) { frag = 0; }
            if (arg === void 0) { arg = 0; }
            if (d_type === void 0) { d_type = undefined; }
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.initRoleInfo(role_id);
            if (frag > 0) {
                this.lab_already.visible = true;
                this.img_aleady_bg.visible = true;
                this.img_already_frag.visible = true;
                this.lab_already.text = UtilsGame.stringHander(Template.getGUIText("ui_card"), frag);
            }
            else {
                this.lab_already.visible = false;
                this.img_aleady_bg.visible = false;
                this.img_already_frag.visible = false;
            }
            this.arg = arg;
            this.call_obj = callObj;
            this.d_type = d_type;
            this.close_call_back = close_fun;
            this.open_time = UtilsGame.Now();
            // 初始化引导检查时钟
            this.m_check_timer = new egret.Timer(this.off_exit_time, 1);
            this.m_check_timer.addEventListener(egret.TimerEvent.TIMER, this.onCheckTick, this);
            this.m_check_timer.start();
            Singleton.Get(LayerManager).getView(ui.GuideView).visible = false;
        };
        /**
         * 关闭本界面
         */
        RoleGetNewView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
            if (this.close_call_back) {
                this.close_call_back.call(this.call_obj, this.arg, this.d_type);
            }
            // 关闭引导检查时钟
            this.m_check_timer = undefined;
            Singleton.Get(LayerManager).getView(ui.GuideView).visible = true;
        };
        RoleGetNewView.prototype.onCheckTick = function () {
            if (this.m_check_timer != undefined) {
                this.m_check_timer.stop();
            }
            Singleton.Get(LayerManager).getView(ui.GuideView).visible = true;
        };
        // endregion
        // region 填充数据
        RoleGetNewView.prototype.initRoleInfo = function (role_id) {
            this.cur_role_id = role_id;
            Common.fillRoleCardLocked(role_id, this.compCard);
            var role_entity = Template.role.get(role_id);
            if (role_entity) {
                this.initEffect(role_entity.Star);
            }
        };
        /**
         * 初始化特效
         */
        RoleGetNewView.prototype.initEffect = function (star) {
            // this.mcEffect.clearMovieClip();
            // this.mcEffect.setMovieClip("effect_card2");
            // this.mcEffect.gotoAndPlay("effect_card2", -1);
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
        // endregion
        // region 按钮事件
        /**
         * 响应关闭按钮
         * @param e
         */
        RoleGetNewView.prototype.onClick_this = function (e) {
            if (UtilsGame.Now() - this.open_time < this.off_exit_time) {
                return;
            }
            if (Singleton.Get(GuideManager).CouldYouPleaseWaitForMe("RoleGetNewView", "labWordClose", this.onClick_this, this, e)) {
                return;
            }
            this.effectKiraTama.reset();
            this.close();
        };
        return RoleGetNewView;
    }(PopupUI));
    ui.RoleGetNewView = RoleGetNewView;
    __reflect(RoleGetNewView.prototype, "ui.RoleGetNewView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleGetNewView.js.map