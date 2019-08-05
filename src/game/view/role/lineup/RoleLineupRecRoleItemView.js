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
    var RoleLineupRecRoleItemView = (function (_super) {
        __extends(RoleLineupRecRoleItemView, _super);
        function RoleLineupRecRoleItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.RoleLineupRecRoleItemSkin";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
            return _this;
        }
        RoleLineupRecRoleItemView.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.initView(this.data);
            // this.playAni(this.data.id);
        };
        RoleLineupRecRoleItemView.prototype.initView = function (role_id) {
            var cfg_role = Template.role.get(role_id);
            if (!cfg_role) {
                return;
            }
            var cfg_awaken = Template.awaken.get(cfg_role.AwakenID);
            if (!cfg_awaken) {
                return;
            }
            // 角色名
            this.labName.text = Template.getGUIText(cfg_role.Name);
            this.labName.textColor = RoleUtil.GetRoleNameColor(cfg_role.Star);
            // 角色品质
            ResManager.AsyncSetTexture(this.imgTierBg, Common.getRoleTierBgResEx(cfg_role.Star));
            // 角色头像
            ResManager.AsyncSetTexture(this.imgAvatar, cfg_role.Icon);
            // 角色勾玉
            ResManager.AsyncSetTexture(this.imgTama, Common.getRoleTamaResEx(cfg_awaken.AwakenStar, 0));
            // 角色类型
            this.labType.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText(cfg_role.Position));
            // 是否拥有
            if (!Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id)) {
                this.imgMask.visible = true;
            }
            else {
                this.imgMask.visible = false;
            }
        };
        RoleLineupRecRoleItemView.prototype.playAni = function (id) {
        };
        RoleLineupRecRoleItemView.prototype.onClick = function () {
            Singleton.Get(LayerManager).getView(ui.RoleDetailView).open(this.data, true, true);
        };
        return RoleLineupRecRoleItemView;
    }(eui.ItemRenderer));
    ui.RoleLineupRecRoleItemView = RoleLineupRecRoleItemView;
    __reflect(RoleLineupRecRoleItemView.prototype, "ui.RoleLineupRecRoleItemView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleLineupRecRoleItemView.js.map