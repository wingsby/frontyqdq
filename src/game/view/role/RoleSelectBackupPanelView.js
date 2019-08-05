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
    var RoleSelectBackupPanelView = (function (_super) {
        __extends(RoleSelectBackupPanelView, _super);
        // endregion
        // region 生命周期管理
        function RoleSelectBackupPanelView() {
            var _this = _super.call(this, "yw.RoleSelectBackupPanelSkin") || this;
            // 状态变量
            _this.m_cur_idx = 0;
            _this.m_cur_pos = 0;
            // endregion
            // region 引导
            _this.agent_role_id = 0;
            _this.init();
            return _this;
        }
        RoleSelectBackupPanelView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        RoleSelectBackupPanelView.prototype.componentCreated = function () {
        };
        RoleSelectBackupPanelView.prototype.onDestroy = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.listBackup.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listBackup, this);
            this.btnAgent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        RoleSelectBackupPanelView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化
         */
        RoleSelectBackupPanelView.prototype.init = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.listBackup.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listBackup, this);
            this.btnAgent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
            this.listBackup.itemRenderer = ui.RoleSelectBackupPanelItemView;
        };
        /**
         * 响应添加到舞台
         */
        RoleSelectBackupPanelView.prototype.onAddToStage = function () {
            this.compEmpty.text = Template.getGUIText("ui_role89");
        };
        /**
         * 响应从舞台中移除
         */
        RoleSelectBackupPanelView.prototype.onRemoveFromStage = function () {
        };
        // endregion
        // region 显示隐藏
        /**
         * 显示
         */
        RoleSelectBackupPanelView.prototype.open = function (idx, pos) {
            if (!idx) {
                egret.error("incorrect backup idx: " + idx);
                return;
            }
            this.m_cur_idx = idx;
            this.m_cur_pos = pos;
            this.initList();
            Singleton.Get(LayerManager).getPopup().addPopup(Singleton.Get(LayerManager).getView(ui.RoleSelectBackupPanelView));
            if (this.compEmpty.visible) {
                this.compEmpty.playAni();
            }
        };
        /**
         * 隐藏
         */
        RoleSelectBackupPanelView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(Singleton.Get(LayerManager).getView(ui.RoleSelectBackupPanelView));
            this.btnAgent.visible = false;
        };
        /**
         * 响应点击关闭按钮
         */
        RoleSelectBackupPanelView.prototype.onClick_btnClose = function () {
            this.close();
        };
        // endregion
        // region 列表逻辑
        /**
         * 初始化斗士列表
         */
        RoleSelectBackupPanelView.prototype.initList = function () {
            var roles_info = Singleton.Get(RoleManager).getRolesInfo();
            var cur_pos_backup_dict = roles_info.backup_info.get(this.m_cur_pos);
            var cur_role_id = 0;
            if (cur_pos_backup_dict) {
                cur_role_id = cur_pos_backup_dict.get(this.m_cur_idx);
            }
            var ds_list_roles = [];
            this.listBackup.dataProvider = new eui.ArrayCollection(ds_list_roles);
            // 主将信息 (可能为空)
            var hero_id = roles_info.pve_team.get(this.m_cur_pos);
            var cfg_hero = Template.role.get(hero_id);
            // 推荐副将说明文字
            this.labDes.text = RoleUtil.genBackupRecStr(hero_id);
            var cur_role_info = Template.role.get(cur_role_id);
            var cur_role_bond_raw = [];
            if (cur_role_info) {
                cur_role_bond_raw = cur_role_info.BondRole.split(";");
            }
            var _loop_1 = function (i) {
                var my_r_info = roles_info.roles[i];
                var r_info = Template.role.get(my_r_info.role_id);
                // 不显示当前要被替换的斗士
                if (my_r_info.role_id == cur_role_id) {
                    return "continue";
                }
                // 不显示当前副将对应的主将角色
                if (my_r_info.role_id == hero_id) {
                    return "continue";
                }
                // 获取资质信息
                var talent_info = Template.talent.get(my_r_info.talent);
                if (!talent_info) {
                    egret.error("no talent, roleId: " + my_r_info.role_id + "，talentId: " + my_r_info.talent);
                    return { value: void 0 };
                }
                // 勾玉
                var awaken_info = Template.awaken.get(my_r_info.awaken);
                if (!awaken_info) {
                    egret.error("no awaken, roleId: " + r_info + "，awakenId: " + my_r_info.awaken);
                    return { value: void 0 };
                }
                // 计算角色副将属性
                var attr = my_r_info.GetBackupAddAttr();
                var str_attrs = [];
                attr.foreachKey(function (key) {
                    if (key == -1) {
                        return;
                    }
                    var v = attr.get(key).toString();
                    if (key == RoleAttrType.Crit_Damage || key == RoleAttrType.Crit_Rate || key == RoleAttrType.Damage_Reduce || key == RoleAttrType.Crit_Res) {
                        v = UtilsGame.toOptionalFixed(attr.get(key) / 10.0, 1);
                    }
                    var des = RoleUtil.GetAttrString(key);
                    str_attrs.push(UtilsGame.stringHander(des, v));
                }, this_1);
                // 获取副将的当前主副将状态
                var is_hero = roles_info.IsHero(my_r_info.role_id);
                var backup_of = 0;
                if (!is_hero) {
                    backup_of = roles_info.GetBackupsHeroId(my_r_info.role_id);
                }
                // 如果已上阵，不显示
                /**if(is_hero){
                    continue;
                }**/
                var hero_status_str = "";
                if (is_hero) {
                    hero_status_str = "已上阵";
                }
                else if (backup_of > 0) {
                    var backup_of_hero_info = Template.role.get(backup_of);
                    if (!backup_of_hero_info) {
                        egret.error("no backup's hero, hero roleId: " + backup_of);
                    }
                    hero_status_str = Template.getGUIText(backup_of_hero_info.Name) + "的副将";
                }
                // 计算可激活羁绊状态
                var is_cur_bond = false;
                if (cur_role_bond_raw.length > 0) {
                    for (var i_1 = 0; i_1 < cur_role_bond_raw.length; i_1++) {
                        var split_raw = cur_role_bond_raw[i_1].split(",");
                        for (var j = 0; j < split_raw.length; j++) {
                            if (parseInt(split_raw[j]) == my_r_info.role_id) {
                                is_cur_bond = true;
                                break;
                            }
                        }
                        if (is_cur_bond) {
                            break;
                        }
                    }
                }
                ds_list_roles.push({
                    // 角色基本信息
                    roleId: my_r_info.role_id,
                    heroName: RoleUtil.GetFullRoleName(my_r_info.role_id),
                    heroNameColor: RoleUtil.GetRoleNameColor(my_r_info.getTier()),
                    heroFight: "战力：" + my_r_info.fighting,
                    bondVisible: RoleUtil.PreChangeBackupHasBond(my_r_info.role_id, roles_info.pve_team.get(this_1.m_cur_pos)),
                    // 副将属性
                    attr1: str_attrs[0],
                    attr2: str_attrs[1],
                    attr3: str_attrs[2],
                    fighting: "",
                    // fighting: "战力+" + attr.get(-1),
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
                    backupAlpha: 1,
                    // 是否推荐
                    isRec: RoleUtil.isRecBackup(hero_id, my_r_info.role_id)
                });
            };
            var this_1 = this;
            for (var i = 0; i < roles_info.roles.length; i++) {
                var state_1 = _loop_1(i);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            ds_list_roles.sort(function (a, b) {
                // 已上阵的斗士排在最后
                if (a.isHero != b.isHero) {
                    // console.log("(a.isHero != b.isHero)");
                    if (a.isHero) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
                // 已成为副将的斗士排在后
                if (a.backupOf != b.backupOf) {
                    if (a.backupOf > 0) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
                // 有推荐的斗士排在最前
                if (a.isRec != b.isRec) {
                    if (!a.isRec) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
                // 基本按战斗力排序
                var role_a = Singleton.Get(RoleManager).getRolesInfo().GetRole(a.roleId);
                var role_b = Singleton.Get(RoleManager).getRolesInfo().GetRole(b.roleId);
                if (role_a != undefined && role_b != undefined) {
                    if (role_a.fighting < role_b.fighting && role_a.fighting != role_b.fighting) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
                return 0;
            });
            for (var i = 0; i < ds_list_roles.length; i++) {
                var cfg_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(ds_list_roles[i].roleId);
                if (!cfg_role) {
                    console.log("no role: " + ds_list_roles[i].roleId);
                    return;
                }
                console.log(RoleUtil.GetFullRoleName(ds_list_roles[i].roleId) + "[" + ds_list_roles[i].roleId + "] fighting: " + cfg_role.fighting);
            }
            this.compEmpty.visible = !(ds_list_roles.length > 0);
        };
        /**
         * 响应点击上阵副将
         * @param e
         */
        RoleSelectBackupPanelView.prototype.onClick_listBackup = function (e) {
            if (Singleton.Get(GuideManager).CouldYouPleaseWaitForMe("RoleSelectBackupPanelView", "btnAgent", this.onClick_listBackup, this, e)) {
                return;
            }
            if (!e || !e.item || e.item.roleId <= 0) {
                this.close();
                return;
            }
            this.onReqChangeBackup(e.item.roleId);
        };
        /**
         * 请求上阵副将
         * @param role_id
         */
        RoleSelectBackupPanelView.prototype.onReqChangeBackup = function (role_id) {
            Singleton.Get(RoleManager).onReqBackup(role_id, this.m_cur_pos, this.m_cur_idx);
            this.close();
        };
        RoleSelectBackupPanelView.prototype.initAgent = function (idx) {
            if (!this.listBackup.dataProvider) {
                return;
            }
            var role_arr = this.listBackup.dataProvider;
            var list_role = role_arr.source[idx - 1];
            if (list_role == undefined) {
                egret.log("no enough role.");
                this.btnAgent.visible = false;
                this.btnAgent.y = -800;
                return;
            }
            this.agent_role_id = list_role.roleId;
            this.btnAgent.visible = true;
            this.btnAgent.y = 162 + 98 * (idx - 1);
            this.btnAgent.validateNow();
        };
        RoleSelectBackupPanelView.prototype.onClick_btnAgent = function (e) {
            this.onReqChangeBackup(this.agent_role_id);
            this.close();
        };
        return RoleSelectBackupPanelView;
    }(PopupUI));
    ui.RoleSelectBackupPanelView = RoleSelectBackupPanelView;
    __reflect(RoleSelectBackupPanelView.prototype, "ui.RoleSelectBackupPanelView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleSelectBackupPanelView.js.map