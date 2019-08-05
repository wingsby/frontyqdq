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
    var RoleListItemUnlockedView = (function (_super) {
        __extends(RoleListItemUnlockedView, _super);
        /**
         * 构造函数
         */
        function RoleListItemUnlockedView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.RoleListItemUnlockedSkin";
            return _this;
        }
        /**
         * 响应创建子对象
         */
        RoleListItemUnlockedView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        RoleListItemUnlockedView.prototype.dataChanged = function () {
            // this.playAni(this.data.ani_idx);
            var _this = this;
            var role_id = this.data.roleId;
            var role_info = Template.role.get(role_id);
            if (!role_info) {
                egret.error("no roleId: " + role_id);
                return;
            }
            // 角色原画
            this.imgCard.source = "kp_bm_png";
            ResManager.AsyncSetTexture(this.imgCard, "kp_bm_png", function () {
                if (_this.data.no_stand) {
                    ResManager.AsyncSetTexture(_this.imgCard, Common.getRoleListLockedRes(role_id));
                }
                else {
                    ResManager.AsyncSetTexture(_this.imgCard, Common.getRoleListRes(role_id));
                }
            }, this);
            // 可合成状态
            this.groupCompose.visible = this.data.is_composable;
            if (this.data.is_composable || this.data.coolest) {
                var fake_role = new RoleInfo();
                fake_role.InitByRoleConfigIdAndLv(role_id, 1);
                var awaken_info = Template.awaken.get(role_info.AwakenID);
                if (!awaken_info) {
                    egret.error("no roleId: " + role_id + "，awakenId: " + role_info.AwakenID);
                    return;
                }
                // 角色名
                this.labName.text = RoleUtil.GetFullRoleName(role_id);
                this.labName.textColor = RoleUtil.GetRoleNameColor(fake_role.getTier(), true);
                // 等级
                this.labLv.text = fake_role.lv.toString();
                // 初始勾玉
                // this.imgTama.horizontalCenter = Common.getRoleListTamaHorizontalCenter(awaken_info.AwakenStar);
                ResManager.AsyncSetTexture(this.imgTama, Common.getRoleTamaResEx(awaken_info.AwakenStar, 0));
                // 上阵状态
                this.imgLineup.visible = false;
                // 边框
                ResManager.AsyncSetTexture(this.imgBorder, Common.getRoleListBorderRes(role_info.Star));
                // 战力
                this.labFighting.text = fake_role.fighting.toString();
                // 突破次数
                this.labBreach.text = fake_role.breach.toString();
                // 战力文字位置
                this.labFighting.validateNow();
                this.labTxtFighting.right = 14 + this.labFighting.width;
                // 红点
                this.imgNew.visible = false;
                return;
            }
            var pve_team = Singleton.Get(RoleManager).getRolesInfo().pve_team;
            var my_roles_group = Singleton.Get(RoleManager).getRolesInfo();
            var my_role_info = my_roles_group.GetRole(role_id);
            if (!my_role_info) {
                my_role_info = new RoleInfo();
                my_role_info.InitByRoleConfigIdAndLv(role_id, 1);
            }
            var is_lineup = pve_team.containsValue(role_id);
            var my_talent_info = Template.talent.get(my_role_info.talent);
            // 角色名
            this.labName.text = Template.getGUIText(role_info.Name);
            // this.labName.text = RoleUtil.GetFullRoleName(role_id);
            this.labName.textColor = RoleUtil.GetRoleNameColor(my_role_info.getTier(), true);
            // 等级
            this.labLv.visible = true;
            this.labLv.text = my_role_info.lv.toString();
            // 勾玉
            // this.imgTama.horizontalCenter = Common.getRoleListTamaHorizontalCenter(my_role_info.getAwakenStar());
            ResManager.AsyncSetTexture(this.imgTama, Common.getRoleTamaResEx(my_role_info.getAwakenStar(), my_role_info.getAwakenActiveStar()));
            // 上阵状态
            this.imgLineup.visible = is_lineup;
            // 边框
            ResManager.AsyncSetTexture(this.imgBorder, Common.getRoleListBorderRes(my_role_info.getTier()));
            // 战力
            this.labFighting.text = my_role_info.fighting.toString();
            // 突破次数
            this.labBreach.text = my_role_info.breach.toString();
            // 战力文字位置
            this.labFighting.validateNow();
            this.labTxtFighting.right = 14 + this.labFighting.width;
            // 红点
            this.imgNew.visible = my_role_info.alarm.al_role;
            // 可选屏蔽红点
            if (this.data.no_new) {
                this.imgNew.visible = false;
            }
            // 可选屏蔽出阵状态
            if (this.data.no_lineup) {
                this.imgLineup.visible = false;
            }
        };
        RoleListItemUnlockedView.prototype.playAni = function (id) {
            if (id < 0) {
                return;
            }
            this.groupRoot.alpha = 0;
            this.groupRoot.scaleY = 1.4;
            this.groupRoot.y = 120;
            var tw = egret.Tween.get(this.groupRoot);
            tw.wait(id * 50).to({ alpha: 1, scaleY: 1, y: 0 }, 100, egret.Ease.sineOut);
            this.groupName.alpha = 0;
            var tw_name = egret.Tween.get(this.groupName);
            tw_name.wait(id * 50 + 80).to({ alpha: 1 }, 100, egret.Ease.sineOut);
        };
        return RoleListItemUnlockedView;
    }(eui.ItemRenderer));
    ui.RoleListItemUnlockedView = RoleListItemUnlockedView;
    __reflect(RoleListItemUnlockedView.prototype, "ui.RoleListItemUnlockedView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleListItemUnlockedView.js.map