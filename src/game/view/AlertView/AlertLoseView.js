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
    var AlertLoseView = (function (_super) {
        __extends(AlertLoseView, _super);
        /**
         * 构造函数
         */
        function AlertLoseView() {
            return _super.call(this, "yw.AlertLoseSkin") || this;
        }
        /**
         * 响应子元素创建
         */
        AlertLoseView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 响应组件生成
         */
        AlertLoseView.prototype.componentCreated = function () {
            this.init();
        };
        /**
         * 初始化
         */
        AlertLoseView.prototype.init = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        /**
         * 销毁
         */
        AlertLoseView.prototype.onDestroy = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        /**
         * 帧更新
         * @param time
         */
        AlertLoseView.prototype.onUpdate = function (time) {
        };
        /**
         * 打开界面
         */
        AlertLoseView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
        };
        /**
         * 关闭界面
         */
        AlertLoseView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        /**
         * 响应添加到舞台
         * @param e
         */
        AlertLoseView.prototype.onAddToStage = function (e) {
            this.btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
            this.btnLevelup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLevelup, this);
            this.btnEquip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEquip, this);
            this.btnDraw.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDraw, this);
            this.btnLineup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLineup, this);
            this.btnRoleBreach.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRoleBreach, this);
            this.btnRoleAwaken.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRoleAwaken, this);
            this.btnDmg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDmg, this);
        };
        /**
         * 响应从舞台移除
         * @param e
         */
        AlertLoseView.prototype.onRemoveFromStage = function (e) {
            this.btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
            this.btnLevelup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLevelup, this);
            this.btnEquip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEquip, this);
            this.btnDraw.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDraw, this);
            this.btnLineup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLineup, this);
            this.btnRoleBreach.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRoleBreach, this);
            this.btnRoleAwaken.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRoleAwaken, this);
            this.btnDmg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDmg, this);
        };
        // region 响应点击事件
        /**
         * 响应关闭事件
         * @param e
         */
        AlertLoseView.prototype.onClick_btnHandler = function (e) {
            this.close();
        };
        AlertLoseView.prototype.onClick_btnLevelup = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnLevelup, function () {
                _this.close();
                Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnRole(undefined);
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).openRole(Singleton.Get(RoleManager).getRolesInfo().getStrongestTeamRoleId());
            }, this);
        };
        AlertLoseView.prototype.onClick_btnEquip = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnEquip, function () {
                _this.close();
                Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnRole(undefined);
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).openRole(Singleton.Get(RoleManager).getRolesInfo().getStrongestTeamRoleId());
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).openEquipPanel();
            });
        };
        AlertLoseView.prototype.onClick_btnDraw = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnDraw, function () {
                _this.close();
                Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnShop(undefined);
            });
        };
        AlertLoseView.prototype.onClick_btnLineup = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnLineup, function () {
                _this.close();
                Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnRole(undefined);
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).onClick_btnLineup();
                RoleUtil.openHeroOpinion();
            });
        };
        AlertLoseView.prototype.onClick_btnRoleBreach = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnRoleBreach, function () {
                _this.close();
                Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnRole(undefined);
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).openRole(Singleton.Get(RoleManager).getRolesInfo().getStrongestTeamRoleId());
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).onClick_btnBreach(undefined);
            });
        };
        AlertLoseView.prototype.onClick_btnRoleAwaken = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnRoleAwaken, function () {
                _this.close();
                Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnRole(undefined);
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).openRole(Singleton.Get(RoleManager).getRolesInfo().getStrongestTeamRoleId());
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).onClick_btnAwaken(undefined);
            });
        };
        AlertLoseView.prototype.onClick_btnDmg = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnDmg, function () {
                if (OpenManager.CheckOpenWithInfo(OpenType.Dmg)) {
                    _this.close();
                    Singleton.Get(LayerManager).getView(ui.DmgView).open();
                }
            });
        };
        return AlertLoseView;
    }(PopupUI));
    ui.AlertLoseView = AlertLoseView;
    __reflect(AlertLoseView.prototype, "ui.AlertLoseView");
})(ui || (ui = {}));
//# sourceMappingURL=AlertLoseView.js.map