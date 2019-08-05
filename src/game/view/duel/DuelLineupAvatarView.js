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
    var DuelLineupAvatarView = (function (_super) {
        __extends(DuelLineupAvatarView, _super);
        function DuelLineupAvatarView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.DuelLineupAvatarSkin";
            return _this;
        }
        DuelLineupAvatarView.prototype.dataChanged = function () {
            if (this.data == null) {
                return;
            }
            this.initView(this.data);
        };
        DuelLineupAvatarView.prototype.initView = function (role_id) {
            if (role_id <= 0) {
                this.groupRole.visible = false;
                this.groupPlus.visible = true;
                // 无角色的情况
                return;
            }
            // 有角色的情况
            this.groupRole.visible = true;
            this.groupPlus.visible = false;
            var role_info = Template.role.get(role_id);
            if (role_info == null) {
                console.error("Can't get role info, role id: " + role_id);
                return;
            }
            var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (my_role == null) {
                console.error("Can't get player role info, role id: " + role_id);
                return;
            }
            this.labLv.text = my_role.lv.toString();
            ResManager.AsyncSetTexture(this.imgIcon, role_info.Icon);
            ResManager.AsyncSetTexture(this.imgTierBg, Common.getRoleTierBgResEx(my_role.getTier()));
            ResManager.AsyncSetTexture(this.imgTierSub, Common.getRoleTierSubResEx(my_role.getTier()));
            ResManager.AsyncSetTexture(this.imgTama, Common.getRoleTamaResEx(my_role.getAwakenStar(), my_role.getAwakenActiveStar()));
        };
        DuelLineupAvatarView.prototype.onClick = function () {
        };
        return DuelLineupAvatarView;
    }(eui.ItemRenderer));
    ui.DuelLineupAvatarView = DuelLineupAvatarView;
    __reflect(DuelLineupAvatarView.prototype, "ui.DuelLineupAvatarView");
})(ui || (ui = {}));
//# sourceMappingURL=DuelLineupAvatarView.js.map