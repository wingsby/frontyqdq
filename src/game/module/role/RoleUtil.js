// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleAttrType;
(function (RoleAttrType) {
    RoleAttrType[RoleAttrType["Null"] = 0] = "Null";
    RoleAttrType[RoleAttrType["Current_HP"] = 1] = "Current_HP";
    RoleAttrType[RoleAttrType["Max_HP"] = 2] = "Max_HP";
    RoleAttrType[RoleAttrType["Atk"] = 3] = "Atk";
    RoleAttrType[RoleAttrType["Def"] = 4] = "Def";
    RoleAttrType[RoleAttrType["Skill_Atk"] = 5] = "Skill_Atk";
    RoleAttrType[RoleAttrType["Skill_Def"] = 6] = "Skill_Def";
    RoleAttrType[RoleAttrType["Move"] = 7] = "Move";
    RoleAttrType[RoleAttrType["Atk_Speed"] = 8] = "Atk_Speed";
    RoleAttrType[RoleAttrType["Crit_Rate"] = 9] = "Crit_Rate";
    RoleAttrType[RoleAttrType["Crit_Damage"] = 10] = "Crit_Damage";
    RoleAttrType[RoleAttrType["Damage_Reduce"] = 11] = "Damage_Reduce";
    RoleAttrType[RoleAttrType["Vampire"] = 12] = "Vampire";
    RoleAttrType[RoleAttrType["Combo"] = 13] = "Combo";
    RoleAttrType[RoleAttrType["Sp_Ignore"] = 14] = "Sp_Ignore";
    RoleAttrType[RoleAttrType["Debuff_Res"] = 15] = "Debuff_Res";
    RoleAttrType[RoleAttrType["EN"] = 16] = "EN";
    RoleAttrType[RoleAttrType["En_Recover"] = 17] = "En_Recover";
    RoleAttrType[RoleAttrType["En_Hit"] = 18] = "En_Hit";
    RoleAttrType[RoleAttrType["Combo_Dam"] = 19] = "Combo_Dam";
    RoleAttrType[RoleAttrType["Crit_Res"] = 20] = "Crit_Res"; //20 暴击抵抗（%）
})(RoleAttrType || (RoleAttrType = {}));
var RoleType;
(function (RoleType) {
    RoleType[RoleType["Null"] = 0] = "Null";
    RoleType[RoleType["Player"] = 1] = "Player";
    RoleType[RoleType["Enemy"] = 2] = "Enemy";
})(RoleType || (RoleType = {}));
var RoleTier;
(function (RoleTier) {
    RoleTier[RoleTier["Null"] = 0] = "Null";
    RoleTier[RoleTier["Blue"] = 1] = "Blue";
    RoleTier[RoleTier["Purple"] = 2] = "Purple";
    RoleTier[RoleTier["Orange"] = 3] = "Orange";
})(RoleTier || (RoleTier = {}));
var RoleUtil = (function () {
    function RoleUtil() {
    }
    /**
     * 获取角色的属性字典配置（“xxx+$1”式，视属性自带百分号）
     * @param attr
     * @returns {string}
     * @constructor
     */
    RoleUtil.GetAttrString = function (attr) {
        var dict_idx = "";
        switch (attr) {
            case RoleAttrType.Current_HP:
                dict_idx = "Hp_1";
                break;
            case RoleAttrType.Max_HP:
                dict_idx = "Hp_1";
                break;
            case RoleAttrType.Atk:
                dict_idx = "Atk_1";
                break;
            case RoleAttrType.Def:
                dict_idx = "Def_1";
                break;
            case RoleAttrType.Skill_Atk:
                dict_idx = "AtkSp_1";
                break;
            case RoleAttrType.Skill_Def:
                dict_idx = "DefSp_1";
                break;
            case RoleAttrType.Move:
                dict_idx = "Move_1";
                break;
            case RoleAttrType.Atk_Speed:
                dict_idx = "Atk_Speed_1";
                break;
            case RoleAttrType.Crit_Rate:
                dict_idx = "CritRate_1";
                break;
            case RoleAttrType.Crit_Damage:
                dict_idx = "CritDamage_1";
                break;
            case RoleAttrType.Damage_Reduce:
                dict_idx = "DamageReduce_1";
                break;
            case RoleAttrType.Vampire:
                dict_idx = "Vampire_1";
                break;
            case RoleAttrType.Combo:
                dict_idx = "Combo_1";
                break;
            case RoleAttrType.Sp_Ignore:
                dict_idx = "SpIgnore_1";
                break;
            case RoleAttrType.Debuff_Res:
                dict_idx = "DebuffRes_1";
                break;
            case RoleAttrType.EN:
                dict_idx = "En_1";
                break;
            case RoleAttrType.En_Recover:
                dict_idx = "EnRecover_1";
                break;
            case RoleAttrType.En_Hit:
                dict_idx = "EnHit_1";
                break;
            case RoleAttrType.Combo_Dam:
                dict_idx = "ComboDam_1";
                break;
            case RoleAttrType.Crit_Res:
                dict_idx = "CritRes_1";
                break;
        }
        var result = Template.getGUIText(dict_idx);
        if (result != null) {
            return result;
        }
        else {
            return dict_idx;
        }
    };
    /**
     * 获取角色的属性字典配置（“xxx：”式）
     * @param attr
     * @returns {string}
     * @constructor
     */
    RoleUtil.GetAttrPrefixString = function (attr) {
        var dict_idx = "";
        switch (attr) {
            case RoleAttrType.Current_HP:
                dict_idx = "ui_role24";
                break;
            case RoleAttrType.Max_HP:
                dict_idx = "ui_role24";
                break;
            case RoleAttrType.Atk:
                dict_idx = "ui_role25";
                break;
            case RoleAttrType.Def:
                dict_idx = "ui_role26";
                break;
            case RoleAttrType.Skill_Atk:
                dict_idx = "ui_role27";
                break;
            case RoleAttrType.Skill_Def:
                dict_idx = "ui_role28";
                break;
            case RoleAttrType.Move:
                dict_idx = "Move";
                break;
            case RoleAttrType.Atk_Speed:
                dict_idx = "Atk_Speed";
                break;
            case RoleAttrType.Crit_Rate:
                dict_idx = "ui_role29";
                break;
            case RoleAttrType.Crit_Damage:
                dict_idx = "ui_role30";
                break;
            case RoleAttrType.Damage_Reduce:
                dict_idx = "ui_role31";
                break;
            case RoleAttrType.Vampire:
                dict_idx = "ui_role32";
                break;
            case RoleAttrType.Combo:
                dict_idx = "ui_role33";
                break;
            case RoleAttrType.Sp_Ignore:
                dict_idx = "ui_role34";
                break;
            case RoleAttrType.Debuff_Res:
                dict_idx = "ui_role35";
                break;
            case RoleAttrType.EN:
                dict_idx = "ui_role80";
                break;
            case RoleAttrType.En_Recover:
                dict_idx = "ui_role81";
                break;
            case RoleAttrType.En_Hit:
                dict_idx = "ui_role82";
                break;
            case RoleAttrType.Combo_Dam:
                dict_idx = "ui_role83";
                break;
            case RoleAttrType.Crit_Res:
                dict_idx = "ui_role85";
                break;
        }
        var result = Template.getGUIText(dict_idx);
        if (result != null) {
            return result;
        }
        else {
            return dict_idx;
        }
    };
    /**
     * 获取角色的属性字典配置（“xxx”式）
     * @param attr
     * @returns {string}
     * @constructor
     */
    RoleUtil.GetAttrNameString = function (attr) {
        var result = RoleUtil.GetAttrPrefixString(attr);
        if (result) {
            result = result.slice(0, result.length - 1);
        }
        return result;
    };
    /**
     * 获取角色羁绊组 key羁绊id - value(羁绊角色队列)
     * @param role_id
     * @returns {any}
     * @constructor
     */
    RoleUtil.GetBondList = function (role_id) {
        var role_config = Template.role.get(role_id);
        if (null == role_config) {
            console.log("GetBondList role_id error" + role_id);
            return null;
        }
        //
        var raw = this.GetBondListRaw(role_config.BondRole, role_config.BondRoleId);
        /**
        console.log("=> GetBondList() " + RoleUtil.GetFullRoleName(role_id) + "[" + role_id + "]");
         **/
        /**
        for(let i: number = 0; i < raw.values.length; i++) {
            let str = "羁绊[" + raw.keys[i] + "] > ";
            for(let j: number = 0; j < raw.values[i].length; j++) {
                str += RoleUtil.GetFullRoleName(raw.values[i][j]) + "[" + raw.values[i][j] + "] ";
            }
            console.log(str);
        }
         */
        //
        return raw;
    };
    /**
     * 获取装备羁绊组
     * @param role_id 角色id
     * @returns {any}
     * @constructor
     */
    RoleUtil.GetEquipBondList = function (role_id) {
        var role_config = Template.role.get(role_id);
        if (null == role_config) {
            console.log("GetBondList role_id error" + role_id);
            return null;
        }
        return this.GetBondListRaw(role_config.BondEquip, role_config.BondEquipId);
    };
    /**
     * 获取羁绊组
     * @param bond_role
     * @param bond_role_id
     * @returns {any}
     * @constructor
     */
    RoleUtil.GetBondListRaw = function (bond_role, bond_role_id) {
        var result = new Dictionary();
        var bond_str = bond_role.split(";");
        for (var bond_count = 0; bond_count < bond_str.length; ++bond_count) {
            var ids_str = bond_str[bond_count].split(",");
            var roles = [];
            for (var i = 0; i < ids_str.length; ++i) {
                roles.push(parseInt(ids_str[i]));
            }
            result.add(bond_role_id[bond_count], roles);
        }
        return result;
    };
    //预测副将上阵的时候，是否有羁绊
    RoleUtil.PreChangeBackupHasBond = function (test_id, change_hero_id) {
        var bond_list = RoleUtil.GetBondList(change_hero_id);
        if (bond_list == null) {
            return false;
        }
        for (var i = 0; i < bond_list.size(); ++i) {
            for (var j = 0; j < bond_list.values[i].length; ++j) {
                if (bond_list.values[i][j] == test_id)
                    return true;
            }
        }
        return false;
    };
    /**
     * 将角色Msg转换成Info
     * @param rec_msg
     */
    RoleUtil.convSyncToInfo = function (rec_msg) {
        var info = new PlayerRolesInfo();
        info.player_info_id = rec_msg.player_info_id;
        info.m_mei_li_lv = rec_msg.m_mei_li_lv;
        info.tech_ids = rec_msg.tech_ids ? rec_msg.tech_ids : [];
        info.tech_lvs = rec_msg.tech_lvs ? rec_msg.tech_lvs : [];
        // 拷贝队伍信息
        info.pve_team = new Dictionary();
        if (rec_msg.pve_team != null) {
            for (var prop in rec_msg.pve_team) {
                info.pve_team.add(parseInt(prop), rec_msg.pve_team[prop]);
            }
        }
        // 拷贝角色信息
        info.roles = [];
        if (rec_msg.roles != null) {
            for (var i = 0; i < rec_msg.roles.length; i++) {
                var role_info_single = new RoleInfo();
                for (var prop_1 in role_info_single) {
                    if (rec_msg.roles[i].hasOwnProperty(prop_1)) {
                        role_info_single[prop_1] = rec_msg.roles[i][prop_1];
                    }
                }
                // 拷贝角色装备
                if (rec_msg.roles[i].equips != null) {
                    role_info_single.equips = [];
                    for (var j = 0; j < rec_msg.roles[i].equips.length; j++) {
                        var equip_info_single = new EquipInfo();
                        for (var prop_2 in equip_info_single) {
                            if (rec_msg.roles[i].equips[j].hasOwnProperty(prop_2)) {
                                equip_info_single[prop_2] = rec_msg.roles[i].equips[j][prop_2];
                            }
                        }
                        equip_info_single = equip_info_single.Clone();
                        role_info_single.equips.push(equip_info_single);
                    }
                }
                if (rec_msg.roles[i].jewelries) {
                    role_info_single.jewelries = [];
                    for (var j = 0; j < rec_msg.roles[i].jewelries.length; j++) {
                        var inf_jew = new JewelryInfo();
                        for (var prop_3 in inf_jew) {
                            if (rec_msg.roles[i].jewelries[j].hasOwnProperty(prop_3)) {
                                inf_jew[prop_3] = rec_msg.roles[i].jewelries[j][prop_3];
                            }
                        }
                        inf_jew = inf_jew.clone();
                        inf_jew.role_id = role_info_single.role_id;
                        role_info_single.jewelries.push(inf_jew);
                    }
                }
                role_info_single.alarm = new RoleAlarmInfo(role_info_single.role_id, role_info_single);
                role_info_single.alarm.refresh();
                info.roles.push(role_info_single);
            }
        }
        // 拷贝副将信息
        info.backup_info = new Dictionary();
        if (rec_msg.backup_info != null) {
            for (var prop in rec_msg.backup_info) {
                var back_info_single = new Dictionary();
                for (var prop_s in rec_msg.backup_info[prop]) {
                    back_info_single.add(parseInt(prop_s), rec_msg.backup_info[prop][prop_s]);
                }
                info.backup_info.add(parseInt(prop), back_info_single);
            }
        }
        return info;
    };
    /**
     * 填充阵容数组
     */
    RoleUtil.fillPveTeamArray = function (pve_team) {
        // 自动填充为空的角色位为0
        if (pve_team.size() < DEFINE.ROLE_MAX_LINEUP_COUNT) {
            for (var i = 0; i < DEFINE.ROLE_MAX_LINEUP_COUNT; i++) {
                if (!pve_team.containsKey(i + 1)) {
                    pve_team.update(i + 1, 0);
                }
            }
        }
        return pve_team;
    };
    /**
     * 返回当前等级对应开启的上阵人数上限
     */
    RoleUtil.GetMaxHeroCounts = function () {
        var max_count = 0;
        for (var i = 0; i < Template.config.Join.length; ++i) {
            if (Singleton.Get(PlayerInfoManager).getTeamLv() < Template.config.Join[i]) {
                break;
            }
            max_count++;
        }
        return max_count;
    };
    /**
     * 返回当前等级对应开启的副将数量上限
     * @returns {number}
     * @constructor
     */
    RoleUtil.GetMaxBackupCounts = function (team_lv) {
        if (!team_lv) {
            team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
        }
        var max_count = 0;
        for (var i = 0; i < Template.config.Backup.length; i++) {
            if (team_lv < Template.config.Backup[i]) {
                break;
            }
            max_count++;
        }
        return max_count;
    };
    /**
     * 返回当前等级对应开启的副将位置上限
     */
    RoleUtil.prototype.GetMaxBackupPosCounts = function () {
        var max_count = 0;
        for (var i = 0; i < Template.config.Backup.length; ++i) {
            if (Singleton.Get(PlayerInfoManager).getTeamLv() < Template.config.Backup[i]) {
                break;
            }
            max_count++;
        }
        return max_count;
    };
    /**
     * 检查角色可合成状态
     * @param role_id
     * @returns {boolean}
     */
    RoleUtil.checkRoleCompose = function (role_id) {
        var role_info = Template.role.get(role_id);
        if (role_info == null) {
            egret.error("no roleId: " + role_id);
            return false;
        }
        var frag_count = Singleton.Get(BagManager).getItemCount(role_info.Fragment);
        if (frag_count >= role_info.RoleSynthesis) {
            return true;
        }
        return false;
    };
    /**
     * 获取角色名称颜色
     * @param star
     * @constructor
     */
    RoleUtil.GetRoleNameColor = function (star, is_list) {
        if (is_list === void 0) { is_list = false; }
        if (star < 1 || star > 4) {
            console.log("no talent_star: " + star);
            return DEFINE_COLOR.ROLE_NAME_LIST[0];
        }
        var color_idx = star - 1;
        if (is_list) {
            return DEFINE_COLOR.ROLE_NAME_LIST[color_idx];
        }
        return DEFINE_COLOR.ROLE_NAME_LIST[color_idx];
        // return DEFINE_COLOR.ROLE_NAME[color_idx - 1];
    };
    /**
     * 获取角色全名
     * @param role_id
     * @constructor
     */
    RoleUtil.GetFullRoleName = function (role_id) {
        var role_info = Template.role.get(role_id);
        if (role_info == null) {
            console.log("no roleId: " + role_id);
            return null;
        }
        var result = Template.getGUIText(role_info.Name);
        var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
        if (my_role != null) {
            if (my_role.breach > 0) {
                result += "+" + my_role.breach;
            }
        }
        return result;
    };
    /**
     * 生成字符串形式的角色名列表
     * @param names 斗士id
     * @param except 要排除的斗士id
     * @returns {string}
     */
    RoleUtil.generateRoleNames = function (names, except) {
        var result = "";
        for (var i = 0; i < names.length; i++) {
            if (names[i] == except) {
                names.splice(i, 1);
                break;
            }
        }
        for (var i = 0; i < names.length; i++) {
            var role_id = names[i];
            var role_info = Template.role.get(role_id);
            if (role_info == null) {
                egret.error("no roleId: " + role_id);
                continue;
            }
            var role_name = Template.getGUIText(role_info.Name);
            result += role_name;
            if (i < names.length - 1) {
                result += "、";
            }
        }
        return result;
    };
    /**
     * 生成字符串形式的装备名列表
     * @param names 装备id
     * @param except 要排除的装备id
     * @returns {string}
     */
    RoleUtil.generateEquipNames = function (names, except) {
        var result = "";
        for (var i = 0; i < names.length; i++) {
            if (names[i] == except) {
                names.splice(i, 1);
                break;
            }
        }
        for (var i = 0; i < names.length; i++) {
            var equip_id = names[i];
            var item_info = Template.item.get(equip_id);
            if (item_info == null) {
                egret.error("no itemId: " + equip_id);
                continue;
            }
            var equip_name = Template.getGUIText(item_info.iName);
            result += equip_name;
            if (i < names.length - 1) {
                result += "、";
            }
        }
        return result;
    };
    // 生成显示用的技能描述
    RoleUtil.getSkillValueDes = function (info) {
        var result = [];
        var role_cfg = Template.role.get(info.role_id);
        var skill_cfg = Template.skill.get(role_cfg.Skill);
        for (var i = 0; i < skill_cfg.DesN1.length; ++i) {
            // 技能属性 = 基础值 +（等级-1）*成长值
            result.push((skill_cfg.DesN1[i] + (info.skill_lv - 1) * skill_cfg.DesN2[i]) >> 0);
        }
        return result;
    };
    RoleUtil.handleLineupHeroGo = function (lup, role_id) {
        // 未解锁
        var unlocked_count = RoleUtil.GetMaxHeroCounts();
        if (lup + 1 > unlocked_count) {
            // 显示X级解锁
            var unlock_lv = Template.config.Join[lup];
            Singleton.Get(DialogControler).showString(unlock_lv + "级解锁");
            return;
        }
        // 无角色
        if (role_id <= 0) {
            Singleton.Get(LayerManager).getView(ui.RoleSelectHeroAlertView).openByLineupId(lup);
            return;
        }
        Singleton.Get(LayerManager).getView(ui.RoleLineupView).selHero(lup);
        Singleton.Get(LayerManager).getView(ui.RoleLineupView).selCardEf(lup);
    };
    RoleUtil.handleLineupBackupGo = function (lup, bk_pos, role_id) {
        // console.log("handleLineupBackupGo(lup: " + lup +  ", bk_pos: " + bk_pos + ", role_id: " + role_id + ")");
        // 未解锁
        var unlocked_count = RoleUtil.GetMaxBackupCounts();
        if (bk_pos > unlocked_count) {
            var unlock_lv = Template.config.Backup[bk_pos - 1];
            Singleton.Get(DialogControler).showString(UtilsGame.stringHander(Template.getGUIText("append_213"), unlock_lv)); // TODO 加到字典表
            return;
        }
        var roles = Singleton.Get(RoleManager).getRolesInfo();
        // 无角色 弹出副将选择
        if (role_id <= 0) {
            Singleton.Get(LayerManager).getView(ui.RoleSelectBackupPanelView).open(bk_pos, roles.getPosByLup(lup));
            return;
        }
        // 有角色 弹出副将详情
        Singleton.Get(LayerManager).getView(ui.RoleBackupDetailPanelView).open(bk_pos, roles.getPosByLup(lup));
    };
    /**
     * 打开布阵界面
     */
    RoleUtil.openHeroOpinion = function () {
        var pve_team = Singleton.Get(RoleManager).getRolesInfo().pve_team;
        Singleton.Get(LayerManager).getView(ui.RoleOpinionView).open();
        Singleton.Get(LayerManager).getView(ui.RoleOpinionView).initRoles(pve_team, function (result) {
            var final = {};
            for (var i = 0; i < result.length; i++) {
                var role_id = result[i];
                if (role_id > 0) {
                    final[i + 1] = role_id;
                }
            }
            Singleton.Get(RoleManager).onReqOpinion(final);
        }, this);
    };
    /**
     * 获取一系列角色的战斗力总和
     * @param roles
     */
    RoleUtil.getFighting = function (roles) {
        if (!roles) {
            return;
        }
        var result = 0;
        var inf_roles = Singleton.Get(RoleManager).getRolesInfo();
        for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
            var role_id = roles_1[_i];
            if (role_id <= 0) {
                continue;
            }
            var inf_role = inf_roles.GetRole(role_id);
            if (!inf_role || inf_role.fighting < 0) {
                continue;
            }
            result += inf_role.fighting;
        }
        return result;
    };
    /**
     * 根据队伍数组生成队伍字典
     * @param roles
     */
    RoleUtil.genPveTeam = function (roles) {
        var result = new Dictionary();
        if (!roles) {
            return null;
        }
        for (var i = 0; i < roles.length; i++) {
            if (roles[i] <= 0) {
                result.update(i + 1, 0);
            }
            else {
                result.update(i + 1, roles[i]);
            }
        }
        return result;
    };
    /**
     * 根据战力由高到低生成角色列表
     */
    RoleUtil.genRolesByFighting = function () {
        var result = [];
        // 获取全部角色信息
        var roles = Singleton.Get(RoleManager).getRolesInfo();
        for (var _i = 0, _a = roles.roles; _i < _a.length; _i++) {
            var role = _a[_i];
            result.push(role.role_id);
        }
        // 根据战力进行排序
        result.sort(function (a, b) {
            var fighting_a = roles.GetRole(a).fighting;
            var fighting_b = roles.GetRole(b).fighting;
            if (fighting_a > fighting_b) {
                return -1;
            }
            else if (fighting_a < fighting_b) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return result;
    };
    /**
     * 生成羁绊属性文字（“生命+10%、暴击率+1.50%”）
     * @param bond_id
     * @returns {string}
     */
    RoleUtil.genBondAttrStr = function (bond_id) {
        var cfg_bond = Template.bond.get(bond_id);
        if (!cfg_bond) {
            return;
        }
        var result = "";
        for (var i = 0; i < cfg_bond.BondAtt.length; i++) {
            var att_str = RoleUtil.GetAttrPrefixString(cfg_bond.BondAtt[i]);
            result += att_str.slice(0, att_str.length - 1) + "+" + (cfg_bond.BondAttvalue[i] / 100 * 10) + "%";
            if (i < cfg_bond.BondAtt.length - 1) {
                result += Template.getGUIText("ui_role96");
            }
        }
        return result;
    };
    /**
     * 生成完整羁绊介绍
     * @param bond_id
     * @param role_names
     * @param hero_id
     * @returns {string}
     */
    RoleUtil.genBondDes = function (bond_id, role_names, hero_id) {
        var cfg_bond = Template.bond.get(bond_id);
        if (!cfg_bond) {
            egret.error("no bondId: " + bond_id);
            return;
        }
        return UtilsGame.stringHander(Template.getGUIText("ui_role94"), RoleUtil.generateRoleNames(role_names, 0), Template.getGUIText(Template.role.get(hero_id).Name), RoleUtil.genBondAttrStr(bond_id));
    };
    /**
     * 生成副将属性文字
     * @param role_id
     * @param max 是否满级属性
     * @returns {string[]}
     */
    RoleUtil.genBackupAttrStrs = function (role_id, max, roles) {
        if (max === void 0) { max = false; }
        if (!roles) {
            roles = Singleton.Get(RoleManager).getRolesInfo();
        }
        var my_role = roles.GetRole(role_id);
        if (!my_role) {
            my_role = new RoleInfo();
            my_role.InitByRoleConfigIdAndLv(role_id, 1);
        }
        // 计算角色副将属性
        var attr = my_role.GetBackupAddAttr(max);
        var str_attrs = [];
        attr.foreachKey(function (key) {
            if (key == -1) {
                return;
            }
            var v = attr.get(key).toString();
            if (key == RoleAttrType.Crit_Damage || key == RoleAttrType.Crit_Rate
                || key == RoleAttrType.Damage_Reduce || key == RoleAttrType.Crit_Res) {
                v = UtilsGame.toOptionalFixed(attr.get(key) / 10.0, 1);
            }
            var des = RoleUtil.GetAttrString(key);
            str_attrs.push(UtilsGame.stringHander(des, v));
        }, this);
        return str_attrs;
    };
    /**
     * 生成副将推荐文字
     * @param hero_id 主将role_id
     */
    RoleUtil.genBackupRecStr = function (hero_id) {
        var cfg_role = Template.role.get(hero_id);
        if (!cfg_role) {
            return "";
        }
        var str_types = "";
        for (var i = 0; i < cfg_role.BackupRe.length; i++) {
            str_types += RoleUtil.GetAttrNameString(cfg_role.BackupRe[i]);
            if (i < cfg_role.BackupRe.length - 2) {
                str_types += Template.getGUIText("ui_role96");
            }
            else if (i < cfg_role.BackupRe.length - 1) {
                str_types += Template.getGUIText("ui_role97");
            }
        }
        return UtilsGame.stringHander(Template.getGUIText("ui_role90"), str_types);
    };
    /**
     * 某副将是否是某主将的推荐副将
     * @param hero_id
     * @param backup_id
     * @returns {boolean}
     */
    RoleUtil.isRecBackup = function (hero_id, backup_id) {
        var cfg_r_hero = Template.role.get(hero_id);
        if (!cfg_r_hero) {
            return false;
        }
        var cfg_r_backup = Template.role.get(backup_id);
        if (!cfg_r_backup) {
            return false;
        }
        for (var i = 0; i < cfg_r_backup.BackupId.length; i++) {
            var cfg_backup = Template.backup.get(cfg_r_backup.BackupId[i]);
            if (!cfg_backup) {
                continue;
            }
            for (var j = 0; j < cfg_backup.BackupAtt.length; j++) {
                if (UtilsArray.contains(cfg_r_hero.BackupRe, cfg_backup.BackupAtt[j]) && cfg_backup.BackupAtt[j] > 0) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 有空装备位提示一键穿戴 背包没有装备弹出装备获取提示
     * @return 是否有空的装备位
     */
    RoleUtil.checkRoleEquipable = function (role_id) {
        var _this = this;
        var roles = Singleton.Get(RoleManager).getRolesInfo();
        if (!roles) {
            return false;
        }
        var my_role = roles.GetRole(role_id);
        if (!role_id) {
            return false;
        }
        // 所有装备位置上都有装备
        if (!my_role.checkAnyEquipPosEmpty()) {
            return false;
        }
        Singleton.Get(DialogControler).showInfo(1194, this, function () {
            if (Singleton.Get(BagManager).hasAnyEquip()) {
                Singleton.Get(EquipManager).onReqChangeAuto(role_id, function () {
                    var layer = Singleton.Get(LayerManager);
                    if (layer.isViewOnStage(layer.getView(ui.RoleEquipRefineView))) {
                        layer.getView(ui.RoleEquipRefineView).refresh();
                    }
                    if (layer.isViewOnStage(layer.getView(ui.RoleEquipStrengthView))) {
                        layer.getView(ui.RoleEquipStrengthView).refresh();
                    }
                }, _this);
            }
            else {
                _this.showEquipNotify();
            }
        });
        return true;
    };
    /**
     * 展示无装备，应获取装备提示
     */
    RoleUtil.showEquipNotify = function () {
        var _this = this;
        Singleton.Get(DialogControler).showInfo(1184, this, function () {
            var cfg_fbt = Template.fbtype.get(E_FBTYPE.Equip);
            var team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
            if (team_lv < cfg_fbt.OpenLv) {
                Singleton.Get(DialogControler).showInfo(1169, _this, undefined, undefined, cfg_fbt.OpenLv);
                return;
            }
            Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnCastle(undefined);
            Singleton.Get(LayerManager).getView(ui.InstanceNewBaseView).open(true);
            Singleton.Get(LayerManager).getView(ui.InstanceNewBaseView).openSecondaryMenu();
            Singleton.Get(LayerManager).getView(ui.InstanceNewListView).open(cfg_fbt.ID);
        });
    };
    /**
     * 获取角色碎片数量
     */
    RoleUtil.getAwakenFragment = function (cfg_awaken, role_id) {
        var cfg_role = Template.role.get(role_id);
        if (!cfg_role || cfg_role.Star > cfg_awaken.AwakenFragment.length) {
            return 999;
        }
        return cfg_awaken.AwakenFragment[cfg_role.Star - 1];
    };
    /**
     * 根据装备通用位置id获取饰品数组所在位ID
     */
    RoleUtil.getJewIdxByPos = function (role_id, pos) {
        var cfg_role = Template.role.get(role_id);
        if (!cfg_role) {
            console.error("no role: " + role_id);
            return;
        }
        for (var i = 0; i < cfg_role.JewelryId.length; i++) {
            var cfg_jew = Template.jewelry.get(cfg_role.JewelryId[i]);
            if (!cfg_jew) {
                console.error("no jew: " + cfg_role.JewelryId[i]);
                continue;
            }
            if (cfg_jew.Position == pos) {
                return i;
            }
        }
        return 0;
    };
    // region 装备相关操作
    /**
     * 验证某个附魔ID是否对应指定的装备位
     * @param pos
     * @param enchant_id
     */
    RoleUtil.isEnchentForPos = function (pos, enchant_id) {
        if (enchant_id <= 0) {
            return false;
        }
        var comp = [0, 0];
        switch (pos) {
            case EquipPos.Weapon:
                comp = Template.config.EnchantId1;
                break;
            case EquipPos.Chest:
                comp = Template.config.EnchantId2;
                break;
            case EquipPos.Leg:
                comp = Template.config.EnchantId3;
                break;
            case EquipPos.Shoe:
                comp = Template.config.EnchantId4;
                break;
        }
        return (enchant_id >= comp[0] && enchant_id <= comp[1]);
    };
    return RoleUtil;
}());
__reflect(RoleUtil.prototype, "RoleUtil");
//# sourceMappingURL=RoleUtil.js.map