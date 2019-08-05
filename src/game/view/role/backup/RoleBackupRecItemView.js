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
    var RoleBackupRecItemView = (function (_super) {
        __extends(RoleBackupRecItemView, _super);
        function RoleBackupRecItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.RoleBackupRecItemSkin";
            return _this;
        }
        RoleBackupRecItemView.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.setBackup(this.data.role_id);
        };
        RoleBackupRecItemView.prototype.setBackup = function (role_id) {
            var cfg_role = Template.role.get(role_id);
            if (!cfg_role) {
                return;
            }
            // 角色名
            this.labName.text = Template.getGUIText(cfg_role.Name);
            this.labName.textColor = RoleUtil.GetRoleNameColor(cfg_role.Star);
            // 角色品质
            ResManager.AsyncSetTexture(this.imgTier, Common.getRoleTierBgResEx(cfg_role.Star));
            // 角色头像
            ResManager.AsyncSetTexture(this.imgAvatar, cfg_role.Icon);
            // 品质特效
            this.mcSp.clearMovieClip(); // 暂时禁用副将预览头像特效
            /**
            this.mcSp.scaleX = 1.15;
            this.mcSp.scaleY = 1.15;
            this.mcSp.clearMovieClip();
            if (cfg_role.Star >= 3) {
                this.mcSp.setMovieClip(DEFINE.EFF_ITEM_FRAME_TOP);
                this.mcSp.gotoAndPlay(DEFINE.EFF_ITEM_FRAME_TOP, -1);
            }

            if (cfg_role.Star >= 4) {
                this.mcSp.scaleX = 1.2;
                this.mcSp.scaleY = 1.2;
                this.mcSp.setMovieClip(Common.getItemEffName(6));
                this.mcSp.gotoAndPlay(Common.getItemEffName(6), -1);
            }
             */
            // 是否拥有
            this.imgMask.visible = !Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            // 副将属性
            var str_attrs = RoleUtil.genBackupAttrStrs(role_id, true);
            this.labAttr1.text = str_attrs[0];
            this.labAttr2.text = str_attrs[1];
        };
        return RoleBackupRecItemView;
    }(eui.ItemRenderer));
    ui.RoleBackupRecItemView = RoleBackupRecItemView;
    __reflect(RoleBackupRecItemView.prototype, "ui.RoleBackupRecItemView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleBackupRecItemView.js.map