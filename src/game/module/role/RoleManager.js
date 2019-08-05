var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 角色管理器
 */
var RoleManager = (function () {
    // endregion
    // region 管理器生命周期
    /**
     * 构造函数
     */
    function RoleManager() {
        // endregion
        // region 战力铭记
        // 战力铭记
        this.engrave_role = 0;
        this.engrave_fighting = 0;
        this.engrave_attrs = [];
        MessageManager.registeSync(this.onSync, this);
    }
    // endregion
    // region 基本信息
    /**
     * 获取角色基本信息
     * @returns {PlayerRolesInfo}
     */
    RoleManager.prototype.getRolesInfo = function () {
        return this.m_roles_info;
    };
    // endregion
    // region 同步
    /**
     * 响应登陆完成
     */
    RoleManager.prototype.onGameLoaded = function () {
        // console.log("Role Manager Loaded");
    };
    /**
     * 响应全局刷新
     */
    RoleManager.prototype.onSyncRewrite = function (rec_msg) {
        this.m_roles_info = RoleUtil.convSyncToInfo(rec_msg);
        this.m_roles_info.pve_team = RoleUtil.fillPveTeamArray(this.m_roles_info.pve_team);
        this.m_roles_info.lineup_team = this.m_roles_info.genLineupTeam();
        this.getRolesInfo().updateAlarmLineup();
        YWLogger.info("[Role]角色信息初始化完成", LogType.Sync);
        YWLogger.info(this.m_roles_info, LogType.Sync);
    };
    /**
     * 响应同步角色信息
     * @param rec_msg
     */
    RoleManager.prototype.onSync = function (e) {
        var _this = this;
        // 检查是否需要更新
        var rec_msg = e._roles;
        if (!rec_msg) {
            return;
        }
        // 回传的是部分信息，筛选后更新
        var rec_info = RoleUtil.convSyncToInfo(rec_msg);
        // 更新角色信息
        if (rec_info.roles.length > 0) {
            YWLogger.info("[Role]更新角色信息", LogType.Sync);
            for (var i = 0; i < rec_info.roles.length; i++) {
                var update_role = rec_info.roles[i];
                var role_exist = false;
                for (var j = 0; j < this.m_roles_info.roles.length; j++) {
                    if (update_role.role_id == this.m_roles_info.roles[j].role_id) {
                        this.m_roles_info.roles[j] = update_role;
                        role_exist = true;
                        break;
                    }
                }
                if (!role_exist) {
                    this.m_roles_info.roles.push(update_role);
                }
            }
        }
        // 更新队伍信息
        if (rec_info.pve_team.size() > 0) {
            this.m_roles_info.pve_team = RoleUtil.fillPveTeamArray(rec_info.pve_team);
            this.getRolesInfo().updateAlarmLineup();
        }
        // 更新副将
        if (rec_info.backup_info.size() > 0) {
            rec_info.backup_info.foreachKey(function (key) {
                _this.m_roles_info.backup_info.update(key, rec_info.backup_info.get(key));
            }, this);
            this.getRolesInfo().updateAlarmLineup();
        }
        // 通知UI更新 TODO 加入侦听注册
        var layer = Singleton.Get(LayerManager);
        if (layer.isViewOnStage(layer.getView(ui.RoleLineupView))) {
            layer.getView(ui.RoleLineupView).refresh();
        }
        // console.log(this.m_roles_info);
        Singleton.Get(EquipManager).onNotifyAlarm();
    };
    // endregion
    // region 角色列表
    /**
     * 获取未解锁的斗士
     */
    RoleManager.prototype.getLockedRoles = function () {
        var my_roles = this.m_roles_info.roles;
        var all_roles = Template.role;
        var locked_roles = [];
        all_roles.foreachKey(function (key) {
            var cur_role_id = key;
            var is_unlocked = false;
            for (var i = 0; i < my_roles.length; i++) {
                if (my_roles[i].role_id == cur_role_id) {
                    is_unlocked = true;
                    break;
                }
            }
            if (!is_unlocked && all_roles.get(key).Type == RoleType.Player) {
                locked_roles.push(key);
            }
        }, this);
        var bag_mgr = Singleton.Get(BagManager);
        // 根据觉醒等级从大到小排序
        locked_roles.sort(function (a, b) {
            // 获取角色信息
            var a_role_info = all_roles.get(a);
            var b_role_info = all_roles.get(b);
            // 检查碎片数量
            var a_frag = bag_mgr.getItemCount(a_role_info.Fragment);
            var b_frag = bag_mgr.getItemCount(b_role_info.Fragment);
            if (a_frag > b_frag) {
                return -1;
            }
            else if (b_frag > a_frag) {
                return 1;
            }
            // 检查是否可合成
            var is_a_composable = a_frag >= a_role_info.RoleSynthesis;
            var is_b_composable = b_frag >= b_role_info.RoleSynthesis;
            if (is_a_composable) {
                return -1;
            }
            else if (is_b_composable) {
                return 1;
            }
            // 检查星级
            if (a_role_info.Star > b_role_info.Star) {
                return -1;
            }
            else if (a_role_info.Star < b_role_info.Star) {
                return 1;
            }
            // 检查初始觉醒等级
            if (a_role_info.AwakenID > b_role_info.AwakenID) {
                return -1;
            }
            else if (a_role_info.AwakenID < b_role_info.AwakenID) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return locked_roles;
    };
    // endregion
    // region 换阵
    /**
     * 请求上阵斗士
     * @param seat_id
     * @param role_id
     */
    RoleManager.prototype.onReqChangeHero = function (lup, role_id) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_change_hero = new msg.RoleChangeHeroMsg();
        send_msg.body.role_change_hero.seat_id = this.getRolesInfo().getPosByLup(lup);
        send_msg.body.role_change_hero.role_id = role_id;
        Singleton.Get(PlayerInfoManager).engrave();
        this.engraveBonds();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ROLE_HERO_CHANGE, send_msg, this, function (data) {
            // 任务：注册任务更新
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ROLE_PVE_CNT);
            // 更新角色上阵列表
            _this.getRolesInfo().addToLineup(lup, role_id);
            // 刷新角色上阵界面
            Singleton.Get(ui.RoleLineupView).refresh();
            Singleton.Get(PlayerInfoManager).releaseFighting();
            _this.releaseBonds();
            Singleton.Get(LayerManager).getView(ui.RoleBaseView).refreshAlarmSenior();
        }, true);
    };
    // endregion
    // region 合成/升级/突破/进阶/觉醒
    /**
     * 请求界面刷新
     */
    RoleManager.prototype.reqUiRefresh = function () {
        Singleton.Get(LayerManager).getView(ui.RoleListView).reqRefresh();
        Singleton.Get(LayerManager).getView(ui.RoleBaseView).refresh();
    };
    /**
     * 请求合成斗士
     * @param role_id
     */
    RoleManager.prototype.onReqCompose = function (role_id) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_result = new msg.RoleResultMsg();
        send_msg.body.role_result.role_id = role_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ROLE_COMPOSE, send_msg, this, function (data) {
            Singleton.Get(LayerManager).getView(ui.RoleGetNewView).open(role_id);
            _this.reqUiRefresh();
            Singleton.Get(LayerManager).getView(ui.RoleListView).refresh();
            // 任务：注册任务更新
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ROLE_ID);
            Singleton.Get(RoleLineupRecManager).getRecInfo().updateAlarm();
            Singleton.Get(LayerManager).getView(ui.RoleBaseView).refreshAlarmSenior();
        }, true);
    };
    /**
     * 请求升级1次
     * @param role_id
     */
    RoleManager.prototype.onReqLevelup = function (role_id) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_result = new msg.RoleResultMsg();
        send_msg.body.role_result.role_id = role_id;
        this.engraveRole(role_id);
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ROLE_LEVELUP, send_msg, this, function (rec_msg) {
            if (rec_msg.body.role_result == null)
                return;
            if (rec_msg.body.role_result.is_success) {
                Singleton.Get(LayerManager).getView(ui.RoleLevelupView).refresh();
                _this.reqUiRefresh();
                _this.releaseFighting(role_id);
                _this.releaseAttrs(role_id);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.ROLE_LV_UP);
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ROLE_LV);
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ROLE_LV_ALL_ROLE);
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).refreshAlarmSecoundary();
            }
        }, true);
    };
    /**
     * 请求升级5次
     * @param role_id
     */
    RoleManager.prototype.onReqLevelup5 = function (role_id) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_result = new msg.RoleResultMsg();
        send_msg.body.role_result.role_id = role_id;
        if (role_id <= 0) {
            MessageManager.handleDisconnect(856);
            return;
        }
        this.engraveRole(role_id);
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ROLE_LEVELUP_5, send_msg, this, function (rec_msg) {
            if (rec_msg.body.role_result == null)
                return;
            if (rec_msg.body.role_result.is_success) {
                Singleton.Get(LayerManager).getView(ui.RoleLevelupView).refresh();
                _this.reqUiRefresh();
                _this.releaseFighting(role_id);
                _this.releaseAttrs(role_id);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.ROLE_LV_UP);
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ROLE_LV);
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ROLE_LV_ALL_ROLE);
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).refreshAlarmSecoundary();
            }
        }, true);
    };
    /**
     * 请求突破
     * @param role_id
     */
    RoleManager.prototype.onReqBreach = function (role_id) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_result = new msg.RoleResultMsg();
        send_msg.body.role_result.role_id = role_id;
        this.engraveRole(role_id);
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ROLE_BREACH, send_msg, this, function (rec_msg) {
            if (rec_msg.body.role_result == null)
                return;
            if (rec_msg.body.role_result.is_success) {
                Singleton.Get(LayerManager).getView(ui.RoleSuccessView).openBreach(role_id);
                Singleton.Get(LayerManager).getView(ui.RoleBreachView).refresh();
                _this.reqUiRefresh();
                _this.releaseFighting(role_id);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.ROLE_BREACH);
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ROLE_BREACH);
                // 通知：注册通知更新
                _this.m_roles_info.updateAlarmSingle(role_id);
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).refreshAlarmSecoundary();
            }
        }, true);
    };
    /**
     * 请求升阶
     * @param role_id
     */
    RoleManager.prototype.onReqTalent = function (role_id) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_result = new msg.RoleResultMsg();
        send_msg.body.role_result.role_id = role_id;
        this.engraveRole(role_id);
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ROLE_TALENT, send_msg, this, function (rec_msg) {
            if (rec_msg.body.role_result == null)
                return;
            if (rec_msg.body.role_result.is_success) {
                Singleton.Get(LayerManager).getView(ui.RoleSuccessView).openTalent(role_id);
                Singleton.Get(LayerManager).getView(ui.RoleTalentView).refresh();
                _this.reqUiRefresh();
                _this.releaseFighting(role_id);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.ROLE_TALENT);
                // 通知：注册通知更新
                _this.m_roles_info.updateAlarmSingle(role_id);
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).refreshAlarmSecoundary();
            }
        }, true);
    };
    /**
     * 请求觉醒
     * @param role_id
     */
    RoleManager.prototype.onReqAwaken = function (role_id) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_result = new msg.RoleResultMsg();
        send_msg.body.role_result.role_id = role_id;
        this.engraveRole(role_id);
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ROLE_AWAKEN, send_msg, this, function (rec_msg) {
            if (rec_msg.body.role_result == null)
                return;
            if (rec_msg.body.role_result.is_success) {
                var my_role = _this.getRolesInfo().GetRole(role_id);
                var role_info = Template.role.get(role_id);
                var init_awaken = role_info.AwakenID;
                var cur_awaken = my_role.awaken;
                var awaken_offset = cur_awaken - init_awaken;
                var active_star = 0;
                if (awaken_offset % 5 == 0) {
                    active_star = my_role.getAwakenActiveStar();
                }
                // console.log("[AWAKEN STAR] "  + active_star);
                Singleton.Get(LayerManager).getView(ui.RoleSuccessView).openAwaken(role_id, active_star);
                Singleton.Get(LayerManager).getView(ui.RoleAwakenView).refresh();
                _this.reqUiRefresh();
                _this.releaseFighting(role_id);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.ROLE_AWAKEN);
                // 通知：注册通知更新
                _this.m_roles_info.updateAlarmSingle(role_id);
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).refreshAlarmSecoundary();
            }
        }, true);
    };
    /**
     * 请求重置觉醒
     * @param role_id
     */
    RoleManager.prototype.onReqAwakenReset = function (role_id) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_result = new msg.RoleResultMsg();
        send_msg.body.role_result.role_id = role_id;
        this.engraveRole(role_id);
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ROLE_AWAKEN_RESET, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_result)
                return;
            if (!rec_msg.body.role_result.is_success)
                return;
            Singleton.Get(LayerManager).getView(ui.RoleAwakenView).refresh();
            _this.reqUiRefresh();
            _this.releaseFighting(role_id);
            Singleton.Get(LayerManager).getView(ui.RoleBaseView).refreshAlarmSecoundary();
            Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_role99"), 0, 0, 0, rec_msg.body.role_result.r_items);
        }, true);
    };
    /**
     * 请求变更阵型
     * @param team_pos
     */
    RoleManager.prototype.onReqOpinion = function (opinion) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_result = new msg.RoleResultMsg();
        send_msg.body.role_result.opinion = opinion;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ROLE_OPINION, send_msg, this, function (rec_msg) {
            if (rec_msg.body.role_result == null)
                return;
            if (rec_msg.body.role_result.is_success) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("append_60"));
                Singleton.Get(ui.RoleLineupView).refresh();
                _this.reqUiRefresh();
            }
        }, true);
    };
    /**
     * 请求上副将
     * @param role_id
     * @param team_pos
     * @param backup_pos
     */
    RoleManager.prototype.onReqBackup = function (role_id, team_pos, backup_pos) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_result = new msg.RoleResultMsg();
        send_msg.body.role_result.role_id = role_id;
        send_msg.body.role_result.team_pos = team_pos;
        send_msg.body.role_result.backup_pos = backup_pos;
        Singleton.Get(PlayerInfoManager).engrave();
        this.engraveBonds();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ROLE_BACKUP, send_msg, this, function (rec_msg) {
            if (rec_msg.body.role_result == null)
                return;
            if (rec_msg.body.role_result.is_success) {
                // 如果被上到副将的角色在主将中 手动移除显示列表中的id
                _this.getRolesInfo().removeFromLineup(role_id);
                Singleton.Get(ui.RoleLineupView).refresh();
                _this.reqUiRefresh();
                Singleton.Get(PlayerInfoManager).releaseFighting();
                _this.releaseBonds();
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).refreshAlarmSenior();
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ONE_BACKUP);
            }
        }, true);
    };
    /**
     * 刻下角色战力和属性
     * @param role_id
     */
    RoleManager.prototype.engraveRole = function (role_id) {
        var my_role = this.getRolesInfo().GetRole(role_id);
        if (my_role == null) {
            return;
        }
        this.engrave_role = role_id;
        this.engrave_fighting = my_role.CalcFighting();
        this.engrave_attrs = [my_role.max_hp, my_role.atk, my_role.def, my_role.skill_atk, my_role.skill_def];
    };
    /**
     * 释放刻下的战力
     * @param role_id
     */
    RoleManager.prototype.releaseFighting = function (role_id) {
        if (role_id != this.engrave_role) {
            return;
        }
        var my_role = this.getRolesInfo().GetRole(role_id);
        var fighting = my_role.CalcFighting();
        var fighting_offset = fighting - this.engrave_fighting;
        if (fighting_offset > 0) {
            Singleton.Get(DialogControler).showStrength("+" + fighting_offset);
        }
    };
    /**
     * 释放刻下的属性
     * @param role_id
     */
    RoleManager.prototype.releaseAttrs = function (role_id) {
        if (role_id != this.engrave_role) {
            return;
        }
        var str_temp = ["生     命+$1", "物理攻击+$1", "物理防御+$1", "特技攻击+$1", "特技防御+$1"];
        var str = "";
        var my_role = this.getRolesInfo().GetRole(role_id);
        var cur_attrs = [my_role.max_hp, my_role.atk, my_role.def, my_role.skill_atk, my_role.skill_def];
        for (var i = 0; i < this.engrave_attrs.length; i++) {
            var offset = cur_attrs[i] - this.engrave_attrs[i];
            if (offset > 0) {
                str += UtilsGame.stringHander(str_temp[i], offset);
                if (i < this.engrave_attrs.length - 1) {
                    str += "\r\n";
                }
            }
        }
        Singleton.Get(DialogControler).showString_2('<font size="18" color="#0eef2a">' + str + '</font>');
    };
    RoleManager.prototype.engraveBonds = function () {
        // console.log("engrave");
        this.engrave_bonds = this.getActiveBonds();
        // console.log("engrave end");
    };
    RoleManager.prototype.releaseBonds = function () {
        // console.log("releaseBonds()");
        var engrave_bonds = this.engrave_bonds;
        var cur_bonds = this.getActiveBonds();
        var add_bonds = [];
        for (var i = 0; i < cur_bonds.length; i++) {
            var is_new = true;
            for (var j = 0; j < engrave_bonds.length; j++) {
                if (engrave_bonds[j] == cur_bonds[i]) {
                    is_new = false;
                }
            }
            if (is_new) {
                add_bonds.push(cur_bonds[i]);
            }
        }
        /**
        let sub_bonds: number[] = [];
        for(let i: number = 0; i < engrave_bonds.length; i++) {
            let is_sub: boolean = true;
            for(let j: number = 0; j < cur_bonds.length; j++) {
                if(engrave_bonds[i] == cur_bonds[j]) {
                    is_sub = false;
                }
            }

            if(is_sub) {
                sub_bonds.push(engrave_bonds[i]);
            }
            console.log("sub_bonds");
        }
         */
        for (var i = 0; i < add_bonds.length; i++) {
            var bond_entity = Template.bond.get(add_bonds[i]);
            if (bond_entity == null) {
                egret.error("can't find bond entity, bond id: " + add_bonds[i]);
                continue;
            }
            // console.log("add");
            Singleton.Get(DialogControler).showStrength(Template.getGUIText("ui_role50") + " " + Template.getGUIText(bond_entity.BondName) + " 已激活");
        }
        /**
        for(let i: number = 0; i < sub_bonds.length; i++) {
            let bond_entity: Entity.Bond = Template.bond.get(sub_bonds[i]);
            if(bond_entity == null) {
                egret.error("can't find bond entity, bond id: " + sub_bonds[i]);
                continue;
            }

            console.log("sub");
            Singleton.Get(DialogControler).showStrength("羁绊 " + Template.getGUIText(bond_entity.BondName) + " 已失效");
        }
         */
    };
    RoleManager.prototype.getActiveBonds = function () {
        var bonds = [];
        var pve_team = this.m_roles_info.getPveTeamArray();
        for (var i = 0; i < pve_team.length; i++) {
            if (pve_team[i] <= 0) {
                continue;
            }
            // console.log("pve_team " + pve_team[i] + " " + i);
            var hero_bonds = this.m_roles_info.ActiveBonds(pve_team[i]);
            for (var j = 0; j < hero_bonds.length; j++) {
                // console.log("hero_bonds " + hero_bonds[j] + " " + j);
                var is_already_exist = false;
                for (var k = 0; k < bonds.length; k++) {
                    // console.log("bonds " + bonds[k] + " " + k);
                    if (bonds[k] == hero_bonds[j]) {
                        is_already_exist = true;
                        break;
                    }
                }
                if (!is_already_exist) {
                    bonds.push(hero_bonds[j]);
                }
            }
        }
        return bonds;
    };
    return RoleManager;
}());
__reflect(RoleManager.prototype, "RoleManager");
//# sourceMappingURL=RoleManager.js.map