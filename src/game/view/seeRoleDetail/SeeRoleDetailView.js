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
    var SeeRoleDetailView = (function (_super) {
        __extends(SeeRoleDetailView, _super);
        ////////////////////////////exml2class:结束替换声明区域///////////////////////////////
        function SeeRoleDetailView() {
            var _this = _super.call(this, "yw.SeeRoleDetailSkin") || this;
            _this.cur_role_id = 0;
            _this.btn_equips = [];
            _this.btn_heros = [];
            _this.btn_heros_info = [];
            _this.btn_backups = [];
            _this.btn_backups_info = [];
            _this.m_team_lv = 0;
            return _this;
        }
        /**创建界面时执行*/
        SeeRoleDetailView.prototype.componentCreated = function () {
            this.btn_heros = [this.btnHero1, this.btnHero2, this.btnHero3, this.btnHero4, this.btnHero5];
            this.btn_backups = [this.btnBackup1, this.btnBackup2, this.btnBackup3];
            this.btn_equips = [this.posWeapon, this.posChest, this.posLeg, this.posShoe, this.posRing, this.posNecklace];
        };
        /**销毁界面时执行*/
        SeeRoleDetailView.prototype.onDestroy = function () { };
        /**更新UI */
        SeeRoleDetailView.prototype.onUpdate = function (time) { };
        SeeRoleDetailView.prototype.open = function () {
            Singleton.Get(PopupManager).addPopup(this);
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHander, this);
            // 肮脏的主将
            this.btnHero1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_listHero_1, this);
            this.btnHero2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_listHero_2, this);
            this.btnHero3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_listHero_3, this);
            this.btnHero4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_listHero_4, this);
            this.btnHero5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_listHero_5, this);
            // 肮脏的副将
            this.btnBackup1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Backup_1, this);
            this.btnBackup2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Backup_2, this);
            this.btnBackup3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Backup_3, this);
            // 肮脏的裝備
            this.posWeapon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posWeapon, this);
            this.posChest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posChest, this);
            this.posLeg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posLeg, this);
            this.posShoe.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posShoe, this);
            /*
            for(let i: number = 0; i < this.btn_heros.length; i++){
                this.btn_heros[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_listHero, this);
            }
             */
        };
        SeeRoleDetailView.prototype.close = function () {
            this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHander, this);
            // 肮脏的主将
            this.btnHero1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_listHero_1, this);
            this.btnHero2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_listHero_2, this);
            this.btnHero3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_listHero_3, this);
            this.btnHero4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_listHero_4, this);
            this.btnHero5.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_listHero_5, this);
            // 肮脏的副将
            this.btnBackup1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Backup_1, this);
            this.btnBackup2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Backup_2, this);
            this.btnBackup3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Backup_3, this);
            // 肮脏的裝備
            this.posWeapon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posWeapon, this);
            this.posChest.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posChest, this);
            this.posLeg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posLeg, this);
            this.posShoe.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posShoe, this);
        };
        SeeRoleDetailView.prototype.onCloseHander = function (e) {
            Singleton.Get(PopupManager).removePopup(this);
        };
        // region 角色信息
        SeeRoleDetailView.prototype.convRoles = function (rec_msg) {
            var new_role_list = [];
            for (var i = 0; i < rec_msg.roles.length; i++) {
                var role_info_single = rec_msg.roles[i];
                if (rec_msg.roles[i].jewelries) {
                    var new_jew_list = [];
                    for (var j = 0; j < rec_msg.roles[i].jewelries.length; j++) {
                        var inf_jew = new JewelryInfo();
                        for (var prop in inf_jew) {
                            if (rec_msg.roles[i].jewelries[j].hasOwnProperty(prop)) {
                                inf_jew[prop] = rec_msg.roles[i].jewelries[j][prop];
                            }
                        }
                        inf_jew = inf_jew.clone();
                        inf_jew.role_id = role_info_single.role_id;
                        new_jew_list.push(inf_jew);
                    }
                    rec_msg.roles[i].jewelries = new_jew_list;
                    new_role_list.push(role_info_single);
                }
                else {
                    var new_jew_list = [];
                    rec_msg.roles[i].jewelries = new_jew_list;
                    new_role_list.push(role_info_single);
                }
            }
            rec_msg.roles = new_role_list;
            return rec_msg;
        };
        /**
         * 初始化玩家信息
         */
        SeeRoleDetailView.prototype.initContent = function (info, roles) {
            this.lb_title.text = info.nickname;
            this.m_team_lv = info.team_lv;
            // console.log(info);
            for (var i = 0; i < this.btn_equips.length; i++) {
                this.btn_equips[i].pos = i + 1;
                this.btn_equips[i].strVisible = false;
                this.btn_equips[i].refineVisible = false;
            }
            this.initRoleList(this.convRoles(roles));
            for (var i = 0; i < this.roles.pve_team.keys.length; i++) {
                var pos = this.roles.pve_team.keys[i];
                var role_id = this.roles.pve_team.get(pos);
                if (role_id > 0) {
                    this.initRoleInfo(pos);
                    break;
                }
            }
            this.groupEquipRingLocked.visible = this.m_team_lv < OpenManager.GetOpenLv(OpenType.EquipJewelry);
        };
        /**
         * 初始化角色头像列表
         * @param roles
         */
        SeeRoleDetailView.prototype.initRoleList = function (roles) {
            var _this = this;
            this.roles = roles;
            var pve_team = roles.pve_team;
            this.btn_heros_info = [];
            var i = 0;
            pve_team.foreachKey(function (pos) {
                var role_id = pve_team.get(pos);
                var btn = _this.btn_heros[i];
                btn.deactive_tip();
                btn.is_select = false;
                if (role_id <= 0) {
                    btn.is_not_lineup = true;
                    btn.role_tier = -1;
                }
                else {
                    var role_info = Template.role.get(role_id);
                    var my_role = roles.GetRole(role_id);
                    btn.role_head = role_info.Icon;
                    btn.role_lv = my_role.lv.toString();
                    btn.setTama(my_role.getAwakenStar(), my_role.getAwakenActiveStar());
                    btn.role_tier = my_role.getTier();
                    btn.is_not_lineup = false;
                }
                _this.btn_heros_info.push(pos);
                i++;
            }, this);
        };
        /**
         * 初始化角色信息
         * @param role_id
         * @param roles
         */
        SeeRoleDetailView.prototype.initRoleInfo = function (pos) {
            var pve_team = this.roles.pve_team;
            var role_id = pve_team.get(pos);
            if (role_id <= 0) {
                return;
            }
            this.cur_role_id = role_id;
            // 设置选中状态
            for (var i = 0; i < this.btn_heros.length; i++) {
                this.btn_heros[i].is_select = (this.btn_heros_info[i] == pos);
            }
            // 读取角色信息
            var role_info = Template.role.get(role_id);
            var my_role = this.roles.GetRole(role_id);
            var skill_info = Template.skill.get(role_info.Skill);
            // 角色卡牌
            Common.fillRoleCardAnyone(role_id, this.comp_RoleCard, this.roles);
            // 角色装备
            this.initEquips(role_id);
            // 角色自身信息
            this.labAttrHp.text = my_role.max_hp.toString();
            this.labAttrAtk.text = my_role.atk.toString();
            this.labAttrDef.text = my_role.def.toString();
            this.labAttrAtkSp.text = my_role.skill_atk.toString();
            this.labAttrDefSp.text = my_role.skill_def.toString();
            this.labAttrskill.text = Template.getGUIText(skill_info.Name) + " Lv." + my_role.skill_lv;
            this.labAttrBond.text = "";
            // 副将信息
            this.initBackups(pos);
        };
        /**
         * 初始化装备信息
         */
        SeeRoleDetailView.prototype.initEquips = function (role_id) {
            // 重置装备状态
            for (var i = 0; i < this.btn_equips.length; i++) {
                this.btn_equips[i].reset();
            }
            // 装备信息
            var equips = this.roles.GetRole(role_id).equips;
            for (var i = 0; i < equips.length; i++) {
                var equip = equips[i];
                var btn_equip = this.btn_equips[equip.pos - 1];
                btn_equip.equip = equip;
            }
            // 饰品信息
            var jewelries = this.roles.GetRole(role_id).jewelries;
            for (var i = 0; i < jewelries.length; i++) {
                var inf_jew = jewelries[i];
                var btn_jew = this.btn_equips[inf_jew.pos - 1];
                btn_jew.jewelry = inf_jew;
            }
            // 2017.6.10 版本暂时关闭饰品功能
            // this.groupNoNecklace.visible = (jewelries.length < 2);
            // this.groupNoRing.visible = (jewelries.length < 1);
            this.groupNoNecklace.visible = true;
            this.groupNoRing.visible = true;
        };
        /**
         * 初始化副将信息
         * @param role_id
         */
        SeeRoleDetailView.prototype.initBackups = function (pos) {
            // console.log(pos);
            var pve_team = this.roles.pve_team;
            var role_id = pve_team.get(pos);
            // console.log(this.roles);
            if (role_id <= 0) {
                return;
            }
            // console.log(role_id);
            var backups = this.roles.backup_info.get(pos);
            if (!backups) {
                backups = new Dictionary();
            }
            // console.log(backups);
            // 初始化
            for (var i = 0; i < this.btn_backups.length; i++) {
                this.btn_backups[i].data = {
                    lup: pos,
                    bk_pos: i + 1,
                    hero_id: pos,
                    role_id: backups.values[i] ? backups.values[i] : 0,
                    roles: this.roles,
                    my_lv: this.m_team_lv,
                    other: true
                };
            }
        };
        // endregion
        // region 点击事件
        // 肮脏的主将头像点击事件
        SeeRoleDetailView.prototype.onClick_listHero_1 = function () {
            this.onClick_listHero(this.btn_heros_info[0]);
        };
        SeeRoleDetailView.prototype.onClick_listHero_2 = function () {
            this.onClick_listHero(this.btn_heros_info[1]);
        };
        SeeRoleDetailView.prototype.onClick_listHero_3 = function () {
            this.onClick_listHero(this.btn_heros_info[2]);
        };
        SeeRoleDetailView.prototype.onClick_listHero_4 = function () {
            this.onClick_listHero(this.btn_heros_info[3]);
        };
        SeeRoleDetailView.prototype.onClick_listHero_5 = function () {
            this.onClick_listHero(this.btn_heros_info[4]);
        };
        SeeRoleDetailView.prototype.onClick_listHero = function (pos) {
            this.initRoleInfo(pos);
        };
        // 肮脏的副将点击事件
        SeeRoleDetailView.prototype.onClick_Backup_1 = function () {
            this.onClick_listBackup(1);
        };
        SeeRoleDetailView.prototype.onClick_Backup_2 = function () {
            this.onClick_listBackup(2);
        };
        SeeRoleDetailView.prototype.onClick_Backup_3 = function () {
            this.onClick_listBackup(3);
        };
        SeeRoleDetailView.prototype.onClick_listBackup = function (pos) {
            //Singleton.Get(DialogControler).showString("选中了副将"+ pos);
        };
        // 肮脏的装备点击事件
        SeeRoleDetailView.prototype.onClick_posWeapon = function () {
            this.onClick_posEquip(EquipPos.Weapon);
        };
        SeeRoleDetailView.prototype.onClick_posChest = function () {
            this.onClick_posEquip(EquipPos.Chest);
        };
        SeeRoleDetailView.prototype.onClick_posLeg = function () {
            this.onClick_posEquip(EquipPos.Leg);
        };
        SeeRoleDetailView.prototype.onClick_posShoe = function () {
            this.onClick_posEquip(EquipPos.Shoe);
        };
        SeeRoleDetailView.prototype.onClick_posEquip = function (pos) {
            var equips = this.roles.GetRole(this.cur_role_id).equips;
            var equip_id = 0;
            for (var i = 0; i < equips.length; i++) {
                if (equips[i].pos == pos) {
                    equip_id = equips[i].equip_id;
                }
            }
            if (equip_id <= 0) {
                return;
            }
            Singleton.Get(LayerManager).getView(ui.BagEquipDetailPanelView).open(equip_id, this.cur_role_id, this.roles);
        };
        return SeeRoleDetailView;
    }(PopupUI));
    ui.SeeRoleDetailView = SeeRoleDetailView;
    __reflect(SeeRoleDetailView.prototype, "ui.SeeRoleDetailView");
})(ui || (ui = {}));
//# sourceMappingURL=SeeRoleDetailView.js.map