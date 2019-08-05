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
    /**
     * 主将选择界面
     */
    var RoleSelectHeroAlertView = (function (_super) {
        __extends(RoleSelectHeroAlertView, _super);
        // region 生命周期管理
        function RoleSelectHeroAlertView() {
            var _this = _super.call(this, "yw.RoleSelectHeroAlertSkin") || this;
            _this.m_cur_seat_id = 0;
            _this.m_cur_lup = 0;
            // endregion
            // region 引导
            _this.agent_role_id = 0;
            _this.init();
            return _this;
        }
        RoleSelectHeroAlertView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        RoleSelectHeroAlertView.prototype.componentCreated = function () {
            this.listHeros.itemRenderer = RoleSelectHeroAlertItemView;
        };
        RoleSelectHeroAlertView.prototype.init = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        RoleSelectHeroAlertView.prototype.onDestroy = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        RoleSelectHeroAlertView.prototype.onUpdate = function (time) {
        };
        RoleSelectHeroAlertView.prototype.onAddToStage = function () {
            this.compEmpty.text = Template.getGUIText("ui_role89");
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnAgent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        RoleSelectHeroAlertView.prototype.onRemoveFromStage = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnAgent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        // endregion
        // region 显示隐藏
        /**
         * 显示
         */
        RoleSelectHeroAlertView.prototype.open = function (seat_id) {
            if (!seat_id) {
                console.error("incorrect seat_id: " + seat_id);
                return;
            }
            this.m_cur_seat_id = seat_id;
            this.initList();
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            if (this.compEmpty.visible) {
                this.compEmpty.playAni();
            }
        };
        /**
         * 显示
         * @param lup
         */
        RoleSelectHeroAlertView.prototype.openByLineupId = function (lup) {
            this.m_cur_seat_id = Singleton.Get(RoleManager).getRolesInfo().getPosByLup(lup);
            this.m_cur_lup = lup;
            this.initList();
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            if (this.compEmpty.visible) {
                this.compEmpty.playAni();
            }
        };
        /**
         * 隐藏
         */
        RoleSelectHeroAlertView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.btnAgent.visible = false;
        };
        /**
         * 响应点击关闭按钮
         */
        RoleSelectHeroAlertView.prototype.onClick_btnClose = function () {
            this.close();
        };
        RoleSelectHeroAlertView.prototype.initList = function () {
            var roles_info = Singleton.Get(RoleManager).getRolesInfo();
            var cur_role_id = roles_info.pve_team.get(this.m_cur_seat_id);
            this.ds_list_roles = [];
            this.listHeros.dataProvider = new eui.ArrayCollection(this.ds_list_roles);
            for (var i = 0; i < roles_info.roles.length; i++) {
                var my_r_info = roles_info.roles[i];
                var r_info = Template.role.get(my_r_info.role_id);
                // 不显示当前要被替换的斗士
                if (my_r_info.role_id == cur_role_id) {
                    continue;
                }
                // 资质
                var talent_info = Template.talent.get(my_r_info.talent);
                if (talent_info == undefined) {
                    console.error("no talent, roleId: " + r_info + "，talentId: " + my_r_info.talent);
                    return;
                }
                // 勾玉
                var awaken_info = Template.awaken.get(my_r_info.awaken);
                if (awaken_info == undefined) {
                    console.error("no awaken, roleId: " + r_info + "，awakenId: " + my_r_info.awaken);
                    return;
                }
                // 获取副将的当前主副将状态
                var is_hero = roles_info.IsHero(my_r_info.role_id);
                var backup_of = 0;
                if (!is_hero) {
                    backup_of = roles_info.GetBackupsHeroId(my_r_info.role_id);
                }
                var hero_status_str = "";
                if (is_hero) {
                    // hero_status_str = "已上阵";
                    continue; // 暂时不显示已上阵的斗士
                }
                else if (backup_of > 0) {
                    var backup_of_hero_info = Template.role.get(backup_of);
                    if (backup_of_hero_info == undefined) {
                        console.error("no backup's hero, hero roleId: " + backup_of);
                    }
                    hero_status_str = Template.getGUIText(backup_of_hero_info.Name) + "的副将";
                }
                // 获取上阵后可激活的羁绊数量
                // console.log("=================" + RoleUtil.GetFullRoleName(my_r_info.role_id) + "==================");
                var pre_active_bonds = roles_info.PreChangeHeroActiveBonds(my_r_info.role_id, this.m_cur_seat_id);
                // console.log(RoleUtil.GetFullRoleName(my_r_info.role_id) + ": " + "可激活羁绊+" + pre_active_bonds);
                this.ds_list_roles.push({
                    // 角色基本信息
                    roleId: my_r_info.role_id,
                    heroName: RoleUtil.GetFullRoleName(my_r_info.role_id),
                    heroNameColor: RoleUtil.GetRoleNameColor(my_r_info.getTier()),
                    heroFight: "战力：" + my_r_info.fighting,
                    heroBond: "",
                    // heroBond: pre_active_bonds > 0 ? "可激活羁绊+" + pre_active_bonds : "", // 羁绊内容
                    // 角色头像
                    heroAvatar: r_info.Icon,
                    heroTierBg: Common.getRoleTierBgResEx(my_r_info.getTier()),
                    heroTierSub: Common.getRoleTierSubResEx(my_r_info.getTier()),
                    heroTama: Common.getRoleTamaResEx(my_r_info.getAwakenStar(), my_r_info.getAwakenActiveStar()),
                    heroLv: my_r_info.lv,
                    // 关联斗士信息
                    isHero: is_hero,
                    backupOf: backup_of,
                    heroBackup: hero_status_str,
                    // 用于排序的信息
                    sortFighting: my_r_info.fighting,
                    sortBondActive: pre_active_bonds,
                    sortIsHero: is_hero,
                    sortIsBackup: backup_of > 0
                });
            }
            this.ds_list_roles.sort(function (a, b) {
                if (a.sortIsHero != b.sortIsHero) {
                    return a.sortIsHero ? 1 : -1;
                }
                if (a.sortIsBackup != b.sortIsBackup) {
                    return a.sortIsBackup ? 1 : -1;
                }
                if (a.sortFighting != b.sortFighting) {
                    return (a.sortFighting > b.sortFighting) ? -1 : 1;
                }
                if (a.sortBondActive != b.sortBondActive) {
                    return a.sortBondActive ? -1 : 1;
                }
                return 0;
            });
            this.compEmpty.visible = !(this.ds_list_roles.length > 0);
        };
        /**
         * 请求上阵主将
         * @param role_id
         */
        RoleSelectHeroAlertView.prototype.onReqChangeHero = function (role_id) {
            Singleton.Get(RoleManager).onReqChangeHero(this.m_cur_lup, role_id);
        };
        RoleSelectHeroAlertView.prototype.initAgent = function (idx) {
            var list_role = this.ds_list_roles[idx - 1];
            if (!list_role) {
                console.log("no enough role.");
                this.btnAgent.visible = false;
                this.btnAgent.y = -800;
                return;
            }
            this.agent_role_id = list_role.roleId;
            this.btnAgent.visible = true;
            this.btnAgent.y = 98 + 102 * (idx - 1);
        };
        RoleSelectHeroAlertView.prototype.onClick_btnAgent = function () {
            this.onReqChangeHero(this.agent_role_id);
            this.close();
        };
        return RoleSelectHeroAlertView;
    }(PopupUI));
    ui.RoleSelectHeroAlertView = RoleSelectHeroAlertView;
    __reflect(RoleSelectHeroAlertView.prototype, "ui.RoleSelectHeroAlertView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleSelectHeroAlertView.js.map