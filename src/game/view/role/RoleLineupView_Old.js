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
     * 斗士阵容页面
     */
    var RoleLineupView_Old = (function (_super) {
        __extends(RoleLineupView_Old, _super);
        // endregion
        // region 初始化
        /**
         * 构造函数
         */
        function RoleLineupView_Old() {
            var _this = _super.call(this, "yw.RoleLineupSkin") || this;
            // endregion
            // region 成员变量
            // 配置
            _this.m_avatar_max = 5;
            _this.m_backup_max = 3;
            // 状态
            _this.m_cur_seat_id = 0; // 当前选中的角色id
            _this.touchEnabled = false;
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        RoleLineupView_Old.prototype.componentCreated = function () {
            this.init();
        };
        /**
         * 响应销毁
         */
        RoleLineupView_Old.prototype.onDestroy = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnChange.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange, this);
            this.btnOpinion.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOpinion, this);
            this.listAvatars.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_listAvatars, this);
            //this.listBackup.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listBackup, this);
            this.btnBond.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCLick_btnBond, this);
        };
        /**
         * 帧更新
         * @param time
         */
        RoleLineupView_Old.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化
         */
        RoleLineupView_Old.prototype.init = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange, this);
            this.btnOpinion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOpinion, this);
            this.listAvatars.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listAvatars, this);
            //this.listBackup.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listBackup, this);
            this.btnBond.touchEnabled = true;
            this.btnBond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCLick_btnBond, this);
            this.m_mgr = Singleton.Get(RoleManager);
            this.listAvatars.itemRenderer = ui.RoleSimpleAvatarView;
            this.listBackup.itemRenderer = ui.RoleBackupItemView;
            this.initGuiText();
        };
        /**
         * 初始化GUI文本
         */
        RoleLineupView_Old.prototype.initGuiText = function () {
            this.btnChange.text = Template.getGUIText("ui_role60");
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        RoleLineupView_Old.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
        };
        /**
         * 关闭本界面
         */
        RoleLineupView_Old.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        /**
         * 响应添加到舞台
         * @param e
         */
        RoleLineupView_Old.prototype.onAddToStage = function (e) {
            this.initAvatarsEvent();
            for (var i = 1; i < DEFINE.ROLE_MAX_LINEUP_COUNT + 1; i++) {
                if (this.m_mgr.getRolesInfo().pve_team.get(i) > 0) {
                    this.selectRole(i); // 默认选中队伍中第一个存在角色的位置
                    break;
                }
            }
        };
        /**
         * 响应从舞台移除
         * @param e
         */
        RoleLineupView_Old.prototype.onRemoveFromStage = function (e) {
        };
        // endregion
        // region 选择斗士
        /**
         * 刷新斗士头像列表
         */
        RoleLineupView_Old.prototype.refresh = function () {
            this.initAvatarsEvent();
            this.selectRole(this.m_cur_seat_id);
        };
        /**
         * 初始化头像
         */
        RoleLineupView_Old.prototype.initAvatarsEvent = function () {
            var _this = this;
            this.groupAvatars.touchEnabled = false;
            var max_hero_counts = RoleUtil.GetMaxHeroCounts();
            var ds_list_avatars = [];
            this.listAvatars.dataProvider = new eui.ArrayCollection(ds_list_avatars);
            var pve_team = this.m_mgr.getRolesInfo().pve_team;
            pve_team.foreachKey(function (key) {
                var r_id = pve_team.get(key);
                if (r_id <= 0) {
                    if (key <= max_hero_counts) {
                        ds_list_avatars.push({
                            idx: key,
                            icon: "",
                            heroLevel: 0,
                            emptyAlpha: 1,
                            newAlpha: 1,
                            heroTierBg: "",
                            heroTierSub: "",
                            plusAlpha: 1
                        });
                    }
                    else {
                        ds_list_avatars.push({
                            idx: key,
                            icon: "",
                            heroLevel: 0,
                            emptyAlpha: 1,
                            newAlpha: 0,
                            heroTierBg: "",
                            heroTierSub: "",
                            openLv: UtilsGame.stringHander(Template.wordConfig.get("ui_role56").word_cn, Template.config.Join[key - 1]),
                            notOpenAlpha: 1
                        });
                    }
                    return;
                }
                // 读取角色基本信息
                var r_info = Template.role.get(r_id);
                if (!r_info) {
                    egret.error("incorrect roleId: " + r_id);
                    return;
                }
                // 读取我的角色信息
                var my_r_info = _this.m_mgr.getRolesInfo().GetRole(r_id);
                // 读取天赋基本信息
                var my_r_talent = Template.talent.get(my_r_info.talent);
                if (!my_r_talent) {
                    egret.error("incorrect talentId: " + my_r_info.talent);
                    return;
                }
                // 构造角色图标信息
                ds_list_avatars.push({
                    idx: key,
                    icon: r_info.Icon,
                    heroLevel: my_r_info.lv,
                    emptyAlpha: 0,
                    newAlpha: 0,
                    heroTierBg: Common.getRoleTierBgResEx(my_r_info.getTier()),
                    heroTierSub: Common.getRoleTierSubResEx(my_r_info.getTier())
                });
            }, this);
        };
        /**
         * 选择斗士
         */
        RoleLineupView_Old.prototype.selectRole = function (seat_id) {
            // 获取斗士信息
            var role_id = Singleton.Get(RoleManager).getRolesInfo().pve_team.get(seat_id);
            var role_info = Template.role.get(role_id);
            var my_role_info = this.m_mgr.getRolesInfo().GetRole(role_id);
            // 判空
            if (!role_info || !my_role_info) {
                Singleton.Get(LayerManager).getView(ui.RoleSelectHeroAlertView).open(seat_id);
                return;
            }
            // 显示选中框
            for (var i = 0; i < this.m_avatar_max; i++) {
                this.listAvatars.dataProvider.getItemAt(i).selectAlpha = i == seat_id - 1 ? 1 : 0;
            }
            // 获取觉醒属性
            var my_role_awaken = Template.awaken.get(my_role_info.awaken);
            if (!my_role_awaken) {
                egret.error("no awakenId: " + my_role_info.awaken);
                return;
            }
            // 获取资质信息
            var my_talent_info = Template.talent.get(my_role_info.talent);
            if (my_talent_info == null) {
                egret.error("no roleId: " + role_id + "，talentId: " + my_role_info.talent);
                return;
            }
            // 设定斗士名、突破数
            this.labAttrName.text = RoleUtil.GetFullRoleName(role_id);
            this.labAttrName.textColor = RoleUtil.GetRoleNameColor(my_role_info.getTier());
            // 设定战力
            this.labAttrFight.text = "战力：" + my_role_info.fighting; // TODO 加到字典表
            // 设定勾玉数量
            var role_tama = my_role_awaken.AwakenStar;
            this.setTamaCount(my_role_info.getAwakenStar(), my_role_info.getAwakenActiveStar());
            // 设定当前选中的位置状态
            this.m_cur_seat_id = seat_id;
            // 更新角色动画MovieClip
            this.mcRole.setMovieClip(role_info.Res);
            // 展示副将信息
            this.initBackups(role_id);
            // 请求主界面刷新
            Singleton.Get(LayerManager).getView(ui.RoleListView).reqRefresh();
        };
        /**
         * 设定勾玉数量
         * @param count
         */
        RoleLineupView_Old.prototype.setTamaCount = function (count, active) {
            // this.imgTama.source = Common.getRoleTamaRes(count);
            ResManager.AsyncSetTexture(this.imgTama, Common.getRoleTamaResEx(count, active));
        };
        // endregion
        // region 更换斗士
        /**
         * 响应更换主将按钮点击事件
         */
        RoleLineupView_Old.prototype.onClick_btnChange = function () {
            this.openHeroChange();
        };
        /**
         * 响应头像列表点击事件
         */
        RoleLineupView_Old.prototype.onClick_listAvatars = function (e) {
            var seat_id = parseInt(e.item.idx);
            // 判断是否已解锁
            if (seat_id > RoleUtil.GetMaxHeroCounts()) {
                Singleton.Get(DialogControler).showString(UtilsGame.stringHander(Template.wordConfig.get("ui_role56").word_cn, Template.config.Join[seat_id - 1]));
                return;
            }
            this.selectRole(seat_id);
        };
        /**
         * 打开斗士更换界面
         */
        RoleLineupView_Old.prototype.openHeroChange = function () {
            var seat_id = this.m_cur_seat_id;
            Singleton.Get(LayerManager).getView(ui.RoleSelectHeroAlertView).open(seat_id);
        };
        // endregion
        // region 更换阵形
        /**
         * 响应更换阵形点击事件
         */
        RoleLineupView_Old.prototype.onClick_btnOpinion = function () {
            this.openHeroOpinion();
        };
        /**
         * 打开布阵界面
         */
        RoleLineupView_Old.prototype.openHeroOpinion = function () {
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
        // endregion
        // region 副将
        /**
         * 初始化副将信息
         */
        RoleLineupView_Old.prototype.initBackups = function (role_id) {
            // 获取副将信息
            var dict = Singleton.Get(RoleManager).getRolesInfo().GetSomeoneBackup(role_id);
            // 初始化数据
            var ds_list_backups = [];
            this.listBackup.dataProvider = new eui.ArrayCollection(ds_list_backups);
            // 添加数据
            for (var i = 0; i < this.m_backup_max; i++) {
                var dict_idx = i + 1;
                // 判断是否已解锁
                var my_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
                var unlock_lv = Template.config.Backup[i];
                if (my_lv < unlock_lv) {
                    ds_list_backups.push(this.getBackupDataLocked(dict_idx, unlock_lv));
                    continue;
                }
                // 判断是否全空
                if (dict == null) {
                    ds_list_backups.push(this.getBackupDataEmpty(dict_idx));
                    continue;
                }
                // 判断是否有已存在副将
                var backup_role_id = dict.get(i + 1);
                var is_filled = backup_role_id > 0;
                if (!is_filled) {
                    ds_list_backups.push(this.getBackupDataEmpty(dict_idx));
                    continue;
                }
                // 存在副将，展示副将信息
                ds_list_backups.push(this.getBackupData(dict_idx, backup_role_id));
            }
        };
        /**
         * 获取副将显示数据-已锁定
         * @param unlock_lv
         * @returns {{unlockDes: string, avatarVisible: boolean, plusVisible: boolean, btnVisible: boolean, attrVisible: boolean, labPlusVisible: boolean, lockVisible: boolean, labLockVisible: boolean}}
         */
        RoleLineupView_Old.prototype.getBackupDataLocked = function (idx, unlock_lv) {
            return {
                idx: idx,
                roleId: -1,
                unlockDes: UtilsGame.stringHander(Template.getGUIText("append_213"), unlock_lv),
                avatarVisible: false,
                plusVisible: false,
                btnVisible: false,
                attrVisible: false,
                labPlusVisible: false,
                lockVisible: true,
                labLockVisible: true
            };
        };
        /**
         * 获取副将显示数据-无副将
         * @returns {{avatarVisible: boolean, plusVisible: boolean, btnVisible: boolean, attrVisible: boolean, lockVisible: boolean, labPlusVisible: boolean, labLockVisible: boolean}}
         */
        RoleLineupView_Old.prototype.getBackupDataEmpty = function (idx) {
            return {
                idx: idx,
                roleId: 0,
                avatarVisible: false,
                plusVisible: true,
                btnVisible: false,
                attrVisible: false,
                lockVisible: false,
                labPlusVisible: true,
                labLockVisible: false
            };
        };
        /**
         * 获取副将显示数据-有副将
         * @returns {{avatarVisible: boolean, plusVisible: boolean, btnVisible: boolean, attrVisible: boolean, lockVisible: boolean, labPlusVisible: boolean, labLockVisible: boolean}}
         */
        RoleLineupView_Old.prototype.getBackupData = function (idx, role_id) {
            // 获取角色属性信息
            var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (my_role == null) {
                egret.error("no player roleId: " + role_id);
                return;
            }
            // 获取角色基本信息
            var role_info = Template.role.get(role_id);
            if (role_info == null) {
                egret.error("no roleId: " + role_id);
                return;
            }
            // 获取觉醒信息
            var awaken_info = Template.awaken.get(my_role.awaken);
            if (awaken_info == null) {
                egret.error("no awaken, roleId: " + role_id + ", awakenId: " + my_role.awaken);
                return;
            }
            // 获取资质信息
            var talent_info = Template.talent.get(my_role.talent);
            if (talent_info == null) {
                egret.error("no talent, roleId: " + role_id + ", talentId: " + my_role.talent);
                return;
            }
            // 计算角色副将属性
            var attr = my_role.GetBackupAddAttr();
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
            // 检查羁绊关系
            var hero_id = Singleton.Get(RoleManager).getRolesInfo().pve_team.get(this.m_cur_seat_id);
            var has_bond = RoleUtil.PreChangeBackupHasBond(role_id, hero_id);
            return {
                idx: idx,
                roleId: role_id,
                avatarVisible: true,
                btnVisible: true,
                attrVisible: true,
                plusVisible: false,
                labPlusVisible: false,
                lockVisible: false,
                labLockVisible: false,
                attr1: str_attrs[0],
                attr2: str_attrs[1],
                attr3: str_attrs[2],
                fighting: "战力+" + attr.get(-1),
                heroName: RoleUtil.GetFullRoleName(role_id),
                heroNameColor: RoleUtil.GetRoleNameColor(my_role.getTier()),
                heroTierBg: Common.getRoleTierBgResEx(my_role.getTier()),
                heroTierSub: Common.getRoleTierSubResEx(my_role.getTier()),
                heroLv: my_role.lv,
                heroTama: Common.getRoleTamaResEx(my_role.getAwakenStar(), my_role.getAwakenActiveStar()),
                heroIcon: role_info.Icon,
                bondVisible: has_bond
            };
        };
        /**
         * 响应副将列表点击事件
         * @param e
         */
        RoleLineupView_Old.prototype.onClick_listBackup = function (e) {
            // 未达到解锁等级
            if (e.item.roleId < 0) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("append_201"));
                return;
            }
            // 已解锁无角色
            Singleton.Get(LayerManager).getView(ui.RoleSelectBackupPanelView).open(e.item.idx, this.m_cur_seat_id);
        };
        /**
         * 获取当前座位id
         */
        RoleLineupView_Old.prototype.getCurSeatId = function () {
            return this.m_cur_seat_id;
        };
        // endregion
        // region 羁绊
        /**
         * 响应点击羁绊按钮
         */
        RoleLineupView_Old.prototype.onCLick_btnBond = function () {
            Singleton.Get(LayerManager).getView(ui.RoleBondPanelView).open();
        };
        return RoleLineupView_Old;
    }(BaseUI));
    ui.RoleLineupView_Old = RoleLineupView_Old;
    __reflect(RoleLineupView_Old.prototype, "ui.RoleLineupView_Old");
})(ui || (ui = {}));
//# sourceMappingURL=RoleLineupView_Old.js.map