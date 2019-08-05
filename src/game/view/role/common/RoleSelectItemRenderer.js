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
    var RoleSelectItemRenderer = (function (_super) {
        __extends(RoleSelectItemRenderer, _super);
        function RoleSelectItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.comp.RoleSelectItemRendererSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        RoleSelectItemRenderer.prototype.onAddToStage = function () {
            this.btnOperate.isNew = false;
            this.btnOperate.text = "选择";
            this.btnOperate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOperate, this);
        };
        RoleSelectItemRenderer.prototype.onRemoveFromStage = function () {
            this.btnOperate.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOperate, this);
        };
        RoleSelectItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            if (this.data.role_id > 0) {
                this.initRole(this.data.role_id);
            }
        };
        RoleSelectItemRenderer.prototype.onClick_btnOperate = function () {
            var parent = Singleton.Get(LayerManager).getView(ui.RoleSelectView);
            parent.onOperate(this.data.role_id);
        };
        RoleSelectItemRenderer.prototype.initRole = function (role_id) {
            var cfg_role = Template.role.get(role_id);
            if (!cfg_role) {
                console.error("no role cfg: " + role_id);
                return;
            }
            var inf_roles = Singleton.Get(RoleManager).getRolesInfo();
            var inf_role = inf_roles.GetRole(role_id);
            if (!inf_role) {
                console.error("no role inf: " + role_id);
                return;
            }
            ResManager.setTexture(this.imgIcon, cfg_role.Icon);
            ResManager.setTexture(this.imgTama, Common.getRoleTamaResEx(inf_role.getAwakenStar(), inf_role.getAwakenActiveStar()));
            ResManager.setTexture(this.imgTierBg, Common.getRoleTierBgResEx(inf_role.getTier()));
            ResManager.setTexture(this.imgTierSub, Common.getRoleTierSubResEx(inf_role.getTier()));
            this.labLv.text = inf_role.lv.toString();
            this.supBond.visible = false;
            this.supLineup.visible = inf_roles.IsHero(role_id);
            this.labName.text = RoleUtil.GetFullRoleName(role_id);
            this.labName.textColor = RoleUtil.GetRoleNameColor(inf_role.getTier());
            this.labFighting.text = "战力：" + inf_role.fighting;
            this.labBond.visible = false;
            // 副将信息
            var is_backup = inf_roles.IsInBackup(role_id);
            this.labBackup.visible = is_backup;
            if (is_backup) {
                var hero_id = inf_roles.GetBackupsHeroId(role_id);
                var cfg_role_hero = Template.role.get(hero_id);
                if (!cfg_role) {
                    console.log("no backup's hero cfg: " + hero_id);
                }
                else {
                    this.labBackup.text = RoleUtil.GetFullRoleName(hero_id) + "的副将";
                }
            }
        };
        return RoleSelectItemRenderer;
    }(eui.ItemRenderer));
    ui.RoleSelectItemRenderer = RoleSelectItemRenderer;
    __reflect(RoleSelectItemRenderer.prototype, "ui.RoleSelectItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=RoleSelectItemRenderer.js.map