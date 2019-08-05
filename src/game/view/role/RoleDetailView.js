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
    var RoleDetailView = (function (_super) {
        __extends(RoleDetailView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function RoleDetailView() {
            var _this = _super.call(this, "yw.RoleDetailSkin") || this;
            _this.is_cool = false;
            _this.is_coolest = false;
            _this.touchEnabled = true;
            _this.init();
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        RoleDetailView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        RoleDetailView.prototype.onDestroy = function () {
            //this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        /**
         * 帧更新
         * @param time
         */
        RoleDetailView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化
         */
        RoleDetailView.prototype.init = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.initGuiText();
        };
        /**
         * 初始化UI文字
         */
        RoleDetailView.prototype.initGuiText = function () {
            this.labSpAttrBondDes.text = Template.getGUIText("ui_role95");
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        RoleDetailView.prototype.open = function (role_id, is_cool, is_coolest) {
            if (is_cool === void 0) { is_cool = false; }
            if (is_coolest === void 0) { is_coolest = false; }
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.is_cool = is_cool;
            this.is_coolest = is_coolest;
            this.initRoleInfo(role_id);
        };
        /**
         * 关闭本界面
         */
        RoleDetailView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
            this.is_cool = false;
        };
        // endregion
        // region 获取途径
        /**
         * 初始化角色信息
         */
        RoleDetailView.prototype.initRoleInfo = function (role_id) {
            // console.log("Detail: " + role_id);
            // 加载角色信息
            var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (this.is_cool || !my_role) {
                this.initRoleInfoLocked(role_id);
            }
            else {
                this.initRoleInfoUnlocked(my_role);
            }
            this.compCardEx.data = {
                roleId: role_id,
                no_new: true,
                no_lineup: this.is_cool || !my_role,
                no_stand: this.is_cool || !my_role,
                ani_idx: -1,
                coolest: this.is_coolest
            };
            this.scrollerAttrSp.validateNow();
            this.scrollerAttrSp.viewport.scrollV = 0;
        };
        /**
         * 初始化已解锁角色信息
         * @param role_id
         */
        RoleDetailView.prototype.initRoleInfoUnlocked = function (my_role) {
            var _this = this;
            var role_id = my_role.role_id;
            var role_info = Template.role.get(role_id);
            if (role_info == null) {
                egret.error("no roleId: " + role_id);
                return;
            }
            var talent_info = Template.talent.get(my_role.talent);
            if (talent_info == null) {
                egret.error("no talent, roleId: " + role_id + "， talentId: " + my_role.talent);
                return;
            }
            var awaken_info = Template.awaken.get(my_role.awaken);
            if (awaken_info == null) {
                egret.error("no awaken, roleId: " + role_id + "， talentId: " + my_role.awaken);
                return;
            }
            //Common.fillRoleCard(role_id, this.compCard);
            this.labText.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText(role_info.Location));
            this.labFighting.text = "战力：" + my_role.fighting;
            this.labTalent.text = "资质：" + my_role.getTalentNum().toString(); //talent_info.Star.toString();
            this.labHp.text = my_role.max_hp.toString();
            this.labDef.text = my_role.def.toString();
            this.labAtk.text = my_role.atk.toString();
            this.labDefSp.text = my_role.skill_def.toString();
            this.labAtkSp.text = my_role.skill_atk.toString();
            //this.labMoveSpeed.text = role_info.Move.toString();
            //this.labAtkSpeed.text = my_role.atk_speed.toString();
            this.labCrit.text = UtilsGame.toOptionalFixed(my_role.crit_rate / 10.0, 1) + "%";
            this.labCritDamage.text = UtilsGame.toOptionalFixed(my_role.crit_damage / 10.0, 1) + "%";
            this.labDamageReduce.text = UtilsGame.toOptionalFixed(my_role.dmg_reduce / 10.0, 1) + "%";
            this.labVampire.text = my_role.vampire.toString();
            this.labCombo.text = my_role.combo.toString();
            this.labSpIgnore.text = my_role.sp_ignore.toString();
            this.labDebuffRes.text = my_role.debuff_res.toString();
            this.labComboDamage.text = my_role.combo_dam.toString();
            this.labEn.text = my_role.en.toString();
            this.labEnHit.text = my_role.en_hit.toString();
            this.labEnRecover.text = my_role.en_recover.toString();
            this.labCritRes.text = UtilsGame.toOptionalFixed(my_role.crit_res / 10.0, 1) + "%";
            // 特殊：角色突破属性
            var breach_list = role_info.BreachId;
            this.clearAllBreachAttr();
            for (var i = 0; i < breach_list.length; i++) {
                var is_active = i < my_role.breach;
                this.addBreachAttr(i + 1, breach_list[i], is_active);
            }
            // 特殊：角色羁绊属性
            this.clearAllBondAttr();
            var bond_list = RoleUtil.GetBondList(role_id);
            if (bond_list == null) {
                egret.error("no bond, roleId: " + role_id);
                return;
            }
            var active_bond = Singleton.Get(RoleManager).getRolesInfo().ActiveBonds(role_id);
            bond_list.foreachKey(function (bond_id) {
                // 检查羁绊激活
                var is_active = false;
                for (var i = 0; i < active_bond.length; i++) {
                    if (active_bond[i] == bond_id) {
                        is_active = true;
                        break;
                    }
                }
                _this.addBondAttr(bond_id, is_active, bond_list.get(bond_id), role_id);
            }, this);
            // 特殊：装备羁绊属性
            var equip_bond_list = RoleUtil.GetEquipBondList(role_id);
            if (equip_bond_list == null) {
                egret.error("no bond, roleId: " + role_id);
                return;
            }
            var active_equip_bond = Singleton.Get(RoleManager).getRolesInfo().ActiveEquipBonds(role_id);
            equip_bond_list.foreachKey(function (bond_id) {
                // 检查羁绊激活
                var is_active = false;
                for (var i = 0; i < active_equip_bond.length; i++) {
                    if (active_equip_bond[i] == bond_id) {
                        is_active = true;
                        break;
                    }
                }
                _this.addEquipBondAttr(bond_id, is_active, equip_bond_list.get(bond_id));
            }, this);
            // 特殊：角色技能属性
            this.clearAllSkillAttr();
            this.addSkillAttr(my_role, role_info.Skill, my_role.skill_lv);
            // 特殊：角色副将能力属性
            var cur_active_fighting_idx = 0; // 下级所需战力索引
            for (var i = 0; i < role_info.BackupId.length; i++) {
                var effect_id = role_info.BackupId[i];
                var effect_info = Template.backup.get(effect_id);
                if (effect_info == null) {
                    egret.error("no backup, roleId: " + role_id + "，backupId: " + effect_id);
                    continue;
                }
                var need_force = role_info.BackupForce[i];
                var is_active = my_role.fighting >= need_force;
                if (is_active) {
                    cur_active_fighting_idx = i;
                }
            }
            this.clearAllBackupEffectAttr();
            this.addBackupEffectAttr(role_info.BackupId[cur_active_fighting_idx], false);
            //this.addBackupEffectAttr(role_info.BackupId[role_info.BackupId.length - 1], true);
            // 特殊：角色副将加成属性
            //this.clearAllBackupAddAttr();
            /**
            let pve_team: Dictionary<number, number>  = Singleton.Get(RoleManager).getRolesInfo().pve_team;
            let team_pos: number = 0;
            pve_team.foreachKey((key: number) => {
               let team_role_id: number = pve_team.get(key);
                if(team_role_id == role_id){
                    team_pos = key;
                }
            }, this);
            if(team_pos <= 0){
                //this.groupSpAttrBackupAddTitle.visible = false;
                //this.labSpAttrBackupAdd.visible = false;
            }else{
                //this.groupSpAttrBackupAddTitle.visible = true;
                //this.labSpAttrBackupAdd.visible = true;

                let backups: Dictionary<number, number> = Singleton.Get(RoleManager).getRolesInfo().backup_info.get(team_pos);
                if(backups == null){
                    backups = new Dictionary<number, number>();
                }
                for(let i: number = 1;  i <= 3; i++){
                    this.addBackupAddAttr(backups.get(i) == null ? 0 : backups.get(i));
                }
            }
             **/
            // 特殊：角色觉醒属性 TODO 检查属性计算，算出正确的属性
            var cur_awaken = my_role.GetCurAwakenAttrDeltaList();
            this.labAwakenHp.text = cur_awaken[0].toString();
            this.labAwakenAtk.text = cur_awaken[1].toString();
            this.labAwakenDef.text = cur_awaken[2].toString();
            this.labAwakenAtkSp.text = cur_awaken[3].toString();
            this.labAwakenDefSp.text = cur_awaken[4].toString();
        };
        /**
         * 初始化未解锁角色信息
         * @param role_id
         */
        RoleDetailView.prototype.initRoleInfoLocked = function (role_id) {
            var _this = this;
            var role_info = Template.role.get(role_id);
            if (role_info == null) {
                egret.error("no roleId: " + role_id);
                return;
            }
            var my_role = new RoleInfo();
            my_role.InitByRoleConfigIdAndLv(role_id, 1);
            var talent_info = Template.talent.get(my_role.talent);
            if (talent_info == null) {
                egret.error("no talent, roleId: " + role_id + "， talentId: " + my_role.talent);
                return;
            }
            var awaken_info = Template.awaken.get(my_role.awaken);
            if (awaken_info == null) {
                egret.error("no awaken, roleId: " + role_id + "， talentId: " + my_role.awaken);
                return;
            }
            //Common.fillRoleCardLocked(role_id, this.compCard);
            this.labText.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText(role_info.Location));
            this.labFighting.text = "战力：" + my_role.fighting;
            this.labTalent.text = "资质：" + role_info.Talent;
            this.labHp.text = my_role.max_hp.toString();
            this.labDef.text = my_role.def.toString();
            this.labAtk.text = my_role.atk.toString();
            this.labDefSp.text = my_role.skill_def.toString();
            this.labAtkSp.text = my_role.skill_atk.toString();
            // this.labMoveSpeed.text = role_info.Move.toString();
            // this.labAtkSpeed.text = my_role.atk_speed.toString();
            this.labCrit.text = UtilsGame.toOptionalFixed(my_role.crit_rate / 10.0, 1) + "%";
            this.labCritDamage.text = UtilsGame.toOptionalFixed(my_role.crit_damage / 10.0, 1) + "%";
            this.labDamageReduce.text = UtilsGame.toOptionalFixed(my_role.dmg_reduce / 10.0, 1) + "%";
            this.labVampire.text = UtilsGame.toOptionalFixed(my_role.vampire / 10.0, 1) + "%";
            this.labCombo.text = my_role.combo.toString();
            this.labSpIgnore.text = my_role.sp_ignore.toString();
            this.labDebuffRes.text = my_role.debuff_res.toString();
            this.labComboDamage.text = my_role.combo_dam.toString();
            this.labEn.text = my_role.en.toString();
            this.labEnHit.text = my_role.en_hit.toString();
            this.labEnRecover.text = my_role.en_recover.toString();
            this.labCritRes.text = UtilsGame.toOptionalFixed(my_role.crit_res / 10.0, 1) + "%";
            // 特殊：角色突破属性
            var breach_list = role_info.BreachId;
            this.clearAllBreachAttr();
            for (var i = 0; i < breach_list.length; i++) {
                this.addBreachAttr(i + 1, breach_list[i], false);
            }
            // 特殊：角色羁绊属性
            this.clearAllBondAttr();
            var bond_list = RoleUtil.GetBondList(role_id);
            if (bond_list == null) {
                egret.error("no bond, roleId: " + role_id);
                return;
            }
            bond_list.foreachKey(function (bond_id) {
                _this.addBondAttr(bond_id, false, bond_list.get(bond_id), role_id);
            }, this);
            // 特殊：装备羁绊属性
            var equip_bond_list = RoleUtil.GetEquipBondList(role_id);
            if (equip_bond_list == null) {
                egret.error("no eqbond, roleId: " + role_id);
                return;
            }
            equip_bond_list.foreachKey(function (bond_id) {
                _this.addEquipBondAttr(bond_id, false, equip_bond_list.get(bond_id), role_id);
            }, this);
            // 特殊：角色技能属性
            this.clearAllSkillAttr();
            this.addSkillAttr(my_role, role_info.Skill, my_role.skill_lv);
            // 特殊：角色副将能力属性
            this.clearAllBackupEffectAttr();
            this.addBackupEffectAttr(role_info.BackupId[0], false);
            // this.addBackupEffectAttr(role_info.BackupId[role_info.BackupId.length - 1], false);
            // 特殊：角色副将加成属性(未解锁副将不会有副将加成)
            //this.clearAllBackupAddAttr();
            //this.groupSpAttrBackupAddTitle.visible = false;
            //this.labSpAttrBackupAdd.visible = false;
            // 特殊：角色觉醒属性 TODO 检查属性计算，算出正确的属性
            var cur_awaken = my_role.GetCurAwakenAttrDeltaList();
            this.labAwakenHp.text = cur_awaken[0].toString();
            this.labAwakenAtk.text = cur_awaken[1].toString();
            this.labAwakenDef.text = cur_awaken[2].toString();
            this.labAwakenAtkSp.text = cur_awaken[3].toString();
            this.labAwakenDefSp.text = cur_awaken[4].toString();
        };
        // endregion
        // region 属性标签管理
        /**
         * 添加突破属性
         * @param idx
         * @param breachId
         */
        RoleDetailView.prototype.addBreachAttr = function (idx, breach_id, is_active) {
            var breach_info = Template.breach.get(breach_id);
            if (!breach_info) {
                egret.error("no breachId: " + breach_id);
                return;
            }
            // 天赋等级
            var tianfu_str = "";
            // 天赋属性
            for (var i = 0; i < 3; i++) {
                if (i < breach_info.BreachAtt.length) {
                    tianfu_str += RoleUtil.GetAttrPrefixString(breach_info.BreachAtt[i]).replace(Template.getGUIText("append_89"), "");
                    tianfu_str += "+" + Common.attrValueHandlerWithPct(breach_info.BreachAttvalue[i], breach_info.BreachAtt[i]) + " ";
                }
            }
            var str_template = "天赋$1：$2";
            var final_Str = UtilsGame.stringHander(str_template, idx, tianfu_str);
            var breach_label = new eui.Label();
            breach_label.fontFamily = DEFINE.UI_FONT_FAMILY;
            breach_label.size = DEFINE.UI_FONT_SIZE_L;
            breach_label.bold = true;
            breach_label.textFlow = new egret.HtmlTextParser().parser(final_Str);
            breach_label.textColor = is_active ? DEFINE_COLOR.TEXT_ORANGE : DEFINE_COLOR.TEXT_GRAY;
            this.groupSpAttrBreach.addChild(breach_label);
            this.breach_attr_labels.push(breach_label);
        };
        /**
         * 清空所有突破属性标签
         */
        RoleDetailView.prototype.clearAllBreachAttr = function () {
            //console.log("clearAllBreachAttr()");
            if (this.breach_attr_labels != null) {
                for (var i = 0; i < this.breach_attr_labels.length; i++) {
                    this.groupSpAttrBreach.removeChild(this.breach_attr_labels[i]);
                }
            }
            this.breach_attr_labels = [];
        };
        /**
         * 添加羁绊属性标签
         */
        RoleDetailView.prototype.addBondAttr = function (bond_id, is_active, role_names, except) {
            var bond_info = Template.bond.get(bond_id);
            if (bond_info == null) {
                egret.error("no bondId: " + bond_id);
                return;
            }
            var bond_name = Template.getGUIText(bond_info.BondName);
            var bond_des = RoleUtil.genBondDes(bond_id, role_names, except);
            var final_str = bond_name + "\r\n" + bond_des;
            var bond_label = new eui.Label();
            bond_label.fontFamily = DEFINE.UI_FONT_FAMILY;
            bond_label.size = DEFINE.UI_FONT_SIZE_L;
            bond_label.bold = true;
            bond_label.width = 364;
            bond_label.lineSpacing = 4;
            bond_label.textFlow = new egret.HtmlTextParser().parser(final_str);
            bond_label.textColor = is_active ? DEFINE_COLOR.TEXT_ORANGE : DEFINE_COLOR.TEXT_GRAY;
            this.groupSpAttrBond.addChild(bond_label);
            this.bond_attr_labels.push(bond_label);
        };
        /**
         * 添加装备羁绊属性标签
         */
        RoleDetailView.prototype.addEquipBondAttr = function (bond_id, is_active, equip_names, except) {
            if (except === void 0) { except = 0; }
            var bond_info = Template.bond.get(bond_id);
            if (bond_info == null) {
                egret.error("no bondId: " + bond_id);
                return;
            }
            var bond_name = Template.getGUIText(bond_info.BondName);
            var bond_des = UtilsGame.stringHander(Template.getGUIText(bond_info.BondTxt), RoleUtil.generateEquipNames(equip_names, except));
            var final_str = bond_name + "\r\n" + bond_des;
            var bond_label = new eui.Label();
            bond_label.fontFamily = DEFINE.UI_FONT_FAMILY;
            bond_label.size = DEFINE.UI_FONT_SIZE_L;
            bond_label.bold = true;
            bond_label.width = 364;
            bond_label.lineSpacing = 4;
            bond_label.textFlow = new egret.HtmlTextParser().parser(final_str);
            bond_label.textColor = is_active ? DEFINE_COLOR.TEXT_ORANGE : DEFINE_COLOR.TEXT_GRAY;
            this.groupSpAttrBond.addChild(bond_label);
            this.bond_attr_labels.push(bond_label);
        };
        /**
         * 清空所有羁绊属性标签
         */
        RoleDetailView.prototype.clearAllBondAttr = function () {
            if (this.bond_attr_labels == null) {
                this.bond_attr_labels = [];
                return;
            }
            if (this.bond_attr_labels != null) {
                for (var i = 0; i < this.bond_attr_labels.length; i++) {
                    this.groupSpAttrBond.removeChild(this.bond_attr_labels[i]);
                }
            }
            this.bond_attr_labels = [];
        };
        /**
         * 添加技能信息标签
         * @param skillId
         * @param skillLv
         */
        RoleDetailView.prototype.addSkillAttr = function (my_role, skill_id, skill_lv) {
            var skill_info = Template.skill.get(skill_id);
            if (skill_info == null) {
                egret.error("no skillId: " + skill_id);
                return;
            }
            var str_template = Template.getGUIText(skill_info.Name) + " Lv." + skill_lv;
            var skill_attrs = RoleUtil.getSkillValueDes(my_role);
            var final_Str = str_template;
            var skill_label = new eui.Label();
            skill_label.fontFamily = DEFINE.UI_FONT_FAMILY;
            skill_label.size = DEFINE.UI_FONT_SIZE_L;
            skill_label.bold = true;
            skill_label.width = 364;
            skill_label.lineSpacing = 4;
            skill_label.textFlow = new egret.HtmlTextParser().parser('<font color="' + DEFINE_COLOR.TEXT_ORANGE + '">' + final_Str + '</font>' + "\r\n" + '<font color="' + DEFINE_COLOR.TEXT_BLUE + '">' + UtilsGame.stringHanderEx(Template.getGUIText(skill_info.Des), skill_attrs) + "</font>");
            skill_label.textColor = DEFINE_COLOR.TEXT_ORANGE;
            this.groupSpAttrSkill.addChild(skill_label);
            this.skill_attr_labels.push(skill_label);
        };
        /**
         * 清空所有技能属性标签
         */
        RoleDetailView.prototype.clearAllSkillAttr = function () {
            if (this.skill_attr_labels == null) {
                this.skill_attr_labels = [];
                return;
            }
            if (this.skill_attr_labels != null) {
                for (var i = 0; i < this.skill_attr_labels.length; i++) {
                    this.groupSpAttrSkill.removeChild(this.skill_attr_labels[i]);
                }
            }
            this.skill_attr_labels = [];
        };
        /**
         * 添加副将效果信息
         * @param backup_id
         * @param is_max
         */
        RoleDetailView.prototype.addBackupEffectAttr = function (backup_id, is_max) {
            var backup_info = Template.backup.get(backup_id);
            if (backup_info == null) {
                egret.error("no backup_id: " + backup_id);
                return;
            }
            var str_template = UtilsGame.stringHander(RoleUtil.GetAttrString(backup_info.BackupAtt[0]), backup_info.BackupAttvalue[0]);
            var final_Str = (is_max ? "最大效果：" : "当前效果：") + str_template;
            var label = new eui.Label();
            label.fontFamily = DEFINE.UI_FONT_FAMILY;
            label.size = DEFINE.UI_FONT_SIZE_L;
            label.bold = true;
            label.text = final_Str;
            label.textColor = is_max ? DEFINE_COLOR.TEXT_BLUE : DEFINE_COLOR.TEXT_ORANGE;
            this.groupSpAttrBackupEffect.addChild(label);
            this.backup_effect_attr_labels.push(label);
        };
        /**
         * 清空所有副将效果属性标签
         */
        RoleDetailView.prototype.clearAllBackupEffectAttr = function () {
            if (this.backup_effect_attr_labels == null) {
                this.backup_effect_attr_labels = [];
                return;
            }
            if (this.backup_effect_attr_labels != null) {
                for (var i = 0; i < this.backup_effect_attr_labels.length; i++) {
                    this.groupSpAttrBackupEffect.removeChild(this.backup_effect_attr_labels[i]);
                }
            }
            this.backup_effect_attr_labels = [];
        };
        /**
         * 添加副将加成属性
         * @param backup_id
         */
        RoleDetailView.prototype.addBackupAddAttr = function (backup_role_id) {
            var label = new eui.Label();
            label.fontFamily = DEFINE.UI_FONT_FAMILY;
            label.size = DEFINE.UI_FONT_SIZE_L;
            label.bold = true;
            if (backup_role_id <= 0) {
                label.text = "未任用副将";
                label.textColor = DEFINE_COLOR.TEXT_GRAY;
            }
            else {
                var backup_role_info = Template.role.get(backup_role_id);
                var my_role_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(backup_role_id);
                var cur_active_fighting_idx = 0; // 下级所需战力索引
                for (var i = 0; i < backup_role_info.BackupId.length; i++) {
                    var effect_id_1 = backup_role_info.BackupId[i];
                    var effect_info_1 = Template.backup.get(effect_id_1);
                    if (effect_info_1 == null) {
                        egret.error("no roleId: " + backup_role_id + "，backupId: " + effect_id_1);
                        continue;
                    }
                    var need_force = backup_role_info.BackupForce[i];
                    var is_active = my_role_info.fighting >= need_force;
                    if (is_active) {
                        cur_active_fighting_idx = i;
                    }
                }
                var effect_id = backup_role_info.BackupId[cur_active_fighting_idx];
                var effect_info = Template.backup.get(effect_id);
                label.text = Template.getGUIText(backup_role_info.Name) + "：" + UtilsGame.stringHander(RoleUtil.GetAttrString(effect_info.BackupAtt[0]), effect_info.BackupAttvalue[0]);
                label.textColor = DEFINE_COLOR.TEXT_ORANGE;
            }
            //this.groupSpAttrBackupAdd.addChild(label);
            this.backup_add_attr_labels.push(label);
        };
        /**
         * 清空所有副将加成属性标签
         */
        RoleDetailView.prototype.clearAllBackupAddAttr = function () {
            if (this.backup_add_attr_labels == null) {
                this.backup_add_attr_labels = [];
                return;
            }
            if (this.backup_add_attr_labels != null) {
                for (var i = 0; i < this.backup_add_attr_labels.length; i++) {
                }
            }
            this.backup_add_attr_labels = [];
        };
        // endregion
        // region 响应点击事件
        /**
         * 响应关闭按钮点击事件
         */
        RoleDetailView.prototype.onClick_btnClose = function () {
            this.close();
        };
        return RoleDetailView;
    }(PopupUI));
    ui.RoleDetailView = RoleDetailView;
    __reflect(RoleDetailView.prototype, "ui.RoleDetailView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleDetailView.js.map