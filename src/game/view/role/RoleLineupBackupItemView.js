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
    var RoleLineupBackupItemView = (function (_super) {
        __extends(RoleLineupBackupItemView, _super);
        /**
         * @constructor
         */
        function RoleLineupBackupItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.RoleLineupBackupItemSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        /**
         * 响应添加到舞台
         * @param e
         */
        RoleLineupBackupItemView.prototype.onAddToStage = function (e) {
            this.btnAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAvatar, this);
        };
        /**
         * 响应从舞台移除
         * @param e
         */
        RoleLineupBackupItemView.prototype.onRemoveFromStage = function (e) {
            this.btnAvatar.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAvatar, this);
        };
        /**
         * 响应数据变更
         */
        RoleLineupBackupItemView.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.setRole(this.data.my_lv, this.data.bk_pos, this.data.hero_id, this.data.role_id);
            // 红点
            this.imgNew.visible = Singleton.Get(RoleManager).getRolesInfo().hasAnyRoleIdle();
        };
        /**
         * 设定角色信息
         * @param pos
         * @param bk_pos
         */
        RoleLineupBackupItemView.prototype.setRole = function (my_lv, bk_pos, hero_id, role_id) {
            this.groupEmptyOther.visible = false;
            if (!my_lv) {
                my_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
            }
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
                if (!this.data.other) {
                    this.groupEmpty.visible = true;
                    this.groupEmptyOther.visible = false;
                }
                else {
                    this.groupEmpty.visible = false;
                    this.groupEmptyOther.visible = true;
                }
                return;
            }
            // 有角色
            this.groupLocked.visible = false;
            this.groupEmpty.visible = false;
            this.groupNormal.visible = true;
            var roles = this.data.roles ? this.data.roles : Singleton.Get(RoleManager).getRolesInfo();
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
            var str_attrs = RoleUtil.genBackupAttrStrs(role_id);
            this.labAttr1.text = str_attrs[0];
            this.labAttr2.text = str_attrs[1];
        };
        RoleLineupBackupItemView.prototype.onClick_btnAvatar = function (e) {
            /**
            // 未解锁
            let unlocked_count: number = RoleUtil.GetMaxBackupCounts();
            if(this.data.bk_pos > unlocked_count) {
                let unlock_lv: number = Template.config.Backup[this.data.bk_pos - 1];
                Singleton.Get(DialogControler).showString(UtilsGame.stringHandler(Template.getGUIText("append_213")), unlock_lv); // TODO 加到字典表
                return;
            }

            let roles: PlayerRolesInfo = Singleton.Get(RoleManager).getRolesInfo();

            // 无角色 弹出副将选择
            if(this.data.role_id <= 0) {
                Singleton.Get(LayerManager).getView(ui.RoleSelectBackupPanelView).open(this.data.bk_pos, roles.getPosByLup(this.data.lup));
                return;
            }

            // 有角色 弹出副将详情
            Singleton.Get(LayerManager).getView(ui.RoleBackupDetailPanelView).open(this.data.bk_pos, roles.getPosByLup(this.data.lup));
            */
            if (!this.data || this.data.other) {
                return;
            }
            if (Singleton.Get(GuideManager).CouldYouPleaseWaitForMe("RoleLineupView", "btnAgentBackup", this.onClick_btnAvatar, this, e)) {
                return;
            }
            RoleUtil.handleLineupBackupGo(this.data.lup, this.data.bk_pos, this.data.role_id);
        };
        return RoleLineupBackupItemView;
    }(eui.ItemRenderer));
    ui.RoleLineupBackupItemView = RoleLineupBackupItemView;
    __reflect(RoleLineupBackupItemView.prototype, "ui.RoleLineupBackupItemView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleLineupBackupItemView.js.map