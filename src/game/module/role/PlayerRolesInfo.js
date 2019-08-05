var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerRolesInfo = (function () {
    function PlayerRolesInfo() {
        this.tech_ids = []; // 科技ID列表
        this.tech_lvs = []; // 科技对应等级列表,初始0级
        // endregion
        // region 红点提示检查
        this.al_role = false;
        this.al_compose = false;
        this.al_hero = false;
        this.al_backup = false;
    }
    PlayerRolesInfo.prototype.GetRole = function (role_id) {
        for (var i = 0; i < this.roles.length; ++i) {
            if (this.roles[i].role_id == role_id) {
                return this.roles[i];
            }
        }
        return null;
    };
    // 判断role_id是否上阵
    PlayerRolesInfo.prototype.IsHero = function (role_id) {
        return this.pve_team.containsValue(role_id);
    };
    PlayerRolesInfo.prototype.GetHeroPos = function (role_id) {
        for (var i = 0; i < this.pve_team.values.length; ++i) {
            if (this.pve_team.values[i] == role_id) {
                return this.pve_team.keys[i];
            }
        }
        return -1;
    };
    // role_id是否是副将
    PlayerRolesInfo.prototype.IsInBackup = function (role_id) {
        for (var i = 0; i < this.backup_info.values.length; ++i) {
            if (this.backup_info.values[i].containsValue(role_id)) {
                return true;
            }
        }
        return false;
    };
    // 判断 backup_id是否是hero_id的副将
    PlayerRolesInfo.prototype.IsInSomeoneBackup = function (hero_id, backup_id) {
        for (var i = 0; i < this.pve_team.values.length; ++i) {
            if (this.pve_team.values[i] == hero_id && this.backup_info.containsKey(this.pve_team.keys[i]) && this.backup_info.get(this.pve_team.keys[i]).containsValue(backup_id)) {
                return true;
            }
        }
        return false;
    };
    PlayerRolesInfo.prototype.GetSomeoneBackup = function (hero_id) {
        for (var i = 0; i < this.pve_team.values.length; ++i) {
            if (this.pve_team.values[i] == hero_id) {
                return this.backup_info.get(this.pve_team.keys[i]);
            }
        }
        return null;
    };
    PlayerRolesInfo.prototype.GetSomeoneBackupFull = function (hero_id) {
        var dict = this.GetSomeoneBackup(hero_id);
        if (!dict) {
            return [0, 0, 0];
        }
        var result = [];
        for (var i = 0; i < 3; i++) {
            var role_id = dict.get(i + 1);
            result.push((role_id == null) ? 0 : role_id);
        }
        return result;
    };
    // 获取当前已经激活的羁绊ID队列
    PlayerRolesInfo.prototype.ActiveBonds = function (hero_id) {
        var result = [];
        var r_config = Template.role.get(hero_id);
        if (r_config == null) {
            return result;
        }
        //羁绊加成
        var bond_str = r_config.BondRole.split(";");
        for (var bond_count = 0; bond_count < bond_str.length; ++bond_count) {
            var ids_str = bond_str[bond_count].split(",");
            var has_bond = true;
            for (var id_count = 0; id_count < ids_str.length; ++id_count) {
                var bond_role_id = parseInt(ids_str[id_count]);
                if (bond_role_id == hero_id)
                    continue;
                if (!this.GetRole(bond_role_id)) {
                    has_bond = false;
                    break;
                }
            }
            if (has_bond) {
                result.push(r_config.BondRoleId[bond_count]);
            }
        }
        return result;
    };
    /**
     * 获取当前已激活的装备羁绊Id队列
     * @param role_id
     * @returns {number[]}
     */
    PlayerRolesInfo.prototype.ActiveEquipBonds = function (role_id) {
        var result = [];
        var r_config = Template.role.get(role_id);
        var my_role = this.GetRole(role_id);
        if (r_config == null || my_role == null) {
            return result;
        }
        //羁绊加成
        var bond_str = r_config.BondEquip.split(";");
        for (var bond_count = 0; bond_count < bond_str.length; ++bond_count) {
            var ids_str = bond_str[bond_count].split(",");
            var has_bond = false;
            for (var id_count = 0; id_count < ids_str.length; ++id_count) {
                var bond_equip_id = parseInt(ids_str[id_count]);
                if (my_role.getEquipById(bond_equip_id)) {
                    has_bond = true;
                    break;
                }
            }
            if (has_bond) {
                result.push(r_config.BondEquipId[bond_count]);
            }
        }
        return result;
    };
    //预测换主将的时候，完整激活的羁绊数量
    PlayerRolesInfo.prototype.PreChangeHeroActiveBonds = function (test_id, change_pos) {
        var time = UtilsGame.Now();
        var result = 0;
        // 检查新上阵角色对主将的羁绊
        var bond_list = RoleUtil.GetBondList(test_id);
        var change_role_id = this.pve_team.get(change_pos);
        if (change_role_id > 0) {
        }
        else {
        }
        for (var i = 0; i < bond_list.size(); ++i) {
            var has = true;
            //console.log("=> PreChangeHeroActiveBonds() 自身对他人部分 羁绊[" + bond_list.keys[i] + "]展开 ======");
            for (var j = 0; j < bond_list.values[i].length; ++j) {
                //console.log("准备上阵" + RoleUtil.GetFullRoleName(test_id) + "[" + test_id + "]" + " > 检查羁绊" + RoleUtil.GetFullRoleName(bond_list.values[i][j]) + "[" + bond_list.values[i][j] + "]");
                if (bond_list.values[i][j] == change_role_id) {
                    //console.log(":: 含有换下角色 => 羁绊未激活");
                    has = false;
                    break;
                }
                if (bond_list.values[i][j] == test_id) {
                    //console.log(":: 跳过角色自身");
                    continue;
                }
                if (!this.IsHero(bond_list.values[i][j])
                    && !this.IsInSomeoneBackup(change_role_id, bond_list.values[i][j])) {
                    //console.log(":: 非已上阵角色 => 羁绊未激活");
                    has = false;
                    break;
                }
            }
            //console.log(has ? "***已激活羁绊[" + bond_list.keys[i] + "]": "未激活[" + bond_list.keys[i] + "]");
            //console.log('...');
            if (has) {
                result++;
            }
        }
        //console.log("=> PreChangeHeroActiveBonds() 检查主将对新上阵角色的羁绊 ======>");
        // 检查主将对新上阵角色的羁绊
        var pve_team = this.getPveTeamArray();
        for (var l = 0; l < pve_team.length; l++) {
            var hero_id = pve_team[l];
            if (hero_id == change_role_id || hero_id == 0) {
                continue;
            }
            //console.log("=> PreChangeHeroActiveBonds() 他人对自身部分 " + RoleUtil.GetFullRoleName(hero_id) + "[" + hero_id + "]展开 ======");
            var hero_bond_list = RoleUtil.GetBondList(hero_id);
            for (var i_1 = 0; i_1 < hero_bond_list.size(); i_1++) {
                var bond_roles = hero_bond_list.values[i_1];
                var has_vaild = true; // 羁绊中依赖的非上阵角色是否都已上阵
                var has_test = false; // 将上阵的角色是否包含在羁绊中
                for (var j_1 = 0; j_1 < bond_roles.length; j_1++) {
                    // pve_team中的非替换role肯定已上阵
                    if (bond_roles[j_1] == hero_id) {
                        //console.log(":: pve_team中的非替换role肯定已上阵: " + RoleUtil.GetFullRoleName(bond_roles[i]) + "[" + bond_roles[i] + "]");
                        continue;
                    }
                    // 将上阵的角色视为已上阵
                    if (bond_roles[j_1] == test_id) {
                        //console.log(":: 将上阵的角色视为已上阵: " + RoleUtil.GetFullRoleName(bond_roles[i]) + "[" + bond_roles[i] + "]");
                        has_test = true;
                        continue;
                    }
                    // 检查羁绊中依赖的其他角色是否上阵
                    if (!this.IsHero(bond_roles[j_1])) {
                        //console.log(":: rely is not lineup: " + RoleUtil.GetFullRoleName(bond_roles[i]) + "[" + bond_roles[i] + "]");
                        has_vaild = false;
                        break;
                    }
                }
                if (has_vaild && has_test) {
                    result++;
                }
            }
        }
        // console.log("calculate eslap: " + (UtilsGame.Now() - time) + "ms");
        return result;
    };
    //返回副将的主将id
    PlayerRolesInfo.prototype.GetBackupsHeroId = function (backup_id) {
        for (var i = 0; i < this.backup_info.values.length; ++i) {
            for (var j = 0; j < this.backup_info.values[i].values.length; ++j)
                if (this.backup_info.values[i].values[j] == backup_id) {
                    var pos = this.backup_info.keys[i];
                    if (this.pve_team.containsKey(pos)) {
                        return this.pve_team.get(pos);
                    }
                    return -1;
                }
        }
        return -1;
    };
    // 更新魅力等级
    PlayerRolesInfo.prototype.updateCharmLv = function (lv) {
        this.m_mei_li_lv = lv;
    };
    /**
     * 获取一个角色id
     */
    PlayerRolesInfo.prototype.getFirstRoleId = function () {
        return this.roles[0].role_id;
    };
    /**
     * 获取已上阵的最强角色id
     */
    PlayerRolesInfo.prototype.getStrongestTeamRoleId = function () {
        var _this = this;
        var s_role_id = 0;
        var s_role_fighting = 0;
        this.pve_team.foreachValue(function (role_id) {
            var my_role = _this.GetRole(role_id);
            if (my_role == null) {
                return;
            }
            if (my_role.fighting > s_role_fighting) {
                s_role_id = my_role.role_id;
                s_role_fighting = my_role.fighting;
            }
        }, this);
        if (s_role_id <= 0) {
            s_role_id = this.roles[0].role_id;
        }
        return s_role_id;
    };
    // region 布阵队伍
    /**
     * 获取数组形式的队伍信息
     * @returns {number[]}
     */
    PlayerRolesInfo.prototype.getPveTeamArray = function () {
        var result = [];
        this.pve_team.foreachValue(function (role_id) {
            result.push(role_id);
        }, this);
        return result;
    };
    // endregion
    // region 上阵队伍
    /**
     * 初始化上阵编队
     */
    /**
    public initLineupTeam(): void {
        this.lineup_team = [1, 2, 3, 4, 5];
    }
     */
    /**
     * 交换在上阵编队中的位置
     * @param pos1
     * @param pos2
     */
    /**
    public swapLineupPos(pos1: number, pos2: number): void {
        let pos1_idx: number = -1;
        let pos2_idx: number = -1;
        for(let i: number = 0; i < this.lineup_team.length; i++) {
            if(pos1 == this.lineup_team[i]) {
                pos1_idx = i;
            }

            if(pos2 == this.lineup_team[i]) {
                pos2_idx = i;
            }
        }

        if(pos1_idx < 0 || pos2_idx < 0 || pos1_idx == pos2_idx) {
            return;
        }

        this.lineup_team[pos1_idx] = pos2;
        this.lineup_team[pos2_idx] = pos1;
    }
     */
    /**
     * 根据阵容id获取角色id
     * @param lineup_id
     * @returns {number}
     */
    /**
    public getRoleIdByLineupId(lineup_id: number): number {
        let pos: number = this.lineup_team[lineup_id];
        return this.getPveTeamArray()[pos - 1];
    }
     */
    /**
     * 根据上阵位置获取布阵位置
     * @param pos
     * @returns {number}
     */
    /**
    public getLineupIdByPos(pos: number): number {
        for(let i: number = 0; i < this.lineup_team.length; i++) {
            if(this.lineup_team[i] == pos) {
                return i;
            }
        }
        return;
    }
     */
    /**
     * 获取数组形式的队伍信息
     * @returns {number[]}
     */
    PlayerRolesInfo.prototype.genLineupTeam = function () {
        var result = [];
        var id_count = 0;
        this.pve_team.foreachValue(function (role_id) {
            if (role_id > 0) {
                result.push(role_id);
                id_count++;
            }
        }, this);
        if (id_count < 5) {
            for (var i = id_count; i < 5; i++) {
                result.push(0);
            }
        }
        return result;
    };
    /**
     * 添加到上阵列表
     * @param lup
     * @param role_id
     */
    PlayerRolesInfo.prototype.addToLineup = function (lup, role_id) {
        this.lineup_team[lup] = role_id;
    };
    /**
     * 从上阵列表移除
     * @param role_id
     */
    PlayerRolesInfo.prototype.removeFromLineup = function (role_id) {
        for (var i = 0; i < this.lineup_team.length; i++) {
            if (this.lineup_team[i] == role_id) {
                this.lineup_team[i] = 0;
                return;
            }
        }
    };
    /**
     * 根据角色获取位置
     * @param role_id
     * @returns {number}
     */
    PlayerRolesInfo.prototype.getPosByRole = function (role_id) {
        for (var i = 0; i < this.pve_team.keys.length; i++) {
            var tr_id = this.pve_team.values[i];
            if (tr_id == role_id) {
                return this.pve_team.keys[i];
            }
        }
        return 0;
    };
    /**
     * 根据上阵位置获取阵容位置
     * @param lup
     * @returns {number}
     */
    PlayerRolesInfo.prototype.getPosByLup = function (lup) {
        var role_id = this.getRoleByLup(lup);
        if (role_id <= 0) {
            var empty_pos = this.getEmptyPosId();
            if (empty_pos < 0) {
                throw new Error("Can't get pos by lup, no empty pos.");
            }
        }
        return this.getPosByRole(role_id);
    };
    /**
     * 根据上阵位置获取角色id
     * @param lup
     * @return {number}
     */
    PlayerRolesInfo.prototype.getRoleByLup = function (lup) {
        return this.lineup_team[lup];
    };
    /**
     * 获取一个空阵容位置id
     * @returns {number}
     */
    PlayerRolesInfo.prototype.getEmptyPosId = function () {
        for (var i = 0; i < this.pve_team.keys.length; i++) {
            var tr_id = this.pve_team.values[i];
            if (tr_id <= 0) {
                return this.pve_team.keys[i];
            }
        }
        return -1;
    };
    // endregion
    // region 数据状态刷新
    PlayerRolesInfo.prototype.updateAlarm = function (roles) {
        if (roles === void 0) { roles = undefined; }
        if (roles == undefined || roles.length <= 0) {
            for (var i = 0; i < this.roles.length; i++) {
                this.roles[i].alarm.refresh();
            }
        }
        else {
            for (var i = 0; i < roles.length; i++) {
                this.updateAlarmSingle(roles[i]);
            }
        }
    };
    PlayerRolesInfo.prototype.updateAlarmSingle = function (role_id) {
        if (role_id <= 0) {
            return;
        }
        var role = this.GetRole(role_id);
        if (!role) {
            return;
        }
        role.alarm.refresh();
    };
    /**
     * 是否存在任何有提示的角色
     */
    PlayerRolesInfo.prototype.hasAnyAlarmRole = function () {
        for (var i = 0; i < this.roles.length; i++) {
            if (this.roles[i].alarm.al_role) {
                return true;
            }
        }
        return false;
    };
    /**
     * 是否存在可合成角色
     */
    PlayerRolesInfo.prototype.hasAnyComposableRole = function () {
        var bag_mgr = Singleton.Get(BagManager);
        var roles = Template.role.values;
        for (var i = 0; i < roles.length; i++) {
            if (this.GetRole(roles[i].ID)) {
                continue;
            }
            if (roles[i].Type != RoleType.Player) {
                continue;
            }
            if (bag_mgr.hasEnough(roles[i].Fragment, roles[i].FragmentNum)) {
                return true;
            }
        }
        return false;
    };
    /**
     * 是否存在空闲阵容格子
     */
    PlayerRolesInfo.prototype.hasAnyEmptyHeroPos = function () {
        var max_count = RoleUtil.GetMaxHeroCounts();
        var pve_team = this.getPveTeamArray();
        var cur_count = 0;
        for (var i = 0; i < pve_team.length; i++) {
            if (pve_team[i] > 0) {
                cur_count++;
            }
        }
        return cur_count < max_count;
    };
    /**
     * 是否存在空闲副将格子
     */
    PlayerRolesInfo.prototype.hasAnyEmptyBackupPos = function () {
        var max_hero = RoleUtil.GetMaxHeroCounts();
        var max_backup = RoleUtil.GetMaxBackupCounts();
        if (max_backup <= 0) {
            return false;
        }
        var pve_team = this.getPveTeamArray();
        for (var i = 0; i < pve_team.length; i++) {
            if (pve_team[i] > 0) {
                var cur_count = 0;
                var backups = this.backup_info.get(i + 1);
                if (!backups) {
                    return false;
                }
                // console.log("Hero: " + pve_team[i]);
                for (var j = 0; j < backups.values.length; j++) {
                    // console.log("backup: " + backups.values[j]);
                    if (backups.values[j] != undefined && backups.values[j] > 0) {
                        cur_count++;
                    }
                }
                if (cur_count < max_backup) {
                    // console.log("Backup: " + cur_count + " | " + max_backup);
                    return true;
                }
            }
        }
        return false;
    };
    PlayerRolesInfo.prototype.updateAlarmLineup = function () {
        // 没有任何空闲斗士 不显示红点
        if (!this.hasAnyRoleIdle()) {
            this.al_hero = false;
            this.al_backup = false;
            return;
        }
        this.al_hero = this.hasAnyEmptyHeroPos(); // 有空闲斗士位且有空闲斗士
        this.al_backup = this.hasAnyEmptyBackupPos();
    };
    PlayerRolesInfo.prototype.updateAlarmList = function () {
        this.al_role = this.hasAnyAlarmRole();
        this.al_compose = this.hasAnyComposableRole();
    };
    /**
     * 是否有空闲角色
     * @returns {boolean}
     */
    PlayerRolesInfo.prototype.hasAnyRoleIdle = function () {
        for (var i = 0; i < this.roles.length; i++) {
            var role_id = this.roles[i].role_id;
            if (!this.IsHero(role_id) && !this.IsInBackup(role_id)) {
                return true;
            }
        }
        return false;
    };
    // endregion
    // region 公会科技
    /**
     * 获取公会科技等级
     */
    PlayerRolesInfo.prototype.getTechLv = function (tech_id) {
        var tech_ids = this.tech_ids;
        for (var i = 0; i < tech_ids.length; i++) {
            if (tech_ids[i] == tech_id) {
                return this.tech_lvs[i];
            }
        }
        return 0;
    };
    /**
     * 提升公会科技等级1级
     */
    PlayerRolesInfo.prototype.levelupTech = function (tech_id) {
        var tech_ids = this.tech_ids;
        for (var i = 0; i < tech_ids.length; i++) {
            if (tech_ids[i] == tech_id) {
                this.tech_lvs[i]++;
                return;
            }
        }
        this.tech_ids.push(tech_id);
        this.tech_lvs.push(1);
    };
    return PlayerRolesInfo;
}());
__reflect(PlayerRolesInfo.prototype, "PlayerRolesInfo");
//# sourceMappingURL=PlayerRolesInfo.js.map