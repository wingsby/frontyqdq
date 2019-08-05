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
    var RoleLineupCardView = (function (_super) {
        __extends(RoleLineupCardView, _super);
        /**
         * @constructor
         */
        function RoleLineupCardView() {
            var _this = _super.call(this) || this;
            _this.m_is_active = false;
            _this.m_is_has_role = false;
            _this.m_role_id = 0;
            _this.skinName = "yw.RoleLineupCardSkin";
            _this.verticalCenter = 0;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        /**
         * 设定角色
         * @param role_id
         */
        RoleLineupCardView.prototype.setRole = function (role_id) {
            if (role_id <= 0) {
                this.groupEmpty.visible = true;
                this.cardRole.visible = false;
                this.m_is_has_role = false;
                return;
            }
            this.m_role_id = role_id;
            this.groupEmpty.visible = false;
            this.cardRole.visible = true;
            this.m_is_has_role = true;
            Common.fillRoleCard(role_id, this.cardRole);
        };
        /**
         * 设定激活状态
         * @param active
         */
        RoleLineupCardView.prototype.setActive = function (active) {
            this.m_is_active = active;
            if (!active) {
                if (!this.imgMask.visible) {
                    this.imgMask.alpha = 0;
                    var tw = egret.Tween.get(this.imgMask);
                    tw.to({ alpha: 1 }, 80);
                }
                this.filters = [];
            }
            else {
                this.filters = [];
            }
            this.imgMask.visible = !active;
            if (this.groupEmpty.visible) {
                this.btnChange.visible = false;
            }
            else {
                // 已禁用卡牌上的更换主将按钮
                this.btnChange.visible = false; // active;
            }
        };
        RoleLineupCardView.prototype.onAddToStage = function (e) {
            this.cardRole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_self, this);
            this.groupEmpty.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_self, this);
            this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange, this);
        };
        RoleLineupCardView.prototype.onRemoveFromStage = function (e) {
            this.cardRole.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_self, this);
            this.groupEmpty.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_self, this);
            this.btnChange.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange, this);
        };
        RoleLineupCardView.prototype.onClick_self = function (e) {
            if (Singleton.Get(GuideManager).CouldYouPleaseWaitForMe("RoleLineupView", "groupCard", this.onClick_self, this, e)) {
                return;
            }
            if (this.m_is_active && !this.m_is_has_role) {
                this.onClick_btnChange(e);
                return;
            }
            Singleton.Get(LayerManager).getView(ui.RoleLineupView).setResume();
            Singleton.Get(LayerManager).getView(ui.RoleBaseView).openRole(this.m_role_id);
            Singleton.Get(LayerManager).getView(ui.RoleLevelupView).playCardDynamicFromFather();
        };
        RoleLineupCardView.prototype.onClick_btnChange = function (e) {
            Singleton.Get(LayerManager).getView(ui.RoleLineupView).onClickExec_btnChange();
        };
        return RoleLineupCardView;
    }(eui.Component));
    ui.RoleLineupCardView = RoleLineupCardView;
    __reflect(RoleLineupCardView.prototype, "ui.RoleLineupCardView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleLineupCardView.js.map