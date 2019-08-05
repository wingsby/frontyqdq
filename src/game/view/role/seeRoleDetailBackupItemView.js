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
    var seeRoleDetailBackupItemView = (function (_super) {
        __extends(seeRoleDetailBackupItemView, _super);
        /**
         * @constructor
         */
        function seeRoleDetailBackupItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.RoleLineupBackupItemSkin";
            return _this;
        }
        /**
         * 响应数据变更
         */
        seeRoleDetailBackupItemView.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            console.log(this.data);
            this.setRole(this.data.my_lv, this.data.bk_pos, this.data.hero_id, this.data.role_id);
            // 红点
            this.imgNew.visible = false;
        };
        /**
         * 设定角色信息
         * @param pos
         * @param bk_pos
         */
        seeRoleDetailBackupItemView.prototype.setRole = function (my_lv, bk_pos, hero_id, role_id) {
            console.log("my_lv: " + my_lv + ", bk_pos: " + bk_pos + ", hero_id: " + hero_id + ", role_id: " + role_id);
            this.groupEmpty.visible = false;
            this.groupEmptyOther.visible = false;
            // 未解锁
            var unlocked_count = RoleUtil.GetMaxBackupCounts(my_lv);
            if (bk_pos > unlocked_count) {
                this.groupNormal.visible = false;
                this.groupEmpty.visible = false;
                this.groupLocked.visible = true;
                // 显示X级解锁
                var unlock_lv = Template.config.Backup[bk_pos - 1];
                this.labUnlock.text = "队伍" + unlock_lv + "级";
                return;
            }
            // 无角色
            if (role_id <= 0) {
                this.groupNormal.visible = false;
                this.groupLocked.visible = false;
                this.groupEmptyOther.visible = true;
                return;
            }
            // 有角色
            this.groupLocked.visible = false;
            this.groupEmpty.visible = false;
            this.groupNormal.visible = true;
            var roles = this.data.roles;
            var role_info = Template.role.get(role_id);
            if (!role_info) {
                YWLogger.error("can't find role, role id: " + role_id);
                return;
            }
            var my_role = roles.GetRole(role_id);
            if (!my_role) {
                YWLogger.error("can't get player role. role id: " + role_id);
                return;
            }
            this.labLv.text = my_role.lv.toString();
            ResManager.AsyncSetTexture(this.imgAvatar, role_info.Icon);
            ResManager.AsyncSetTexture(this.imgTama, Common.getRoleTamaResEx(my_role.getAwakenStar(), my_role.getAwakenActiveStar()));
            ResManager.AsyncSetTexture(this.imgTierBg, Common.getRoleTierBgResEx(my_role.getTier()));
            ResManager.AsyncSetTexture(this.imgTierSub, Common.getRoleTierSubResEx(my_role.getTier()));
            // 计算角色副将属性
            var str_attrs = RoleUtil.genBackupAttrStrs(role_id, false, roles);
            this.labAttr1.text = str_attrs[0];
            this.labAttr2.text = str_attrs[1];
        };
        return seeRoleDetailBackupItemView;
    }(eui.ItemRenderer));
    ui.seeRoleDetailBackupItemView = seeRoleDetailBackupItemView;
    __reflect(seeRoleDetailBackupItemView.prototype, "ui.seeRoleDetailBackupItemView");
})(ui || (ui = {}));
//# sourceMappingURL=seeRoleDetailBackupItemView.js.map